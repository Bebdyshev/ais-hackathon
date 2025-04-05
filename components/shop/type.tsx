export interface Product {
  id: string
  name: string
  description: string
  price: number
  image?: string
  category: string
  available: boolean
  points: number
}

export interface CartItem extends Product {
  quantity: number
}

export type ShopItemType = Product

export const cafeteriaProducts: Product[] = [
  {
    id: "p1",
    name: "Fuse Tea",
    description: "Refreshing iced tea with mango and pineapple flavor.",
    price: 89,
    image:
      "https://www.coca-cola.com/content/dam/onexp/kz/ru/home-images/brands/brand-fusetea/desktop/fusetea-mango-pineapple_d.jpg",
    category: "drinks",
    available: true,
    points: 100,
  },
  {
    id: "p2",
    name: "Capuccino Coffee",
    description: "Rich and creamy cappuccino made with premium coffee beans.",
    price: 65,
    image:
      "https://images.unsplash.com/photo-1517256064527-09c73fc73e38?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    category: "drinks",
    available: true,
    points: 100,
  },
  {
    id: "p3",
    name: "Asu Water",
    description: "Natural mineral water from the mountains.",
    price: 45,
    image:
      "https://img.oe.kz/bitrix-catalog/40526/1720313212-lzoal0g4tjmzrzmthj38onn31jju286t.jpg",
    category: "drinks",
    available: true,
    points: 100,
  },
  {
    id: "p4",
    name: "Samsa",
    description: "Traditional baked pastry with meat filling.",
    price: 79,
    image:
      "https://img.iamcook.ru/2021/upl/recipes/zen/u-906279da5f39acc8d9c27f6fa8295bd4.JPG",
    category: "food",
    available: true,
    points: 100,
  },
  {
    id: "p5",
    name: "Напиток Му FOOD MASTER",
    description: "Traditional fermented dairy drink.",
    price: 34,
    image:
      "https://vkusmart.vmv.kz/upload/iblock/53b/1mbip5vl64ybld6nb1of6r4j35cu7vtn.png",
    category: "drinks",
    available: true,
    points: 100,
  },
  {
    id: "p6",
    name: "Albeni Ulker",
    description: "Delicious chocolate cake with cream filling.",
    price: 55,
    image:
      "https://cc.kz/upload/iblock/2d0/2d044714b087eb597bf6a0a9545e7fff.jpg",
    category: "snacks",
    available: true,  
    points: 100,
  },
  {
    id: "p7",
    name: "Bounty Trio",
    description: "Coconut and chocolate candy bar.",
    price: 42,
    image:
      "https://static.insales-cdn.com/images/products/1/526/301998606/%D0%91%D0%B0%D1%82%D0%BE%D0%BD%D1%87%D0%B8%D0%BA_%D1%88%D0%BE%D0%BA%D0%BE%D0%BB%D0%B0%D0%B4%D0%BD%D1%8B%D0%B9_BOUNTY_%D0%A2%D1%80%D0%B8%D0%BE_82_5_%D0%B3.jpg",
    category: "snacks",
    available: true,
    points: 100,
  },
  {
    id: "p9",
    name: "Snickers",
    description: "Chocolate bar with peanuts, caramel, and nougat.",
    price: 38,
    image:
      "https://cc.kz/upload/iblock/11e/11e6e2c82bbf0be986caf712cd13a8f9.jpg",
    category: "snacks",
    available: true,
    points: 100,
  },
  {
    id: "c1",
    name: "Coffee",
    description: "Hot coffee to keep you energized throughout the day.",
    price: 50,
    image:
      "https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    category: "drinks", 
    available: true,
    points: 100,
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
    points: 100,
  },
  {
    id: "c3",
    name: "Fruit Smoothie",
    description: "Fresh fruit smoothie made with seasonal fruits.",
    price: 80,
    image: "https://www.acouplecooks.com/wp-content/uploads/2020/11/Chia-Seed-Smoothie-004.jpg",
    category: "drinks",
    available: true,
    points: 100,
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
    points: 100,
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
    points: 100,
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
    points: 100,
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
    points: 100,
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
    points: 100,
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
    points: 100,
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
    points: 100,
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
    points: 100,
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
    points: 100,
  },
]
