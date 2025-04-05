"use client"

import { useState } from "react"
import Image from "next/image"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { ShoppingBag, AlertCircle } from "lucide-react"
import { MascotIcon } from "@/components/ui/mascot-icon"
import type { ShopItemType } from "@/components/shop/type"
import { useToast } from "@/components/ui/use-toast"

interface ShopItemProps {
  item: ShopItemType
  userPoints: number
  onPurchase: (item: ShopItemType) => void
}

export function ShopItem({ item, userPoints, onPurchase }: ShopItemProps) {
  const [confirmOpen, setConfirmOpen] = useState(false)
  const { toast } = useToast()

  const canAfford = userPoints >= item.points

  const handlePurchaseClick = () => {
    if (!item.available) {
      toast({
        title: "Item Unavailable",
        description: "This item is currently out of stock.",
        variant: "destructive",
      })
      return
    }

    if (!canAfford) {
      toast({
        title: "Insufficient Points",
        description: `You need ${item.points - userPoints} more points to purchase this item.`,
        variant: "destructive",
      })
      return
    }

    setConfirmOpen(true)
  }

  const confirmPurchase = () => {
    onPurchase(item)
    setConfirmOpen(false)

    toast({
      title: "Purchase Successful!",
      description: `You've redeemed ${item.name} for ${item.points} points.`,
      variant: "default",
    })
  }

  return (
    <>
      <Card className={`overflow-hidden transition-all hover:shadow-md ${!item.available ? "opacity-70" : ""}`}>
        <div className="relative h-48 w-full">
          <Image 
            src={item.image || "/placeholder.svg"}
            alt={item.name}
            fill
            className="object-cover"
          />
          <Badge className="absolute right-2 top-2" variant={item.available ? "secondary" : "outline"}>
            {item.points} points
          </Badge>
        </div>
        <CardContent className="p-4">
          <h3 className="mb-1 text-lg font-bold">{item.name}</h3>
          <p className="text-sm text-muted-foreground">{item.description}</p>

          {!item.available && (
            <div className="mt-2 flex items-center gap-1 text-sm text-muted-foreground">
              <AlertCircle className="h-4 w-4" />
              <span>Currently unavailable</span>
            </div>
          )}
        </CardContent>
        <CardFooter className="border-t bg-muted/20 p-4">
          <Button
            onClick={handlePurchaseClick}
            disabled={!item.available}
            variant={canAfford ? "default" : "outline"}
            className="w-full gap-2"
          >
            <ShoppingBag className="h-4 w-4" />
            {canAfford ? "Purchase" : `Need ${item.points - userPoints} more points`}
          </Button>
        </CardFooter>
      </Card>

      <Dialog open={confirmOpen} onOpenChange={setConfirmOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <MascotIcon className="h-5 w-5" />
              Confirm Purchase
            </DialogTitle>
            <DialogDescription>You're about to redeem points for this item.</DialogDescription>
          </DialogHeader>

          <div className="flex items-center gap-4 py-4">
            <div className="h-16 w-16 overflow-hidden rounded-md">
              <Image
                src={item.image || "/placeholder.svg"}
                alt={item.name}
                width={64}
                height={64}
                className="h-full w-full object-cover"
              />
            </div>
            <div>
              <h4 className="font-medium">{item.name}</h4>
              <p className="text-sm text-muted-foreground">{item.description}</p>
              <Badge className="mt-1" variant="secondary">
                {item.points} points
              </Badge>
            </div>
          </div>

          <div className="rounded-lg bg-muted p-3 text-sm">
            <p>
              Your balance after purchase: <strong>{userPoints - item.points} points</strong>
            </p>
          </div>

          <DialogFooter className="gap-2 sm:gap-0">
            <Button variant="outline" onClick={() => setConfirmOpen(false)}>
              Cancel
            </Button>
            <Button onClick={confirmPurchase}>Confirm Purchase</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}

