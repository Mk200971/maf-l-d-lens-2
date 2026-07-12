'use client'

import { useMemo } from 'react'
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Line,
  LineChart,
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
import { ChartCard, KpiTile, PageHeader } from '@/components/dashboard/shared'
import { filterHours, filterReach, formatNumber, groupSum, sumBy } from '@/lib/aggregate'
import { useFilters } from '@/lib/filters-context'

const CHART_VARS = ['var(--chart-1)', 'var(--chart-2)', 'var(--chart-3)', 'var(--chart-4)', 'var(--chart-5)']

const reachConfig = {
  learners: { label: 'Unique learners', color: 'var(--chart-2)' },
} satisfies ChartConfig

const depthConfig = {
  learners: { label: 'Learners', color: 'var(--chart-1)' },
} satisfies ChartConfig

export function LearnersPage() {
  const { filters } = useFilters()
  const reach = useMemo(() => filterReach(filters), [filters])
  const hours = useMemo(() => filterHours(filters), [filters])

  // Role mix
  const roleMix = useMemo(() => {
    const m = groupSum(reach, (r) => r.role, (r) => r.uniqueLearners)
    return Array.from(m.entries())
      .map(([role, learners]) => ({ role, learners }))
      .sort((a, b) => b.learners - a.learners)
  }, [reach])

  const roleConfig = useMemo(() => {
    const cfg: ChartConfig = {}
    roleMix.forEach((r, i) => {
      cfg[r.role] = { label: r.role, color: CHART_VARS[i % 5] }
    })
    return cfg
  }, [roleMix])

  // Country x Role heatmap (hours)
  const heatmap = useMemo(() => {
    const countries = Array.from(new Set(hours.map((r) => r.country))).sort()
    const roles = Array.from(new Set(hours.map((r) => r.role))).sort()
    let max = 0
    const grid = countries.map((country) => {
      const cells = roles.map((role) => {
        const v = Math.round(
          sumBy(hours.filter((r) => r.country === country && r.role === role), (r) => r.totalHours),
        )
        max = Math.max(max, v)
        return { role, value: v }
      })
      return { country, cells }
    })
    return { countries, roles, grid, max }
  }, [hours])

  // Unique learners by BU
  const byBU = useMemo(() => {
    const m = groupSum(reach, (r) => r.bu, (r) => r.uniqueLearners)
    return Array.from(m.entries()).map(([bu, learners]) => ({ bu, learners }))
  }, [reach])

  // Monthly reach curve
  const monthly = useMemo(() => {
    const m = groupSum(reach, (r) => r.month ?? 'Undated', (r) => r.uniqueLearners)
    return Array.from(m.entries())
      .filter(([month]) => month !== 'Undated')
      .map(([month, learners]) => ({ month, learners }))
      .sort((a, b) => a.month.localeCompare(b.month))
  }, [reach])

  // Learner depth histogram (approximate hours-per-learner)
  const depth = useMemo(() => {
    const buckets = [
      { label: '<2h', min: 0, max: 2, learners: 0 },
      { label: '2–5h', min: 2, max: 5, learners: 0 },
      { label: '5–10h', min: 5, max: 10, learners: 0 },
      { label: '10–20h', min: 10, max: 20, learners: 0 },
      { label: '20h+', min: 20, max: Infinity, learners: 0 },
    ]
    for (const r of reach) {
      const match = hours.find(
        (h) =>
          h.programCode === r.programCode &&
          h.month === r.month &&
          h.bu === r.bu &&
          h.country === r.country &&
          h.role === r.role,
      )
      const perLearner = match && r.uniqueLearners > 0 ? match.totalHours / r.uniqueLearners : 0
      const bucket = buckets.find((b) => perLearner >= b.min && perLearner < b.max) ?? buckets[0]
      bucket.learners += r.uniqueLearners
    }
    return buckets
  }, [reach, hours])

  const totalLearners = sumBy(reach, (r) => r.uniqueLearners)

  return (
    <>
      <PageHeader
        title="Learners & Reach"
        description="Who are we reaching? Distinct learner counts from the PII-free learnerReach grain — filterable by every field."
      />

      <section className="grid grid-cols-2 gap-3 md:grid-cols-4 lg:gap-4 xl:gap-5" aria-label="Reach KPIs">
        <KpiTile label="Unique Learners" docId="unique-learners" value={formatNumber(totalLearners)} sub="in current filter" />
        {byBU.map((b) => (
          <KpiTile key={b.bu} label={`${b.bu} Learners`} docId="unique-learners" value={formatNumber(b.learners)} />
        ))}
      </section>

      <section className="grid grid-cols-1 gap-4 lg:gap-5 xl:gap-6 lg:grid-cols-2">
        <ChartCard title="Role Mix" docId="role-mix" description="Unique learners by role; use this to see who the portfolio is reaching.">
          <ChartContainer config={roleConfig} className="mx-auto h-56 w-full lg:h-72 xl:h-80">
            <PieChart>
              <ChartTooltip content={<ChartTooltipContent nameKey="role" />} />
              <Pie data={roleMix} dataKey="learners" nameKey="role" innerRadius={55} outerRadius={90}>
                {roleMix.map((d, i) => (
                  <Cell key={d.role} fill={CHART_VARS[i % 5]} />
                ))}
              </Pie>
            </PieChart>
          </ChartContainer>
        </ChartCard>

        <ChartCard title="Monthly Reach Curve" docId="monthly-reach" description="Monthly reach, not a cumulative deduplicated audience.">
          <ChartContainer config={reachConfig} className="h-56 w-full lg:h-72 xl:h-80">
            <LineChart data={monthly} margin={{ left: 0, right: 8 }}>
              <CartesianGrid vertical={false} strokeDasharray="3 3" />
              <XAxis dataKey="month" tickLine={false} axisLine={false} fontSize={11} />
              <YAxis tickLine={false} axisLine={false} fontSize={11} width={36} />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Line
                dataKey="learners"
                type="monotone"
                stroke="var(--color-learners)"
                strokeWidth={2}
                dot={false}
              />
            </LineChart>
          </ChartContainer>
        </ChartCard>
      </section>

      <ChartCard title="Country × Role Heatmap" docId="country-role-hours" description="Learning hours by country and role; darker cells indicate more hours in this view.">
        <div className="overflow-x-auto">
          <table className="w-full border-separate border-spacing-1 text-xs">
            <thead>
              <tr>
                <th scope="col" className="p-1 text-left font-medium text-muted-foreground">
                  Country
                </th>
                {heatmap.roles.map((role) => (
                  <th
                    key={role}
                    scope="col"
                    className="p-1 text-center font-medium text-muted-foreground"
                  >
                    {role}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {heatmap.grid.map((row) => (
                <tr key={row.country}>
                  <th scope="row" className="p-1 text-left font-medium">
                    {row.country}
                  </th>
                  {row.cells.map((cell) => {
                    const intensity = heatmap.max > 0 ? cell.value / heatmap.max : 0
                    return (
                      <td
                        key={cell.role}
                        className="rounded-md p-2 text-center font-medium tabular-nums"
                        style={{
                          backgroundColor: `color-mix(in oklch, var(--chart-1) ${Math.round(intensity * 85)}%, var(--muted))`,
                          color: intensity > 0.55 ? 'var(--primary-foreground)' : 'var(--foreground)',
                        }}
                      >
                        {cell.value > 0 ? formatNumber(cell.value) : '—'}
                      </td>
                    )
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </ChartCard>

      <ChartCard
        title="Learner Depth"
        docId="learner-depth"
        description="Approximate hours per learner distribution (derived from reach × hours grain)."
      >
        <ChartContainer config={depthConfig} className="h-56 w-full lg:h-72 xl:h-80">
          <BarChart data={depth} margin={{ left: 0, right: 8 }}>
            <CartesianGrid vertical={false} strokeDasharray="3 3" />
            <XAxis dataKey="label" tickLine={false} axisLine={false} fontSize={11} />
            <YAxis tickLine={false} axisLine={false} fontSize={11} width={36} />
            <ChartTooltip content={<ChartTooltipContent />} />
            <Bar dataKey="learners" fill="var(--color-learners)" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ChartContainer>
      </ChartCard>
    </>
  )
}
