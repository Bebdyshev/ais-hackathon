"use client"

import { useState } from "react"
import { MainLayout } from "@/components/layout/main-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Search, Coffee, Pizza, ShoppingBag, Clock } from "lucide-react"
import { MascotIcon } from "@/components/ui/mascot-icon"
import { ShopItem } from "@/components/shop/shop-item"
import type { ShopItemType } from "@/components/shop/type"
import { PurchaseHistory } from "@/components/shop/purchase-history"
import { usePoints } from "@/context/points-context"

export default function ShopPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const { points, updatePoints } = usePoints()

  // Mock user data
  const user = {
    name: "Berdyshev Kerey",
    email: "kerey@student.edu",
    role: "student" as const,
    avatar: "/placeholder.svg?height=40&width=40",
  }

  // Mock shop items data
  const shopItems: ShopItemType[] = [
    {
      id: "1",
      name: "Coffee",
      description: "Hot coffee to keep you energized",
      category: "drinks",
      points: 50,
      image: "https://images.pexels.com/photos/312418/pexels-photo-312418.jpeg?cs=srgb&dl=pexels-chevanon-312418.jpg&fm=jpg",
      available: true,
    },
    {
      id: "2",
      name: "Tea",
      description: "Relaxing herbal tea",
      category: "drinks",
      points: 40,
      image: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/Chai_%28Tea%29_2.jpg/1200px-Chai_%28Tea%29_2.jpg",
      available: true,
    },
    {
      id: "3",
      name: "Smoothie",
      description: "Fresh fruit smoothie",
      category: "drinks",
      points: 80,
      image: "https://images.pexels.com/photos/775030/pexels-photo-775030.jpeg?cs=srgb&dl=pexels-element5-775030.jpg&fm=jpg",
      available: true,
    },
    {
      id: "4",
      name: "Sandwich",
      description: "Freshly made sandwich",
      category: "food",
      points: 100,
      image: "https://www.southernliving.com/thmb/UW4kKKL-_M3WgP7pkL6Pb6lwcgM=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/Ham_Sandwich_011-1-49227336bc074513aaf8fdbde440eafe.jpg",
      available: true,
    },
    {
      id: "5",
      name: "Pizza Slice",
      description: "Delicious pizza slice",
      category: "food",
      points: 120,
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQtX81t43rTWw3K0CyWNNxWy0pgfNey1iKVHQ&s",
      available: true,
    },
    {
      id: "6",
      name: "Salad",
      description: "Healthy garden salad",
      category: "food",
      points: 90,
      image: "https://www.tasteofhome.com/wp-content/uploads/2025/02/Favorite-Mediterranean-Salad_EXPS_TOHcom25_41556_MD_P2_02_05_1b.jpg",
      available: true,
    },
    {
      id: "7",
      name: "Chocolate Bar",
      description: "Sweet treat for a quick energy boost",
      category: "snacks",
      points: 60,
      image: "https://static01.nyt.com/images/2025/01/23/multimedia/23DUBAI-CHOCOLATE-REX-Pistachio-Chocolate-Bar-wpck/21DUBAI-CHOCOLATE-REX-Pistachio-Chocolate-Bar-wpck-videoSixteenByNineJumbo1600.jpg",
      available: true,
    },
    {
      id: "8",
      name: "Fruit Cup",
      description: "Fresh seasonal fruits",
      category: "snacks",
      points: 70,
      image: "https://onesweetappetite.com/wp-content/uploads/2022/01/Rainbow-Fruit-Cups-7.jpg",
      available: true,
    },
    {
      id: "9",
      name: "Chips",
      description: "Crunchy potato chips",
      category: "snacks",
      points: 50,
      image: "https://assets.bonappetit.com/photos/6346eb04a5623aca83a635e3/1:1/w_2671,h_2671,c_limit/1012-easy-apps-chips-lede.jpg",
      available: false,
    },
  ]

  // Mock purchase history
  const [purchaseHistory, setPurchaseHistory] = useState([
    {
      id: "p1",
      itemName: "Coffee",
      points: 50,
      date: "Apr 4, 2025",
      time: "10:15 AM",
    },
    {
      id: "p2",
      itemName: "Sandwich",
      points: 100,
      date: "Apr 2, 2025",
      time: "12:30 PM",
    },
  ])

  const handlePurchase = (item: ShopItemType) => {
    if (points >= item.points) {
      // Deduct points
      updatePoints(points - item.points)

      // Add to purchase history
      const newPurchase = {
        id: `p${Date.now()}`,
        itemName: item.name,
        points: item.points,
        date: new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }),
        time: new Date().toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" }),
      }

      setPurchaseHistory([newPurchase, ...purchaseHistory])
    }
  }

  // Filter items based on search and tab
  const filterItems = (items: ShopItemType[], category: string) => {
    return items.filter(
      (item) =>
        (category === "all" || item.category === category) &&
        item.name.toLowerCase().includes(searchQuery.toLowerCase()),
    )
  }

  return (
    <MainLayout user={user}>
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Rewards Shop</h1>
          <p className="text-muted-foreground">Spend your attendance points on cafeteria items</p>
        </div>
        <div className="flex items-center gap-2 rounded-full bg-secondary px-4 py-2 text-secondary-foreground">
          <MascotIcon className="h-5 w-5" />
          <span className="text-sm font-medium">{points} Points Available</span>
        </div>
      </div>

      <div className="mb-6">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2">
              <ShoppingBag className="h-5 w-5" />
              Cafeteria Shop
            </CardTitle>
            <CardDescription>Redeem your points for food, drinks, and snacks</CardDescription>
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
                  Snacks
                </TabsTrigger>
                <TabsTrigger value="history" className="rounded-lg">
                  <Clock className="mr-2 h-4 w-4" />
                  History
                </TabsTrigger>
              </TabsList>

              <TabsContent value="all">
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                  {filterItems(shopItems, "all").map((item) => (
                    <ShopItem key={item.id} item={item} userPoints={points} onPurchase={handlePurchase} />
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="drinks">
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                  {filterItems(shopItems, "drinks").map((item) => (
                    <ShopItem key={item.id} item={item} userPoints={points} onPurchase={handlePurchase} />
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="food">
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                  {filterItems(shopItems, "food").map((item) => (
                    <ShopItem key={item.id} item={item} userPoints={points} onPurchase={handlePurchase} />
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="snacks">
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                  {filterItems(shopItems, "snacks").map((item) => (
                    <ShopItem key={item.id} item={item} userPoints={points} onPurchase={handlePurchase} />
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="history">
                <PurchaseHistory purchases={purchaseHistory} />
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MascotIcon className="h-5 w-5" />
            How It Works
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-6 md:grid-cols-3">
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
        </CardContent>
      </Card>
    </MainLayout>
  )
}

