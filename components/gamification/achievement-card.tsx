import { Badge } from "@/components/ui/badge"
import { Medal, Lock } from "lucide-react"

interface AchievementCardProps {
  name: string
  description: string
  unlocked: boolean
  points: number
  date?: string
  image?: string
}

export function AchievementCard({ name, description, unlocked, points, date, image }: AchievementCardProps) {
  return (
    <div
      className={`group relative overflow-hidden rounded-xl border-2 ${
        unlocked ? "border-primary bg-white" : "border-gray-200 bg-gray-50"
      } p-4 transition-all hover:shadow-md`}
    >
      <div className="mb-2 flex items-center justify-between">
        <div className="flex items-center">
          {unlocked ? (
            <div className="mr-3 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
              <Medal className="h-6 w-6 text-primary" />
            </div>
          ) : (
            <div className="mr-3 flex h-12 w-12 items-center justify-center rounded-full bg-gray-200">
              <Lock className="h-6 w-6 text-gray-400" />
            </div>
          )}
          <div>
            <h3 className="font-bold">{name}</h3>
            <p className="text-sm text-muted-foreground">{description}</p>
          </div>
        </div>
        <Badge variant={unlocked ? "secondary" : "outline"} className={unlocked ? "" : "opacity-60"}>
          {points} XP
        </Badge>
      </div>

      {unlocked && date && <p className="text-xs text-muted-foreground">Unlocked on {date}</p>}

      {!unlocked && (
        <div className="mt-2 rounded-lg bg-gray-100 p-2 text-center text-sm text-gray-500">
          Complete this challenge to earn {points} XP
        </div>
      )}

      {unlocked && (
        <div className="absolute -right-10 -top-10 h-20 w-20 rotate-45 bg-primary/10 transition-all group-hover:bg-primary/20"></div>
      )}
    </div>
  )
}

