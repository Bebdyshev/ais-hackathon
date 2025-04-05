"use client"

import { createContext, useContext, useState, useEffect, ReactNode } from "react"

interface PointsContextType {
  points: number
  updatePoints: (newPoints: number) => void
}

const PointsContext = createContext<PointsContextType | undefined>(undefined)

export function PointsProvider({ children }: { children: ReactNode }) {
  const [points, setPoints] = useState(350) // Default value is 350

  useEffect(() => {
    // Only run on client side
    const savedPoints = localStorage.getItem('studentPoints')
    if (savedPoints) {
      setPoints(parseInt(savedPoints))
    }
  }, [])

  const updatePoints = (newPoints: number) => {
    setPoints(newPoints)
    localStorage.setItem('studentPoints', newPoints.toString())
  }

  return (
    <PointsContext.Provider value={{ points, updatePoints }}>
      {children}
    </PointsContext.Provider>
  )
}

export function usePoints() {
  const context = useContext(PointsContext)
  if (context === undefined) {
    throw new Error('usePoints must be used within a PointsProvider')
  }
  return context
} 