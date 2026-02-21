"use client";

import Link from "next/link";
import { ArrowRight, Repeat2, Layers, Replace } from "lucide-react";
import { Button } from "@/components/ui/button";
import ScrollReveal from "@/components/ScrollReveal";

const modularPrinciples = [
  {
    icon: Repeat2,
    title: "Zamenljivi nasloni",
    description:
      "Stolica i klupa dele iste naslon panele — Klasik, Rešetka ili Luk. Promenite izgled bez kupovine novog proizvoda.",
    highlight: "3 dizajna naslona, isti ram",
  },
  {
    icon: Layers,
    title: "Univerzalna baza stola",
    description:
      "Jedna čelična nogara nosi i okruglu Ø60cm i kvadratnu 80×80cm ploču. Započnite malo, nadogradite kad poželite.",
    highlight: "1 baza → 2 veličine ploče",
  },
  {
    icon: Replace,
    title: "Zamena drvenih delova",
    description:
      "Sedište stolice, daske klupe, ploča stola — sve se menja. Osvežite nameštaj novim drvom posle 5+ sezona.",
    highlight: "Drvo se menja, čelik ostaje",
  },
];

const sharedDNA = [
  { label: "Isti profil metala", detail: "Kvadratna cev 25×25mm + traka 30×6mm" },
  { label: "Isti spojevi", detail: "M8/M10 inox hex + pozicioni pinovi" },
  { label: "Isti alat", detail: "Jedan imbus ključ za sve proizvode" },
  { label: "Isti dizajn jezik", detail: "LINEA luk — potpis na svakom komadu" },
];

export default function PlatformShowcase() {
  return (
    <section className="noise-overlay relative overflow-hidden bg-iron-deep py-20 text-white sm:py-28">
      {/* Atmospheric gradients */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,_oklch(0.55_0.14_55_/_0.1),transparent_60%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,_oklch(0.55_0.14_55_/_0.05),transparent_50%)]" />
      <div className="absolute left-0 top-0 h-full w-1/3 opacity-20 dot-grid" />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <ScrollReveal className="mb-14 max-w-2xl">
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.15em] text-forge-amber-light">
            Modularna platforma
          </p>
          <h2 className="font-display text-3xl tracking-tight sm:text-4xl lg:text-5xl">
            Jedna platforma,
            <br />
            <span className="text-forge-amber-light">više lica</span>
          </h2>
          <p className="mt-5 max-w-xl text-base leading-relaxed text-white/60">
            Svi LINEA proizvodi dele isti konstrukcioni DNK — iste profile, iste spojeve,
            isti alat. Menjate samo module koji definišu oblik i namenu.
          </p>
        </ScrollReveal>

        {/* Modular principles cards */}
        <div className="mb-16 grid gap-6 sm:grid-cols-3">
          {modularPrinciples.map((principle, i) => (
            <ScrollReveal
              key={principle.title}
              delay={i * 0.1}
              className="group rounded-xl border border-white/10 bg-card p-7 backdrop-blur-sm transition-all duration-300 hover:border-forge-amber/30 hover:bg-card/80"
            >
              <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-forge-amber/10">
                <principle.icon className="h-5 w-5 text-forge-amber-light" />
              </div>
              <h3 className="text-lg font-semibold tracking-tight text-white">{principle.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-white/80">
                {principle.description}
              </p>
              <div className="mt-4 inline-flex rounded-lg border border-forge-amber/20 bg-forge-amber/10 px-3 py-1 text-xs font-semibold text-forge-amber-light">
                {principle.highlight}
              </div>
            </ScrollReveal>
          ))}
        </div>

        {/* Shared DNA strip */}
        <ScrollReveal delay={0.2}>
          <div className="rounded-xl border border-white/10 bg-card p-7 backdrop-blur-sm sm:p-8">
            <p className="mb-5 text-xs font-semibold uppercase tracking-[0.15em] text-forge-amber-light">
              Zajednički DNK
            </p>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {sharedDNA.map((item) => (
                <div key={item.label} className="flex flex-col">
                  <span className="text-sm font-semibold text-white">{item.label}</span>
                  <span className="mt-0.5 font-mono text-xs text-white/80">{item.detail}</span>
                </div>
              ))}
            </div>
          </div>
        </ScrollReveal>

        {/* CTA */}
        <ScrollReveal delay={0.3} className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center">
          <Button
            asChild
            size="lg"
            className="bg-forge-amber px-8 text-white transition-all duration-200 hover:bg-forge-amber-light hover:scale-[1.02]"
          >
            <Link href="/proizvodi">
              Pogledajte module
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
          <Button
            asChild
            variant="outline"
            size="lg"
            className="bg-transparent border-white/15 text-white transition-all duration-200 hover:border-white/30 hover:bg-white/5"
          >
            <Link href="/kako-funkcionise">Kako se sklapa</Link>
          </Button>
        </ScrollReveal>
      </div>
    </section>
  );
}
