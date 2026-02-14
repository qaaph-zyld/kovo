// ============================================================================
// Design Patterns - Pre-composed wrought iron arrangements
// Based on research document patterns (scroll-framed circles, arched headers, etc.)
// ============================================================================

import type { DesignPrimitive } from "./design-primitives";

export interface PlacedPrimitive {
  id: string; // unique instance ID
  primitiveId: string; // reference to design-primitives.ts
  x: number; // position on canvas in cm
  y: number;
  rotation: number; // degrees
  scale: number; // 1.0 = original size
  flipX?: boolean;
  flipY?: boolean;
}

export interface DesignPattern {
  id: string;
  name: string;
  description: string;
  category: "panel" | "gate" | "header" | "furniture";
  primitives: PlacedPrimitive[];
  width: number; // total pattern width in cm
  height: number; // total pattern height in cm
  tags: string[];
  difficulty: "easy" | "medium" | "complex";
}

// ============================================================================
// Pattern Library - Based on research document examples
// ============================================================================

export const designPatterns: DesignPattern[] = [
  // === Scroll-Framed Circle Pattern ===
  {
    id: "scroll-framed-circle-small",
    name: "Scroll-Framed Circle (Mali)",
    description: "Centralni prsten sa radijalnim S-scrollovima - klasični panel dekor",
    category: "panel",
    primitives: [
      {
        id: "circle-1",
        primitiveId: "circle-ring-6",
        x: 60,
        y: 60,
        rotation: 0,
        scale: 1,
      },
      {
        id: "scroll-top",
        primitiveId: "scroll-s-small",
        x: 60,
        y: 15,
        rotation: 0,
        scale: 1,
      },
      {
        id: "scroll-right",
        primitiveId: "scroll-s-small",
        x: 105,
        y: 60,
        rotation: 90,
        scale: 1,
      },
      {
        id: "scroll-bottom",
        primitiveId: "scroll-s-small",
        x: 60,
        y: 105,
        rotation: 180,
        scale: 1,
      },
      {
        id: "scroll-left",
        primitiveId: "scroll-s-small",
        x: 15,
        y: 60,
        rotation: 270,
        scale: 1,
      },
    ],
    width: 120,
    height: 120,
    tags: ["classic", "panel", "gate", "decorative"],
    difficulty: "medium",
  },
  {
    id: "scroll-framed-circle-large",
    name: "Scroll-Framed Circle (Veliki)",
    description: "Veći prsten sa radijalnim scrollovima za istaknute panele",
    category: "panel",
    primitives: [
      {
        id: "circle-1",
        primitiveId: "circle-ring-12",
        x: 120,
        y: 120,
        rotation: 0,
        scale: 1,
      },
      {
        id: "scroll-top",
        primitiveId: "scroll-s-large",
        x: 120,
        y: 30,
        rotation: 0,
        scale: 1,
      },
      {
        id: "scroll-right",
        primitiveId: "scroll-s-large",
        x: 210,
        y: 120,
        rotation: 90,
        scale: 1,
      },
      {
        id: "scroll-bottom",
        primitiveId: "scroll-s-large",
        x: 120,
        y: 210,
        rotation: 180,
        scale: 1,
      },
      {
        id: "scroll-left",
        primitiveId: "scroll-s-large",
        x: 30,
        y: 120,
        rotation: 270,
        scale: 1,
      },
    ],
    width: 240,
    height: 240,
    tags: ["premium", "gate", "panel", "decorative"],
    difficulty: "medium",
  },

  // === Arched Scroll Header Pattern ===
  {
    id: "arched-scroll-header-60",
    name: "Arched Scroll Header (60cm)",
    description: "Polu-luk sa C-scrollovima u spandrelima - vrh kapije",
    category: "header",
    primitives: [
      {
        id: "arch-main",
        primitiveId: "arch-half-60",
        x: 0,
        y: 60,
        rotation: 0,
        scale: 1,
      },
      {
        id: "scroll-left",
        primitiveId: "scroll-c-small",
        x: 10,
        y: 45,
        rotation: 45,
        scale: 0.8,
      },
      {
        id: "scroll-right",
        primitiveId: "scroll-c-small",
        x: 35,
        y: 45,
        rotation: 135,
        scale: 0.8,
      },
    ],
    width: 60,
    height: 60,
    tags: ["gate", "header", "classic"],
    difficulty: "easy",
  },
  {
    id: "arched-scroll-header-120",
    name: "Arched Scroll Header (120cm)",
    description: "Veliki polu-luk sa parovima C-scrollova - za široke kapije",
    category: "header",
    primitives: [
      {
        id: "arch-main",
        primitiveId: "arch-half-120",
        x: 0,
        y: 120,
        rotation: 0,
        scale: 1,
      },
      {
        id: "scroll-left-1",
        primitiveId: "scroll-c-large",
        x: 20,
        y: 90,
        rotation: 45,
        scale: 1,
      },
      {
        id: "scroll-left-2",
        primitiveId: "scroll-c-small",
        x: 40,
        y: 70,
        rotation: 30,
        scale: 0.8,
      },
      {
        id: "scroll-right-1",
        primitiveId: "scroll-c-large",
        x: 80,
        y: 90,
        rotation: 135,
        scale: 1,
      },
      {
        id: "scroll-right-2",
        primitiveId: "scroll-c-small",
        x: 60,
        y: 70,
        rotation: 150,
        scale: 0.8,
      },
    ],
    width: 120,
    height: 120,
    tags: ["gate", "header", "premium"],
    difficulty: "medium",
  },

  // === Hybrid Vortex Pattern ===
  {
    id: "hybrid-vortex-small",
    name: "Hybrid Vortex (Mali)",
    description: "Međusobno povezani prstenovi sa kontinuiranim scrollom",
    category: "panel",
    primitives: [
      {
        id: "ring-center",
        primitiveId: "circle-ring-6",
        x: 60,
        y: 60,
        rotation: 0,
        scale: 1,
      },
      {
        id: "ring-left",
        primitiveId: "circle-ring-6",
        x: 20,
        y: 60,
        rotation: 0,
        scale: 1,
      },
      {
        id: "ring-right",
        primitiveId: "circle-ring-6",
        x: 100,
        y: 60,
        rotation: 0,
        scale: 1,
      },
      {
        id: "scroll-continuous",
        primitiveId: "scroll-s-large",
        x: 60,
        y: 60,
        rotation: 0,
        scale: 1.2,
      },
    ],
    width: 120,
    height: 120,
    tags: ["complex", "premium", "panel", "gate"],
    difficulty: "complex",
  },

  // === Simple Baluster Panel Pattern ===
  {
    id: "baluster-panel-simple",
    name: "Simple Baluster Panel",
    description: "Vertikalni balusteri sa gornjom i donjom gredom",
    category: "panel",
    primitives: [
      {
        id: "rail-top",
        primitiveId: "bar-straight-120",
        x: 0,
        y: 10,
        rotation: 0,
        scale: 1,
      },
      {
        id: "rail-bottom",
        primitiveId: "bar-straight-120",
        x: 0,
        y: 90,
        rotation: 0,
        scale: 1,
      },
      {
        id: "baluster-1",
        primitiveId: "baluster-straight-80",
        x: 20,
        y: 10,
        rotation: 0,
        scale: 1,
      },
      {
        id: "baluster-2",
        primitiveId: "baluster-straight-80",
        x: 50,
        y: 10,
        rotation: 0,
        scale: 1,
      },
      {
        id: "baluster-3",
        primitiveId: "baluster-straight-80",
        x: 80,
        y: 10,
        rotation: 0,
        scale: 1,
      },
      {
        id: "baluster-4",
        primitiveId: "baluster-straight-80",
        x: 110,
        y: 10,
        rotation: 0,
        scale: 1,
      },
    ],
    width: 120,
    height: 90,
    tags: ["basic", "panel", "gate", "furniture"],
    difficulty: "easy",
  },
  {
    id: "baluster-panel-decorative",
    name: "Decorative Baluster Panel",
    description: "Balusteri sa dekorativnim srednjim delom i scroll ukrasima",
    category: "panel",
    primitives: [
      {
        id: "rail-top",
        primitiveId: "bar-twisted-30",
        x: 0,
        y: 10,
        rotation: 0,
        scale: 4,
      },
      {
        id: "rail-bottom",
        primitiveId: "bar-twisted-30",
        x: 0,
        y: 90,
        rotation: 0,
        scale: 4,
      },
      {
        id: "baluster-1",
        primitiveId: "baluster-decorative-80",
        x: 30,
        y: 10,
        rotation: 0,
        scale: 1,
      },
      {
        id: "baluster-2",
        primitiveId: "baluster-straight-80",
        x: 60,
        y: 10,
        rotation: 0,
        scale: 1,
      },
      {
        id: "baluster-3",
        primitiveId: "baluster-decorative-80",
        x: 90,
        y: 10,
        rotation: 0,
        scale: 1,
      },
      {
        id: "scroll-center",
        primitiveId: "scroll-c-small",
        x: 60,
        y: 50,
        rotation: 0,
        scale: 1,
      },
    ],
    width: 120,
    height: 90,
    tags: ["decorative", "panel", "furniture"],
    difficulty: "medium",
  },

  // === Ornamental Gate Panel Pattern ===
  {
    id: "ornamental-gate-panel",
    name: "Ornamental Gate Panel",
    description: "Kompletna panel sekcija kapije sa više elemenata",
    category: "gate",
    primitives: [
      {
        id: "frame-left",
        primitiveId: "bar-straight-60",
        x: 10,
        y: 0,
        rotation: 90,
        scale: 2,
      },
      {
        id: "frame-right",
        primitiveId: "bar-straight-60",
        x: 110,
        y: 0,
        rotation: 90,
        scale: 2,
      },
      {
        id: "frame-top",
        primitiveId: "bar-horizontal-120",
        x: 0,
        y: 10,
        rotation: 0,
        scale: 1,
      },
      {
        id: "frame-bottom",
        primitiveId: "bar-horizontal-120",
        x: 0,
        y: 110,
        rotation: 0,
        scale: 1,
      },
      {
        id: "center-rose",
        primitiveId: "circle-rosette-8",
        x: 60,
        y: 60,
        rotation: 0,
        scale: 1,
      },
      {
        id: "scroll-top-left",
        primitiveId: "scroll-c-small",
        x: 25,
        y: 25,
        rotation: 45,
        scale: 0.8,
      },
      {
        id: "scroll-top-right",
        primitiveId: "scroll-c-small",
        x: 95,
        y: 25,
        rotation: 135,
        scale: 0.8,
      },
      {
        id: "scroll-bottom-left",
        primitiveId: "scroll-c-small",
        x: 25,
        y: 95,
        rotation: 315,
        scale: 0.8,
      },
      {
        id: "scroll-bottom-right",
        primitiveId: "scroll-c-small",
        x: 95,
        y: 95,
        rotation: 225,
        scale: 0.8,
      },
      {
        id: "finial-top-left",
        primitiveId: "finial-spear",
        x: 10,
        y: 0,
        rotation: 0,
        scale: 1,
      },
      {
        id: "finial-top-right",
        primitiveId: "finial-spear",
        x: 110,
        y: 0,
        rotation: 0,
        scale: 1,
      },
    ],
    width: 120,
    height: 120,
    tags: ["complex", "gate", "premium", "ornamental"],
    difficulty: "complex",
  },

  // === Furniture Panel Patterns ===
  {
    id: "furniture-chair-back",
    name: "Furniture Chair Back",
    description: "Naslon za stolicu sa klasičnim scroll motivom",
    category: "furniture",
    primitives: [
      {
        id: "frame-left",
        primitiveId: "bar-straight-30",
        x: 10,
        y: 0,
        rotation: 90,
        scale: 1.5,
      },
      {
        id: "frame-right",
        primitiveId: "bar-straight-30",
        x: 50,
        y: 0,
        rotation: 90,
        scale: 1.5,
      },
      {
        id: "frame-top",
        primitiveId: "bar-straight-30",
        x: 10,
        y: 0,
        rotation: 0,
        scale: 1.3,
      },
      {
        id: "center-scroll",
        primitiveId: "scroll-s-small",
        x: 30,
        y: 20,
        rotation: 0,
        scale: 1,
      },
      {
        id: "finial-top",
        primitiveId: "finial-ball",
        x: 30,
        y: 0,
        rotation: 0,
        scale: 1,
      },
    ],
    width: 60,
    height: 45,
    tags: ["furniture", "chair", "classic"],
    difficulty: "easy",
  },
  {
    id: "furniture-bench-panel",
    name: "Furniture Bench Panel",
    description: "Panel za klupu sa horizontalnim scrollovima",
    category: "furniture",
    primitives: [
      {
        id: "rail-top",
        primitiveId: "bar-twisted-30",
        x: 0,
        y: 10,
        rotation: 0,
        scale: 4,
      },
      {
        id: "scroll-left",
        primitiveId: "scroll-c-large",
        x: 30,
        y: 25,
        rotation: 0,
        scale: 1,
      },
      {
        id: "scroll-center",
        primitiveId: "scroll-s-large",
        x: 90,
        y: 25,
        rotation: 0,
        scale: 1,
      },
      {
        id: "scroll-right",
        primitiveId: "scroll-c-large",
        x: 150,
        y: 25,
        rotation: 0,
        scale: 1,
      },
      {
        id: "finial-left",
        primitiveId: "finial-leaf",
        x: 0,
        y: 25,
        rotation: 0,
        scale: 1,
      },
      {
        id: "finial-right",
        primitiveId: "finial-leaf",
        x: 180,
        y: 25,
        rotation: 0,
        scale: 1,
      },
    ],
    width: 180,
    height: 40,
    tags: ["furniture", "bench", "decorative"],
    difficulty: "medium",
  },
];

// ============================================================================
// Helpers
// ============================================================================

export function getPatternById(id: string): DesignPattern | undefined {
  return designPatterns.find((p) => p.id === id);
}

export function getPatternsByCategory(category: DesignPattern["category"]): DesignPattern[] {
  return designPatterns.filter((p) => p.category === category);
}

export function getPatternsByDifficulty(difficulty: DesignPattern["difficulty"]): DesignPattern[] {
  return designPatterns.filter((p) => p.difficulty === difficulty);
}

export function getPatternsByTag(tag: string): DesignPattern[] {
  return designPatterns.filter((p) => p.tags.includes(tag));
}

export function searchPatterns(query: string): DesignPattern[] {
  const lowerQuery = query.toLowerCase();
  return designPatterns.filter(
    (p) =>
      p.name.toLowerCase().includes(lowerQuery) ||
      p.description.toLowerCase().includes(lowerQuery) ||
      p.tags.some((t) => t.toLowerCase().includes(lowerQuery))
  );
}

export function getPatternBounds(pattern: DesignPattern): { width: number; height: number } {
  if (pattern.primitives.length === 0) return { width: 0, height: 0 };
  
  let minX = Infinity, minY = Infinity, maxX = -Infinity, maxY = -Infinity;
  
  pattern.primitives.forEach((placed) => {
    const halfWidth = (pattern.width * placed.scale) / 2;
    const halfHeight = (pattern.height * placed.scale) / 2;
    
    minX = Math.min(minX, placed.x - halfWidth);
    minY = Math.min(minY, placed.y - halfHeight);
    maxX = Math.max(maxX, placed.x + halfWidth);
    maxY = Math.max(maxY, placed.y + halfHeight);
  });
  
  return {
    width: maxX - minX,
    height: maxY - minY,
  };
}
