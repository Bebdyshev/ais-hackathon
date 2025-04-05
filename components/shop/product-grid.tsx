"use client"

import { motion } from "motion/react"
import Image from "next/image"
import { Badge } from "@/components/ui/badge"
import type { Product } from "@/components/shop/types"

interface ProductGridProps {
  products: Product[]
  onProductSelect: (product: Product) => void
}

export function ProductGrid({ products, onProductSelect }: ProductGridProps) {
  if (products.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center rounded-lg border border-dashed p-8 text-center">
        <p className="text-muted-foreground">No items found matching your search.</p>
      </div>
    )
  }

  return (
    <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {products.map((product) => (
        <motion.div
          key={product.id}
          layoutId={`product-${product.id}`}
          className="group cursor-pointer overflow-hidden rounded-xl border border-border transition-all hover:border-primary hover:shadow-md"
          whileHover={{ y: -4 }}
          transition={{ duration: 0.2 }}
          onClick={() => onProductSelect(product)}
        >
          <div className="relative aspect-square overflow-hidden bg-muted">
            <Image
              src={product.image || "/placeholder.svg"}
              alt={product.name}
              fill
              className="object-cover object-center transition-transform duration-300 group-hover:scale-105"
            />
            <Badge className="absolute right-2 top-2 bg-primary text-white">{product.price} points</Badge>
          </div>
          <div className="p-4">
            <h3 className="mb-1 font-bold">{product.name}</h3>
            <p className="line-clamp-2 text-sm text-muted-foreground">{product.description}</p>
            <div className="mt-2 flex items-center justify-between">
              <Badge variant="outline" className="text-xs">
                {product.category}
              </Badge>
              <span className="text-xs text-muted-foreground">Click to view</span>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  )
}

