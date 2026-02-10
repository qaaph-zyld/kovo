"use client";

import Link from "next/link";
import {
  Package,
  Clock,
  Layers,
  Weight,
  Ruler,
  ShoppingCart,
  Minus,
  Plus,
  CheckCircle2,
} from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Product, getProductById, formatPrice } from "@/data/products";
import { useCartStore } from "@/store/cart";

interface ProductDetailProps {
  product: Product;
}

export default function ProductDetail({ product }: ProductDetailProps) {
  const addItem = useCartStore((s) => s.addItem);
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);

  const handleAddToCart = () => {
    addItem(product, quantity);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      {/* Breadcrumb */}
      <nav className="mb-6 flex items-center gap-2 text-sm text-muted-foreground">
        <Link href="/" className="hover:text-foreground">
          Početna
        </Link>
        <span>/</span>
        <Link href="/proizvodi" className="hover:text-foreground">
          Proizvodi
        </Link>
        <span>/</span>
        <span className="text-foreground">{product.name}</span>
      </nav>

      <div className="grid gap-10 lg:grid-cols-2">
        {/* Image area */}
        <div className="relative aspect-square overflow-hidden rounded-xl bg-secondary">
          <div className="flex h-full items-center justify-center text-muted-foreground/20">
            <Package className="h-32 w-32" />
          </div>
          {product.originalPrice && (
            <Badge className="absolute left-4 top-4 bg-amber-700 text-white">
              -{Math.round((1 - product.price / product.originalPrice) * 100)}%
              ušteda
            </Badge>
          )}
        </div>

        {/* Product info */}
        <div>
          <h1 className="text-3xl font-bold tracking-tight">{product.name}</h1>
          <p className="mt-3 text-lg leading-relaxed text-muted-foreground">
            {product.description}
          </p>

          {/* Price */}
          <div className="mt-6">
            <span className="text-3xl font-bold">
              {formatPrice(product.price)}
            </span>
            {product.originalPrice && (
              <span className="ml-3 text-lg text-muted-foreground line-through">
                {formatPrice(product.originalPrice)}
              </span>
            )}
          </div>

          {/* Specs badges */}
          <div className="mt-6 flex flex-wrap gap-3">
            <div className="flex items-center gap-1.5 rounded-md bg-secondary px-3 py-1.5 text-sm">
              <Clock className="h-4 w-4 text-amber-700" />
              Montaža: {product.assemblyTime} min
            </div>
            <div className="flex items-center gap-1.5 rounded-md bg-secondary px-3 py-1.5 text-sm">
              <Ruler className="h-4 w-4 text-amber-700" />
              {product.dimensions.width}×{product.dimensions.depth}×
              {product.dimensions.height} cm
            </div>
            <div className="flex items-center gap-1.5 rounded-md bg-secondary px-3 py-1.5 text-sm">
              <Weight className="h-4 w-4 text-amber-700" />
              {product.weight} kg
            </div>
            {product.stackable && (
              <div className="flex items-center gap-1.5 rounded-md bg-secondary px-3 py-1.5 text-sm">
                <Layers className="h-4 w-4 text-amber-700" />
                Slaganje do {product.stackable}
              </div>
            )}
            {product.kdParts && (
              <div className="flex items-center gap-1.5 rounded-md bg-secondary px-3 py-1.5 text-sm">
                <Package className="h-4 w-4 text-amber-700" />
                KD: {product.kdParts} dela
              </div>
            )}
          </div>

          <Separator className="my-6" />

          {/* Bundle contents */}
          {product.bundleItems && product.bundleItems.length > 0 && (
            <div className="mb-6">
              <h3 className="mb-3 font-semibold">Sadržaj seta:</h3>
              <ul className="space-y-2">
                {product.bundleItems.map((item) => {
                  const bundledProduct = getProductById(item.productId);
                  return bundledProduct ? (
                    <li
                      key={item.productId}
                      className="flex items-center gap-2 text-sm"
                    >
                      <CheckCircle2 className="h-4 w-4 text-green-600" />
                      {item.quantity}× {bundledProduct.name}
                      <span className="text-muted-foreground">
                        ({formatPrice(bundledProduct.price)} pojedinačno)
                      </span>
                    </li>
                  ) : null;
                })}
              </ul>
            </div>
          )}

          {/* Modules */}
          {product.modules.length > 0 && (
            <div className="mb-6">
              <h3 className="mb-3 font-semibold">Šta je u paketu:</h3>
              <div className="grid gap-2 sm:grid-cols-2">
                {product.modules.map((mod) => (
                  <div
                    key={mod.name}
                    className="rounded-lg border border-border/60 p-3"
                  >
                    <p className="text-sm font-medium">{mod.name}</p>
                    <p className="text-xs text-muted-foreground">
                      {mod.description}
                    </p>
                  </div>
                ))}
                <div className="rounded-lg border border-border/60 p-3">
                  <p className="text-sm font-medium">Kesica sa priborom</p>
                  <p className="text-xs text-muted-foreground">
                    Šrafovi, imbus ključ, QR uputstvo
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Add to cart */}
          <div className="flex flex-col gap-3 sm:flex-row">
            <div className="flex items-center rounded-md border border-border">
              <Button
                variant="ghost"
                size="icon"
                className="h-10 w-10"
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
              >
                <Minus className="h-4 w-4" />
              </Button>
              <span className="w-12 text-center font-medium">{quantity}</span>
              <Button
                variant="ghost"
                size="icon"
                className="h-10 w-10"
                onClick={() => setQuantity(quantity + 1)}
              >
                <Plus className="h-4 w-4" />
              </Button>
            </div>
            <Button
              size="lg"
              className="flex-1 bg-amber-700 text-white hover:bg-amber-800"
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
                  Dodaj u korpu — {formatPrice(product.price * quantity)}
                </>
              )}
            </Button>
          </div>

          {/* Delivery note */}
          <p className="mt-4 text-xs text-muted-foreground">
            Besplatno lično preuzimanje u Loznici. Kurirska ili paletna dostava
            širom Srbije — cena se obračunava pri naručivanju.
          </p>
        </div>
      </div>
    </div>
  );
}
