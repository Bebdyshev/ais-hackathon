import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Medal, User } from "lucide-react"

interface StudentProfileCardProps {
  student: {
    id: string
    name: string
    email: string
    class: string
    avatar?: string
    level: number
    progress: number
    points: number
    streak: number
  }
}

export function StudentProfileCard({ student }: StudentProfileCardProps) {
  return (
    <Card className="overflow-hidden">
      <div className="bg-gradient-to-r from-primary to-green-400 p-6 text-white">
        <div className="flex flex-col items-center">
          <Avatar className="mb-4 h-24 w-24 border-4 border-white">
            <AvatarImage src={student.avatar || "/placeholder.svg?height=96&width=96"} alt={student.name} />
            <AvatarFallback className="bg-white text-2xl text-primary">
              {student.name
                .split(" ")
                .map((n) => n[0])
                .join("")}
            </AvatarFallback>
          </Avatar>
          <h2 className="mb-1 text-xl font-bold">{student.name}</h2>
          <p className="mb-2 text-sm text-white/80">{student.email}</p>
          <Badge className="mb-4 bg-white/20 text-white backdrop-blur-sm">{student.class}</Badge>
        </div>
      </div>
      <CardContent className="p-4">
        <div className="mb-4 space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span className="font-medium">Level {student.level}</span>
            <span>
              {student.progress}% to Level {student.level + 1}
            </span>
          </div>
          <Progress value={student.progress} className="h-3 rounded-full bg-gray-100" />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="flex flex-col items-center rounded-xl bg-secondary p-3 text-secondary-foreground">
            <Medal className="mb-1 h-6 w-6" />
            <span className="text-lg font-bold">{student.points}</span>
            <span className="text-xs">Points</span>
          </div>
          <div className="flex flex-col items-center rounded-xl bg-orange-100 p-3 text-orange-700">
            <User className="mb-1 h-6 w-6" />
            <span className="text-lg font-bold">{student.streak}</span>
            <span className="text-xs">Day Streak</span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

