"use client"

import { useState } from "react"
import { Medal, Trophy, Award, Star, CheckCircle2 } from "lucide-react"
import { MainLayout } from "@/components/layout/main-layout"
import { DuolingoRoadmap } from "@/components/gamification/duolingo-roadmap"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { MascotIcon } from "@/components/ui/mascot-icon"
import { Button } from "@/components/ui/button"
import { usePoints } from "@/context/points-context"

export default function RoadmapPage() {
  const { points, updatePoints } = usePoints()
  const [currentLevel, setCurrentLevel] = useState(3)
  const [progress, setProgress] = useState(65)

  // Mock user data
  const user = {
    name: "Berdyshev Kerey",
    email: "kerey@student.edu",
    role: "student" as const,
    avatar: "/placeholder.svg?height=40&width=40",
  }

  // Mock roadmap data
  const roadmapLevels = [
    {
      level: 1,
      title: "Beginner",
      points: 100,
      description: "Start your attendance journey",
      status: "completed" as const,
      tasks: [
        { title: "Attend 5 days in a row", completed: true, points: 50 },
        { title: "Be on time for 3 consecutive days", completed: true, points: 30 },
        { title: "Complete your profile", completed: true, points: 20 },
      ],
    },
    {
      level: 2,
      title: "Regular",
      points: 150,
      description: "Build consistent attendance habits",
      status: "completed" as const,
      tasks: [
        { title: "Attend 10 days in a row", completed: true, points: 75 },
        { title: "Arrive early 3 times", completed: true, points: 45 },
        { title: "Have 90% attendance rate for 2 weeks", completed: true, points: 30 },
      ],
    },
    {
      level: 3,
      title: "Consistent",
      points: 250,
      description: "Demonstrate reliable attendance",
      status: "current" as const,
      progress: 65,
      tasks: [
        { title: "Attend 20 days in a row", completed: false, points: 100 },
        { title: "Maintain 95% attendance for a month", completed: true, points: 75 },
        { title: "Arrive early 5 more times", completed: true, points: 75 },
      ],
    },
    {
      level: 4,
      title: "Dedicated",
      points: 350,
      description: "Show exceptional commitment",
      status: "locked" as const,
      tasks: [
        { title: "Attend 30 days in a row", completed: false, points: 150 },
        { title: "Have perfect attendance for a month", completed: false, points: 100 },
        { title: "Arrive early 10 times in a month", completed: false, points: 100 },
      ],
    },
    {
      level: 5,
      title: "Exemplary",
      points: 500,
      description: "Achieve attendance excellence",
      status: "locked" as const,
      tasks: [
        { title: "Attend 50 days in a row", completed: false, points: 200 },
        { title: "Maintain perfect attendance for a semester", completed: false, points: 150 },
        { title: "Become a role model for other students", completed: false, points: 150 },
      ],
    },
  ]

  return (
    <MainLayout user={user}>
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Your Attendance Journey</h1>
        <p className="text-muted-foreground">Track your progress and unlock new levels</p>
      </div>

      <div className="mb-8">
        <Card className="bg-white">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MascotIcon className="h-6 w-6" />
              Current Progress
            </CardTitle>
            <CardDescription>Level 3: Consistent Attendee</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="mb-2 flex items-center justify-between">
              <span className="text-sm font-medium">Level 3</span>
              <span className="text-sm text-muted-foreground">65% to Level 4</span>
            </div>
            <Progress value={65} className="h-4 rounded-full bg-gray-100" />
            <div className="mt-4 rounded-lg bg-secondary/30 p-4">
              <p className="flex items-center gap-2 text-sm font-medium text-secondary-foreground">
                <MascotIcon className="h-5 w-5" />
                Complete 20 days streak to advance to the next level!
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      <DuolingoRoadmap levels={roadmapLevels} currentLevel={3} />
    </MainLayout>
  )
}

