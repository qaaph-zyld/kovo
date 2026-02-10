import Link from "next/link";
import {
  Package,
  Truck,
  Timer,
  Shield,
  Wrench,
  ArrowRight,
  Star,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import FeaturedProducts from "@/components/FeaturedProducts";

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

const steps = [
  {
    step: "01",
    title: "Izaberite",
    description: "Odaberite proizvode ili set iz LINEA kolekcije",
  },
  {
    step: "02",
    title: "Primite",
    description: "Stiže flat-pack na paleti, sigurno zapakovano",
  },
  {
    step: "03",
    title: "Sklopite",
    description: "Montaža za 15–45 min sa priloženim alatom",
  },
];

export default function Home() {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-zinc-950 text-white">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_rgba(180,83,9,0.15),transparent_60%)]" />
        <div className="mx-auto max-w-7xl px-4 py-24 sm:px-6 sm:py-32 lg:px-8 lg:py-40">
          <div className="relative max-w-2xl">
            <Badge className="mb-6 bg-amber-700/20 text-amber-400 hover:bg-amber-700/30">
              LINEA Kolekcija — Novo
            </Badge>
            <h1 className="text-4xl font-bold leading-tight tracking-tight sm:text-5xl lg:text-6xl">
              Kovani nameštaj
              <br />
              <span className="text-amber-500">bez stresa</span>
            </h1>
            <p className="mt-6 max-w-lg text-lg leading-relaxed text-zinc-300">
              Modularni nameštaj premium izgleda koji stiže flat-pack, montira
              se za 30 minuta i traje godinama. Za terase, dvorišta i
              ugostiteljske objekte.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Button
                asChild
                size="lg"
                className="bg-amber-700 text-white hover:bg-amber-800"
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
                className="border-zinc-700 text-zinc-100 hover:bg-zinc-800 hover:text-white"
              >
                <Link href="/kako-funkcionise">Kako funkcioniše</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="border-b border-border bg-white py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {features.map((feature) => (
              <div key={feature.title} className="flex gap-4">
                <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-amber-50 text-amber-700">
                  <feature.icon className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-semibold">{feature.title}</h3>
                  <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                    {feature.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-10 flex items-end justify-between">
            <div>
              <h2 className="text-3xl font-bold tracking-tight">
                LINEA Kolekcija
              </h2>
              <p className="mt-2 text-muted-foreground">
                Moderna linija kovanog nameštaja za terase i dvorišta
              </p>
            </div>
            <Button asChild variant="ghost" className="hidden sm:flex">
              <Link href="/proizvodi">
                Svi proizvodi
                <ArrowRight className="ml-1 h-4 w-4" />
              </Link>
            </Button>
          </div>
          <FeaturedProducts />
          <div className="mt-6 text-center sm:hidden">
            <Button asChild variant="outline">
              <Link href="/proizvodi">Svi proizvodi</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="border-t border-border bg-secondary/50 py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-12 text-center">
            <h2 className="text-3xl font-bold tracking-tight">
              Kako funkcioniše
            </h2>
            <p className="mt-2 text-muted-foreground">
              Od porudžbine do gotovog nameštaja u 3 koraka
            </p>
          </div>
          <div className="grid gap-8 sm:grid-cols-3">
            {steps.map((s) => (
              <Card
                key={s.step}
                className="border-border/60 bg-white text-center"
              >
                <CardContent className="p-8">
                  <span className="text-4xl font-bold text-amber-700/20">
                    {s.step}
                  </span>
                  <h3 className="mt-3 text-xl font-semibold">{s.title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">
                    {s.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
          <div className="mt-10 text-center">
            <Button asChild variant="outline">
              <Link href="/kako-funkcionise">
                Saznajte više
                <ArrowRight className="ml-1 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* B2B CTA */}
      <section className="bg-zinc-950 py-16 text-white sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center gap-8 lg:flex-row lg:justify-between">
            <div className="max-w-xl text-center lg:text-left">
              <div className="mb-2 flex items-center justify-center gap-1 text-amber-500 lg:justify-start">
                <Star className="h-4 w-4 fill-current" />
                <Star className="h-4 w-4 fill-current" />
                <Star className="h-4 w-4 fill-current" />
                <Star className="h-4 w-4 fill-current" />
                <Star className="h-4 w-4 fill-current" />
              </div>
              <h2 className="text-3xl font-bold tracking-tight">
                Za kafiće, restorane i hotele
              </h2>
              <p className="mt-3 text-zinc-400">
                Setovi za bašte i lokale — stižu na paleti, montiraju se za
                30–45 min. Zatražite ponudu za veće količine i posebne uslove.
              </p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row">
              <Button
                asChild
                size="lg"
                className="bg-amber-700 text-white hover:bg-amber-800"
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
                className="border-zinc-700 text-zinc-100 hover:bg-zinc-800 hover:text-white"
              >
                <Link href="/setovi">Pogledajte setove</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
