"use client"

import { useState, useEffect } from "react"
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

interface Student {
  id: string
  name: string
  email: string
  class: string
  curator: string
  status: string
  time: string
  streak: number
  points: number
}

interface AttendanceRecord {
  name: string
  time: string
  date: string
}

interface AttendanceResponse {
  status: string
  attendance_data: AttendanceRecord[]
}

interface StudentsResponse {
  status: string
  students: Student[]
}

export default function AdminDashboard() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedClass, setSelectedClass] = useState("all")
  const [isLoading, setIsLoading] = useState(false)
  const [attendanceData, setAttendanceData] = useState<Student[]>([])
  const [students, setStudents] = useState<Student[]>([])
  const { toast } = useToast()

  // Mock user data
  const user = {
    name: "Mazhitov Jafar",
    email: "admin@admin.school.edu",
    role: "admin" as const,
    avatar: "/",
  }

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const response = await axiosInstance.get<StudentsResponse>('/students')
        if (response.data.status === "success") {
          setStudents(response.data.students)
        }
      } catch (error) {
        toast({
          title: "Error",
          description: "Failed to fetch students data",
          variant: "destructive",
        })
      }
    }

    fetchStudents()
  }, [])

  useEffect(() => {
    const fetchAttendanceData = async () => {
      try {
        setIsLoading(true)
        const response = await axiosInstance.post<AttendanceResponse>('/data', {
          date: new Date().toISOString().split('T')[0]
        })

        if (response.data.status === "success") {
          // Process attendance data to get latest record for each student
          const latestRecords = response.data.attendance_data.reduce((acc: Record<string, Student>, record: AttendanceRecord) => {
            const student = students.find(s => s.name === record.name)
            if (student) {
              acc[student.id] = {
                ...student,
                time: record.time
              }
            }
            return acc
          }, {})

          setAttendanceData(Object.values(latestRecords))
        }
      } catch (error) {
        toast({
          title: "Error",
          description: "Failed to fetch attendance data",
          variant: "destructive",
        })
      } finally {
        setIsLoading(false)
      }
    }

    if (students.length > 0) {
      fetchAttendanceData()
    }
  }, [students])

  const filteredStudents = attendanceData.filter(
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
          <Button 
            variant="outline" 
            size="sm" 
            className="gap-2" 
            onClick={handleDownloadReport}
            disabled={isLoading}
          >
            <Download className="h-4 w-4" />
            {isLoading ? "Exporting..." : "Export"}
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
                  <th className="px-4 py-3 text-left font-medium">Email</th>
                  <th className="px-4 py-3 text-left font-medium">Class</th>
                  <th className="px-4 py-3 text-left font-medium">Curator</th>
                  <th className="px-4 py-3 text-left font-medium">Time</th>
                  <th className="px-4 py-3 text-left font-medium">Streak</th>
                  <th className="px-4 py-3 text-left font-medium">Points</th>
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
                    <td className="px-4 py-3">{student.email}</td>
                    <td className="px-4 py-3">{student.class}</td>
                    <td className="px-4 py-3">{student.curator}</td>
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

