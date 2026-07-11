'use client'

import { usePathname } from 'next/navigation'
import { ChevronDown, RotateCcw } from 'lucide-react'
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
  ALL_BUS,
  ALL_COUNTRIES,
  ALL_MONTHS,
  ALL_ROLES,
  ALL_YEARS,
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
        <PopoverContent align="start" className="max-h-80 w-64 overflow-y-auto p-2">
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
                <span className="truncate">{getLabel ? getLabel(opt) : opt}</span>
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

  const monthIdx: [number, number] = filters.monthRange
    ? [
        Math.max(0, ALL_MONTHS.indexOf(filters.monthRange[0])),
        Math.max(0, ALL_MONTHS.indexOf(filters.monthRange[1])),
      ]
    : [0, ALL_MONTHS.length - 1]

  return (
    <TooltipProvider delay={200}>
      <div className="sticky top-0 z-20 border-b border-border bg-background/95 backdrop-blur">
        <div className="flex flex-wrap items-center gap-2 px-4 py-2.5 md:px-6">
          {/* Year chips */}
          <DisabledWrap disabled={!allowed.has('year')}>
            <div className="flex items-center gap-1" role="group" aria-label="Filter by year">
              {ALL_YEARS.map((y) => (
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
              {ALL_BUS.map((bu) => (
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
            options={ALL_COUNTRIES}
            selected={filters.countries}
            onToggle={(v) => toggle('countries', v)}
            disabled={!allowed.has('country')}
          />
          <MultiSelect
            label="Role"
            options={ALL_ROLES}
            selected={filters.roles}
            onToggle={(v) => toggle('roles', v)}
            disabled={!allowed.has('role')}
          />
          <MultiSelect
            label="Program"
            options={programs.map((p) => p.code)}
            selected={filters.programs}
            onToggle={(v) => toggle('programs', v)}
            disabled={!allowed.has('program')}
            getLabel={(code) => programs.find((p) => p.code === code)?.name ?? code}
          />

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
                  max={ALL_MONTHS.length - 1}
                  step={1}
                  value={monthIdx}
                  onValueChange={([lo, hi]) => {
                    if (lo === 0 && hi === ALL_MONTHS.length - 1) setMonthRange(null)
                    else setMonthRange([ALL_MONTHS[lo], ALL_MONTHS[hi]])
                  }}
                  aria-label="Month range"
                />
                <div className="mt-2 flex justify-between text-xs text-muted-foreground">
                  <span>{ALL_MONTHS[monthIdx[0]]}</span>
                  <span>{ALL_MONTHS[monthIdx[1]]}</span>
                </div>
              </PopoverContent>
            </Popover>
          </DisabledWrap>

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
