"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Camera, Check, QrCode, X } from "lucide-react"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"

interface Student {
  id: string
  name: string
  class: string
  streak: number
  points: number
  image: string
}

interface ScannerInterfaceProps {
  onMarkAttendance: (student: Student, status: "present" | "late") => void
}

export function ScannerInterface({ onMarkAttendance }: ScannerInterfaceProps) {
  const [scanMode, setScanMode] = useState("face")
  const [scanStatus, setScanStatus] = useState<"idle" | "scanning" | "success" | "error">("idle")
  const [scannedStudent, setScannedStudent] = useState<Student | null>(null)

  // Mock student data
  const mockStudents = [
    {
      id: "S12345",
      name: "John Doe",
      class: "12A",
      streak: 5,
      points: 350,
      image: "/placeholder.svg?height=200&width=200",
    },
    {
      id: "S12346",
      name: "Jane Smith",
      class: "12A",
      streak: 3,
      points: 280,
      image: "/placeholder.svg?height=200&width=200",
    },
    {
      id: "S12347",
      name: "Michael Johnson",
      class: "12B",
      streak: 0,
      points: 210,
      image: "/placeholder.svg?height=200&width=200",
    },
  ]

  const simulateScan = () => {
    setScanStatus("scanning")

    setTimeout(() => {
      // Randomly select a student or fail
      const random = Math.random()
      if (random < 0.8) {
        const randomStudent = mockStudents[Math.floor(Math.random() * mockStudents.length)]
        setScannedStudent(randomStudent)
        setScanStatus("success")
      } else {
        setScannedStudent(null)
        setScanStatus("error")
      }
    }, 2000)
  }

  const resetScan = () => {
    setScanStatus("idle")
    setScannedStudent(null)
  }

  const handleMarkAttendance = (status: "present" | "late") => {
    if (scannedStudent) {
      onMarkAttendance(scannedStudent, status)
      resetScan()
    }
  }

  return (
    <Card className="max-w-3xl">
      <CardHeader>
        <CardTitle>Attendance Scanner</CardTitle>
        <CardDescription>
          {scanMode === "face"
            ? "Position student's face in the camera frame to scan and mark attendance"
            : "Scan student ID card barcode or QR code to mark attendance"}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue={scanMode} onValueChange={(value) => setScanMode(value)}>
          <TabsList className="mb-6 grid w-full max-w-md grid-cols-2">
            <TabsTrigger value="face">
              <Camera className="mr-2 h-4 w-4" />
              Face Recognition
            </TabsTrigger>
            <TabsTrigger value="id">
              <QrCode className="mr-2 h-4 w-4" />
              ID Card Scanner
            </TabsTrigger>
          </TabsList>

          <div>
            {scanStatus === "idle" && (
              <div className="flex aspect-video flex-col items-center justify-center rounded-lg border border-dashed">
                {scanMode === "face" ? (
                  <Camera className="mb-4 h-16 w-16 text-muted-foreground" />
                ) : (
                  <QrCode className="mb-4 h-16 w-16 text-muted-foreground" />
                )}
                <p className="mb-4 text-center text-muted-foreground">
                  {scanMode === "face"
                    ? "Camera feed will appear here"
                    : "Position ID card barcode or QR code in front of the scanner"}
                </p>
                <Button onClick={simulateScan}>Activate {scanMode === "face" ? "Camera" : "Scanner"}</Button>
              </div>
            )}

            {scanStatus === "scanning" && (
              <div className="flex aspect-video flex-col items-center justify-center rounded-lg border bg-muted/50">
                <div className="h-24 w-24 animate-pulse rounded-full border-4 border-primary"></div>
                <p className="mt-4 text-center">Scanning...</p>
              </div>
            )}

            {scanStatus === "success" && scannedStudent && (
              <div className="grid gap-6 md:grid-cols-2">
                <div className="flex flex-col items-center justify-center rounded-lg border bg-muted/20 p-4">
                  <Avatar className="mb-4 h-32 w-32">
                    <AvatarImage src={scannedStudent.image} alt={scannedStudent.name} />
                    <AvatarFallback className="text-2xl">
                      {scannedStudent.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <h3 className="mb-1 text-xl font-bold">{scannedStudent.name}</h3>
                  <p className="mb-2 text-muted-foreground">ID: {scannedStudent.id}</p>
                  <Badge>{scannedStudent.class}</Badge>
                </div>

                <div className="flex flex-col justify-between space-y-4">
                  <Alert variant="default" className="border-green-200 bg-green-50">
                    <Check className="h-4 w-4 text-green-600" />
                    <AlertTitle>Student Identified</AlertTitle>
                    <AlertDescription>
                      Student has been successfully identified. Please mark attendance status.
                    </AlertDescription>
                  </Alert>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span>Current Streak:</span>
                      <span className="font-medium">{scannedStudent.streak} days</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Total Points:</span>
                      <span className="font-medium">{scannedStudent.points} XP</span>
                    </div>
                  </div>

                  <div className="flex flex-col gap-2">
                    <Button onClick={() => handleMarkAttendance("present")} className="bg-green-600 hover:bg-green-700">
                      <Check className="mr-2 h-4 w-4" />
                      Mark as Present
                    </Button>
                    <Button
                      onClick={() => handleMarkAttendance("late")}
                      variant="outline"
                      className="border-yellow-500 text-yellow-600 hover:bg-yellow-50"
                    >
                      Mark as Late & Print Pass
                    </Button>
                    <Button onClick={resetScan} variant="ghost">
                      <X className="mr-2 h-4 w-4" />
                      Cancel
                    </Button>
                  </div>
                </div>
              </div>
            )}

            {scanStatus === "error" && (
              <div className="flex flex-col items-center justify-center rounded-lg border border-red-200 bg-red-50 p-8">
                <X className="mb-4 h-12 w-12 text-red-500" />
                <h3 className="mb-2 text-xl font-medium text-red-700">Scan Failed</h3>
                <p className="mb-6 text-center text-red-600">
                  Unable to identify student. Please try again or use{" "}
                  {scanMode === "face" ? "ID card scanner" : "facial recognition"}.
                </p>
                <div className="flex gap-4">
                  <Button onClick={simulateScan} variant="outline">
                    Try Again
                  </Button>
                  <Button onClick={resetScan} variant="ghost">
                    Cancel
                  </Button>
                </div>
              </div>
            )}
          </div>
        </Tabs>
      </CardContent>
    </Card>
  )
}

