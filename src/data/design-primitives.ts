// ============================================================================
// Wrought Iron Design Primitives
// Atomic components for visual design generator based on research document
// ============================================================================

export type PrimitiveCategory = "scrolls" | "bars" | "circles" | "arches" | "balusters" | "connectors" | "finials";

export interface SnapPoint {
  id: string;
  x: number; // relative to primitive center
  y: number;
  type: "connection" | "endpoint" | "center";
  accepts?: PrimitiveCategory[]; // what can connect here
}

export interface DesignPrimitive {
  id: string;
  name: string;
  category: PrimitiveCategory;
  svgPath: string; // SVG path data for rendering
  width: number; // default width in cm
  height: number; // default height in cm
  snapPoints: SnapPoint[];
  tags: string[];
  description: string;
  variants?: {
    id: string;
    name: string;
    svgPath: string;
    width: number;
    height: number;
  }[];
}

// ============================================================================
// Primitive Library
// ============================================================================

export const designPrimitives: DesignPrimitive[] = [
  // === SCROLLS ===
  {
    id: "scroll-c-small",
    name: "C-Scroll (Mali)",
    category: "scrolls",
    svgPath: "M 0,0 Q 15,-20 30,-10 T 45,10 Q 30,30 15,20 T 0,0",
    width: 45,
    height: 40,
    snapPoints: [
      { id: "start", x: 0, y: 0, type: "endpoint" },
      { id: "end", x: 45, y: 10, type: "endpoint", accepts: ["bars", "connectors"] },
    ],
    tags: ["classic", "gate", "panel"],
    description: "Klasični C-scroll za dekorativne veze",
  },
  {
    id: "scroll-c-large",
    name: "C-Scroll (Veliki)",
    category: "scrolls",
    svgPath: "M 0,0 Q 25,-35 50,-17.5 T 75,17.5 Q 50,52.5 25,35 T 0,0",
    width: 75,
    height: 60,
    snapPoints: [
      { id: "start", x: 0, y: 0, type: "endpoint" },
      { id: "end", x: 75, y: 17.5, type: "endpoint", accepts: ["bars", "connectors"] },
    ],
    tags: ["classic", "gate", "panel"],
    description: "Veći C-scroll za istaknute dekoracije",
  },
  {
    id: "scroll-s-small",
    name: "S-Scroll (Mali)",
    category: "scrolls",
    svgPath: "M 0,0 Q 15,-20 30,-10 T 45,10 Q 30,30 15,20 T 0,40 Q -15,20 0,0",
    width: 45,
    height: 40,
    snapPoints: [
      { id: "start", x: 0, y: 0, type: "endpoint" },
      { id: "mid", x: 22.5, y: 20, type: "center" },
      { id: "end", x: 0, y: 40, type: "endpoint", accepts: ["bars", "connectors"] },
    ],
    tags: ["elegant", "panel", "furniture"],
    description: "S-Scroll za fluidne prelaze",
  },
  {
    id: "scroll-s-large",
    name: "S-Scroll (Veliki)",
    category: "scrolls",
    svgPath: "M 0,0 Q 25,-35 50,-17.5 T 75,17.5 Q 50,52.5 25,35 T 0,70 Q -25,35 0,0",
    width: 75,
    height: 70,
    snapPoints: [
      { id: "start", x: 0, y: 0, type: "endpoint" },
      { id: "mid", x: 37.5, y: 35, type: "center" },
      { id: "end", x: 0, y: 70, type: "endpoint", accepts: ["bars", "connectors"] },
    ],
    tags: ["elegant", "panel", "furniture"],
    description: "Veliki S-Scroll za dominantne elemente",
  },
  {
    id: "scroll-compound",
    name: "Složeni Scroll",
    category: "scrolls",
    svgPath: "M 0,0 Q 20,-30 40,-15 T 60,15 Q 40,45 20,30 T 0,60 Q -20,30 0,0",
    width: 60,
    height: 60,
    snapPoints: [
      { id: "start", x: 0, y: 0, type: "endpoint" },
      { id: "center", x: 30, y: 30, type: "center" },
      { id: "end", x: 0, y: 60, type: "endpoint", accepts: ["bars", "connectors"] },
    ],
    tags: ["complex", "premium", "gate"],
    description: "Složeni scroll sa više krivina",
  },

  // === BARS ===
  {
    id: "bar-straight-30",
    name: "Ravna Šipka (30cm)",
    category: "bars",
    svgPath: "M 0,0 L 30,0",
    width: 30,
    height: 2,
    snapPoints: [
      { id: "start", x: 0, y: 0, type: "endpoint" },
      { id: "end", x: 30, y: 0, type: "endpoint", accepts: ["connectors", "scrolls"] },
    ],
    tags: ["basic", "frame", "panel"],
    description: "Osnovna ravna šipka za ramove",
  },
  {
    id: "bar-straight-60",
    name: "Ravna Šipka (60cm)",
    category: "bars",
    svgPath: "M 0,0 L 60,0",
    width: 60,
    height: 2,
    snapPoints: [
      { id: "start", x: 0, y: 0, type: "endpoint" },
      { id: "end", x: 60, y: 0, type: "endpoint", accepts: ["connectors", "scrolls"] },
    ],
    tags: ["basic", "frame", "panel"],
    description: "Duža ravna šipka za veće ramove",
  },
  {
    id: "bar-twisted-30",
    name: "Uvrnuta Šipka (30cm)",
    category: "bars",
    svgPath: "M 0,0 Q 7.5,-2 15,0 T 30,0 Q 22.5,2 15,0 T 0,0",
    width: 30,
    height: 4,
    snapPoints: [
      { id: "start", x: 0, y: 0, type: "endpoint" },
      { id: "end", x: 30, y: 0, type: "endpoint", accepts: ["connectors", "scrolls"] },
    ],
    tags: ["decorative", "panel", "furniture"],
    description: "Uvrnuta šipka za teksturu",
  },
  {
    id: "bar-horizontal-120",
    name: "Horizontalna Greda (120cm)",
    category: "bars",
    svgPath: "M 0,0 L 120,0",
    width: 120,
    height: 4,
    snapPoints: [
      { id: "start", x: 0, y: 0, type: "endpoint" },
      { id: "mid", x: 60, y: 0, type: "center" },
      { id: "end", x: 120, y: 0, type: "endpoint", accepts: ["connectors", "scrolls"] },
    ],
    tags: ["frame", "gate", "panel"],
    description: "Duga horizontalna greda za kapije",
  },

  // === CIRCLES ===
  {
    id: "circle-ring-6",
    name: "Prsten (6cm)",
    category: "circles",
    svgPath: "M 30,0 A 30,30 0 1,1 30,0.1",
    width: 60,
    height: 60,
    snapPoints: [
      { id: "center", x: 30, y: 30, type: "center" },
      { id: "top", x: 30, y: 0, type: "connection", accepts: ["scrolls", "connectors"] },
      { id: "right", x: 60, y: 30, type: "connection", accepts: ["scrolls", "connectors"] },
      { id: "bottom", x: 30, y: 60, type: "connection", accepts: ["scrolls", "connectors"] },
      { id: "left", x: 0, y: 30, type: "connection", accepts: ["scrolls", "connectors"] },
    ],
    tags: ["decorative", "panel", "furniture"],
    description: "Mali dekorativni prsten",
  },
  {
    id: "circle-ring-12",
    name: "Prsten (12cm)",
    category: "circles",
    svgPath: "M 60,0 A 60,60 0 1,1 60,0.1",
    width: 120,
    height: 120,
    snapPoints: [
      { id: "center", x: 60, y: 60, type: "center" },
      { id: "top", x: 60, y: 0, type: "connection", accepts: ["scrolls", "connectors"] },
      { id: "right", x: 120, y: 60, type: "connection", accepts: ["scrolls", "connectors"] },
      { id: "bottom", x: 60, y: 120, type: "connection", accepts: ["scrolls", "connectors"] },
      { id: "left", x: 0, y: 60, type: "connection", accepts: ["scrolls", "connectors"] },
    ],
    tags: ["decorative", "panel", "gate"],
    description: "Srednji dekorativni prsten",
  },
  {
    id: "circle-ring-18",
    name: "Prsten (18cm)",
    category: "circles",
    svgPath: "M 90,0 A 90,90 0 1,1 90,0.1",
    width: 180,
    height: 180,
    snapPoints: [
      { id: "center", x: 90, y: 90, type: "center" },
      { id: "top", x: 90, y: 0, type: "connection", accepts: ["scrolls", "connectors"] },
      { id: "right", x: 180, y: 90, type: "connection", accepts: ["scrolls", "connectors"] },
      { id: "bottom", x: 90, y: 180, type: "connection", accepts: ["scrolls", "connectors"] },
      { id: "left", x: 0, y: 90, type: "connection", accepts: ["scrolls", "connectors"] },
    ],
    tags: ["decorative", "gate", "premium"],
    description: "Veliki dekorativni prsten",
  },
  {
    id: "circle-rosette-8",
    name: "Roze (8cm)",
    category: "circles",
    svgPath: "M 40,0 A 40,40 0 1,1 40,0.1 M 20,20 L 60,20 M 20,40 L 60,40 M 40,20 L 40,60",
    width: 80,
    height: 80,
    snapPoints: [
      { id: "center", x: 40, y: 40, type: "center" },
      { id: "top", x: 40, y: 0, type: "connection", accepts: ["scrolls", "connectors"] },
      { id: "right", x: 80, y: 40, type: "connection", accepts: ["scrolls", "connectors"] },
      { id: "bottom", x: 40, y: 80, type: "connection", accepts: ["scrolls", "connectors"] },
      { id: "left", x: 0, y: 40, type: "connection", accepts: ["scrolls", "connectors"] },
    ],
    tags: ["decorative", "furniture", "premium"],
    description: "Roze sa unutrašnjim krstom",
  },

  // === ARCHES ===
  {
    id: "arch-half-60",
    name: "Polu-luk (60cm)",
    category: "arches",
    svgPath: "M 0,60 A 30,30 0 0,1 60,60",
    width: 60,
    height: 30,
    snapPoints: [
      { id: "left", x: 0, y: 60, type: "endpoint" },
      { id: "right", x: 60, y: 60, type: "endpoint" },
      { id: "top", x: 30, y: 30, type: "connection", accepts: ["scrolls", "connectors"] },
    ],
    tags: ["gate", "panel", "header"],
    description: "Polu-luk za vrh kapije",
  },
  {
    id: "arch-half-120",
    name: "Polu-luk (120cm)",
    category: "arches",
    svgPath: "M 0,120 A 60,60 0 0,1 120,120",
    width: 120,
    height: 60,
    snapPoints: [
      { id: "left", x: 0, y: 120, type: "endpoint" },
      { id: "right", x: 120, y: 120, type: "endpoint" },
      { id: "top", x: 60, y: 60, type: "connection", accepts: ["scrolls", "connectors"] },
    ],
    tags: ["gate", "panel", "header"],
    description: "Veliki polu-luk za široke kapije",
  },
  {
    id: "arch-full-60",
    name: "Puni luk (60cm)",
    category: "arches",
    svgPath: "M 0,60 A 30,30 0 0,1 60,60 A 30,30 0 0,1 0,60",
    width: 60,
    height: 60,
    snapPoints: [
      { id: "center", x: 30, y: 60, type: "center" },
      { id: "top", x: 30, y: 30, type: "connection", accepts: ["scrolls", "connectors"] },
    ],
    tags: ["decorative", "panel", "furniture"],
    description: "Puni ovalni luk",
  },

  // === BALUSTERS ===
  {
    id: "baluster-straight-80",
    name: "Baluster (80cm)",
    category: "balusters",
    svgPath: "M 2,0 L 2,80 M 0,0 L 4,0 M 0,80 L 4,80",
    width: 4,
    height: 80,
    snapPoints: [
      { id: "bottom", x: 2, y: 80, type: "endpoint" },
      { id: "top", x: 2, y: 0, type: "endpoint", accepts: ["connectors"] },
    ],
    tags: ["vertical", "panel", "gate"],
    description: "Standardni vertikalni baluster",
  },
  {
    id: "baluster-decorative-80",
    name: "Dekorativni Baluster (80cm)",
    category: "balusters",
    svgPath: "M 2,0 L 2,30 Q 2,35 0,35 L 4,35 Q 2,35 2,40 L 2,80 M 0,0 L 4,0 M 0,80 L 4,80",
    width: 4,
    height: 80,
    snapPoints: [
      { id: "bottom", x: 2, y: 80, type: "endpoint" },
      { id: "top", x: 2, y: 0, type: "endpoint", accepts: ["connectors"] },
      { id: "decor", x: 2, y: 35, type: "connection", accepts: ["scrolls"] },
    ],
    tags: ["decorative", "vertical", "panel"],
    description: "Baluster sa dekorativnim srednjim delom",
  },

  // === CONNECTORS ===
  {
    id: "connector-collar",
    name: "Ogrlica",
    category: "connectors",
    svgPath: "M 0,0 L 0,8 M 8,0 L 8,8 M 0,4 L 8,4",
    width: 8,
    height: 8,
    snapPoints: [
      { id: "center", x: 4, y: 4, type: "center" },
      { id: "left", x: 0, y: 4, type: "connection" },
      { id: "right", x: 8, y: 4, type: "connection" },
    ],
    tags: ["connection", "panel", "gate"],
    description: "Metalna ogrlica za spajanje",
  },
  {
    id: "connector-bracket",
    name: "Konzola",
    category: "connectors",
    svgPath: "M 0,0 L 0,10 L 10,10 L 10,0 M 0,5 L 10,5",
    width: 10,
    height: 10,
    snapPoints: [
      { id: "center", x: 5, y: 5, type: "center" },
      { id: "left", x: 0, y: 5, type: "connection" },
      { id: "right", x: 10, y: 5, type: "connection" },
      { id: "top", x: 5, y: 0, type: "connection" },
      { id: "bottom", x: 5, y: 10, type: "connection" },
    ],
    tags: ["connection", "structural", "panel"],
    description: "Uglasta konzola za čvrsta spoja",
  },

  // === FINIALS ===
  {
    id: "finial-ball",
    name: "Kugla",
    category: "finials",
    svgPath: "M 5,0 A 5,5 0 1,1 5,0.1 M 5,5 L 5,15",
    width: 10,
    height: 15,
    snapPoints: [
      { id: "base", x: 5, y: 15, type: "endpoint" },
    ],
    tags: ["decorative", "top", "furniture"],
    description: "Kuglasti vrh za stolice i kapije",
  },
  {
    id: "finial-spear",
    name: "Koplje",
    category: "finials",
    svgPath: "M 5,0 L 3,10 L 5,8 L 7,10 L 5,0 M 5,8 L 5,15",
    width: 10,
    height: 15,
    snapPoints: [
      { id: "base", x: 5, y: 15, type: "endpoint" },
    ],
    tags: ["decorative", "top", "gate"],
    description: "Vrh u obliku koplja",
  },
  {
    id: "finial-leaf",
    name: "List",
    category: "finials",
    svgPath: "M 5,0 Q 3,5 5,10 Q 7,5 5,0 M 5,10 L 5,15",
    width: 10,
    height: 15,
    snapPoints: [
      { id: "base", x: 5, y: 15, type: "endpoint" },
    ],
    tags: ["decorative", "top", "furniture"],
    description: "Vrh u obliku lista",
  },
];

// ============================================================================
// Helpers
// ============================================================================

export function getPrimitiveById(id: string): DesignPrimitive | undefined {
  return designPrimitives.find((p) => p.id === id);
}

export function getPrimitivesByCategory(category: PrimitiveCategory): DesignPrimitive[] {
  return designPrimitives.filter((p) => p.category === category);
}

export function getPrimitivesByTag(tag: string): DesignPrimitive[] {
  return designPrimitives.filter((p) => p.tags.includes(tag));
}

export function searchPrimitives(query: string): DesignPrimitive[] {
  const lowerQuery = query.toLowerCase();
  return designPrimitives.filter(
    (p) =>
      p.name.toLowerCase().includes(lowerQuery) ||
      p.description.toLowerCase().includes(lowerQuery) ||
      p.tags.some((t) => t.toLowerCase().includes(lowerQuery))
  );
}

export function getCompatiblePrimitives(snapPoint: SnapPoint): DesignPrimitive[] {
  if (!snapPoint.accepts) return designPrimitives;
  return designPrimitives.filter((p) => snapPoint.accepts?.includes(p.category));
}
