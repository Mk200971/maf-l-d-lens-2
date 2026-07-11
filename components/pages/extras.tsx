'use client'

import { useMemo } from 'react'
import { ArrowRight } from 'lucide-react'
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from 'recharts'
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { useFilters } from '@/lib/filters-context'
import { filterExtras, programName } from '@/lib/aggregate'
import { ChartCard, InfoBanner, KpiTile, PageHeader } from '@/components/dashboard/shared'

const likertConfig = {
  value: { label: 'Score (of 5)', color: 'var(--chart-1)' },
} as const

export function ExtrasPage() {
  const { filters } = useFilters()
  const rows = useMemo(() => filterExtras(filters), [filters])

  // SLP skill uplift showcase
  const skillBefore = rows.find(
    (r) => r.programCode === 'SLP' && r.metric === 'Skill (Before)',
  )
  const skillAfter = rows.find(
    (r) => r.programCode === 'SLP' && r.metric === 'Skill (After)',
  )
  const uplift =
    skillBefore && skillAfter
      ? Math.round((skillAfter.value - skillBefore.value) * 100) / 100
      : null

  // Likert (of 5) metrics, excluding the before/after pair (shown separately)
  const likert = useMemo(
    () =>
      rows
        .filter((r) => r.scaleMax === 5 && !r.metric.startsWith('Skill ('))
        .map((r) => ({
          key: `${r.programCode}-${r.metric}`,
          label: `${programName(r.programCode)} — ${r.metric}`,
          value: r.value,
          n: r.n,
        }))
        .sort((a, b) => b.value - a.value),
    [rows],
  )

  // Rate metrics (scaleMax 1) e.g. VIP apply/share knowledge
  const rates = useMemo(
    () =>
      rows
        .filter((r) => r.scaleMax === 1)
        .map((r) => ({
          key: `${r.programCode}-${r.metric}`,
          program: programName(r.programCode),
          metric: r.metric,
          pct: Math.round(r.value * 1000) / 10,
          n: r.n,
        })),
    [rows],
  )

  return (
    <div className="flex flex-col gap-6">
      <PageHeader
        title="Quality Signals"
        description="Extra survey metrics beyond core satisfaction — skill uplift, logistics, and knowledge transfer."
      />

      <InfoBanner>
        Extras exist only for programs that collected them (SLP, SLII, L2H, VIP). Only the
        Program filter applies here.
      </InfoBanner>

      {uplift !== null && skillBefore && skillAfter && (
        <ChartCard
          title="SLP self-reported skill uplift"
          description={`Before vs after the Store Leadership Program (n=${skillBefore.n}).`}
        >
          <div className="flex flex-col items-stretch gap-4 sm:flex-row sm:items-center sm:gap-6">
            <div className="flex flex-1 items-center justify-center gap-6">
              <div className="flex flex-col items-center gap-1">
                <span className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                  Before
                </span>
                <span className="text-4xl font-semibold tabular-nums text-muted-foreground">
                  {skillBefore.value.toFixed(2)}
                </span>
                <span className="text-xs text-muted-foreground">of 5</span>
              </div>
              <ArrowRight className="size-6 text-accent" aria-hidden="true" />
              <div className="flex flex-col items-center gap-1">
                <span className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                  After
                </span>
                <span className="text-4xl font-semibold tabular-nums text-accent">
                  {skillAfter.value.toFixed(2)}
                </span>
                <span className="text-xs text-muted-foreground">of 5</span>
              </div>
            </div>
            <div className="flex flex-1 flex-col justify-center gap-2 rounded-lg bg-secondary p-4">
              <span className="text-sm text-muted-foreground">Net uplift</span>
              <span className="text-3xl font-semibold tabular-nums text-primary">
                +{uplift.toFixed(2)} pts
              </span>
              <span className="text-xs text-muted-foreground">
                {`${Math.round((uplift / skillBefore.value) * 100)}% relative improvement in self-assessed skill`}
              </span>
            </div>
          </div>
        </ChartCard>
      )}

      {likert.length > 0 && (
        <ChartCard
          title="Session logistics & value (of 5)"
          description="Catering, venue, engagement, and perceived value by program."
        >
          <ChartContainer config={likertConfig} className="h-[360px] w-full">
            <BarChart data={likert} layout="vertical" margin={{ left: 8, right: 8 }}>
              <CartesianGrid horizontal={false} strokeDasharray="3 3" />
              <XAxis
                type="number"
                domain={[0, 5]}
                tickLine={false}
                axisLine={false}
                fontSize={11}
              />
              <YAxis
                type="category"
                dataKey="label"
                width={220}
                tickLine={false}
                axisLine={false}
                fontSize={11}
              />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Bar dataKey="value" fill="var(--color-value)" radius={3} barSize={14} />
            </BarChart>
          </ChartContainer>
        </ChartCard>
      )}

      {rates.length > 0 && (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {rates.map((r) => (
            <KpiTile
              key={r.key}
              label={`${r.program} — ${r.metric}`}
              value={`${r.pct}%`}
              sub={`n=${r.n} respondents`}
              emphasis
            >
              <Progress
                value={r.pct}
                className="mt-2"
                aria-label={`${r.metric} ${r.pct}%`}
              />
            </KpiTile>
          ))}
        </div>
      )}

      {rows.length === 0 && (
        <div className="flex flex-col items-center gap-2 rounded-lg border border-dashed border-border py-16 text-center">
          <Badge variant="secondary">No extras for this selection</Badge>
          <p className="max-w-sm text-sm text-pretty text-muted-foreground">
            The selected programs did not collect extra quality metrics. Clear the Program
            filter or select SLP, SLII, L2H, or VIP.
          </p>
        </div>
      )}
    </div>
  )
}
