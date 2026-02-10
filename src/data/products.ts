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
  modularHighlight: string; // one-liner about what makes this product modular
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
  hasModularAssembly: boolean; // true if this product has a full assembly in modules.ts
}

export const products: Product[] = [
  {
    id: "linea-stolica",
    slug: "linea-stolica",
    name: "LINEA Stolica",
    category: "stolica",
    shortDescription: "Modularna stolica — menjajte naslon bez promene rama",
    description:
      "Jedna baza, više lica. Bočni ramovi + sedalni okvir + zamenljivi naslon panel + drveno sedište. Naslon se menja bez alata — izaberite Klasik, Rešetku ili Luk. Slaže se do 6 komada. Montaža za 15 minuta.",
    modularHighlight: "Zamenljiv naslon panel — 3 dizajna, isti ram",
    price: 12900,
    hasModularAssembly: true,
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
    shortDescription: "Univerzalna baza + okrugla ploča Ø60cm",
    description:
      "Ista čelična baza kao Family sto — samo druga ploča. KD u 2 dela: baza (nogara) + drvena ploča, spojeni flanš pločicom. Sutra možete zameniti ploču za veću bez kupovine novog stola.",
    modularHighlight: "Univerzalna baza — ista nogara za Bistro i Family ploču",
    price: 15900,
    hasModularAssembly: true,
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
    shortDescription: "Univerzalna baza + kvadratna ploča 80×80cm",
    description:
      "Ista baza kao Bistro sto, veća drvena ploča 80×80cm za 4 osobe. KD u 2 dela na paleti. Započnite sa Bistro pločom, nadogradite na Family kad vam zatreba — baza ostaje ista.",
    modularHighlight: "Ista baza kao Bistro — nadogradite ploču kad poželite",
    price: 19900,
    hasModularAssembly: true,
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
    shortDescription: "Modularna klupa — isti naslon panel kao stolica",
    description:
      "KD u 4 dela: bočne strane + sedalni okvir + naslon panel + 3 drvene daske. Naslon je isti kao na stolici — Klasik, Rešetka ili Luk. Bočne strane se ugnjezde pri pakovanju. Isti dizajn DNK kao LINEA stolica.",
    modularHighlight: "Deli naslon panele sa stolicom — ista kolekcija, isti jezik",
    price: 22900,
    hasModularAssembly: true,
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
      "Savršen set za mali balkon ili terasu kafića. Dve LINEA stolice i jedan bistro sto Ø60cm. Stiže na jednoj paleti, montira se za 30 minuta. Svi delovi su iz istog modularnog sistema — zamena naslona ili ploče je moguća i nakon kupovine.",
    modularHighlight: "Jedna paleta, jedan sistem — svi delovi zamenljivi",
    price: 37500,
    hasModularAssembly: false,
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
      "Kompletan set za porodično okupljanje. Četiri LINEA stolice i jedan family sto 80×80cm. Jedna paleta, jedna dostava, jedna cena. Svaki element je deo modularnog sistema — zamenite naslon, ploču ili drvo kad poželite.",
    modularHighlight: "4 stolice + sto iz istog modularnog sistema",
    price: 62900,
    hasModularAssembly: false,
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
      "Elegantan set u beloj boji sa crnim drvenim elementima. Četiri stolice sa naslonima i jedan prostrani sto. Isti modularni sistem, druga završna obrada. Zamena panela i ploča moguća i u beloj varijanti.",
    modularHighlight: "Isti modularni sistem u beloj završnoj obradi",
    price: 74900,
    hasModularAssembly: false,
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
    modularHighlight: "KD konstrukcija — ram + naslon + drveni nasloni za ruke",
    price: 29900,
    hasModularAssembly: false,
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
    modularHighlight: "KD: ram + jastuci + klub sto + tabure — 4 zasebna modula",
    price: 119900,
    hasModularAssembly: false,
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
