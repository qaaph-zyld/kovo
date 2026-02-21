"use client";

import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { Search, ChevronDown, ChevronUp } from "lucide-react";
import { useDesignStore } from "@/store/design";
import { designPrimitives, getPrimitivesByCategory, searchPrimitives, type PrimitiveCategory } from "@/data/design-primitives";

const categoryLabels: Record<PrimitiveCategory, string> = {
  scrolls: "Scroll-ovi",
  bars: "Šipke",
  circles: "Krugovi",
  arches: "Lukovi",
  balusters: "Balusteri",
  connectors: "Konektori",
  finials: "Vrhovi",
};

const categoryIcons: Record<PrimitiveCategory, string> = {
  scrolls: "〰️",
  bars: "│",
  circles: "○",
  arches: "∩",
  balusters: "┃",
  connectors: "⊕",
  finials: "▲",
};

export default function PrimitivePalette() {
  const [searchQuery, setSearchQuery] = useState("");
  const [expandedCategories, setExpandedCategories] = useState<Set<PrimitiveCategory>>(new Set(["scrolls", "bars"]));
  const { startDrag, activeTool } = useDesignStore();

  // Filter primitives based on search
  const filteredPrimitives = useMemo(() => {
    if (!searchQuery.trim()) return designPrimitives;
    return searchPrimitives(searchQuery);
  }, [searchQuery]);

  // Group filtered primitives by category
  const primitivesByCategory = useMemo(() => {
    const groups: Record<PrimitiveCategory, typeof designPrimitives> = {
      scrolls: [],
      bars: [],
      circles: [],
      arches: [],
      balusters: [],
      connectors: [],
      finials: [],
    };

    filteredPrimitives.forEach((primitive) => {
      groups[primitive.category].push(primitive);
    });

    return groups;
  }, [filteredPrimitives]);

  // Toggle category expansion
  const toggleCategory = (category: PrimitiveCategory) => {
    setExpandedCategories((prev) => {
      const next = new Set(prev);
      if (next.has(category)) {
        next.delete(category);
      } else {
        next.add(category);
      }
      return next;
    });
  };

  // Handle drag start
  const handleDragStart = (primitive: typeof designPrimitives[0], e: React.DragEvent<HTMLDivElement>) => {
    e.dataTransfer.effectAllowed = "copy";
    e.dataTransfer.setData("application/json", JSON.stringify(primitive));
    startDrag(primitive, 0, 0); // Update store drag state
  };

  // Handle drag end
  const handleDragEnd = () => {
    // Clear drag state
  };

  // Render primitive item
  const renderPrimitiveItem = (primitive: typeof designPrimitives[0]) => (
    <div
      key={primitive.id}
      draggable
      tabIndex={0}
      role="button"
      aria-label={`Dodaj ${primitive.name} na platno`}
      onDragStart={(e: React.DragEvent<HTMLDivElement>) => handleDragStart(primitive, e)}
      onDragEnd={handleDragEnd}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          // Fallback for keyboard users - simulate adding to center of canvas
          e.preventDefault();
        }
      }}
      className="group cursor-grab active:cursor-grabbing outline-none rounded-lg focus-visible:ring-2 focus-visible:ring-forge-amber/50 focus-visible:ring-offset-2"
    >
      <div className="flex items-center gap-3 rounded-lg border border-border/50 bg-card p-3 transition-all group-hover:border-forge-amber/30 group-hover:shadow-warm">
        {/* Thumbnail preview */}
        <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-md bg-workshop-gray">
          <svg
            width="40"
            height="40"
            viewBox={`0 0 ${primitive.width} ${primitive.height}`}
            className="opacity-70 transition-opacity group-hover:opacity-100"
            aria-hidden="true"
          >
            <path
              d={primitive.svgPath}
              fill="none"
              stroke="var(--color-iron-black)"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              transform={`translate(${primitive.width / 2}, ${primitive.height / 2})`}
            />
          </svg>
        </div>

        {/* Info */}
        <div className="flex-1 min-w-0">
          <h4 className="truncate text-sm font-semibold tracking-tight group-hover:text-forge-amber transition-colors">{primitive.name}</h4>
          <p className="text-xs text-muted-foreground line-clamp-2">{primitive.description}</p>
          <div className="mt-1 flex items-center gap-2 text-[10px] text-muted-foreground">
            <span className="font-mono">{primitive.width}×{primitive.height}cm</span>
          </div>
        </div>

        {/* Drag indicator */}
        <div className="opacity-0 group-hover:opacity-100 transition-opacity">
          <div className="h-8 w-8 rounded-md bg-forge-amber/10 flex items-center justify-center">
            <div className="h-4 w-4 rounded-sm bg-forge-amber/40" />
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="flex h-full flex-col bg-card">
      {/* Header */}
      <div className="border-b border-border p-4">
        <h3 className="font-display text-lg tracking-tight">Elementi</h3>
        <p className="text-xs text-muted-foreground mt-1">
          Prevucite na platno za dodavanje
        </p>
      </div>

      {/* Search */}
      <div className="p-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <input
            type="text"
            placeholder="Pretraži elemente..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 text-sm border border-border/50 rounded-lg bg-card focus:border-forge-amber/30 focus:outline-none focus:ring-2 focus:ring-forge-amber/10"
          />
        </div>
      </div>

      {/* Categories */}
      <div className="flex-1 overflow-y-auto px-4 pb-4">
        {Object.entries(primitivesByCategory).map(([category, primitives]) => {
          if (primitives.length === 0) return null;

          const isExpanded = expandedCategories.has(category as PrimitiveCategory);
          const Icon = categoryIcons[category as PrimitiveCategory];
          const Label = categoryLabels[category as PrimitiveCategory];

          return (
            <div key={category} className="mb-4">
              {/* Category header */}
              <button
                onClick={() => toggleCategory(category as PrimitiveCategory)}
                className="flex w-full items-center justify-between rounded-lg border border-border/50 bg-card p-3 text-left transition-all hover:border-forge-amber/30"
              >
                <div className="flex items-center gap-2">
                  <span className="text-lg">{Icon}</span>
                  <span className="text-sm font-semibold">{Label}</span>
                  <span className="text-xs text-muted-foreground">({primitives.length})</span>
                </div>
                {isExpanded ? (
                  <ChevronUp className="h-4 w-4 text-muted-foreground" />
                ) : (
                  <ChevronDown className="h-4 w-4 text-muted-foreground" />
                )}
              </button>

              {/* Primitive items */}
              {isExpanded && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="mt-2 space-y-2 overflow-hidden"
                >
                  {primitives.map(renderPrimitiveItem)}
                </motion.div>
              )}
            </div>
          );
        })}

        {/* No results */}
        {filteredPrimitives.length === 0 && (
          <div className="text-center py-8">
            <p className="text-sm text-muted-foreground">Nema pronađenih elemenata</p>
            <p className="text-xs text-muted-foreground mt-1">
              Pokušajte drugu pretragu
            </p>
          </div>
        )}
      </div>

      {/* Footer hint */}
      <div className="border-t border-border p-3 bg-workshop-gray/50">
        <p className="text-xs text-muted-foreground text-center">
          💡 Držite Shift za pomeranje platna
        </p>
      </div>
    </div>
  );
}
