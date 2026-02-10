"use client";

import Link from "next/link";
import { Package, Clock, Layers } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Product, formatPrice } from "@/data/products";
import { useCartStore } from "@/store/cart";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const addItem = useCartStore((s) => s.addItem);

  return (
    <div className="group overflow-hidden rounded-2xl border border-border/50 bg-card transition-all duration-300 hover:-translate-y-1.5 hover:shadow-warm-lg">
      <Link href={`/proizvodi/${product.slug}`}>
        <div className="relative aspect-[4/3] overflow-hidden bg-workshop-gray">
          {/* Geometric placeholder pattern */}
          <div className="absolute inset-0 dot-grid opacity-40" />
          <div className="flex h-full items-center justify-center">
            <Package className="h-14 w-14 text-foreground/10" />
          </div>
          {product.originalPrice && (
            <Badge className="absolute left-3 top-3 bg-forge-amber font-semibold text-white">
              -{Math.round((1 - product.price / product.originalPrice) * 100)}%
            </Badge>
          )}
          {product.stackable && (
            <Badge
              variant="secondary"
              className="absolute right-3 top-3 gap-1 border border-border/40 bg-card/90 text-xs backdrop-blur-sm"
            >
              <Layers className="h-3 w-3" />
              Slaganje do {product.stackable}
            </Badge>
          )}
        </div>
      </Link>
      <div className="p-5">
        <Link href={`/proizvodi/${product.slug}`}>
          <h3 className="font-display text-lg leading-tight transition-colors group-hover:text-forge-amber">
            {product.name}
          </h3>
          <p className="mt-1.5 line-clamp-2 text-sm leading-relaxed text-muted-foreground">
            {product.shortDescription}
          </p>
        </Link>

        <div className="mt-3 flex items-center gap-3 text-xs text-muted-foreground">
          <span className="flex items-center gap-1">
            <Clock className="h-3 w-3 text-forge-amber/60" />
            {product.assemblyTime} min
          </span>
          <span className="font-mono text-[11px]">
            {product.dimensions.width}×{product.dimensions.depth}×{product.dimensions.height}cm
          </span>
          <span className="font-mono text-[11px]">{product.weight}kg</span>
        </div>

        <div className="mt-4 flex items-center justify-between">
          <div className="flex items-baseline gap-2">
            <span className="font-mono text-lg font-bold tracking-tight">{formatPrice(product.price)}</span>
            {product.originalPrice && (
              <span className="font-mono text-xs text-muted-foreground line-through">
                {formatPrice(product.originalPrice)}
              </span>
            )}
          </div>
        </div>

        <Button
          className="mt-4 w-full bg-iron-black font-semibold text-white transition-all duration-200 hover:bg-forge-amber active:scale-[0.98]"
          onClick={() => addItem(product)}
        >
          Dodaj u korpu
        </Button>
      </div>
    </div>
  );
}
