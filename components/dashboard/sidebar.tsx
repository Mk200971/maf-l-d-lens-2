'use client'

import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  Award,
  BookOpen,
  LayoutDashboard,
  MessageSquare,
  Target,
  Users,
} from 'lucide-react'
import { cn } from '@/lib/utils'

const nav = [
  { href: '/', label: 'Overview', icon: LayoutDashboard },
  { href: '/programs', label: 'Programs', icon: BookOpen },
  { href: '/learners', label: 'Learners & Reach', icon: Users },
  { href: '/feedback', label: 'Feedback', icon: MessageSquare },
  { href: '/eligibility', label: 'Eligibility', icon: Target },
  { href: '/extras', label: 'Quality Signals', icon: Award },
]

export function DashboardSidebar() {
  const pathname = usePathname()

  return (
    <aside className="fixed inset-y-0 left-0 z-30 hidden w-56 flex-col bg-sidebar text-sidebar-foreground md:flex">
      <div className="flex h-16 items-center gap-2.5 border-b border-sidebar-border px-5">
        <Image
          src="/logo.png"
          alt="MAF Learning Logo"
          width={32}
          height={32}
          className="rounded-md"
          priority
        />
        <div className="flex flex-col">
          <span className="text-sm font-semibold text-white">MAF Learning</span>
          <span className="text-[11px] tracking-wide text-sidebar-foreground/70">
            L&amp;D DASHBOARD
          </span>
        </div>
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
                active
                  ? 'bg-sidebar-primary font-medium text-sidebar-primary-foreground'
                  : 'text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground',
              )}
            >
              <item.icon className="size-4" aria-hidden="true" />
              {item.label}
            </Link>
          )
        })}
      </nav>
      <div className="border-t border-sidebar-border p-4">
        <p className="text-[11px] leading-relaxed text-sidebar-foreground/60">
          Data: Learning Hours, Feedback, Eligibility &amp; Extras contracts
        </p>
      </div>
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
