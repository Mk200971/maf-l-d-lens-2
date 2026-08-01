'use client'

import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  Award,
  BookOpen,
  GraduationCap,
  LayoutDashboard,
  MessageSquare,
  Target,
  Users,
  ChevronLeft,
  ChevronRight,
  Sparkles,
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { useSidebar } from '@/lib/sidebar-context'

const nav = [
  { href: '/', label: 'Overview', icon: LayoutDashboard },
  { href: '/skillup', label: 'SkillUP', icon: GraduationCap },
  { href: '/programs', label: 'Programs', icon: BookOpen },
  { href: '/learners', label: 'Learners & Reach', icon: Users },
  { href: '/feedback', label: 'Feedback', icon: MessageSquare },
  { href: '/eligibility', label: 'Eligibility', icon: Target },
  { href: '/extras', label: 'Quality Signals', icon: Award },
  { href: '/metrics-ai', label: 'Metrics AI', icon: Sparkles },
]

export function DashboardSidebar() {
  const pathname = usePathname()
  const { isCollapsed, toggleSidebar } = useSidebar()

  return (
    <aside className={cn(
      'fixed inset-y-0 left-0 z-30 hidden flex-col bg-sidebar text-sidebar-foreground transition-all duration-300 ease-in-out md:flex',
      isCollapsed ? 'w-20' : 'w-56'
    )}>
      <div className="flex h-16 items-center justify-between border-b border-sidebar-border px-3">
        <div className={cn('flex items-center gap-2.5', isCollapsed && 'justify-center w-full')}>
          <Image
            src="/logo.png"
            alt="MAF Learning Logo"
            width={32}
            height={32}
            className="rounded-md"
            priority
          />
          {!isCollapsed && (
            <div className="flex flex-col">
              <span className="text-sm font-semibold text-white">MAFGS L&D LENS</span>
              <span className="text-[11px] tracking-wide text-sidebar-foreground/70">
                DBU &amp; AMBU L&amp;D DASHBOARD
              </span>
            </div>
          )}
        </div>
        {!isCollapsed && (
          <button
            onClick={toggleSidebar}
            className="rounded-md p-1 hover:bg-sidebar-accent transition-colors"
            aria-label="Collapse sidebar"
            title="Collapse sidebar (Ctrl+B)"
          >
            <ChevronLeft className="size-4" />
          </button>
        )}
      </div>
      <nav className="flex flex-1 flex-col gap-1 p-3" aria-label="Main navigation">
        {nav.map((item) => {
          const active = pathname === item.href
          return (
            <Link
              key={item.href}
              href={item.href}
              aria-current={active ? 'page' : undefined}
              className={cn(
                'flex items-center gap-3 rounded-md px-3 py-2 text-sm transition-colors',
                isCollapsed && 'justify-center px-2',
                active
                  ? 'bg-sidebar-primary font-medium text-sidebar-primary-foreground'
                  : 'text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground',
              )}
              title={isCollapsed ? item.label : undefined}
            >
              <item.icon className="size-4 flex-shrink-0" aria-hidden="true" />
              {!isCollapsed && item.label}
            </Link>
          )
        })}
      </nav>
      {!isCollapsed && (
        <>
          <button
            onClick={toggleSidebar}
            className="m-3 flex items-center justify-center gap-2 rounded-md border border-sidebar-border bg-sidebar-accent/50 p-2 text-xs transition-colors hover:bg-sidebar-accent"
            aria-label="Collapse sidebar"
          >
            <ChevronLeft className="size-3" />
            Collapse
          </button>
          <div className="border-t border-sidebar-border p-4">
            <p className="text-[11px] leading-relaxed text-sidebar-foreground/60">
              Data: Learning Hours, Feedback, Eligibility &amp; Extras contracts
            </p>
          </div>
        </>
      )}
      {isCollapsed && (
        <button
          onClick={toggleSidebar}
          className="m-2 flex items-center justify-center rounded-md p-2 hover:bg-sidebar-accent transition-colors"
          aria-label="Expand sidebar"
          title="Expand sidebar"
        >
          <ChevronRight className="size-4" />
        </button>
      )}
    </aside>
  )
}

export function MobileNav() {
  const pathname = usePathname()
  return (
    <nav
      className="fixed inset-x-0 bottom-0 z-30 flex justify-around border-t border-border bg-sidebar py-2 md:hidden"
      aria-label="Main navigation"
    >
      {nav.map((item) => {
        const active = pathname === item.href
        return (
          <Link
            key={item.href}
            href={item.href}
            aria-current={active ? 'page' : undefined}
            className={cn(
              'flex flex-col items-center gap-0.5 rounded-md px-2 py-1 text-[10px]',
              active ? 'text-sidebar-primary' : 'text-sidebar-foreground/70',
            )}
          >
            <item.icon className="size-5" aria-hidden="true" />
            <span className="sr-only sm:not-sr-only">{item.label}</span>
          </Link>
        )
      })}
    </nav>
  )
}
