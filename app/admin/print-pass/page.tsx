"use client"

import { useRef } from "react"
import { MainLayout } from "@/components/layout/main-layout"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Download, Printer } from "lucide-react"
import Link from "next/link"
import { MascotIcon } from "@/components/ui/mascot-icon"

export default function PrintPassPage() {
  const printRef = useRef<HTMLDivElement>(null)

  // Mock user data
  const user = {
    name: "Mazhitov Jafar",
    email: "admin@admin.school.edu",
    role: "admin" as const,
    avatar: "/placeholder.svg?height=40&width=40",
  }

  // Mock student data
  const studentData = {
    id: "S12345",
    name: "Mazhitov Jafar",
    class: "12A",
    date: "April 5, 2025",
    time: "8:32 AM",
    reason: "Bus delay",
  }

  const handlePrint = () => {
    if (printRef.current) {
      const printContents = printRef.current.innerHTML
      const originalContents = document.body.innerHTML

      document.body.innerHTML = printContents
      window.print()
      document.body.innerHTML = originalContents

      // Reload the page to restore React functionality
      window.location.reload()
    }
  }

  return (
    <MainLayout user={user}>
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold">Late Pass</h1>
        <div className="flex gap-2">
          <Button variant="outline" onClick={handlePrint} className="gap-2">
            <Printer className="h-4 w-4" />
            Print
          </Button>
          <Button variant="outline" className="gap-2">
            <Download className="h-4 w-4" />
            Download PDF
          </Button>
        </div>
      </div>

      <Card className="mx-auto max-w-md overflow-hidden">
        <CardHeader className="bg-secondary/30">
          <CardTitle>Late Pass Preview</CardTitle>
          <CardDescription>Review before printing</CardDescription>
        </CardHeader>
        <CardContent className="p-6">
          <div ref={printRef} className="rounded-xl border-2 border-primary p-6">
            <div className="mb-6 text-center">
              <div className="mx-auto flex h-16 w-16 items-center justify-center">
                <MascotIcon className="h-16 w-16" />
              </div>
              <h2 className="mb-1 text-2xl font-bold text-primary">LATE PASS</h2>
              <p className="text-sm text-muted-foreground">Central High School</p>
            </div>

            <div className="mb-6 flex items-center justify-center">
              <Avatar className="h-20 w-20 border-4 border-primary/20">
                <AvatarImage src="/placeholder.svg?height=80&width=80" alt={studentData.name} />
                <AvatarFallback className="bg-primary/10 text-primary text-xl">
                  {studentData.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>
            </div>

            <div className="mb-6 space-y-3">
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <p className="text-xs text-muted-foreground">Student Name</p>
                  <p className="font-medium">{studentData.name}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Student ID</p>
                  <p className="font-medium">{studentData.id}</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <p className="text-xs text-muted-foreground">Class</p>
                  <p className="font-medium">{studentData.class}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Date</p>
                  <p className="font-medium">{studentData.date}</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <p className="text-xs text-muted-foreground">Arrival Time</p>
                  <p className="font-medium">{studentData.time}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Reason</p>
                  <p className="font-medium">{studentData.reason}</p>
                </div>
              </div>
            </div>

            <div className="mb-6 rounded-lg border border-dashed border-primary/30 bg-primary/5 p-3 text-center">
              <p className="text-sm">This student is authorized to enter class.</p>
              <p className="text-sm">Please accept this late pass.</p>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-muted-foreground">Issued By</p>
                <p className="font-medium">SmartAttend System</p>
              </div>
              <div className="text-right">
                <p className="text-xs text-muted-foreground">Issue Time</p>
                <p className="font-medium">{studentData.time}</p>
              </div>
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between border-t p-4">
          <Button variant="outline" asChild>
            <Link href="/admin/dashboard">Cancel</Link>
          </Button>
          <Button onClick={handlePrint}>Print Pass</Button>
        </CardFooter>
      </Card>
    </MainLayout>
  )
}

