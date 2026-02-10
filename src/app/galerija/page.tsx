import Link from "next/link";
import { Camera, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import KovoLogo from "@/components/KovoLogo";

const placeholders = Array.from({ length: 9 }, (_, i) => ({
  id: i + 1,
  alt: `KOVO LINEA nameštaj — fotografija ${i + 1}`,
}));

export default function GalerijaPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8 lg:py-20">
      <div className="mb-12">
        <p className="mb-2 text-xs font-semibold uppercase tracking-[0.15em] text-forge-amber">
          Fotografije
        </p>
        <h1 className="font-display text-3xl tracking-tight sm:text-4xl">Galerija</h1>
        <p className="mt-3 text-muted-foreground">
          LINEA kolekcija u pravim prostorima — terase, dvorišta, kafići.
        </p>
      </div>

      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {placeholders.map((item) => (
          <div
            key={item.id}
            className="group relative aspect-[4/3] overflow-hidden rounded-2xl bg-workshop-gray"
          >
            <div className="absolute inset-0 dot-grid opacity-30" />
            <div className="flex h-full items-center justify-center">
              <KovoLogo className="h-10 w-10 opacity-8" iconOnly />
            </div>
            <div className="absolute inset-0 flex items-end bg-gradient-to-t from-iron-black/50 to-transparent opacity-0 transition-all duration-300 group-hover:opacity-100">
              <p className="p-5 text-sm font-medium text-white">{item.alt}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-16 rounded-2xl border border-border/50 bg-workshop-gray p-10 text-center sm:p-14">
        <Camera className="mx-auto h-10 w-10 text-muted-foreground/30" />
        <h2 className="mt-5 font-display text-xl tracking-tight">Fotografije uskoro</h2>
        <p className="mx-auto mt-3 max-w-md text-muted-foreground">
          LINEA kolekcija je u pripremi. Profesionalne fotografije proizvoda i
          instalacija biće dostupne uskoro.
        </p>
        <Button
          asChild
          className="mt-6 bg-forge-amber px-8 font-semibold text-white transition-all duration-200 hover:bg-forge-amber-light hover:scale-[1.02]"
        >
          <Link href="/proizvodi">
            Pogledajte proizvode
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </div>
    </div>
  );
}
