import Link from "next/link";
import Image from "next/image";
import {
  Truck,
  Timer,
  Shield,
  Package,
  Wrench,
  ArrowRight,
  Star,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import FeaturedProducts from "@/components/FeaturedProducts";
import ScrollReveal from "@/components/ScrollReveal";
import PlatformShowcase from "@/components/PlatformShowcase";
import JsonLd from "@/components/JsonLd";

const features = [
  {
    icon: Package,
    title: "Flat-pack isporuka",
    description:
      "Svi proizvodi se pakuju ravno na euro-paletu. Siguran transport bez oštećenja.",
  },
  {
    icon: Timer,
    title: "Montaža do 45 min",
    description:
      "Sklopite nameštaj za manje od sat vremena sa priloženim alatom i QR uputstvom.",
  },
  {
    icon: Shield,
    title: "Premium kvalitet",
    description:
      "Kovano gvožđe + masivno drvo. Antikorozivna zaštita za dugotrajnost na otvorenom.",
  },
  {
    icon: Truck,
    title: "Dostava širom Srbije",
    description:
      "Kurirska dostava za manje pakete, paletna dostava za setove. Transparentne cene.",
  },
];


const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "KOVO",
  legalName: "Kovačka radnja Cotrić",
  url: "https://kovo.rs",
  description:
    "Modularni kovani nameštaj premium izgleda. LINEA kolekcija za terase i dvorišta.",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Loznica",
    addressCountry: "RS",
  },
  contactPoint: {
    "@type": "ContactPoint",
    telephone: "+381600000000",
    contactType: "customer service",
    availableLanguage: "Serbian",
  },
};

export default function Home() {
  return (
    <>
      <JsonLd data={organizationJsonLd} />
      {/* Hero */}
      <section className="noise-overlay relative min-h-[70vh] overflow-hidden bg-iron-deep text-white">
        {/* Atmospheric gradients */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_oklch(0.55_0.14_55_/_0.12),transparent_60%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_oklch(0.55_0.14_55_/_0.06),transparent_50%)]" />
        {/* Dot grid decoration */}
        <div className="absolute right-0 top-0 h-full w-1/2 opacity-30 dot-grid" />

        <div className="relative z-10 mx-auto flex min-h-[70vh] max-w-7xl items-center px-4 py-24 sm:px-6 sm:py-32 lg:px-8 lg:py-40">
          <div className="grid items-center gap-12 lg:grid-cols-2">
          <div className="max-w-2xl">
            <Badge className="animate-settle mb-8 border border-forge-amber/30 bg-forge-amber/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.12em] text-forge-amber-light hover:bg-forge-amber/15">
              LINEA Kolekcija — Novo
            </Badge>
            <h1 className="animate-settle stagger-1 font-display text-5xl leading-[1.05] tracking-tight sm:text-6xl lg:text-7xl">
              Jedna platforma,
              <br />
              <span className="text-forge-amber-light">više lica</span>
            </h1>
            <p className="animate-settle stagger-2 mt-8 max-w-lg text-lg font-light leading-relaxed text-white/60">
              Modularan kovani nameštaj: zamenljivi nasloni, univerzalne baze stolova,
              delovi koji se dele između proizvoda. Stiže flat-pack, sklapa se za 15–45 min.
            </p>
            <div className="animate-settle stagger-3 mt-10 flex flex-col gap-3 sm:flex-row">
              <Button
                asChild
                size="lg"
                className="bg-forge-amber px-8 text-white transition-all duration-200 hover:bg-forge-amber-light hover:scale-[1.02]"
              >
                <Link href="/proizvodi">
                  Pogledajte kolekciju
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="border-white/15 text-white/80 transition-all duration-200 hover:border-white/30 hover:bg-white/5 hover:text-white"
              >
                <Link href="/kako-funkcionise">Kako funkcioniše</Link>
              </Button>
            </div>
          </div>
          <div className="hidden lg:block">
            <div className="animate-settle stagger-2 relative aspect-[4/3] overflow-hidden rounded-xl border border-white/10 shadow-2xl">
              <Image
                src="/images/products/set-family-garden.png"
                alt="LINEA Family Set — baštanski nameštaj od kovanog gvožđa"
                fill
                className="object-cover"
                sizes="50vw"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-iron-deep/30 to-transparent" />
            </div>
          </div>
          </div>
        </div>
      </section>

      {/* Features Strip */}
      <section className="relative bg-workshop-gray py-14 sm:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {features.map((feature, i) => (
              <ScrollReveal key={feature.title} delay={i * 0.08} className="flex gap-4">
                <div className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-xl bg-forge-amber/10 text-forge-amber">
                  <feature.icon className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-semibold tracking-tight">{feature.title}</h3>
                  <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                    {feature.description}
                  </p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <ScrollReveal className="mb-12 flex items-end justify-between">
            <div>
              <p className="mb-2 text-xs font-semibold uppercase tracking-[0.15em] text-forge-amber">
                Naši proizvodi
              </p>
              <h2 className="font-display text-3xl tracking-tight sm:text-4xl">
                LINEA Kolekcija
              </h2>
              <p className="mt-3 max-w-lg text-muted-foreground">
                Moderna linija kovanog nameštaja za terase i dvorišta
              </p>
            </div>
            <Button asChild variant="ghost" className="hidden text-sm font-medium sm:flex">
              <Link href="/proizvodi">
                Svi proizvodi
                <ArrowRight className="ml-1 h-4 w-4" />
              </Link>
            </Button>
          </ScrollReveal>
          <FeaturedProducts />
          <div className="mt-8 text-center sm:hidden">
            <Button asChild variant="outline" className="px-8">
              <Link href="/proizvodi">Svi proizvodi</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Platform Showcase — modularity explained */}
      <PlatformShowcase />

      {/* How it works — asymmetric progressive reveal */}
      <section className="relative overflow-hidden bg-workshop-gray py-20 sm:py-28">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-forge-amber/[0.02] to-transparent" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Header — left-aligned for asymmetry */}
          <ScrollReveal className="mb-14 max-w-xl">
            <p className="mb-2 text-xs font-semibold uppercase tracking-[0.15em] text-forge-amber">
              3 jednostavna koraka
            </p>
            <h2 className="font-display text-3xl tracking-tight sm:text-4xl">
              Od porudžbine do
              <br />
              <span className="text-forge-amber">gotovog nameštaja</span>
            </h2>
          </ScrollReveal>

          {/* Asymmetric layout: featured step + two smaller steps */}
          <div className="grid gap-6 lg:grid-cols-12 lg:gap-8">
            {/* Step 01 — featured, large */}
            <ScrollReveal delay={0} className="lg:col-span-7">
              <div className="group relative overflow-hidden rounded-xl border border-border/60 bg-card p-8 transition-all duration-300 hover:shadow-warm sm:p-10">
                <div className="flex items-start gap-6">
                  <div className="flex-shrink-0">
                    <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-forge-amber/10">
                      <Package className="h-7 w-7 text-forge-amber" />
                    </div>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-baseline gap-3">
                      <span className="font-mono text-5xl font-bold text-forge-amber/15">01</span>
                      <h3 className="font-display text-2xl tracking-tight">Izaberite</h3>
                    </div>
                    <p className="mt-3 max-w-md text-base leading-relaxed text-muted-foreground">
                      Odaberite proizvode ili set iz LINEA kolekcije. Poručite online
                      sa dostavom ili ličnim preuzimanjem u Loznici.
                    </p>
                    <div className="mt-5 flex flex-wrap gap-2">
                      <span className="inline-flex items-center rounded-md border border-forge-amber/20 bg-forge-amber/5 px-2.5 py-1 text-xs font-medium text-forge-amber">
                        Pojedinačno ili set
                      </span>
                      <span className="inline-flex items-center rounded-md border border-border/50 bg-workshop-gray px-2.5 py-1 text-xs font-medium text-muted-foreground">
                        Kartica ili pouzeće
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </ScrollReveal>

            {/* Steps 02 + 03 — stacked, smaller, offset */}
            <div className="flex flex-col gap-6 lg:col-span-5">
              <ScrollReveal delay={0.12}>
                <div className="group relative overflow-hidden rounded-xl border border-border/60 bg-card p-6 transition-all duration-300 hover:shadow-warm sm:p-7">
                  <div className="flex items-start gap-4">
                    <div className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-xl bg-forge-amber/10">
                      <Truck className="h-5 w-5 text-forge-amber" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-baseline gap-2">
                        <span className="font-mono text-3xl font-bold text-forge-amber/15">02</span>
                        <h3 className="text-lg font-bold tracking-tight">Primite</h3>
                      </div>
                      <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                        Stiže flat-pack na paleti, sigurno zapakovano. Pena, kartonski uglovi, ništa metal-na-metal.
                      </p>
                    </div>
                  </div>
                </div>
              </ScrollReveal>

              <ScrollReveal delay={0.24}>
                <div className="group relative overflow-hidden rounded-xl border border-border/60 bg-card p-6 transition-all duration-300 hover:shadow-warm sm:p-7">
                  <div className="flex items-start gap-4">
                    <div className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-xl bg-forge-amber/10">
                      <Wrench className="h-5 w-5 text-forge-amber" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-baseline gap-2">
                        <span className="font-mono text-3xl font-bold text-forge-amber/15">03</span>
                        <h3 className="text-lg font-bold tracking-tight">Sklopite</h3>
                      </div>
                      <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                        Montaža za 15–45 min sa priloženim alatom. QR kod vodi do video uputstva.
                      </p>
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            </div>
          </div>

          <ScrollReveal delay={0.3} className="mt-10">
            <Button asChild variant="outline" className="px-8">
              <Link href="/kako-funkcionise">
                Saznajte više o procesu
                <ArrowRight className="ml-1 h-4 w-4" />
              </Link>
            </Button>
          </ScrollReveal>
        </div>
      </section>

      {/* B2B CTA */}
      <section className="noise-overlay relative overflow-hidden bg-iron-deep py-20 text-white sm:py-28">
        {/* Atmospheric gradients */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_oklch(0.55_0.14_55_/_0.08),transparent_60%)]" />
        {/* Geometric decoration */}
        <div className="absolute left-0 top-0 h-full w-1/3 opacity-20 dot-grid" />
        
        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center gap-10 lg:flex-row lg:justify-between">
            <ScrollReveal className="max-w-xl text-center lg:text-left">
              <div className="mb-3 flex items-center justify-center gap-1 text-forge-amber-light lg:justify-start">
                <Star className="h-4 w-4 fill-current" />
                <Star className="h-4 w-4 fill-current" />
                <Star className="h-4 w-4 fill-current" />
                <Star className="h-4 w-4 fill-current" />
                <Star className="h-4 w-4 fill-current" />
              </div>
              <h2 className="font-display text-3xl tracking-tight sm:text-4xl">
                Za kafiće, restorane i hotele
              </h2>
              <p className="mt-4 text-base leading-relaxed text-white/60">
                Setovi za bašte i lokale — stižu na paleti, montiraju se za
                30–45 min. Zatražite ponudu za veće količine i posebne uslove.
              </p>
            </ScrollReveal>
            <ScrollReveal delay={0.2} className="flex flex-col gap-3 sm:flex-row">
              <Button
                asChild
                size="lg"
                className="bg-forge-amber px-8 text-white transition-all duration-200 hover:bg-forge-amber-light hover:scale-[1.02]"
              >
                <Link href="/kontakt?tip=b2b">
                  <Wrench className="mr-2 h-4 w-4" />
                  Zatražite B2B ponudu
                </Link>
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="border-white/15 text-white/80 transition-all duration-200 hover:border-white/30 hover:bg-white/5 hover:text-white"
              >
                <Link href="/setovi">Pogledajte setove</Link>
              </Button>
            </ScrollReveal>
          </div>
        </div>
      </section>
    </>
  );
}
