"use client"

import { type ReactNode, useState } from "react"
import Link from "next/link"
import { Bell, Home, Menu, User, Users, QrCode, BarChart3, Settings, GraduationCap, Trophy, Map, UserCircle, ShoppingBasket } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { usePathname } from "next/navigation"
import { SidebarNav } from "@/components/layout/sidebar-nav"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { MascotIcon } from "@/components/ui/mascot-icon"

interface MainLayoutProps {
  children: ReactNode
  user: {
    name: string
    email: string
    role: "student" | "admin"
    avatar?: string
  }
}

export function MainLayout({ children, user }: MainLayoutProps) {
  const isAdmin = user.role === "admin"
  const pathname = usePathname()
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false)

  const studentNavItems = [
    {
      title: "Dashboard",
      href: "/student/dashboard",
      icon: Home,
    },
    {
      title: "Attendance",
      href: "/student/attendance",
      icon: QrCode,
    },
    {
      title: "Achievements",
      href: "/student/achievements",
      icon: Trophy,
    },
    {
      title: "Shop",
      href: "/student/shop",
      icon: ShoppingBasket,
    },
    {
      title: "AI Assistant",
      href: "https://aishack-ai.vercel.app/",
      icon: Map,
    },
    {
      title: "Profile",
      href: "/student/profile",
      icon: UserCircle,
    },
  ]

  const adminNavItems = [
    {
      title: "Dashboard",
      href: "/admin/dashboard",
      icon: Home,
    },
    {
      title: "Students",
      href: "/admin/students",
      icon: GraduationCap,
    },
    {
      title: "Scanner",
      href: "/admin/scanner",
      icon: QrCode,
    },
    {
      title: "Reports",
      href: "/admin/reports",
      icon: BarChart3,
    },
    {
      title: "Settings",
      href: "/admin/settings",
      icon: Settings,
    },
  ]

  return (
    <div className="flex min-h-screen flex-col bg-[#f7f7f7]">
      <header className="border-b bg-white shadow-sm fixed top-0 left-0 right-0 z-50">
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          <div className="flex items-center gap-2">
            <Sheet open={isMobileNavOpen} onOpenChange={setIsMobileNavOpen}>
              <SheetTrigger asChild className="md:hidden">
                <Button variant="ghost" size="icon" className="mr-2">
                  <Menu className="h-5 w-5" />
                  <span className="sr-only">Toggle menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-64 p-0">
                <div className="flex h-16 items-center border-b px-4">
                  <Link href="/" className="flex items-center gap-2" onClick={() => setIsMobileNavOpen(false)}>
                    <MascotIcon className="h-8 w-8" />
                    <span className="text-xl font-bold">Qatysu</span>
                  </Link>
                </div>
                <SidebarNav
                  items={isAdmin ? adminNavItems : studentNavItems}
                  onItemClick={() => setIsMobileNavOpen(false)}
                />
              </SheetContent>
            </Sheet>
            <Link href="/" className="flex items-center gap-2">
              <MascotIcon className="h-8 w-8" />
              <span className="text-xl font-bold">Qatysu</span>
            </Link>
            {isAdmin && (
              <Badge variant="outline" className="bg-secondary text-secondary-foreground">
                Admin
              </Badge>
            )}
          </div>
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="h-5 w-5" />
              <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-xs text-white">
                3
              </span>
            </Button>
            <div className="flex items-center gap-2">
              <Avatar className="border-2 border-primary">
                <AvatarImage src={"/"} alt={user.name} />
                <AvatarFallback className="bg-primary text-white">
                  {user.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>
              <span className="hidden font-medium sm:inline-block">{user.name}</span>
            </div>
          </div>
        </div>
      </header>
      <div className="flex flex-1 pt-16">
        <aside className="hidden w-64 border-r bg-white md:block fixed top-16 left-0 h-[calc(100vh-4rem)] overflow-y-auto">
          <SidebarNav items={isAdmin ? adminNavItems : studentNavItems} />
        </aside>
        <main className="flex-1 bg-[#f7f7f7] md:ml-64">
          <div className="container mx-auto p-4 md:p-6">{children}</div>
        </main>
      </div>
    </div>
  )
}

