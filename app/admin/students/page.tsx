"use client"

import { useState } from "react"
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
  const { toast } = useToast()

  // Mock user data
  const user = {
    name: "Admin User",
    email: "admin@admin.school.edu",
    role: "admin" as const,
    avatar: "/placeholder.svg?height=40&width=40",
  }

  // Mock students data
  const students = [
    {
      id: "S12345",
      name: "John Doe",
      class: "12A",
      email: "john.doe@student.edu",
      status: "Active",
      points: 350,
      streak: 5,
      attendanceRate: "95.9%",
      lastAttendance: "2025-04-05"
    },
    {
      id: "S12346",
      name: "Jane Smith",
      class: "12A",
      email: "jane.smith@student.edu",
      status: "Active",
      points: 280,
      streak: 3,
      attendanceRate: "92.3%",
      lastAttendance: "2025-04-05"
    },
    {
      id: "S12347",
      name: "Michael Johnson",
      class: "12B",
      email: "michael.j@student.edu",
      status: "Inactive",
      points: 210,
      streak: 0,
      attendanceRate: "78.5%",
    },
    {
      id: "S12348",
      name: "Emily Williams",
      class: "12B",
      email: "emily.w@student.edu",
      status: "Active",
      points: 520,
      streak: 10,
      attendanceRate: "98.1%",
    },
    {
      id: "S12349",
      name: "Robert Brown",
      class: "12A",
      email: "robert.b@student.edu",
      status: "Active",
      points: 410,
      streak: 7,
      attendanceRate: "94.2%",
    },
    {
      id: "S12350",
      name: "Sarah Davis",
      class: "12B",
      email: "sarah.d@student.edu",
      status: "Active",
      points: 290,
      streak: 4,
      attendanceRate: "91.7%",
    },
    {
      id: "S12351",
      name: "David Miller",
      class: "12A",
      email: "david.m@student.edu",
      status: "Inactive",
      points: 150,
      streak: 0,
      attendanceRate: "65.3%",
    },
    {
      id: "S12352",
      name: "Jennifer Wilson",
      class: "12B",
      email: "jennifer.w@student.edu",
      status: "Active",
      points: 380,
      streak: 6,
      attendanceRate: "93.8%",
    },
  ]

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
      link.setAttribute('download', `students_report_${new Date().toISOString().split('T')[0]}.xlsx`)
      document.body.appendChild(link)
      link.click()
      link.remove()

      toast({
        title: "Report Downloaded",
        description: "Students report has been downloaded successfully",
        variant: "default",
      })
    } catch (error) {
      toast({
        title: "Download Failed",
        description: "Failed to download the students report",
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
                <SelectItem value="12A">Class 12A</SelectItem>
                <SelectItem value="12B">Class 12B</SelectItem>
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
                  <th className="px-4 py-3 text-left font-medium">Class</th>
                  <th className="px-4 py-3 text-left font-medium">Status</th>
                  <th className="px-4 py-3 text-left font-medium">Points</th>
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
                    <td className="px-4 py-3">
                      <Badge variant={student.status === "Active" ? "outline" : "secondary"}>{student.status}</Badge>
                    </td>
                    <td className="px-4 py-3">{student.points} XP</td>
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

