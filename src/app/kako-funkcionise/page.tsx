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
} from "lucide-react";
import { Button } from "@/components/ui/button";

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
    icon: Shield,
    title: "Antikorozivna zaštita",
    description: "Prajmer + 2 sloja završne boje za trajnost na otvorenom",
  },
  {
    icon: Timer,
    title: "Brza montaža",
    description: "Stolica 15 min, sto 10 min, klupa 30 min, set do 45 min",
  },
  {
    icon: CheckCircle2,
    title: "Skriveni spojevi",
    description: "Šrafovi sa unutrašnje strane — izgled ostaje premium",
  },
  {
    icon: QrCode,
    title: "Video uputstvo",
    description: "QR kod u svakom paketu — skenirajte i pratite korak po korak",
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
              Od porudžbine do gotovog nameštaja na vašoj terasi — u 3 jednostavna
              koraka. Bez alata iz garaže, bez komplikovanih uputstava.
            </p>
          </div>
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
                <div className="relative aspect-video flex-1 overflow-hidden rounded-2xl bg-workshop-gray">
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
              Zašto modularno?
            </h2>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {guarantees.map((g) => (
              <div key={g.title} className="rounded-2xl border border-border/50 bg-card p-7 text-center transition-all duration-300 hover:shadow-warm">
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
