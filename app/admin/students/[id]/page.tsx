"use client"
import { useParams, useRouter } from "next/navigation"
import { MainLayout } from "@/components/layout/main-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { ArrowLeft, Calendar, Edit, Medal, User } from "lucide-react"

export default function StudentDetailPage() {
  const params = useParams()
  const router = useRouter()
  const studentId = params.id as string

  // Mock user data
  const user = {
    name: "Admin User",
    email: "admin@admin.school.edu",
    role: "admin" as const,
    avatar: "/placeholder.svg?height=40&width=40",
  }

  // Mock student data - in a real app, you would fetch this based on the ID
  const studentData = {
    id: studentId,
    name: "John Doe",
    email: "john.doe@student.edu",
    class: "12A",
    status: "Active",
    avatar: "/placeholder.svg?height=96&width=96",
    level: 3,
    progress: 65,
    points: 350,
    streak: 5,
    joinDate: "September 1, 2024",
    totalDays: 49,
    presentDays: 42,
    lateDays: 5,
    absentDays: 2,
    attendanceRate: "95.9%",
  }

  // Mock attendance records
  const attendanceRecords = [
    { date: "Apr 5, 2025", time: "8:05 AM", status: "On Time" as const },
    { date: "Apr 4, 2025", time: "8:02 AM", status: "On Time" as const },
    { date: "Apr 3, 2025", time: "8:10 AM", status: "Late" as const },
    { date: "Apr 2, 2025", time: "7:55 AM", status: "On Time" as const },
    { date: "Apr 1, 2025", time: "7:58 AM", status: "On Time" as const },
  ]

  // Mock achievements
  const achievements = [
    {
      id: 1,
      name: "Perfect Week",
      description: "100% on-time for a week",
      unlocked: true,
      date: "Oct 10, 2024",
      points: 50,
    },
    {
      id: 2,
      name: "Early Bird",
      description: "Arrive 10 minutes early 5 times",
      unlocked: true,
      date: "Oct 15, 2024",
      points: 30,
    },
    {
      id: 3,
      name: "Consistency King",
      description: "30-day attendance streak",
      unlocked: false,
      date: "-",
      points: 100,
    },
    {
      id: 4,
      name: "Semester Star",
      description: "95% on-time for a semester",
      unlocked: false,
      date: "-",
      points: 150,
    },
  ]

  return (
    <MainLayout user={user}>
      <div className="mb-6 flex items-center gap-2">
        <Button variant="outline" size="icon" onClick={() => router.back()}>
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <div>
          <h1 className="text-2xl font-bold">Student Details</h1>
          <p className="text-muted-foreground">View and manage student information</p>
        </div>
      </div>

      <div className="mb-6 grid gap-6 md:grid-cols-3">
        <div className="md:col-span-1">
          <Card>
            <CardContent className="p-0">
              <div className="bg-gradient-to-r from-primary to-green-400 p-6 text-white">
                <div className="flex flex-col items-center">
                  <Avatar className="mb-4 h-24 w-24 border-4 border-white">
                    <AvatarImage src={studentData.avatar} alt={studentData.name} />
                    <AvatarFallback className="bg-white text-2xl text-primary">
                      {studentData.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <h2 className="mb-1 text-xl font-bold">{studentData.name}</h2>
                  <p className="mb-2 text-sm text-white/80">{studentData.email}</p>
                  <Badge className="mb-4 bg-white/20 text-white backdrop-blur-sm">{studentData.class}</Badge>
                </div>
              </div>

              <div className="p-4">
                <div className="mb-4 space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="font-medium">Level {studentData.level}</span>
                    <span>
                      {studentData.progress}% to Level {studentData.level + 1}
                    </span>
                  </div>
                  <Progress value={studentData.progress} className="h-3 rounded-full bg-gray-100" />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="flex flex-col items-center rounded-xl bg-secondary p-3 text-secondary-foreground">
                    <Medal className="mb-1 h-6 w-6" />
                    <span className="text-lg font-bold">{studentData.points}</span>
                    <span className="text-xs">Points</span>
                  </div>
                  <div className="flex flex-col items-center rounded-xl bg-orange-100 p-3 text-orange-700">
                    <Calendar className="mb-1 h-6 w-6" />
                    <span className="text-lg font-bold">{studentData.streak}</span>
                    <span className="text-xs">Day Streak</span>
                  </div>
                </div>

                <div className="mt-4 flex justify-end">
                  <Button variant="outline" size="sm" className="gap-2">
                    <Edit className="h-4 w-4" />
                    Edit Profile
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="md:col-span-2">
          <Tabs defaultValue="info">
            <TabsList className="mb-4 w-full justify-start rounded-xl bg-white p-1">
              <TabsTrigger value="info" className="rounded-lg">
                Info
              </TabsTrigger>
              <TabsTrigger value="attendance" className="rounded-lg">
                Attendance
              </TabsTrigger>
              <TabsTrigger value="achievements" className="rounded-lg">
                Achievements
              </TabsTrigger>
            </TabsList>

            <TabsContent value="info">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <User className="h-5 w-5" />
                    Student Information
                  </CardTitle>
                  <CardDescription>Personal and academic details</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm text-muted-foreground">Student ID</p>
                        <p className="font-medium">{studentData.id}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Class</p>
                        <p className="font-medium">{studentData.class}</p>
                      </div>
                    </div>

                    <div>
                      <p className="text-sm text-muted-foreground">Full Name</p>
                      <p className="font-medium">{studentData.name}</p>
                    </div>

                    <div>
                      <p className="text-sm text-muted-foreground">Email</p>
                      <p className="font-medium">{studentData.email}</p>
                    </div>

                    <div>
                      <p className="text-sm text-muted-foreground">Status</p>
                      <p className="font-medium">
                        <Badge variant={studentData.status === "Active" ? "outline" : "secondary"}>
                          {studentData.status}
                        </Badge>
                      </p>
                    </div>

                    <div>
                      <p className="text-sm text-muted-foreground">Joined</p>
                      <p className="font-medium">{studentData.joinDate}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="attendance">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Calendar className="h-5 w-5" />
                    Attendance Statistics
                  </CardTitle>
                  <CardDescription>Attendance record for this semester</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
                      <div className="rounded-xl border p-3 text-center">
                        <p className="text-xs text-muted-foreground">Total Days</p>
                        <p className="text-2xl font-bold">{studentData.totalDays}</p>
                      </div>
                      <div className="rounded-xl border p-3 text-center">
                        <p className="text-xs text-muted-foreground">Present</p>
                        <p className="text-2xl font-bold">{studentData.presentDays}</p>
                      </div>
                      <div className="rounded-xl border p-3 text-center">
                        <p className="text-xs text-muted-foreground">Late</p>
                        <p className="text-2xl font-bold">{studentData.lateDays}</p>
                      </div>
                      <div className="rounded-xl border p-3 text-center">
                        <p className="text-xs text-muted-foreground">Absent</p>
                        <p className="text-2xl font-bold">{studentData.absentDays}</p>
                      </div>
                    </div>

                    <div>
                      <h3 className="mb-2 font-medium">Attendance Rate</h3>
                      <div className="mb-1 flex items-center justify-between text-sm">
                        <span>Overall</span>
                        <span>{studentData.attendanceRate}</span>
                      </div>
                      <Progress value={95.9} className="h-2 rounded-full bg-gray-100" />
                    </div>

                    <div>
                      <h3 className="mb-2 font-medium">Recent Attendance</h3>
                      <div className="space-y-3">
                        {attendanceRecords.map((record, index) => (
                          <div key={index} className="flex items-center justify-between rounded-lg border p-3">
                            <div>
                              <p className="font-medium">{record.date}</p>
                              <div className="flex items-center text-sm text-muted-foreground">
                                <Calendar className="mr-1 h-3 w-3" />
                                {record.time}
                              </div>
                            </div>
                            <Badge variant={record.status === "On Time" ? "outline" : "secondary"}>
                              {record.status}
                            </Badge>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="achievements">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Medal className="h-5 w-5" />
                    Achievements
                  </CardTitle>
                  <CardDescription>Badges and rewards earned for good attendance</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {achievements.map((achievement) => (
                      <div
                        key={achievement.id}
                        className={`group relative overflow-hidden rounded-xl border-2 ${
                          achievement.unlocked ? "border-primary bg-white" : "border-gray-200 bg-gray-50"
                        } p-4 transition-all hover:shadow-md`}
                      >
                        <div className="mb-2 flex items-center justify-between">
                          <div className="flex items-center">
                            <div
                              className={`mr-3 flex h-12 w-12 items-center justify-center rounded-full ${
                                achievement.unlocked ? "bg-primary/10" : "bg-gray-200"
                              }`}
                            >
                              <Medal className={`h-6 w-6 ${achievement.unlocked ? "text-primary" : "text-gray-400"}`} />
                            </div>
                            <div>
                              <h3 className="font-bold">{achievement.name}</h3>
                              <p className="text-sm text-muted-foreground">{achievement.description}</p>
                            </div>
                          </div>
                          <Badge
                            variant={achievement.unlocked ? "secondary" : "outline"}
                            className={achievement.unlocked ? "" : "opacity-60"}
                          >
                            {achievement.points} XP
                          </Badge>
                        </div>

                        {achievement.unlocked && achievement.date && (
                          <p className="text-xs text-muted-foreground">Unlocked on {achievement.date}</p>
                        )}

                        {!achievement.unlocked && (
                          <div className="mt-2 rounded-lg bg-gray-100 p-2 text-center text-sm text-gray-500">
                            Not yet unlocked
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </MainLayout>
  )
}

