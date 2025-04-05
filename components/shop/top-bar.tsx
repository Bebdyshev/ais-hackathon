"use client"
import { Search, ShoppingBag, X } from "lucide-react"
import { useState, useEffect, useRef } from "react"
import { motion } from "motion/react"
import Link from "next/link";

interface TopBarProps {
  cartItemCount: number
  onCartClick: () => void
  onSearch: (query: string) => void
  points: number
}

export function TopBar({ cartItemCount, onCartClick, onSearch, points }: TopBarProps) {
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const searchInputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Escape") {
      setIsSearchOpen(false)
      searchInputRef.current?.blur()
    }
  }

  return (
    <div className="sticky top-0 z-40 w-full flex justify-center">
      <div
        className={`w-[30%] mx-auto transition-all duration-200 ${
          isScrolled ? "bg-white shadow-sm dark:bg-zinc-900" : "bg-white dark:bg-zinc-900"
        } border-b border-zinc-200 dark:border-zinc-800 rounded-b-lg`}
      >
        <div className="flex items-center gap-1.5 shrink-0">
          <motion.div className="relative" initial={false} animate={{ width: isSearchOpen ? "auto" : 0 }}>
            <input
              ref={searchInputRef}
              type="text"
              placeholder="Search products..."
              className={`w-48 sm:w-56 bg-zinc-100 dark:bg-zinc-800 rounded-md text-sm px-3 py-1.5 
                                text-zinc-800 dark:text-zinc-200
                                focus:outline-none focus:ring-1 focus:ring-zinc-300 dark:focus:ring-zinc-700
                                transition-all duration-200 ${isSearchOpen ? "opacity-100" : "opacity-0"}`}
              onChange={(e) => onSearch(e.target.value)}
              onKeyDown={handleKeyPress}
            />
            {isSearchOpen && (
              <button
                type="button"
                onClick={() => {
                  setIsSearchOpen(false)
                  onSearch("")
                }}
                className="absolute right-2 top-1/2 -translate-y-1/2 p-0.5 hover:bg-zinc-200 
                                    dark:hover:bg-zinc-700 rounded-full text-zinc-600 dark:text-zinc-400"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </motion.div>
          <button
            type="button"
            onClick={() => setIsSearchOpen(!isSearchOpen)}
            className={`p-1.5 rounded-md transition-colors text-zinc-700 dark:text-zinc-300 ${
              isSearchOpen ? "bg-zinc-100 dark:bg-zinc-800" : "hover:bg-zinc-100 dark:hover:bg-zinc-800"
            }`}
          >
            <Search className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={onCartClick}
            className="p-1.5 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-md relative text-zinc-700 dark:text-zinc-300"
          >
            <ShoppingBag className="w-4 h-4" />
            {cartItemCount > 0 && (
              <motion.span
                initial={{ scale: 0.5 }}
                animate={{ scale: 1 }}
                className="absolute -top-1 -right-1 bg-zinc-900 dark:bg-white 
                                    text-white dark:text-zinc-900 text-xs font-medium w-4 h-4 
                                    flex items-center justify-center rounded-full"
              >
                {cartItemCount}
              </motion.span>
            )}
          </button>
        </div>
      </div>
    </div>
  )
}