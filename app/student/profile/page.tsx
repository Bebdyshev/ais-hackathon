"use client"

import { MainLayout } from "@/components/layout/main-layout"
import { StudentProfileCard } from "@/components/student/student-profile-card"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Settings } from "lucide-react"
import { Progress } from "@/components/ui/progress"
import { AchievementCard } from "@/components/gamification/achievement-card"

export default function ProfilePage() {
  // Mock user data
  const user = {
    name: "John Doe",
    email: "john.doe@student.edu",
    role: "student" as const,
    avatar: "/",
  }

  // Mock student data
  const studentData = {
    id: "S12345",
    name: "John Doe",
    email: "john.doe@student.edu",
    class: "12A",
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
      <div className="mb-6">
        <h1 className="text-2xl font-bold">My Profile</h1>
        <p className="text-muted-foreground">View and manage your personal information</p>
      </div>

      <div className="mb-6 grid gap-6 md:grid-cols-3">
        <div className="md:col-span-1">
          <StudentProfileCard student={studentData} />
        </div>

        <div className="md:col-span-2">
          <Tabs defaultValue="info">
            <TabsList className="mb-4 w-full justify-start rounded-xl bg-white p-1">
              <TabsTrigger value="info" className="rounded-lg">
                Info
              </TabsTrigger>
              <TabsTrigger value="stats" className="rounded-lg">
                Stats
              </TabsTrigger>
              <TabsTrigger value="achievements" className="rounded-lg">
                Achievements
              </TabsTrigger>
            </TabsList>

            <TabsContent value="info">
              <Card>
                <CardHeader>
                  <CardTitle>Student Information</CardTitle>
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
                      <p className="text-sm text-muted-foreground">Joined</p>
                      <p className="font-medium">{studentData.joinDate}</p>
                    </div>

                    <div className="pt-4">
                      <Button variant="outline" size="sm" className="gap-2">
                        <Settings className="h-4 w-4" />
                        Edit Profile
                      </Button>
                    </div>
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

            <TabsContent value="achievements">
              <Card>
                <CardHeader>
                  <CardTitle>Achievements</CardTitle>
                  <CardDescription>Badges and rewards earned for good attendance</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {achievements.map((achievement) => (
                      <AchievementCard
                        key={achievement.id}
                        name={achievement.name}
                        description={achievement.description}
                        unlocked={achievement.unlocked}
                        points={achievement.points}
                        date={achievement.date}
                      />
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

