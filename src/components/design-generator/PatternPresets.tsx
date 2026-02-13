"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Search, Star, Clock } from "lucide-react";
import { useDesignStore } from "@/store/design";
import { designPatterns, getPatternsByCategory, getPatternsByDifficulty, searchPatterns, type DesignPattern } from "@/data/design-patterns";

const categoryLabels: Record<DesignPattern["category"], string> = {
  panel: "Paneli",
  gate: "Kapije",
  header: "Zaglavlja",
  furniture: "Nameštaj",
};

const difficultyLabels: Record<DesignPattern["difficulty"], string> = {
  easy: "Lako",
  medium: "Srednje",
  complex: "Složeno",
};

const difficultyColors: Record<DesignPattern["difficulty"], string> = {
  easy: "bg-green-100 text-green-700 border-green-200",
  medium: "bg-yellow-100 text-yellow-700 border-yellow-200",
  complex: "bg-red-100 text-red-700 border-red-200",
};

export default function PatternPresets() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<DesignPattern["category"] | "all">("all");
  const [selectedDifficulty, setSelectedDifficulty] = useState<DesignPattern["difficulty"] | "all">("all");
  const { loadPattern } = useDesignStore();

  // Filter patterns based on search and filters
  const filteredPatterns = useState(() => {
    let patterns = designPatterns;

    // Apply search filter
    if (searchQuery.trim()) {
      patterns = searchPatterns(searchQuery);
    }

    // Apply category filter
    if (selectedCategory !== "all") {
      patterns = patterns.filter((p) => p.category === selectedCategory);
    }

    // Apply difficulty filter
    if (selectedDifficulty !== "all") {
      patterns = patterns.filter((p) => p.difficulty === selectedDifficulty);
    }

    return patterns;
  });

  // Handle pattern selection
  const handlePatternSelect = (pattern: DesignPattern) => {
    loadPattern(pattern);
  };

  // Render pattern thumbnail
  const renderPatternThumbnail = (pattern: DesignPattern) => {
    const scale = 60 / Math.max(pattern.width, pattern.height); // Scale to fit 60px thumbnail

    return (
      <svg
        width="60"
        height="60"
        viewBox={`0 0 ${pattern.width} ${pattern.height}`}
        className="opacity-80"
      >
        {pattern.primitives.map((primitive) => (
          <g
            key={primitive.id}
            transform={`translate(${primitive.x}, ${primitive.y}) rotate(${primitive.rotation}) scale(${primitive.scale})`}
          >
            {/* This would render the actual primitive paths - simplified for now */}
            <rect
              x={-pattern.width / 4}
              y={-pattern.height / 4}
              width={pattern.width / 2}
              height={pattern.height / 2}
              fill="none"
              stroke="var(--color-iron-black)"
              strokeWidth="1"
              opacity="0.6"
            />
          </g>
        ))}
      </svg>
    );
  };

  // Render pattern card
  const renderPatternCard = (pattern: DesignPattern) => (
    <motion.button
      key={pattern.id}
      onClick={() => handlePatternSelect(pattern)}
      className="group w-full text-left"
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      <div className="flex items-center gap-3 rounded-lg border border-border/50 bg-card p-3 transition-all hover:border-forge-amber/30 hover:shadow-warm">
        {/* Thumbnail */}
        <div className="flex h-12 w-12 items-center justify-center rounded-md bg-workshop-gray">
          {renderPatternThumbnail(pattern)}
        </div>

        {/* Info */}
        <div className="flex-1 min-w-0">
          <h4 className="truncate text-sm font-semibold tracking-tight">{pattern.name}</h4>
          <p className="text-xs text-muted-foreground line-clamp-2">{pattern.description}</p>
          <div className="mt-1 flex items-center gap-2">
            <span className="text-[10px] text-muted-foreground">
              {pattern.width}×{pattern.height}cm
            </span>
            <span className={`text-[10px] px-1.5 py-0.5 rounded-md border ${difficultyColors[pattern.difficulty]}`}>
              {difficultyLabels[pattern.difficulty]}
            </span>
          </div>
        </div>

        {/* Load indicator */}
        <div className="opacity-0 group-hover:opacity-100 transition-opacity">
          <div className="h-8 w-8 rounded-md bg-forge-amber/10 flex items-center justify-center">
            <Star className="h-4 w-4 text-forge-amber" />
          </div>
        </div>
      </div>
    </motion.button>
  );

  return (
    <div className="flex h-full flex-col bg-card">
      {/* Header */}
      <div className="border-b border-border p-4">
        <h3 className="font-display text-lg tracking-tight">Paterni</h3>
        <p className="text-xs text-muted-foreground mt-1">
          Kliknite za učitavanje predloška
        </p>
      </div>

      {/* Search */}
      <div className="p-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <input
            type="text"
            placeholder="Pretraži paterne..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 text-sm border border-border/50 rounded-lg bg-card focus:border-forge-amber/30 focus:outline-none focus:ring-2 focus:ring-forge-amber/10"
          />
        </div>
      </div>

      {/* Filters */}
      <div className="px-4 pb-4 space-y-3">
        {/* Category filter */}
        <div>
          <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
            Kategorija
          </label>
          <div className="mt-1 flex flex-wrap gap-1">
            <button
              onClick={() => setSelectedCategory("all")}
              className={`px-2 py-1 text-xs rounded-md border transition-colors ${
                selectedCategory === "all"
                  ? "bg-forge-amber text-white border-forge-amber"
                  : "bg-card text-muted-foreground border-border/50 hover:border-forge-amber/30"
              }`}
            >
              Sve
            </button>
            {Object.entries(categoryLabels).map(([key, label]) => (
              <button
                key={key}
                onClick={() => setSelectedCategory(key as DesignPattern["category"])}
                className={`px-2 py-1 text-xs rounded-md border transition-colors ${
                  selectedCategory === key
                    ? "bg-forge-amber text-white border-forge-amber"
                    : "bg-card text-muted-foreground border-border/50 hover:border-forge-amber/30"
                }`}
              >
                {label}
              </button>
            ))}
          </div>
        </div>

        {/* Difficulty filter */}
        <div>
          <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
            Težina
          </label>
          <div className="mt-1 flex flex-wrap gap-1">
            <button
              onClick={() => setSelectedDifficulty("all")}
              className={`px-2 py-1 text-xs rounded-md border transition-colors ${
                selectedDifficulty === "all"
                  ? "bg-forge-amber text-white border-forge-amber"
                  : "bg-card text-muted-foreground border-border/50 hover:border-forge-amber/30"
              }`}
            >
              Sve
            </button>
            {Object.entries(difficultyLabels).map(([key, label]) => (
              <button
                key={key}
                onClick={() => setSelectedDifficulty(key as DesignPattern["difficulty"])}
                className={`px-2 py-1 text-xs rounded-md border transition-colors ${
                  selectedDifficulty === key
                    ? "bg-forge-amber text-white border-forge-amber"
                    : "bg-card text-muted-foreground border-border/50 hover:border-forge-amber/30"
                }`}
              >
                {label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Pattern list */}
      <div className="flex-1 overflow-y-auto px-4 pb-4">
        <div className="space-y-2">
          {filteredPatterns[0].map(renderPatternCard)}
        </div>

        {/* No results */}
        {filteredPatterns[0].length === 0 && (
          <div className="text-center py-8">
            <Clock className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
            <p className="text-sm text-muted-foreground">Nema pronađenih paterna</p>
            <p className="text-xs text-muted-foreground mt-1">
              Pokušajte drugu pretragu ili filtere
            </p>
          </div>
        )}
      </div>

      {/* Footer hint */}
      <div className="border-t border-border p-3 bg-workshop-gray/50">
        <p className="text-xs text-muted-foreground text-center">
          💡 Paterni se mogu dalje menjati
        </p>
      </div>
    </div>
  );
}
