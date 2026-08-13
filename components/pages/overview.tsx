'use client'

import { useMemo, useState } from 'react'
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
import Link from 'next/link'
import { Card, CardContent } from '@/components/ui/card'
import { ChartCard, InfoBanner, KpiTile, PageHeader } from '@/components/dashboard/shared'
import { ScopeBadge } from '@/components/dashboard/scope-badge'
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
import { kpis as skillupKpis } from '@/lib/skillup-data'
import { kpis as allLearningsKpis } from '@/lib/all-learnings-data'
import { filterRules } from '@/lib/filter-rules'
import { useFilters } from '@/lib/filters-context'
import { cn } from '@/lib/utils'

const buConfig = {
  AMBU: { label: 'AMBU', color: 'var(--chart-1)' },
  DBU: { label: 'DBU', color: 'var(--chart-2)' },
  Unknown: { label: 'Unknown', color: 'var(--chart-4)' },
} satisfies ChartConfig

const hoursConfig = {
  hours: { label: 'Hours', color: 'var(--chart-1)' },
} satisfies ChartConfig

export function OverviewPage() {
  const { filters, toggle } = useFilters()
  const [excludeSkillup, setExcludeSkillup] = useState(false)

  const hours = useMemo(() => filterHours(filters), [filters])
  const reach = useMemo(() => filterReach(filters), [filters])
  const fb = useMemo(
    () => filterFeedback(filters, [...filterRules['overview.satisfactionKpi']]),
    [filters],
  )
  const comp = useMemo(() => filterCompletion(filters), [filters])

  const totalHours = sumBy(hours, (r) => r.totalHours)

  // SkillUp hours — BU-aware, excluded when a month/program drill-down is active, or user toggled off
  const hasMonthOrProgramFilter = filters.months?.length > 0 || filters.programs?.length > 0
  const skillupHoursBase = (() => {
    if (hasMonthOrProgramFilter) return 0
    if (filters.bus.length === 1 && filters.bus[0] === 'AMBU') return skillupKpis.learningHoursByBU.AMBU
    if (filters.bus.length === 1 && filters.bus[0] === 'DBU') return skillupKpis.learningHoursByBU.DBU
    return skillupKpis.learningHours
  })()
  const skillupHoursAdded = excludeSkillup ? 0 : skillupHoursBase
  const adjustedTotalHours = Math.round(totalHours + skillupHoursAdded)

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
      .map(([code, h]) => ({ code, name: programName(code), hours: Math.round(h) }))
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
        title="Programme Overview"
        description="Facilitated programmes L&D designs and delivers — with feedback, NPS and eligibility tracking."
        badge={<ScopeBadge>Curated programmes</ScopeBadge>}
      />

      {feedbackFiltersActive && <InfoBanner>{meta.grainNote}</InfoBanner>}

      {/* Hero KPI strip — 8 tiles, 2 rows of 4 */}
      <section
        aria-label="Key performance indicators"
        className="grid grid-cols-2 gap-3 md:grid-cols-4 lg:gap-4 xl:gap-5"
      >
        {/* Row 1 — Delivery */}
        <KpiTile
          label="Programme Hours"
          docId="learning-hours"
          value={formatNumber(adjustedTotalHours)}
          sub={
            hasMonthOrProgramFilter
              ? 'excl. SkillUp (no monthly grain)'
              : excludeSkillup
                ? 'SkillUp hours excluded'
                : `incl. ${skillupHoursBase.toFixed(1)} hrs from SkillUp journeys`
          }
        >
          {!hasMonthOrProgramFilter && (
            <button
              type="button"
              onClick={() => setExcludeSkillup((v) => !v)}
              className={cn(
                'mt-1 self-start rounded-full border px-2 py-0.5 text-[10px] font-medium transition-colors',
                excludeSkillup
                  ? 'border-muted-foreground/30 bg-muted text-muted-foreground hover:bg-muted/70'
                  : 'border-primary/30 bg-primary/10 text-primary hover:bg-primary/20',
              )}
              aria-pressed={excludeSkillup}
            >
              {excludeSkillup ? 'SkillUp: off' : 'SkillUp: on'}
            </button>
          )}
        </KpiTile>
        <KpiTile
          label="Total Completions"
          docId="completions"
          value={formatNumber(totalCompletions)}
          sub={`AMBU ${formatNumber(Math.round(completionsByBU.get('AMBU') ?? 0))} · DBU ${formatNumber(Math.round(completionsByBU.get('DBU') ?? 0))}`}
        />
        <KpiTile
          label="Unique Learners"
          docId="unique-learners"
          value={formatNumber(uniqueLearners)}
          sub="distinct learners"
        />
        <KpiTile
          label="Programs Active"
          docId="active-programs"
          value={String(activePrograms.length)}
          sub={`${kpis.programsCount} total across 2024–2026`}
        />
        {/* Row 2 — Quality */}
        <KpiTile
          label="Avg Satisfaction"
          docId="avg-satisfaction"
          value={avgSat > 0 ? `${avgSat.toFixed(2)} / 5` : '—'}
          sub="normalized to 1-5, cross-program weighted"
          emphasis
        />
        <KpiTile
          label="Satisfaction Rate"
          docId="satisfaction-rate"
          value={satRatePct > 0 ? `${satRatePct.toFixed(1)}%` : '—'}
          sub="top-2-box on native scale"
          emphasis
        />
        <KpiTile
          label="Feedback Responses"
          docId="feedback-responses"
          value={formatNumber(responses)}
          sub={`${formatNumber(kpis.feedbackResponses)} total across all programs`}
        />
        <KpiTile
          label="Completion Rate"
          docId="completion-rate"
          value={`${completionRate.toFixed(1)}%`}
          sub={`${formatNumber(completed)} / ${formatNumber(eligible)} eligible`}
          emphasis
        />
      </section>

      <p className="text-xs text-muted-foreground">
        Total LMS activity including self-paced, compliance and leadership programmes:{' '}
        {formatNumber(Math.round(allLearningsKpis.totalHours))} hrs →{' '}
        <Link href="/all-learnings" className="font-medium text-accent underline-offset-2 hover:underline">
          View all
        </Link>
      </p>

      <section className="grid grid-cols-1 gap-4 lg:gap-5 xl:gap-6 lg:grid-cols-2">
        {/* Donut / single BU big number */}
        <ChartCard
          title="Learning Hours by BU"
          docId="hours-by-bu"
          description={singleBU ? 'Single BU in scope — showing total.' : 'Share of total hours per business unit.'}
        >
          {singleBU ? (
            <div className="flex h-56 flex-col items-center justify-center gap-1 lg:h-72 xl:h-80">
              <span className="text-5xl font-semibold text-primary tabular-nums">
                {formatNumber(donutData[0].hours)}
              </span>
              <span className="text-sm text-muted-foreground">{donutData[0].bu} hours</span>
            </div>
          ) : (
            <ChartContainer config={buConfig} className="mx-auto h-56 w-full lg:h-72 xl:h-80">
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
        <ChartCard title="Hours by Month" docId="hours-by-month" description="AMBU vs DBU, stacked across 2024–2026.">
          <ChartContainer config={buConfig} className="h-56 w-full lg:h-72 xl:h-80">
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
      <ChartCard title="Program Contribution" docId="program-contribution" description="Learning hours by program, sorted descending.">
        <ChartContainer config={hoursConfig} className="h-56 w-full lg:h-72 xl:h-80">
          <BarChart data={programBars} layout="vertical" margin={{ left: 8, right: 16 }} onClick={(state: any) => {
            if (state?.activeTooltipIndex !== undefined && programBars[state.activeTooltipIndex]) {
              const program = programBars[state.activeTooltipIndex]
              toggle('programs', program.code)
            }
          }}>
            <CartesianGrid horizontal={false} strokeDasharray="3 3" />
            <XAxis type="number" tickLine={false} axisLine={false} fontSize={11} />
            <YAxis
              type="category"
              dataKey="name"
              tickLine={false}
              axisLine={false}
              fontSize={11}
              width={170}
              style={{ cursor: 'pointer' }}
            />
            <ChartTooltip content={<ChartTooltipContent />} />
            <Bar dataKey="hours" fill="var(--color-hours)" radius={[0, 4, 4, 0]} style={{ cursor: 'pointer' }} onClick={(data: any) => {
              if (data?.code) {
                toggle('programs', data.code)
              }
            }} />
          </BarChart>
        </ChartContainer>
      </ChartCard>

      {/* Country heat cards */}
      <section aria-label="Country breakdown" className="grid grid-cols-2 gap-3 md:grid-cols-3 lg:gap-4 xl:grid-cols-5 xl:gap-5">
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
