'use client'

import { useMemo, useState } from 'react'
import { CheckCircle2 } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { MetricHelp } from '@/components/dashboard/metric-help'
import { PageHeader } from '@/components/dashboard/shared'
import { ProgramDrawer } from '@/components/pages/program-drawer'
import { avgBy, filterHours, formatNumber, normalizedAvgSat, sumBy } from '@/lib/aggregate'
import { completion, feedback, programs } from '@/lib/dashboard-data'
import { useFilters } from '@/lib/filters-context'
import type { Program } from '@/lib/types'

export function ProgramsPage() {
  const { filters } = useFilters()
  const [selected, setSelected] = useState<Program | null>(null)

  const visible = useMemo(() => {
    let list = programs
    if (filters.programs.length > 0) list = list.filter((p) => filters.programs.includes(p.code))
    if (filters.years.length > 0) list = list.filter((p) => filters.years.includes(p.year))
    if (filters.bus.length > 0)
      list = list.filter((p) => filters.bus.some((bu: string) => bu !== 'Unknown' && p.buScope.includes(bu)))
    return list
  }, [filters])

  return (
    <>
      <PageHeader
        title="Programs"
        description="All programs with delivery, feedback, eligibility, and extras signals. Click a card for the full drill-down."
      />

      <section className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
        {visible.map((p) => (
          <ProgramCard key={p.code} program={p} onOpen={() => setSelected(p)} />
        ))}
      </section>

      <ProgramDrawer program={selected} onClose={() => setSelected(null)} />
    </>
  )
}

function ProgramCard({ program, onOpen }: { program: Program; onOpen: () => void }) {
  const { filters } = useFilters()

  const rows = useMemo(
    () => filterHours({ ...filters, programs: [program.code] }),
    [filters, program.code],
  )

  const hours = Math.round(sumBy(rows, (r) => r.totalHours))
  const completions = Math.round(sumBy(rows, (r) => r.completions))
  const comp = completion.find((c) => c.programCode === program.code)
  const fb = feedback.filter((r) => r.programCode === program.code)
  const isPsychologicalSafety = fb.some((r) => r.scale === '0-10')
  // Use normalizedAvgSat so 0-10 PS rows compare on 1-5 scale
  const sat = normalizedAvgSat(fb)
  const nativeSat = isPsychologicalSafety
    ? avgBy(fb, (r) => r.satisfaction, (r) => r.responses)
    : null

  return (
    <Card
      role="button"
      tabIndex={0}
      onClick={onOpen}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault()
          onOpen()
        }
      }}
      className="cursor-pointer gap-3 transition-shadow hover:shadow-md focus-visible:ring-2 focus-visible:ring-ring"
    >
      <CardHeader className="gap-1.5">
        <div className="flex items-start justify-between gap-2">
          <h2 className="text-base font-semibold leading-snug text-balance">{program.displayName}</h2>
          <Badge variant="outline" className="shrink-0 font-mono text-[10px]">
            {program.code.length > 12 ? program.code.slice(0, 12) + '…' : program.code}
          </Badge>
        </div>
        <div className="flex items-center gap-1.5">
          <Badge variant="secondary" className="text-[10px]">
            {program.year}
          </Badge>
          <Badge variant="secondary" className="text-[10px]">
            {program.buScope}
          </Badge>
          {program.hasFeedback && sat > 0 && (
            <span
              className="ml-auto flex items-center gap-1 text-xs font-medium text-brand-amber"
              aria-label={
                isPsychologicalSafety && nativeSat !== null
                  ? `Satisfaction ${sat.toFixed(2)} out of 5 normalized; ${nativeSat.toFixed(2)} out of 10 native`
                  : `Satisfaction ${sat.toFixed(2)} out of 5`
              }
            >
              <span
                className="inline-block size-2 rounded-full bg-brand-amber"
                aria-hidden="true"
              />
              <span className="text-right">
                {isPsychologicalSafety && nativeSat !== null ? (
                  <>
                    <span className="block">{sat.toFixed(2)} / 5 normalized</span>
                    <span className="block text-[10px] font-normal text-muted-foreground">
                      {nativeSat.toFixed(2)} / 10 native
                    </span>
                  </>
                ) : (
                  `${sat.toFixed(2)} / 5`
                )}
              </span>
            </span>
          )}
        </div>
      </CardHeader>
      <CardContent className="flex flex-col gap-3">
        <div className="grid grid-cols-3 gap-2">
          <MiniKpi label="Hours" value={formatNumber(hours)} docId="learning-hours" />
          <MiniKpi 
            label="Attendees" 
            value={formatNumber(completions)} 
            docId="completions" 
            description={program.hasEligibility ? "Unique program completions" : "Session attendees"}
          />
          {program.hasEligibility ? (
            <MiniKpi
              label="Eligible"
              value={formatNumber(comp?.eligible ?? 0)}
              docId="eligible"
              description="Target audience"
            />
          ) : (
            <div />
          )}
        </div>
        {program.hasEligibility && comp && (
          <div className="flex flex-col gap-1">
            <div className="flex items-center justify-between gap-2 text-xs">
              <span className="flex items-center gap-1 text-muted-foreground">Completion rate <MetricHelp id="completion-rate" /></span>
              <span className="font-medium tabular-nums">
                {comp.completionRatePct.toFixed(1)}%
              </span>
            </div>
            <Progress
              value={comp.completionRatePct}
              className="h-1.5"
              aria-label={`Completion rate ${comp.completionRatePct.toFixed(1)}%`}
            />
          </div>
        )}
        <div className="flex flex-wrap gap-1.5">
          {program.hasFeedback && <FlagChip label="Feedback" />}
          {program.hasEligibility && <FlagChip label="Eligibility" />}
          {!program.hasEligibility && <FlagChip label="Nomination-based program" />}
          {program.hasExtras && <FlagChip label="Extras" />}
        </div>
      </CardContent>
    </Card>
  )
}

function MiniKpi({
  label,
  value,
  docId,
  description,
}: {
  label: string
  value: string
  docId: string
  description?: string
}) {
  return (
    <div className="rounded-md bg-muted px-2 py-1.5" title={description}>
      <div className="flex items-center justify-between gap-1">
        <p className="text-[10px] uppercase tracking-wide text-muted-foreground">{label}</p>
        <MetricHelp id={docId} />
      </div>
      <p className="text-sm font-semibold tabular-nums">{value}</p>
      {description && <p className="sr-only">{description}</p>}
    </div>
  )
}

function FlagChip({ label }: { label: string }) {
  return (
    <span className="flex items-center gap-1 rounded-full bg-secondary px-2 py-0.5 text-[10px] font-medium text-secondary-foreground">
      <CheckCircle2 className="size-3 text-primary" aria-hidden="true" />
      {label}
    </span>
  )
}
