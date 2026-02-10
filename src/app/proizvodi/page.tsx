"use client";

import { useState } from "react";
import { Filter } from "lucide-react";
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
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Proizvodi</h1>
        <p className="mt-2 text-muted-foreground">
          LINEA kolekcija — modularni kovani nameštaj za terase i dvorišta
        </p>
      </div>

      {/* Filters */}
      <div className="mb-8 flex flex-wrap items-center gap-2">
        <Filter className="mr-1 h-4 w-4 text-muted-foreground" />
        {categories.map((cat) => (
          <Button
            key={cat.value}
            variant={activeCategory === cat.value ? "default" : "outline"}
            size="sm"
            onClick={() => setActiveCategory(cat.value)}
            className={
              activeCategory === cat.value
                ? "bg-zinc-900 text-white hover:bg-zinc-800"
                : ""
            }
          >
            {cat.label}
          </Button>
        ))}
      </div>

      {/* Product grid */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="py-20 text-center text-muted-foreground">
          Nema proizvoda u ovoj kategoriji.
        </div>
      )}
    </div>
  );
}
