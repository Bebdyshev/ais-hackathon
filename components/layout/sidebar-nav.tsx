"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { LogOut } from "lucide-react"
import type { LucideIcon } from "lucide-react"

interface SidebarNavProps {
  items: {
    title: string
    href: string
    icon: LucideIcon
  }[]
  onItemClick?: () => void
}

export function SidebarNav({ items, onItemClick }: SidebarNavProps) {
  const pathname = usePathname()

  return (
    <nav className="flex flex-col gap-2 p-4">
      {items.map((item) => {
        const Icon = item.icon
        const isActive = pathname === item.href

        return (
          <Link key={item.href} href={item.href} onClick={onItemClick}>
            <Button
              variant={isActive ? "default" : "ghost"}
              className={`w-full justify-start ${isActive ? "bg-primary text-white" : "hover:bg-secondary hover:text-secondary-foreground"}`}
            >
              <Icon className="mr-2 h-4 w-4" />
              {item.title}
            </Button>
          </Link>
        )
      })}
      <div className="mt-auto pt-4">
        <Link href="/" onClick={onItemClick}>
          <Button
            variant="outline"
            className="w-full justify-start border-destructive text-destructive hover:bg-destructive/10 hover:text-destructive"
          >
            <LogOut className="mr-2 h-4 w-4" />
            Logout
          </Button>
        </Link>
      </div>
    </nav>
  )
}

