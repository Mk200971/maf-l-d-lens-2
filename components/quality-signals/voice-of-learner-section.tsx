'use client'

import { useMemo } from 'react'
import { voiceOfLearner } from '@/lib/dashboard-data.voiceOfLearner'
import type { VoiceOfLearnerRow, VoiceOfLearnerQuote } from '@/lib/types'
import { useFilters } from '@/lib/filters-context'
import { programs, kpis } from '@/lib/dashboard-data'
import { ProgramVoiceCard } from './program-voice-card'
import { KpiTile } from '@/components/dashboard/shared'
import { Badge } from '@/components/ui/badge'

export function VoiceOfLearnerSection() {
  const { filters } = useFilters()

  // Calculate totals
  const totalComments = voiceOfLearner.reduce((sum, v) => sum + v.totalComments, 0)
  const totalNonTrivial = voiceOfLearner.reduce((sum, v) => sum + v.nonTrivialComments, 0)

  // Filter programs based on selection
  const visiblePrograms = useMemo(() => {
    if (filters.programs.length === 0) {
      return programs
    }
    return programs.filter(p => filters.programs.includes(p.code))
  }, [filters.programs])

  // Create a map of voice data by program code
  const voiceMap = new Map<string, VoiceOfLearnerRow>()
  voiceOfLearner.forEach(v => {
    voiceMap.set(v.programCode, v)
  })

  // Helper to get NPS for a program
  const getNpsScore = (programCode: string) => {
    const entry = kpis.npsByProgramBU[programCode]
    if (!entry) return null
    // If single BU is selected, show that; otherwise show average of non-null values
    const selectedBus = filters.bus.filter(b => b === 'AMBU' || b === 'DBU')
    if (selectedBus.length === 1) {
      return entry[selectedBus[0] as 'AMBU' | 'DBU']
    }
    // Show average if both available
    const values = [entry.AMBU, entry.DBU].filter(v => v !== null) as number[]
    return values.length > 0 ? Math.round(values.reduce((a, b) => a + b) / values.length) : null
  }

  return (
    <div className="flex flex-col gap-6">
      {/* Hero row — total comments */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <KpiTile
          label="Total Learner Comments"
          value={totalComments.toString()}
          sub={`across ${voiceOfLearner.length} programs (SLP excluded)`}
        />
        <KpiTile
          label="Non-Trivial Comments"
          value={totalNonTrivial.toString()}
          sub="after filtering junk"
        />
      </div>

      {/* Program cards grid */}
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        {visiblePrograms.map(program => {
          const voiceData = voiceMap.get(program.code)
          const nps = getNpsScore(program.code)

          // Special handling for SLP (no voice data available)
          if (program.code === 'SLP' && !voiceData) {
            return (
              <ProgramVoiceCard
                key={program.code}
                row={null}
                isPlaceholder={true}
              />
            )
          }

          return (
            <ProgramVoiceCard
              key={program.code}
              row={voiceData as VoiceOfLearnerRow}
              npsScore={nps ?? undefined}
            />
          )
        })}
      </div>

      {/* Empty state */}
      {visiblePrograms.filter(p => voiceMap.has(p.code) || p.code === 'SLP').length === 0 && (
        <div className="flex flex-col items-center gap-2 rounded-lg border border-dashed border-border py-16 text-center">
          <Badge variant="secondary">No voice data available</Badge>
          <p className="max-w-sm text-sm text-pretty text-muted-foreground">
            No programs with qualitative feedback are selected. Select programs like RISE,
            Psychological Safety, or Resilience to see learner insights.
          </p>
        </div>
      )}
    </div>
  )
}
