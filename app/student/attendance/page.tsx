"use client"

import { useState } from "react"
import { MainLayout } from "@/components/layout/main-layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Calendar, ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { AttendanceRecord } from "@/components/attendance/attendance-record"
import { MascotIcon } from "@/components/ui/mascot-icon"
import { usePoints } from "@/context/points-context"

export default function AttendancePage() {
  const [selectedMonth, setSelectedMonth] = useState(new Date())
  const [selectedPeriod, setSelectedPeriod] = useState("current")
  const { points, updatePoints } = usePoints()

  // Mock user data
  const user = {
    name: "Berdyshev Kerey",
    email: "kerey@student.edu",
    role: "student" as const,
    avatar: "/placeholder.svg?height=40&width=40",
  }

  const daysInMonth = new Date(selectedMonth.getFullYear(), selectedMonth.getMonth() + 1, 0).getDate()

  const firstDayOfMonth = new Date(selectedMonth.getFullYear(), selectedMonth.getMonth(), 1).getDay()

  const monthName = selectedMonth.toLocaleString('en', { month: "long" })
  const year = selectedMonth.getFullYear()

  const previousMonth = () => {
    setSelectedMonth(new Date(selectedMonth.getFullYear(), selectedMonth.getMonth() - 1, 1))
  }

  const nextMonth = () => {
    setSelectedMonth(new Date(selectedMonth.getFullYear(), selectedMonth.getMonth() + 1, 1))
  }

  // Mock attendance data
  type AttendanceStatus = "present" | "late" | "absent"
  
  interface DayAttendance {
    status: AttendanceStatus
    time: string
  }

  const today = new Date()
  const currentDay = today.getDate()
  const todayMonth = today.getMonth()
  const todayYear = today.getFullYear()

  // Generate attendance data for the selected month
  const generateAttendanceData = () => {
    const data: Record<number, DayAttendance> = {}
    const month = selectedMonth.getMonth()
    const year = selectedMonth.getFullYear()
    const daysInMonth = new Date(year, month + 1, 0).getDate()

    // Fill April 1-5 as present
    if (month === 3 && year === todayYear) { // April is month 3 (0-based)
      for (let i = 1; i <= 5; i++) {
        // Check if this day is a weekend
        const dayOfWeek = new Date(year, month, i).getDay()
        if (dayOfWeek === 0 || dayOfWeek === 6) continue // Skip weekends (0 = Sunday, 6 = Saturday)
        
        data[i] = { status: "present", time: "8:00 AM" }
      }
      
      // Only mark day 3 as late if it's not a weekend
      const day3OfWeek = new Date(year, month, 3).getDay()
      if (day3OfWeek !== 0 && day3OfWeek !== 6) {
        data[3] = { status: "present", time: "8:25 AM" }
      }
    }

    // Fill March completely
    if (month === 2 && year === todayYear) { // March is month 2 (0-based)
      for (let i = 1; i <= daysInMonth; i++) {
        // Check if this day is a weekend
        const dayOfWeek = new Date(year, month, i).getDay()
        if (dayOfWeek === 0 || dayOfWeek === 6) continue // Skip weekends
        
        const random = Math.random()
        if (random < 0.7) {
          data[i] = { status: "present", time: "8:00 AM" }
        } else if (random < 0.9) {
          data[i] = { status: "late", time: "8:15 AM" }
        } else {
          data[i] = { status: "absent", time: "-" }
        }
      }
      
      // Only mark day 31 as absent if it's not a weekend
      const day31OfWeek = new Date(year, month, 31).getDay()
      if (day31OfWeek !== 0 && day31OfWeek !== 6) {
        data[28] = { status: "late", time: "8:20 AM" }
        data[31] = { status: "present", time: "8:00 AM" }
      }
    }

    // Fill other months completely
    if (month !== 2 && month !== 3) { // Not March or April
      for (let i = 1; i <= daysInMonth; i++) {
        // Check if this day is a weekend
        const dayOfWeek = new Date(year, month, i).getDay()
        if (dayOfWeek === 0 || dayOfWeek === 6) continue // Skip weekends
        
        const random = Math.random()
        if (random < 0.7) {
          data[i] = { status: "present", time: "8:00 AM" }
        } else if (random < 0.9) {
          data[i] = { status: "late", time: "8:15 AM" }
        } else {
          data[i] = { status: "absent", time: "-" }
        }
      }
    }

    // Fill the rest of April with random attendance
    if (month === 3 && year === todayYear) { // April
      for (let i = 6; i <= daysInMonth; i++) {
        // Check if this day is a weekend
        const dayOfWeek = new Date(year, month, i).getDay()
        if (dayOfWeek === 0 || dayOfWeek === 6) continue // Skip weekends
        
        if (i < currentDay) {
          const random = Math.random()
          if (random < 0.7) {
            data[i] = { status: "present", time: "8:00 AM" }
          } else if (random < 0.9) {
            data[i] = { status: "late", time: "8:15 AM" }
          } else {
            data[i] = { status: "absent", time: "-" }
          }
        }
      }
    }

    return data
  }

  const attendanceData = generateAttendanceData()

  const getStatusColor = (day: number) => {
    if (!attendanceData[day]) return ""

    switch (attendanceData[day].status) {
      case "present":
        return "bg-green-100 text-green-800 hover:bg-green-200"
      case "late":
        return "bg-yellow-100 text-yellow-800 hover:bg-yellow-200"
      case "absent":
        return "bg-red-100 text-red-800 hover:bg-red-200"
      default:
        return ""
    }
  }

  // Mock attendance records
  const attendanceRecords = [
    { date: "Apr 5, 2025", time: "8:05 AM", status: "On Time" as const },
    { date: "Apr 4, 2025", time: "8:02 AM", status: "On Time" as const },
    { date: "Apr 3, 2025", time: "8:10 AM", status: "Late" as const },
    { date: "Apr 2, 2025", time: "7:55 AM", status: "On Time" as const },
    { date: "Apr 1, 2025", time: "7:58 AM", status: "On Time" as const },
  ]

  return (
    <MainLayout user={user}>
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold">Attendance Calendar</h1>
        <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select period" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="current">Current Semester</SelectItem>
            <SelectItem value="previous">Previous Semester</SelectItem>
            <SelectItem value="year">Full Year</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <Card className="mb-6 overflow-hidden">
        <CardHeader className="flex flex-row items-center justify-between bg-secondary/30 pb-2">
          <CardTitle className="flex items-center gap-2">
            <Calendar className="h-5 w-5" />
            {monthName} {year}
          </CardTitle>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="icon" onClick={previousMonth} className="h-8 w-8 rounded-full p-0">
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="icon" onClick={nextMonth} className="h-8 w-8 rounded-full p-0">
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </CardHeader>
        <CardContent className="p-4">
          <div className="grid grid-cols-7 gap-1 text-center">
            {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day, index) => (
              <div key={index} className="p-2 font-medium">
                {day}
              </div>
            ))}

            {Array.from({ length: firstDayOfMonth }).map((_, index) => (
              <div key={`empty-${index}`} className="p-2"></div>
            ))}

            {Array.from({ length: daysInMonth }).map((_, index) => {
              const day = index + 1
              const statusColor = getStatusColor(day)
              const dayDate = new Date(year, selectedMonth.getMonth(), day)
              const isWeekend = dayDate.getDay() === 0 || dayDate.getDay() === 6
              
              return (
                <div
                  key={`day-${day}`}
                  className={`cursor-pointer rounded-lg p-2 text-center hover:bg-muted ${statusColor} ${
                    isWeekend ? "bg-gray-100 text-gray-400" : ""
                  }`}
                >
                  {day}
                </div>
              )
            })}
          </div>
        </CardContent>
      </Card>

      <div className="mb-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MascotIcon className="h-5 w-5" />
              Attendance Legend
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-3">
              <div className="flex items-center gap-2">
                <div className="h-4 w-4 rounded-full bg-green-500"></div>
                <span>Present</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="h-4 w-4 rounded-full bg-yellow-500"></div>
                <span>Late</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="h-4 w-4 rounded-full bg-red-500"></div>
                <span>Absent</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Recent Attendance</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {attendanceRecords.map((record, index) => (
                <AttendanceRecord key={index} date={record.date} time={record.time} status={record.status} />
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Attendance Summary</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span>Present Days</span>
                <span className="font-medium">42</span>
              </div>
              <div className="flex items-center justify-between">
                <span>Late Days</span>
                <span className="font-medium">5</span>
              </div>
              <div className="flex items-center justify-between">
                <span>Absent Days</span>
                <span className="font-medium">2</span>
              </div>
              <div className="flex items-center justify-between">
                <span>Attendance Rate</span>
                <span className="font-medium">95.9%</span>
              </div>
              <div className="flex items-center justify-between">
                <span>Current Streak</span>
                <span className="font-medium">5 days</span>
              </div>
              <div className="flex items-center justify-between">
                <span>Longest Streak</span>
                <span className="font-medium">15 days</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  )
}

