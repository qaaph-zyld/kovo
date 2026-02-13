"use client";

import Link from "next/link";
import Image from "next/image";
import {
  Clock,
  Layers,
  Weight,
  Ruler,
  ShoppingCart,
  Minus,
  Plus,
  CheckCircle2,
  Package,
  Puzzle,
} from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Product, getProductById, formatPrice } from "@/data/products";
import { useCartStore } from "@/store/cart";
import ModuleExplodedView from "@/components/ModuleExplodedView";
import ModuleConfigurator from "@/components/ModuleConfigurator";
import SharedPartsStrip from "@/components/SharedPartsStrip";
import ReplacementParts from "@/components/ReplacementParts";

interface ProductDetailProps {
  product: Product;
}

export default function ProductDetail({ product }: ProductDetailProps) {
  const addItem = useCartStore((s) => s.addItem);
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);
  const [activeImage, setActiveImage] = useState(0);

  const handleAddToCart = () => {
    addItem(product, quantity);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 sm:py-16 lg:px-8 lg:py-20">
      {/* Breadcrumb */}
      <nav className="mb-8 flex items-center gap-2 text-sm text-muted-foreground">
        <Link href="/" className="transition-colors hover:text-foreground">
          Početna
        </Link>
        <span className="text-border">/</span>
        <Link href="/proizvodi" className="transition-colors hover:text-foreground">
          Proizvodi
        </Link>
        <span className="text-border">/</span>
        <span className="text-foreground">{product.name}</span>
      </nav>

      <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
        {/* Image area */}
        <div className="space-y-3">
          <div className="relative aspect-square overflow-hidden rounded-xl bg-workshop-gray">
            <Image
              src={product.images[activeImage]}
              alt={`${product.name} — fotografija ${activeImage + 1}`}
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
              priority
            />
            {product.originalPrice && (
              <Badge className="absolute left-4 top-4 bg-forge-amber px-3 py-1 font-semibold text-white">
                -{Math.round((1 - product.price / product.originalPrice) * 100)}%
                ušteda
              </Badge>
            )}
          </div>
          {product.images.length > 1 && (
            <div className="flex gap-2">
              {product.images.map((img, i) => (
                <button
                  key={img}
                  onClick={() => setActiveImage(i)}
                  className={`relative aspect-square w-20 overflow-hidden rounded-xl border-2 transition-all ${
                    i === activeImage
                      ? "border-forge-amber shadow-warm"
                      : "border-border/50 opacity-60 hover:opacity-100"
                  }`}
                >
                  <Image
                    src={img}
                    alt={`${product.name} — thumbnail ${i + 1}`}
                    fill
                    className="object-cover"
                    sizes="80px"
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Product info */}
        <div>
          <p className="mb-2 text-xs font-semibold uppercase tracking-[0.15em] text-forge-amber">
            LINEA Kolekcija
          </p>
          <h1 className="font-display text-3xl tracking-tight sm:text-4xl">{product.name}</h1>

          {/* Modular highlight badge */}
          {product.modularHighlight && (
            <div className="mt-3 inline-flex items-center gap-2 rounded-lg border border-forge-amber/20 bg-forge-amber/5 px-3 py-1.5">
              <Puzzle className="h-3.5 w-3.5 text-forge-amber" />
              <span className="text-xs font-semibold text-forge-amber">
                {product.modularHighlight}
              </span>
            </div>
          )}

          <p className="mt-4 text-base leading-relaxed text-muted-foreground">
            {product.description}
          </p>

          {/* Price */}
          <div className="mt-6">
            <span className="font-mono text-3xl font-bold tracking-tight">
              {formatPrice(product.price)}
            </span>
            {product.originalPrice && (
              <span className="ml-3 font-mono text-lg text-muted-foreground line-through">
                {formatPrice(product.originalPrice)}
              </span>
            )}
          </div>

          {/* Specs badges */}
          <div className="mt-6 flex flex-wrap gap-2.5">
            <div className="flex items-center gap-1.5 rounded-xl border border-border/50 bg-workshop-gray px-3.5 py-2 text-sm">
              <Clock className="h-4 w-4 text-forge-amber" />
              <span className="font-mono text-xs">{product.assemblyTime} min</span>
            </div>
            <div className="flex items-center gap-1.5 rounded-xl border border-border/50 bg-workshop-gray px-3.5 py-2 text-sm">
              <Ruler className="h-4 w-4 text-forge-amber" />
              <span className="font-mono text-xs">{product.dimensions.width}×{product.dimensions.depth}×{product.dimensions.height}cm</span>
            </div>
            <div className="flex items-center gap-1.5 rounded-xl border border-border/50 bg-workshop-gray px-3.5 py-2 text-sm">
              <Weight className="h-4 w-4 text-forge-amber" />
              <span className="font-mono text-xs">{product.weight}kg</span>
            </div>
            {product.stackable && (
              <div className="flex items-center gap-1.5 rounded-xl border border-border/50 bg-workshop-gray px-3.5 py-2 text-sm">
                <Layers className="h-4 w-4 text-forge-amber" />
                <span className="font-mono text-xs">Slaganje ×{product.stackable}</span>
              </div>
            )}
            {product.kdParts && (
              <div className="flex items-center gap-1.5 rounded-xl border border-border/50 bg-workshop-gray px-3.5 py-2 text-sm">
                <Package className="h-4 w-4 text-forge-amber" />
                <span className="font-mono text-xs">KD: {product.kdParts} dela</span>
              </div>
            )}
          </div>

          <Separator className="my-7" />

          {/* Bundle contents */}
          {product.bundleItems && product.bundleItems.length > 0 && (
            <div className="mb-7">
              <h3 className="mb-3 font-semibold tracking-tight">Sadržaj seta:</h3>
              <ul className="space-y-2.5">
                {product.bundleItems.map((item) => {
                  const bundledProduct = getProductById(item.productId);
                  return bundledProduct ? (
                    <li
                      key={item.productId}
                      className="flex items-center gap-2.5 text-sm"
                    >
                      <CheckCircle2 className="h-4 w-4 text-green-600" />
                      <span className="font-medium">{item.quantity}× {bundledProduct.name}</span>
                      <span className="font-mono text-xs text-muted-foreground">
                        ({formatPrice(bundledProduct.price)} pojedinačno)
                      </span>
                    </li>
                  ) : null;
                })}
              </ul>
            </div>
          )}

          {/* Module Configurator (for products with configurable slots) */}
          {product.hasModularAssembly && (
            <div className="mb-7">
              <ModuleConfigurator productId={product.id} basePrice={product.price} />
            </div>
          )}

          {/* Add to cart */}
          <div className="flex flex-col gap-3 sm:flex-row">
            <div className="flex items-center rounded-xl border border-border/60">
              <Button
                variant="ghost"
                size="icon"
                className="h-11 w-11 rounded-l-xl"
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
              >
                <Minus className="h-4 w-4" />
              </Button>
              <span className="w-12 text-center font-mono font-semibold">{quantity}</span>
              <Button
                variant="ghost"
                size="icon"
                className="h-11 w-11 rounded-r-xl"
                onClick={() => setQuantity(quantity + 1)}
              >
                <Plus className="h-4 w-4" />
              </Button>
            </div>
            <Button
              size="lg"
              className="flex-1 bg-forge-amber px-8 font-semibold text-white transition-all duration-200 hover:bg-forge-amber-light hover:scale-[1.01] active:scale-[0.98]"
              onClick={handleAddToCart}
            >
              {added ? (
                <>
                  <CheckCircle2 className="mr-2 h-4 w-4" />
                  Dodato u korpu!
                </>
              ) : (
                <>
                  <ShoppingCart className="mr-2 h-4 w-4" />
                  Dodaj u korpu — <span className="font-mono">{formatPrice(product.price * quantity)}</span>
                </>
              )}
            </Button>
          </div>

          {/* Delivery note */}
          <p className="mt-5 text-xs leading-relaxed text-muted-foreground">
            Besplatno lično preuzimanje u Loznici. Kurirska ili paletna dostava
            širom Srbije — cena se obračunava pri naručivanju.
          </p>
        </div>
      </div>

      {/* Modular system sections — full width below the product */}
      {product.hasModularAssembly && (
        <div className="mt-16 space-y-8">
          <ModuleExplodedView productId={product.id} />
          <div className="grid gap-8 lg:grid-cols-2">
            <SharedPartsStrip productId={product.id} />
            <ReplacementParts productId={product.id} />
          </div>
        </div>
      )}
    </div>
  );
}
