"use client";

import Link from "next/link";
import Image from "next/image";
import { Clock, Layers, Puzzle } from "lucide-react";
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
    <div className="group overflow-hidden rounded-xl border border-border/50 bg-card transition-all duration-300 hover:-translate-y-1.5 hover:shadow-warm-lg focus-within:ring-2 focus-within:ring-forge-amber/50 focus-within:ring-offset-2">
      <Link href={`/proizvodi/${product.slug}`} className="outline-none">
        <div className="relative aspect-[4/3] overflow-hidden bg-workshop-gray">
          <Image
            src={product.images[0]}
            alt={`Fotografija proizvoda: ${product.name} - ${product.shortDescription}`}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
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
              <Layers className="h-3 w-3" aria-hidden="true" />
              Slaganje do {product.stackable}
            </Badge>
          )}
        </div>
      </Link>
      <div className="p-6">
        <Link href={`/proizvodi/${product.slug}`} className="outline-none focus-visible:underline">
          <h3 className="font-display text-xl font-semibold leading-tight transition-colors group-hover:text-forge-amber">
            {product.name}
          </h3>
          <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-muted-foreground">
            {product.shortDescription}
          </p>
        </Link>

        {product.modularHighlight && (
          <div className="mt-3 inline-flex items-center gap-1.5 rounded-md border border-forge-amber/20 bg-forge-amber/5 px-2 py-1">
            <Puzzle className="h-3 w-3 text-forge-amber" aria-hidden="true" />
            <span className="text-[10px] font-semibold text-forge-amber">
              {product.modularHighlight}
            </span>
          </div>
        )}

        <div className="mt-4 flex items-center gap-3 text-xs text-muted-foreground">
          <span className="flex items-center gap-1">
            <Clock className="h-3 w-3 text-forge-amber/60" aria-label="Vreme montaže" />
            {product.assemblyTime} min
          </span>
          <span className="font-mono text-[11px]" aria-label="Dimenzije">
            {product.dimensions.width}×{product.dimensions.depth}×{product.dimensions.height}cm
          </span>
          <span className="font-mono text-[11px]" aria-label="Težina">{product.weight}kg</span>
        </div>

        <div className="mt-5 flex items-center justify-between">
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
          className="mt-5 w-full bg-iron-black font-semibold text-white transition-all duration-200 hover:bg-forge-amber active:scale-[0.98]"
          onClick={() => addItem(product)}
          aria-label={`Dodaj ${product.name} u korpu`}
        >
          Dodaj u korpu
        </Button>
      </div>
    </div>
  );
}
