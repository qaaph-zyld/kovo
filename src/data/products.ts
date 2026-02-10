export interface ProductModule {
  name: string;
  description: string;
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  category: "stolica" | "sto" | "klupa" | "set" | "lezaljka" | "salon";
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
    images: ["/images/products/chair-1.png", "/images/products/chair-2.png"],
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
    images: ["/images/products/table-bistro-1.png"],
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
    images: ["/images/products/table-family-1.png"],
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
    images: ["/images/products/bench-1.png", "/images/products/bench-2.png"],
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
    images: ["/images/products/set-bistro-1.png"],
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
    images: ["/images/products/set-family-1.png", "/images/products/set-family-garden.png"],
    inStock: true,
    featured: true,
    bundleItems: [
      { productId: "linea-stolica", quantity: 4 },
      { productId: "linea-sto-family", quantity: 1 },
    ],
  },
  {
    id: "linea-terasa-set",
    slug: "linea-terasa-set",
    name: "LINEA Terasa Set",
    category: "set",
    shortDescription: "4 stolice + sto — elegantni beli set za terasu",
    description:
      "Elegantan set u beloj boji sa crnim drvenim elementima. Četiri stolice sa naslonima i jedan prostrani sto. Idealan za moderne terase i bašte kafića. Bela antikorozivna završna obrada za čist, savremeni izgled.",
    price: 74900,
    originalPrice: 84900,
    dimensions: { width: 90, depth: 90, height: 90 },
    weight: 68,
    assemblyTime: 45,
    modules: [],
    images: ["/images/products/set-terasa-1.png"],
    inStock: true,
    featured: false,
    bundleItems: [
      { productId: "linea-stolica", quantity: 4 },
      { productId: "linea-sto-family", quantity: 1 },
    ],
  },
  {
    id: "linea-lezaljka",
    slug: "linea-lezaljka",
    name: "LINEA Ležaljka",
    category: "lezaljka",
    shortDescription: "Baštenska ležaljka sa podesivim naslonom",
    description:
      "Kovana baštenska ležaljka sa podesivim naslonom i drvenim naslonima za ruke. Robustan čelični ram sa ornamentalnim detaljima. Rešetkasta konstrukcija sedišta predviđena za jastuk. Savršena za opuštanje pored bazena ili u bašti.",
    price: 29900,
    dimensions: { width: 180, depth: 65, height: 85 },
    weight: 28,
    assemblyTime: 25,
    modules: [
      { name: "Glavni ram", description: "Čelični ram sa ornamentalnim spiralama" },
      { name: "Naslon (podesiv)", description: "Rešetkasti naslon sa 3 pozicije" },
      { name: "Drveni nasloni za ruke", description: "Masivno drvo, montaža šrafovima" },
    ],
    images: ["/images/products/lezaljka-1.png"],
    inStock: true,
    featured: true,
  },
  {
    id: "linea-salon-set",
    slug: "linea-salon-set",
    name: "LINEA Salon Set",
    category: "salon",
    shortDescription: "Sofa + klub sto + tabure — luksuzni set za dnevni boravak",
    description:
      "Luksuzni set za enterijer u zlatnoj završnoj obradi. Dvosed sa tapaciranim sedištem i naslonom, stakleni klub sto i okrugli tabure. Kovani detalji sa spiralnim ornamentima. Elegancija za dnevne sobe, hotelske lobije i ekskluzivne prostore.",
    price: 119900,
    dimensions: { width: 160, depth: 75, height: 95 },
    weight: 55,
    assemblyTime: 40,
    modules: [
      { name: "Dvosed (ram)", description: "Kovani ram sa zlatnom završnom obradom" },
      { name: "Jastuk sedišta + naslona", description: "Tapaciran, capitonné završna obrada" },
      { name: "Klub sto", description: "Kovana baza + staklena ploča" },
      { name: "Tabure", description: "Okrugli tabure sa tapaciranim sedištem" },
    ],
    images: ["/images/products/salon-set-1.png"],
    inStock: true,
    featured: true,
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
