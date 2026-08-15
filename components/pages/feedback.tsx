'use client'

import { useMemo } from 'react'
import {
  Bar,
  BarChart,
  CartesianGrid,
  ErrorBar,
  Line,
  LineChart,
  XAxis,
  YAxis,
} from 'recharts'
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
import {
  avgBy,
  avgNormalizedConfidence,
  avgNormalizedFacilitator,
  avgSatRatePct,
  filterFeedback,
  formatNumber,
  normalizedAvgSat,
  programName,
  sumBy,
} from '@/lib/aggregate'
import { kpis } from '@/lib/dashboard-data'
import { useFilters } from '@/lib/filters-context'
import { pageBanners } from '@/lib/filter-rules'
import { formatSatisfaction, normalizedFacilitator, normalizedSatisfaction } from '@/lib/types'
import type { FeedbackRow } from '@/lib/types'

const histConfig = {
  sessions: { label: 'Sessions', color: 'var(--chart-3)' },
} satisfies ChartConfig

const benchConfig = {
  avg: { label: 'Avg satisfaction', color: 'var(--chart-1)' },
} satisfies ChartConfig

const trendConfig = {
  satisfaction: { label: 'Avg satisfaction', color: 'var(--chart-3)' },
} satisfies ChartConfig

export function FeedbackPage() {
  const { filters } = useFilters()
  const fb = useMemo(() => filterFeedback(filters), [filters])

  const dated = fb.filter((r) => r.month !== null)
  const undated = fb.filter((r) => r.month === null)

  const responses = sumBy(fb, (r) => r.responses)
  // Use normalizedAvgSat for cross-scale average; keep native for per-program display
  const avgSat = normalizedAvgSat(fb)
  const satRatePct = avgSatRatePct(fb)
  const psNpsTiles = useMemo(() => {
    const selectedPrograms = filters.programs.length > 0
      ? filters.programs
      : Object.keys(kpis.npsByProgramBU)
    const selectedBus = filters.bus.filter((bu): bu is 'AMBU' | 'DBU' =>
      bu === 'AMBU' || bu === 'DBU',
    )
    const bus = selectedBus.length > 0 ? selectedBus : (['AMBU', 'DBU'] as const)

    return selectedPrograms.flatMap((programCode) => {
      const values = kpis.npsByProgramBU[programCode]
      if (!values) return []
      return bus.flatMap((bu) =>
        values[bu] == null ? [] : [{ programCode, bu, nps: values[bu] }],
      )
    })
  }, [filters.bus, filters.programs])
  // Normalize sub-metrics to 1-5 before averaging so PS (0-10) rows don't skew results
  const avgFac = avgNormalizedFacilitator(fb)
  const avgConf = avgNormalizedConfidence(fb)
  const recRate = avgBy(fb, (r) => r.recommendationRatePct, (r) => r.responses)

  // Histogram: distribution on normalized 1-5 scale (so PS rows are comparable)
  const hist = useMemo(() => {
    const buckets = [
      { label: '<3.5', min: 0, max: 3.5, sessions: 0 },
      { label: '3.5–4.0', min: 3.5, max: 4.0, sessions: 0 },
      { label: '4.0–4.3', min: 4.0, max: 4.3, sessions: 0 },
      { label: '4.3–4.6', min: 4.3, max: 4.6, sessions: 0 },
      { label: '4.6–4.8', min: 4.6, max: 4.8, sessions: 0 },
      { label: '4.8–5.0', min: 4.8, max: 5.01, sessions: 0 },
    ]
    for (const r of fb) {
      const v = normalizedSatisfaction(r)
      if (v == null) continue
      const b = buckets.find((b) => v >= b.min && v < b.max)
      if (b) b.sessions++
    }
    return buckets
  }, [fb])

  // Program benchmark: uses normalizedSatisfaction so 0-10 PS rows are comparable
  const benchmark = useMemo(() => {
    const codes = Array.from(new Set(fb.map((r) => r.programCode)))
    return codes
      .map((code) => {
        const rows = fb.filter((r) => r.programCode === code)
        const normVals = rows.map((r) => normalizedSatisfaction(r)).filter((v): v is number => v != null)
        const avg = normalizedAvgSat(rows)
        return {
          name: programName(code),
          avg: Math.round(avg * 100) / 100,
          errLow: normVals.length ? Math.round((avg - Math.min(...normVals)) * 100) / 100 : 0,
          errHigh: normVals.length ? Math.round((Math.max(...normVals) - avg) * 100) / 100 : 0,
          // native scale label for tooltip
          scale: rows[0]?.scale ?? '1-5',
          nativeAvg: rows[0]?.scale === '0-10'
            ? avgBy(rows, (r) => r.satisfaction, (r) => r.responses)
            : null,
        }
      })
      .sort((a, b) => b.avg - a.avg)
  }, [fb])

  // Monthly trend — normalized to 1-5 for cross-scale comparability
  const trend = useMemo(() => {
    const months = Array.from(new Set(dated.map((r) => r.month as string))).sort()
    return months.map((month) => {
      const rows = dated.filter((r) => r.month === month)
      return {
        month,
        satisfaction: Math.round(normalizedAvgSat(rows) * 100) / 100,
      }
    })
  }, [dated])

  // Sort by normalized satisfaction so 0-10 PS rows rank correctly alongside 1-5 rows
  const sorted = [...fb].sort(
    (a, b) => (normalizedSatisfaction(b) ?? 0) - (normalizedSatisfaction(a) ?? 0),
  )
  const best = sorted.slice(0, 5)
  // Exclude the top-5 rows before picking the bottom-5 so they never overlap
  // when the total session count is small (≤ 10).
  const remaining = sorted.slice(5)
  const worst = remaining.slice(-5).reverse()

  return (
    <>
      <PageHeader
        title="Feedback Deep Dive"
        description="Anonymous session-level feedback across all programs."
        badge={<ScopeBadge>Curated programmes</ScopeBadge>}
      />

      <InfoBanner>{pageBanners.feedback}</InfoBanner>

      <section className="grid grid-cols-2 gap-3 md:grid-cols-4 xl:grid-cols-8" aria-label="Feedback KPIs">
        <KpiTile label="Total Responses" docId="feedback-responses" value={formatNumber(responses)} />
        <KpiTile
          label="Avg Satisfaction"
          docId="avg-satisfaction"
          value={avgSat > 0 ? `${avgSat.toFixed(2)} / 5` : '—'}
          sub="normalized 1-5, cross-program"
          emphasis
        />
        <KpiTile
          label="Satisfaction Rate"
          docId="satisfaction-rate"
          value={satRatePct > 0 ? `${satRatePct.toFixed(1)}%` : '—'}
          sub="top-2-box on native scale"
          emphasis
        />
        {psNpsTiles.map(({ programCode, bu, nps }) => (
          <KpiTile
            key={`${programCode}-${bu}`}
            label={`PS NPS · ${bu}`}
            docId="nps"
            value={`${nps.toFixed(1)}%`}
            sub={`${programName(programCode)} · per-BU only`}
            emphasis
          />
        ))}
        <KpiTile label="Facilitator" docId="facilitator" value={avgFac > 0 ? `${avgFac.toFixed(2)} / 5` : '—'} />
        <KpiTile label="Confidence / Commitment" docId="confidence" value={avgConf > 0 ? `${avgConf.toFixed(2)} / 5` : '—'} />
        <KpiTile label="Recommend Rate" docId="recommend-rate" value={recRate > 0 ? `${recRate.toFixed(0)}%` : '—'} />
      </section>

      <section className="grid grid-cols-1 gap-4">
        <ChartCard title="Satisfaction Distribution" docId="satisfaction-distribution" description="Session count per satisfaction band.">
          <ChartContainer config={histConfig} className="h-64 w-full">
            <BarChart data={hist} margin={{ left: 0, right: 8 }}>
              <CartesianGrid vertical={false} strokeDasharray="3 3" />
              <XAxis dataKey="label" tickLine={false} axisLine={false} fontSize={11} />
              <YAxis tickLine={false} axisLine={false} fontSize={11} width={30} allowDecimals={false} />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Bar dataKey="sessions" fill="var(--color-sessions)" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ChartContainer>
        </ChartCard>
      </section>

      <ChartCard
        title="Programme Benchmark"
        docId="feedback-comparison"
        description="Average satisfaction per program with min–max whiskers."
      >
        <ChartContainer config={benchConfig} className="h-96 w-full">
          <BarChart data={benchmark} layout="vertical" margin={{ left: 220, right: 24 }}>
            <CartesianGrid horizontal={false} strokeDasharray="3 3" />
            <XAxis type="number" domain={[3, 5]} tickLine={false} axisLine={false} fontSize={11} />
            <YAxis
              type="category"
              dataKey="name"
              tickLine={false}
              axisLine={false}
              fontSize={11}
              width={200}
            />
            <ChartTooltip content={<ChartTooltipContent />} />
            <Bar dataKey="avg" fill="var(--color-avg)" radius={[0, 4, 4, 0]}>
              <ErrorBar
                dataKey="errHigh"
                direction="x"
                width={4}
                strokeWidth={1.5}
                stroke="var(--chart-2)"
              />
            </Bar>
          </BarChart>
        </ChartContainer>
      </ChartCard>

      <section className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <SessionTable title="Top 5 Sessions" rows={best} tone="best" />
        <SessionTable title="Bottom 5 Sessions" rows={worst} tone="worst" />
      </section>

      <ChartCard title="Monthly Satisfaction Trend" docId="satisfaction-trend" description="Response-weighted average per month.">
        <ChartContainer config={trendConfig} className="h-64 w-full">
          <LineChart data={trend} margin={{ left: 0, right: 8 }}>
            <CartesianGrid vertical={false} strokeDasharray="3 3" />
            <XAxis dataKey="month" tickLine={false} axisLine={false} fontSize={11} />
            <YAxis domain={[3.5, 5]} tickLine={false} axisLine={false} fontSize={11} width={30} />
            <ChartTooltip content={<ChartTooltipContent />} />
            <Line
              dataKey="satisfaction"
              type="monotone"
              stroke="var(--color-satisfaction)"
              strokeWidth={2}
              dot={{ r: 3 }}
            />
          </LineChart>
        </ChartContainer>
      </ChartCard>

      {undated.length > 0 && (
        <ChartCard
          title="Undated (VIP) Sessions"
          docId="undated-sessions"
          description="VIP feedback rows carry no month — shown separately so they never silently disappear from time-based charts."
        >
          <SessionRows rows={undated} />
        </ChartCard>
      )}
    </>
  )
}

function SessionTable({
  title,
  rows,
  tone,
}: {
  title: string
  rows: FeedbackRow[]
  tone: 'best' | 'worst'
}) {
  return (
    <ChartCard title={title}>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Session</TableHead>
            <TableHead className="text-right">Responses</TableHead>
            <TableHead className="text-right">Satisfaction</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {rows.map((r) => (
            <TableRow key={r.sessionLabel}>
              <TableCell className="max-w-52 truncate text-xs">{r.sessionLabel}</TableCell>
              <TableCell className="text-right text-xs tabular-nums">{r.responses}</TableCell>
              <TableCell
                className={`text-right text-xs font-semibold tabular-nums ${
                  tone === 'best' ? 'text-primary' : 'text-destructive'
                }`}
              >
                {formatSatisfaction(r)}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </ChartCard>
  )
}

function SessionRows({ rows }: { rows: FeedbackRow[] }) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Session</TableHead>
          <TableHead className="text-right">Responses</TableHead>
          <TableHead className="text-right">Satisfaction</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {rows.map((r) => (
          <TableRow key={r.sessionLabel}>
            <TableCell className="text-xs">{r.sessionLabel}</TableCell>
            <TableCell className="text-right text-xs tabular-nums">{r.responses}</TableCell>
            <TableCell className="text-right text-xs font-semibold tabular-nums text-primary">
              {formatSatisfaction(r)}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}
