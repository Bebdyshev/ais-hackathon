"use client"

import { CheckCircle, Circle, LockIcon } from "lucide-react"
import { MascotIcon } from "@/components/ui/mascot-icon"

interface RoadmapNodeProps {
  status: "completed" | "current" | "locked"
  level: number
  title: string
  points: number
  isLast?: boolean
  onClick?: () => void
}

export function RoadmapNode({ status, level, title, points, isLast = false, onClick }: RoadmapNodeProps) {
  return (
    <div className="relative">
      <div
        className={`
          flex h-16 w-16 cursor-pointer items-center justify-center rounded-full border-4 
          ${
            status === "completed"
              ? "border-primary bg-primary/20"
              : status === "current"
                ? "border-primary bg-white animate-pulse-scale"
                : "border-gray-300 bg-gray-100"
          }
          transition-all hover:shadow-md
        `}
        onClick={onClick}
      >
        {status === "completed" ? (
          <CheckCircle className="h-8 w-8 text-primary" />
        ) : status === "current" ? (
          <div className="relative">
            <Circle className="h-8 w-8 text-primary" />
            <MascotIcon className="absolute -right-3 -top-3 h-6 w-6 animate-bounce-small" />
          </div>
        ) : (
          <LockIcon className="h-8 w-8 text-gray-400" />
        )}
      </div>

      {!isLast && (
        <div
          className={`absolute left-16 top-8 h-1 w-16 -translate-y-1/2 
            ${status === "completed" ? "bg-primary" : "bg-gray-300"}`}
        ></div>
      )}

      <div className={`absolute left-0 top-20 w-16 text-center ${status === "locked" ? "text-gray-400" : ""}`}>
        <div className="text-sm font-bold">Level {level}</div>
        <div className="text-xs">{title}</div>
        <div className="text-xs text-muted-foreground">{points} XP</div>
      </div>
    </div>
  )
}

