"use client"

import { useState } from "react"
import { MainLayout } from "@/components/layout/main-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { Download, BarChart, PieChart, LineChart, Calendar } from "lucide-react"
import { MascotIcon } from "@/components/ui/mascot-icon"

export default function ReportsPage() {
  const [selectedPeriod, setSelectedPeriod] = useState("month")
  const [selectedClass, setSelectedClass] = useState("all")

  // Mock user data
  const user = {
    name: "Admin User",
    email: "admin@admin.school.edu",
    role: "admin" as const,
    avatar: "/placeholder.svg?height=40&width=40",
  }

  return (
    <MainLayout user={user}>
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Reports & Analytics</h1>
          <p className="text-muted-foreground">View attendance statistics and trends</p>
        </div>
        <Button variant="outline" className="gap-2">
          <Download className="h-4 w-4" />
          Export Reports
        </Button>
      </div>

      <div className="mb-6 flex flex-col gap-4 md:flex-row">
        <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
          <SelectTrigger className="w-full md:w-[180px]">
            <SelectValue placeholder="Select period" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="week">This Week</SelectItem>
            <SelectItem value="month">This Month</SelectItem>
            <SelectItem value="semester">This Semester</SelectItem>
            <SelectItem value="year">This Year</SelectItem>
          </SelectContent>
        </Select>
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
      </div>

      <div className="mb-8 grid gap-6 md:grid-cols-3">
        <Card>
          <CardHeader className="bg-secondary/30 pb-2">
            <CardTitle className="flex items-center gap-2 text-base">
              <MascotIcon className="h-5 w-5" />
              Overall Attendance
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="flex items-center justify-center py-4">
              <div className="relative flex h-40 w-40 items-center justify-center rounded-full border-8 border-primary/20">
                <div className="absolute text-3xl font-bold">92.4%</div>
              </div>
            </div>
            <div className="space-y-2">
              <div>
                <div className="mb-1 flex items-center justify-between text-sm">
                  <span>Present</span>
                  <span>85.1%</span>
                </div>
                <Progress value={85.1} className="h-2 rounded-full bg-gray-100" />
              </div>
              <div>
                <div className="mb-1 flex items-center justify-between text-sm">
                  <span>Late</span>
                  <span>7.3%</span>
                </div>
                <Progress value={7.3} className="h-2 rounded-full bg-gray-100" />
              </div>
              <div>
                <div className="mb-1 flex items-center justify-between text-sm">
                  <span>Absent</span>
                  <span>7.6%</span>
                </div>
                <Progress value={7.6} className="h-2 rounded-full bg-gray-100" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="bg-secondary/30 pb-2">
            <CardTitle className="flex items-center gap-2 text-base">
              <Calendar className="h-5 w-5" />
              Daily Attendance Trend
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="flex h-[220px] items-center justify-center">
              <LineChart className="h-32 w-32 text-muted-foreground" />
              <p className="text-center text-sm text-muted-foreground">Chart visualization would appear here</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="bg-secondary/30 pb-2">
            <CardTitle className="flex items-center gap-2 text-base">
              <BarChart className="h-5 w-5" />
              Class Comparison
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="space-y-4">
              <div>
                <div className="mb-1 flex items-center justify-between text-sm">
                  <span>Class 12A</span>
                  <span>94.2%</span>
                </div>
                <Progress value={94.2} className="h-3 rounded-full bg-gray-100" />
              </div>
              <div>
                <div className="mb-1 flex items-center justify-between text-sm">
                  <span>Class 12B</span>
                  <span>90.7%</span>
                </div>
                <Progress value={90.7} className="h-3 rounded-full bg-gray-100" />
              </div>
              <div>
                <div className="mb-1 flex items-center justify-between text-sm">
                  <span>Class 11A</span>
                  <span>88.5%</span>
                </div>
                <Progress value={88.5} className="h-3 rounded-full bg-gray-100" />
              </div>
              <div>
                <div className="mb-1 flex items-center justify-between text-sm">
                  <span>Class 11B</span>
                  <span>91.3%</span>
                </div>
                <Progress value={91.3} className="h-3 rounded-full bg-gray-100" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="attendance">
        <TabsList className="mb-4 w-full justify-start rounded-xl bg-white p-1">
          <TabsTrigger value="attendance" className="rounded-lg">
            Attendance
          </TabsTrigger>
          <TabsTrigger value="trends" className="rounded-lg">
            Trends
          </TabsTrigger>
          <TabsTrigger value="gamification" className="rounded-lg">
            Gamification
          </TabsTrigger>
        </TabsList>

        <TabsContent value="attendance">
          <Card>
            <CardHeader>
              <CardTitle>Attendance Details</CardTitle>
              <CardDescription>Detailed breakdown of attendance statistics</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-6 md:grid-cols-2">
                <div>
                  <h3 className="mb-4 text-lg font-medium">Attendance by Day of Week</h3>
                  <div className="space-y-3">
                    <div>
                      <div className="mb-1 flex items-center justify-between text-sm">
                        <span>Monday</span>
                        <span>93.5%</span>
                      </div>
                      <Progress value={93.5} className="h-2 rounded-full bg-gray-100" />
                    </div>
                    <div>
                      <div className="mb-1 flex items-center justify-between text-sm">
                        <span>Tuesday</span>
                        <span>94.2%</span>
                      </div>
                      <Progress value={94.2} className="h-2 rounded-full bg-gray-100" />
                    </div>
                    <div>
                      <div className="mb-1 flex items-center justify-between text-sm">
                        <span>Wednesday</span>
                        <span>91.8%</span>
                      </div>
                      <Progress value={91.8} className="h-2 rounded-full bg-gray-100" />
                    </div>
                    <div>
                      <div className="mb-1 flex items-center justify-between text-sm">
                        <span>Thursday</span>
                        <span>92.3%</span>
                      </div>
                      <Progress value={92.3} className="h-2 rounded-full bg-gray-100" />
                    </div>
                    <div>
                      <div className="mb-1 flex items-center justify-between text-sm">
                        <span>Friday</span>
                        <span>90.1%</span>
                      </div>
                      <Progress value={90.1} className="h-2 rounded-full bg-gray-100" />
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="mb-4 text-lg font-medium">Attendance by Time</h3>
                  <div className="flex h-[220px] items-center justify-center">
                    <BarChart className="h-32 w-32 text-muted-foreground" />
                    <p className="text-center text-sm text-muted-foreground">Chart visualization would appear here</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="trends">
          <Card>
            <CardHeader>
              <CardTitle>Attendance Trends</CardTitle>
              <CardDescription>Long-term attendance patterns and trends</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-6 md:grid-cols-2">
                <div>
                  <h3 className="mb-4 text-lg font-medium">Monthly Attendance Rate</h3>
                  <div className="flex h-[220px] items-center justify-center">
                    <LineChart className="h-32 w-32 text-muted-foreground" />
                    <p className="text-center text-sm text-muted-foreground">Chart visualization would appear here</p>
                  </div>
                </div>

                <div>
                  <h3 className="mb-4 text-lg font-medium">Year-over-Year Comparison</h3>
                  <div className="space-y-3">
                    <div>
                      <div className="mb-1 flex items-center justify-between text-sm">
                        <span>2025 (Current)</span>
                        <span>92.4%</span>
                      </div>
                      <Progress value={92.4} className="h-2 rounded-full bg-gray-100" />
                    </div>
                    <div>
                      <div className="mb-1 flex items-center justify-between text-sm">
                        <span>2024</span>
                        <span>90.1%</span>
                      </div>
                      <Progress value={90.1} className="h-2 rounded-full bg-gray-100" />
                    </div>
                    <div>
                      <div className="mb-1 flex items-center justify-between text-sm">
                        <span>2023</span>
                        <span>88.7%</span>
                      </div>
                      <Progress value={88.7} className="h-2 rounded-full bg-gray-100" />
                    </div>
                  </div>
                  <div className="mt-4 rounded-lg bg-green-50 p-3 text-center text-sm text-green-800">
                    <p>Attendance has improved by 2.3% compared to last year!</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="gamification">
          <Card>
            <CardHeader>
              <CardTitle>Gamification Impact</CardTitle>
              <CardDescription>How gamification affects attendance</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-6 md:grid-cols-2">
                <div>
                  <h3 className="mb-4 text-lg font-medium">Points Distribution</h3>
                  <div className="flex h-[220px] items-center justify-center">
                    <PieChart className="h-32 w-32 text-muted-foreground" />
                    <p className="text-center text-sm text-muted-foreground">Chart visualization would appear here</p>
                  </div>
                </div>

                <div>
                  <h3 className="mb-4 text-lg font-medium">Achievement Unlocks</h3>
                  <div className="space-y-3">
                    <div>
                      <div className="mb-1 flex items-center justify-between text-sm">
                        <span>Perfect Week</span>
                        <span>68% of students</span>
                      </div>
                      <Progress value={68} className="h-2 rounded-full bg-gray-100" />
                    </div>
                    <div>
                      <div className="mb-1 flex items-center justify-between text-sm">
                        <span>Early Bird</span>
                        <span>42% of students</span>
                      </div>
                      <Progress value={42} className="h-2 rounded-full bg-gray-100" />
                    </div>
                    <div>
                      <div className="mb-1 flex items-center justify-between text-sm">
                        <span>Consistency King</span>
                        <span>23% of students</span>
                      </div>
                      <Progress value={23} className="h-2 rounded-full bg-gray-100" />
                    </div>
                  </div>
                  <div className="mt-4 rounded-lg bg-secondary/30 p-3 text-center text-sm text-secondary-foreground">
                    <p>Students with streaks have 15% better attendance!</p>
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

