'use client'

import { useMemo, useState } from 'react'
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  LabelList,
  Pie,
  PieChart,
  XAxis,
  YAxis,
} from 'recharts'
import { CalendarClock, GraduationCap, PlayCircle, CheckCircle2, CircleDashed } from 'lucide-react'
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from '@/components/ui/chart'
import { ChartCard, KpiTile, PageHeader } from '@/components/dashboard/shared'
import { cn } from '@/lib/utils'
import {
  kpis,
  journeys,
  byDepartment,
  byCountry,
  byRole,
  assignmentWaves,
} from '@/lib/skillup-data'

const BU_COLORS = { AMBU: 'var(--chart-1)', DBU: 'var(--chart-2)' } as const

const statusConfig = {
  completed: { label: 'Completed', color: 'var(--chart-1)' },
  started: { label: 'In Progress', color: 'var(--chart-3)' },
  notStarted: { label: 'Not Started', color: 'var(--brand-sand)' },
} satisfies ChartConfig

const buConfig = {
  AMBU: { label: 'AMBU', color: 'var(--chart-1)' },
  DBU: { label: 'DBU', color: 'var(--chart-2)' },
} satisfies ChartConfig

const countryConfig = {
  AMBU: { label: 'AMBU', color: 'var(--chart-1)' },
  DBU: { label: 'DBU', color: 'var(--chart-2)' },
} satisfies ChartConfig

const waveConfig = {
  AMBU: { label: 'AMBU', color: 'var(--chart-1)' },
  DBU: { label: 'DBU', color: 'var(--chart-2)' },
} satisfies ChartConfig

const JOURNEY_ORDER = ['GROW', 'MOBILISE', 'MULTIPLY', 'STEER'] as const

const JOURNEY_BLURB: Record<string, string> = {
  GROW: 'Foundation skills for early-career professionals',
  MOBILISE: 'Core management capabilities for people managers',
  MULTIPLY: 'Advanced practices for experienced managers',
  STEER: 'Strategic leadership for senior leaders',
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })
}

/** Layered progress track: completed (gold) + started (amber) over sand base. */
function ProgressTrack({
  completed,
  started,
  total,
  height = 'h-2.5',
}: {
  completed: number
  started: number
  total: number
  height?: string
}) {
  const c = total ? (completed / total) * 100 : 0
  const s = total ? (started / total) * 100 : 0
  return (
    <div className={cn('w-full overflow-hidden rounded-full bg-brand-sand/60', height)} role="img"
      aria-label={`${completed} completed, ${started} in progress, ${total - completed - started} not started of ${total}`}>
      <div className="flex h-full">
        <div className="h-full bg-chart-1 transition-all" style={{ width: `${c}%` }} />
        <div className="h-full bg-chart-3 transition-all" style={{ width: `${s}%` }} />
      </div>
    </div>
  )
}

function LegendDot({ className, label }: { className: string; label: string }) {
  return (
    <span className="flex items-center gap-1.5 text-xs text-muted-foreground">
      <span className={cn('size-2.5 rounded-full', className)} aria-hidden="true" />
      {label}
    </span>
  )
}

export function SkillupPage() {
  const [deptBU, setDeptBU] = useState<'ALL' | 'AMBU' | 'DBU'>('ALL')

  // --- Journey cards: one per journey, AMBU + DBU rows inside ---
  const journeyCards = useMemo(
    () =>
      JOURNEY_ORDER.map((j) => ({
        journey: j,
        blurb: JOURNEY_BLURB[j],
        rows: journeys.filter((r) => r.journey === j),
      })),
    [],
  )

  // --- Overall status donut ---
  const statusDonut = useMemo(
    () => [
      { name: 'Completed', value: kpis.completed, fill: 'var(--color-completed)' },
      { name: 'In Progress', value: kpis.started, fill: 'var(--color-started)' },
      { name: 'Not Started', value: kpis.notStarted, fill: 'var(--color-notStarted)' },
    ],
    [],
  )

  // --- Stacked status by journey x BU (horizontal) ---
  const statusByJourney = useMemo(
    () =>
      journeys.map((j) => ({
        name: `${j.journey} · ${j.bu}`,
        completed: j.completed,
        started: j.started,
        notStarted: j.notStarted,
      })),
    [],
  )

  // --- Department leaderboard ---
  const deptLeaderboard = useMemo(() => {
    const filtered = byDepartment.filter((d) => deptBU === 'ALL' || d.bu === deptBU)
    const merged = new Map<string, { department: string; assigned: number; completed: number; started: number; bu: string[] }>()
    for (const d of filtered) {
      const e = merged.get(d.department) ?? { department: d.department, assigned: 0, completed: 0, started: 0, bu: [] }
      e.assigned += d.assigned
      e.completed += d.completed
      e.started += d.started
      e.bu.push(d.bu)
      merged.set(d.department, e)
    }
    return [...merged.values()]
      .map((e) => ({ ...e, engagement: e.assigned ? ((e.completed + e.started) / e.assigned) * 100 : 0 }))
      .sort((a, b) => b.assigned - a.assigned)
      .slice(0, 12)
  }, [deptBU])

  // --- Country stacked bars ---
  const countryData = useMemo(() => {
    const m = new Map<string, { country: string; AMBU: number; DBU: number }>()
    for (const c of byCountry) {
      const e = m.get(c.country) ?? { country: c.country, AMBU: 0, DBU: 0 }
      e[c.bu as 'AMBU' | 'DBU'] += c.assigned
      m.set(c.country, e)
    }
    return [...m.values()].sort((a, b) => b.AMBU + b.DBU - (a.AMBU + a.DBU))
  }, [])

  // --- Role engagement ---
  const roleData = useMemo(() => {
    const m = new Map<string, { role: string; assigned: number; engaged: number }>()
    for (const r of byRole) {
      const e = m.get(r.role) ?? { role: r.role, assigned: 0, engaged: 0 }
      e.assigned += r.assigned
      e.engaged += r.completed + r.started
      m.set(r.role, e)
    }
    return [...m.values()]
      .map((e) => ({ ...e, rate: e.assigned ? Math.round((e.engaged / e.assigned) * 1000) / 10 : 0 }))
      .sort((a, b) => b.assigned - a.assigned)
  }, [])

  // --- Assignment waves timeline ---
  const waveData = useMemo(() => {
    const m = new Map<string, { date: string; AMBU: number; DBU: number }>()
    for (const w of assignmentWaves) {
      const e = m.get(w.date) ?? { date: w.date, AMBU: 0, DBU: 0 }
      e[w.bu as 'AMBU' | 'DBU'] += w.assigned
      m.set(w.date, e)
    }
    return [...m.values()]
      .sort((a, b) => a.date.localeCompare(b.date))
      .map((e) => ({ ...e, label: formatDate(e.date) }))
  }, [])

  const dueSoon = useMemo(() => {
    const dates = [...new Set(journeys.map((j) => j.dueDate))].sort()
    return dates[0]
  }, [])

  return (
    <div className="flex flex-col gap-6 lg:gap-8">
      <PageHeader
        title="SkillUP E-Learning Journeys"
        description="Assignment progress across GROW, MOBILISE, MULTIPLY and STEER journeys for both business units."
      />

      {/* KPI row */}
      <section className="grid grid-cols-2 gap-4 md:grid-cols-3 xl:grid-cols-5">
        <KpiTile label="Total Assigned" value={kpis.totalAssigned.toLocaleString()} sub="955 employees enrolled" />
        <KpiTile label="Completed" value={String(kpis.completed)} sub={`${kpis.completionRatePct}% of assigned`} emphasis />
        <KpiTile label="In Progress" value={String(kpis.started)} sub="actively learning" />
        <KpiTile label="Not Started" value={kpis.notStarted.toLocaleString()} sub="yet to begin" />
        <KpiTile label="Engagement Rate" value={`${kpis.engagementRatePct}%`} sub="started or completed" emphasis />
      </section>

      {/* Journey cards */}
      <section className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
        {journeyCards.map(({ journey, blurb, rows }) => {
          const total = rows.reduce((a, r) => a + r.assigned, 0)
          const done = rows.reduce((a, r) => a + r.completed, 0)
          const active = rows.reduce((a, r) => a + r.started, 0)
          const due = rows[0]?.dueDate
          return (
            <div
              key={journey}
              className="group/card flex flex-col gap-4 rounded-xl border border-border bg-card p-5 shadow-sm transition-shadow hover:shadow-md"
            >
              <div className="flex items-start justify-between gap-2">
                <div className="flex flex-col gap-1">
                  <span className="text-lg font-semibold tracking-tight text-accent">{journey}</span>
                  <span className="text-xs text-pretty text-muted-foreground">{blurb}</span>
                </div>
                <GraduationCap className="size-5 shrink-0 text-chart-1" aria-hidden="true" />
              </div>

              <div className="flex items-end justify-between">
                <span className="text-4xl font-semibold tabular-nums text-primary">
                  {total ? Math.round((done / total) * 100) : 0}
                  <span className="text-xl">%</span>
                </span>
                <span className="pb-1 text-xs text-muted-foreground">
                  {done} of {total} completed
                </span>
              </div>

              <ProgressTrack completed={done} started={active} total={total} height="h-3" />

              <div className="flex flex-col gap-2.5 border-t border-border pt-3">
                {rows.map((r) => (
                  <div key={r.bu} className="flex items-center gap-3">
                    <span
                      className="w-11 rounded-md px-1.5 py-0.5 text-center text-[10px] font-semibold tracking-wide text-white"
                      style={{ backgroundColor: BU_COLORS[r.bu as 'AMBU' | 'DBU'] }}
                    >
                      {r.bu}
                    </span>
                    <div className="flex-1">
                      <ProgressTrack completed={r.completed} started={r.started} total={r.assigned} height="h-2" />
                    </div>
                    <span className="w-20 text-right text-xs tabular-nums text-muted-foreground">
                      {r.completed + r.started}/{r.assigned}
                    </span>
                  </div>
                ))}
              </div>

              {due && (
                <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                  <CalendarClock className="size-3.5" aria-hidden="true" />
                  Due {formatDate(due)}
                </div>
              )}
            </div>
          )
        })}
      </section>

      {/* Status donut + stacked journey bars */}
      <section className="grid grid-cols-1 gap-4 lg:grid-cols-5">
        <ChartCard
          title="Overall Status"
          description="Share of all 955 assignments by learner status."
          className="lg:col-span-2"
        >
          <div className="flex flex-col items-center gap-4">
            <ChartContainer config={statusConfig} className="mx-auto h-56 w-full max-w-xs">
              <PieChart>
                <ChartTooltip content={<ChartTooltipContent hideLabel />} />
                <Pie data={statusDonut} dataKey="value" nameKey="name" innerRadius={62} outerRadius={90} strokeWidth={2}>
                  {statusDonut.map((s) => (
                    <Cell key={s.name} fill={s.fill} />
                  ))}
                  <LabelList
                    dataKey="value"
                    position="inside"
                    className="fill-white text-xs font-semibold"
                    formatter={(v: number) => (v > 40 ? v : '')}
                  />
                </Pie>
              </PieChart>
            </ChartContainer>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <LegendDot className="bg-chart-1" label={`Completed · ${kpis.completed}`} />
              <LegendDot className="bg-chart-3" label={`In Progress · ${kpis.started}`} />
              <LegendDot className="bg-brand-sand" label={`Not Started · ${kpis.notStarted}`} />
            </div>
          </div>
        </ChartCard>

        <ChartCard
          title="Status by Journey"
          description="Every journey and BU, split by learner status."
          className="lg:col-span-3"
        >
          <ChartContainer config={statusConfig} className="h-80 w-full">
            <BarChart data={statusByJourney} layout="vertical" margin={{ left: 8, right: 16 }}>
              <CartesianGrid horizontal={false} strokeDasharray="3 3" />
              <XAxis type="number" tickLine={false} axisLine={false} fontSize={11} />
              <YAxis type="category" dataKey="name" tickLine={false} axisLine={false} fontSize={11} width={130} />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Bar dataKey="completed" stackId="s" fill="var(--color-completed)" radius={[0, 0, 0, 0]} />
              <Bar dataKey="started" stackId="s" fill="var(--color-started)" radius={[0, 0, 0, 0]} />
              <Bar dataKey="notStarted" stackId="s" fill="var(--color-notStarted)" radius={[0, 4, 4, 0]} />
            </BarChart>
          </ChartContainer>
        </ChartCard>
      </section>

      {/* BU face-off */}
      <section className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {(['AMBU', 'DBU'] as const).map((bu) => {
          const k = kpis.byBU[bu]
          return (
            <div
              key={bu}
              className="relative overflow-hidden rounded-xl border border-border bg-card p-6 shadow-sm"
            >
              <div
                className="absolute inset-y-0 left-0 w-1.5"
                style={{ backgroundColor: BU_COLORS[bu] }}
                aria-hidden="true"
              />
              <div className="flex items-start justify-between">
                <div className="flex flex-col gap-1">
                  <span className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                    {bu === 'AMBU' ? 'Asset Management BU' : 'Development BU'}
                  </span>
                  <span className="text-2xl font-semibold text-accent">{bu}</span>
                </div>
                <span className="text-4xl font-semibold tabular-nums" style={{ color: BU_COLORS[bu] }}>
                  {k.engagementRatePct}
                  <span className="text-xl">%</span>
                </span>
              </div>
              <p className="mt-1 text-xs text-muted-foreground">engagement rate</p>

              <div className="mt-5">
                <ProgressTrack completed={k.completed} started={k.started} total={k.assigned} height="h-3.5" />
              </div>

              <div className="mt-5 grid grid-cols-3 gap-3">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="size-4 text-chart-1" aria-hidden="true" />
                  <div className="flex flex-col">
                    <span className="text-lg font-semibold tabular-nums">{k.completed}</span>
                    <span className="text-[11px] text-muted-foreground">Completed</span>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <PlayCircle className="size-4 text-chart-3" aria-hidden="true" />
                  <div className="flex flex-col">
                    <span className="text-lg font-semibold tabular-nums">{k.started}</span>
                    <span className="text-[11px] text-muted-foreground">In Progress</span>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <CircleDashed className="size-4 text-brand-sand" aria-hidden="true" />
                  <div className="flex flex-col">
                    <span className="text-lg font-semibold tabular-nums">{k.notStarted}</span>
                    <span className="text-[11px] text-muted-foreground">Not Started</span>
                  </div>
                </div>
              </div>
              <p className="mt-4 border-t border-border pt-3 text-xs text-muted-foreground">
                {k.assigned} assignments · {k.completionRatePct}% completion
              </p>
            </div>
          )
        })}
      </section>

      {/* Department leaderboard */}
      <ChartCard
        title="Department Leaderboard"
        description="Top 12 departments by enrollment, ranked with engagement progress."
      >
        <div className="mb-4 flex gap-2">
          {(['ALL', 'AMBU', 'DBU'] as const).map((v) => (
            <button
              key={v}
              onClick={() => setDeptBU(v)}
              className={cn(
                'rounded-full px-3.5 py-1.5 text-xs font-medium transition-colors',
                deptBU === v
                  ? 'bg-accent text-accent-foreground'
                  : 'bg-muted text-muted-foreground hover:bg-muted/70',
              )}
            >
              {v === 'ALL' ? 'Both BUs' : v}
            </button>
          ))}
        </div>
        <div className="flex flex-col divide-y divide-border">
          {deptLeaderboard.map((d, i) => (
            <div key={d.department} className="flex items-center gap-4 py-2.5">
              <span className="w-6 text-right text-sm font-semibold tabular-nums text-muted-foreground">
                {i + 1}
              </span>
              <span className="w-52 truncate text-sm font-medium" title={d.department}>
                {d.department}
              </span>
              <div className="flex flex-1 items-center gap-3">
                <ProgressTrack completed={d.completed} started={d.started} total={d.assigned} height="h-2.5" />
              </div>
              <span className="w-16 text-right text-sm tabular-nums text-muted-foreground">
                {d.assigned} enrolled
              </span>
              <span
                className={cn(
                  'w-14 text-right text-sm font-semibold tabular-nums',
                  d.engagement >= 25 ? 'text-chart-1' : 'text-muted-foreground',
                )}
              >
                {d.engagement.toFixed(0)}%
              </span>
            </div>
          ))}
        </div>
      </ChartCard>

      {/* Country + Role + Waves */}
      <section className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <ChartCard title="Enrollment by Country" description="Assigned learners per country, split by BU.">
          <ChartContainer config={countryConfig} className="h-64 w-full">
            <BarChart data={countryData} margin={{ left: 0, right: 8 }}>
              <CartesianGrid vertical={false} strokeDasharray="3 3" />
              <XAxis dataKey="country" tickLine={false} axisLine={false} fontSize={10} interval={0} angle={-20} textAnchor="end" height={56} />
              <YAxis tickLine={false} axisLine={false} fontSize={11} width={34} />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Bar dataKey="AMBU" stackId="bu" fill="var(--color-AMBU)" radius={[0, 0, 0, 0]} />
              <Bar dataKey="DBU" stackId="bu" fill="var(--color-DBU)" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ChartContainer>
        </ChartCard>

        <ChartCard title="Engagement by Role Archetype" description="Engagement rate (started + completed) per role.">
          <div className="flex flex-col gap-3 pt-2">
            {roleData.map((r) => (
              <div key={r.role} className="flex items-center gap-3">
                <span className="w-40 truncate text-sm" title={r.role}>{r.role}</span>
                <div className="h-2.5 flex-1 overflow-hidden rounded-full bg-brand-sand/60">
                  <div
                    className="h-full rounded-full bg-chart-2 transition-all"
                    style={{ width: `${Math.max(r.rate, 2)}%` }}
                  />
                </div>
                <span className="w-24 text-right text-xs tabular-nums text-muted-foreground">
                  {r.rate}% · {r.assigned}
                </span>
              </div>
            ))}
          </div>
        </ChartCard>
      </section>

      <ChartCard
        title="Assignment Rollout Waves"
        description={`When journeys were assigned to learners. Nearest due date: ${formatDate(dueSoon)}.`}
      >
        <ChartContainer config={waveConfig} className="h-56 w-full">
          <BarChart data={waveData} margin={{ left: 0, right: 8 }}>
            <CartesianGrid vertical={false} strokeDasharray="3 3" />
            <XAxis dataKey="label" tickLine={false} axisLine={false} fontSize={11} />
            <YAxis tickLine={false} axisLine={false} fontSize={11} width={34} />
            <ChartTooltip content={<ChartTooltipContent />} />
            <Bar dataKey="AMBU" stackId="w" fill="var(--color-AMBU)" radius={[0, 0, 0, 0]} />
            <Bar dataKey="DBU" stackId="w" fill="var(--color-DBU)" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ChartContainer>
      </ChartCard>
    </div>
  )
}
