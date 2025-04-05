"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import type { LucideIcon } from "lucide-react"
import type { MouseEvent } from "react"

interface NavItem {
  title: string
  href: string
  icon: LucideIcon
  onClick?: () => void
}

interface SidebarNavProps {
  items: NavItem[]
  onItemClick?: (item: NavItem) => void
}

export function SidebarNav({ items, onItemClick }: SidebarNavProps) {
  const pathname = usePathname()

  // Handler for items with custom action
  const handleItemWithAction = (item: NavItem) => {
    if (item.onClick) {
      item.onClick()
    }
    
    if (onItemClick) {
      onItemClick(item)
    }
  }

  return (
    <nav className="flex flex-col gap-2 p-4">
      {items.map((item) => {
        const Icon = item.icon
        const isActive = pathname === item.href

        // For items with custom onClick handlers, render a button
        if (item.onClick) {
          return (
            <div key={item.title + item.href}>
              <Button
                variant={isActive ? "default" : "ghost"}
                className={`w-full justify-start ${isActive ? "bg-primary text-white" : "hover:bg-secondary hover:text-secondary-foreground"}`}
                onClick={() => handleItemWithAction(item)}
              >
                <Icon className="mr-2 h-4 w-4" />
                {item.title}
              </Button>
            </div>
          )
        }
        
        // For regular navigation items, render a Link
        return (
          <div key={item.title + item.href}>
            <Link 
              href={item.href} 
              onClick={(e: MouseEvent<HTMLAnchorElement>) => {
                if (onItemClick) {
                  // Call with the item
                  onItemClick(item)
                }
              }}
            >
              <Button
                variant={isActive ? "default" : "ghost"}
                className={`w-full justify-start ${isActive ? "bg-primary text-white" : "hover:bg-secondary hover:text-secondary-foreground"}`}
              >
                <Icon className="mr-2 h-4 w-4" />
                {item.title}
              </Button>
            </Link>
          </div>
        )
      })}
    </nav>
  )
}

