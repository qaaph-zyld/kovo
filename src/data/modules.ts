// ============================================================================
// LINEA Modular Component System
// Source of truth for all base modules, connection types, and compatibility.
// Derived from the original Cotrić modular furniture design (prompts.txt.txt).
// ============================================================================

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export type MaterialType = "steel" | "wood" | "hardware" | "upholstery";

export interface ConnectionPoint {
  type: "M8_hex" | "M10_hex" | "centering_pin" | "slot_hole" | "flange_plate";
  description: string;
}

export interface Module {
  id: string;
  name: string;
  nameLatin: string; // for URL slugs / technical docs
  description: string;
  material: MaterialType;
  weight: number; // kg
  dimensions?: { w: number; d: number; h: number }; // cm
  connections: ConnectionPoint[];
  sharedAcross: string[]; // product IDs this module appears in
  interchangeableWith: string[]; // module IDs that fit the same slot
  replaceable: boolean; // can be ordered as a spare part
  sparePrice?: number; // RSD, only if replaceable
  imageHint?: string; // future: path to module illustration
}

export interface ModuleSlot {
  slotId: string;
  slotName: string;
  accepts: string[]; // module IDs that fit this slot
  quantity: number;
  required: boolean;
}

export interface ProductAssembly {
  productId: string;
  slots: ModuleSlot[];
  defaultConfiguration: Record<string, string>; // slotId → default moduleId
  configurableSlots: string[]; // slotIds the customer can change
  assemblySteps: AssemblyStep[];
  packingNote: string;
}

export interface AssemblyStep {
  order: number;
  moduleIds: string[]; // which modules are involved
  action: string; // e.g. "Povežite bočne ramove sa sedalnim okvirom"
  connectionUsed: string; // e.g. "M8 hex × 4 + centering pin × 2"
  timeMinutes: number;
}

// ---------------------------------------------------------------------------
// Connection System (standardized across all LINEA products)
// ---------------------------------------------------------------------------

export const connectionSystem = {
  standard: "M8/M10 inox hex bolts + centering pins",
  tools: "Imbus ključ (priložen u paketu)",
  tolerance: "Slot rupe za tolerancije farbanja",
  positioning: "Pozicioni pinovi — delovi se sami poravnavaju",
  hidden: "Svi spojevi sa unutrašnje strane — izgled ostaje premium",
};

// ---------------------------------------------------------------------------
// Module Catalog
// ---------------------------------------------------------------------------

export const modules: Module[] = [
  // === STEEL FRAME COMPONENTS ===
  {
    id: "side-frame-chair",
    name: "Bočni ram stolice (L/D)",
    nameLatin: "bocni-ram-stolice",
    description:
      "Par čeličnih bočnih ramova sa blagim lukom — potpis LINEA dizajna. Isti vizuelni jezik kao klupa. Kvadratna cev 25×25mm + ravna traka 30×6mm za detalje.",
    material: "steel",
    weight: 3.5,
    dimensions: { w: 42, d: 42, h: 90 },
    connections: [
      { type: "M8_hex", description: "4× za sedalni okvir" },
      { type: "M8_hex", description: "2–4× za naslon panel" },
      { type: "centering_pin", description: "2× za pozicioniranje sedalnog okvira" },
    ],
    sharedAcross: ["linea-stolica"],
    interchangeableWith: [],
    replaceable: false,
  },
  {
    id: "side-frame-bench",
    name: "Bočna strana klupe (L/D)",
    nameLatin: "bocna-strana-klupe",
    description:
      "Par kovanih bočnih strana sa istim LINEA motivom kao stolica. Dizajnirane da se ugnjezde jedna u drugu pri pakovanju. Šire noge za stabilnost.",
    material: "steel",
    weight: 5,
    dimensions: { w: 45, d: 45, h: 70 },
    connections: [
      { type: "M8_hex", description: "4× za sedalni okvir klupe" },
      { type: "M8_hex", description: "2× za naslon (opciono)" },
      { type: "centering_pin", description: "2× za pozicioniranje" },
    ],
    sharedAcross: ["linea-klupa-120"],
    interchangeableWith: [],
    replaceable: false,
  },
  {
    id: "seat-frame-chair",
    name: "Sedalni okvir stolice",
    nameLatin: "sedalni-okvir-stolice",
    description:
      "Pravougaoni čelični okvir koji spaja bočne ramove. Nosi drveno sedište. Navarene matice za brzu montažu.",
    material: "steel",
    weight: 1.5,
    dimensions: { w: 42, d: 42, h: 5 },
    connections: [
      { type: "M8_hex", description: "4× prema bočnim ramovima" },
      { type: "M8_hex", description: "4× za drveno sedište" },
      { type: "centering_pin", description: "2× od bočnih ramova" },
    ],
    sharedAcross: ["linea-stolica"],
    interchangeableWith: [],
    replaceable: false,
  },
  {
    id: "seat-frame-bench",
    name: "Sedalni okvir klupe",
    nameLatin: "sedalni-okvir-klupe",
    description:
      "Širi čelični okvir za klupu 120cm. Prima 3 drvene daske. Iste navarene matice i slot rupe kao stolica.",
    material: "steel",
    weight: 3,
    dimensions: { w: 120, d: 45, h: 5 },
    connections: [
      { type: "M8_hex", description: "4× prema bočnim stranama" },
      { type: "M8_hex", description: "6× za drvene daske" },
      { type: "centering_pin", description: "2× od bočnih strana" },
    ],
    sharedAcross: ["linea-klupa-120"],
    interchangeableWith: [],
    replaceable: false,
  },
  {
    id: "table-base-std",
    name: "Baza stola (nogara)",
    nameLatin: "baza-stola",
    description:
      "Univerzalna čelična baza sa flanš pločicama. Ista baza nosi i okruglu Ø60cm i kvadratnu 80×80cm ploču. Centralna nogara pruža maksimalan prostor za noge.",
    material: "steel",
    weight: 8,
    dimensions: { w: 50, d: 50, h: 73 },
    connections: [
      { type: "flange_plate", description: "Flanš pločica sa 4× M10" },
      { type: "centering_pin", description: "1× centralni za poravnanje ploče" },
    ],
    sharedAcross: ["linea-sto-bistro", "linea-sto-family"],
    interchangeableWith: [],
    replaceable: false,
  },

  // === BACKREST PANELS (interchangeable!) ===
  {
    id: "backrest-panel-classic",
    name: "Naslon panel — Klasik",
    nameLatin: "naslon-klasik",
    description:
      "Čist, ravan panel sa blagim LINEA lukom na vrhu. Standardni naslon koji dolazi sa svakom stolicom i klupom. Šrafi se na bočne ramove sa 2–4 vijka.",
    material: "steel",
    weight: 1.2,
    dimensions: { w: 40, d: 2, h: 45 },
    connections: [
      { type: "M8_hex", description: "2–4× na bočne ramove" },
      { type: "slot_hole", description: "Slot rupe za tolerancije" },
    ],
    sharedAcross: ["linea-stolica", "linea-klupa-120"],
    interchangeableWith: ["backrest-panel-classic", "backrest-panel-grid", "backrest-panel-arch"],
    replaceable: true,
    sparePrice: 2900,
  },
  {
    id: "backrest-panel-grid",
    name: "Naslon panel — Rešetka",
    nameLatin: "naslon-resetka",
    description:
      "Horizontalne šipke u ravnomernom rasporedu. Moderniji, industrijski izgled. Iste rupe za montažu kao Klasik — zamena bez alata promene.",
    material: "steel",
    weight: 1.4,
    dimensions: { w: 40, d: 2, h: 45 },
    connections: [
      { type: "M8_hex", description: "2–4× na bočne ramove" },
      { type: "slot_hole", description: "Slot rupe za tolerancije" },
    ],
    sharedAcross: ["linea-stolica", "linea-klupa-120"],
    interchangeableWith: ["backrest-panel-classic", "backrest-panel-grid", "backrest-panel-arch"],
    replaceable: true,
    sparePrice: 3400,
  },
  {
    id: "backrest-panel-arch",
    name: "Naslon panel — Luk",
    nameLatin: "naslon-luk",
    description:
      "Elegantni zaobljeni panel sa jednim centralnim lukom. Premium varijanta za one koji žele mekši, sofisticiraniji izgled. Iste montažne tačke.",
    material: "steel",
    weight: 1.3,
    dimensions: { w: 40, d: 2, h: 45 },
    connections: [
      { type: "M8_hex", description: "2–4× na bočne ramove" },
      { type: "slot_hole", description: "Slot rupe za tolerancije" },
    ],
    sharedAcross: ["linea-stolica", "linea-klupa-120"],
    interchangeableWith: ["backrest-panel-classic", "backrest-panel-grid", "backrest-panel-arch"],
    replaceable: true,
    sparePrice: 3900,
  },

  // === WOOD COMPONENTS (replaceable!) ===
  {
    id: "wood-seat-chair",
    name: "Drveno sedište stolice",
    nameLatin: "drveno-sediste-stolice",
    description:
      "Masivno drvo (hrast/bukva/bagrem) sa zaobljenim ivicama. Montira se na sedalni okvir sa 4 šrafa. Zamenjivo — kupite novo posle 5+ sezona.",
    material: "wood",
    weight: 1.8,
    dimensions: { w: 40, d: 40, h: 2.5 },
    connections: [
      { type: "M8_hex", description: "4× na sedalni okvir" },
    ],
    sharedAcross: ["linea-stolica"],
    interchangeableWith: [],
    replaceable: true,
    sparePrice: 1900,
  },
  {
    id: "wood-planks-bench",
    name: "Drvene daske klupe (×3)",
    nameLatin: "drvene-daske-klupe",
    description:
      "Set od 3 masivne drvene daske sa zaobljenim ivicama. Montiraju se na sedalni okvir klupe. Zamenjive — osvežite klupu novim drvom.",
    material: "wood",
    weight: 4,
    dimensions: { w: 120, d: 14, h: 2.5 },
    connections: [
      { type: "M8_hex", description: "6× na sedalni okvir (2 po dasci)" },
    ],
    sharedAcross: ["linea-klupa-120"],
    interchangeableWith: [],
    replaceable: true,
    sparePrice: 3400,
  },
  {
    id: "table-top-round-60",
    name: "Drvena ploča Ø60cm",
    nameLatin: "ploca-okrugla-60",
    description:
      "Okrugla ploča od masivnog drveta sa zaobljenim ivicama. Montira se na univerzalnu bazu flanš pločicom. Zamenjiva — promenite veličinu ili obnovite.",
    material: "wood",
    weight: 5,
    dimensions: { w: 60, d: 60, h: 3 },
    connections: [
      { type: "flange_plate", description: "4× M10 na bazu" },
      { type: "centering_pin", description: "1× centralni" },
    ],
    sharedAcross: ["linea-sto-bistro"],
    interchangeableWith: ["table-top-round-60", "table-top-square-80"],
    replaceable: true,
    sparePrice: 4900,
  },
  {
    id: "table-top-square-80",
    name: "Drvena ploča 80×80cm",
    nameLatin: "ploca-kvadratna-80",
    description:
      "Kvadratna ploča od masivnog drveta za porodični sto. Montira se na istu univerzalnu bazu kao bistro ploča. Zamenjiva i nadogradiva.",
    material: "wood",
    weight: 8,
    dimensions: { w: 80, d: 80, h: 3 },
    connections: [
      { type: "flange_plate", description: "4× M10 na bazu" },
      { type: "centering_pin", description: "1× centralni" },
    ],
    sharedAcross: ["linea-sto-family"],
    interchangeableWith: ["table-top-round-60", "table-top-square-80"],
    replaceable: true,
    sparePrice: 6900,
  },

  // === HARDWARE KIT ===
  {
    id: "hardware-kit",
    name: "Kesica sa priborom",
    nameLatin: "kesica-pribor",
    description:
      "Svi potrebni šrafovi (M8/M10 inox), imbus ključ, rezervni šrafovi, gumene nožice i QR kod sa linkom do video uputstva za montažu (60 sekundi).",
    material: "hardware",
    weight: 0.3,
    connections: [],
    sharedAcross: [
      "linea-stolica",
      "linea-sto-bistro",
      "linea-sto-family",
      "linea-klupa-120",
    ],
    interchangeableWith: [],
    replaceable: true,
    sparePrice: 490,
  },
];

// ---------------------------------------------------------------------------
// Product Assemblies — how modules combine into products
// ---------------------------------------------------------------------------

export const productAssemblies: ProductAssembly[] = [
  // --- LINEA Stolica ---
  {
    productId: "linea-stolica",
    slots: [
      {
        slotId: "side-frames",
        slotName: "Bočni ramovi",
        accepts: ["side-frame-chair"],
        quantity: 1, // sold as L/R pair
        required: true,
      },
      {
        slotId: "seat-frame",
        slotName: "Sedalni okvir",
        accepts: ["seat-frame-chair"],
        quantity: 1,
        required: true,
      },
      {
        slotId: "backrest",
        slotName: "Naslon panel",
        accepts: ["backrest-panel-classic", "backrest-panel-grid", "backrest-panel-arch"],
        quantity: 1,
        required: true,
      },
      {
        slotId: "seat-surface",
        slotName: "Drveno sedište",
        accepts: ["wood-seat-chair"],
        quantity: 1,
        required: true,
      },
      {
        slotId: "hardware",
        slotName: "Pribor za montažu",
        accepts: ["hardware-kit"],
        quantity: 1,
        required: true,
      },
    ],
    defaultConfiguration: {
      "side-frames": "side-frame-chair",
      "seat-frame": "seat-frame-chair",
      backrest: "backrest-panel-classic",
      "seat-surface": "wood-seat-chair",
      hardware: "hardware-kit",
    },
    configurableSlots: ["backrest"],
    assemblySteps: [
      {
        order: 1,
        moduleIds: ["side-frame-chair", "seat-frame-chair"],
        action: "Povežite bočne ramove sa sedalnim okvirom",
        connectionUsed: "M8 hex × 4 + centering pin × 2",
        timeMinutes: 5,
      },
      {
        order: 2,
        moduleIds: ["backrest-panel-classic"],
        action: "Pričvrstite naslon panel na bočne ramove",
        connectionUsed: "M8 hex × 2–4",
        timeMinutes: 3,
      },
      {
        order: 3,
        moduleIds: ["wood-seat-chair"],
        action: "Montirajte drveno sedište na okvir",
        connectionUsed: "M8 hex × 4",
        timeMinutes: 3,
      },
    ],
    packingNote:
      "Bočni ramovi + sedalni okvir + naslon panel + drveno sedište — pljosnati paket. Stolice se slažu do 6 komada.",
  },

  // --- LINEA Sto Bistro ---
  {
    productId: "linea-sto-bistro",
    slots: [
      {
        slotId: "table-base",
        slotName: "Baza stola",
        accepts: ["table-base-std"],
        quantity: 1,
        required: true,
      },
      {
        slotId: "table-top",
        slotName: "Ploča stola",
        accepts: ["table-top-round-60", "table-top-square-80"],
        quantity: 1,
        required: true,
      },
      {
        slotId: "hardware",
        slotName: "Pribor za montažu",
        accepts: ["hardware-kit"],
        quantity: 1,
        required: true,
      },
    ],
    defaultConfiguration: {
      "table-base": "table-base-std",
      "table-top": "table-top-round-60",
      hardware: "hardware-kit",
    },
    configurableSlots: ["table-top"],
    assemblySteps: [
      {
        order: 1,
        moduleIds: ["table-base-std", "table-top-round-60"],
        action: "Postavite ploču na bazu i pričvrstite flanš pločicom",
        connectionUsed: "M10 hex × 4 + centering pin × 1",
        timeMinutes: 10,
      },
    ],
    packingNote:
      "Baza + ploča odvojeno — 2 pljosnata paketa. KD u 2 dela.",
  },

  // --- LINEA Sto Family ---
  {
    productId: "linea-sto-family",
    slots: [
      {
        slotId: "table-base",
        slotName: "Baza stola",
        accepts: ["table-base-std"],
        quantity: 1,
        required: true,
      },
      {
        slotId: "table-top",
        slotName: "Ploča stola",
        accepts: ["table-top-round-60", "table-top-square-80"],
        quantity: 1,
        required: true,
      },
      {
        slotId: "hardware",
        slotName: "Pribor za montažu",
        accepts: ["hardware-kit"],
        quantity: 1,
        required: true,
      },
    ],
    defaultConfiguration: {
      "table-base": "table-base-std",
      "table-top": "table-top-square-80",
      hardware: "hardware-kit",
    },
    configurableSlots: ["table-top"],
    assemblySteps: [
      {
        order: 1,
        moduleIds: ["table-base-std", "table-top-square-80"],
        action: "Postavite ploču na bazu i pričvrstite flanš pločicom",
        connectionUsed: "M10 hex × 4 + centering pin × 1",
        timeMinutes: 15,
      },
    ],
    packingNote:
      "Ista baza kao bistro, veća ploča. KD u 2 dela na paleti.",
  },

  // --- LINEA Klupa 120 ---
  {
    productId: "linea-klupa-120",
    slots: [
      {
        slotId: "side-frames",
        slotName: "Bočne strane",
        accepts: ["side-frame-bench"],
        quantity: 1, // L/R pair
        required: true,
      },
      {
        slotId: "seat-frame",
        slotName: "Sedalni okvir",
        accepts: ["seat-frame-bench"],
        quantity: 1,
        required: true,
      },
      {
        slotId: "backrest",
        slotName: "Naslon panel",
        accepts: ["backrest-panel-classic", "backrest-panel-grid", "backrest-panel-arch"],
        quantity: 1,
        required: false, // bench backrest is optional
      },
      {
        slotId: "seat-surface",
        slotName: "Drvene daske",
        accepts: ["wood-planks-bench"],
        quantity: 1,
        required: true,
      },
      {
        slotId: "hardware",
        slotName: "Pribor za montažu",
        accepts: ["hardware-kit"],
        quantity: 1,
        required: true,
      },
    ],
    defaultConfiguration: {
      "side-frames": "side-frame-bench",
      "seat-frame": "seat-frame-bench",
      backrest: "backrest-panel-classic",
      "seat-surface": "wood-planks-bench",
      hardware: "hardware-kit",
    },
    configurableSlots: ["backrest"],
    assemblySteps: [
      {
        order: 1,
        moduleIds: ["side-frame-bench", "seat-frame-bench"],
        action: "Povežite bočne strane sa sedalnim okvirom",
        connectionUsed: "M8 hex × 4 + centering pin × 2",
        timeMinutes: 8,
      },
      {
        order: 2,
        moduleIds: ["backrest-panel-classic"],
        action: "Pričvrstite naslon panel (opciono)",
        connectionUsed: "M8 hex × 2",
        timeMinutes: 5,
      },
      {
        order: 3,
        moduleIds: ["wood-planks-bench"],
        action: "Montirajte 3 drvene daske na sedalni okvir",
        connectionUsed: "M8 hex × 6",
        timeMinutes: 10,
      },
    ],
    packingNote:
      "Bočne strane se ugnjezde. KD u 4 dela — pljosnati paket na paleti.",
  },
];

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

export function getModuleById(id: string): Module | undefined {
  return modules.find((m) => m.id === id);
}

export function getModulesForProduct(productId: string): Module[] {
  return modules.filter((m) => m.sharedAcross.includes(productId));
}

export function getAssemblyForProduct(productId: string): ProductAssembly | undefined {
  return productAssemblies.find((a) => a.productId === productId);
}

export function getInterchangeableModules(moduleId: string): Module[] {
  const mod = getModuleById(moduleId);
  if (!mod) return [];
  return mod.interchangeableWith
    .filter((id) => id !== moduleId)
    .map((id) => getModuleById(id))
    .filter(Boolean) as Module[];
}

export function getReplaceableModulesForProduct(productId: string): Module[] {
  return modules.filter(
    (m) => m.sharedAcross.includes(productId) && m.replaceable && m.sparePrice
  );
}

export function getProductsUsingModule(moduleId: string): string[] {
  const mod = getModuleById(moduleId);
  return mod ? mod.sharedAcross : [];
}
