export interface ShopItemType {
    id: string
    name: string
    description: string
    category: string
    points: number
    image: string
    available: boolean
  }
  
  export interface PurchaseType {
    id: string
    itemName: string
    points: number
    date: string
    time: string
  }
  
  