"use client"

import { MainLayout } from "@/components/layout/main-layout"
import { AchievementCard } from "@/components/gamification/achievement-card"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { MascotIcon } from "@/components/ui/mascot-icon"
import { Progress } from "@/components/ui/progress"

export default function AchievementsPage() {
  // Mock user data
  const user = {
    name: "John Doe",
    email: "john.doe@student.edu",
    role: "student" as const,
    avatar: "/placeholder.svg?height=40&width=40",
  }

  // Mock achievements data
  const unlockedAchievements = [
    {
      id: 1,
      name: "Perfect Week",
      description: "100% on-time for a week",
      unlocked: true,
      date: "Apr 1, 2025",
      points: 50,
    },
    {
      id: 2,
      name: "Early Bird",
      description: "Arrive 10 minutes early 5 times",
      unlocked: true,
      date: "Mar 25, 2025",
      points: 30,
    },
    {
      id: 3,
      name: "First Steps",
      description: "Complete your first week of attendance",
      unlocked: true,
      date: "Feb 10, 2025",
      points: 20,
    },
    {
      id: 4,
      name: "Quick Learner",
      description: "Reach Level 2 in your first month",
      unlocked: true,
      date: "Feb 28, 2025",
      points: 40,
    },
  ]

  const lockedAchievements = [
    { id: 5, name: "Consistency King", description: "30-day attendance streak", unlocked: false, points: 100 },
    { id: 6, name: "Semester Star", description: "95% on-time for a semester", unlocked: false, points: 150 },
    { id: 7, name: "Time Master", description: "Never be late for a full month", unlocked: false, points: 75 },
    { id: 8, name: "Attendance Ace", description: "Reach Level 5", unlocked: false, points: 200 },
  ]

  // Calculate achievement stats
  const totalAchievements = unlockedAchievements.length + lockedAchievements.length
  const unlockedCount = unlockedAchievements.length
  const unlockedPercentage = Math.round((unlockedCount / totalAchievements) * 100)
  const totalPoints = unlockedAchievements.reduce((sum, achievement) => sum + achievement.points, 0)
  const possiblePoints = [...unlockedAchievements, ...lockedAchievements].reduce(
    (sum, achievement) => sum + achievement.points,
    0,
  )

  return (
    <MainLayout user={user}>
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Achievements</h1>
        <p className="text-muted-foreground">Collect badges and earn points for good attendance</p>
      </div>

      <div className="mb-8">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MascotIcon className="h-6 w-6" />
              Achievement Progress
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-6 md:grid-cols-3">
              <div>
                <div className="mb-2 flex items-center justify-between">
                  <span className="text-sm font-medium">Unlocked</span>
                  <span className="text-sm text-muted-foreground">
                    {unlockedCount} of {totalAchievements}
                  </span>
                </div>
                <Progress value={unlockedPercentage} className="h-3 rounded-full bg-gray-100" />
              </div>
              <div>
                <div className="mb-2 flex items-center justify-between">
                  <span className="text-sm font-medium">Points Earned</span>
                  <span className="text-sm text-muted-foreground">
                    {totalPoints} of {possiblePoints}
                  </span>
                </div>
                <Progress value={(totalPoints / possiblePoints) * 100} className="h-3 rounded-full bg-gray-100" />
              </div>
              <div className="flex items-center justify-center rounded-xl bg-secondary p-4 text-center text-secondary-foreground">
                <div>
                  <p className="text-sm font-medium">Next Achievement</p>
                  <p className="text-lg font-bold">Consistency King</p>
                  <p className="text-xs">30-day attendance streak</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="all">
        <TabsList className="mb-4 w-full justify-start rounded-xl bg-white p-1">
          <TabsTrigger value="all" className="rounded-lg">
            All
          </TabsTrigger>
          <TabsTrigger value="unlocked" className="rounded-lg">
            Unlocked
          </TabsTrigger>
          <TabsTrigger value="locked" className="rounded-lg">
            Locked
          </TabsTrigger>
        </TabsList>

        <TabsContent value="all">
          <div className="grid gap-4 md:grid-cols-2">
            {[...unlockedAchievements, ...lockedAchievements].map((achievement) => (
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
        </TabsContent>

        <TabsContent value="unlocked">
          <div className="grid gap-4 md:grid-cols-2">
            {unlockedAchievements.map((achievement) => (
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
        </TabsContent>

        <TabsContent value="locked">
          <div className="grid gap-4 md:grid-cols-2">
            {lockedAchievements.map((achievement) => (
              <AchievementCard
                key={achievement.id}
                name={achievement.name}
                description={achievement.description}
                unlocked={achievement.unlocked}
                points={achievement.points}
              />
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </MainLayout>
  )
}

