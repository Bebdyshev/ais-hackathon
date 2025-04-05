import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import type { ReactNode } from "react"

interface StatsCardProps {
  title: string
  value: string | number
  icon?: ReactNode
  subtitle?: string
  className?: string
  trend?: "up" | "down" | "neutral"
  trendValue?: string
}

export function StatsCard({ title, value, icon, subtitle, className, trend, trendValue }: StatsCardProps) {
  return (
    <Card className={`overflow-hidden ${className}`}>
      <CardHeader className="bg-secondary/30 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
      </CardHeader>
      <CardContent className="pt-4">
        <div className="flex items-center">
          {icon && <div className="mr-2">{icon}</div>}
          <span className="text-2xl font-bold">{value}</span>
          {subtitle && <span className="ml-1 text-sm font-normal text-muted-foreground">{subtitle}</span>}
        </div>

        {trend && trendValue && (
          <div className="mt-2 text-xs">
            <span
              className={`inline-flex items-center rounded-full px-2 py-1 font-medium ${
                trend === "up"
                  ? "bg-green-100 text-green-800"
                  : trend === "down"
                    ? "bg-red-100 text-red-800"
                    : "bg-gray-100 text-gray-800"
              }`}
            >
              {trend === "up" ? "↑" : trend === "down" ? "↓" : "→"} {trendValue}
            </span>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

