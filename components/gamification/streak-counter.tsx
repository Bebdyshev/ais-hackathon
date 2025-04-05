import { FlameIcon } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"

interface StreakCounterProps {
  days: number
  className?: string
}

export function StreakCounter({ days, className }: StreakCounterProps) {
  const [showConfetti, setShowConfetti] = useState(false)
  const [previousDays, setPreviousDays] = useState(days)

  useEffect(() => {
    if (days > previousDays) {
      setShowConfetti(true)
      const timer = setTimeout(() => setShowConfetti(false), 2000)
      return () => clearTimeout(timer)
    }
    setPreviousDays(days)
  }, [days, previousDays])

  return (
    <Card className={`overflow-hidden ${className}`}>
      <CardContent className="p-0">
        <div className="relative flex flex-col items-center bg-gradient-to-b from-orange-400 to-red-500 p-4 text-white">
          <AnimatePresence>
            {showConfetti && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0 flex items-center justify-center"
              >
                {[...Array(20)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute h-2 w-2 rounded-full bg-yellow-300"
                    initial={{ x: 0, y: 0, opacity: 1 }}
                    animate={{
                      x: Math.random() * 200 - 100,
                      y: Math.random() * -200,
                      opacity: 0,
                      rotate: Math.random() * 360,
                    }}
                    transition={{ duration: 1, ease: "easeOut" }}
                  />
                ))}
              </motion.div>
            )}
          </AnimatePresence>
          
          <motion.div
            className="mb-2 flex h-16 w-16 items-center justify-center rounded-full bg-white/20 backdrop-blur-sm"
            animate={{
              scale: showConfetti ? [1, 1.2, 1] : 1,
              rotate: showConfetti ? [0, 10, -10, 0] : 0,
            }}
            transition={{ duration: 0.5 }}
          >
            <motion.div
              animate={{
                scale: [1, 1.2, 1],
                rotate: [0, 5, -5, 0],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                repeatType: "reverse",
              }}
            >
              <FlameIcon className="h-10 w-10 text-white" />
            </motion.div>
          </motion.div>
          
          <motion.h3
            className="text-2xl font-bold"
            animate={{
              scale: showConfetti ? [1, 1.1, 1] : 1,
            }}
            transition={{ duration: 0.5 }}
          >
            {days} day streak!
          </motion.h3>
          <p className="text-sm text-white/80">Keep it going!</p>
        </div>
        <div className="flex justify-between p-4">
          {[1, 2, 3, 4, 5, 6, 7].map((day) => (
            <motion.div
              key={day}
              className={`flex h-8 w-8 items-center justify-center rounded-full ${
                day <= days % 7 || (day === 7 && days % 7 === 0) ? "bg-primary text-white" : "bg-gray-100 text-gray-400"
              }`}
              animate={{
                scale: showConfetti && (day <= days % 7 || (day === 7 && days % 7 === 0)) ? [1, 1.2, 1] : 1,
              }}
              transition={{ duration: 0.5 }}
            >
              {day}
            </motion.div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

