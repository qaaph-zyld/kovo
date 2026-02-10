export interface ProductModule {
  name: string;
  description: string;
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  category: "stolica" | "sto" | "klupa" | "set";
  shortDescription: string;
  description: string;
  price: number;
  originalPrice?: number;
  dimensions: {
    width: number;
    depth: number;
    height: number;
  };
  weight: number;
  assemblyTime: number; // minutes
  modules: ProductModule[];
  images: string[];
  stackable?: number;
  kdParts?: number;
  inStock: boolean;
  featured: boolean;
  bundleItems?: { productId: string; quantity: number }[];
}

export const products: Product[] = [
  {
    id: "linea-stolica",
    slug: "linea-stolica",
    name: "LINEA Stolica",
    category: "stolica",
    shortDescription: "Moderna kovana stolica sa drvenim sedištem",
    description:
      "Elegantna stolica čistih linija, dizajnirana za slaganje do 6 komada. Modularna konstrukcija omogućava zamenu naslona i sedišta bez alata. Idealna za terase, dvorišta i ugostiteljske objekte.",
    price: 12900,
    dimensions: { width: 42, depth: 42, height: 90 },
    weight: 11,
    assemblyTime: 15,
    modules: [
      { name: "Bočni ramovi (L/D)", description: "Čelični ram sa završnom obradom" },
      { name: "Sedalni okvir", description: "Pravougaoni okvir koji spaja bočne strane" },
      { name: "Naslon panel", description: "Zamenljivi dizajn panel" },
      { name: "Drveno sedište", description: "Masivno drvo, 4 šrafa" },
    ],
    images: ["/images/placeholder-chair.jpg"],
    stackable: 6,
    inStock: true,
    featured: true,
  },
  {
    id: "linea-sto-bistro",
    slug: "linea-sto-bistro",
    name: "LINEA Sto Bistro",
    category: "sto",
    shortDescription: "Okrugli bistro sto Ø60cm sa odvojivom pločom",
    description:
      "Kompaktan bistro sto sa KD konstrukcijom — baza i ploča se razdvajaju za bezbedan transport. Centralna nogara pruža maksimalan prostor za noge. Ploča od masivnog drveta sa zaobljenim ivicama.",
    price: 15900,
    dimensions: { width: 60, depth: 60, height: 75 },
    weight: 13,
    assemblyTime: 10,
    modules: [
      { name: "Baza (nogara)", description: "Čelična baza sa 3-4 noge i flanš pločicom" },
      { name: "Drvena ploča", description: "Okrugla ploča Ø60cm, masivno drvo" },
    ],
    images: ["/images/placeholder-table-round.jpg"],
    kdParts: 2,
    inStock: true,
    featured: true,
  },
  {
    id: "linea-sto-family",
    slug: "linea-sto-family",
    name: "LINEA Sto Family",
    category: "sto",
    shortDescription: "Kvadratni porodični sto 80×80cm",
    description:
      "Prostrani porodični sto za 4 osobe. Ista KD baza kao bistro model, veća drvena ploča. Savršen za porodična okupljanja na terasi ili u bašti.",
    price: 19900,
    dimensions: { width: 80, depth: 80, height: 75 },
    weight: 18,
    assemblyTime: 15,
    modules: [
      { name: "Baza (nogara)", description: "Čelična baza sa 4 noge i flanš pločicama" },
      { name: "Drvena ploča", description: "Kvadratna ploča 80×80cm, masivno drvo" },
    ],
    images: ["/images/placeholder-table-square.jpg"],
    kdParts: 2,
    inStock: true,
    featured: false,
  },
  {
    id: "linea-klupa-120",
    slug: "linea-klupa-120",
    name: "LINEA Klupa 120",
    category: "klupa",
    shortDescription: "Dvosedna klupa 120cm sa naslonom",
    description:
      "Klasična baštenska klupa modernog dizajna. KD konstrukcija u 4 dela — bočne strane, sedalni okvir, naslon i drvene daske. Vizuelno usklađena sa LINEA stolicama za kompletnu kolekciju.",
    price: 22900,
    dimensions: { width: 120, depth: 45, height: 70 },
    weight: 25,
    assemblyTime: 30,
    modules: [
      { name: "Bočne strane (L/D)", description: "Kovane bočne strane sa istim dizajnom kao stolica" },
      { name: "Sedalni okvir", description: "Čelični okvir za drvene daske" },
      { name: "Naslon panel", description: "Opcioni naslon, šrafi se" },
      { name: "Drvene daske", description: "3 daske masivnog drveta" },
    ],
    images: ["/images/placeholder-bench.jpg"],
    kdParts: 4,
    inStock: true,
    featured: true,
  },
  {
    id: "linea-bistro-set",
    slug: "linea-bistro-set",
    name: "LINEA Bistro Set",
    category: "set",
    shortDescription: "2 stolice + 1 bistro sto — komplet za terasu",
    description:
      "Savršen set za mali balkon ili terasu kafića. Dve LINEA stolice i jedan bistro sto Ø60cm. Stiže na jednoj paleti, montira se za 30 minuta. Ušteda 10% u odnosu na pojedinačnu kupovinu.",
    price: 37500,
    originalPrice: 41700,
    dimensions: { width: 60, depth: 60, height: 90 },
    weight: 35,
    assemblyTime: 30,
    modules: [],
    images: ["/images/placeholder-bistro-set.jpg"],
    inStock: true,
    featured: true,
    bundleItems: [
      { productId: "linea-stolica", quantity: 2 },
      { productId: "linea-sto-bistro", quantity: 1 },
    ],
  },
  {
    id: "linea-family-set",
    slug: "linea-family-set",
    name: "LINEA Family Set",
    category: "set",
    shortDescription: "4 stolice + 1 family sto — komplet za porodicu",
    description:
      "Kompletan set za porodično okupljanje. Četiri LINEA stolice i jedan family sto 80×80cm. Jedna paleta, jedna dostava, jedna cena. Ušteda 15% u odnosu na pojedinačnu kupovinu.",
    price: 62900,
    originalPrice: 71500,
    dimensions: { width: 80, depth: 80, height: 90 },
    weight: 62,
    assemblyTime: 45,
    modules: [],
    images: ["/images/placeholder-family-set.jpg"],
    inStock: true,
    featured: true,
    bundleItems: [
      { productId: "linea-stolica", quantity: 4 },
      { productId: "linea-sto-family", quantity: 1 },
    ],
  },
];

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}

export function getProductById(id: string): Product | undefined {
  return products.find((p) => p.id === id);
}

export function getProductsByCategory(category: Product["category"]): Product[] {
  return products.filter((p) => p.category === category);
}

export function getFeaturedProducts(): Product[] {
  return products.filter((p) => p.featured);
}

export function formatPrice(price: number): string {
  return new Intl.NumberFormat("sr-RS", {}).format(price) + " RSD";
}
