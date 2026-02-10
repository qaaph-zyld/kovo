import Link from "next/link";
import { Camera, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const placeholders = Array.from({ length: 9 }, (_, i) => ({
  id: i + 1,
  alt: `KOVO LINEA nameštaj — fotografija ${i + 1}`,
}));

export default function GalerijaPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="mb-10">
        <h1 className="text-3xl font-bold tracking-tight">Galerija</h1>
        <p className="mt-2 text-muted-foreground">
          LINEA kolekcija u pravim prostorima — terase, dvorišta, kafići.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {placeholders.map((item) => (
          <div
            key={item.id}
            className="group relative aspect-[4/3] overflow-hidden rounded-xl bg-secondary"
          >
            <div className="flex h-full items-center justify-center text-muted-foreground/20">
              <Camera className="h-12 w-12" />
            </div>
            <div className="absolute inset-0 flex items-end bg-gradient-to-t from-black/40 to-transparent opacity-0 transition-opacity group-hover:opacity-100">
              <p className="p-4 text-sm text-white">{item.alt}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-12 rounded-xl border border-border bg-secondary/50 p-8 text-center">
        <Camera className="mx-auto h-10 w-10 text-muted-foreground/40" />
        <h2 className="mt-4 text-xl font-bold">Fotografije uskoro</h2>
        <p className="mt-2 text-muted-foreground">
          LINEA kolekcija je u pripremi. Profesionalne fotografije proizvoda i
          instalacija biće dostupne uskoro.
        </p>
        <Button
          asChild
          className="mt-4 bg-amber-700 text-white hover:bg-amber-800"
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
