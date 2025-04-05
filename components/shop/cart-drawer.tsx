"use client"

import { motion } from "motion/react"
import Image from "next/image"
import { X, ShoppingBag } from "lucide-react"
import { Button } from "@/components/ui/button"
import { MascotIcon } from "@/components/ui/mascot-icon"
import type { CartItem } from "@/components/shop/types"

interface CartDrawerProps {
  cart: CartItem[]
  points: number
  onClose: () => void
  onRemoveFromCart: (productId: string) => void
  onPurchase: () => void
}

export function CartDrawer({ cart, points, onClose, onRemoveFromCart, onPurchase }: CartDrawerProps) {
  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const canAfford = total <= points

  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.5 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 bg-black"
        onClick={onClose}
      />
      <motion.div
        initial={{ x: "100%" }}
        animate={{ x: 0 }}
        exit={{ x: "100%" }}
        className="fixed right-0 top-0 z-50 h-full w-full max-w-md border-l bg-white shadow-xl"
      >
        <div className="flex h-full flex-col">
          <div className="flex items-center justify-between border-b p-4">
            <h2 className="flex items-center gap-2 text-lg font-bold">
              <ShoppingBag className="h-5 w-5" />
              Your Cart
            </h2>
            <button onClick={onClose} className="rounded-full p-2 text-gray-500 transition-colors hover:bg-gray-100">
              <X className="h-5 w-5" />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-4">
            {cart.length === 0 ? (
              <div className="flex h-full flex-col items-center justify-center text-center">
                <div className="mb-4 rounded-full bg-muted p-6">
                  <ShoppingBag className="h-10 w-10 text-muted-foreground" />
                </div>
                <h3 className="mb-2 text-lg font-medium">Your cart is empty</h3>
                <p className="mb-6 text-sm text-muted-foreground">Add some items from the shop to get started.</p>
                <Button onClick={onClose} variant="outline">
                  Browse Shop
                </Button>
              </div>
            ) : (
              <div className="space-y-4">
                {cart.map((item) => (
                  <div key={item.id} className="flex gap-4 rounded-lg border p-3 transition-colors hover:bg-muted/20">
                    <div className="relative h-20 w-20 flex-shrink-0 overflow-hidden rounded-md">
                      <Image src={item.image || "/placeholder.svg"} alt={item.name} fill className="object-cover" />
                    </div>
                    <div className="flex flex-1 flex-col">
                      <div className="flex justify-between">
                        <h3 className="font-medium">{item.name}</h3>
                        <button
                          onClick={() => onRemoveFromCart(item.id)}
                          className="rounded-full p-1 text-gray-500 transition-colors hover:bg-gray-100"
                        >
                          <X className="h-4 w-4" />
                        </button>
                      </div>
                      <p className="text-sm text-muted-foreground">Qty: {item.quantity}</p>
                      <div className="mt-auto flex items-center justify-between">
                        <span className="text-sm">{item.price} points each</span>
                        <span className="font-medium">{item.price * item.quantity} points</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {cart.length > 0 && (
            <div className="border-t p-4">
              <div className="mb-4 space-y-2">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span>{total} points</span>
                </div>
                <div className="flex justify-between font-bold">
                  <span>Total</span>
                  <span>{total} points</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Your Balance</span>
                  <span className={!canAfford ? "text-red-500" : ""}>{points} points</span>
                </div>
              </div>

              {!canAfford && (
                <div className="mb-4 flex items-center gap-2 rounded-lg bg-amber-50 p-3 text-amber-800">
                  <MascotIcon className="h-5 w-5" />
                  <p className="text-sm">You need {total - points} more points to complete this purchase.</p>
                </div>
              )}

              <Button onClick={onPurchase} disabled={cart.length === 0 || !canAfford} className="w-full gap-2">
                <ShoppingBag className="h-4 w-4" />
                {canAfford ? "Complete Purchase" : "Not Enough Points"}
              </Button>
            </div>
          )}
        </div>
      </motion.div>
    </>
  )
}

