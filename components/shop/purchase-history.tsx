import { Card } from "@/components/ui/card"
import { Clock, ShoppingBag } from "lucide-react"
import { MascotIcon } from "@/components/ui/mascot-icon"
import { Button } from "@/components/ui/button"

interface PurchaseHistoryProps {
  purchases: {
    id: string
    itemName: string
    points: number
    date: string
    time: string
  }[]
}

export function PurchaseHistory({ purchases }: PurchaseHistoryProps) {
  if (purchases.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center rounded-lg border border-dashed p-8 text-center">
        <div className="mb-4 rounded-full bg-muted p-6">
          <ShoppingBag className="h-10 w-10 text-muted-foreground" />
        </div>
        <h3 className="mb-2 text-lg font-medium">No Purchase History</h3>
        <p className="mb-6 text-sm text-muted-foreground">
          Your purchase history will appear here once you redeem points for items.
        </p>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-lg font-medium">Recent Purchases</h3>
        <Button variant="outline" size="sm" className="gap-2">
          <Clock className="h-4 w-4" />
          View All
        </Button>
      </div>

      {purchases.map((purchase) => (
        <Card key={purchase.id} className="overflow-hidden">
          <div className="flex items-center justify-between border-l-4 border-primary p-4">
            <div className="flex items-center gap-3">
              <MascotIcon className="h-8 w-8" />
              <div>
                <h4 className="font-medium">{purchase.itemName}</h4>
                <div className="flex items-center text-sm text-muted-foreground">
                  <Clock className="mr-1 h-3 w-3" />
                  {purchase.date} at {purchase.time}
                </div>
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

