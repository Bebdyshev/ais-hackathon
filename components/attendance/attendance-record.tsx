import { Badge } from "@/components/ui/badge"
import { Clock } from "lucide-react"

interface AttendanceRecordProps {
  date: string
  time: string
  status: "On Time" | "Late" | "Absent" | "Frozen"
}

export function AttendanceRecord({ date, time, status }: AttendanceRecordProps) {
  // Helper function to get badge variant based on status
  const getBadgeVariant = () => {
    switch(status) {
      case "On Time": return "outline"
      case "Late": return "secondary"
      case "Absent": return "destructive"
      case "Frozen": return "default" // Blue badge for frozen
      default: return "outline"
    }
  }
  
  return (
    <div className="flex items-center justify-between">
      <div>
        <p className="font-medium">{date}</p>
        <div className="flex items-center text-sm text-muted-foreground">
          <Clock className="mr-1 h-3 w-3" />
          {time}
        </div>
      </div>
      <Badge 
        variant={getBadgeVariant()}
        className={status === "Frozen" ? "bg-blue-100 text-blue-800 hover:bg-blue-200 hover:text-blue-900" : ""}
      >
        {status}
      </Badge>
    </div>
  )
}

