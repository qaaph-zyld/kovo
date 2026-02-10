"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import ProductCard from "@/components/ProductCard";
import { products, Product } from "@/data/products";

const categories: { value: Product["category"] | "all"; label: string }[] = [
  { value: "all", label: "Sve" },
  { value: "stolica", label: "Stolice" },
  { value: "sto", label: "Stolovi" },
  { value: "klupa", label: "Klupe" },
  { value: "set", label: "Setovi" },
];

export default function ProizvodiPage() {
  const [activeCategory, setActiveCategory] = useState<
    Product["category"] | "all"
  >("all");

  const filtered =
    activeCategory === "all"
      ? products
      : products.filter((p) => p.category === activeCategory);

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8 lg:py-20">
      <div className="mb-10">
        <p className="mb-2 text-xs font-semibold uppercase tracking-[0.15em] text-forge-amber">
          LINEA Kolekcija
        </p>
        <h1 className="font-display text-3xl tracking-tight sm:text-4xl">Proizvodi</h1>
        <p className="mt-3 max-w-lg text-muted-foreground">
          Modularni kovani nameštaj za terase i dvorišta
        </p>
      </div>

      {/* Filters */}
      <div className="mb-10 flex flex-wrap items-center gap-2">
        {categories.map((cat) => (
          <Button
            key={cat.value}
            variant={activeCategory === cat.value ? "default" : "outline"}
            size="sm"
            onClick={() => setActiveCategory(cat.value)}
            className={
              activeCategory === cat.value
                ? "bg-iron-black text-white hover:bg-forge-amber"
                : "border-border/60 hover:border-forge-amber/40 hover:text-forge-amber"
            }
          >
            {cat.label}
          </Button>
        ))}
      </div>

      {/* Product grid */}
      <div className="grid gap-7 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="py-24 text-center text-muted-foreground">
          Nema proizvoda u ovoj kategoriji.
        </div>
      )}
    </div>
  );
}
