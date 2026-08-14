import { Suspense } from 'react'
import { Chrome } from '@/components/dashboard/chrome'
import { DashboardPageSkeleton } from '@/components/dashboard/page-loading'
import { FiltersProvider } from '@/lib/filters-context'

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <FiltersProvider>
      <Chrome>
        <Suspense fallback={<DashboardPageSkeleton />}>
          {children}
        </Suspense>
      </Chrome>
    </FiltersProvider>
  )
}
