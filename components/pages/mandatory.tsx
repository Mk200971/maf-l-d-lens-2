'use client'

import { useMemo, useState } from 'react'
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  LabelList,
  XAxis,
  YAxis,
} from 'recharts'
import { AlertTriangle, SlidersHorizontal, X } from 'lucide-react'
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from '@/components/ui/chart'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { ChartCard, InfoBanner, KpiTile, PageHeader } from '@/components/dashboard/shared'
import { ScopeBadge } from '@/components/dashboard/scope-badge'
import { cn } from '@/lib/utils'
import {
  businessEntityToBU,
  completionsByMonth,
  mandatoryRows,
  meta,
  pendingByLocation,
  type BU,
} from '@/lib/mandatory-data'

// ─── constants ───────────────────────────────────────────────────────────────

const BU_COLORS: Record<BU, string> = { AMBU: 'var(--chart-1)', DBU: 'var(--chart-2)' }

type BUFilter = 'ALL' | BU
type StatusFilter = 'All' | 'Complete' | 'Pending'
type CourseFilter = 'ALL' | string
type CountryFilter = 'ALL' | string

const COURSE_OPTIONS: CourseFilter[] = [
  'ALL',
  ...[...new Set(mandatoryRows.map((r) => r.course))].sort(),
]
const COUNTRY_OPTIONS: CountryFilter[] = [
  'ALL',
  ...[...new Set(pendingByLocation.map((r) => r.country))].sort(),
]
const STATUS_OPTIONS: StatusFilter[] = ['All', 'Complete', 'Pending']

const statusConfig = {
  completed: { label: 'Complete', color: 'var(--chart-1)' },
  pending: { label: 'Pending', color: 'var(--brand-coral)' },
} satisfies ChartConfig

const buConfig = {
  AMBU: { label: 'AMBU', color: 'var(--chart-1)' },
  DBU: { label: 'DBU', color: 'var(--chart-2)' },
} satisfies ChartConfig

function buOf(businessEntity: string): BU | 'Unknown' {
  return businessEntityToBU[businessEntity] ?? 'Unknown'
}

const unmappedEntities = [
  ...new Set(mandatoryRows.filter((r) => buOf(r.businessEntity) === 'Unknown').map((r) => r.businessEntity)),
]

// ─── helpers ─────────────────────────────────────────────────────────────────

function pct(a: number, b: number) {
  return b === 0 ? 0 : Math.round((a / b) * 1000) / 10
}

function formatMonth(ym: string) {
  const [y, m] = ym.split('-')
  return new Date(Number(y), Number(m) - 1, 1).toLocaleDateString('en-GB', {
    month: 'short',
    year: '2-digit',
  })
}

function complianceTone(rate: number) {
  if (rate >= 80) return { text: 'text-chart-1', bar: 'bg-chart-1' }
  if (rate >= 60) return { text: 'text-brand-amber', bar: 'bg-brand-amber' }
  return { text: 'text-destructive', bar: 'bg-destructive' }
}

// ─── sub-components ──────────────────────────────────────────────────────────

function FilterChip<T extends string>({
  value,
  active,
  onClick,
  color,
}: {
  value: T
  active: boolean
  onClick: () => void
  color?: string
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
      {color && (
        <span className="size-2 rounded-full" style={{ backgroundColor: color }} aria-hidden="true" />
      )}
      {value}
    </button>
  )
}

function ComplianceBar({ completed, pending }: { completed: number; pending: number }) {
  const total = completed + pending
  const c = total ? (completed / total) * 100 : 0
  return (
    <div
      className="h-2.5 w-full overflow-hidden rounded-full bg-brand-sand/60"
      role="img"
      aria-label={`${completed} complete, ${pending} pending of ${total}`}
    >
      <div className="h-full bg-chart-1 transition-all duration-500" style={{ width: `${c}%` }} />
    </div>
  )
}

// ─── main component ───────────────────────────────────────────────────────────

export function MandatoryPage() {
  const [buFilter, setBuFilter] = useState<BUFilter>('ALL')
  const [courseFilter, setCourseFilter] = useState<CourseFilter>('ALL')
  const [statusFilter, setStatusFilter] = useState<StatusFilter>('All')
  const [countryFilter, setCountryFilter] = useState<CountryFilter>('ALL')

  const hasActiveFilter =
    buFilter !== 'ALL' || courseFilter !== 'ALL' || statusFilter !== 'All' || countryFilter !== 'ALL'

  function clearFilters() {
    setBuFilter('ALL')
    setCourseFilter('ALL')
    setStatusFilter('All')
    setCountryFilter('ALL')
  }

  // ── filtered rows ──────────────────────────────────────────────────────────
  const filteredRows = useMemo(
    () =>
      mandatoryRows.filter((r) => {
        if (buFilter !== 'ALL' && buOf(r.businessEntity) !== buFilter) return false
        if (courseFilter !== 'ALL' && r.course !== courseFilter) return false
        return true
      }),
    [buFilter, courseFilter, countryFilter],
  )

  // ── top-line KPIs ──────────────────────────────────────────────────────────
  const totals = useMemo(() => {
    const assigned = filteredRows.reduce((a, r) => a + r.assigned, 0)
    const completed = filteredRows.reduce((a, r) => a + r.completed, 0)
    const pending = assigned - completed
    return { assigned, completed, pending, complianceRatePct: pct(completed, assigned) }
  }, [filteredRows])

  const shownTotals =
    statusFilter === 'All'
      ? totals
      : statusFilter === 'Complete'
        ? { ...totals, assigned: totals.completed, pending: 0 }
        : { ...totals, assigned: totals.pending, completed: 0 }

  // ── compliance by course ───────────────────────────────────────────────────
  const byCourse = useMemo(() => {
    const m = new Map<string, { course: string; completed: number; pending: number }>()
    for (const r of filteredRows) {
      const e = m.get(r.course) ?? { course: r.course, completed: 0, pending: 0 }
      e.completed += r.completed
      e.pending += r.assigned - r.completed
      m.set(r.course, e)
    }
    return [...m.values()]
      .map((e) => ({
        ...e,
        completed: statusFilter === 'Pending' ? 0 : e.completed,
        pending: statusFilter === 'Complete' ? 0 : e.pending,
        rate: pct(e.completed, e.completed + e.pending),
      }))
      .sort((a, b) => b.completed + b.pending - (a.completed + a.pending))
  }, [filteredRows, statusFilter])

  // ── AMBU vs DBU ────────────────────────────────────────────────────────────
  const buStats = useMemo(() => {
    return (['AMBU', 'DBU'] as const)
      .filter((bu) => buFilter === 'ALL' || buFilter === bu)
      .map((bu) => {
        const rows = filteredRows.filter((r) => buOf(r.businessEntity) === bu)
        const assigned = rows.reduce((a, r) => a + r.assigned, 0)
        const completed = rows.reduce((a, r) => a + r.completed, 0)
        return { bu, assigned, completed, pending: assigned - completed, rate: pct(completed, assigned) }
      })
  }, [filteredRows, buFilter])

  const buChartData = useMemo(
    () =>
      buStats.map((s) => ({
        bu: s.bu,
        completed: statusFilter === 'Pending' ? 0 : s.completed,
        pending: statusFilter === 'Complete' ? 0 : s.pending,
      })),
    [buStats, statusFilter],
  )

  // ── business entity leaderboard (sorted by pending desc) ──────────────────
  const entityLeaderboard = useMemo(() => {
    const m = new Map<string, { businessEntity: string; bu: BU | 'Unknown'; assigned: number; completed: number }>()
    for (const r of filteredRows) {
      const e = m.get(r.businessEntity) ?? {
        businessEntity: r.businessEntity,
        bu: buOf(r.businessEntity),
        assigned: 0,
        completed: 0,
      }
      e.assigned += r.assigned
      e.completed += r.completed
      m.set(r.businessEntity, e)
    }
    return [...m.values()]
      .map((e) => ({ ...e, pending: e.assigned - e.completed, rate: pct(e.completed, e.assigned) }))
      .sort((a, b) => b.pending - a.pending)
  }, [filteredRows])

  // ── pending-only location breakdown ────────────────────────────────────────
  // Completed exports have no location key, so never infer completed counts here.
  const byLocation = useMemo(() => {
    if (statusFilter === 'Complete') return []

    const m = new Map<string, { jobLocation: string; pending: number }>()
    for (const r of pendingByLocation) {
      if (buFilter !== 'ALL' && r.bu !== buFilter) continue
      if (courseFilter !== 'ALL' && r.course !== courseFilter) continue
      if (countryFilter !== 'ALL' && r.country !== countryFilter) continue
      const e = m.get(r.jobLocation) ?? { jobLocation: r.jobLocation, pending: 0 }
      e.pending += r.pending
      m.set(r.jobLocation, e)
    }
    return [...m.values()].sort((a, b) => b.pending - a.pending)
  }, [buFilter, courseFilter, countryFilter, statusFilter])

  // ── monthly completion trend ───────────────────────────────────────────────
  const trendData = useMemo(
    () =>
      completionsByMonth
        .filter(() => buFilter === 'ALL' || true) // trend has no entity/course grain to filter by; BU column still respects buFilter below
        .map((m) => ({
          month: m.month,
          label: formatMonth(m.month),
          AMBU: buFilter === 'DBU' ? 0 : m.AMBU,
          DBU: buFilter === 'AMBU' ? 0 : m.DBU,
        })),
    [buFilter],
  )

  // ── at-risk table (below 80% threshold) ────────────────────────────────────
  const atRisk = useMemo(
    () =>
      byCourse
        .map((c) => ({ ...c, rate: pct(c.completed, c.completed + c.pending) }))
        .filter((c) => c.rate < 80)
        .sort((a, b) => a.rate - b.rate),
    [byCourse],
  )

  return (
    <div className="flex flex-col gap-6 lg:gap-8">
      <PageHeader
        title="Mandatory Learning Compliance"
        description="Completions vs pending for mandatory courses across AMBU and DBU."
        badge={<ScopeBadge>Compliance</ScopeBadge>}
      />

      {meta.isSampleData && (
        <InfoBanner>
          This page is showing sample data seeded to match the LMS completions and pending
          assignment export formats.
          {unmappedEntities.length > 0 && (
            <>
              {' '}
              {unmappedEntities.length} business entit{unmappedEntities.length === 1 ? 'y' : 'ies'} could
              not be mapped to AMBU or DBU and appear as &quot;Unknown&quot;: {unmappedEntities.join(', ')}.
            </>
          )}
        </InfoBanner>
      )}

      {/* ── Filter bar ─────────────────────────────────────────────────────── */}
      <section className="rounded-xl border border-border bg-card px-5 py-4 shadow-sm">
        <div className="flex flex-wrap items-center gap-4">
          <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
            <SlidersHorizontal className="size-4" aria-hidden="true" />
            Filters
          </div>

          {/* BU */}
          <div className="flex items-center gap-1.5">
            <span className="text-xs text-muted-foreground">BU</span>
            <div className="flex items-center gap-1">
              {(['ALL', 'AMBU', 'DBU'] as BUFilter[]).map((v) => (
                <FilterChip
                  key={v}
                  value={v === 'ALL' ? 'Both' : v}
                  active={buFilter === v}
                  onClick={() => setBuFilter(v)}
                  color={v !== 'ALL' ? BU_COLORS[v] : undefined}
                />
              ))}
            </div>
          </div>

          <div className="h-4 w-px bg-border" aria-hidden="true" />

          {/* Course */}
          <div className="flex items-center gap-1.5">
            <span className="text-xs text-muted-foreground">Course</span>
            <div className="flex flex-wrap items-center gap-1">
              {COURSE_OPTIONS.map((v) => (
                <FilterChip
                  key={v}
                  value={v === 'ALL' ? 'All' : v}
                  active={courseFilter === v}
                  onClick={() => setCourseFilter(v)}
                />
              ))}
            </div>
          </div>

          <div className="h-4 w-px bg-border" aria-hidden="true" />

          {/* Status */}
          <div className="flex items-center gap-1.5">
            <span className="text-xs text-muted-foreground">Status</span>
            <div className="flex items-center gap-1">
              {STATUS_OPTIONS.map((v) => (
                <FilterChip key={v} value={v} active={statusFilter === v} onClick={() => setStatusFilter(v)} />
              ))}
            </div>
          </div>

          <div className="h-4 w-px bg-border" aria-hidden="true" />

          {/* Country */}
          <div className="flex items-center gap-1.5">
            <span className="text-xs text-muted-foreground">Country</span>
            <div className="flex flex-wrap items-center gap-1">
              {COUNTRY_OPTIONS.map((v) => (
                <FilterChip
                  key={v}
                  value={v === 'ALL' ? 'All' : v}
                  active={countryFilter === v}
                  onClick={() => setCountryFilter(v)}
                />
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
            Showing <span className="font-medium text-foreground">{totals.assigned} assignments</span>
            {buFilter !== 'ALL' && (
              <>
                {' '}
                · BU: <span className="font-medium text-foreground">{buFilter}</span>
              </>
            )}
            {courseFilter !== 'ALL' && (
              <>
                {' '}
                · Course: <span className="font-medium text-foreground">{courseFilter}</span>
              </>
            )}
            {statusFilter !== 'All' && (
              <>
                {' '}
                · Status: <span className="font-medium text-foreground">{statusFilter}</span>
              </>
            )}
            {countryFilter !== 'ALL' && (
              <>
                {' '}
                · Country: <span className="font-medium text-foreground">{countryFilter}</span>
              </>
            )}
          </p>
        )}
        {countryFilter !== 'ALL' && (
          <p className="mt-2 text-xs italic text-muted-foreground/75">
            Country applies to the pending-location view only; completed records do not include location.
          </p>
        )}
      </section>

      {/* ── KPI strip ──────────────────────────────────────────────────────── */}
      <section className="grid grid-cols-2 gap-4 md:grid-cols-4">
        <KpiTile
          label="Total Assigned"
          value={totals.assigned.toLocaleString()}
          sub={hasActiveFilter ? 'matching filters' : 'across all mandatory courses'}
          docId="mandatory-assigned"
        />
        <KpiTile
          label="Completed"
          value={shownTotals.completed.toLocaleString()}
          sub={`${pct(totals.completed, totals.assigned)}% of assigned`}
          emphasis
          docId="mandatory-completed"
        />
        <KpiTile
          label="Pending"
          value={shownTotals.pending.toLocaleString()}
          sub="not yet complete"
          docId="mandatory-pending"
        />
        <KpiTile
          label="Compliance Rate"
          value={`${totals.complianceRatePct}%`}
          sub="completed of assigned"
          emphasis
          docId="mandatory-compliance-rate"
        />
      </section>

      {/* ── Compliance by course ──────────────────────────────────────────── */}
      <ChartCard
        title="Compliance by Course"
        description="Completed vs pending headcount for each mandatory course."
        docId="mandatory-by-course"
      >
        <ChartContainer config={statusConfig} className="h-[320px] w-full">
          <BarChart data={byCourse} layout="vertical" margin={{ left: 8, right: 24 }}>
            <CartesianGrid horizontal={false} strokeDasharray="3 3" />
            <XAxis type="number" tickLine={false} axisLine={false} />
            <YAxis
              type="category"
              dataKey="course"
              tickLine={false}
              axisLine={false}
              width={170}
              tick={{ fontSize: 12 }}
            />
            <ChartTooltip content={<ChartTooltipContent />} />
            <Bar dataKey="completed" stackId="s" fill="var(--color-completed)" radius={[0, 0, 0, 0]} />
            <Bar dataKey="pending" stackId="s" fill="var(--color-pending)" radius={[0, 4, 4, 0]}>
              <LabelList
                dataKey="rate"
                position="right"
                formatter={(v) => `${v ?? ''}%`}
                className="fill-foreground text-xs"
              />
            </Bar>
          </BarChart>
        </ChartContainer>
      </ChartCard>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        {/* ── AMBU vs DBU ────────────────────────────────────────────────── */}
        <ChartCard title="AMBU vs DBU" description="Completed and pending headcount by business unit.">
          <ChartContainer config={statusConfig} className="h-[240px] w-full">
            <BarChart data={buChartData} margin={{ left: 0, right: 8 }}>
              <CartesianGrid vertical={false} strokeDasharray="3 3" />
              <XAxis dataKey="bu" tickLine={false} axisLine={false} />
              <YAxis tickLine={false} axisLine={false} width={36} />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Bar dataKey="completed" stackId="s" fill="var(--color-completed)" radius={[0, 0, 0, 0]} />
              <Bar dataKey="pending" stackId="s" fill="var(--color-pending)" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ChartContainer>
          <div className="mt-3 flex flex-col gap-2">
            {buStats.map((s) => (
              <div key={s.bu} className="flex items-center justify-between text-sm">
                <span className="flex items-center gap-1.5 font-medium text-foreground">
                  <span className="size-2.5 rounded-full" style={{ backgroundColor: BU_COLORS[s.bu] }} aria-hidden="true" />
                  {s.bu}
                </span>
                <span className={cn('font-semibold tabular-nums', complianceTone(s.rate).text)}>{s.rate}%</span>
              </div>
            ))}
          </div>
        </ChartCard>

        {/* ── Job location breakdown ────────────────────────────────────── */}
        <ChartCard
          title="Pending by Job Location"
          description="Where outstanding mandatory completions are located. Pending learners only."
        >
          {statusFilter === 'Complete' ? (
            <p className="py-6 text-center text-sm text-muted-foreground">
              Location is not available for completed learners in the source export.
            </p>
          ) : (
            <ChartContainer config={statusConfig} className="h-[240px] w-full">
              <BarChart data={byLocation} margin={{ left: 0, right: 8 }}>
                <CartesianGrid vertical={false} strokeDasharray="3 3" />
                <XAxis dataKey="jobLocation" tickLine={false} axisLine={false} tick={{ fontSize: 11 }} />
                <YAxis tickLine={false} axisLine={false} width={36} />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Bar dataKey="pending" fill="var(--color-pending)" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ChartContainer>
          )}
        </ChartCard>
      </div>

      {/* ── Business entity leaderboard ────────────────────────────────────── */}
      <ChartCard
        title="Business Entity Leaderboard"
        description="Ranked by pending headcount, highest first. Aggregates only."
        docId="mandatory-by-entity"
      >
        <div className="flex flex-col gap-3">
          {entityLeaderboard.map((e) => {
            const tone = complianceTone(e.rate)
            return (
              <div key={e.businessEntity} className="flex flex-col gap-1.5">
                <div className="flex items-center justify-between gap-2 text-sm">
                  <span className="flex items-center gap-1.5 font-medium text-foreground">
                    <span
                      className="size-2 rounded-full"
                      style={{ backgroundColor: e.bu === 'Unknown' ? 'var(--muted-foreground)' : BU_COLORS[e.bu] }}
                      aria-hidden="true"
                    />
                    {e.businessEntity}
                    <span className="text-xs font-normal text-muted-foreground">({e.bu})</span>
                  </span>
                  <span className="text-xs text-muted-foreground">
                    <span className="font-medium text-foreground">{e.pending}</span> pending ·{' '}
                    <span className={cn('font-medium', tone.text)}>{e.rate}%</span> complete
                  </span>
                </div>
                <div
                  className="h-2 w-full overflow-hidden rounded-full bg-brand-sand/60"
                  role="img"
                  aria-label={`${e.completed} completed, ${e.pending} pending of ${e.assigned}`}
                >
                  <div className={cn('h-full transition-all duration-500', tone.bar)} style={{ width: `${e.rate}%` }} />
                </div>
              </div>
            )
          })}
        </div>
      </ChartCard>

      {/* ── Monthly completion trend ────────────────────────────────────────── */}
      <ChartCard
        title="Completion Trend"
        description="Mandatory-course completions recorded each month, by business unit."
        docId="mandatory-trend"
      >
        <ChartContainer config={buConfig} className="h-[260px] w-full">
          <AreaChart data={trendData} margin={{ left: 0, right: 8 }}>
            <CartesianGrid vertical={false} strokeDasharray="3 3" />
            <XAxis dataKey="label" tickLine={false} axisLine={false} />
            <YAxis tickLine={false} axisLine={false} width={32} />
            <ChartTooltip content={<ChartTooltipContent />} />
            <Area
              type="monotone"
              dataKey="AMBU"
              stroke="var(--color-AMBU)"
              fill="var(--color-AMBU)"
              fillOpacity={0.18}
              strokeWidth={2}
            />
            <Area
              type="monotone"
              dataKey="DBU"
              stroke="var(--color-DBU)"
              fill="var(--color-DBU)"
              fillOpacity={0.18}
              strokeWidth={2}
            />
          </AreaChart>
        </ChartContainer>
      </ChartCard>

      {/* ── At-risk table ─────────────────────────────────────────────────── */}
      <ChartCard
        title="Courses Below 80% Compliance"
        description="Mandatory courses that need the most follow-up, lowest completion first."
      >
        {atRisk.length === 0 ? (
          <p className="py-6 text-center text-sm text-muted-foreground">
            Every course meets the 80% compliance threshold for the current filters.
          </p>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Course</TableHead>
                <TableHead className="text-right">Completed</TableHead>
                <TableHead className="text-right">Pending</TableHead>
                <TableHead className="text-right">Compliance</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {atRisk.map((c) => {
                const tone = complianceTone(c.rate)
                return (
                  <TableRow key={c.course}>
                    <TableCell className="flex items-center gap-2 font-medium">
                      <AlertTriangle className={cn('size-3.5', tone.text)} aria-hidden="true" />
                      {c.course}
                    </TableCell>
                    <TableCell className="text-right tabular-nums">{c.completed}</TableCell>
                    <TableCell className="text-right tabular-nums">{c.pending}</TableCell>
                    <TableCell className={cn('text-right font-semibold tabular-nums', tone.text)}>
                      {c.rate}%
                    </TableCell>
                  </TableRow>
                )
              })}
            </TableBody>
          </Table>
        )}
      </ChartCard>
    </div>
  )
}
