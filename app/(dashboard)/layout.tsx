import { Suspense } from 'react'
import { FilterBar } from '@/components/dashboard/filter-bar'
import { DashboardSidebar, MobileNav } from '@/components/dashboard/sidebar'
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
        <DashboardSidebar />
        <div className="flex min-h-svh flex-col pb-16 md:pb-0 md:pl-56">
          <FilterBar />
          <main className="flex flex-1 flex-col gap-6 p-4 md:p-6">
            <Suspense fallback={<DashboardPageSkeleton />}>
              {children}
            </Suspense>
          </main>
        </div>
        <MobileNav />
      </div>
    </FiltersProvider>
  )
}
