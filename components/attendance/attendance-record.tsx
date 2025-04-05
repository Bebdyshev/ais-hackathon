import { Badge } from "@/components/ui/badge"
import { Clock } from "lucide-react"

interface AttendanceRecordProps {
  date: string
  time: string
  status: "On Time" | "Late" | "Absent"
}

export function AttendanceRecord({ date, time, status }: AttendanceRecordProps) {
  return (
    <div className="flex items-center justify-between">
      <div>
        <p className="font-medium">{date}</p>
        <div className="flex items-center text-sm text-muted-foreground">
          <Clock className="mr-1 h-3 w-3" />
          {time}
        </div>
      </div>
      <Badge variant={status === "On Time" ? "outline" : status === "Late" ? "secondary" : "destructive"}>
        {status}
      </Badge>
    </div>
  )
}

