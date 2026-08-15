'use client'

import { useMemo } from 'react'
import { Check, X, RotateCcw } from 'lucide-react'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import type { ChatScope } from '@/lib/chat-scope'
import { ALL_YEARS, ALL_BUS, ALL_COUNTRIES, ALL_ROLES } from '@/lib/aggregate'
import { programs } from '@/lib/dashboard-data'

interface ScopeFilterProps {
  scope: ChatScope
  onScopeChange: (scope: ChatScope) => void
  /** When provided, shows a numeric badge with this count on the trigger */
  badgeCount?: number
  disabled?: boolean
  triggerClassName?: string
}

type DimensionKey = 'years' | 'bus' | 'countries' | 'roles' | 'programs'

const DIMENSIONS: { key: DimensionKey; label: string }[] = [
  { key: 'years', label: 'Year' },
  { key: 'bus', label: 'Business Unit' },
  { key: 'countries', label: 'Country' },
  { key: 'roles', label: 'Role' },
  { key: 'programs', label: 'Program' },
]

const PROGRAM_LABELS: Record<string, string> = Object.fromEntries(
  programs.map((p) => [p.code, p.displayName]),
)

function optionLabel(key: DimensionKey, value: string | number): string {
  if (key === 'programs') {
    return PROGRAM_LABELS[value as string] ?? (value as string)
  }
  if (key === 'years') {
    return String(value)
  }
  return value as string
}

function toggleValue(scope: ChatScope, key: DimensionKey, value: string | number): ChatScope {
  const currentArr = (scope[key] as Array<string | number> | undefined) ?? []
  const valueStr = String(value)
  const isSelected = currentArr.some((v) => String(v) === valueStr)
  const nextArr = isSelected
    ? currentArr.filter((v) => String(v) !== valueStr)
    : [...currentArr, value]
  return { ...scope, [key]: nextArr }
}

// Static option lookup — populated once at module load from the same source
// the dashboard uses (lib/aggregate.ts + lib/dashboard-data.ts). Never hard-coded.
const OPTION_LISTS: Record<DimensionKey, Array<string | number>> = {
  years: ALL_YEARS,
  bus: ALL_BUS,
  countries: ALL_COUNTRIES,
  roles: ALL_ROLES,
  programs: programs.map((p) => p.code),
}

export function ScopeFilter({
  scope,
  onScopeChange,
  badgeCount = 0,
  disabled = false,
  triggerClassName,
}: ScopeFilterProps) {
  // Memoize the option lists so we don't recompute on every render.
  // The lists come from lib/aggregate.ts and lib/dashboard-data.ts at
  // module load — never hard-coded.
  const optionLists = useMemo(() => OPTION_LISTS, [])

  return (
    <Popover>
      <PopoverTrigger
        render={
          <button
            type="button"
            disabled={disabled}
            title="Filter scope"
            aria-label="Filter scope"
            className={cn(
              'relative flex size-9 items-center justify-center rounded-full transition',
              'hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed',
              triggerClassName,
            )}
            onClick={(e) => e.stopPropagation()}
          />
        }
      >
        {/* Sliders icon — distinguishes from Paperclip */}
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <line x1="4" y1="21" x2="4" y2="14" />
          <line x1="4" y1="10" x2="4" y2="3" />
          <line x1="12" y1="21" x2="12" y2="12" />
          <line x1="12" y1="8" x2="12" y2="3" />
          <line x1="20" y1="21" x2="20" y2="16" />
          <line x1="20" y1="12" x2="20" y2="3" />
          <line x1="1" y1="14" x2="7" y2="14" />
          <line x1="9" y1="8" x2="15" y2="8" />
          <line x1="17" y1="16" x2="23" y2="16" />
        </svg>
        {badgeCount > 0 && (
          <span className="absolute -top-0.5 -right-0.5 flex size-4 items-center justify-center rounded-full bg-[var(--brand-burgundy)] text-[10px] font-semibold text-white ring-2 ring-white">
            {badgeCount > 9 ? '9+' : badgeCount}
          </span>
        )}
      </PopoverTrigger>

      <PopoverContent align="start" side="top" sideOffset={8} className="w-[min(92vw,440px)] p-0">
        <div className="glass-panel rounded-2xl">
          {/* Header */}
          <div className="flex items-center justify-between border-b border-white/30 px-4 py-3">
            <div>
              <p className="text-sm font-semibold text-foreground">Filter scope</p>
              <p className="text-[11px] text-muted-foreground">Applies as default for every tool call</p>
            </div>
            {badgeCount > 0 && (
              <Button
                variant="ghost"
                size="xs"
                onClick={(e) => {
                  e.stopPropagation()
                  onScopeChange({
                    years: [],
                    bus: [],
                    countries: [],
                    roles: [],
                    programs: [],
                  })
                }}
                className="text-muted-foreground hover:text-foreground"
              >
                <RotateCcw className="size-3" />
                Clear all
              </Button>
            )}
          </div>

          {/* Dimension lists */}
          <div className="max-h-[60vh] overflow-y-auto p-2">
            {DIMENSIONS.map((dim) => {
              const opts = optionLists[dim.key]
              const selected = (scope[dim.key] as Array<string | number> | undefined) ?? []
              if (opts.length === 0) return null
              return (
                <div key={dim.key} className="px-2 py-2">
                  <p className="px-2 pb-1 text-[11px] font-semibold uppercase tracking-wide text-muted-foreground">
                    {dim.label}
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {opts.map((opt) => {
                      const isSelected = selected.some((v) => String(v) === String(opt))
                      return (
                        <button
                          key={String(opt)}
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation()
                            onScopeChange(toggleValue(scope, dim.key, opt))
                          }}
                          className={cn(
                            'flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-medium transition',
                            isSelected
                              ? 'bg-[var(--brand-gold)] text-white shadow-sm'
                              : 'bg-white/50 text-foreground hover:bg-white/70',
                          )}
                        >
                          {isSelected && <Check className="size-3" />}
                          {optionLabel(dim.key, opt)}
                        </button>
                      )
                    })}
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </PopoverContent>
    </Popover>
  )
}

/** Render selected scope values as removable glass-pill chips. */
export function ScopeChips({
  scope,
  onScopeChange,
}: {
  scope: ChatScope
  onScopeChange: (scope: ChatScope) => void
}) {
  const chips: { dim: DimensionKey; value: string | number; label: string }[] = []
  for (const dim of DIMENSIONS) {
    const arr = (scope[dim.key] as Array<string | number> | undefined) ?? []
    for (const v of arr) {
      chips.push({
        dim: dim.key,
        value: v,
        label: optionLabel(dim.key, v),
      })
    }
  }
  if (chips.length === 0) return null
  return (
    <div className="flex flex-wrap items-center gap-1.5">
      {chips.map((chip) => (
        <button
          key={`${chip.dim}:${String(chip.value)}`}
          type="button"
          onClick={(e) => {
            e.stopPropagation()
            onScopeChange(toggleValue(scope, chip.dim, chip.value))
          }}
          className="group flex items-center gap-1 rounded-full bg-white/60 px-2 py-0.5 text-xs font-medium text-foreground backdrop-blur-md transition hover:bg-white/80"
          title="Remove"
        >
          <span className="text-[10px] uppercase tracking-wide text-muted-foreground">
            {chip.dim === 'years' ? 'Y' : chip.dim === 'bus' ? 'BU' : chip.dim === 'countries' ? 'CO' : chip.dim === 'roles' ? 'RO' : 'PR'}
          </span>
          <span>{chip.label}</span>
          <X className="size-3 opacity-60 group-hover:opacity-100" />
        </button>
      ))}
      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation()
          onScopeChange({
            years: [],
            bus: [],
            countries: [],
            roles: [],
            programs: [],
          })
        }}
        className="rounded-full px-2 py-0.5 text-xs font-medium text-muted-foreground underline-offset-2 hover:underline"
      >
        Clear all
      </button>
    </div>
  )
}
