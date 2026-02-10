import Link from "next/link";
import { Flame, Hammer, Heart, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function ONamaPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      {/* Hero */}
      <div className="mb-16 grid gap-10 lg:grid-cols-2 lg:items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Priča iza <span className="text-amber-700">KOVO</span>
          </h1>
          <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
            KOVO je nastao iz Kovačke radnje Cotrić u Loznici — porodične
            radionice sa dugogodišnjom tradicijom obrade kovanog gvožđa. Svaki
            komad koji napravimo nosi u sebi znanje, strast i preciznost ručnog
            rada.
          </p>
          <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
            Odlučili smo da spojimo tradicionalno kovačko umeće sa modernim
            dizajnom i pametnom konstrukcijom. Rezultat je LINEA kolekcija —
            nameštaj koji izgleda premium, a stiže flat-pack.
          </p>
        </div>
        <div className="aspect-[4/3] rounded-xl bg-secondary" />
      </div>

      {/* Values */}
      <div className="mb-16 grid gap-8 sm:grid-cols-3">
        <div className="rounded-xl border border-border/60 p-6">
          <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-amber-50 text-amber-700">
            <Flame className="h-6 w-6" />
          </div>
          <h3 className="text-lg font-semibold">Tradicija kovanja</h3>
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
            Godina iskustva u obradi metala. Svaki spoj, svaki luk, svaki detalj
            — urađen rukom majstora koji poznaje materijal.
          </p>
        </div>
        <div className="rounded-xl border border-border/60 p-6">
          <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-amber-50 text-amber-700">
            <Hammer className="h-6 w-6" />
          </div>
          <h3 className="text-lg font-semibold">Moderna konstrukcija</h3>
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
            Modularni dizajn sa skrivenim spojevima. Nameštaj koji se sklapa bez
            kompromisa u čvrstini i izgledu. Transport-friendly, ali ne na račun
            kvaliteta.
          </p>
        </div>
        <div className="rounded-xl border border-border/60 p-6">
          <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-amber-50 text-amber-700">
            <Heart className="h-6 w-6" />
          </div>
          <h3 className="text-lg font-semibold">Direktno od majstora</h3>
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
            Bez posrednika, bez salona. Kupujete direktno od nas — znamo svaki
            komad koji smo napravili i stojimo iza njega.
          </p>
        </div>
      </div>

      {/* Vision */}
      <div className="mb-16 rounded-xl bg-zinc-950 p-8 text-white sm:p-12">
        <h2 className="text-2xl font-bold">Naša vizija</h2>
        <p className="mt-4 max-w-3xl text-lg leading-relaxed text-zinc-300">
          &ldquo;Kovani nameštaj premium izgleda, projektovan za isplativ
          transport: rastavljiv, brz za montažu, bez kompromisa u
          čvrstini.&rdquo;
        </p>
        <p className="mt-4 text-zinc-400">
          Želimo da svaki dom u Srbiji može da ima kvalitetan kovani nameštaj
          na terasi — bez stresa oko transporta, bez ogrebotina, bez
          komplikovane montaže. To je KOVO.
        </p>
      </div>

      {/* CTA */}
      <div className="text-center">
        <h2 className="text-2xl font-bold">Pogledajte šta pravimo</h2>
        <p className="mt-2 text-muted-foreground">
          LINEA kolekcija — moderna linija kovanog nameštaja za terase i
          dvorišta.
        </p>
        <Button
          asChild
          size="lg"
          className="mt-6 bg-amber-700 text-white hover:bg-amber-800"
        >
          <Link href="/proizvodi">
            Pogledajte kolekciju
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </div>
    </div>
  );
}
