"use client"

import { useState, useRef } from "react"
import { MainLayout } from "@/components/layout/main-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Download, BarChart, PieChart, LineChart, Calendar, Upload, FileSpreadsheet, Loader2 } from "lucide-react"
import { MascotIcon } from "@/components/ui/mascot-icon"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { 
  AttendanceDonutChart, 
  DailyTrendLineChart, 
  ClassComparisonBarChart,
  DayOfWeekBarChart,
  YearComparisonBarChart,
  MonthlyTrendLineChart,
  AchievementBarChart,
  PointsDistributionPieChart
} from "@/components/reports/charts"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Skeleton } from "@/components/ui/skeleton"

// Define the analysis result type
interface AnalysisResult {
  overallAttendance: {
    present: number;
    late: number;
    absent: number;
  };
  trends: {
    daily: Record<string, number>;
    monthly: Record<string, number>;
    yearComparison: Record<string, number>;
  };
  classComparison: Record<string, number>;
  dayOfWeekAttendance: Record<string, number>;
  gamification: {
    achievements: Record<string, number>;
    pointsDistribution: Record<string, number>;
    streakImpact: number;
  };
  insights: string[];
  recommendations: string[];
}

export default function ReportsPage() {
  const [selectedPeriod, setSelectedPeriod] = useState("month")
  const [selectedClass, setSelectedClass] = useState("all")
  const [file, setFile] = useState<File | null>(null)
  const [isUploading, setIsUploading] = useState(false)
  const [isProcessing, setIsProcessing] = useState(false)
  const [reportGenerated, setReportGenerated] = useState(false)
  const [analysisData, setAnalysisData] = useState<AnalysisResult | null>(null)
  const [error, setError] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  // Mock user data
  const user = {
    name: "Mazhitov Jafar",
    email: "admin@admin.school.edu",
    role: "admin" as const,
    avatar: "/placeholder.svg?height=40&width=40",
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0])
      setError(null)
    }
  }

  const handleUpload = async () => {
    if (!file) {
      setError("Please select a file to upload")
      return
    }

    setIsUploading(true)
    setError(null)
    
    try {
      // Create form data for upload
      const formData = new FormData()
      formData.append("file", file)
      formData.append("period", selectedPeriod)
      formData.append("class", selectedClass)
      
      // Upload file and get analysis
      const response = await fetch("/api/reports", {
        method: "POST",
        body: formData,
      })
      
      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || "Failed to process report")
      }
      
      setIsUploading(false)
      setIsProcessing(true)
      
      // Process the response
      const result = await response.json()
      
      // Short delay to simulate AI processing
      setTimeout(() => {
        setAnalysisData(result.data)
        setIsProcessing(false)
        setReportGenerated(true)
      }, 1000)
    } catch (err) {
      setIsUploading(false)
      setIsProcessing(false)
      setError(err instanceof Error ? err.message : "An unknown error occurred")
    }
  }

  const handleNewReport = () => {
    setFile(null)
    setReportGenerated(false)
    setAnalysisData(null)
    // Reset file input
    if (fileInputRef.current) {
      fileInputRef.current.value = ""
    }
  }

  const handleExportReport = () => {
    // In a real implementation, this would generate a PDF report
    // For now, we'll just log the data
    console.log("Exporting report with data:", analysisData)
    alert("Report export feature would be implemented here")
  }

  return (
    <MainLayout user={user}>
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Reports & Analytics</h1>
          <p className="text-muted-foreground">Upload student data to generate AI-powered insights</p>
        </div>
        {reportGenerated && (
          <Button variant="outline" className="gap-2" onClick={handleExportReport}>
            <Download className="h-4 w-4" />
            Export Report
          </Button>
        )}
      </div>

      {!reportGenerated ? (
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileSpreadsheet className="h-5 w-5" />
              Upload Student Performance Data
            </CardTitle>
            <CardDescription>
              Upload an Excel file with student performance data to generate an AI-powered report
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-6">
              <div className="flex flex-col items-center justify-center gap-4 rounded-lg border-2 border-dashed border-muted-foreground/20 p-10">
                <FileSpreadsheet className="h-10 w-10 text-muted-foreground" />
                <div className="flex flex-col items-center gap-2 text-center">
                  <h3 className="text-lg font-medium">Upload your Excel file</h3>
                  <p className="text-sm text-muted-foreground">
                    Drag and drop or click to upload your student performance data
                  </p>
                </div>
                <div className="w-full max-w-xs">
                  <Label htmlFor="file-upload" className="sr-only">
                    Choose a file
                  </Label>
                  <Input
                    id="file-upload"
                    type="file"
                    accept=".xlsx,.xls,.csv"
                    onChange={handleFileChange}
                    ref={fileInputRef}
                  />
                </div>
                {file && (
                  <div className="flex items-center gap-2 rounded-md bg-muted p-2 px-3">
                    <FileSpreadsheet className="h-4 w-4" />
                    <span className="text-sm font-medium">{file.name}</span>
                  </div>
                )}
              </div>

              {error && (
                <Alert variant="destructive">
                  <AlertTitle>Error</AlertTitle>
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              <div className="flex flex-col gap-2">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="period-select">Report Period</Label>
                    <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
                      <SelectTrigger id="period-select" className="w-full">
                        <SelectValue placeholder="Select period" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="week">This Week</SelectItem>
                        <SelectItem value="month">This Month</SelectItem>
                        <SelectItem value="semester">This Semester</SelectItem>
                        <SelectItem value="year">This Year</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="class-select">Class</Label>
                    <Select value={selectedClass} onValueChange={setSelectedClass}>
                      <SelectTrigger id="class-select" className="w-full">
                        <SelectValue placeholder="Select class" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Classes</SelectItem>
                        <SelectItem value="12A">Class 12A</SelectItem>
                        <SelectItem value="12B">Class 12B</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-end">
            <Button 
              onClick={handleUpload} 
              disabled={!file || isUploading || isProcessing}
              className="gap-2"
            >
              {isUploading ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Uploading...
                </>
              ) : isProcessing ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Processing...
                </>
              ) : (
                <>
                  <Upload className="h-4 w-4" />
                  Generate Report
                </>
              )}
            </Button>
          </CardFooter>
        </Card>
      ) : (
        <>
          <div className="mb-4 flex items-center justify-between">
            <div className="inline-flex items-center gap-2 rounded-full bg-green-100 px-3 py-1 text-sm text-green-800">
              <MascotIcon className="h-4 w-4" />
              <span>AI-powered report generated successfully</span>
            </div>
            <Button variant="outline" size="sm" onClick={handleNewReport}>
              Generate New Report
            </Button>
          </div>

          {analysisData ? (
            <>
              <div className="mb-8 grid gap-6 md:grid-cols-3">
                <Card>
                  <CardHeader className="bg-secondary/30 pb-2">
                    <CardTitle className="flex items-center gap-2 text-base">
                      <MascotIcon className="h-5 w-5" />
                      Overall Attendance
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-6">
                    <div className="h-48">
                      <AttendanceDonutChart data={analysisData.overallAttendance} />
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="bg-secondary/30 pb-2">
                    <CardTitle className="flex items-center gap-2 text-base">
                      <Calendar className="h-5 w-5" />
                      Daily Attendance Trend
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-6">
                    <div className="h-48">
                      <DailyTrendLineChart data={analysisData.trends.daily} />
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="bg-secondary/30 pb-2">
                    <CardTitle className="flex items-center gap-2 text-base">
                      <BarChart className="h-5 w-5" />
                      Class Comparison
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-6">
                    <div className="h-48">
                      <ClassComparisonBarChart data={analysisData.classComparison} />
                    </div>
                  </CardContent>
                </Card>
              </div>

              <Tabs defaultValue="attendance">
                <TabsList className="mb-4 w-full justify-start rounded-xl bg-white p-1">
                  <TabsTrigger value="attendance" className="rounded-lg">
                    Attendance
                  </TabsTrigger>
                  <TabsTrigger value="trends" className="rounded-lg">
                    Trends
                  </TabsTrigger>
                  <TabsTrigger value="gamification" className="rounded-lg">
                    Gamification
                  </TabsTrigger>
                  <TabsTrigger value="insights" className="rounded-lg">
                    AI Insights
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="attendance">
                  <Card>
                    <CardHeader>
                      <CardTitle>Attendance Details</CardTitle>
                      <CardDescription>Detailed breakdown of attendance statistics</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="grid gap-6 md:grid-cols-2">
                        <div>
                          <h3 className="mb-4 text-lg font-medium">Attendance by Day of Week</h3>
                          <div className="h-72">
                            <DayOfWeekBarChart data={analysisData.dayOfWeekAttendance} />
                          </div>
                        </div>

                        <div>
                          <h3 className="mb-4 text-lg font-medium">Class Comparison</h3>
                          <div className="h-72">
                            <ClassComparisonBarChart data={analysisData.classComparison} />
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="trends">
                  <Card>
                    <CardHeader>
                      <CardTitle>Attendance Trends</CardTitle>
                      <CardDescription>Long-term attendance patterns and trends</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="grid gap-6 md:grid-cols-2">
                        <div>
                          <h3 className="mb-4 text-lg font-medium">Monthly Attendance Rate</h3>
                          <div className="h-72">
                            <MonthlyTrendLineChart data={analysisData.trends.monthly} />
                          </div>
                        </div>

                        <div>
                          <h3 className="mb-4 text-lg font-medium">Year-over-Year Comparison</h3>
                          <div className="h-72">
                            <YearComparisonBarChart data={analysisData.trends.yearComparison} />
                          </div>
                          
                          <div className="mt-4 rounded-lg bg-green-50 p-3 text-center text-sm text-green-800">
                            <p>Attendance has improved by {(analysisData.trends.yearComparison["2025"] - analysisData.trends.yearComparison["2024"]).toFixed(1)}% compared to last year!</p>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="gamification">
                  <Card>
                    <CardHeader>
                      <CardTitle>Gamification Impact</CardTitle>
                      <CardDescription>How gamification affects attendance</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="grid gap-6 md:grid-cols-2">
                        <div>
                          <h3 className="mb-4 text-lg font-medium">Points Distribution</h3>
                          <div className="h-72">
                            <PointsDistributionPieChart data={analysisData.gamification.pointsDistribution} />
                          </div>
                        </div>

                        <div>
                          <h3 className="mb-4 text-lg font-medium">Achievement Unlocks</h3>
                          <div className="h-72">
                            <AchievementBarChart data={analysisData.gamification.achievements} />
                          </div>
                          
                          <div className="mt-4 rounded-lg bg-secondary/30 p-3 text-center text-sm text-secondary-foreground">
                            <p>Students with streaks have {analysisData.gamification.streakImpact}% better attendance!</p>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="insights">
                  <Card>
                    <CardHeader>
                      <CardTitle>AI-Generated Insights</CardTitle>
                      <CardDescription>Analysis and recommendations based on student data</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="grid gap-6 md:grid-cols-2">
                        <div>
                          <h3 className="mb-4 text-lg font-medium">Key Insights</h3>
                          <div className="space-y-3">
                            {analysisData.insights.map((insight, index) => (
                              <div key={index} className="rounded-lg bg-muted p-3">
                                <p className="text-sm">{insight}</p>
                              </div>
                            ))}
                          </div>
                        </div>

                        <div>
                          <h3 className="mb-4 text-lg font-medium">Recommendations</h3>
                          <div className="space-y-3">
                            {analysisData.recommendations.map((recommendation, index) => (
                              <div key={index} className="rounded-lg bg-secondary/20 p-3">
                                <p className="text-sm">{recommendation}</p>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </>
          ) : (
            // Loading state for charts
            <div className="space-y-4">
              <div className="grid gap-6 md:grid-cols-3">
                {[1, 2, 3].map((i) => (
                  <Card key={i}>
                    <CardHeader className="bg-secondary/30 pb-2">
                      <Skeleton className="h-6 w-36" />
                    </CardHeader>
                    <CardContent className="p-6">
                      <Skeleton className="h-48 w-full" />
                    </CardContent>
                  </Card>
                ))}
              </div>
              <Card>
                <CardHeader>
                  <Skeleton className="h-6 w-48 mb-2" />
                  <Skeleton className="h-4 w-64" />
                </CardHeader>
                <CardContent>
                  <div className="grid gap-6 md:grid-cols-2">
                    <Skeleton className="h-72 w-full" />
                    <Skeleton className="h-72 w-full" />
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </>
      )}
    </MainLayout>
  )
}

