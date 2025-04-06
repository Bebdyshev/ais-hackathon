"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useToast } from "@/components/ui/use-toast"
import { MascotIcon } from "@/components/ui/mascot-icon"

export default function LoginPage() {
  const router = useRouter()
  const { toast } = useToast()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  // Check if user is already logged in
  useEffect(() => {
    // Clear localStorage when visiting login page
    localStorage.removeItem('userRole')
    localStorage.removeItem('userEmail')
    localStorage.removeItem('userName')
    
    const userRole = localStorage.getItem('userRole')
    const userEmail = localStorage.getItem('userEmail')
    
    if (userRole && userEmail) {
      // Redirect based on role
      if (userRole === 'admin') {
        router.push('/admin/dashboard')
      } else if (userRole === 'student') {
        router.push('/student/dashboard')
      }
    }
  }, [router])

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      // In a real app, this would be an API call to authenticate
      // For demo purposes, we'll determine the role based on email domain

      if (!email || !password) {
        throw new Error("Please enter both email and password")
      }

      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 1000))

      let userRole = ''

      if (email.endsWith("@admin.school.edu")) {
        // Admin login
        userRole = 'admin'
        
        // Save to localStorage
        localStorage.setItem('userRole', userRole)
        localStorage.setItem('userEmail', email)
        localStorage.setItem('userName', email.split('@')[0])
        
        router.push("/admin/dashboard")
      } else if (email.endsWith("@student.edu")) {
        // Student login
        userRole = 'student'
        
        // Save to localStorage
        localStorage.setItem('userRole', userRole)
        localStorage.setItem('userEmail', email)
        localStorage.setItem('userName', email.split('@')[0])
        
        router.push("/student/dashboard")
      } else {
        // Invalid email domain
        throw new Error("Invalid email domain. Use @student.edu or @admin.school.edu")
      }
    } catch (error) {
      toast({
        title: "Login Failed",
        description: error instanceof Error ? error.message : "An error occurred during login",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex min-h-screen flex-col bg-[#f7f7f7]">
      <div className="container mx-auto flex flex-1 items-center justify-center px-4 py-12">
        <Card className="mx-auto w-full max-w-md overflow-hidden">
          <div className="bg-primary p-6 text-center text-white">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-white">
              <MascotIcon className="h-10 w-10" />
            </div>
            <CardTitle className="text-2xl font-bold">Welcome to Qatysu</CardTitle>
            <CardDescription className="text-white/80">Login to access your attendance dashboard</CardDescription>
          </div>
          <CardContent className="p-6 pt-8">
            <form onSubmit={handleLogin}>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="your.email@student.edu"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="rounded-xl"
                    required
                  />
                  <p className="text-xs text-muted-foreground">
                    Use @student.edu for students or @admin.school.edu for administrators
                  </p>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <Input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="rounded-xl"
                    required
                  />
                </div>
                <Button type="submit" className="w-full text-base" disabled={isLoading}>
                  {isLoading ? "Logging in..." : "Login"}
                </Button>
              </div>
            </form>
          </CardContent>
          <CardFooter className="flex justify-center border-t p-6">
            <Link href="/" className="text-sm text-primary hover:underline">
              Back to home
            </Link>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}

