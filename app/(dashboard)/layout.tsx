import { Suspense } from 'react'
import { FilterBar } from '@/components/dashboard/filter-bar'
import { PillNav } from '@/components/dashboard/pill-nav'
import { DashboardPageSkeleton } from '@/components/dashboard/page-loading'
import { FiltersProvider } from '@/lib/filters-context'

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <FiltersProvider>
      <div className="min-h-svh">
        <PillNav />
        <FilterBar />
        <main className="flex flex-1 flex-col gap-6 p-4 md:p-8 lg:p-10">
          <Suspense fallback={<DashboardPageSkeleton />}>
            {children}
          </Suspense>
        </main>
      </div>
    </FiltersProvider>
  )
}
