'use client'

import { useMemo } from 'react'
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Pie,
  PieChart,
  XAxis,
  YAxis,
} from 'recharts'
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from '@/components/ui/chart'
import { Card, CardContent } from '@/components/ui/card'
import { ChartCard, InfoBanner, KpiTile, PageHeader } from '@/components/dashboard/shared'
import {
  avgBy,
  avgSatRatePct,
  filterCompletion,
  filterFeedback,
  filterHours,
  filterReach,
  formatNumber,
  groupSum,
  normalizedAvgSat,
  programName,
  sumBy,
} from '@/lib/aggregate'
import { kpis, meta, programs } from '@/lib/dashboard-data'
import { useFilters } from '@/lib/filters-context'

const buConfig = {
  AMBU: { label: 'AMBU', color: 'var(--chart-1)' },
  DBU: { label: 'DBU', color: 'var(--chart-2)' },
  Unknown: { label: 'Unknown', color: 'var(--chart-4)' },
} satisfies ChartConfig

const hoursConfig = {
  hours: { label: 'Hours', color: 'var(--chart-1)' },
} satisfies ChartConfig

export function OverviewPage() {
  const { filters } = useFilters()

  const hours = useMemo(() => filterHours(filters), [filters])
  const reach = useMemo(() => filterReach(filters), [filters])
  const fb = useMemo(() => filterFeedback(filters), [filters])
  const comp = useMemo(() => filterCompletion(filters), [filters])

  const totalHours = sumBy(hours, (r) => r.totalHours)
  const totalCompletions = sumBy(hours, (r) => r.completions)
  const completionsByBU = groupSum(hours, (r) => r.bu, (r) => r.completions)
  const uniqueLearners = sumBy(reach, (r) => r.uniqueLearners)
  const avgSat = normalizedAvgSat(fb)
  const satRatePct = avgSatRatePct(fb)
  const responses = sumBy(fb, (r) => r.responses)
  const eligible = sumBy(comp, (r) => r.eligible)
  const completed = sumBy(comp, (r) => r.completedEligible)
  const completionRate = eligible > 0 ? (completed / eligible) * 100 : 0

  const activePrograms = useMemo(() => {
    let list = programs
    if (filters.years.length > 0) {
      const active = new Set(hours.map((r) => r.programCode))
      list = list.filter((p) => active.has(p.code))
    }
    if (filters.bus.length > 0) {
      list = list.filter((p) =>
        filters.bus.some((bu: string) => p.buScope.includes(bu === 'Unknown' ? 'x-none' : bu)),
      )
    }
    return list
  }, [filters, hours])

  const feedbackFiltersActive =
    filters.bus.length > 0 || filters.countries.length > 0 || filters.roles.length > 0

  // Donut: hours by BU
  const byBU = groupSum(hours, (r) => r.bu, (r) => r.totalHours)
  const donutData = ['AMBU', 'DBU', 'Unknown']
    .map((bu) => ({ bu, hours: Math.round(byBU.get(bu) ?? 0) }))
    .filter((d) => d.hours > 0)
  const singleBU = donutData.length === 1

  // Stacked area: hours by month split by BU
  const areaData = useMemo(() => {
    const months = Array.from(new Set(hours.map((r) => r.month))).sort()
    return months.map((month) => {
      const rows = hours.filter((r) => r.month === month)
      return {
        month,
        AMBU: Math.round(sumBy(rows.filter((r) => r.bu === 'AMBU'), (r) => r.totalHours)),
        DBU: Math.round(sumBy(rows.filter((r) => r.bu === 'DBU'), (r) => r.totalHours)),
      }
    })
  }, [hours])

  // Horizontal bar: program contribution
  const programBars = useMemo(() => {
    const m = groupSum(hours, (r) => r.programCode, (r) => r.totalHours)
    return Array.from(m.entries())
      .map(([code, h]) => ({ name: programName(code), hours: Math.round(h) }))
      .sort((a, b) => b.hours - a.hours)
  }, [hours])

  // Country cards
  const countryCards = useMemo(() => {
    const h = groupSum(hours, (r) => r.country, (r) => r.totalHours)
    const c = groupSum(hours, (r) => r.country, (r) => r.completions)
    return Array.from(h.entries())
      .map(([country, hrs]) => ({
        country,
        hours: Math.round(hrs),
        completions: Math.round(c.get(country) ?? 0),
      }))
      .sort((a, b) => b.hours - a.hours)
  }, [hours])

  return (
    <>
      <PageHeader
        title="Executive Overview"
        description="Learning hours, completions, reach, and satisfaction across all MAF programs."
      />

      {feedbackFiltersActive && <InfoBanner>{meta.grainNote}</InfoBanner>}

      {/* Hero KPI strip — 8 tiles, 2 rows of 4 */}
      <section
        aria-label="Key performance indicators"
        className="grid grid-cols-2 gap-3 md:grid-cols-4"
      >
        {/* Row 1 — Delivery */}
        <KpiTile
          label="Learning Hours"
          value={formatNumber(totalHours)}
          sub={`AMBU ${formatNumber(Math.round(completionsByBU.get('AMBU') ?? 0))} · DBU ${formatNumber(Math.round(completionsByBU.get('DBU') ?? 0))} completions`}
        />
        <KpiTile
          label="Total Completions"
          value={formatNumber(totalCompletions)}
          sub={`AMBU ${formatNumber(Math.round(completionsByBU.get('AMBU') ?? 0))} · DBU ${formatNumber(Math.round(completionsByBU.get('DBU') ?? 0))}`}
        />
        <KpiTile
          label="Unique Learners"
          value={formatNumber(uniqueLearners)}
          sub="distinct learners (PII-free grain)"
        />
        <KpiTile
          label="Programs Active"
          value={String(activePrograms.length)}
          sub={`${kpis.programsCount} total across 2024–2026`}
        />
        {/* Row 2 — Quality */}
        <KpiTile
          label="Avg Satisfaction"
          value={avgSat > 0 ? `${avgSat.toFixed(2)} / 5` : '—'}
          sub="normalized to 1-5, cross-program weighted"
          emphasis
        />
        <KpiTile
          label="Satisfaction Rate"
          value={satRatePct > 0 ? `${satRatePct.toFixed(1)}%` : '—'}
          sub="top-2-box on native scale"
          emphasis
        />
        <KpiTile
          label="Feedback Responses"
          value={formatNumber(responses)}
          sub={`${formatNumber(kpis.feedbackResponses)} total across all programs`}
        />
        <KpiTile
          label="Completion Rate"
          value={`${completionRate.toFixed(1)}%`}
          sub={`${formatNumber(completed)} / ${formatNumber(eligible)} eligible`}
          emphasis
        />
      </section>

      <section className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        {/* Donut / single BU big number */}
        <ChartCard
          title="Learning Hours by BU"
          description={singleBU ? 'Single BU in scope — showing total.' : 'Share of total hours per business unit.'}
        >
          {singleBU ? (
            <div className="flex h-64 flex-col items-center justify-center gap-1">
              <span className="text-5xl font-semibold text-primary tabular-nums">
                {formatNumber(donutData[0].hours)}
              </span>
              <span className="text-sm text-muted-foreground">{donutData[0].bu} hours</span>
            </div>
          ) : (
            <ChartContainer config={buConfig} className="mx-auto h-64 w-full">
              <PieChart>
                <ChartTooltip content={<ChartTooltipContent nameKey="bu" />} />
                <Pie
                  data={donutData}
                  dataKey="hours"
                  nameKey="bu"
                  innerRadius={60}
                  outerRadius={90}
                  strokeWidth={2}
                >
                  {donutData.map((d) => (
                    <Cell key={d.bu} fill={`var(--color-${d.bu})`} />
                  ))}
                </Pie>
                <text
                  x="50%"
                  y="48%"
                  textAnchor="middle"
                  className="fill-foreground text-2xl font-semibold"
                >
                  {formatNumber(totalHours)}
                </text>
                <text
                  x="50%"
                  y="57%"
                  textAnchor="middle"
                  className="fill-muted-foreground text-xs"
                >
                  total hours
                </text>
              </PieChart>
            </ChartContainer>
          )}
        </ChartCard>

        {/* Stacked area */}
        <ChartCard title="Hours by Month" description="AMBU vs DBU, stacked across 2024–2026.">
          <ChartContainer config={buConfig} className="h-64 w-full">
            <AreaChart data={areaData} margin={{ left: 0, right: 8 }}>
              <CartesianGrid vertical={false} strokeDasharray="3 3" />
              <XAxis dataKey="month" tickLine={false} axisLine={false} fontSize={11} />
              <YAxis tickLine={false} axisLine={false} fontSize={11} width={40} />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Area
                dataKey="AMBU"
                stackId="a"
                type="monotone"
                fill="var(--color-AMBU)"
                fillOpacity={0.5}
                stroke="var(--color-AMBU)"
              />
              <Area
                dataKey="DBU"
                stackId="a"
                type="monotone"
                fill="var(--color-DBU)"
                fillOpacity={0.5}
                stroke="var(--color-DBU)"
              />
            </AreaChart>
          </ChartContainer>
        </ChartCard>
      </section>

      {/* Program contribution */}
      <ChartCard title="Program Contribution" description="Learning hours by program, sorted descending.">
        <ChartContainer config={hoursConfig} className="h-80 w-full">
          <BarChart data={programBars} layout="vertical" margin={{ left: 8, right: 16 }}>
            <CartesianGrid horizontal={false} strokeDasharray="3 3" />
            <XAxis type="number" tickLine={false} axisLine={false} fontSize={11} />
            <YAxis
              type="category"
              dataKey="name"
              tickLine={false}
              axisLine={false}
              fontSize={11}
              width={170}
            />
            <ChartTooltip content={<ChartTooltipContent />} />
            <Bar dataKey="hours" fill="var(--color-hours)" radius={[0, 4, 4, 0]} />
          </BarChart>
        </ChartContainer>
      </ChartCard>

      {/* Country heat cards */}
      <section aria-label="Country breakdown" className="grid grid-cols-2 gap-3 md:grid-cols-3 xl:grid-cols-5">
        {countryCards.map((c) => (
          <Card key={c.country} className="gap-2 py-4">
            <CardContent className="flex flex-col gap-1 px-4">
              <span className="text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
                {c.country}
              </span>
              <span className="text-2xl font-semibold text-primary tabular-nums">
                {formatNumber(c.hours)}
              </span>
              <span className="text-xs text-muted-foreground">
                hours · {formatNumber(c.completions)} completions
              </span>
            </CardContent>
          </Card>
        ))}
      </section>
    </>
  )
}
