"use client"

import { useState } from "react"
import { Medal, TrendingUp, Award, Calendar } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { MainLayout } from "@/components/layout/main-layout"
import { StatsCard } from "@/components/attendance/stats-card"
import { AttendanceRecord } from "@/components/attendance/attendance-record"
import { StreakCounter } from "@/components/gamification/streak-counter"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { MascotIcon } from "@/components/ui/mascot-icon"

export default function StudentDashboard() {
  const [streak, setStreak] = useState(5)
  const [points, setPoints] = useState(350)
  const [level, setLevel] = useState(3)
  const [progress, setProgress] = useState(65)

  // Mock user data
  const user = {
    name: "John Doe",
    email: "john.doe@student.edu",
    role: "student" as const,
    avatar: "/placeholder.svg?height=40&width=40",
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
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <div className="flex items-center gap-2 rounded-full bg-secondary px-4 py-2 text-secondary-foreground">
          <MascotIcon className="h-5 w-5" />
          <span className="text-sm font-medium">Level {level} Student</span>
        </div>
      </div>

      <div className="mb-8 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <StreakCounter days={streak} className="md:col-span-2 lg:col-span-1" />
        <StatsCard
          title="Total Points"
          value={points}
          subtitle="XP"
          icon={<Medal className="h-5 w-5 text-yellow-500" />}
          trend="up"
          trendValue="+25 this week"
        />
        <StatsCard
          title="Attendance Rate"
          value="95.9%"
          icon={<TrendingUp className="h-5 w-5 text-green-500" />}
          trend="up"
          trendValue="+1.2% this month"
        />
        <StatsCard
          title="Next Achievement"
          value="10 days"
          subtitle="to unlock"
          icon={<Award className="h-5 w-5 text-purple-500" />}
        />
      </div>

      <div className="mb-8">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-2">
              <MascotIcon className="h-5 w-5" />
              Level Progress
            </CardTitle>
            <CardDescription>You're making great progress!</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="mb-2 flex items-center justify-between">
              <span className="text-sm font-medium">Level {level}</span>
              <span className="text-sm text-muted-foreground">
                {progress}% to Level {level + 1}
              </span>
            </div>
            <Progress value={progress} className="h-4 rounded-full bg-gray-100" />
            <div className="mt-4 flex justify-end">
              <Link href="/student/roadmap">
                <Button variant="outline" size="sm" className="gap-2">
                  <Calendar className="h-4 w-4" />
                  View Full Roadmap
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="overview">
        <TabsList className="mb-4 w-full justify-start rounded-xl bg-white p-1">
          <TabsTrigger value="overview" className="rounded-lg">
            Overview
          </TabsTrigger>
          <TabsTrigger value="achievements" className="rounded-lg">
            Achievements
          </TabsTrigger>
          <TabsTrigger value="stats" className="rounded-lg">
            Stats
          </TabsTrigger>
        </TabsList>
        <TabsContent value="overview">
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Recent Attendance</CardTitle>
                <CardDescription>Your last 5 check-ins</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {attendanceRecords.map((record, index) => (
                    <AttendanceRecord key={index} date={record.date} time={record.time} status={record.status} />
                  ))}
                </div>
                <div className="mt-4 flex justify-end">
                  <Link href="/student/attendance">
                    <Button variant="outline" size="sm">
                      View All Records
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Attendance Stats</CardTitle>
                <CardDescription>Current semester</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <div className="mb-1 flex items-center justify-between">
                      <span className="text-sm font-medium">On Time</span>
                      <span className="text-sm text-muted-foreground">85%</span>
                    </div>
                    <Progress value={85} className="h-2 rounded-full bg-gray-100" />
                  </div>
                  <div>
                    <div className="mb-1 flex items-center justify-between">
                      <span className="text-sm font-medium">Late</span>
                      <span className="text-sm text-muted-foreground">12%</span>
                    </div>
                    <Progress value={12} className="h-2 rounded-full bg-gray-100" />
                  </div>
                  <div>
                    <div className="mb-1 flex items-center justify-between">
                      <span className="text-sm font-medium">Absent</span>
                      <span className="text-sm text-muted-foreground">3%</span>
                    </div>
                    <Progress value={3} className="h-2 rounded-full bg-gray-100" />
                  </div>
                  <div className="mt-6 rounded-lg bg-green-50 p-3 text-center text-sm text-green-800">
                    <p>You're in the top 10% of your class for attendance!</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        <TabsContent value="achievements">
          <Card>
            <CardHeader>
              <CardTitle>Recent Achievements</CardTitle>
              <CardDescription>Your latest milestones</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2">
                {[
                  {
                    name: "Perfect Week",
                    description: "100% on-time for a week",
                    unlocked: true,
                    date: "Apr 1, 2025",
                    points: 50,
                  },
                  {
                    name: "Early Bird",
                    description: "Arrive 10 minutes early 5 times",
                    unlocked: true,
                    date: "Mar 25, 2025",
                    points: 30,
                  },
                  { name: "Consistency King", description: "30-day attendance streak", unlocked: false, points: 100 },
                  { name: "Semester Star", description: "95% on-time for a semester", unlocked: false, points: 150 },
                ].map((achievement, index) => (
                  <div
                    key={index}
                    className={`rounded-xl border-2 ${achievement.unlocked ? "border-primary bg-white" : "border-gray-200 bg-gray-50"} p-4`}
                  >
                    <div className="mb-2 flex items-center">
                      <Medal className={`mr-2 h-5 w-5 ${achievement.unlocked ? "text-yellow-500" : "text-gray-400"}`} />
                      <h3 className="font-medium">{achievement.name}</h3>
                    </div>
                    <p className="mb-2 text-sm text-muted-foreground">{achievement.description}</p>
                    {achievement.unlocked ? (
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-muted-foreground">Unlocked on {achievement.date}</span>
                        <span className="rounded-full bg-secondary px-2 py-1 text-xs font-medium text-secondary-foreground">
                          +{achievement.points} XP
                        </span>
                      </div>
                    ) : (
                      <span className="text-xs text-muted-foreground">Complete to earn {achievement.points} XP</span>
                    )}
                  </div>
                ))}
              </div>
              <div className="mt-4 flex justify-end">
                <Link href="/student/achievements">
                  <Button variant="outline" size="sm">
                    View All Achievements
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="stats">
          <Card>
            <CardHeader>
              <CardTitle>Attendance Statistics</CardTitle>
              <CardDescription>Your attendance record for this semester</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
                  <div className="rounded-xl border p-3 text-center">
                    <p className="text-xs text-muted-foreground">Total Days</p>
                    <p className="text-2xl font-bold">49</p>
                  </div>
                  <div className="rounded-xl border p-3 text-center">
                    <p className="text-xs text-muted-foreground">Present</p>
                    <p className="text-2xl font-bold">42</p>
                  </div>
                  <div className="rounded-xl border p-3 text-center">
                    <p className="text-xs text-muted-foreground">Late</p>
                    <p className="text-2xl font-bold">5</p>
                  </div>
                  <div className="rounded-xl border p-3 text-center">
                    <p className="text-xs text-muted-foreground">Absent</p>
                    <p className="text-2xl font-bold">2</p>
                  </div>
                </div>

                <div>
                  <h3 className="mb-2 font-medium">Monthly Breakdown</h3>
                  <div className="space-y-2">
                    <div>
                      <div className="mb-1 flex items-center justify-between text-sm">
                        <span>April</span>
                        <span>97%</span>
                      </div>
                      <Progress value={97} className="h-2 rounded-full bg-gray-100" />
                    </div>
                    <div>
                      <div className="mb-1 flex items-center justify-between text-sm">
                        <span>March</span>
                        <span>94%</span>
                      </div>
                      <Progress value={94} className="h-2 rounded-full bg-gray-100" />
                    </div>
                    <div>
                      <div className="mb-1 flex items-center justify-between text-sm">
                        <span>February</span>
                        <span>96%</span>
                      </div>
                      <Progress value={96} className="h-2 rounded-full bg-gray-100" />
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </MainLayout>
  )
}

