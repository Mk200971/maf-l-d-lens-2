'use client'

import { useMemo, useState, useEffect, useRef } from 'react'
import { Check, X, RotateCcw, SlidersHorizontal, ChevronDown } from 'lucide-react'
import { cn } from '@/lib/utils'
import type { ChatScope } from '@/lib/chat-scope'
import { ALL_YEARS, ALL_BUS, ALL_COUNTRIES, ALL_ROLES } from '@/lib/aggregate'
import { programs } from '@/lib/dashboard-data'

interface ScopeFilterProps {
  scope: ChatScope
  onScopeChange: (scope: ChatScope) => void
  badgeCount?: number
  disabled?: boolean
  triggerClassName?: string
}

interface ScopeChipsProps {
  scope: ChatScope
  onScopeChange: (scope: ChatScope) => void
}

type DimensionKey = 'years' | 'bus' | 'countries' | 'roles' | 'programs'

const DIMENSIONS: { key: DimensionKey; label: string; short: string }[] = [
  { key: 'years', label: 'Year', short: 'Y' },
  { key: 'bus', label: 'Business Unit', short: 'BU' },
  { key: 'countries', label: 'Country', short: 'CO' },
  { key: 'roles', label: 'Role', short: 'RO' },
  { key: 'programs', label: 'Program', short: 'PR' },
]

const PROGRAM_LABELS: Record<string, string> = Object.fromEntries(
  programs.map((p) => [p.code, p.displayName]),
)

function optionLabel(key: DimensionKey, value: string | number): string {
  if (key === 'programs') return PROGRAM_LABELS[value as string] ?? (value as string)
  if (key === 'years') return String(value)
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

const EMPTY_SCOPE: ChatScope = {
  years: [],
  bus: [],
  countries: [],
  roles: [],
  programs: [],
}

// Static option lookup — populated once at module load from lib/aggregate.ts +
// lib/dashboard-data.ts. Never hard-coded.
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
  const [open, setOpen] = useState(false)
  const popoverRef = useRef<HTMLDivElement>(null)
  const triggerRef = useRef<HTMLButtonElement>(null)

  // Close on outside click or ESC
  useEffect(() => {
    if (!open) return
    const handleClick = (e: MouseEvent) => {
      const target = e.target as Node
      if (
        popoverRef.current && !popoverRef.current.contains(target) &&
        triggerRef.current && !triggerRef.current.contains(target)
      ) {
        setOpen(false)
      }
    }
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false)
    }
    document.addEventListener('mousedown', handleClick)
    document.addEventListener('keydown', handleKey)
    return () => {
      document.removeEventListener('mousedown', handleClick)
      document.removeEventListener('keydown', handleKey)
    }
  }, [open])

  const optionLists = useMemo(() => OPTION_LISTS, [])

  const totalSelected = DIMENSIONS.reduce((acc, dim) => {
    return acc + ((scope[dim.key] as Array<string | number> | undefined)?.length ?? 0)
  }, 0)

  return (
    <div className="relative">
      <button
        ref={triggerRef}
        type="button"
        disabled={disabled}
        title="Filter scope"
        aria-label={`Filter scope${badgeCount > 0 ? ` (${badgeCount} active)` : ''}`}
        aria-expanded={open}
        aria-haspopup="dialog"
        onClick={(e) => {
          e.stopPropagation()
          if (!disabled) setOpen((v) => !v)
        }}
        className={cn(
          'relative flex size-9 items-center justify-center rounded-full transition-all duration-200',
          'text-gray-600 hover:bg-gray-100 hover:text-gray-900',
          'disabled:opacity-40 disabled:cursor-not-allowed',
          open && 'bg-gray-100 text-gray-900',
          triggerClassName,
        )}
      >
        <SlidersHorizontal size={18} />
        {badgeCount > 0 && (
          <span className="absolute -top-0.5 -right-0.5 flex min-w-4 h-4 px-1 items-center justify-center rounded-full bg-[var(--brand-burgundy)] text-[10px] font-semibold text-white ring-2 ring-white">
            {badgeCount > 9 ? '9+' : badgeCount}
          </span>
        )}
      </button>

      {open && (
        <div
          ref={popoverRef}
          role="dialog"
          aria-label="Filter scope"
          className="glass-panel absolute bottom-full left-0 z-50 mb-2 w-[min(92vw,420px)] rounded-2xl p-0 shadow-2xl"
          style={{ animation: 'scopeFadeIn 0.18s ease-out' }}
        >
          {/* Header */}
          <div className="flex items-center justify-between border-b border-white/40 px-4 py-3">
            <div className="flex items-center gap-2">
              <SlidersHorizontal size={14} className="text-muted-foreground" />
              <div>
                <p className="text-sm font-semibold text-foreground leading-tight">Filter scope</p>
                <p className="text-[11px] text-muted-foreground leading-tight">Default for every tool call</p>
              </div>
            </div>
            {totalSelected > 0 && (
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation()
                  onScopeChange({ ...EMPTY_SCOPE })
                }}
                className="flex items-center gap-1 rounded-full px-2 py-1 text-[11px] font-medium text-muted-foreground hover:bg-white/60 hover:text-foreground transition"
                title="Clear all selections"
              >
                <RotateCcw size={11} />
                Clear all
              </button>
            )}
          </div>

          {/* Dimension lists — all 5 always rendered */}
          <div className="max-h-[min(50vh,420px)] overflow-y-auto p-3 space-y-3">
            {DIMENSIONS.map((dim) => {
              const opts = optionLists[dim.key]
              const selected = (scope[dim.key] as Array<string | number> | undefined) ?? []
              const selectedCount = selected.length
              return (
                <div key={dim.key}>
                  <div className="flex items-center justify-between px-1 pb-1.5">
                    <p className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
                      {dim.label}
                    </p>
                    {selectedCount > 0 && (
                      <span className="rounded-full bg-[var(--brand-gold)]/15 px-1.5 py-0.5 text-[10px] font-semibold text-[var(--brand-burgundy)]">
                        {selectedCount}
                      </span>
                    )}
                  </div>
                  {opts.length === 0 ? (
                    <p className="px-1 text-xs italic text-muted-foreground">No options available</p>
                  ) : (
                    <div className="flex flex-wrap gap-1">
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
                              'flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-medium transition-all duration-150',
                              isSelected
                                ? 'bg-[var(--brand-gold)] text-white shadow-sm shadow-[var(--brand-gold)]/30'
                                : 'bg-white/50 text-foreground hover:bg-white/80 hover:scale-[1.02]',
                            )}
                          >
                            {isSelected && <Check size={11} strokeWidth={3} />}
                            {optionLabel(dim.key, opt)}
                          </button>
                        )
                      })}
                    </div>
                  )}
                </div>
              )
            })}
          </div>

          {/* Footer summary */}
          {totalSelected > 0 && (
            <div className="border-t border-white/40 px-4 py-2.5">
              <p className="text-[11px] text-muted-foreground">
                <span className="font-semibold text-foreground">{totalSelected}</span> filter{totalSelected > 1 ? 's' : ''} applied · affects every chart &amp; query
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  )
}

export function ScopeChips({ scope, onScopeChange }: ScopeChipsProps) {
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
      {chips.map((chip) => {
        const dimMeta = DIMENSIONS.find((d) => d.key === chip.dim)
        return (
          <button
            key={`${chip.dim}:${String(chip.value)}`}
            type="button"
            onClick={(e) => {
              e.stopPropagation()
              onScopeChange(toggleValue(scope, chip.dim, chip.value))
            }}
            className="group flex items-center gap-1 rounded-full border border-[var(--brand-gold)]/30 bg-white/70 px-2.5 py-1 text-xs font-medium text-foreground backdrop-blur-md transition-all hover:bg-white/90 hover:border-[var(--brand-gold)]/50"
            title={`Remove ${dimMeta?.label}: ${chip.label}`}
          >
            <span className="text-[9px] font-bold uppercase tracking-wider text-[var(--brand-burgundy)]">
              {dimMeta?.short}
            </span>
            <span>{chip.label}</span>
            <X size={11} className="opacity-50 group-hover:opacity-100 group-hover:text-[var(--brand-burgundy)]" />
          </button>
        )
      })}
      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation()
          onScopeChange({ ...EMPTY_SCOPE })
        }}
        className="flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-medium text-muted-foreground hover:text-[var(--brand-burgundy)] transition"
        title="Clear all filters"
      >
        <RotateCcw size={11} />
        Clear all
      </button>
    </div>
  )
}
