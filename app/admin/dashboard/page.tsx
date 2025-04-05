"use client"

import { useState } from "react"
import { Download, Search, TrendingUp, Users, Clock, Award } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { MainLayout } from "@/components/layout/main-layout"
import { StatsCard } from "@/components/attendance/stats-card"
import { ScannerInterface } from "@/components/scanner/scanner-interface"
import { MascotIcon } from "@/components/ui/mascot-icon"
import Link from "next/link"

export default function AdminDashboard() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedClass, setSelectedClass] = useState("all")

  // Mock user data
  const user = {
    name: "Admin User",
    email: "admin@admin.school.edu",
    role: "admin" as const,
    avatar: "/placeholder.svg?height=40&width=40",
  }

  // Mock student data
  const students = [
    { id: "S12345", name: "John Doe", class: "12A", status: "Present", time: "8:05 AM", streak: 5, points: 350 },
    { id: "S12346", name: "Jane Smith", class: "12A", status: "Late", time: "8:32 AM", streak: 3, points: 280 },
    { id: "S12347", name: "Michael Johnson", class: "12B", status: "Absent", time: "-", streak: 0, points: 210 },
    { id: "S12348", name: "Emily Williams", class: "12B", status: "Present", time: "7:58 AM", streak: 10, points: 520 },
    { id: "S12349", name: "Robert Brown", class: "12A", status: "Present", time: "8:01 AM", streak: 7, points: 410 },
  ]

  const filteredStudents = students.filter(
    (student) =>
      (selectedClass === "all" || student.class === selectedClass) &&
      (student.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        student.id.toLowerCase().includes(searchQuery.toLowerCase())),
  )

  const handleMarkAttendance = (student: any, status: "present" | "late") => {
    // In a real app, this would update the database
    alert(`Marked ${student.name} as ${status}`)
  }

  return (
    <MainLayout user={user}>
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold">Admin Dashboard</h1>
        <div className="flex items-center gap-2 rounded-full bg-secondary px-4 py-2 text-secondary-foreground">
          <MascotIcon className="h-5 w-5" />
          <span className="text-sm font-medium">Today: April 5, 2025</span>
        </div>
      </div>

      <div className="mb-8 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <StatsCard
          title="Total Students"
          value="256"
          icon={<Users className="h-5 w-5 text-primary" />}
          trend="up"
          trendValue="+12 this month"
        />
        <StatsCard
          title="Present Today"
          value="231"
          subtitle="(90.2%)"
          icon={<TrendingUp className="h-5 w-5 text-green-500" />}
          trend="up"
          trendValue="+2.1% vs last week"
        />
        <StatsCard
          title="Late Today"
          value="18"
          subtitle="(7.0%)"
          icon={<Clock className="h-5 w-5 text-yellow-500" />}
          trend="down"
          trendValue="-1.5% vs last week"
        />
        <StatsCard
          title="Absent Today"
          value="7"
          subtitle="(2.8%)"
          icon={<Award className="h-5 w-5 text-red-500" />}
          trend="down"
          trendValue="-0.6% vs last week"
        />
      </div>

      <Card className="mb-6 overflow-hidden">
        <CardHeader className="bg-secondary/30">
          <CardTitle className="flex items-center gap-2">
            <MascotIcon className="h-5 w-5" />
            Attendance Scanner
          </CardTitle>
          <CardDescription>Scan student ID or face to mark attendance</CardDescription>
        </CardHeader>
        <CardContent className="p-6">
          <ScannerInterface onMarkAttendance={handleMarkAttendance} />
        </CardContent>
      </Card>

      <Card className="overflow-hidden">
        <CardHeader className="flex flex-row items-center justify-between bg-secondary/30">
          <div>
            <CardTitle className="flex items-center gap-2">
              <MascotIcon className="h-5 w-5" />
              Student Attendance
            </CardTitle>
            <CardDescription>Today's attendance records</CardDescription>
          </div>
          <Button variant="outline" size="sm" className="gap-2">
            <Download className="h-4 w-4" />
            Export
          </Button>
        </CardHeader>
        <CardContent className="p-6">
          <div className="mb-4 flex flex-col gap-4 sm:flex-row">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search by name or ID..."
                className="pl-8"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Select value={selectedClass} onValueChange={setSelectedClass}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select class" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Classes</SelectItem>
                <SelectItem value="12A">Class 12A</SelectItem>
                <SelectItem value="12B">Class 12B</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full table-auto">
              <thead>
                <tr className="border-b">
                  <th className="px-4 py-3 text-left font-medium">ID</th>
                  <th className="px-4 py-3 text-left font-medium">Name</th>
                  <th className="px-4 py-3 text-left font-medium">Class</th>
                  <th className="px-4 py-3 text-left font-medium">Status</th>
                  <th className="px-4 py-3 text-left font-medium">Time</th>
                  <th className="px-4 py-3 text-left font-medium">Streak</th>
                  <th className="px-4 py-3 text-left font-medium">Points</th>
                  <th className="px-4 py-3 text-left font-medium">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredStudents.map((student, index) => (
                  <tr key={index} className="border-b">
                    <td className="px-4 py-3">{student.id}</td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <Avatar className="h-8 w-8 border-2 border-primary/20">
                          <AvatarImage src="/placeholder.svg?height=32&width=32" alt={student.name} />
                          <AvatarFallback className="bg-primary/10 text-primary">
                            {student.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        <span>{student.name}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3">{student.class}</td>
                    <td className="px-4 py-3">
                      <Badge
                        variant={
                          student.status === "Present"
                            ? "outline"
                            : student.status === "Late"
                              ? "secondary"
                              : "destructive"
                        }
                      >
                        {student.status}
                      </Badge>
                    </td>
                    <td className="px-4 py-3">
                      {student.time !== "-" && (
                        <div className="flex items-center text-sm">
                          <Clock className="mr-1 h-3 w-3" />
                          {student.time}
                        </div>
                      )}
                      {student.time === "-" && "-"}
                    </td>
                    <td className="px-4 py-3">{student.streak} days</td>
                    <td className="px-4 py-3">{student.points} XP</td>
                    <td className="px-4 py-3">
                      <div className="flex gap-2">
                        <Link href={`/admin/students/${student.id}`}>
                          <Button variant="outline" size="sm">
                            View
                          </Button>
                        </Link>
                        {student.status === "Late" && (
                          <Link href="/admin/print-pass">
                            <Button variant="outline" size="sm">
                              Print Pass
                            </Button>
                          </Link>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </MainLayout>
  )
}

