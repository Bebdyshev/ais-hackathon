"use client"

import { useState } from "react"
import { Download, Search, TrendingUp, Users, Clock, Award, Scan } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { MainLayout } from "@/components/layout/main-layout"
import { StatsCard } from "@/components/attendance/stats-card"
import { MascotIcon } from "@/components/ui/mascot-icon"
import Link from "next/link"
import axiosInstance from "@/utils/instance"
import { useToast } from "@/components/ui/use-toast"
import * as XLSX from 'xlsx'

export default function AdminDashboard() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedClass, setSelectedClass] = useState("all")
  const [isLoading, setIsLoading] = useState(false)
  const { toast } = useToast()

  // Mock user data
  const user = {
    name: "Mazhitov Jafar",
    email: "admin@admin.school.edu",
    role: "admin" as const,
    avatar: "/",
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

  const handleScanRequest = async () => {
    try {
      setIsLoading(true)
      const response = await axiosInstance.post('/', {
        timestamp: new Date().toISOString(),
        location: 'main_entrance',
        type: 'manual_scan'
      })
      
      toast({
        title: "Scan Successful",
        description: "Attendance has been recorded",
        variant: "default",
      })
    } catch (error) {
      toast({
        title: "Scan Failed",
        description: "Please try again",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleDownloadReport = async () => {
    try {
      setIsLoading(true)
      
      // Create worksheet
      const ws = XLSX.utils.json_to_sheet(
        filteredStudents.map(student => ({
          'Student ID': student.id,
          'Name': student.name,
          'Class': student.class,
          'Status': student.status,
          'Time': student.time,
          'Streak': student.streak,
          'Points': student.points
        }))
      )

      // Set column widths
      const wscols = [
        {wch: 10}, // Student ID
        {wch: 20}, // Name
        {wch: 8},  // Class
        {wch: 10}, // Status
        {wch: 10}, // Time
        {wch: 8},  // Streak
        {wch: 8}   // Points
      ]
      ws['!cols'] = wscols

      // Create workbook
      const wb = XLSX.utils.book_new()
      XLSX.utils.book_append_sheet(wb, ws, "Attendance Report")

      // Generate Excel file
      const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' })
      
      // Create blob and download
      const blob = new Blob([excelBuffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' })
      const url = window.URL.createObjectURL(blob)
      const link = document.createElement('a')
      link.href = url
      link.setAttribute('download', `attendance_report_${new Date().toISOString().split('T')[0]}.xlsx`)
      document.body.appendChild(link)
      link.click()
      link.remove()

      toast({
        title: "Report Downloaded",
        description: "Attendance report has been downloaded successfully",
        variant: "default",
      })
    } catch (error) {
      toast({
        title: "Download Failed",
        description: "Failed to download the attendance report",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
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
          <div className="flex flex-col items-center gap-4">
            <Button 
              size="lg" 
              className="gap-2" 
              onClick={handleScanRequest}
              disabled={isLoading}
            >
              <Scan className="h-5 w-5" />
              {isLoading ? "Scanning..." : "Start Scan"}
            </Button>
            <p className="text-sm text-muted-foreground">
              Click to manually record attendance
            </p>
          </div>
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
          <Button variant="outline" size="sm" className="gap-2" onClick={handleDownloadReport}>
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
                        <Avatar className={`h-8 w-8 border-2 ${
                          student.status === "Present" 
                            ? "border-primary/20" 
                            : student.status === "Late"
                              ? "border-yellow-500/20"
                              : "border-red-500/20"
                        }`}>
                          <AvatarImage src="/" alt={student.name} />
                          <AvatarFallback className={`${
                            student.status === "Present"
                              ? "bg-primary/10 text-primary"
                              : student.status === "Late"
                                ? "bg-yellow-500/10 text-yellow-600"
                                : "bg-red-500/10 text-red-600"
                          }`}>
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

