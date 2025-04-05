import { Card } from "@/components/ui/card"
import { Clock, ShoppingBag } from "lucide-react"
import type { PurchaseType } from "@/components/shop/type"

interface PurchaseHistoryProps {
  purchases: PurchaseType[]
}

export function PurchaseHistory({ purchases }: PurchaseHistoryProps) {
  if (purchases.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center rounded-lg border border-dashed p-8 text-center">
        <ShoppingBag className="mb-2 h-10 w-10 text-muted-foreground" />
        <h3 className="mb-1 text-lg font-medium">No Purchases Yet</h3>
        <p className="text-sm text-muted-foreground">
          Your purchase history will appear here once you redeem points for items.
        </p>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium">Recent Purchases</h3>

      {purchases.map((purchase) => (
        <Card key={purchase.id} className="overflow-hidden">
          <div className="flex items-center justify-between border-l-4 border-primary p-4">
            <div>
              <h4 className="font-medium">{purchase.itemName}</h4>
              <div className="flex items-center text-sm text-muted-foreground">
                <Clock className="mr-1 h-3 w-3" />
                {purchase.date} at {purchase.time}
              </div>
            </div>
            <div className="rounded-full bg-secondary px-3 py-1 text-sm font-medium text-secondary-foreground">
              {purchase.points} points
            </div>
          </div>
        </Card>
      ))}
    </div>
  )
}

