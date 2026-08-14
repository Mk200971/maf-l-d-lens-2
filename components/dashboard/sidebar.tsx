'use client'

import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  Award,
  BookOpen,
  GraduationCap,
  LayoutDashboard,
  Layers,
  MessageSquare,
  ShieldCheck,
  Target,
  Users,
  ChevronLeft,
  ChevronRight,
  Sparkles,
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { useSidebar } from '@/lib/sidebar-context'

const navSections = [
  {
    label: 'Programmes',
    items: [
      { href: '/', label: 'Programme Overview', icon: LayoutDashboard },
      { href: '/programs', label: 'Programs', icon: BookOpen },
      { href: '/learners', label: 'Learners & Reach', icon: Users },
      { href: '/feedback', label: 'Feedback', icon: MessageSquare },
      { href: '/eligibility', label: 'Eligibility', icon: Target },
      { href: '/extras', label: 'Quality Signals', icon: Award },
    ],
  },
  {
    label: 'Enterprise Learning',
    items: [
      { href: '/all-learnings', label: 'All Learning Activity', icon: Layers },
      { href: '/mandatory', label: 'Mandatory Learnings', icon: ShieldCheck },
      { href: '/skillup', label: 'SkillUp', icon: GraduationCap },
    ],
  },
  {
    label: 'Tools',
    items: [{ href: '/metrics-ai', label: 'Metrics AI', icon: Sparkles }],
  },
]

const nav = navSections.flatMap((section) => section.items)

export function DashboardSidebar() {
  const pathname = usePathname()
  const { isCollapsed, toggleSidebar } = useSidebar()

  return (
    <aside className={cn(
      'glass-dark fixed inset-y-0 left-0 z-30 hidden flex-col text-sidebar-foreground transition-all duration-300 ease-in-out md:flex',
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
              <span className="text-sm font-semibold text-white">MAF L&D LENS</span>
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
      <nav className="flex flex-1 flex-col gap-4 p-3" aria-label="Main navigation">
        {navSections.map((section, sectionIndex) => (
          <div
            key={section.label}
            className={cn(
              'flex flex-col gap-1',
              isCollapsed && sectionIndex > 0 && 'border-t border-sidebar-border pt-3',
            )}
          >
            {!isCollapsed && (
              <span className="px-3 pb-1 text-[11px] font-medium uppercase tracking-wide text-slate-500">
                {section.label}
              </span>
            )}
            {section.items.map((item) => {
              const active = pathname === item.href
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  aria-current={active ? 'page' : undefined}
                  className={cn(
                    'flex items-center gap-3 rounded-md px-3 py-2 text-sm transition-all duration-200',
                    isCollapsed && 'justify-center px-2',
                    active
                      ? 'glass-pill font-medium text-white'
                      : 'text-sidebar-foreground hover:bg-sidebar-accent hover:text-white hover:-translate-y-px',
                  )}
                  title={isCollapsed ? item.label : undefined}
                >
                  <item.icon className="size-4 flex-shrink-0" aria-hidden="true" />
                  {!isCollapsed && item.label}
                </Link>
              )
            })}
          </div>
        ))}
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
      className="glass-dark fixed inset-x-0 bottom-0 z-30 flex justify-around overflow-x-auto py-2 md:hidden"
      aria-label="Main navigation"
    >
      {navSections.map((section, sectionIndex) => (
        <div
          key={section.label}
          className={cn(
            'flex items-center justify-around',
            sectionIndex > 0 && 'ml-1 border-l border-sidebar-border pl-1',
          )}
        >
          {section.items.map((item) => {
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
        </div>
      ))}
    </nav>
  )
}
