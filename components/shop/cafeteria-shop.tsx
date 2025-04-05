"use client"

import { useState } from "react"
import { AnimatePresence } from "motion/react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Search, Coffee, Pizza, Cookie, ShoppingBag, Clock } from "lucide-react"
import { MascotIcon } from "@/components/ui/mascot-icon"
import { ProductGrid } from "@/components/shop/product-grid"
import { CartDrawer } from "@/components/shop/cart-drawer"
import { ProductModal } from "@/components/shop/product-modal"
import { PurchaseHistory } from "@/components/shop/purchase-history"
import { type Product, type CartItem, cafeteriaProducts } from "@/components/shop/type"
import { useToast } from "@/components/ui/use-toast"

interface CafeteriaShopProps {
  points: number
  onPointsChange: (points: number) => void
}

export function CafeteriaShop({ points, onPointsChange }: CafeteriaShopProps) {
  const [cart, setCart] = useState<CartItem[]>([])
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)
  const [isCartOpen, setIsCartOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [purchaseHistory, setPurchaseHistory] = useState<
    {
      id: string
      itemName: string
      points: number
      date: string
      time: string
    }[]
  >([])
  const { toast } = useToast()

  const addToCart = (product: Product, quantity = 1) => {
    setCart((prev) => {
      const exists = prev.find((item) => item.id === product.id)
      if (exists) {
        return prev.map((item) => (item.id === product.id ? { ...item, quantity: item.quantity + quantity } : item))
      }
      return [...prev, { ...product, quantity }]
    })

    toast({
      title: "Added to Cart",
      description: `${product.name} has been added to your cart.`,
      variant: "default",
    })
  }

  const removeFromCart = (productId: string) => {
    setCart((prev) => prev.filter((item) => item.id !== productId))
  }

  const purchaseCart = () => {
    const totalCost = cart.reduce((sum, item) => sum + item.price * item.quantity, 0)
    if (totalCost <= points) {
      onPointsChange(points - totalCost)

      // Add to purchase history
      const newPurchases = cart.map((item) => ({
        id: `p${Date.now()}-${item.id}`,
        itemName: item.name,
        points: item.price * item.quantity,
        date: new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }),
        time: new Date().toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" }),
      }))

      setPurchaseHistory((prev) => [...newPurchases, ...prev])
      setCart([])
      setIsCartOpen(false)

      toast({
        title: "Purchase Successful!",
        description: `You've spent ${totalCost} points on cafeteria items.`,
        variant: "default",
      })
    } else {
      toast({
        title: "Not Enough Points",
        description: `You need ${totalCost - points} more points to complete this purchase.`,
        variant: "destructive",
      })
    }
  }

  // Filter products based on search and category
  const filterProducts = (category: string) => {
    return cafeteriaProducts.filter(
      (product) =>
        (category === "all" || product.category === category) &&
        product.name.toLowerCase().includes(searchQuery.toLowerCase()),
    )
  }

  return (
    <Card>
      <CardHeader className="pb-3">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <CardTitle className="flex items-center gap-2">
              <ShoppingBag className="h-5 w-5" />
              Cafeteria Shop
            </CardTitle>
            <CardDescription>Redeem your points for food, drinks, and snacks</CardDescription>
          </div>
          <button
            onClick={() => setIsCartOpen(true)}
            className="flex items-center gap-2 rounded-full bg-primary px-4 py-2 text-white hover:bg-primary-hover transition-colors"
          >
            <ShoppingBag className="h-4 w-4" />
            <span className="text-sm font-medium">Cart ({cart.length})</span>
          </button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="relative mb-6">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search items..."
            className="pl-8"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <Tabs defaultValue="all">
          <TabsList className="mb-6 w-full justify-start rounded-xl bg-white p-1">
            <TabsTrigger value="all" className="rounded-lg">
              All Items
            </TabsTrigger>
            <TabsTrigger value="drinks" className="rounded-lg">
              <Coffee className="mr-2 h-4 w-4" />
              Drinks
            </TabsTrigger>
            <TabsTrigger value="food" className="rounded-lg">
              <Pizza className="mr-2 h-4 w-4" />
              Food
            </TabsTrigger>
            <TabsTrigger value="snacks" className="rounded-lg">
              <Cookie className="mr-2 h-4 w-4" />
              Snacks
            </TabsTrigger>
            <TabsTrigger value="history" className="rounded-lg">
              <Clock className="mr-2 h-4 w-4" />
              History
            </TabsTrigger>
          </TabsList>

          <TabsContent value="all">
            <ProductGrid products={filterProducts("all")} onProductSelect={setSelectedProduct} />
          </TabsContent>

          <TabsContent value="drinks">
            <ProductGrid products={filterProducts("drinks")} onProductSelect={setSelectedProduct} />
          </TabsContent>

          <TabsContent value="food">
            <ProductGrid products={filterProducts("food")} onProductSelect={setSelectedProduct} />
          </TabsContent>

          <TabsContent value="snacks">
            <ProductGrid products={filterProducts("snacks")} onProductSelect={setSelectedProduct} />
          </TabsContent>

          <TabsContent value="history">
            <PurchaseHistory purchases={purchaseHistory} />
          </TabsContent>
        </Tabs>

        <div className="mt-8">
          <div className="rounded-lg border-2 border-dashed border-primary/20 bg-primary/5 p-6">
            <div className="flex flex-col items-center text-center">
              <MascotIcon className="mb-4 h-12 w-12" />
              <h3 className="mb-2 text-lg font-bold">How It Works</h3>
              <p className="mb-6 text-muted-foreground">
                Earn points by maintaining good attendance and redeem them for cafeteria items!
              </p>

              <div className="grid gap-6 md:grid-cols-3 w-full max-w-3xl">
                <div className="rounded-lg border p-4 text-center">
                  <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                    <Badge className="h-6 w-6 rounded-full bg-primary text-white">1</Badge>
                  </div>
                  <h3 className="mb-1 font-medium">Earn Points</h3>
                  <p className="text-sm text-muted-foreground">Maintain attendance streaks and earn points</p>
                </div>

                <div className="rounded-lg border p-4 text-center">
                  <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                    <Badge className="h-6 w-6 rounded-full bg-primary text-white">2</Badge>
                  </div>
                  <h3 className="mb-1 font-medium">Browse Shop</h3>
                  <p className="text-sm text-muted-foreground">Choose from a variety of cafeteria items</p>
                </div>

                <div className="rounded-lg border p-4 text-center">
                  <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                    <Badge className="h-6 w-6 rounded-full bg-primary text-white">3</Badge>
                  </div>
                  <h3 className="mb-1 font-medium">Redeem Rewards</h3>
                  <p className="text-sm text-muted-foreground">Use your points to get food and drinks</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </CardContent>

      <AnimatePresence>
        {selectedProduct && (
          <ProductModal
            product={selectedProduct}
            onClose={() => setSelectedProduct(null)}
            onAddToCart={(product) => {
              addToCart(product)
              setSelectedProduct(null)
            }}
            userPoints={points}
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isCartOpen && (
          <CartDrawer
            cart={cart}
            points={points}
            onClose={() => setIsCartOpen(false)}
            onRemoveFromCart={removeFromCart}
            onPurchase={purchaseCart}
          />
        )}
      </AnimatePresence>
    </Card>
  )
}

