"use client";

import Link from "next/link";
import { Package, Clock, Layers } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Product, formatPrice } from "@/data/products";
import { useCartStore } from "@/store/cart";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const addItem = useCartStore((s) => s.addItem);

  return (
    <Card className="group overflow-hidden border-border/60 transition-shadow hover:shadow-lg">
      <Link href={`/proizvodi/${product.slug}`}>
        <div className="relative aspect-[4/3] overflow-hidden bg-secondary">
          <div className="flex h-full items-center justify-center text-muted-foreground/30">
            <Package className="h-16 w-16" />
          </div>
          {product.originalPrice && (
            <Badge className="absolute left-3 top-3 bg-amber-700 text-white">
              -{Math.round((1 - product.price / product.originalPrice) * 100)}%
            </Badge>
          )}
          {product.stackable && (
            <Badge
              variant="secondary"
              className="absolute right-3 top-3 gap-1 bg-white/90 text-xs"
            >
              <Layers className="h-3 w-3" />
              Slaganje do {product.stackable}
            </Badge>
          )}
        </div>
      </Link>
      <CardContent className="p-4">
        <Link href={`/proizvodi/${product.slug}`}>
          <h3 className="font-semibold leading-tight transition-colors group-hover:text-amber-700">
            {product.name}
          </h3>
          <p className="mt-1 line-clamp-2 text-sm text-muted-foreground">
            {product.shortDescription}
          </p>
        </Link>

        <div className="mt-3 flex items-center gap-3 text-xs text-muted-foreground">
          <span className="flex items-center gap-1">
            <Clock className="h-3 w-3" />
            {product.assemblyTime} min
          </span>
          <span>
            {product.dimensions.width}×{product.dimensions.depth}×{product.dimensions.height} cm
          </span>
          <span>{product.weight} kg</span>
        </div>

        <div className="mt-3 flex items-center justify-between">
          <div>
            <span className="text-lg font-bold">{formatPrice(product.price)}</span>
            {product.originalPrice && (
              <span className="ml-2 text-sm text-muted-foreground line-through">
                {formatPrice(product.originalPrice)}
              </span>
            )}
          </div>
        </div>

        <Button
          className="mt-3 w-full bg-zinc-900 hover:bg-zinc-800"
          onClick={() => addItem(product)}
        >
          Dodaj u korpu
        </Button>
      </CardContent>
    </Card>
  );
}
