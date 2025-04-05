"use client"

import { type ReactNode, useState, useEffect } from "react"
import Link from "next/link"
import { Bell, Home, Menu, User, Users, QrCode, BarChart3, Settings, GraduationCap, Trophy, Map, UserCircle, ShoppingBag, LogOut } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { usePathname, useRouter } from "next/navigation"
import { SidebarNav } from "@/components/layout/sidebar-nav"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { MascotIcon } from "@/components/ui/mascot-icon"
import { useToast } from "@/components/ui/use-toast"

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
  const router = useRouter()
  const { toast } = useToast()
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false)
  const [currentUser, setCurrentUser] = useState<{
    name: string;
    email: string;
    role: "student" | "admin";
  } | null>(null)

  useEffect(() => {
    // Check if user is logged in
    const userRole = localStorage.getItem('userRole')
    const userEmail = localStorage.getItem('userEmail')
    const userName = localStorage.getItem('userName')
    
    if (!userRole || !userEmail) {
      // Redirect to login if not logged in
      router.push('/login')
      return
    }
    
    // Set current user data from localStorage
    let userFullName = ""
    if (userName === "kerey") {
      userFullName = "Berdyshev Kerey"
    } else if (userName === "jafar") {
      userFullName = "Mazhitov Jafar"
    }

    setCurrentUser({
      name: userFullName || 'User',
      email: userEmail,
      role: userRole as "student" | "admin"
    })

    // Check if user is authorized for this route
    const isAdminRoute = pathname.startsWith('/admin')
    const isStudentRoute = pathname.startsWith('/student')

    if (isAdminRoute && userRole !== 'admin') {
      toast({
        title: "Access Denied",
        description: "You don't have permission to access this page",
        variant: "destructive",
      })
      router.push('/login')
    } else if (isStudentRoute && userRole !== 'student') {
      // Don't allow admins to view student pages
      toast({
        title: "Access Denied",
        description: "You don't have permission to access this page",
        variant: "destructive",
      })
      router.push('/admin/dashboard')
    }
  }, [pathname, router, toast])

  const handleLogout = () => {
    // Clear user data from localStorage
    localStorage.removeItem('userRole')
    localStorage.removeItem('userEmail')
    localStorage.removeItem('userName')
    
    // Redirect to login page
    router.push('/login')
  }

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
      icon: ShoppingBag,
    },
    {
      title: "AI Assistant",
      href: "/student/ai",
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

  // Choose navigation items based on user role
  const navItems = isAdmin ? adminNavItems : studentNavItems

  // Added logout item to both navigation menus
  const logoutItem = {
    title: "Logout",
    href: "#",
    icon: LogOut,
    onClick: handleLogout
  }

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
                  items={[...navItems, logoutItem]}
                  onItemClick={(item) => {
                    // Close mobile nav when an item is clicked
                    setIsMobileNavOpen(false)
                  }}
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
                <AvatarImage src={"/"} alt={currentUser?.name || user.name} />
                <AvatarFallback className="bg-primary text-white">
                  {(currentUser?.name || user.name)
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>
              <div className="hidden sm:block">
                <span className="font-medium">{currentUser?.name || user.name}</span>
              </div>
            </div>
          </div>
        </div>
      </header>
      <div className="flex flex-1 pt-16">
        <aside className="hidden w-64 border-r bg-white md:block fixed top-16 left-0 h-[calc(100vh-4rem)] overflow-y-auto">
          <SidebarNav 
            items={[...navItems, logoutItem]} 
            onItemClick={() => {
              // No action needed for desktop nav
            }} 
          />
        </aside>
        <main className="flex-1 bg-[#f7f7f7] md:ml-64">
          <div className="container mx-auto p-4 md:p-6">{children}</div>
        </main>
      </div>
    </div>
  )
}

