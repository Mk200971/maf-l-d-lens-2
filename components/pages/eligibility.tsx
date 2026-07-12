'use client'

import { useMemo } from 'react'
import { Bar, BarChart, CartesianGrid, Cell, XAxis, YAxis } from 'recharts'
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Progress } from '@/components/ui/progress'
import { Badge } from '@/components/ui/badge'
import { useFilters } from '@/lib/filters-context'
import {
  filterEligibility,
  formatNumber,
  groupSum,
  programName,
  sumBy,
} from '@/lib/aggregate'
import { completion, kpis } from '@/lib/dashboard-data'
import { ChartCard, InfoBanner, KpiTile, PageHeader } from '@/components/dashboard/shared'

const rateChartConfig = {
  rate: { label: 'Completion rate %', color: 'var(--chart-1)' },
} as const

const funnelConfig = {
  eligible: { label: 'Eligible', color: 'var(--chart-2)' },
  completed: { label: 'Completed', color: 'var(--chart-1)' },
} as const

export function EligibilityPage() {
  const { filters } = useFilters()

  // Eligibility grain supports program/bu/country/role slicing.
  const rows = useMemo(
    () => filterEligibility(filters, ['program', 'bu', 'country', 'role']),
    [filters],
  )

  const totals = useMemo(() => {
    const eligible = sumBy(rows, (r) => r.eligible)
    const completed = sumBy(rows, (r) => r.completedEligible)
    return {
      eligible,
      completed,
      rate: eligible > 0 ? (completed / eligible) * 100 : 0,
    }
  }, [rows])

  const byProgram = useMemo(() => {
    const map = new Map<string, { eligible: number; completed: number }>()
    for (const r of rows) {
      const c = map.get(r.programCode) ?? { eligible: 0, completed: 0 }
      c.eligible += r.eligible
      c.completed += r.completedEligible
      map.set(r.programCode, c)
    }
    return Array.from(map.entries())
      .map(([code, c]) => ({
        code,
        name: programName(code),
        eligible: c.eligible,
        completed: c.completed,
        rate: c.eligible > 0 ? Math.round((c.completed / c.eligible) * 1000) / 10 : 0,
      }))
      .sort((a, b) => b.eligible - a.eligible)
  }, [rows])

  const byBu = useMemo(() => {
    const elig = groupSum(rows, (r) => r.bu, (r) => r.eligible)
    const comp = groupSum(rows, (r) => r.bu, (r) => r.completedEligible)
    return Array.from(elig.entries())
      .map(([bu, eligible]) => ({
        bu,
        eligible,
        completed: comp.get(bu) ?? 0,
        rate: eligible > 0 ? Math.round(((comp.get(bu) ?? 0) / eligible) * 1000) / 10 : 0,
      }))
      .sort((a, b) => b.eligible - a.eligible)
  }, [rows])

  const byRole = useMemo(() => {
    const elig = groupSum(rows, (r) => r.role, (r) => r.eligible)
    const comp = groupSum(rows, (r) => r.role, (r) => r.completedEligible)
    return Array.from(elig.entries())
      .map(([role, eligible]) => ({
        role,
        eligible,
        completed: comp.get(role) ?? 0,
        rate: eligible > 0 ? Math.round(((comp.get(role) ?? 0) / eligible) * 1000) / 10 : 0,
      }))
      .sort((a, b) => b.eligible - a.eligible)
      .slice(0, 10)
  }, [rows])

  function rateColor(rate: number) {
    if (rate >= 80) return 'var(--chart-1)'
    if (rate >= 60) return 'var(--chart-3)'
    return 'var(--chart-5)'
  }

  return (
    <div className="flex flex-col gap-6">
      <PageHeader
        title="Eligibility & Completion"
        description="Completion measured strictly against per-program eligibility lists."
      />

      <InfoBanner>Completion rate is computed against the eligibility list per program. Slice by program only.</InfoBanner>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <KpiTile
          label="Eligible (filtered)"
          docId="eligible"
          value={formatNumber(totals.eligible)}
          sub={`Total: ${formatNumber(completion.reduce((s, r) => s + r.eligible, 0))}`}
        />
        <KpiTile
          label="Completed (eligible)"
          docId="completed-eligible"
          value={formatNumber(totals.completed)}
          sub={`Total: ${formatNumber(completion.reduce((s, r) => s + r.completedEligible, 0))}`}
        />
        <KpiTile
          label="Completion rate"
          docId="completion-rate"
          value={`${totals.rate.toFixed(1)}%`}
          sub={`Contract: ${kpis.completionRatePct}%`}
          emphasis
        />
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <ChartCard
          title="Eligible vs completed by program"
          docId="eligibility-funnel"
          description="Funnel per program — the completion denominator is the eligibility list."
        >
          <ChartContainer config={funnelConfig} className="h-[340px] w-full">
            <BarChart data={byProgram} layout="vertical" margin={{ left: 8, right: 8 }}>
              <CartesianGrid horizontal={false} strokeDasharray="3 3" />
              <XAxis type="number" tickLine={false} axisLine={false} fontSize={11} />
              <YAxis
                type="category"
                dataKey="name"
                width={150}
                tickLine={false}
                axisLine={false}
                fontSize={11}
              />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Bar dataKey="eligible" fill="var(--color-eligible)" radius={3} barSize={10} />
              <Bar dataKey="completed" fill="var(--color-completed)" radius={3} barSize={10} />
            </BarChart>
          </ChartContainer>
        </ChartCard>

        <ChartCard
          title="Completion rate by program"
          docId="completion-rate"
          description="Green ≥ 80%, amber 60–79%, red < 60%."
        >
          <ChartContainer config={rateChartConfig} className="h-[340px] w-full">
            <BarChart data={byProgram} layout="vertical" margin={{ left: 8, right: 8 }}>
              <CartesianGrid horizontal={false} strokeDasharray="3 3" />
              <XAxis
                type="number"
                domain={[0, 100]}
                tickLine={false}
                axisLine={false}
                fontSize={11}
              />
              <YAxis
                type="category"
                dataKey="name"
                width={150}
                tickLine={false}
                axisLine={false}
                fontSize={11}
              />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Bar dataKey="rate" radius={3} barSize={14}>
                {byProgram.map((p) => (
                  <Cell key={p.code} fill={rateColor(p.rate)} />
                ))}
              </Bar>
            </BarChart>
          </ChartContainer>
        </ChartCard>
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <ChartCard title="Completion by business unit" docId="eligibility-breakdowns">
          <div className="flex flex-col gap-4">
            {byBu.map((b) => (
              <div key={b.bu} className="flex flex-col gap-1.5">
                <div className="flex items-center justify-between text-sm">
                  <span className="font-medium">{b.bu}</span>
                  <span className="tabular-nums text-muted-foreground">
                    {formatNumber(b.completed)} / {formatNumber(b.eligible)}{' '}
                    <Badge variant="secondary" className="ml-1 tabular-nums">
                      {b.rate}%
                    </Badge>
                  </span>
                </div>
                <Progress value={b.rate} aria-label={`${b.bu} completion rate ${b.rate}%`} />
              </div>
            ))}
          </div>
        </ChartCard>

        <ChartCard title="Top roles by eligible population" docId="eligibility-breakdowns">
          <div className="flex flex-col gap-3">
            {byRole.map((r) => (
              <div key={r.role} className="flex flex-col gap-1">
                <div className="flex items-center justify-between text-sm">
                  <span className="truncate pr-2">{r.role}</span>
                  <span className="shrink-0 tabular-nums text-muted-foreground">
                    {r.rate}% of {formatNumber(r.eligible)}
                  </span>
                </div>
                <Progress value={r.rate} aria-label={`${r.role} completion rate ${r.rate}%`} />
              </div>
            ))}
          </div>
        </ChartCard>
      </div>

      <ChartCard
        title="Program detail"
        docId="eligibility-breakdowns"
        description="Eligible, completed, and completion rate per program."
      >
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Program</TableHead>
              <TableHead className="text-right">Eligible</TableHead>
              <TableHead className="text-right">Completed</TableHead>
              <TableHead className="text-right">Rate</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {byProgram.map((p) => (
              <TableRow key={p.code}>
                <TableCell className="font-medium">{p.name}</TableCell>
                <TableCell className="text-right tabular-nums">
                  {formatNumber(p.eligible)}
                </TableCell>
                <TableCell className="text-right tabular-nums">
                  {formatNumber(p.completed)}
                </TableCell>
                <TableCell className="text-right tabular-nums">
                  <Badge
                    variant={p.rate >= 80 ? 'default' : 'secondary'}
                    className="tabular-nums"
                  >
                    {p.rate}%
                  </Badge>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </ChartCard>
    </div>
  )
}
