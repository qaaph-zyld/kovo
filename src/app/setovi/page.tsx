"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import ProductCard from "@/components/ProductCard";
import { getProductsByCategory } from "@/data/products";

export default function SetoviPage() {
  const sets = getProductsByCategory("set");

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8 lg:py-20">
      <div className="mb-10">
        <p className="mb-2 text-xs font-semibold uppercase tracking-[0.15em] text-forge-amber">
          Kompletna rešenja
        </p>
        <h1 className="font-display text-3xl tracking-tight sm:text-4xl">Setovi</h1>
        <p className="mt-3 max-w-2xl text-muted-foreground">
          Kompletni setovi za terase i dvorišta. Jedna paleta, jedna dostava,
          jedna cena. Uštedite do 15% u odnosu na pojedinačnu kupovinu.
        </p>
      </div>

      <div className="grid gap-7 sm:grid-cols-2 lg:grid-cols-3">
        {sets.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      {/* Upsell */}
      <div className="mt-20 rounded-2xl border border-border/50 bg-workshop-gray p-8 text-center sm:p-10">
        <h2 className="font-display text-2xl tracking-tight">Nedostaje vam klupa?</h2>
        <p className="mt-2 text-muted-foreground">
          Dodajte LINEA Klupu 120 uz bilo koji set za kompletnu terasu.
        </p>
        <Button asChild className="mt-5 px-8" variant="outline">
          <Link href="/proizvodi/linea-klupa-120">
            Pogledajte klupu
            <ArrowRight className="ml-1 h-4 w-4" />
          </Link>
        </Button>
      </div>

      {/* B2B note */}
      <div className="mt-8 rounded-2xl border border-forge-amber/20 bg-forge-amber/5 p-7">
        <h3 className="font-semibold tracking-tight text-foreground">Za veće porudžbine</h3>
        <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
          Opremite kafić, restoran ili hotel. Za 10+ komada kontaktirajte nas za
          posebne uslove i cene.
        </p>
        <Button
          asChild
          size="sm"
          className="mt-4 bg-forge-amber font-semibold text-white hover:bg-forge-amber-light"
        >
          <Link href="/kontakt?tip=b2b">Zatražite B2B ponudu</Link>
        </Button>
      </div>
    </div>
  );
}
