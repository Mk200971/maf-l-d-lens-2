'use client'

import { useMemo } from 'react'
import {
  Bar,
  BarChart,
  CartesianGrid,
  Line,
  LineChart,
  XAxis,
  YAxis,
} from 'recharts'
import { Badge } from '@/components/ui/badge'
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from '@/components/ui/chart'
import { Progress } from '@/components/ui/progress'
import { ScrollArea } from '@/components/ui/scroll-area'
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { InfoBanner } from '@/components/dashboard/shared'
import {
  avgBy,
  avgNormalizedConfidence,
  avgNormalizedFacilitator,
  avgNormalizedObjectivesClarity,
  avgNps,
  avgSatRatePct,
  filterHours,
  formatNumber,
  groupSum,
  normalizedAvgSat,
  sumBy,
} from '@/lib/aggregate'
import { formatSatisfaction, normalizedSatisfaction } from '@/lib/types'
import { completion, extras, feedback, meta } from '@/lib/dashboard-data'
import { useFilters } from '@/lib/filters-context'
import type { Program } from '@/lib/types'

const deliveryConfig = {
  hours: { label: 'Hours', color: 'var(--chart-1)' },
  completions: { label: 'Completions', color: 'var(--chart-2)' },
} satisfies ChartConfig

const satConfig = {
  satisfaction: { label: 'Satisfaction', color: 'var(--chart-3)' },
} satisfies ChartConfig

export function ProgramDrawer({
  program,
  onClose,
}: {
  program: Program | null
  onClose: () => void
}) {
  const { filters } = useFilters()

  // Program locked; delivery respects year/bu/country/role/month
  const rows = useMemo(() => {
    if (!program) return []
    return filterHours(
      { ...filters, programs: [program.code] },
      ['year', 'bu', 'country', 'role', 'program', 'month'],
    )
  }, [filters, program])

  // Feedback: year + month only (program locked)
  const fb = useMemo(() => {
    if (!program) return []
    return feedback
      .filter((r) => r.programCode === program.code)
      .filter((r) => {
        if (r.month === null) return true
        const year = Number(r.month.slice(0, 4))
        if (filters.years.length > 0 && !filters.years.includes(year)) return false
        if (filters.monthRange && (r.month < filters.monthRange[0] || r.month > filters.monthRange[1]))
          return false
        return true
      })
      .sort((a, b) => (normalizedSatisfaction(b) ?? 0) - (normalizedSatisfaction(a) ?? 0))
  }, [filters, program])

  const comp = program ? completion.find((c) => c.programCode === program.code) : undefined
  const ext = program ? extras.filter((e) => e.programCode === program.code) : []

  const monthly = useMemo(() => {
    const months = Array.from(new Set(rows.map((r) => r.month))).sort()
    return months.map((month) => {
      const mr = rows.filter((r) => r.month === month)
      return {
        month,
        hours: Math.round(sumBy(mr, (r) => r.totalHours)),
        completions: Math.round(sumBy(mr, (r) => r.completions)),
      }
    })
  }, [rows])

  const slugifyRole = (role: string) => role.toLowerCase().replace(/[^a-z0-9]+/g, '-')

  const roleList = useMemo(
    () => Array.from(new Set(rows.map((r) => r.role))).sort(),
    [rows],
  )
  const roleKeys = useMemo(() => roleList.map(slugifyRole), [roleList])

  const countryRole = useMemo(() => {
    const countries = Array.from(new Set(rows.map((r) => r.country))).sort()
    return countries.map((country) => {
      const entry: Record<string, string | number> = { country }
      for (const role of roleList) {
        entry[slugifyRole(role)] = Math.round(
          sumBy(rows.filter((r) => r.country === country && r.role === role), (r) => r.totalHours),
        )
      }
      return entry
    })
  }, [rows, roleList])

  const roleConfig = useMemo(() => {
    const cfg: ChartConfig = {}
    roleList.forEach((role, i) => {
      cfg[slugifyRole(role)] = { label: role, color: `var(--chart-${(i % 5) + 1})` }
    })
    return cfg
  }, [roleList])

  const feedbackFiltersActive =
    filters.bus.length > 0 || filters.countries.length > 0 || filters.roles.length > 0

  return (
    <Sheet open={program !== null} onOpenChange={(open) => !open && onClose()}>
      <SheetContent side="right" className="w-full gap-0 overflow-hidden sm:max-w-2xl">
        {program && (
          <>
            <SheetHeader className="border-b">
              <div className="flex items-center gap-2">
                <SheetTitle className="text-accent">{program.displayName}</SheetTitle>
                <Badge variant="outline" className="font-mono text-[10px]">
                  {program.code}
                </Badge>
              </div>
              <SheetDescription>
                {program.year} · {program.buScope} · Program filter locked to this program
              </SheetDescription>
            </SheetHeader>
            <ScrollArea className="h-[calc(100svh-6rem)]">
              <div className="flex flex-col gap-4 p-4">
                <Tabs defaultValue="delivery">
                  <TabsList className="w-full">
                    <TabsTrigger value="delivery">Delivery</TabsTrigger>
                    {program.hasFeedback && <TabsTrigger value="feedback">Feedback</TabsTrigger>}
                    {program.hasEligibility && (
                      <TabsTrigger value="eligibility">Eligibility</TabsTrigger>
                    )}
                    {program.hasExtras && <TabsTrigger value="extras">Extras</TabsTrigger>}
                  </TabsList>

                  {/* A — Delivery */}
                  <TabsContent value="delivery" className="mt-4 flex flex-col gap-6">
                    <div>
                      <h3 className="mb-2 text-sm font-medium">Completions &amp; Hours by Month</h3>
                      <ChartContainer config={deliveryConfig} className="h-56 w-full">
                        <LineChart data={monthly} margin={{ left: 0, right: 8 }}>
                          <CartesianGrid vertical={false} strokeDasharray="3 3" />
                          <XAxis dataKey="month" tickLine={false} axisLine={false} fontSize={11} />
                          <YAxis tickLine={false} axisLine={false} fontSize={11} width={40} />
                          <ChartTooltip content={<ChartTooltipContent />} />
                          <Line
                            dataKey="hours"
                            type="monotone"
                            stroke="var(--color-hours)"
                            strokeWidth={2}
                            dot={false}
                          />
                          <Line
                            dataKey="completions"
                            type="monotone"
                            stroke="var(--color-completions)"
                            strokeWidth={2}
                            dot={false}
                          />
                        </LineChart>
                      </ChartContainer>
                    </div>

                    <div>
                      <h3 className="mb-2 text-sm font-medium">Country × Role (hours)</h3>
                      <ChartContainer config={roleConfig} className="h-56 w-full">
                        <BarChart data={countryRole} margin={{ left: 0, right: 8 }}>
                          <CartesianGrid vertical={false} strokeDasharray="3 3" />
                          <XAxis dataKey="country" tickLine={false} axisLine={false} fontSize={11} />
                          <YAxis tickLine={false} axisLine={false} fontSize={11} width={40} />
                          <ChartTooltip content={<ChartTooltipContent />} />
                          {roleKeys.map((role) => (
                            <Bar
                              key={role}
                              dataKey={role}
                              stackId="a"
                              fill={`var(--color-${role})`}
                            />
                          ))}
                        </BarChart>
                      </ChartContainer>
                    </div>

                    <div>
                      <h3 className="mb-2 text-sm font-medium">Sessions</h3>
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Month</TableHead>
                            <TableHead>Country</TableHead>
                            <TableHead>Role</TableHead>
                            <TableHead className="text-right">Completions</TableHead>
                            <TableHead className="text-right">Hours</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {rows.slice(0, 40).map((r, i) => (
                            <TableRow key={`${r.month}-${r.country}-${r.role}-${i}`}>
                              <TableCell className="text-xs">{r.month}</TableCell>
                              <TableCell className="text-xs">{r.country}</TableCell>
                              <TableCell className="text-xs">{r.role}</TableCell>
                              <TableCell className="text-right text-xs tabular-nums">
                                {r.completions}
                              </TableCell>
                              <TableCell className="text-right text-xs tabular-nums">
                                {r.totalHours}
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </div>
                  </TabsContent>

                  {/* B — Feedback */}
                  {program.hasFeedback && (
                    <TabsContent value="feedback" className="mt-4 flex flex-col gap-6">
                      {feedbackFiltersActive && <InfoBanner>{meta.grainNote}</InfoBanner>}
                      {/* Scale-aware KPI mini-cards */}
                      <div className="grid grid-cols-2 gap-3 md:grid-cols-3">
                        {(() => {
                          const scale = fb[0]?.scale ?? '1-5'
                          const isPS = scale === '0-10'
                          const avgSat = normalizedAvgSat(fb)
                          const satRate = avgSatRatePct(fb)
                          const nps = avgNps(fb)
                          return (
                            <>
                              <div className="rounded-lg border bg-card p-3">
                                <p className="text-[10px] font-medium uppercase tracking-wider text-muted-foreground">
                                  Satisfaction
                                </p>
                                <p className="text-xl font-semibold text-primary tabular-nums">
                                  {isPS
                                    ? `${avgBy(fb, (r) => r.satisfaction, (r) => r.responses).toFixed(2)} / 10`
                                    : avgSat > 0 ? `${avgSat.toFixed(2)} / 5` : '—'}
                                </p>
                                {isPS && avgSat > 0 && (
                                  <p className="text-[10px] text-muted-foreground">≈ {avgSat.toFixed(2)} / 5 normalized</p>
                                )}
                              </div>
                              <div className="rounded-lg border bg-card p-3">
                                <p className="text-[10px] font-medium uppercase tracking-wider text-muted-foreground">
                                  Satisfaction Rate
                                </p>
                                <p className="text-xl font-semibold text-primary tabular-nums">
                                  {satRate > 0 ? `${satRate.toFixed(1)}%` : '—'}
                                </p>
                                <p className="text-[10px] text-muted-foreground">top-2-box {isPS ? '(≥9/10)' : '(≥4/5)'}</p>
                              </div>
                              {isPS && nps != null && (
                                <div className="rounded-lg border bg-card p-3">
                                  <p className="text-[10px] font-medium uppercase tracking-wider text-muted-foreground">
                                    NPS
                                  </p>
                                  <p className="text-xl font-semibold text-primary tabular-nums">
                                    {nps.toFixed(1)}%
                                  </p>
                                </div>
                              )}
                              <div className="rounded-lg border bg-card p-3">
                                <p className="text-[10px] font-medium uppercase tracking-wider text-muted-foreground">
                                  Objectives Clarity
                                </p>
                                <p className="text-xl font-semibold text-primary tabular-nums">
                                  {(() => { const v = avgNormalizedObjectivesClarity(fb); return v > 0 ? `${v.toFixed(2)} / 5` : '—' })()}
                                </p>
                              </div>
                              <div className="rounded-lg border bg-card p-3">
                                <p className="text-[10px] font-medium uppercase tracking-wider text-muted-foreground">
                                  Facilitator
                                </p>
                                <p className="text-xl font-semibold text-primary tabular-nums">
                                  {(() => { const v = avgNormalizedFacilitator(fb); return v > 0 ? `${v.toFixed(2)} / 5` : '—' })()}
                                </p>
                              </div>
                              <div className="rounded-lg border bg-card p-3">
                                <p className="text-[10px] font-medium uppercase tracking-wider text-muted-foreground">
                                  {isPS ? 'Action Plan Commitment' : 'Confidence'}
                                </p>
                                <p className="text-xl font-semibold text-primary tabular-nums">
                                  {(() => { const v = avgNormalizedConfidence(fb); return v > 0 ? `${v.toFixed(2)} / 5` : '—' })()}
                                </p>
                              </div>
                              <div className="rounded-lg border bg-card p-3">
                                <p className="text-[10px] font-medium uppercase tracking-wider text-muted-foreground">
                                  Recommend Rate
                                </p>
                                <p className="text-xl font-semibold text-primary tabular-nums">
                                  {fb.length > 0
                                    ? `${avgBy(fb, (r) => r.recommendationRatePct, (r) => r.responses).toFixed(0)}%`
                                    : '—'}
                                </p>
                              </div>
                            </>
                          )
                        })()}
                      </div>

                      <div>
                        <h3 className="mb-2 text-sm font-medium">Satisfaction by Session</h3>
                        <ChartContainer config={satConfig} className="h-56 w-full">
                          <BarChart
                            data={fb.map((r) => ({
                              ...r,
                              satisfactionNormalized: normalizedSatisfaction(r) ?? 0,
                            }))}
                            margin={{ left: 0, right: 8 }}
                          >
                            <CartesianGrid vertical={false} strokeDasharray="3 3" />
                            <XAxis dataKey="sessionLabel" tick={false} axisLine={false} />
                            <YAxis domain={[0, 5]} tickLine={false} axisLine={false} fontSize={11} width={30} />
                            <ChartTooltip content={<ChartTooltipContent labelKey="sessionLabel" />} />
                            <Bar dataKey="satisfactionNormalized" name="Satisfaction (1-5)" fill="var(--color-satisfaction)" radius={[4, 4, 0, 0]} />
                          </BarChart>
                        </ChartContainer>
                      </div>

                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Session</TableHead>
                            <TableHead>Month</TableHead>
                            <TableHead className="text-right">Responses</TableHead>
                            <TableHead className="text-right">Satisfaction</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {fb.map((r) => (
                            <TableRow key={r.sessionLabel}>
                              <TableCell className="max-w-48 truncate text-xs">{r.sessionLabel}</TableCell>
                              <TableCell className="text-xs">{r.month ?? 'Undated (VIP)'}</TableCell>
                              <TableCell className="text-right text-xs tabular-nums">{r.responses}</TableCell>
                              <TableCell className="text-right text-xs font-medium tabular-nums text-primary">
                                {formatSatisfaction(r)}
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </TabsContent>
                  )}

                  {/* C — Eligibility */}
                  {program.hasEligibility && (
                    <TabsContent value="eligibility" className="mt-4 flex flex-col gap-4">
                      <InfoBanner>Completion rate is computed against the eligibility list per program. Slice by program only.</InfoBanner>
                      {comp ? (
                        <div className="flex flex-col items-center gap-4 rounded-lg border bg-card p-8">
                          <span className="text-6xl font-semibold text-accent tabular-nums">
                            {comp.completionRatePct.toFixed(1)}%
                          </span>
                          <span className="text-sm text-muted-foreground">
                            {formatNumber(comp.completedEligible)} completed of{' '}
                            {formatNumber(comp.eligible)} eligible
                          </span>
                          <Progress
                            value={comp.completionRatePct}
                            className="h-3 w-full max-w-sm"
                            aria-label={`Completion rate ${comp.completionRatePct.toFixed(1)}%`}
                          />
                        </div>
                      ) : (
                        <p className="text-sm text-muted-foreground">No eligibility data.</p>
                      )}
                    </TabsContent>
                  )}

                  {/* D — Extras */}
                  {program.hasExtras && (
                    <TabsContent value="extras" className="mt-4 flex flex-col gap-3">
                      {ext.map((e) => (
                        <div key={e.metric} className="flex items-center gap-3 rounded-lg border bg-card p-3">
                          <div className="flex-1">
                            <p className="text-sm font-medium">{e.metric}</p>
                            <p className="text-xs text-muted-foreground">n = {e.n}</p>
                          </div>
                          <div className="flex w-40 items-center gap-2">
                            <Progress
                              value={(e.value / e.scaleMax) * 100}
                              className="h-2"
                              aria-label={`${e.metric}: ${e.value} of ${e.scaleMax}`}
                            />
                            <span className="w-12 text-right text-sm font-semibold tabular-nums text-primary">
                              {e.scaleMax === 1 ? `${Math.round(e.value * 100)}%` : e.value.toFixed(2)}
                            </span>
                          </div>
                        </div>
                      ))}
                    </TabsContent>
                  )}
                </Tabs>
              </div>
            </ScrollArea>
          </>
        )}
      </SheetContent>
    </Sheet>
  )
}
