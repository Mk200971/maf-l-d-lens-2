'use client'

import { Fragment, useMemo, useState } from 'react'
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Line,
  LineChart,
  XAxis,
  YAxis,
} from 'recharts'
import { ChevronDown, ChevronRight, Info, SlidersHorizontal, X } from 'lucide-react'
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from '@/components/ui/chart'
import { Badge } from '@/components/ui/badge'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { ChartCard, KpiTile, PageHeader } from '@/components/dashboard/shared'
import { ScopeBadge } from '@/components/dashboard/scope-badge'
import { cn } from '@/lib/utils'
import {
  byCountry,
  byDelivery,
  byMonth,
  categories,
  groups,
  items,
  kpis,
  meta,
} from '@/lib/all-learnings-data'

// ─── constants ───────────────────────────────────────────────────────────────

const MONTH_NAMES = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

const CATEGORY_COLORS: Record<string, string> = {
  llcoe: 'var(--chart-2)',
  curated: 'var(--chart-1)',
  compliance: 'var(--chart-3)',
  catalogue: 'var(--chart-4)',
  hrsys: 'var(--chart-5)',
  rising: 'var(--brand-sand)',
  skillup: 'var(--muted-foreground)',
}

const TABLE_PAGE_SIZE = 20

type YearFilter = 'All' | '2025' | '2026'
type BuFilterLocal = 'All' | 'AMBU' | 'DBU'
type CountryFilterLocal = 'All' | string
type DeliveryFilterLocal = 'All' | 'BLENDED' | 'COURSE' | 'ONLINE'

const YEAR_OPTIONS: YearFilter[] = ['All', '2025', '2026']
const BU_OPTIONS: BuFilterLocal[] = ['All', 'AMBU', 'DBU']
const COUNTRY_OPTIONS: CountryFilterLocal[] = [
  'All',
  'United Arab Emirates',
  'Egypt',
  'Oman',
  'Bahrain',
  'Lebanon',
  'Saudi Arabia',
]
const DELIVERY_OPTIONS: DeliveryFilterLocal[] = ['All', 'BLENDED', 'COURSE', 'ONLINE']

const deliveryConfig = {
  hours: { label: 'Hours', color: 'var(--chart-1)' },
  completions: { label: 'Completions', color: 'var(--chart-2)' },
} satisfies ChartConfig

// ─── helpers ─────────────────────────────────────────────────────────────────

function formatHours(n: number): string {
  return Math.round(n).toLocaleString('en-US')
}

function categoryLabel(id: string): string {
  return categories.find((c) => c.id === id)?.label ?? id
}

// ─── shared filter chip (local to this page) ────────────────────────────────

function FilterChip<T extends string>({
  value,
  label,
  active,
  onClick,
}: {
  value: T
  label?: string
  active: boolean
  onClick: () => void
}) {
  return (
    <button
      onClick={onClick}
      className={cn(
        'inline-flex items-center gap-1.5 rounded-full border px-3.5 py-1.5 text-xs font-medium transition-all duration-200',
        active
          ? 'border-transparent bg-accent text-accent-foreground shadow-sm'
          : 'border-border bg-background text-muted-foreground hover:border-accent/50 hover:text-foreground',
      )}
    >
      {label ?? value}
    </button>
  )
}

// ─── main component ──────────────────────────────────────────────────────────

export function AllLearningsPage() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [expandedGroupIds, setExpandedGroupIds] = useState<Set<string>>(new Set())
  const [longTailShown, setLongTailShown] = useState<Set<string>>(new Set())
  const [showAllRows, setShowAllRows] = useState(false)

  const [yearFilter, setYearFilter] = useState<YearFilter>('All')
  const [buFilter, setBuFilter] = useState<BuFilterLocal>('All')
  const [countryFilter, setCountryFilter] = useState<CountryFilterLocal>('All')
  const [deliveryFilter, setDeliveryFilter] = useState<DeliveryFilterLocal>('All')

  const hasActiveFilter =
    yearFilter !== 'All' || buFilter !== 'All' || countryFilter !== 'All' || deliveryFilter !== 'All'

  function clearFilters() {
    setYearFilter('All')
    setBuFilter('All')
    setCountryFilter('All')
    setDeliveryFilter('All')
  }

  function toggleExpand(id: string) {
    setExpandedGroupIds((prev) => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })
  }

  function toggleLongTail(id: string) {
    setLongTailShown((prev) => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })
  }

  // ── filters that categories/groups CANNOT honour (pre-aggregated data) ────
  const unhonoredFilters = [
    yearFilter !== 'All' && 'Year',
    buFilter !== 'All' && 'BU',
    countryFilter !== 'All' && 'Country',
  ].filter(Boolean) as string[]

  // ── KPI tiles ───────────────────────────────────────────────────────────────
  const kpiBase = useMemo(() => {
    if (countryFilter !== 'All') {
      const rows = byCountry.filter(
        (r) => r.country === countryFilter && (buFilter === 'All' || r.bu === buFilter),
      )
      return {
        hours: rows.reduce((a, r) => a + r.hours, 0),
        completions: rows.reduce((a, r) => a + r.completions, 0),
        learners: rows.reduce((a, r) => a + r.learners, 0),
      }
    }
    if (yearFilter !== 'All' || buFilter !== 'All') {
      const rows = byMonth.filter(
        (r) => (yearFilter === 'All' || r.month.startsWith(yearFilter)) && (buFilter === 'All' || r.bu === buFilter),
      )
      return {
        hours: rows.reduce((a, r) => a + r.hours, 0),
        completions: rows.reduce((a, r) => a + r.completions, 0),
        learners: kpis.uniqueLearners,
      }
    }
    return { hours: kpis.totalHours, completions: kpis.totalCompletions, learners: kpis.uniqueLearners }
  }, [yearFilter, buFilter, countryFilter])

  const itemsCountFiltered = useMemo(() => {
    if (deliveryFilter === 'All') return kpis.itemsCount
    return items.filter((i) => i.deliveryType === deliveryFilter).length
  }, [deliveryFilter])

  const countryCount = useMemo(() => new Set(byCountry.map((r) => r.country)).size, [])

  // ── LEVEL 1: category bars ──────────────────────────────────────────────────
  const categorySorted = useMemo(() => categories.slice().sort((a, b) => b.hours - a.hours), [])

  const selectedCategoryData = selectedCategory ? categories.find((c) => c.id === selectedCategory) : null

  // ── LEVEL 2: programme table ────────────────────────────────────────────────
  const filteredGroups = useMemo(() => {
    let list = groups.slice()
    if (selectedCategory) list = list.filter((g) => g.categoryId === selectedCategory)
    return list.sort((a, b) => b.hours - a.hours)
  }, [selectedCategory])

  const visibleGroups = showAllRows ? filteredGroups : filteredGroups.slice(0, TABLE_PAGE_SIZE)
  const hiddenGroups = showAllRows ? [] : filteredGroups.slice(TABLE_PAGE_SIZE)
  const hiddenHours = hiddenGroups.reduce((a, g) => a + g.hours, 0)

  // ── Step 5a: hours by month ─────────────────────────────────────────────────
  const monthChartData = useMemo(() => {
    return MONTH_NAMES.map((name, idx) => {
      const mm = String(idx + 1).padStart(2, '0')
      const rows2025 = byMonth.filter((r) => r.month === `2025-${mm}` && (buFilter === 'All' || r.bu === buFilter))
      const rows2026 = byMonth.filter((r) => r.month === `2026-${mm}` && (buFilter === 'All' || r.bu === buFilter))
      const y2025 = rows2025.length ? rows2025.reduce((a, r) => a + r.hours, 0) : null
      const y2026 = rows2026.length ? rows2026.reduce((a, r) => a + r.hours, 0) : null
      return {
        name,
        y2025: yearFilter === '2026' ? null : y2025,
        y2026: yearFilter === '2025' ? null : y2026,
      }
    })
  }, [buFilter, yearFilter])

  // ── Step 5b: delivery mix ───────────────────────────────────────────────────
  const deliveryChartData = byDelivery.map((d) => ({
    ...d,
    isSelected: deliveryFilter === 'All' || deliveryFilter === d.deliveryType,
  }))

  // ── Step 7: long tail ────────────────────────────────────────────────────────
  const longTailItems = useMemo(() => {
    let list = items.filter((i) => i.isLongTail)
    if (deliveryFilter !== 'All') list = list.filter((i) => i.deliveryType === deliveryFilter)
    return list.sort((a, b) => b.hours - a.hours)
  }, [deliveryFilter])

  return (
    <div className="flex flex-col gap-6 lg:gap-8">
      <PageHeader
        title="All Learning Activity"
        badge={<ScopeBadge>All LMS activity</ScopeBadge>}
        description="Every completion recorded in the LMS, 1 Jan 2025 – 13 Aug 2026. Includes the programmes on Programme Overview and the courses on Mandatory Learnings — these totals are NOT additive with those pages."
      />

      {/* ── Filter bar (Step 6) ────────────────────────────────────────────── */}
      <section className="rounded-xl border border-border bg-card px-5 py-4 shadow-sm">
        <div className="flex flex-wrap items-center gap-4">
          <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
            <SlidersHorizontal className="size-4" aria-hidden="true" />
            Filters
          </div>

          <div className="flex items-center gap-1.5">
            <span className="text-xs text-muted-foreground">Year</span>
            <div className="flex items-center gap-1">
              {YEAR_OPTIONS.map((v) => (
                <FilterChip key={v} value={v} active={yearFilter === v} onClick={() => setYearFilter(v)} />
              ))}
            </div>
          </div>

          <div className="h-4 w-px bg-border" aria-hidden="true" />

          <div className="flex items-center gap-1.5">
            <span className="text-xs text-muted-foreground">BU</span>
            <div className="flex items-center gap-1">
              {BU_OPTIONS.map((v) => (
                <FilterChip
                  key={v}
                  value={v}
                  label={v === 'All' ? 'Both' : v}
                  active={buFilter === v}
                  onClick={() => setBuFilter(v)}
                />
              ))}
            </div>
          </div>

          <div className="h-4 w-px bg-border" aria-hidden="true" />

          <div className="flex items-center gap-1.5">
            <span className="text-xs text-muted-foreground">Country</span>
            <div className="flex flex-wrap items-center gap-1">
              {COUNTRY_OPTIONS.map((v) => (
                <FilterChip key={v} value={v} active={countryFilter === v} onClick={() => setCountryFilter(v)} />
              ))}
            </div>
          </div>

          <div className="h-4 w-px bg-border" aria-hidden="true" />

          <div className="flex items-center gap-1.5">
            <span className="text-xs text-muted-foreground">Delivery</span>
            <div className="flex items-center gap-1">
              {DELIVERY_OPTIONS.map((v) => (
                <FilterChip key={v} value={v} active={deliveryFilter === v} onClick={() => setDeliveryFilter(v)} />
              ))}
            </div>
          </div>

          {hasActiveFilter && (
            <button
              onClick={clearFilters}
              className="ml-auto flex items-center gap-1 text-xs text-muted-foreground transition-colors hover:text-foreground"
            >
              <X className="size-3.5" aria-hidden="true" />
              Clear all
            </button>
          )}
        </div>

        {hasActiveFilter && (
          <p className="mt-3 border-t border-border pt-3 text-xs text-muted-foreground">
            Showing{' '}
            <span className="font-medium text-foreground">{formatHours(kpiBase.hours)} hrs</span>
            {yearFilter !== 'All' && (
              <>
                {' '}
                · Year: <span className="font-medium text-foreground">{yearFilter}</span>
              </>
            )}
            {buFilter !== 'All' && (
              <>
                {' '}
                · BU: <span className="font-medium text-foreground">{buFilter}</span>
              </>
            )}
            {countryFilter !== 'All' && (
              <>
                {' '}
                · Country: <span className="font-medium text-foreground">{countryFilter}</span>
              </>
            )}
            {deliveryFilter !== 'All' && (
              <>
                {' '}
                · Delivery: <span className="font-medium text-foreground">{deliveryFilter}</span>
              </>
            )}
          </p>
        )}
      </section>

      {/* ── KPI strip (Step 2) ─────────────────────────────────────────────── */}
      <section className="grid grid-cols-2 gap-4 md:grid-cols-4">
        <KpiTile
          label="Total LMS Hours"
          value={formatHours(kpiBase.hours)}
          sub="Superset — includes curated + mandatory"
        />
        <KpiTile
          label="Completions"
          value={formatHours(kpiBase.completions)}
          sub={`AMBU ${formatHours(kpis.byBU.AMBU)} hrs · DBU ${formatHours(kpis.byBU.DBU)} hrs`}
        />
        <KpiTile
          label="Unique Learners"
          value={formatHours(kpiBase.learners)}
          sub={countryFilter !== 'All' ? `In ${countryFilter}` : `Across ${countryCount} countries`}
        />
        <KpiTile
          label="Distinct Items"
          value={formatHours(itemsCountFiltered)}
          sub={`Grouped into ${categories.length} categories`}
        />
      </section>

      {/* ── LEVEL 1: category bars (Step 3) ─────────────────────────────────── */}
      <ChartCard
        title="Learning by Category"
        description="Click a bar to filter the programme table below."
      >
        {unhonoredFilters.length > 0 && (
          <p className="mb-2 text-xs italic text-muted-foreground">
            Category and programme breakdowns are shown at full scope; the {unhonoredFilters.join(', ')} filter
            applies to the KPI tiles and charts only.
          </p>
        )}
        <ChartContainer config={{}} className="h-[300px] w-full">
          <BarChart data={categorySorted} layout="vertical" margin={{ left: 8, right: 90 }}>
            <CartesianGrid horizontal={false} strokeDasharray="3 3" />
            <XAxis type="number" hide />
            <YAxis
              type="category"
              dataKey="label"
              tickLine={false}
              axisLine={false}
              fontSize={11}
              width={210}
            />
            <ChartTooltip
              content={
                <ChartTooltipContent
                  formatter={(value, _name, item: any) => [
                    `${formatHours(Number(value))} hrs · ${item?.payload?.sharePct}%`,
                    'Hours',
                  ]}
                />
              }
            />
            <Bar
              dataKey="hours"
              radius={[0, 4, 4, 0]}
              style={{ cursor: 'pointer' }}
              onClick={(data: any) => {
                if (data?.id) setSelectedCategory((prev) => (prev === data.id ? null : data.id))
              }}
            >
              {categorySorted.map((c) => (
                <Cell
                  key={c.id}
                  fill={CATEGORY_COLORS[c.id]}
                  fillOpacity={selectedCategory && selectedCategory !== c.id ? 0.35 : 1}
                />
              ))}
            </Bar>
          </BarChart>
        </ChartContainer>

        <div className="mt-1 flex flex-wrap items-center gap-2 text-xs">
          {categorySorted.map((c) => (
            <span key={c.id} className="flex items-center gap-1 text-muted-foreground">
              <span
                className="size-2 rounded-full"
                style={{ backgroundColor: CATEGORY_COLORS[c.id] }}
                aria-hidden="true"
              />
              {formatHours(c.hours)} hrs · {c.sharePct}%
            </span>
          ))}
        </div>

        {selectedCategory && (
          <div className="mt-3 flex flex-col gap-2 border-t border-border pt-3">
            <button
              onClick={() => setSelectedCategory(null)}
              className="inline-flex w-fit items-center gap-1 rounded-full border border-border bg-background px-2.5 py-1 text-xs text-muted-foreground transition-colors hover:text-foreground"
            >
              <X className="size-3" aria-hidden="true" />
              Clear category: {categoryLabel(selectedCategory)}
            </button>
            {selectedCategoryData && (
              <p className="text-xs text-pretty leading-relaxed text-muted-foreground">
                {selectedCategoryData.description}
              </p>
            )}
          </div>
        )}
      </ChartCard>

      {/* ── LEVEL 2: programme table (Step 4) ───────────────────────────────── */}
      <ChartCard
        title="Programmes"
        description={
          selectedCategory
            ? `Filtered to ${categoryLabel(selectedCategory)}.`
            : 'All programmes and courses, sorted by hours.'
        }
      >
        {unhonoredFilters.length > 0 && (
          <p className="mb-2 text-xs italic text-muted-foreground">
            Category and programme breakdowns are shown at full scope; the {unhonoredFilters.join(', ')} filter
            applies to the KPI tiles and charts only.
          </p>
        )}
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Programme</TableHead>
              <TableHead>Category</TableHead>
              <TableHead className="text-right">Hours</TableHead>
              <TableHead className="text-right">Completions</TableHead>
              <TableHead className="text-right">Learners</TableHead>
              <TableHead className="text-right">Items</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {visibleGroups.map((group) => {
              const expanded = expandedGroupIds.has(group.id)
              const groupItemsAll = items
                .filter((i) => i.groupId === group.id)
                .filter((i) => deliveryFilter === 'All' || i.deliveryType === deliveryFilter)
                .sort((a, b) => b.hours - a.hours)
              const shownLongTail = longTailShown.has(group.id)
              const mainItems = groupItemsAll.filter((i) => !i.isLongTail)
              const minorItems = groupItemsAll.filter((i) => i.isLongTail)

              return (
                <Fragment key={group.id}>
                  <TableRow
                    className={group.isConsolidated ? 'cursor-pointer' : undefined}
                    onClick={() => group.isConsolidated && toggleExpand(group.id)}
                  >
                    <TableCell>
                      <div className="flex items-center gap-2">
                        {group.isConsolidated ? (
                          <span className="text-muted-foreground">
                            {expanded ? (
                              <ChevronDown className="size-3.5" aria-hidden="true" />
                            ) : (
                              <ChevronRight className="size-3.5" aria-hidden="true" />
                            )}
                          </span>
                        ) : (
                          <span className="inline-block size-3.5" aria-hidden="true" />
                        )}
                        <span className="font-medium">{group.label}</span>
                        {group.isConsolidated && (
                          <Badge variant="secondary" className="text-[10px]">
                            {group.itemCount} items
                          </Badge>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline" className="text-[10px]">
                        {categoryLabel(group.categoryId)}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right tabular-nums">{formatHours(group.hours)}</TableCell>
                    <TableCell className="text-right tabular-nums">
                      {group.completions.toLocaleString()}
                    </TableCell>
                    <TableCell className="text-right tabular-nums">{group.learners.toLocaleString()}</TableCell>
                    <TableCell className="text-right tabular-nums">{group.itemCount}</TableCell>
                  </TableRow>

                  {expanded &&
                    mainItems.map((item) => (
                      <TableRow key={item.id} className="bg-muted/30 hover:bg-muted/40">
                        <TableCell className="pl-9 text-sm text-muted-foreground">{item.title}</TableCell>
                        <TableCell>
                          <Badge variant="outline" className="text-[10px]">
                            {item.deliveryType}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right text-sm tabular-nums text-muted-foreground">
                          {formatHours(item.hours)}
                        </TableCell>
                        <TableCell className="text-right text-sm tabular-nums text-muted-foreground">
                          {item.completions.toLocaleString()}
                        </TableCell>
                        <TableCell className="text-right text-sm tabular-nums text-muted-foreground">
                          {item.learners.toLocaleString()}
                        </TableCell>
                        <TableCell />
                      </TableRow>
                    ))}

                  {expanded && minorItems.length > 0 && (
                    <TableRow className="bg-muted/30 hover:bg-muted/40">
                      <TableCell colSpan={6}>
                        <button
                          onClick={(e) => {
                            e.stopPropagation()
                            toggleLongTail(group.id)
                          }}
                          className="pl-9 text-xs text-muted-foreground transition-colors hover:text-foreground"
                        >
                          {shownLongTail ? 'Hide minor items' : `Show ${minorItems.length} minor items`}
                        </button>
                      </TableCell>
                    </TableRow>
                  )}

                  {expanded &&
                    shownLongTail &&
                    minorItems.map((item) => (
                      <TableRow key={item.id} className="bg-muted/20 hover:bg-muted/30">
                        <TableCell className="pl-14 text-xs text-muted-foreground">{item.title}</TableCell>
                        <TableCell>
                          <Badge variant="outline" className="text-[10px]">
                            {item.deliveryType}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right text-xs tabular-nums text-muted-foreground">
                          {formatHours(item.hours)}
                        </TableCell>
                        <TableCell className="text-right text-xs tabular-nums text-muted-foreground">
                          {item.completions.toLocaleString()}
                        </TableCell>
                        <TableCell className="text-right text-xs tabular-nums text-muted-foreground">
                          {item.learners.toLocaleString()}
                        </TableCell>
                        <TableCell />
                      </TableRow>
                    ))}
                </Fragment>
              )
            })}
          </TableBody>
        </Table>

        {hiddenGroups.length > 0 && (
          <div className="mt-3 flex items-center justify-between gap-3 border-t border-border pt-3 text-xs text-muted-foreground">
            <span>
              +{hiddenGroups.length} more programmes · {formatHours(hiddenHours)} hrs
            </span>
            <button
              onClick={() => setShowAllRows(true)}
              className="font-medium text-foreground transition-colors hover:text-accent"
            >
              Show all
            </button>
          </div>
        )}
        {showAllRows && filteredGroups.length > TABLE_PAGE_SIZE && (
          <div className="mt-3 flex justify-end border-t border-border pt-3 text-xs">
            <button
              onClick={() => setShowAllRows(false)}
              className="font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              Show fewer
            </button>
          </div>
        )}
      </ChartCard>

      {/* ── Step 5a/5b: two charts side by side ─────────────────────────────── */}
      <section className="grid grid-cols-1 gap-4 lg:gap-5 xl:gap-6 md:grid-cols-2">
        <ChartCard title="Hours by Month" description="2025 vs 2026, by calendar month.">
          <ChartContainer
            config={{
              y2025: { label: '2025', color: 'var(--chart-1)' },
              y2026: { label: '2026', color: 'var(--chart-2)' },
            }}
            className="h-56 w-full lg:h-64"
          >
            <LineChart data={monthChartData} margin={{ left: 0, right: 8 }}>
              <CartesianGrid vertical={false} strokeDasharray="3 3" />
              <XAxis dataKey="name" tickLine={false} axisLine={false} fontSize={11} />
              <YAxis tickLine={false} axisLine={false} fontSize={11} width={40} />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Line
                dataKey="y2025"
                type="monotone"
                stroke="var(--color-y2025)"
                strokeWidth={2}
                dot={false}
                connectNulls={false}
              />
              <Line
                dataKey="y2026"
                type="monotone"
                stroke="var(--color-y2026)"
                strokeWidth={2}
                dot={false}
                connectNulls={false}
              />
            </LineChart>
          </ChartContainer>
          <p className="mt-2 text-xs text-pretty text-muted-foreground">
            2026 covers 1 Jan – 13 Aug. Not a full year — do not read the change as a trend.
          </p>
        </ChartCard>

        <ChartCard title="Delivery Mix" description="Hours drive the story; completions are shown alongside.">
          <ChartContainer config={deliveryConfig} className="h-56 w-full lg:h-64">
            <BarChart data={deliveryChartData} margin={{ left: 0, right: 8 }}>
              <CartesianGrid vertical={false} strokeDasharray="3 3" />
              <XAxis dataKey="deliveryType" tickLine={false} axisLine={false} fontSize={11} />
              <YAxis tickLine={false} axisLine={false} fontSize={11} width={40} />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Bar dataKey="hours" fill="var(--color-hours)" radius={[4, 4, 0, 0]}>
                {deliveryChartData.map((d) => (
                  <Cell key={d.deliveryType} fillOpacity={d.isSelected ? 1 : 0.35} />
                ))}
              </Bar>
              <Bar dataKey="completions" fill="var(--color-completions)" radius={[4, 4, 0, 0]}>
                {deliveryChartData.map((d) => (
                  <Cell key={d.deliveryType} fillOpacity={d.isSelected ? 1 : 0.35} />
                ))}
              </Bar>
            </BarChart>
          </ChartContainer>
          <p className="mt-2 text-xs text-pretty text-muted-foreground">
            BLENDED: {byDelivery.find((d) => d.deliveryType === 'BLENDED')?.completions.toLocaleString()} completions
            → {formatHours(byDelivery.find((d) => d.deliveryType === 'BLENDED')?.hours ?? 0)} hrs · COURSE:{' '}
            {byDelivery.find((d) => d.deliveryType === 'COURSE')?.completions.toLocaleString()} completions →{' '}
            {formatHours(byDelivery.find((d) => d.deliveryType === 'COURSE')?.hours ?? 0)} hrs · ONLINE:{' '}
            {byDelivery.find((d) => d.deliveryType === 'ONLINE')?.completions.toLocaleString()} completions →{' '}
            {formatHours(byDelivery.find((d) => d.deliveryType === 'ONLINE')?.hours ?? 0)} hrs
          </p>
        </ChartCard>
      </section>

      {/* ── Step 7: long tail disclosure ────────────────────────────────────── */}
      <details className="group rounded-xl border border-border bg-card px-5 py-4 shadow-sm">
        <summary className="cursor-pointer text-sm font-medium text-foreground">
          Long tail — {meta.longTailItems} items under 1 hour or with a single learner · {meta.longTailHours.toFixed(1)}{' '}
          hrs ({((meta.longTailHours / kpis.totalHours) * 100).toFixed(1)}%)
        </summary>
        <div className="mt-3 flex flex-col gap-3 border-t border-border pt-3">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Title</TableHead>
                <TableHead>Delivery Type</TableHead>
                <TableHead className="text-right">Hours</TableHead>
                <TableHead className="text-right">Completions</TableHead>
                <TableHead className="text-right">Learners</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {longTailItems.map((item) => (
                <TableRow key={item.id}>
                  <TableCell className="text-sm text-muted-foreground">{item.title}</TableCell>
                  <TableCell>
                    <Badge variant="outline" className="text-[10px]">
                      {item.deliveryType}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right text-sm tabular-nums text-muted-foreground">
                    {item.hours.toFixed(2)}
                  </TableCell>
                  <TableCell className="text-right text-sm tabular-nums text-muted-foreground">
                    {item.completions.toLocaleString()}
                  </TableCell>
                  <TableCell className="text-right text-sm tabular-nums text-muted-foreground">
                    {item.learners.toLocaleString()}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <p className="text-xs text-muted-foreground">These remain included in every total above.</p>
        </div>
      </details>

      {/* ── Step 9: data integrity footer ───────────────────────────────────── */}
      <footer className="flex flex-col gap-1.5 border-t border-border pt-4 text-xs text-muted-foreground">
        <p className="flex items-start gap-1.5">
          <Info className="mt-0.5 size-3.5 shrink-0" aria-hidden="true" />
          {meta.overlapNote}
        </p>
        <p className="pl-5">{meta.skillupNote}</p>
        <p className="pl-5">
          Source: {meta.source} · Hours: {meta.hoursField} · Generated {meta.generatedOn}
        </p>
      </footer>
    </div>
  )
}
