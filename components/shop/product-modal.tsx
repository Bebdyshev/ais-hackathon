"use client"

import Image from "next/image"
import { X, ShoppingBag } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { MascotIcon } from "@/components/ui/mascot-icon"
import type { Product } from "@/components/shop/types"
import { useToast } from "@/components/ui/use-toast"

interface ProductModalProps {
  product: Product
  onClose: () => void
  onAddToCart: (product: Product) => void
  userPoints: number
}

export function ProductModal({ product, onClose, onAddToCart, userPoints }: ProductModalProps) {
  const { toast } = useToast()
  const canAfford = userPoints >= product.price

  const handlePurchase = () => {
    if (!canAfford) {
      toast({
        title: "Not Enough Points",
        description: `You need ${product.price - userPoints} more points to purchase this item.`,
        variant: "destructive",
      })
      return
    }

    // Update points in localStorage
    const newPoints = userPoints - product.price
    localStorage.setItem('studentPoints', newPoints.toString())

    // Add to cart
    onAddToCart(product)
    
    toast({
      title: "Purchase Successful!",
      description: `You've spent ${product.price} points on ${product.name}.`,
      variant: "default",
    })
    
    onClose()
  }

  return (
    <>
      <div className="fixed inset-0 z-50 bg-black/50" onClick={onClose} />
      <div className="fixed inset-x-4 top-1/2 z-50 max-w-md -translate-y-1/2 overflow-hidden rounded-xl border bg-white p-0 shadow-xl md:inset-x-auto md:left-1/2 md:right-auto md:-translate-x-1/2">
        <button
          onClick={onClose}
          className="absolute right-2 top-2 z-10 rounded-full bg-white/80 p-1.5 text-gray-800 shadow-sm backdrop-blur-sm transition-colors hover:bg-white"
        >
          <X className="h-4 w-4" />
        </button>

        <div className="relative aspect-square w-full overflow-hidden">
          <Image src={product.image || "/placeholder.svg"} alt={product.name} fill className="object-cover" />
        </div>

        <div className="p-6">
          <div className="mb-4 flex items-start justify-between">
            <div>
              <h2 className="text-xl font-bold">{product.name}</h2>
              <Badge variant="outline" className="mt-1">
                {product.category}
              </Badge>
            </div>
            <Badge className="bg-primary text-white">{product.price} points</Badge>
          </div>

          <p className="mb-6 text-muted-foreground">{product.description}</p>

          {!canAfford && (
            <div className="mb-4 flex items-center gap-2 rounded-lg bg-amber-50 p-3 text-amber-800">
              <MascotIcon className="h-5 w-5" />
              <p className="text-sm">You need {product.price - userPoints} more points to purchase this item.</p>
            </div>
          )}

          <Button onClick={handlePurchase} disabled={!canAfford} className="w-full gap-2">
            <ShoppingBag className="h-4 w-4" />
            {canAfford ? "Purchase Now" : "Not Enough Points"}
          </Button>
        </div>
      </div>
    </>
  )
}

