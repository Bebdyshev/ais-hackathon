"use client"

import { useState } from "react"
import { RoadmapNode } from "@/components/gamification/roadmap-node"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { MascotIcon } from "@/components/ui/mascot-icon"

interface RoadmapLevel {
  level: number
  title: string
  points: number
  description: string
  status: "completed" | "current" | "locked"
  progress?: number
  tasks?: {
    title: string
    completed: boolean
    points: number
  }[]
}

interface DuolingoRoadmapProps {
  levels: RoadmapLevel[]
  currentLevel: number
}

export function DuolingoRoadmap({ levels, currentLevel }: DuolingoRoadmapProps) {
  const [selectedLevel, setSelectedLevel] = useState<RoadmapLevel | null>(null)

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MascotIcon className="h-6 w-6" />
            Your Attendance Journey
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap justify-center gap-16 p-8">
            {levels.map((level, index) => (
              <RoadmapNode
                key={level.level}
                status={level.status}
                level={level.level}
                title={level.title}
                points={level.points}
                isLast={index === levels.length - 1}
                onClick={() => setSelectedLevel(level)}
              />
            ))}
          </div>
        </CardContent>
      </Card>

      <Dialog open={!!selectedLevel} onOpenChange={(open) => !open && setSelectedLevel(null)}>
        <DialogContent className="sm:max-w-md">
          {selectedLevel && (
            <>
              <DialogHeader>
                <DialogTitle className="text-xl">
                  Level {selectedLevel.level}: {selectedLevel.title}
                </DialogTitle>
                <DialogDescription>{selectedLevel.description}</DialogDescription>
              </DialogHeader>

              <div className="space-y-4 py-4">
                {selectedLevel.status === "current" && selectedLevel.progress !== undefined && (
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Progress</span>
                      <span>{selectedLevel.progress}%</span>
                    </div>
                    <Progress value={selectedLevel.progress} className="h-2" />
                  </div>
                )}

                {selectedLevel.tasks && (
                  <div className="space-y-3">
                    <h4 className="font-medium">Tasks to complete:</h4>
                    {selectedLevel.tasks.map((task, index) => (
                      <div key={index} className="flex items-center justify-between rounded-lg border p-3">
                        <div className="flex items-center gap-3">
                          <div
                            className={`flex h-6 w-6 items-center justify-center rounded-full ${
                              task.completed ? "bg-primary text-white" : "bg-gray-100"
                            }`}
                          >
                            {task.completed ? "✓" : index + 1}
                          </div>
                          <span className={task.completed ? "line-through opacity-70" : ""}>{task.title}</span>
                        </div>
                        <Badge variant="outline">{task.points} XP</Badge>
                      </div>
                    ))}
                  </div>
                )}

                {selectedLevel.status === "locked" && (
                  <div className="rounded-lg bg-gray-100 p-4 text-center">
                    <LockIcon className="mx-auto mb-2 h-8 w-8 text-gray-400" />
                    <p>Complete the previous level to unlock!</p>
                  </div>
                )}

                {selectedLevel.status === "completed" && (
                  <div className="rounded-lg bg-green-50 p-4 text-center text-green-800">
                    <CheckCircle className="mx-auto mb-2 h-8 w-8 text-green-600" />
                    <p>Great job! You've completed this level.</p>
                  </div>
                )}
              </div>

              <div className="flex justify-end gap-2">
                <Button variant="outline" onClick={() => setSelectedLevel(null)}>
                  Close
                </Button>
                {selectedLevel.status === "current" && <Button>Continue</Button>}
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </>
  )
}

import { Badge } from "@/components/ui/badge"
import { CheckCircle, LockIcon } from "lucide-react"

