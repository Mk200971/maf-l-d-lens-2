'use client'

import { useMemo } from 'react'
import {
  Bar,
  BarChart,
  CartesianGrid,
  ErrorBar,
  Line,
  LineChart,
  Scatter,
  ScatterChart,
  XAxis,
  YAxis,
  ZAxis,
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
import { avgBy, filterFeedback, formatNumber, programName, sumBy } from '@/lib/aggregate'
import { useFilters } from '@/lib/filters-context'
import { pageBanners } from '@/lib/filter-rules'
import type { FeedbackRow } from '@/lib/types'

const histConfig = {
  sessions: { label: 'Sessions', color: 'var(--chart-3)' },
} satisfies ChartConfig

const scatterConfig = {
  session: { label: 'Session', color: 'var(--chart-2)' },
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
  const avgSat = avgBy(fb, (r) => r.satisfaction, (r) => r.responses)
  const avgFac = avgBy(fb, (r) => r.facilitatorEffectiveness, (r) => r.responses)
  const avgConf = avgBy(fb, (r) => r.confidenceApplication, (r) => r.responses)
  const recRate = avgBy(fb, (r) => r.recommendationRatePct, (r) => r.responses)

  // Histogram: satisfaction distribution across sessions
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
      const b = buckets.find((b) => r.satisfaction >= b.min && r.satisfaction < b.max)
      if (b) b.sessions++
    }
    return buckets
  }, [fb])

  // Scatter: facilitator vs satisfaction
  const scatter = useMemo(
    () =>
      fb.map((r) => ({
        x: r.facilitatorEffectiveness,
        y: r.satisfaction,
        z: r.responses,
        label: r.sessionLabel,
      })),
    [fb],
  )

  // Program benchmark: min/avg/max
  const benchmark = useMemo(() => {
    const codes = Array.from(new Set(fb.map((r) => r.programCode)))
    return codes
      .map((code) => {
        const rows = fb.filter((r) => r.programCode === code)
        const sats = rows.map((r) => r.satisfaction)
        const avg = avgBy(rows, (r) => r.satisfaction, (r) => r.responses)
        return {
          name: programName(code),
          avg: Math.round(avg * 100) / 100,
          errLow: Math.round((avg - Math.min(...sats)) * 100) / 100,
          errHigh: Math.round((Math.max(...sats) - avg) * 100) / 100,
        }
      })
      .sort((a, b) => b.avg - a.avg)
  }, [fb])

  // Monthly trend with min/max band
  const trend = useMemo(() => {
    const months = Array.from(new Set(dated.map((r) => r.month as string))).sort()
    return months.map((month) => {
      const rows = dated.filter((r) => r.month === month)
      return {
        month,
        satisfaction:
          Math.round(avgBy(rows, (r) => r.satisfaction, (r) => r.responses) * 100) / 100,
      }
    })
  }, [dated])

  const sorted = [...fb].sort((a, b) => b.satisfaction - a.satisfaction)
  const best = sorted.slice(0, 5)
  const worst = sorted.slice(-5).reverse()

  return (
    <>
      <PageHeader
        title="Feedback Deep Dive"
        description="Anonymous session-level feedback across all programs."
      />

      <InfoBanner>{pageBanners.feedback}</InfoBanner>

      <section className="grid grid-cols-2 gap-3 md:grid-cols-5" aria-label="Feedback KPIs">
        <KpiTile label="Total Responses" value={formatNumber(responses)} />
        <KpiTile label="Avg Satisfaction" value={avgSat > 0 ? avgSat.toFixed(2) : '—'} emphasis />
        <KpiTile label="Facilitator" value={avgFac > 0 ? avgFac.toFixed(2) : '—'} />
        <KpiTile label="Confidence" value={avgConf > 0 ? avgConf.toFixed(2) : '—'} />
        <KpiTile label="Recommend Rate" value={recRate > 0 ? `${recRate.toFixed(0)}%` : '—'} />
      </section>

      <section className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <ChartCard title="Satisfaction Distribution" description="Session count per satisfaction band.">
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

        <ChartCard
          title="Facilitator vs Satisfaction"
          description="Each dot is a session; size = number of responses."
        >
          <ChartContainer config={scatterConfig} className="h-64 w-full">
            <ScatterChart margin={{ left: 0, right: 8, bottom: 4 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis
                dataKey="x"
                type="number"
                name="Facilitator"
                domain={[3.5, 5]}
                tickLine={false}
                axisLine={false}
                fontSize={11}
              />
              <YAxis
                dataKey="y"
                type="number"
                name="Satisfaction"
                domain={[3.5, 5]}
                tickLine={false}
                axisLine={false}
                fontSize={11}
                width={30}
              />
              <ZAxis dataKey="z" range={[30, 220]} />
              <ChartTooltip content={<ChartTooltipContent labelKey="label" hideIndicator />} />
              <Scatter data={scatter} name="session" fill="var(--color-session)" fillOpacity={0.7} />
            </ScatterChart>
          </ChartContainer>
        </ChartCard>
      </section>

      <ChartCard
        title="Program Benchmark"
        description="Average satisfaction per program with min–max whiskers."
      >
        <ChartContainer config={benchConfig} className="h-72 w-full">
          <BarChart data={benchmark} layout="vertical" margin={{ left: 8, right: 24 }}>
            <CartesianGrid horizontal={false} strokeDasharray="3 3" />
            <XAxis type="number" domain={[3, 5]} tickLine={false} axisLine={false} fontSize={11} />
            <YAxis
              type="category"
              dataKey="name"
              tickLine={false}
              axisLine={false}
              fontSize={11}
              width={170}
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
        <SessionTable title="Best Sessions (Top 5)" rows={best} tone="best" />
        <SessionTable title="Needs Attention (Bottom 5)" rows={worst} tone="worst" />
      </section>

      <ChartCard title="Monthly Satisfaction Trend" description="Response-weighted average per month.">
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
                {r.satisfaction.toFixed(2)}
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
              {r.satisfaction.toFixed(2)}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}
