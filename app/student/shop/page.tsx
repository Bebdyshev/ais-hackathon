"use client"

import { useState, useEffect } from "react"
import { MainLayout } from "@/components/layout/main-layout"
import { MascotIcon } from "@/components/ui/mascot-icon"
import { CafeteriaShop } from "@/components/shop/cafeteria-shop"

export default function ShopPage() {
  const [points, setPoints] = useState(350)

  useEffect(() => {
    // Load points from localStorage on component mount
    const savedPoints = localStorage.getItem('studentPoints')
    if (savedPoints) {
      setPoints(parseInt(savedPoints))
    }
  }, [])

  const handlePointsChange = (newPoints: number) => {
    setPoints(newPoints)
    localStorage.setItem('studentPoints', newPoints.toString())
  }

  // Mock user data
  const user = {
    name: "John Doe",
    email: "john.doe@student.edu",
    role: "student" as const,
    avatar: "/placeholder.svg?height=40&width=40",
  }

  return (
    <MainLayout user={user}>
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Rewards Shop</h1>
          <p className="text-muted-foreground">Spend your attendance points on cafeteria items</p>
        </div>
        <div className="flex items-center gap-2 rounded-full bg-secondary px-4 py-2 text-secondary-foreground">
          <MascotIcon className="h-5 w-5" />
          <span className="text-sm font-medium">{points} Points Available</span>
        </div>
      </div>

      <CafeteriaShop points={points} onPointsChange={handlePointsChange} />
    </MainLayout>
  )
}

