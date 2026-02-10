import Link from "next/link";
import Image from "next/image";
import { Flame, Hammer, Heart, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function ONamaPage() {
  return (
    <>
      {/* Hero */}
      <section className="py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
            <div>
              <p className="mb-3 text-xs font-semibold uppercase tracking-[0.15em] text-forge-amber">
                Naša priča
              </p>
              <h1 className="font-display text-3xl tracking-tight sm:text-4xl lg:text-5xl">
                Priča iza <span className="text-forge-amber">KOVO</span>
              </h1>
              <p className="mt-6 text-base leading-relaxed text-muted-foreground">
                KOVO je nastao iz Kovačke radnje Cotrić u Loznici — porodične
                radionice sa dugogodišnjom tradicijom obrade kovanog gvožđa. Svaki
                komad koji napravimo nosi u sebi znanje, strast i preciznost ručnog
                rada.
              </p>
              <p className="mt-4 text-base leading-relaxed text-muted-foreground">
                Odlučili smo da spojimo tradicionalno kovačko umeće sa modernim
                dizajnom i pametnom konstrukcijom. Rezultat je LINEA kolekcija —
                nameštaj koji izgleda premium, a stiže flat-pack.
              </p>
            </div>
            <div className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-workshop-gray">
              <Image
                src="/images/products/set-family-garden.png"
                alt="KOVO kovani nameštaj — set u bašti"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="relative overflow-hidden bg-workshop-gray py-20 sm:py-28">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-forge-amber/[0.02] to-transparent" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-12 text-center">
            <p className="mb-2 text-xs font-semibold uppercase tracking-[0.15em] text-forge-amber">
              Vrednosti
            </p>
            <h2 className="font-display text-2xl tracking-tight sm:text-3xl">Šta nas pokreće</h2>
          </div>
          <div className="grid gap-7 sm:grid-cols-3">
            {[
              {
                icon: Flame,
                title: "Tradicija kovanja",
                desc: "Godina iskustva u obradi metala. Svaki spoj, svaki luk, svaki detalj — urađen rukom majstora koji poznaje materijal.",
              },
              {
                icon: Hammer,
                title: "Moderna konstrukcija",
                desc: "Modularni dizajn sa skrivenim spojevima. Nameštaj koji se sklapa bez kompromisa u čvrstini i izgledu. Transport-friendly, ali ne na račun kvaliteta.",
              },
              {
                icon: Heart,
                title: "Direktno od majstora",
                desc: "Bez posrednika, bez salona. Kupujete direktno od nas — znamo svaki komad koji smo napravili i stojimo iza njega.",
              },
            ].map((v) => (
              <div key={v.title} className="rounded-2xl border border-border/50 bg-card p-7 transition-all duration-300 hover:shadow-warm">
                <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-forge-amber/10">
                  <v.icon className="h-6 w-6 text-forge-amber" />
                </div>
                <h3 className="text-lg font-semibold tracking-tight">{v.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {v.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Vision */}
      <section className="noise-overlay relative overflow-hidden bg-iron-deep py-20 text-white sm:py-28">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_oklch(0.55_0.14_55_/_0.08),transparent_60%)]" />
        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.15em] text-forge-amber-light">
            Vizija
          </p>
          <h2 className="font-display text-2xl tracking-tight sm:text-3xl">Naša vizija</h2>
          <blockquote className="mt-6 max-w-3xl border-l-2 border-forge-amber/30 pl-6 font-display text-xl leading-relaxed text-white/70 sm:text-2xl">
            &ldquo;Kovani nameštaj premium izgleda, projektovan za isplativ
            transport: rastavljiv, brz za montažu, bez kompromisa u
            čvrstini.&rdquo;
          </blockquote>
          <p className="mt-6 max-w-2xl leading-relaxed text-white/40">
            Želimo da svaki dom u Srbiji može da ima kvalitetan kovani nameštaj
            na terasi — bez stresa oko transporta, bez ogrebotina, bez
            komplikovane montaže. To je KOVO.
          </p>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
          <h2 className="font-display text-2xl tracking-tight sm:text-3xl">Pogledajte šta pravimo</h2>
          <p className="mt-3 text-muted-foreground">
            LINEA kolekcija — moderna linija kovanog nameštaja za terase i
            dvorišta.
          </p>
          <Button
            asChild
            size="lg"
            className="mt-8 bg-forge-amber px-8 font-semibold text-white transition-all duration-200 hover:bg-forge-amber-light hover:scale-[1.02]"
          >
            <Link href="/proizvodi">
              Pogledajte kolekciju
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </section>
    </>
  );
}
