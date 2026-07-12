'use client'

import { useSidebar } from '@/lib/sidebar-context'

export function SidebarLayoutWrapper({ children }: { children: React.ReactNode }) {
  const { isCollapsed } = useSidebar()

  return (
    <div 
      className={`flex min-h-svh flex-col transition-all duration-300 ease-in-out ${
        isCollapsed ? 'md:pl-20' : 'md:pl-56'
      } pb-16 md:pb-0`}
    >
      {children}
    </div>
  )
}
