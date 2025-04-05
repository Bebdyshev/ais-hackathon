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

interface StudentInfo {
  id: string
  name: string
  class: string
  curator: string
}

interface AttendanceRecord {
  name: string
  time: string
  date: string
  studentInfo?: StudentInfo
  lateLessons?: string[]
}

interface AttendanceResponse {
  status: string
  attendance_data: AttendanceRecord[]
}

interface StudentsResponse {
  status: string
  students: StudentInfo[]
}

// Lesson schedule
const LESSON_SCHEDULE = [
  { start: "8:20", end: "9:00", number: 1 },
  { start: "9:10", end: "9:50", number: 2 },
  { start: "10:00", end: "10:40", number: 3 },
  { start: "10:50", end: "11:30", number: 4 },
  { start: "11:40", end: "12:20", number: 5 },
  { start: "12:30", end: "13:10", number: 6 },
  { start: "13:20", end: "14:00", number: 7 },
  { start: "14:10", end: "23:59", number: 8 }
]

const getLateLessons = (time: string): string[] => {
  const [hours, minutes] = time.split(":").map(Number)
  const arrivalTime = hours * 60 + minutes
  const lateLessons: string[] = []

  LESSON_SCHEDULE.forEach(lesson => {
    const [startHours, startMinutes] = lesson.start.split(":").map(Number)
    const lessonStartTime = startHours * 60 + startMinutes

    if (arrivalTime > lessonStartTime) {
      lateLessons.push(lesson.number.toString())
    }
  })

  return lateLessons
}

const formatDate = (dateString: string): string => {
  const date = new Date(dateString)
  const options: Intl.DateTimeFormatOptions = {
    month: 'long',
    day: 'numeric',
    year: 'numeric'
  }
  return date.toLocaleDateString('en-US', options)
}

export default function AdminDashboard() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedClass, setSelectedClass] = useState("all")
  const [isLoading, setIsLoading] = useState(false)
  const [attendanceData, setAttendanceData] = useState<Record<string, AttendanceRecord[]>>({})
  const { toast } = useToast()

  // Mock user data
  const user = {
    name: "Mazhitov Jafar",
    email: "admin@admin.school.edu",
    role: "admin" as const,
    avatar: "/",
  }

  // Student information dictionary
  const studentInfoDict: Record<string, StudentInfo> = {
    "KEREY": {
      id: "071004553794",
      name: "Бердышев Керей",
      class: "11H",
      curator: "Самал Талгаткызы"
    },
    "JAFAR": {
      id: "070708551158",
      name: "Мажитов Джафар",
      class: "11D",
      curator: "Ботагоз Бауыржановна"
    },
    "AZIZ": {
      id: "080424552629",
      name: "Габитов Абдулазиз",
      class: "11H",
      curator: "Самал Талгаткызы"
    }
  }

  useEffect(() => {
    const fetchAttendanceData = async () => {
      try {
        setIsLoading(true)
        const response = await axiosInstance.post<AttendanceResponse>('/data', {
          date: new Date().toISOString().split('T')[0]
        })

        if (response.data.status === "success") {
          // Group records by student name
          const groupedRecords = response.data.attendance_data.reduce((acc: Record<string, AttendanceRecord[]>, record) => {
            const studentInfo = studentInfoDict[record.name]
            if (studentInfo) {
              if (!acc[record.name]) {
                acc[record.name] = []
              }
              acc[record.name].push({
                ...record,
                studentInfo,
                lateLessons: getLateLessons(record.time)
              })
            }
            return acc
          }, {})

          // Sort records by time within each group
          Object.keys(groupedRecords).forEach(name => {
            groupedRecords[name].sort((a, b) => {
              const [aHours, aMinutes] = a.time.split(":").map(Number)
              const [bHours, bMinutes] = b.time.split(":").map(Number)
              return (aHours * 60 + aMinutes) - (bHours * 60 + bMinutes)
            })
          })

          setAttendanceData(groupedRecords)
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

    fetchAttendanceData()
  }, [])

  const filteredStudents = Object.entries(attendanceData).filter(
    ([name, records]) =>
      name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      records[0].studentInfo?.id.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const handleMarkAttendance = (student: any, status: "present" | "late") => {
    // In a real app, this would update the database
    alert(`Marked ${student.studentInfo?.name} as ${status}`)
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
        filteredStudents.map(([name, records]) => ({
          'Student ID': records[0].studentInfo?.id,
          'Name': records[0].studentInfo?.name,
          'Class': records[0].studentInfo?.class,
          'Curator': records[0].studentInfo?.curator,
          'Time': records[0].time,
          'Late Lessons': records[0].lateLessons ? records[0].lateLessons.join(", ") : "",
          'Date': records[0].date
        }))
      )

      // Set column widths
      const wscols = [
        {wch: 15}, // Student ID
        {wch: 20}, // Name
        {wch: 8},  // Class
        {wch: 20}, // Curator
        {wch: 10}, // Time
        {wch: 20}, // Late Lessons
        {wch: 12}  // Date
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
          </div>
          <div className="overflow-x-auto">
            <table className="w-full table-auto">
              <thead>
                <tr className="border-b">
                  <th className="px-4 py-3 text-left font-medium">ID</th>
                  <th className="px-4 py-3 text-left font-medium">Name</th>
                  <th className="px-4 py-3 text-left font-medium">Class</th>
                  <th className="px-4 py-3 text-left font-medium">Curator</th>
                  <th className="px-4 py-3 text-left font-medium">Records</th>
                  <th className="px-4 py-3 text-left font-medium">Date</th>
                </tr>
              </thead>
              <tbody>
                {filteredStudents.map(([name, records]) => (
                  <tr key={name} className="border-b">
                    <td className="px-4 py-3">{records[0].studentInfo?.id}</td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <Avatar className="h-8 w-8 border-2 border-primary/20">
                          <AvatarImage src="/" alt={records[0].studentInfo?.name} />
                          <AvatarFallback className="bg-primary/10 text-primary">
                            {records[0].studentInfo?.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        <span>{records[0].studentInfo?.name}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3">{records[0].studentInfo?.class}</td>
                    <td className="px-4 py-3">{records[0].studentInfo?.curator}</td>
                    <td className="px-4 py-3">
                      <div className="flex flex-col gap-2">
                        {records.map((record, index) => (
                          <div key={index} className="flex items-center gap-2">
                            <div className="flex items-center text-sm">
                              <Clock className="mr-1 h-3 w-3" />
                              {record.time}
                            </div>
                            {record.lateLessons && record.lateLessons.length > 0 && (
                              <div className="flex flex-wrap gap-1">
                                {record.lateLessons.map(lesson => (
                                  <Badge key={lesson} variant="destructive">
                                    {lesson}
                                  </Badge>
                                ))}
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    </td>
                    <td className="px-4 py-3">{formatDate(records[0].date)}</td>
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

