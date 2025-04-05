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
  
  export const products: Product[] = [
    {
      id: "p1",
      name: "Fuse Tea",
      description: "A sleek and modern desk lamp with adjustable brightness and color temperature.",
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
      description: "Handcrafted ceramic coffee set including 4 cups and a matching pour-over dripper.",
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
      description: "Soft linen throw pillow with minimalist pattern design.",
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
      description: "Modern wooden wall clock with silent movement.",
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
      description: "Minimalist concrete planter perfect for succulents.",
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
      description: "Set of 3 minimalist glass vases in varying sizes.",
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
      description: "Desk organizer made from sustainable bamboo.",
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
      description: "Set of 4 marble coasters with cork backing.",
      price: 38,
      image:
        "https://cc.kz/upload/iblock/11e/11e6e2c82bbf0be986caf712cd13a8f9.jpg",
      category: "snacks",
      available: true,
      points: 100,
    },
  ]