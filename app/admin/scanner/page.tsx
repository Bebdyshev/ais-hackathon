"use client"

import { useRouter } from "next/navigation"
import { MainLayout } from "@/components/layout/main-layout"
import { ScannerInterface } from "@/components/scanner/scanner-interface"

export default function ScannerPage() {
  const router = useRouter()

  // Mock user data
  const user = {
    name: "Admin User",
    email: "admin@admin.school.edu",
    role: "admin" as const,
    avatar: "/placeholder.svg?height=40&width=40",
  }

  const handleMarkAttendance = (student: any, status: "present" | "late") => {
    // In a real app, this would update the database
    alert(`Marked ${student.name} as ${status}`)

    // If student is late, navigate to print pass page
    if (status === "late") {
      router.push("/admin/print-pass")
    }
  }

  return (
    <MainLayout user={user}>
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Attendance Scanner</h1>
        <p className="text-muted-foreground">Scan student face or ID card to mark attendance</p>
      </div>

      <ScannerInterface onMarkAttendance={handleMarkAttendance} />
    </MainLayout>
  )
}

