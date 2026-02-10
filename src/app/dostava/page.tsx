import Link from "next/link";
import { Truck, MapPin, Package, Clock, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const zones = [
  {
    zone: "Lično preuzimanje",
    location: "Loznica",
    price: "Besplatno",
    time: "Odmah",
    highlight: true,
    note: "Popust 5% na celokupnu porudžbinu",
  },
  {
    zone: "Kurirska dostava",
    location: "Cela Srbija",
    price: "1.200 RSD",
    time: "2–5 radnih dana",
    highlight: false,
    note: "Za manje pakete (pojedinačne stolice, stolove)",
  },
  {
    zone: "Paletna dostava",
    location: "Cela Srbija",
    price: "3.500 RSD",
    time: "3–7 radnih dana",
    highlight: false,
    note: "Za setove i veće porudžbine — najsigurniji transport",
  },
];

const faq = [
  {
    q: "Kako je nameštaj zapakovan?",
    a: "Svaki proizvod dolazi u flat-pack pakovanju na euro-paleti ili u kurirskom paketu. Delovi su zaštićeni penom, kartonskim uglovima i streč folijom. Šrafovi, imbus ključ i QR uputstvo su u priloženoj kesici.",
  },
  {
    q: "Da li mogu lično da preuzmem porudžbinu?",
    a: "Da! Dođite u našu radionicu u Loznici i uštedite 5% na celokupnu porudžbinu. Možete videti nameštaj uživo pre kupovine.",
  },
  {
    q: "Koliko traje montaža?",
    a: "Stolica: ~15 min, sto: ~10 min, klupa: ~30 min, kompletan set: do 45 min. Sve što vam treba je u paketu — imbus ključ i šrafovi su priloženi.",
  },
  {
    q: "Šta ako stigne oštećeno?",
    a: "Kontaktirajte nas u roku od 48h od prijema sa slikama oštećenja. Zamenjujemo ili popravljamo svaki oštećen deo besplatno.",
  },
  {
    q: "Da li dostavljate van Srbije?",
    a: "Trenutno dostavljamo samo na teritoriji Srbije. Za regionalne porudžbine (BiH, Crna Gora, Hrvatska) kontaktirajte nas za posebnu ponudu.",
  },
  {
    q: "Mogu li da poručim samo metalni deo bez drveta?",
    a: "Da, nudimo opciju 'metal kit' — šaljemo samo kovani deo, a drvo/jastuke nabavljate lokalno po našim šablonima. Kontaktirajte nas za detalje.",
  },
];

export default function DostavaPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="mb-10">
        <h1 className="text-3xl font-bold tracking-tight">
          Dostava i isporuka
        </h1>
        <p className="mt-2 text-muted-foreground">
          Transparentne cene, sigurno pakovanje, dostava širom Srbije.
        </p>
      </div>

      {/* Delivery zones */}
      <div className="mb-16 grid gap-6 sm:grid-cols-3">
        {zones.map((zone) => (
          <Card
            key={zone.zone}
            className={`border-border/60 ${
              zone.highlight ? "ring-2 ring-amber-700" : ""
            }`}
          >
            <CardContent className="p-6">
              {zone.highlight && (
                <Badge className="mb-3 bg-amber-700 text-white">
                  Preporučeno
                </Badge>
              )}
              <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-amber-50 text-amber-700">
                {zone.zone.includes("Lično") ? (
                  <MapPin className="h-5 w-5" />
                ) : zone.zone.includes("Kurir") ? (
                  <Package className="h-5 w-5" />
                ) : (
                  <Truck className="h-5 w-5" />
                )}
              </div>
              <h3 className="text-lg font-semibold">{zone.zone}</h3>
              <p className="mt-1 text-sm text-muted-foreground">
                {zone.location}
              </p>
              <div className="mt-4 space-y-1">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Cena</span>
                  <span className="font-semibold">{zone.price}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Rok</span>
                  <span className="flex items-center gap-1 text-sm">
                    <Clock className="h-3 w-3" />
                    {zone.time}
                  </span>
                </div>
              </div>
              <p className="mt-4 rounded-md bg-secondary p-2 text-xs text-muted-foreground">
                {zone.note}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Packaging info */}
      <div className="mb-16 rounded-xl bg-zinc-950 p-8 text-white sm:p-12">
        <h2 className="text-2xl font-bold">Kako pakujemo</h2>
        <p className="mt-3 text-zinc-400">
          Svaki proizvod je dizajniran da putuje sigurno. Naš standard
          pakovanja:
        </p>
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {[
            "Euro-paleta + streč folija",
            "Kartonski uglovi (edge protectors)",
            "Pena 3–5mm na kontaktnim tačkama",
            "Talasasti karton kao rukav oko ramova",
            "Ništa metal-na-metal, ništa drvo-na-metal",
            "Kesica: šrafovi + imbus + QR uputstvo",
          ].map((item) => (
            <div
              key={item}
              className="flex items-start gap-2 text-sm text-zinc-300"
            >
              <span className="mt-1 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-amber-500" />
              {item}
            </div>
          ))}
        </div>
      </div>

      {/* FAQ */}
      <div className="mb-16">
        <h2 className="mb-8 text-2xl font-bold">Česta pitanja</h2>
        <div className="grid gap-4 sm:grid-cols-2">
          {faq.map((item) => (
            <Card key={item.q} className="border-border/60">
              <CardContent className="p-6">
                <h3 className="font-semibold">{item.q}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {item.a}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div className="text-center">
        <h2 className="text-2xl font-bold">Imate još pitanja?</h2>
        <p className="mt-2 text-muted-foreground">
          Kontaktirajte nas — rado ćemo pomoći.
        </p>
        <div className="mt-6 flex justify-center gap-3">
          <Button
            asChild
            size="lg"
            className="bg-amber-700 text-white hover:bg-amber-800"
          >
            <Link href="/kontakt">
              Kontaktirajte nas
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
          <Button asChild variant="outline" size="lg">
            <Link href="/proizvodi">Pogledajte proizvode</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
