"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import ProductCard from "@/components/ProductCard";
import { getProductsByCategory } from "@/data/products";

export default function SetoviPage() {
  const sets = getProductsByCategory("set");

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Setovi</h1>
        <p className="mt-2 max-w-2xl text-muted-foreground">
          Kompletni setovi za terase i dvorišta. Jedna paleta, jedna dostava,
          jedna cena. Uštedite do 15% u odnosu na pojedinačnu kupovinu.
        </p>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {sets.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      {/* Upsell */}
      <div className="mt-16 rounded-xl border border-border bg-secondary/50 p-8 text-center">
        <h2 className="text-2xl font-bold">Nedostaje vam klupa?</h2>
        <p className="mt-2 text-muted-foreground">
          Dodajte LINEA Klupu 120 uz bilo koji set za kompletnu terasu.
        </p>
        <Button asChild className="mt-4" variant="outline">
          <Link href="/proizvodi/linea-klupa-120">
            Pogledajte klupu
            <ArrowRight className="ml-1 h-4 w-4" />
          </Link>
        </Button>
      </div>

      {/* B2B note */}
      <div className="mt-8 rounded-xl border border-amber-200 bg-amber-50 p-6">
        <h3 className="font-semibold text-amber-900">Za veće porudžbine</h3>
        <p className="mt-1 text-sm text-amber-800">
          Opremite kafić, restoran ili hotel. Za 10+ komada kontaktirajte nas za
          posebne uslove i cene.
        </p>
        <Button
          asChild
          size="sm"
          className="mt-3 bg-amber-700 text-white hover:bg-amber-800"
        >
          <Link href="/kontakt?tip=b2b">Zatražite B2B ponudu</Link>
        </Button>
      </div>
    </div>
  );
}
