import { Suspense } from 'react'
import { FilterBar } from '@/components/dashboard/filter-bar'
import { DashboardSidebar, MobileNav } from '@/components/dashboard/sidebar'
import { DashboardPageSkeleton } from '@/components/dashboard/page-loading'
import { FiltersProvider } from '@/lib/filters-context'
import { SidebarProvider } from '@/lib/sidebar-context'
import { SidebarLayoutWrapper } from '@/components/dashboard/sidebar-layout'

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <FiltersProvider>
      <SidebarProvider>
        <div className="min-h-svh">
          <DashboardSidebar />
          <SidebarLayoutWrapper>
            <FilterBar />
            <main className="flex flex-1 flex-col gap-6 p-4 md:p-8 lg:p-10">
              <Suspense fallback={<DashboardPageSkeleton />}>
                {children}
              </Suspense>
            </main>
          </SidebarLayoutWrapper>
          <MobileNav />
        </div>
      </SidebarProvider>
    </FiltersProvider>
  )
}
