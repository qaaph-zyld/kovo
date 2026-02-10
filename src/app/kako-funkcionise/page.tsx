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
import { Card, CardContent } from "@/components/ui/card";

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
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="mb-12 text-center">
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
          Kako funkcioniše
        </h1>
        <p className="mx-auto mt-3 max-w-2xl text-lg text-muted-foreground">
          Od porudžbine do gotovog nameštaja na vašoj terasi — u 3 jednostavna
          koraka. Bez alata iz garaže, bez komplikovanih uputstava.
        </p>
      </div>

      {/* Steps */}
      <div className="space-y-12">
        {steps.map((step, index) => (
          <div
            key={step.number}
            className={`flex flex-col gap-8 lg:flex-row lg:items-center ${
              index % 2 === 1 ? "lg:flex-row-reverse" : ""
            }`}
          >
            <div className="flex-1">
              <div className="flex items-center gap-3">
                <span className="text-5xl font-bold text-amber-700/20">
                  {step.number}
                </span>
                <step.icon className="h-8 w-8 text-amber-700" />
              </div>
              <h2 className="mt-3 text-2xl font-bold">{step.title}</h2>
              <p className="mt-2 text-muted-foreground">{step.description}</p>
              <ul className="mt-4 space-y-2">
                {step.details.map((detail) => (
                  <li key={detail} className="flex items-start gap-2 text-sm">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 flex-shrink-0 text-green-600" />
                    {detail}
                  </li>
                ))}
              </ul>
            </div>
            <div className="aspect-video flex-1 rounded-xl bg-secondary" />
          </div>
        ))}
      </div>

      {/* Guarantees */}
      <div className="mt-20">
        <h2 className="mb-8 text-center text-2xl font-bold">
          Zašto modularno?
        </h2>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {guarantees.map((g) => (
            <Card key={g.title} className="border-border/60 text-center">
              <CardContent className="p-6">
                <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-amber-50 text-amber-700">
                  <g.icon className="h-6 w-6" />
                </div>
                <h3 className="font-semibold">{g.title}</h3>
                <p className="mt-1 text-sm text-muted-foreground">
                  {g.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div className="mt-16 text-center">
        <h2 className="text-2xl font-bold">Spremni da probate?</h2>
        <p className="mt-2 text-muted-foreground">
          Pogledajte LINEA kolekciju i poručite sa dostavom širom Srbije.
        </p>
        <div className="mt-6 flex justify-center gap-3">
          <Button
            asChild
            size="lg"
            className="bg-amber-700 text-white hover:bg-amber-800"
          >
            <Link href="/proizvodi">
              Pogledajte proizvode
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
          <Button asChild variant="outline" size="lg">
            <Link href="/kontakt">Kontaktirajte nas</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
