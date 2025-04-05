import { FlameIcon } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

interface StreakCounterProps {
  days: number
  className?: string
}

export function StreakCounter({ days, className }: StreakCounterProps) {
  return (
    <Card className={`overflow-hidden ${className}`}>
      <CardContent className="p-0">
        <div className="flex flex-col items-center bg-gradient-to-b from-orange-400 to-red-500 p-4 text-white">
          <div className="mb-2 flex h-16 w-16 items-center justify-center rounded-full bg-white/20 backdrop-blur-sm">
            <FlameIcon className="h-10 w-10 animate-pulse-scale text-white" />
          </div>
          <h3 className="text-2xl font-bold">{days} day streak!</h3>
          <p className="text-sm text-white/80">Keep it going!</p>
        </div>
        <div className="flex justify-between p-4">
          {[1, 2, 3, 4, 5, 6, 7].map((day) => (
            <div
              key={day}
              className={`flex h-8 w-8 items-center justify-center rounded-full ${
                day <= days % 7 || (day === 7 && days % 7 === 0) ? "bg-primary text-white" : "bg-gray-100 text-gray-400"
              }`}
            >
              {day}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

