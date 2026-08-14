'use client'

import { usePathname } from 'next/navigation'
import { ChevronDown, RotateCcw } from 'lucide-react'
import { MetricGuide } from '@/components/dashboard/metric-help'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Slider } from '@/components/ui/slider'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip'
import {
  getAvailableBus,
  getAvailableCountries,
  getAvailableFeedbackBus,
  getAvailableFeedbackCountries,
  getAvailableFeedbackMonths,
  getAvailableFeedbackPrograms,
  getAvailableFeedbackYears,
  getAvailableMonths,
  getAvailablePrograms,
  getAvailableRoles,
  getAvailableSessions,
  getAvailableYears,
} from '@/lib/aggregate'
import { programs } from '@/lib/dashboard-data'
import {
  disabledFilterTooltip,
  pageFilterRules,
  type PageId,
} from '@/lib/filter-rules'
import { useFilters } from '@/lib/filters-context'
import type { FilterKey } from '@/lib/types'
import { cn } from '@/lib/utils'

function pageIdFromPath(pathname: string): PageId {
  if (pathname.startsWith('/programs')) return 'programs'
  if (pathname.startsWith('/learners')) return 'learners'
  if (pathname.startsWith('/feedback')) return 'feedback'
  if (pathname.startsWith('/eligibility')) return 'eligibility'
  if (pathname.startsWith('/extras')) return 'extras'
  return 'overview'
}

function DisabledWrap({
  disabled,
  children,
}: {
  disabled: boolean
  children: React.ReactNode
}) {
  if (!disabled) return <>{children}</>
  return (
    <Tooltip>
      <TooltipTrigger
        render={<span className="cursor-not-allowed opacity-40" aria-disabled="true" />}
      >
        <span className="pointer-events-none">{children}</span>
      </TooltipTrigger>
      <TooltipContent side="bottom" className="max-w-56 text-pretty">
        {disabledFilterTooltip}
      </TooltipContent>
    </Tooltip>
  )
}

function MultiSelect({
  label,
  options,
  selected,
  onToggle,
  disabled,
  getLabel,
}: {
  label: string
  options: string[]
  selected: string[]
  onToggle: (v: string) => void
  disabled: boolean
  getLabel?: (v: string) => string
}) {
  return (
    <DisabledWrap disabled={disabled}>
      <Popover>
        <PopoverTrigger
          render={
            <Button
              variant="outline"
              size="sm"
              className={cn(
                'h-8 gap-1.5 bg-card text-xs',
                selected.length > 0 && 'border-primary',
              )}
            />
          }
        >
          {label}
          {selected.length > 0 && (
            <Badge className="h-4 min-w-4 rounded-full px-1 text-[10px]">{selected.length}</Badge>
          )}
          <ChevronDown className="size-3.5 opacity-60" aria-hidden="true" />
        </PopoverTrigger>
        <PopoverContent align="start" className="max-h-80 w-80 overflow-y-auto p-2">
          <div className="flex flex-col gap-1">
            {options.map((opt) => (
              <label
                key={opt}
                className="flex cursor-pointer items-center gap-2 rounded-sm px-2 py-1.5 text-sm hover:bg-muted"
              >
                <Checkbox
                  checked={selected.includes(opt)}
                  onCheckedChange={() => onToggle(opt)}
                />
                <span className="line-clamp-2">{getLabel ? getLabel(opt) : opt}</span>
              </label>
            ))}
          </div>
        </PopoverContent>
      </Popover>
    </DisabledWrap>
  )
}

export function FilterBar() {
  const pathname = usePathname()
  const pageId = pageIdFromPath(pathname)
  const allowed = new Set<FilterKey>(pageFilterRules[pageId])
  const { filters, toggle, setMonthRange, reset, activeCount } = useFilters()

  // SkillUP and Mandatory Learning each own their own in-page filter panel (BU,
  // Journey/Course, Status, Country) with page-specific dimensions and, for
  // Mandatory, a different data domain (business entities, job locations) than
  // the global filters cover. The global filter controls would just duplicate
  // BU/Country and do nothing else here, so we render a minimal bar that keeps
  // only the Metric guide.
  if (pathname.startsWith('/skillup') || pathname.startsWith('/mandatory')) {
    return (
      <div className="sticky top-0 z-20 border-b border-border bg-background/95 backdrop-blur">
        <div className="flex items-center px-4 py-2.5 md:px-6">
          <div className="ml-auto">
            <MetricGuide />
          </div>
        </div>
      </div>
    )
  }

  const isFeedback = pageId === 'feedback'
  const availableYears = isFeedback
    ? getAvailableFeedbackYears(filters)
    : getAvailableYears(filters)
  const availableBus = isFeedback
    ? getAvailableFeedbackBus(filters)
    : getAvailableBus(filters)
  const availableCountries = isFeedback
    ? getAvailableFeedbackCountries(filters)
    : getAvailableCountries(filters)
  const availableRoles = getAvailableRoles(filters)
  const availablePrograms = isFeedback
    ? getAvailableFeedbackPrograms(filters)
    : getAvailablePrograms(filters)
  const availableMonths = isFeedback
    ? getAvailableFeedbackMonths(filters)
    : getAvailableMonths(filters)
  const availableSessions = isFeedback ? getAvailableSessions(filters) : []

  const monthIdx: [number, number] = filters.monthRange
    ? [
        Math.max(0, availableMonths.indexOf(filters.monthRange[0])),
        Math.max(0, availableMonths.indexOf(filters.monthRange[1])),
      ]
    : [0, availableMonths.length - 1]

  return (
    <TooltipProvider delay={200}>
      <div className="sticky top-0 z-20 border-b border-border bg-background/95 backdrop-blur">
        <div className="flex flex-wrap items-center gap-2 px-4 py-2.5 md:px-6">
          {/* Year chips */}
          <DisabledWrap disabled={!allowed.has('year')}>
            <div className="flex items-center gap-1" role="group" aria-label="Filter by year">
              {availableYears.map((y) => (
                <button
                  key={y}
                  type="button"
                  onClick={() => toggle('years', y)}
                  aria-pressed={filters.years.includes(y)}
                  className={cn(
                    'rounded-full border px-2.5 py-1 text-xs font-medium transition-colors',
                    filters.years.includes(y)
                      ? 'border-primary bg-primary text-primary-foreground'
                      : 'border-border bg-card text-foreground hover:border-primary',
                  )}
                >
                  {y}
                </button>
              ))}
            </div>
          </DisabledWrap>

          {/* BU chips */}
          <DisabledWrap disabled={!allowed.has('bu')}>
            <div className="flex items-center gap-1" role="group" aria-label="Filter by business unit">
              {availableBus.map((bu) => (
                <button
                  key={bu}
                  type="button"
                  onClick={() => toggle('bus', bu)}
                  aria-pressed={filters.bus.includes(bu)}
                  className={cn(
                    'rounded-full border px-2.5 py-1 text-xs font-medium transition-colors',
                    filters.bus.includes(bu)
                      ? 'border-accent bg-accent text-accent-foreground'
                      : 'border-border bg-card text-foreground hover:border-accent',
                  )}
                >
                  {bu}
                </button>
              ))}
            </div>
          </DisabledWrap>

          <MultiSelect
            label="Country"
            options={availableCountries}
            selected={filters.countries}
            onToggle={(v) => toggle('countries', v)}
            disabled={!allowed.has('country')}
          />
          <MultiSelect
            label="Role"
            options={availableRoles}
            selected={filters.roles}
            onToggle={(v) => toggle('roles', v)}
            disabled={!allowed.has('role')}
          />
          <MultiSelect
            label="Program"
            options={availablePrograms}
            selected={filters.programs}
            onToggle={(v) => toggle('programs', v)}
            disabled={!allowed.has('program')}
            getLabel={(code) => programs.find((p) => p.code === code)?.displayName ?? code}
          />
          {allowed.has('session') && (
            <MultiSelect
              label="Session"
              options={availableSessions.map((session) => session.sessionId)}
              selected={filters.sessionIds}
              onToggle={(v) => toggle('sessionIds', v)}
              disabled={false}
              getLabel={(sessionId) =>
                availableSessions.find((session) => session.sessionId === sessionId)?.label ?? sessionId
              }
            />
          )}

          {/* Month range */}
          <DisabledWrap disabled={!allowed.has('month')}>
            <Popover>
              <PopoverTrigger
                render={
                  <Button
                    variant="outline"
                    size="sm"
                    className={cn(
                      'h-8 gap-1.5 bg-card text-xs',
                      filters.monthRange && 'border-primary',
                    )}
                  />
                }
              >
                {filters.monthRange
                  ? `${filters.monthRange[0]} → ${filters.monthRange[1]}`
                  : 'Month range'}
                <ChevronDown className="size-3.5 opacity-60" aria-hidden="true" />
              </PopoverTrigger>
              <PopoverContent align="start" className="w-72 p-4">
                <p className="mb-3 text-xs font-medium uppercase tracking-wide text-muted-foreground">
                  Month range
                </p>
                <Slider
                  min={0}
                  max={availableMonths.length - 1}
                  step={1}
                  value={monthIdx as number[]}
                  onValueChange={(value) => {
                    const vals = Array.isArray(value) ? (value as number[]) : [value as number]
                    const [lo, hi] = [vals[0] ?? 0, vals[1] ?? availableMonths.length - 1]
                    if (lo === 0 && hi === availableMonths.length - 1) setMonthRange(null)
                    else setMonthRange([availableMonths[lo] ?? availableMonths[0] ?? '', availableMonths[hi] ?? availableMonths[availableMonths.length - 1] ?? ''])
                  }}
                  aria-label="Month range"
                />
                <div className="mt-2 flex justify-between text-xs text-muted-foreground">
                  <span>{availableMonths[monthIdx[0]]}</span>
                  <span>{availableMonths[monthIdx[1]]}</span>
                </div>
              </PopoverContent>
            </Popover>
          </DisabledWrap>

          <div className="ml-auto">
            <MetricGuide />
          </div>

          {activeCount > 0 && (
            <Button variant="ghost" size="sm" className="h-8 gap-1.5 text-xs" onClick={reset}>
              <RotateCcw className="size-3.5" aria-hidden="true" />
              Reset ({activeCount})
            </Button>
          )}
        </div>
      </div>
    </TooltipProvider>
  )
}
