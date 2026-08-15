'use client'

import { usePathname } from 'next/navigation'
import { PillNav } from '@/components/dashboard/pill-nav'
import { FilterBar } from '@/components/dashboard/filter-bar'

export function Chrome({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const isMetricsAI = pathname === '/metrics-ai'

  return (
    <div className="min-h-svh">
      <PillNav />
      {!isMetricsAI && <FilterBar />}
      <main
        className={
          isMetricsAI
            ? 'h-[calc(100svh-var(--nav-h))] overflow-hidden p-0'
            : 'flex flex-1 flex-col gap-6 p-4 md:p-8 lg:p-10'
        }
      >
        {children}
      </main>
    </div>
  )
}
