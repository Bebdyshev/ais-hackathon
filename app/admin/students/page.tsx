"use client"

import { useState, useEffect } from "react"
import { MainLayout } from "@/components/layout/main-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Search, Filter, Download } from "lucide-react"
import Link from "next/link"
import { MascotIcon } from "@/components/ui/mascot-icon"
import { AddStudentDialog } from "@/components/admin/add-student-dialog"
import { useToast } from "@/components/ui/use-toast"
import * as XLSX from 'xlsx'
import axiosInstance from "@/utils/instance"

interface StudentInfo {
  id: string
  name: string
  class: string
  curator: string
}

// Define Student interface
interface Student {
  id: string
  name: string
  email: string
  class: string
  status: string
  points: number
  streak: number
  attendanceRate: string
  lastAttendance?: string
}

interface AttendanceRecord {
  name: string
  time: string
  date: string
  studentInfo?: StudentInfo
  lateLessons?: string[]
}

interface AttendanceInfo {
  time: string
  class: number
  status: string
}

interface NewAttendanceRecord {
  name: string
  date: string
  times: string[]
  attendance_info: AttendanceInfo[]
  studentInfo?: StudentInfo
}

interface AttendanceResponse {
  status: string
  attendance_data: NewAttendanceRecord[]
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

const formatDate = (dateString: string | undefined): string => {
  if (!dateString) return "No attendance"
  const date = new Date(dateString)
  const options: Intl.DateTimeFormatOptions = {
    month: 'long',
    day: 'numeric',
    year: 'numeric'
  }
  return date.toLocaleDateString('en-US', options)
}

export default function StudentsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedClass, setSelectedClass] = useState("all")
  const [selectedStatus, setSelectedStatus] = useState("all")
  const [isLoading, setIsLoading] = useState(false)
  const [attendanceData, setAttendanceData] = useState<Record<string, AttendanceRecord[]>>({})
  const { toast } = useToast()

  // Mock user data
  const user = {
    name: "Admin User",
    email: "admin@admin.school.edu",
    role: "admin" as const,
    avatar: "/placeholder.svg?height=40&width=40",
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
    },
    "MAKSIM": {
      id: "071305556238",
      name: "Коссов Максим",
      class: "11H",
      curator: "Самал Талгаткызы"
    }
  }

  // Mock students data
  const students: Student[] = [
    {
      id: "071004553794",
      name: "Бердышев Керей",
      email: "kerey@school.edu",
      class: "11H",
      status: "Active",
      points: 450,
      streak: 5,
      attendanceRate: "98%",
      lastAttendance: "2025-04-05"
    },
    {
      id: "070708551158",
      name: "Мажитов Джафар",
      email: "jafar@school.edu",
      class: "11D",
      status: "Active",
      points: 380,
      streak: 3,
      attendanceRate: "95%",
      lastAttendance: "2025-04-05"
    },
    {
      id: "080424552629",
      name: "Габитов Абдулазиз",
      email: "aziz@school.edu",
      class: "11H",
      status: "Active",
      points: 410,
      streak: 4,
      attendanceRate: "97%",
      lastAttendance: "2025-04-05"
    },
    {
      id: "071305556238",
      name: "Коссов Максим",
      email: "maksim@school.edu",
      class: "11H",
      status: "Active",
      points: 390,
      streak: 2,
      attendanceRate: "94%",
      lastAttendance: "2025-04-05"
    }
  ]

  useEffect(() => {
    const fetchAttendanceData = async () => {
      try {
        setIsLoading(true)
        const response = await axiosInstance.post<AttendanceResponse>('/data', {
          date: new Date().toISOString().split('T')[0]
        })

        if (response.data.status === "success") {
          // Group records by student name
          const groupedRecords: Record<string, AttendanceRecord[]> = {}
          
          response.data.attendance_data.forEach(record => {
            const studentInfo = studentInfoDict[record.name]
            if (studentInfo) {
              if (!groupedRecords[record.name]) {
                groupedRecords[record.name] = []
              }
              
              // Convert new format to old format for compatibility
              record.attendance_info.forEach(info => {
                groupedRecords[record.name].push({
                  name: record.name,
                  time: info.time,
                  date: record.date,
                  studentInfo,
                  lateLessons: getLateLessons(info.time)
                });
              });
            }
          })

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

  const filteredStudents = students.filter(
    (student) =>
      (selectedClass === "all" || student.class === selectedClass) &&
      (selectedStatus === "all" || student.status === selectedStatus) &&
      (student.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        student.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
        student.email.toLowerCase().includes(searchQuery.toLowerCase())),
  )

  const handleDownloadReport = async () => {
    try {
      setIsLoading(true)
      
      // Create worksheet
      const ws = XLSX.utils.json_to_sheet(
        filteredStudents.map(student => ({
          'Student ID': student.id,
          'Name': student.name,
          'Email': student.email,
          'Class': student.class,
          'Status': student.status,
          'Points': student.points,
          'Streak': student.streak,
          'Attendance Rate': student.attendanceRate,
          'Last Attendance': formatDate(student.lastAttendance)
        }))
      )

      // Set column widths
      const wscols = [
        {wch: 10}, // Student ID
        {wch: 20}, // Name
        {wch: 25}, // Email
        {wch: 8},  // Class
        {wch: 10}, // Status
        {wch: 8},  // Points
        {wch: 8},  // Streak
        {wch: 12}, // Attendance Rate
        {wch: 15}  // Last Attendance
      ]
      ws['!cols'] = wscols

      // Create workbook
      const wb = XLSX.utils.book_new()
      XLSX.utils.book_append_sheet(wb, ws, "Students Report")

      // Generate Excel file
      const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' })
      
      // Create blob and download
      const blob = new Blob([excelBuffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' })
      const url = window.URL.createObjectURL(blob)
      const link = document.createElement('a')
      link.href = url
      link.setAttribute('download', `Students Report.xlsx`)
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to download report",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <MainLayout user={user}>
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Students</h1>
          <p className="text-muted-foreground">Manage and view all students</p>
        </div>
        <AddStudentDialog
          onStudentAdded={(student) => {
            // In a real app, you would update the students list
            // For this demo, we'll just show a console log
            console.log("New student added:", student)
          }}
        />
      </div>

      <Card className="mb-6 overflow-hidden">
        <CardHeader className="bg-secondary/30">
          <CardTitle className="flex items-center gap-2">
            <Filter className="h-5 w-5" />
            Filters
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <div className="flex flex-col gap-4 md:flex-row">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search by name, ID, or email..."
                className="pl-8"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Select value={selectedClass} onValueChange={setSelectedClass}>
              <SelectTrigger className="w-full md:w-[180px]">
                <SelectValue placeholder="Select class" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Classes</SelectItem>
                <SelectItem value="11H">11H</SelectItem>
                <SelectItem value="11D">11D</SelectItem>
              </SelectContent>
            </Select>
            <Select value={selectedStatus} onValueChange={setSelectedStatus}>
              <SelectTrigger className="w-full md:w-[180px]">
                <SelectValue placeholder="Select status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="Active">Active</SelectItem>
                <SelectItem value="Inactive">Inactive</SelectItem>
              </SelectContent>
            </Select>
            <Button 
              variant="outline" 
              className="gap-2"
              onClick={handleDownloadReport}
              disabled={isLoading}
            >
              <Download className="h-4 w-4" />
              {isLoading ? "Exporting..." : "Export"}
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="bg-secondary/30">
          <CardTitle className="flex items-center gap-2">
            <MascotIcon className="h-5 w-5" />
            Student List
          </CardTitle>
          <CardDescription>
            Showing {filteredStudents.length} of {students.length} students
          </CardDescription>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full table-auto">
              <thead>
                <tr className="border-b bg-muted/50">
                  <th className="px-4 py-3 text-left font-medium">ID</th>
                  <th className="px-4 py-3 text-left font-medium">Name</th>
                  <th className="px-4 py-3 text-left font-medium">Email</th>
                  <th className="px-4 py-3 text-left font-medium">Status</th>
                  <th className="px-4 py-3 text-left font-medium">Streak</th>
                  <th className="px-4 py-3 text-left font-medium">Attendance</th>
                  <th className="px-4 py-3 text-left font-medium">Last Attendance</th>
                  <th className="px-4 py-3 text-left font-medium">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredStudents.map((student, index) => (
                  <tr key={index} className="border-b">
                    <td className="px-4 py-3">{student.id}</td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <Avatar className={`h-8 w-8 border-2 ${student.status === "Active" ? "border-primary/20" : "border-yellow-500/20"}`}>
                          <AvatarImage src="/" alt={student.name} />
                          <AvatarFallback className={`${student.status === "Active" ? "bg-primary/10 text-primary" : "bg-yellow-500/10 text-yellow-600"}`}>
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
                    <td className="px-4 py-3">{student.streak} days</td>
                    <td className="px-4 py-3">{student.attendanceRate}</td>
                    <td className="px-4 py-3">{formatDate(student.lastAttendance)}</td>
                    <td className="px-4 py-3">
                      <div className="flex gap-2">
                        <Link href={`/admin/students/${student.id}`}>
                          <Button variant="outline" size="sm">
                            View
                          </Button>
                        </Link>
                        <Button variant="outline" size="sm">
                          Edit
                        </Button>
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