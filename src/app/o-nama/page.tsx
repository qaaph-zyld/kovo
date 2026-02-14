import Link from "next/link";
import Image from "next/image";
import {
  ArrowRight,
  Package,
  Wrench,
  Shield,
  Truck,
  Home,
  UtensilsCrossed,
  Hotel,
  Clock,
  Puzzle,
  Repeat2,
  ArrowUpDown,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import ScrollReveal from "@/components/ScrollReveal";
import CountUp from "@/components/CountUp";

const chairModules = [
  {
    number: "01",
    name: "Naslon panel",
    material: "Čelik",
    weight: "1.2 kg",
    dims: "40×2×45 cm",
    badge: "BIRLJIV",
    badgeColor: "border-forge-amber/30 bg-forge-amber/10 text-forge-amber",
    desc: "Klasik, Rešetka ili Luk — promenite izgled bez promene rama",
    connection: "M8 hex × 2–4 + slot rupe",
  },
  {
    number: "02",
    name: "Bočni ramovi (L/D)",
    material: "Čelik",
    weight: "3.5 kg",
    dims: "42×42×90 cm",
    badge: null,
    badgeColor: "",
    desc: "Par kovanih ramova sa LINEA lukom — cev 25×25mm + traka 30×6mm",
    connection: "M8 hex × 4 + pozicioni pin × 2",
  },
  {
    number: "03",
    name: "Sedalni okvir",
    material: "Čelik",
    weight: "1.5 kg",
    dims: "42×42×5 cm",
    badge: null,
    badgeColor: "",
    desc: "Pravougaoni okvir sa navarenim maticama — spaja bočne ramove",
    connection: "M8 hex × 4",
  },
  {
    number: "04",
    name: "Drveno sedište",
    material: "Drvo",
    weight: "1.8 kg",
    dims: "40×40×2.5 cm",
    badge: "ZAMENLJIVO",
    badgeColor: "border-green-600/20 bg-green-600/10 text-green-700",
    desc: "Masivno drvo sa zaobljenim ivicama — novo drvo posle 5+ sezona",
    connection: null,
  },
];

const sharedParts = [
  {
    icon: Repeat2,
    title: "Naslon panel → Stolica + Klupa",
    desc: "Isti naslon (Klasik, Rešetka, Luk) se montira i na stolicu i na klupu. Jedan dizajn, dva proizvoda.",
  },
  {
    icon: ArrowUpDown,
    title: "Baza stola → Ø60 + 80×80 ploča",
    desc: "Jedna univerzalna čelična baza nosi i okruglu bistro ploču i kvadratnu family ploču. Nadogradite kad poželite.",
  },
  {
    icon: Puzzle,
    title: "Isti spojevi, isti alat, sve",
    desc: "M8/M10 inox hex + pozicioni pinovi + slot rupe. Jedan imbus ključ za svaki LINEA proizvod — dolazi u paketu.",
  },
];

const comparisonItems = [
  {
    traditional: "Transport u komadu — oštećenja, skupa kubikaža",
    kovo: "Flat-pack na paleti — sigurno, duplo jeftinije",
  },
  {
    traditional: "Jednom kupite — jednom izgleda",
    kovo: "Zamenljivi nasloni i drveni delovi — novi izgled bez novog komada",
  },
  {
    traditional: "Svaki proizvod potpuno drugačija konstrukcija",
    kovo: "Jedna platforma, isti spojevi, isti alat za sve",
  },
  {
    traditional: "Popravka = nazad u radionicu",
    kovo: "Zamena modula na licu mesta, bez alata ili sa jednim imbusom",
  },
];

export default function ONamaPage() {
  return (
    <>
      {/* ═══ HERO — Bold typographic statement ═══ */}
      <section className="noise-overlay relative min-h-[70vh] overflow-hidden bg-iron-deep text-white">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_oklch(0.55_0.14_55_/_0.1),transparent_60%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_oklch(0.55_0.14_55_/_0.05),transparent_50%)]" />
        <div className="absolute right-0 top-0 h-full w-1/2 opacity-20 dot-grid" />

        <div className="relative z-10 mx-auto flex min-h-[70vh] max-w-7xl items-center px-4 py-24 sm:px-6 sm:py-32 lg:px-8">
          <div className="max-w-3xl">
            <p className="animate-settle mb-6 text-xs font-semibold uppercase tracking-[0.2em] text-forge-amber-light">
              Kovačka radnja Cotrić — Loznica
            </p>
            <h1 className="animate-settle stagger-1 font-display text-5xl leading-[1.05] tracking-tight sm:text-6xl lg:text-7xl xl:text-8xl">
              Gvožđe. Drvo.
              <br />
              <span className="text-forge-amber-light">Ruke.</span>
            </h1>
            <p className="animate-settle stagger-2 mt-8 max-w-xl text-lg font-light leading-relaxed text-white/50 sm:text-xl">
              Modularni kovani nameštaj koji se ne prenosi — već se
              šalje. Projektovan da preživi put i godine na vašoj terasi.
            </p>
            <div className="animate-settle stagger-3 mt-6 h-px w-24 bg-gradient-to-r from-forge-amber to-transparent" />
          </div>
        </div>
      </section>

      {/* ═══ STATS STRIP — Credibility through numbers ═══ */}
      <section className="relative border-b border-border/40 bg-workshop-gray">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 divide-x divide-border/40 lg:grid-cols-4">
            {[
              { value: 15, suffix: "+", label: "godina kovačkog zanata" },
              { value: 45, suffix: " min", label: "maksimalna montaža" },
              { value: 6, suffix: "×", label: "stolica u jednom paketu" },
              { value: 100, suffix: "%", label: "direktno od majstora" },
            ].map((stat, i) => (
              <ScrollReveal
                key={stat.label}
                delay={i * 0.1}
                className="flex flex-col items-center px-4 py-10 text-center sm:py-14"
              >
                <CountUp
                  end={stat.value}
                  suffix={stat.suffix}
                  className="font-mono text-4xl font-bold tracking-tight text-forge-amber sm:text-5xl"
                />
                <span className="mt-2 text-xs font-medium uppercase tracking-[0.1em] text-muted-foreground sm:text-sm">
                  {stat.label}
                </span>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ ORIGIN — The Cotrić story, editorial layout ═══ */}
      <section className="py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid items-center gap-16 lg:grid-cols-12">
            {/* Image — large, atmospheric */}
            <ScrollReveal className="lg:col-span-7" direction="left">
              <div className="relative aspect-[4/3] overflow-hidden rounded-xl bg-workshop-gray">
                <Image
                  src="/images/products/set-family-garden.png"
                  alt="KOVO set u bašti — kovani nameštaj na terasi"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 58vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-iron-deep/20 to-transparent" />
              </div>
            </ScrollReveal>

            {/* Text — offset, editorial */}
            <ScrollReveal className="lg:col-span-5" delay={0.15}>
              <p className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-forge-amber">
                Poreklo
              </p>
              <h2 className="font-display text-3xl tracking-tight sm:text-4xl lg:text-5xl">
                Radionica u kojoj
                <br />
                <span className="text-forge-amber">metal oživljava</span>
              </h2>
              <div className="mt-8 space-y-5 text-base leading-[1.8] text-muted-foreground">
                <p>
                  Kovačka radnja Cotrić u Loznici nije fabrika. To je mesto gde
                  se čelik savija na toploti ognja, gde se svaki luk proverava
                  okom i rukom, gde greška nije opcija — jer metal ne oprašta.
                </p>
                <p>
                  Godinama smo pravili klasičan kovani nameštaj. Lep, čvrst,
                  težak. Problem? <strong className="text-foreground">Transport je jeo profit.</strong>{" "}
                  Glomazni komadi, ogrebotine na putu, skupa kubikaža. Kupci u
                  Beogradu ili Novom Sadu nisu mogli da dobiju ono što zaslužuju
                  bez komplikacija.
                </p>
                <p>
                  Onda smo napravili KOVO —{" "}
                  <strong className="text-foreground">
                    isti kovački kvalitet, ali projektovan za put.
                  </strong>{" "}
                  Modularno. Rastavljivo. Spakovano da stigne bez ijedne
                  ogrebotine.
                </p>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* ═══ THE PROBLEM WE SOLVE — Why modular matters ═══ */}
      <section className="noise-overlay relative overflow-hidden bg-iron-deep py-24 text-white sm:py-32">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,_oklch(0.55_0.14_55_/_0.08),transparent_60%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,_oklch(0.55_0.14_55_/_0.04),transparent_50%)]" />
        <div className="absolute left-0 top-0 h-full w-1/3 opacity-15 dot-grid" />

        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <ScrollReveal className="mx-auto max-w-3xl text-center">
            <p className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-forge-amber-light">
              Zašto modularno
            </p>
            <h2 className="font-display text-3xl tracking-tight sm:text-4xl lg:text-5xl">
              Kovani nameštaj imao je
              <br />
              <span className="text-forge-amber-light">problem transporta</span>
            </h2>
            <p className="mt-6 text-lg leading-relaxed text-white/50">
              Fermob, EMU, HAY — svi uspešni proizvođači nameštaja rešili su
              istu stvar: kako napraviti komad koji izgleda premium, a stiže
              bez stresa. Mi smo to primenili na kovano gvožđe.
            </p>
          </ScrollReveal>

          {/* Comparison table */}
          <div className="mt-16 grid gap-px overflow-hidden rounded-xl border border-white/10 bg-white/5 sm:grid-cols-2">
            {/* Header */}
            <div className="bg-white/[0.03] px-8 py-5">
              <span className="text-sm font-semibold uppercase tracking-[0.1em] text-white/30">
                Tradicionalno kovano
              </span>
            </div>
            <div className="bg-forge-amber/10 px-8 py-5">
              <span className="text-sm font-semibold uppercase tracking-[0.1em] text-forge-amber-light">
                KOVO modularno
              </span>
            </div>

            {/* Rows */}
            {comparisonItems.map((item, i) => (
              <div key={i} className="contents">
                <div className="border-t border-white/5 bg-white/[0.02] px-8 py-6">
                  <p className="text-sm leading-relaxed text-white/40">
                    {item.traditional}
                  </p>
                </div>
                <div className="border-t border-white/5 bg-forge-amber/[0.03] px-8 py-6">
                  <p className="text-sm font-medium leading-relaxed text-white/80">
                    {item.kovo}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ MODULAR ANATOMY — How we break it down ═══ */}
      <section className="py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <ScrollReveal className="mb-16 max-w-2xl">
            <p className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-forge-amber">
              Anatomija
            </p>
            <h2 className="font-display text-3xl tracking-tight sm:text-4xl lg:text-5xl">
              Kako se stolica
              <br />
              <span className="text-forge-amber">rastavlja na module</span>
            </h2>
            <p className="mt-5 text-base leading-relaxed text-muted-foreground">
              Svaki proizvod je projektovan kao sistem delova koji se lako
              pakuju, lako šalju i lako sklapaju — a izgleda kao da je iz jednog
              komada.
            </p>
          </ScrollReveal>

          <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
            {/* Left: Exploded chair view */}
            <div className="lg:col-span-7">
              <div className="space-y-2">
                {chairModules.map((mod, i) => (
                  <ScrollReveal key={mod.number} delay={i * 0.1}>
                    {/* Module card */}
                    <div className="group relative overflow-hidden rounded-xl border border-border/60 bg-card p-5 transition-all duration-300 hover:border-forge-amber/30 hover:shadow-warm">
                      {/* Number badge */}
                      <div className="absolute -right-1 -top-1 flex h-7 w-7 items-center justify-center rounded-bl-lg bg-forge-amber/10 font-mono text-[10px] font-bold text-forge-amber">
                        {mod.number}
                      </div>

                      <div className="flex items-start gap-4">
                        {/* Material indicator */}
                        <div
                          className={`mt-0.5 flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg ${
                            mod.material === "Drvo"
                              ? "bg-forge-amber/10 text-forge-amber"
                              : "bg-iron-black/10 text-iron-black"
                          }`}
                        >
                          <span className="text-[10px] font-bold uppercase">
                            {mod.material === "Drvo" ? "DRV" : "ČEL"}
                          </span>
                        </div>

                        <div className="flex-1">
                          <div className="flex items-center gap-2">
                            <h4 className="text-sm font-semibold tracking-tight">
                              {mod.name}
                            </h4>
                            {mod.badge && (
                              <span
                                className={`rounded-md border px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider ${mod.badgeColor}`}
                              >
                                {mod.badge}
                              </span>
                            )}
                          </div>
                          <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
                            {mod.desc}
                          </p>
                          <div className="mt-2 flex items-center gap-3 font-mono text-[10px] text-muted-foreground">
                            <span>{mod.weight}</span>
                            <span className="text-border">·</span>
                            <span>{mod.dims}</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Connection indicator between modules */}
                    {mod.connection && (
                      <div className="flex items-center justify-center gap-2 py-1.5">
                        <div className="h-px flex-1 bg-gradient-to-r from-transparent to-forge-amber/20" />
                        <div className="flex items-center gap-1.5 rounded-full border border-forge-amber/20 bg-forge-amber/5 px-3 py-0.5">
                          <div className="h-1.5 w-1.5 rounded-full bg-forge-amber/40" />
                          <span className="font-mono text-[10px] text-forge-amber/70">
                            {mod.connection}
                          </span>
                        </div>
                        <div className="h-px flex-1 bg-gradient-to-l from-transparent to-forge-amber/20" />
                      </div>
                    )}
                  </ScrollReveal>
                ))}
              </div>

              {/* Assembly summary strip */}
              <ScrollReveal delay={0.5} className="mt-6">
                <div className="flex flex-wrap items-center gap-4 rounded-xl border border-dashed border-forge-amber/30 bg-forge-amber/5 px-5 py-4">
                  <div className="flex items-center gap-1.5">
                    <Clock className="h-3.5 w-3.5 text-forge-amber" />
                    <span className="font-mono text-xs font-medium">15 min montaža</span>
                  </div>
                  <div className="h-4 w-px bg-forge-amber/20" />
                  <div className="flex items-center gap-1.5">
                    <Puzzle className="h-3.5 w-3.5 text-forge-amber" />
                    <span className="font-mono text-xs font-medium">4 modula</span>
                  </div>
                  <div className="h-4 w-px bg-forge-amber/20" />
                  <div className="flex items-center gap-1.5">
                    <Wrench className="h-3.5 w-3.5 text-forge-amber" />
                    <span className="font-mono text-xs font-medium">1 imbus ključ</span>
                  </div>
                  <div className="h-4 w-px bg-forge-amber/20" />
                  <div className="flex items-center gap-1.5">
                    <Package className="h-3.5 w-3.5 text-forge-amber" />
                    <span className="font-mono text-xs font-medium">Slaganje do 6×</span>
                  </div>
                </div>
              </ScrollReveal>
            </div>

            {/* Right: Connection system + key facts */}
            <ScrollReveal className="lg:col-span-5" delay={0.2}>
              <div className="sticky top-28 space-y-6">
                {/* Connection system */}
                <div className="rounded-xl border border-border/60 bg-workshop-gray p-6 sm:p-7">
                  <p className="mb-4 text-xs font-semibold uppercase tracking-[0.15em] text-forge-amber">
                    Sistem spojeva
                  </p>
                  <div className="space-y-4">
                    {[
                      {
                        label: "M8/M10 inox hex",
                        desc: "Standard šrafovi — ne rđaju, ne popuštaju",
                      },
                      {
                        label: "Pozicioni pinovi",
                        desc: "Delovi se sami poravnavaju — ne možete pogrešiti",
                      },
                      {
                        label: "Navarene matice",
                        desc: "Ugrađene u čelik — nema labavljenja tokom montaže",
                      },
                      {
                        label: "Slot rupe",
                        desc: "Tolerancija za završnu obradu — uvek perfektan spoj",
                      },
                      {
                        label: "Skriveni spojevi",
                        desc: "Sve sa unutrašnje strane — izgled ostaje premium",
                      },
                    ].map((item) => (
                      <div key={item.label}>
                        <span className="text-sm font-semibold tracking-tight">
                          {item.label}
                        </span>
                        <p className="mt-0.5 text-xs leading-relaxed text-muted-foreground">
                          {item.desc}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Packing result */}
                <div className="rounded-xl border border-border/60 bg-card p-6 sm:p-7">
                  <p className="mb-3 text-xs font-semibold uppercase tracking-[0.15em] text-forge-amber">
                    Rezultat pakovanja
                  </p>
                  <p className="text-sm leading-relaxed text-muted-foreground">
                    Bočni ramovi + sedalni okvir + naslon panel + drveno sedište
                    — sve u <strong className="text-foreground">pljosnati paket</strong>.
                    Stolice se slažu do 6 komada. Pena na kontaktima, kartonski
                    uglovi, kesica sa šrafovima i QR uputstvo.
                  </p>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                    Prevoznik radi sa tim kao sa belom tehnikom —{" "}
                    <strong className="text-foreground">ne kao sa umetninom.</strong>
                  </p>
                </div>
              </div>
            </ScrollReveal>
          </div>

          {/* Cross-product DNA */}
          <ScrollReveal delay={0.15} className="mt-20">
            <div className="mb-8">
              <p className="mb-2 text-xs font-semibold uppercase tracking-[0.2em] text-forge-amber">
                Zajednički DNK
              </p>
              <h3 className="font-display text-2xl tracking-tight sm:text-3xl">
                Isti delovi, više proizvoda
              </h3>
            </div>
            <div className="grid gap-5 sm:grid-cols-3">
              {sharedParts.map((part, i) => (
                <ScrollReveal
                  key={part.title}
                  delay={i * 0.1}
                  className="rounded-xl border border-border/50 bg-card p-6 transition-all duration-300 hover:shadow-warm"
                >
                  <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-forge-amber/10">
                    <part.icon className="h-5 w-5 text-forge-amber" />
                  </div>
                  <h4 className="text-sm font-semibold tracking-tight">
                    {part.title}
                  </h4>
                  <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
                    {part.desc}
                  </p>
                </ScrollReveal>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ═══ PHILOSOPHY — One bold statement ═══ */}
      <section className="relative overflow-hidden bg-workshop-gray">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-forge-amber/[0.02] to-transparent" />
        <div className="relative mx-auto max-w-7xl px-4 py-24 sm:px-6 sm:py-32 lg:px-8">
          <ScrollReveal className="mx-auto max-w-4xl text-center">
            <div className="mb-8 inline-flex h-px w-16 bg-forge-amber/40" />
            <blockquote className="font-display text-3xl leading-[1.3] tracking-tight sm:text-4xl lg:text-5xl">
              &ldquo;Jedan imbus ključ.
              <br />
              <span className="text-forge-amber">Svi proizvodi.</span>
              <br />
              Isti spojevi. Isti kvalitet.&rdquo;
            </blockquote>
            <p className="mx-auto mt-8 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg">
              LINEA kolekcija deli zajednički DNK — isti profil metala, iste
              spojeve, isti alat. Kupite stolicu danas, dodajte sto sutra —
              sve se uklapa jer je sve iz istog sistema.
            </p>
            <div className="mt-8 inline-flex h-px w-16 bg-forge-amber/40" />
          </ScrollReveal>
        </div>
      </section>

      {/* ═══ WHO IT'S FOR — B2C + B2B, asymmetric ═══ */}
      <section className="py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <ScrollReveal className="mb-16 max-w-xl">
            <p className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-forge-amber">
              Za koga
            </p>
            <h2 className="font-display text-3xl tracking-tight sm:text-4xl">
              Od dvorišta do restorana
            </h2>
          </ScrollReveal>

          <div className="grid gap-6 lg:grid-cols-2">
            {/* Primary audience — featured, full height */}
            <ScrollReveal delay={0} className="lg:row-span-2">
              <div className="group flex h-full flex-col rounded-xl border border-border/50 bg-card p-8 transition-all duration-300 hover:shadow-warm-lg sm:p-10">
                <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-xl bg-forge-amber/10 transition-colors duration-300 group-hover:bg-forge-amber/15">
                  <Home className="h-6 w-6 text-forge-amber" />
                </div>
                <h3 className="font-display text-xl tracking-tight sm:text-2xl">
                  Vaša terasa
                </h3>
                <p className="mt-3 flex-1 text-sm leading-relaxed text-muted-foreground sm:text-base">
                  Bistro set za jutarnju kafu. Family set za nedeljni ručak. Klupa za predah. Stiže na kućnu adresu, sklopite sami.
                </p>
                <div className="mt-6 flex flex-wrap gap-2">
                  <span className="inline-flex items-center rounded-md border border-forge-amber/20 bg-forge-amber/5 px-2.5 py-1 text-xs font-medium text-forge-amber">
                    Dostava na adresu
                  </span>
                  <span className="inline-flex items-center rounded-md border border-border/50 bg-workshop-gray px-2.5 py-1 text-xs font-medium text-muted-foreground">
                    Montaža 15–45 min
                  </span>
                </div>
              </div>
            </ScrollReveal>

            {/* B2B audiences — stacked smaller */}
            <ScrollReveal delay={0.1}>
              <div className="group rounded-xl border border-border/50 bg-card p-7 transition-all duration-300 hover:shadow-warm-lg sm:p-8">
                <div className="flex items-start gap-5">
                  <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl bg-forge-amber/10 transition-colors duration-300 group-hover:bg-forge-amber/15">
                    <UtensilsCrossed className="h-5 w-5 text-forge-amber" />
                  </div>
                  <div>
                    <h3 className="font-display text-lg tracking-tight sm:text-xl">
                      Kafići & restorani
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                      Setovi na paleti, montaža za 45 min. Stolice koje se slažu do 6 komada — lako skladištenje van sezone.
                    </p>
                  </div>
                </div>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={0.2}>
              <div className="group rounded-xl border border-border/50 bg-card p-7 transition-all duration-300 hover:shadow-warm-lg sm:p-8">
                <div className="flex items-start gap-5">
                  <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl bg-forge-amber/10 transition-colors duration-300 group-hover:bg-forge-amber/15">
                    <Hotel className="h-5 w-5 text-forge-amber" />
                  </div>
                  <div>
                    <h3 className="font-display text-lg tracking-tight sm:text-xl">
                      Hoteli & vikendice
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                      Jedna kolekcija za ceo objekat. Uniforman izgled, zamenjivi delovi, jednostavno održavanje.
                    </p>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* ═══ GUARANTEES — Trust strip ═══ */}
      <section className="border-y border-border/40 bg-workshop-gray">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 divide-x divide-border/40 lg:grid-cols-4">
            {[
              { icon: Shield, text: "Antikorozivna zaštita" },
              { icon: Package, text: "Sigurno flat-pack pakovanje" },
              { icon: Wrench, text: "Alat i šrafovi u paketu" },
              { icon: Truck, text: "Dostava širom Srbije" },
            ].map((g, i) => (
              <ScrollReveal
                key={g.text}
                delay={i * 0.08}
                className="flex flex-col items-center gap-3 px-4 py-10 text-center sm:py-12"
              >
                <g.icon className="h-6 w-6 text-forge-amber" />
                <span className="text-xs font-semibold uppercase tracking-[0.08em] text-muted-foreground sm:text-sm">
                  {g.text}
                </span>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ CLOSING CTA — Invitation ═══ */}
      <section className="noise-overlay relative overflow-hidden bg-iron-deep py-24 text-white sm:py-32">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_oklch(0.55_0.14_55_/_0.1),transparent_60%)]" />
        <div className="absolute inset-0 opacity-20 dot-grid" />

        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <ScrollReveal className="mx-auto max-w-3xl text-center">
            <h2 className="font-display text-3xl tracking-tight sm:text-4xl lg:text-5xl">
              Pogledajte šta{" "}
              <span className="text-forge-amber-light">pravimo</span>
            </h2>
            <p className="mt-5 text-lg leading-relaxed text-white/50">
              LINEA kolekcija — moderna linija kovanog nameštaja za terase,
              dvorišta i ugostiteljske objekte. Sve modularno. Sve iz jednog
              sistema.
            </p>
            <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
              <Button
                asChild
                size="lg"
                className="bg-forge-amber px-10 text-base font-semibold text-white transition-all duration-200 hover:bg-forge-amber-light hover:scale-[1.02]"
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
                className="border-white/15 px-10 text-base text-white/80 transition-all duration-200 hover:border-white/30 hover:bg-white/5 hover:text-white"
              >
                <Link href="/kontakt">Kontaktirajte nas</Link>
              </Button>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </>
  );
}
