import type { Metadata } from "next";
import Link from "next/link";
import { Truck, MapPin, Package, Clock, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export const metadata: Metadata = {
  title: "Dostava",
  description:
    "Dostava kovanog nameštaja širom Srbije. Kurirska dostava za manje pakete, paletna za setove. Flat-pack pakovanje, sigurno i transparentno.",
};

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
    <>
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8 lg:py-20">
        <div className="mb-12">
          <p className="mb-2 text-xs font-semibold uppercase tracking-[0.15em] text-forge-amber">
            Transport
          </p>
          <h1 className="font-display text-3xl tracking-tight sm:text-4xl">
            Dostava i isporuka
          </h1>
          <p className="mt-3 text-muted-foreground">
            Transparentne cene, sigurno pakovanje, dostava širom Srbije.
          </p>
        </div>

        {/* Delivery zones */}
        <div className="mb-20 grid gap-7 sm:grid-cols-3">
          {zones.map((zone) => (
            <div
              key={zone.zone}
              className={`rounded-xl border p-7 transition-all duration-300 hover:shadow-warm ${
                zone.highlight ? "border-forge-amber/40 ring-2 ring-forge-amber/20" : "border-border/50"
              }`}
            >
              {zone.highlight && (
                <Badge className="mb-4 bg-forge-amber font-semibold text-white">
                  Preporučeno
                </Badge>
              )}
              <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-forge-amber/10">
                {zone.zone.includes("Lično") ? (
                  <MapPin className="h-5 w-5 text-forge-amber" />
                ) : zone.zone.includes("Kurir") ? (
                  <Package className="h-5 w-5 text-forge-amber" />
                ) : (
                  <Truck className="h-5 w-5 text-forge-amber" />
                )}
              </div>
              <h3 className="text-lg font-semibold tracking-tight">{zone.zone}</h3>
              <p className="mt-1 text-sm text-muted-foreground">
                {zone.location}
              </p>
              <div className="mt-5 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Cena</span>
                  <span className="font-mono font-semibold">{zone.price}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Rok</span>
                  <span className="flex items-center gap-1 font-mono text-sm">
                    <Clock className="h-3 w-3 text-forge-amber/60" />
                    {zone.time}
                  </span>
                </div>
              </div>
              <p className="mt-5 rounded-xl bg-workshop-gray p-3 text-xs leading-relaxed text-muted-foreground">
                {zone.note}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Packaging info */}
      <section className="noise-overlay relative overflow-hidden bg-iron-deep py-20 text-white sm:py-28">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_oklch(0.55_0.14_55_/_0.08),transparent_60%)]" />
        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <p className="mb-2 text-xs font-semibold uppercase tracking-[0.15em] text-forge-amber-light">
            Pakovanje
          </p>
          <h2 className="font-display text-2xl tracking-tight sm:text-3xl">Kako pakujemo</h2>
          <p className="mt-4 text-white/60">
            Svaki proizvod je dizajniran da putuje sigurno. Naš standard
            pakovanja:
          </p>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
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
                className="flex items-start gap-2.5 text-sm text-white/60"
              >
                <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-forge-amber" />
                {item}
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 sm:py-28 lg:px-8">
        {/* FAQ */}
        <div className="mb-20">
          <div className="mb-10 text-center">
            <p className="mb-2 text-xs font-semibold uppercase tracking-[0.15em] text-forge-amber">
              FAQ
            </p>
            <h2 className="font-display text-2xl tracking-tight sm:text-3xl">Česta pitanja</h2>
          </div>
          <div className="grid gap-5 sm:grid-cols-2">
            {faq.map((item) => (
              <div key={item.q} className="rounded-xl border border-border/50 bg-card p-7 transition-all duration-300 hover:shadow-warm">
                <h3 className="font-semibold tracking-tight">{item.q}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {item.a}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="text-center">
          <h2 className="font-display text-2xl tracking-tight sm:text-3xl">Imate još pitanja?</h2>
          <p className="mt-3 text-muted-foreground">
            Kontaktirajte nas — rado ćemo pomoći.
          </p>
          <div className="mt-8 flex justify-center gap-3">
            <Button
              asChild
              size="lg"
              className="bg-forge-amber px-8 font-semibold text-white transition-all duration-200 hover:bg-forge-amber-light hover:scale-[1.02]"
            >
              <Link href="/kontakt">
                Kontaktirajte nas
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="px-8">
              <Link href="/proizvodi">Pogledajte proizvode</Link>
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}
