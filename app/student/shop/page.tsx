import MinimalShop from "@/components/kokonutui/minimal-shop"
import { MainLayout } from "@/components/layout/main-layout"
import { useState } from "react"

const user = {
  name: "John Doe",
  email: "john.doe@student.edu",
  role: "student" as const,
  avatar: "/placeholder.svg?height=40&width=40",
}

export default function ShopPage() {
  const [points, setPoints] = useState(350)

  return (
    <MainLayout user={user}>    
      <main className="min-h-screen p-3">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-center mb-6">
            <div className="flex items-center gap-2">
              <span className="text-lg font-semibold">Your Score:</span>
              <span className="text-2xl font-bold text-primary">{points} points</span>
            </div>
          </div>
          <MinimalShop points={points} onPointsChange={setPoints} />
        </div>
      </main>
    </MainLayout>
  )
}