'use client'

import { createContext, useCallback, useContext, useMemo, useState } from 'react'
import type { FilterState } from './types'
import { emptyFilters } from './aggregate'

interface FiltersContextValue {
  filters: FilterState
  setFilters: (f: FilterState) => void
  toggle: (key: 'years' | 'bus' | 'countries' | 'roles' | 'programs', value: string | number) => void
  setMonthRange: (range: [string, string] | null) => void
  reset: () => void
  activeCount: number
}

const FiltersContext = createContext<FiltersContextValue | null>(null)

export function FiltersProvider({ children }: { children: React.ReactNode }) {
  const [filters, setFilters] = useState<FilterState>(emptyFilters)

  const toggle = useCallback(
    (key: 'years' | 'bus' | 'countries' | 'roles' | 'programs', value: string | number) => {
      setFilters((prev) => {
        const list = prev[key] as (string | number)[]
        const next = list.includes(value) ? list.filter((v) => v !== value) : [...list, value]
        return { ...prev, [key]: next }
      })
    },
    [],
  )

  const setMonthRange = useCallback((range: [string, string] | null) => {
    setFilters((prev) => ({ ...prev, monthRange: range }))
  }, [])

  const reset = useCallback(() => setFilters(emptyFilters), [])

  const activeCount = useMemo(
    () =>
      filters.years.length +
      filters.bus.length +
      filters.countries.length +
      filters.roles.length +
      filters.programs.length +
      (filters.monthRange ? 1 : 0),
    [filters],
  )

  const value = useMemo(
    () => ({ filters, setFilters, toggle, setMonthRange, reset, activeCount }),
    [filters, toggle, setMonthRange, reset, activeCount],
  )

  return <FiltersContext.Provider value={value}>{children}</FiltersContext.Provider>
}

export function useFilters() {
  const ctx = useContext(FiltersContext)
  if (!ctx) throw new Error('useFilters must be used within FiltersProvider')
  return ctx
}
