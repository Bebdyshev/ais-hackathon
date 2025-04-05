export interface Product {
  id: string
  name: string
  description: string
  price: number
  image: string
  category: string
  available: boolean
}

export interface CartItem extends Product {
  quantity: number
}

export type ShopItemType = Product

export const cafeteriaProducts: Product[] = [
  {
    id: "c1",
    name: "Coffee",
    description: "Hot coffee to keep you energized throughout the day.",
    price: 50,
    image:
      "https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    category: "drinks",
    available: true,
  },
  {
    id: "c2",
    name: "Tea",
    description: "Relaxing herbal tea to help you focus.",
    price: 40,
    image:
      "https://images.unsplash.com/photo-1576092768241-dec231879fc3?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    category: "drinks",
    available: true,
  },
  {
    id: "c3",
    name: "Fruit Smoothie",
    description: "Fresh fruit smoothie made with seasonal fruits.",
    price: 80,
    image: "https://www.acouplecooks.com/wp-content/uploads/2020/11/Chia-Seed-Smoothie-004.jpg",
    category: "drinks",
    available: true,
  },
  {
    id: "c4",
    name: "Sandwich",
    description: "Freshly made sandwich with your choice of fillings.",
    price: 100,
    image:
      "https://images.unsplash.com/photo-1528735602780-2552fd46c7af?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    category: "food",
    available: true,
  },
  {
    id: "c5",
    name: "Pizza Slice",
    description: "Delicious pizza slice with cheese and toppings.",
    price: 120,
    image:
      "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    category: "food",
    available: true,
  },
  {
    id: "c6",
    name: "Fresh Salad",
    description: "Healthy garden salad with seasonal vegetables.",
    price: 90,
    image:
      "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    category: "food",
    available: true,
  },
  {
    id: "c7",
    name: "Chocolate Bar",
    description: "Sweet treat for a quick energy boost.",
    price: 60,
    image:
      "https://images.unsplash.com/photo-1606312619070-d48b4c652a52?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    category: "snacks",
    available: true,
  },
  {
    id: "c8",
    name: "Fruit Cup",
    description: "Fresh seasonal fruits cut into bite-sized pieces.",
    price: 70,
    image:
      "https://images.unsplash.com/photo-1490474418585-ba9bad8fd0ea?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    category: "snacks",
    available: true,
  },
  {
    id: "c9",
    name: "Potato Chips",
    description: "Crunchy potato chips in various flavors.",
    price: 50,
    image:
      "https://images.unsplash.com/photo-1566478989037-eec170784d0b?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    category: "snacks",
    available: true,
  },
  {
    id: "c10",
    name: "Yogurt Parfait",
    description: "Creamy yogurt with granola and fresh berries.",
    price: 85,
    image:
      "https://images.unsplash.com/photo-1488477181946-6428a0291777?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    category: "snacks",
    available: true,
  },
  {
    id: "c11",
    name: "Muffin",
    description: "Freshly baked muffin in various flavors.",
    price: 65,
    image:
      "https://images.unsplash.com/photo-1607958996333-41aef7caefaa?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    category: "snacks",
    available: true,
  },
  {
    id: "c12",
    name: "Pasta Bowl",
    description: "Delicious pasta with your choice of sauce.",
    price: 130,
    image:
      "https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    category: "food",
    available: true,
  },
]

