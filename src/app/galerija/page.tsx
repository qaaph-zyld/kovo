import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const galleryImages = [
  { src: "/images/products/set-family-garden.png", alt: "LINEA Family Set — baštanski nameštaj na travi", span: "lg:col-span-2 lg:row-span-2" },
  { src: "/images/products/chair-1.png", alt: "LINEA Stolica — kovana stolica sa drvenim naslonima", span: "" },
  { src: "/images/products/bench-1.png", alt: "LINEA Klupa — kovana klupa sa drvenim sedištem", span: "" },
  { src: "/images/products/set-family-1.png", alt: "LINEA Family Set — sto sa stolicama i klupom", span: "lg:col-span-2" },
  { src: "/images/products/table-family-1.png", alt: "LINEA Sto Family — kvadratni sto sa kovanim nogama", span: "" },
  { src: "/images/products/set-terasa-1.png", alt: "LINEA Terasa Set — beli set na terasi", span: "" },
  { src: "/images/products/salon-set-1.png", alt: "LINEA Salon Set — luksuzni set za dnevni boravak", span: "" },
  { src: "/images/products/lezaljka-1.png", alt: "LINEA Ležaljka — baštenska ležaljka od kovanog gvožđa", span: "lg:col-span-2" },
  { src: "/images/products/table-bistro-1.png", alt: "LINEA Sto Bistro — okrugli bistro stolovi", span: "" },
  { src: "/images/products/chair-2.png", alt: "LINEA Stolica — bela varijanta", span: "" },
  { src: "/images/products/bench-2.png", alt: "LINEA Klupa — moderna varijanta sa drvenim naslonom", span: "" },
  { src: "/images/products/set-bistro-1.png", alt: "LINEA Bistro Set — barski set sa visokim stolicama", span: "" },
  { src: "/images/products/set-hero.png", alt: "LINEA kolekcija — kompletni setovi kovanog nameštaja", span: "" },
];

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

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {galleryImages.map((item) => (
          <div
            key={item.src}
            className={`group relative aspect-[4/3] overflow-hidden rounded-xl bg-workshop-gray ${item.span}`}
          >
            <Image
              src={item.src}
              alt={item.alt}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
              sizes={item.span.includes("col-span-2") ? "(max-width: 1024px) 100vw, 66vw" : "(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"}
            />
            <div className="absolute inset-0 flex items-end bg-gradient-to-t from-iron-black/60 to-transparent opacity-0 transition-all duration-300 group-hover:opacity-100">
              <p className="p-5 text-sm font-medium text-white">{item.alt}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-16 rounded-xl border border-border/50 bg-workshop-gray p-10 text-center sm:p-14">
        <h2 className="font-display text-xl tracking-tight">Sviđa vam se ono što vidite?</h2>
        <p className="mx-auto mt-3 max-w-md text-muted-foreground">
          Pogledajte kompletnu LINEA kolekciju i pronađite savršen nameštaj za
          vaš prostor.
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
