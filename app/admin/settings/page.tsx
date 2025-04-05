"use client"

import { useState } from "react"
import { MainLayout } from "@/components/layout/main-layout"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { MascotIcon } from "@/components/ui/mascot-icon"

export default function SettingsPage() {
  const [schoolName, setSchoolName] = useState("Central High School")
  const [adminEmail, setAdminEmail] = useState("admin@admin.school.edu")
  const [startTime, setStartTime] = useState("08:00")
  const [lateThreshold, setLateThreshold] = useState("15")
  const [enableFacialRecognition, setEnableFacialRecognition] = useState(true)
  const [enableIdScanning, setEnableIdScanning] = useState(true)
  const [enableGamification, setEnableGamification] = useState(true)
  const [enableNotifications, setEnableNotifications] = useState(true)

  // Mock user data
  const user = {
    name: "Admin User",
    email: "admin@admin.school.edu",
    role: "admin" as const,
    avatar: "/placeholder.svg?height=40&width=40",
  }

  return (
    <MainLayout user={user}>
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Settings</h1>
        <p className="text-muted-foreground">Configure system preferences and options</p>
      </div>

      <Tabs defaultValue="general">
        <TabsList className="mb-4 w-full justify-start rounded-xl bg-white p-1">
          <TabsTrigger value="general" className="rounded-lg">
            General
          </TabsTrigger>
          <TabsTrigger value="attendance" className="rounded-lg">
            Attendance
          </TabsTrigger>
          <TabsTrigger value="gamification" className="rounded-lg">
            Gamification
          </TabsTrigger>
          <TabsTrigger value="notifications" className="rounded-lg">
            Notifications
          </TabsTrigger>
        </TabsList>

        <TabsContent value="general">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MascotIcon className="h-5 w-5" />
                General Settings
              </CardTitle>
              <CardDescription>Basic system configuration</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="school-name">School Name</Label>
                <Input id="school-name" value={schoolName} onChange={(e) => setSchoolName(e.target.value)} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="admin-email">Admin Email</Label>
                <Input
                  id="admin-email"
                  type="email"
                  value={adminEmail}
                  onChange={(e) => setAdminEmail(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="language">System Language</Label>
                <Select defaultValue="en">
                  <SelectTrigger id="language">
                    <SelectValue placeholder="Select language" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="en">English</SelectItem>
                    <SelectItem value="es">Spanish</SelectItem>
                    <SelectItem value="fr">French</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="timezone">Timezone</Label>
                <Select defaultValue="est">
                  <SelectTrigger id="timezone">
                    <SelectValue placeholder="Select timezone" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="est">Eastern Time (EST)</SelectItem>
                    <SelectItem value="cst">Central Time (CST)</SelectItem>
                    <SelectItem value="mst">Mountain Time (MST)</SelectItem>
                    <SelectItem value="pst">Pacific Time (PST)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
            <CardFooter>
              <Button>Save Changes</Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="attendance">
          <Card>
            <CardHeader>
              <CardTitle>Attendance Settings</CardTitle>
              <CardDescription>Configure attendance rules and options</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="start-time">School Start Time</Label>
                <Input id="start-time" type="time" value={startTime} onChange={(e) => setStartTime(e.target.value)} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="late-threshold">Late Threshold (minutes)</Label>
                <Input
                  id="late-threshold"
                  type="number"
                  min="0"
                  max="60"
                  value={lateThreshold}
                  onChange={(e) => setLateThreshold(e.target.value)}
                />
                <p className="text-xs text-muted-foreground">
                  Students arriving more than {lateThreshold} minutes after start time will be marked late
                </p>
              </div>
              <div className="flex items-center justify-between space-y-0 rounded-lg border p-4">
                <div>
                  <p className="font-medium">Facial Recognition</p>
                  <p className="text-sm text-muted-foreground">Enable facial recognition for attendance</p>
                </div>
                <Switch checked={enableFacialRecognition} onCheckedChange={setEnableFacialRecognition} />
              </div>
              <div className="flex items-center justify-between space-y-0 rounded-lg border p-4">
                <div>
                  <p className="font-medium">ID Card Scanning</p>
                  <p className="text-sm text-muted-foreground">Enable ID card scanning for attendance</p>
                </div>
                <Switch checked={enableIdScanning} onCheckedChange={setEnableIdScanning} />
              </div>
            </CardContent>
            <CardFooter>
              <Button>Save Changes</Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="gamification">
          <Card>
            <CardHeader>
              <CardTitle>Gamification Settings</CardTitle>
              <CardDescription>Configure gamification features</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between space-y-0 rounded-lg border p-4">
                <div>
                  <p className="font-medium">Enable Gamification</p>
                  <p className="text-sm text-muted-foreground">Turn on/off all gamification features</p>
                </div>
                <Switch checked={enableGamification} onCheckedChange={setEnableGamification} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="points-present">Points for Present</Label>
                <Input id="points-present" type="number" defaultValue="10" disabled={!enableGamification} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="points-early">Points for Early Arrival</Label>
                <Input id="points-early" type="number" defaultValue="15" disabled={!enableGamification} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="streak-bonus">Streak Bonus Multiplier</Label>
                <Select defaultValue="1.5" disabled={!enableGamification}>
                  <SelectTrigger id="streak-bonus">
                    <SelectValue placeholder="Select multiplier" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1.2">1.2x</SelectItem>
                    <SelectItem value="1.5">1.5x</SelectItem>
                    <SelectItem value="2.0">2.0x</SelectItem>
                  </SelectContent>
                </Select>
                <p className="text-xs text-muted-foreground">Bonus points multiplier for maintaining streaks</p>
              </div>
            </CardContent>
            <CardFooter>
              <Button>Save Changes</Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="notifications">
          <Card>
            <CardHeader>
              <CardTitle>Notification Settings</CardTitle>
              <CardDescription>Configure system notifications</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between space-y-0 rounded-lg border p-4">
                <div>
                  <p className="font-medium">Enable Notifications</p>
                  <p className="text-sm text-muted-foreground">Turn on/off all notifications</p>
                </div>
                <Switch checked={enableNotifications} onCheckedChange={setEnableNotifications} />
              </div>
              <div className="flex items-center justify-between space-y-0 rounded-lg border p-4">
                <div>
                  <p className="font-medium">Absence Alerts</p>
                  <p className="text-sm text-muted-foreground">Send alerts for student absences</p>
                </div>
                <Switch defaultChecked disabled={!enableNotifications} />
              </div>
              <div className="flex items-center justify-between space-y-0 rounded-lg border p-4">
                <div>
                  <p className="font-medium">Achievement Notifications</p>
                  <p className="text-sm text-muted-foreground">Notify when students earn achievements</p>
                </div>
                <Switch defaultChecked disabled={!enableNotifications} />
              </div>
              <div className="flex items-center justify-between space-y-0 rounded-lg border p-4">
                <div>
                  <p className="font-medium">Weekly Reports</p>
                  <p className="text-sm text-muted-foreground">Send weekly attendance reports</p>
                </div>
                <Switch defaultChecked disabled={!enableNotifications} />
              </div>
            </CardContent>
            <CardFooter>
              <Button>Save Changes</Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </MainLayout>
  )
}

