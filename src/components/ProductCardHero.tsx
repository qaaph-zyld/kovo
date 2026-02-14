"use client";

import Link from "next/link";
import Image from "next/image";
import { Clock, Layers, Puzzle, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Product, formatPrice } from "@/data/products";
import { useCartStore } from "@/store/cart";

interface ProductCardHeroProps {
  product: Product;
}

export default function ProductCardHero({ product }: ProductCardHeroProps) {
  const addItem = useCartStore((s) => s.addItem);

  return (
    <div className="group overflow-hidden rounded-xl border border-border/50 bg-card transition-all duration-300 hover:shadow-warm-lg sm:col-span-2 lg:col-span-3">
      <div className="grid md:grid-cols-2">
        {/* Image — left side */}
        <Link href={`/proizvodi/${product.slug}`} className="relative block">
          <div className="relative aspect-[4/3] overflow-hidden bg-workshop-gray md:aspect-auto md:h-full md:min-h-[320px]">
            <Image
              src={product.images[0]}
              alt={product.name}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
              sizes="(max-width: 768px) 100vw, 50vw"
              priority
            />
            {product.originalPrice && (
              <Badge className="absolute left-4 top-4 bg-forge-amber font-semibold text-white">
                -{Math.round((1 - product.price / product.originalPrice) * 100)}%
              </Badge>
            )}
            {product.stackable && (
              <Badge
                variant="secondary"
                className="absolute right-4 top-4 gap-1 border border-border/40 bg-card/90 text-xs backdrop-blur-sm"
              >
                <Layers className="h-3 w-3" />
                Slaganje do {product.stackable}
              </Badge>
            )}
          </div>
        </Link>

        {/* Content — right side */}
        <div className="flex flex-col justify-center p-7 sm:p-8 md:p-10">
          <Badge className="mb-4 w-fit border border-forge-amber/30 bg-forge-amber/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.1em] text-forge-amber hover:bg-forge-amber/15">
            Preporučujemo
          </Badge>

          <Link href={`/proizvodi/${product.slug}`}>
            <h3 className="font-display text-2xl leading-tight tracking-tight transition-colors group-hover:text-forge-amber sm:text-3xl">
              {product.name}
            </h3>
            <p className="mt-3 line-clamp-3 text-base leading-relaxed text-muted-foreground">
              {product.shortDescription}
            </p>
          </Link>

          {product.modularHighlight && (
            <div className="mt-4 inline-flex items-center gap-2 rounded-md border border-forge-amber/20 bg-forge-amber/5 px-3 py-1.5">
              <Puzzle className="h-3.5 w-3.5 text-forge-amber" />
              <span className="text-xs font-semibold text-forge-amber">
                {product.modularHighlight}
              </span>
            </div>
          )}

          <div className="mt-4 flex items-center gap-4 text-xs text-muted-foreground">
            <span className="flex items-center gap-1">
              <Clock className="h-3 w-3 text-forge-amber/60" />
              {product.assemblyTime} min
            </span>
            <span className="font-mono text-[11px]">
              {product.dimensions.width}×{product.dimensions.depth}×{product.dimensions.height}cm
            </span>
            <span className="font-mono text-[11px]">{product.weight}kg</span>
          </div>

          <div className="mt-5 flex items-baseline gap-2">
            <span className="font-mono text-2xl font-bold tracking-tight">{formatPrice(product.price)}</span>
            {product.originalPrice && (
              <span className="font-mono text-sm text-muted-foreground line-through">
                {formatPrice(product.originalPrice)}
              </span>
            )}
          </div>

          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            <Button
              className="bg-iron-black font-semibold text-white transition-all duration-200 hover:bg-forge-amber active:scale-[0.98]"
              onClick={() => addItem(product)}
            >
              Dodaj u korpu
            </Button>
            <Button asChild variant="outline" className="border-border/60 hover:border-forge-amber/40 hover:text-forge-amber">
              <Link href={`/proizvodi/${product.slug}`}>
                Detaljnije
                <ArrowRight className="ml-1 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
