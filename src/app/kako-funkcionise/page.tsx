import Link from "next/link";
import {
  Package,
  Truck,
  Wrench,
  Timer,
  Shield,
  CheckCircle2,
  ArrowRight,
  QrCode,
  Puzzle,
  Repeat2,
  Replace,
  Layers,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import ScrollReveal from "@/components/ScrollReveal";

const steps = [
  {
    number: "01",
    icon: Package,
    title: "Izaberite i poručite",
    description:
      "Odaberite proizvode ili gotov set iz LINEA kolekcije. Poručite online sa dostavom ili ličnim preuzimanjem u Loznici.",
    details: [
      "Pojedinačni proizvodi ili setovi sa popustom",
      "Plaćanje karticom ili pouzećem",
      "B2B ponude za veće količine",
    ],
  },
  {
    number: "02",
    icon: Truck,
    title: "Sigurna isporuka",
    description:
      "Vaš nameštaj stiže flat-pack na euro-paleti ili kao kurir paket. Svaki deo je zaštićen penom i kartonom.",
    details: [
      "Euro-paleta + streč folija + kartonski uglovi",
      "Pena na svim kontaktnim tačkama",
      "Ništa metal-na-metal, ništa drvo-na-metal",
    ],
  },
  {
    number: "03",
    icon: Wrench,
    title: "Brza montaža",
    description:
      "Sklopite nameštaj za 15–45 minuta sa priloženim alatom. QR kod vodi do video uputstva korak po korak.",
    details: [
      "Imbus ključ i svi šrafovi u paketu",
      "Pozicioni pinovi — delovi se sami poravnavaju",
      "QR kod → 60-sekundni video uputstvo",
    ],
  },
];

const guarantees = [
  {
    icon: Puzzle,
    title: "Deljeni moduli",
    description: "Stolica i klupa dele iste naslone. Sto Bistro i Family dele istu bazu.",
  },
  {
    icon: Replace,
    title: "Zamenski delovi",
    description: "Svaki drveni modul se menja nezavisno — sedište, daske, ploča.",
  },
  {
    icon: Timer,
    title: "Montaža 15–45 min",
    description: "Imbus ključ + pozicioni pinovi — delovi se sami poravnavaju.",
  },
  {
    icon: QrCode,
    title: "QR video uputstvo",
    description: "60-sekundni video korak po korak — skenirajte QR iz paketa.",
  },
];

export default function KakoFunkcionisePage() {
  return (
    <>
      {/* Header */}
      <section className="relative overflow-hidden bg-workshop-gray py-16 sm:py-20">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-forge-amber/[0.02] to-transparent" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.15em] text-forge-amber">
              Proces
            </p>
            <h1 className="font-display text-3xl tracking-tight sm:text-4xl lg:text-5xl">
              Kako funkcioniše
            </h1>
            <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-muted-foreground">
              Modularni sistem: isti delovi se dele između proizvoda, menjaju se bez
              kupovine novog komada, i stavljaju se za 15–45 minuta.
            </p>
          </div>
        </div>
      </section>

      {/* Modular System Explanation */}
      <section className="noise-overlay relative overflow-hidden bg-iron-deep py-20 text-white sm:py-28">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_oklch(0.55_0.14_55_/_0.1),transparent_60%)]" />
        <div className="absolute left-0 top-0 h-full w-1/3 opacity-20 dot-grid" />

        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <ScrollReveal className="mb-12">
            <p className="mb-2 text-xs font-semibold uppercase tracking-[0.15em] text-forge-amber-light">
              Modularna platforma
            </p>
            <h2 className="font-display text-2xl tracking-tight sm:text-3xl lg:text-4xl">
              Šta znači &ldquo;modularno&rdquo; kod nas
            </h2>
            <p className="mt-3 max-w-2xl text-base leading-relaxed text-white/60">
              Svaki LINEA proizvod je sastavljen od standardizovanih modula — delova
              koji se dele između različitih proizvoda, menjaju se nezavisno, i spajaju
              istim spojevima.
            </p>
          </ScrollReveal>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <ScrollReveal delay={0} className="rounded-xl border border-white/10 bg-white/[0.03] p-7 backdrop-blur-sm">
              <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-forge-amber/10">
                <Repeat2 className="h-5 w-5 text-forge-amber-light" />
              </div>
              <h3 className="text-lg font-semibold">Zamenljivi nasloni</h3>
              <p className="mt-2 text-sm leading-relaxed text-white/60">
                Stolica i klupa koriste isti naslon panel. Birate između 3 dizajna:
                Klasik, Rešetka ili Luk. Iste rupe, isti šrafovi — zamena za 3 minuta.
              </p>
              <p className="mt-3 font-mono text-xs text-forge-amber-light">
                M8 hex × 2–4 + slot rupe
              </p>
            </ScrollReveal>

            <ScrollReveal delay={0.1} className="rounded-xl border border-white/10 bg-white/[0.03] p-7 backdrop-blur-sm">
              <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-forge-amber/10">
                <Layers className="h-5 w-5 text-forge-amber-light" />
              </div>
              <h3 className="text-lg font-semibold">Univerzalna baza stola</h3>
              <p className="mt-2 text-sm leading-relaxed text-white/60">
                Jedna čelična nogara nosi okruglu Ø60cm i kvadratnu 80×80cm ploču.
                Kupite Bistro danas, nadogradite na Family sutra — baza ostaje.
              </p>
              <p className="mt-3 font-mono text-xs text-forge-amber-light">
                M10 hex × 4 + flanš pločica + centering pin
              </p>
            </ScrollReveal>

            <ScrollReveal delay={0.2} className="rounded-xl border border-white/10 bg-white/[0.03] p-7 backdrop-blur-sm">
              <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-forge-amber/10">
                <Replace className="h-5 w-5 text-forge-amber-light" />
              </div>
              <h3 className="text-lg font-semibold">Zamena drvenih delova</h3>
              <p className="mt-2 text-sm leading-relaxed text-white/60">
                Sedište stolice, daske klupe, ploča stola — svaki drveni modul se
                skida i menja nezavisno. Osvežite nameštaj novim drvom posle 5+ sezona.
              </p>
              <p className="mt-3 font-mono text-xs text-forge-amber-light">
                M8 hex × 4–6 na sedalni okvir
              </p>
            </ScrollReveal>
          </div>

          {/* Connection system detail */}
          <ScrollReveal delay={0.3} className="mt-10 rounded-xl border border-white/10 bg-white/[0.03] p-7 backdrop-blur-sm sm:p-8">
            <p className="mb-4 text-xs font-semibold uppercase tracking-[0.15em] text-forge-amber-light">
              Sistem spojeva
            </p>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              <div>
                <p className="text-sm font-semibold">M8/M10 inox hex</p>
                <p className="mt-0.5 text-xs text-white/40">Standardni šrafovi za sve spojeve</p>
              </div>
              <div>
                <p className="text-sm font-semibold">Pozicioni pinovi</p>
                <p className="mt-0.5 text-xs text-white/40">Delovi se sami poravnavaju</p>
              </div>
              <div>
                <p className="text-sm font-semibold">Slot rupe</p>
                <p className="mt-0.5 text-xs text-white/40">Tolerancije za farbanu površinu</p>
              </div>
              <div>
                <p className="text-sm font-semibold">Skriveni spojevi</p>
                <p className="mt-0.5 text-xs text-white/40">Sve sa unutrašnje strane</p>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Steps */}
      <section className="py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="space-y-20">
            {steps.map((step, index) => (
              <div
                key={step.number}
                className={`flex flex-col gap-10 lg:flex-row lg:items-center ${
                  index % 2 === 1 ? "lg:flex-row-reverse" : ""
                }`}
              >
                <div className="flex-1">
                  <div className="flex items-center gap-4">
                    <span className="font-mono text-5xl font-bold text-forge-amber/15">
                      {step.number}
                    </span>
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-forge-amber/10">
                      <step.icon className="h-6 w-6 text-forge-amber" />
                    </div>
                  </div>
                  <h2 className="mt-4 font-display text-2xl tracking-tight sm:text-3xl">{step.title}</h2>
                  <p className="mt-3 leading-relaxed text-muted-foreground">{step.description}</p>
                  <ul className="mt-5 space-y-2.5">
                    {step.details.map((detail) => (
                      <li key={detail} className="flex items-start gap-2.5 text-sm">
                        <CheckCircle2 className="mt-0.5 h-4 w-4 flex-shrink-0 text-green-600" />
                        {detail}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="relative aspect-video flex-1 overflow-hidden rounded-xl bg-workshop-gray">
                  <div className="absolute inset-0 dot-grid opacity-40" />
                  <div className="flex h-full items-center justify-center">
                    <step.icon className="h-16 w-16 text-foreground/8" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Guarantees */}
      <section className="relative overflow-hidden bg-workshop-gray py-20 sm:py-28">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-forge-amber/[0.02] to-transparent" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-12 text-center">
            <p className="mb-2 text-xs font-semibold uppercase tracking-[0.15em] text-forge-amber">
              Garancije
            </p>
            <h2 className="font-display text-2xl tracking-tight sm:text-3xl">
              Zašto modularan nameštaj?
            </h2>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {guarantees.map((g) => (
              <div key={g.title} className="rounded-xl border border-border/50 bg-card p-7 text-center transition-all duration-300 hover:shadow-warm">
                <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-forge-amber/10">
                  <g.icon className="h-6 w-6 text-forge-amber" />
                </div>
                <h3 className="font-semibold tracking-tight">{g.title}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
                  {g.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
          <h2 className="font-display text-2xl tracking-tight sm:text-3xl">Spremni da probate?</h2>
          <p className="mt-3 text-muted-foreground">
            Pogledajte LINEA kolekciju i poručite sa dostavom širom Srbije.
          </p>
          <div className="mt-8 flex justify-center gap-3">
            <Button
              asChild
              size="lg"
              className="bg-forge-amber px-8 font-semibold text-white transition-all duration-200 hover:bg-forge-amber-light hover:scale-[1.02]"
            >
              <Link href="/proizvodi">
                Pogledajte proizvode
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="px-8">
              <Link href="/kontakt">Kontaktirajte nas</Link>
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
