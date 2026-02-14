"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { 
  Palette, 
  Grid3x3, 
  Settings, 
  Download, 
  Upload, 
  Trash2, 
  Undo2, 
  Redo2, 
  ZoomIn, 
  ZoomOut, 
  Maximize2,
  Save,
  Share2
} from "lucide-react";
import { Button } from "@/components/ui/button";
import PrimitivePalette from "@/components/design-generator/PrimitivePalette";
import PatternPresets from "@/components/design-generator/PatternPresets";
import DesignCanvas from "@/components/design-generator/DesignCanvas";
import DesignProperties from "@/components/design-generator/DesignProperties";
import { useDesignStore, useCanUndo, useCanRedo } from "@/store/design";

export default function DesignGeneratorPage() {
  const [activeTab, setActiveTab] = useState<"primitives" | "patterns">("primitives");
  const [canvasSize, setCanvasSize] = useState({ width: 800, height: 600 });
  
  const {
    zoom,
    setZoom,
    clearCanvas,
    exportDesign,
    importDesign,
    undo,
    redo,
    showGrid,
    toggleGrid,
    snapToGrid,
    toggleSnapToGrid,
  } = useDesignStore();

  const canUndo = useCanUndo();
  const canRedo = useCanRedo();

  // Handle file import
  const handleImport = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const content = event.target?.result as string;
        importDesign(content);
      };
      reader.readAsText(file);
    }
  };

  // Handle file export
  const handleExport = () => {
    const design = exportDesign();
    const blob = new Blob([design], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `kovo-design-${Date.now()}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  // Handle zoom controls
  const handleZoomIn = () => setZoom(Math.min(zoom * 1.2, 5));
  const handleZoomOut = () => setZoom(Math.max(zoom / 1.2, 0.1));
  const handleZoomReset = () => setZoom(1);

  // Handle keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.ctrlKey || e.metaKey) {
        switch (e.key) {
          case "z":
            e.preventDefault();
            if (e.shiftKey) {
              redo();
            } else {
              undo();
            }
            break;
          case "s":
            e.preventDefault();
            handleExport();
            break;
          case "Delete":
          case "Backspace":
            if (e.shiftKey) {
              e.preventDefault();
              clearCanvas();
            }
            break;
        }
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [undo, redo, clearCanvas]);

  return (
    <div className="min-h-screen bg-oak-warm-white">
      {/* Header */}
      <header className="border-b border-border bg-card">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-4">
              <h1 className="font-display text-2xl tracking-tight">Dizajner</h1>
              <span className="text-sm text-muted-foreground">
                Modulni kovani dizajn
              </span>
            </div>

            {/* Toolbar */}
            <div className="flex items-center gap-2">
              {/* Undo/Redo */}
              <Button
                variant="outline"
                size="sm"
                onClick={undo}
                disabled={!canUndo}
                className="h-8 w-8 p-0"
              >
                <Undo2 className="h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={redo}
                disabled={!canRedo}
                className="h-8 w-8 p-0"
              >
                <Redo2 className="h-4 w-4" />
              </Button>

              <div className="w-px h-6 bg-border" />

              {/* Grid controls */}
              <Button
                variant={showGrid ? "default" : "outline"}
                size="sm"
                onClick={toggleGrid}
                className="h-8 px-3"
              >
                <Grid3x3 className="h-4 w-4 mr-1" />
                Mreža
              </Button>

              <div className="w-px h-6 bg-border" />

              {/* Import/Export */}
              <div className="relative">
                <input
                  type="file"
                  accept=".json"
                  onChange={handleImport}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                />
                <Button variant="outline" size="sm" className="h-8 px-3">
                  <Upload className="h-4 w-4 mr-1" />
                  Učitaj
                </Button>
              </div>
              <Button variant="outline" size="sm" onClick={handleExport} className="h-8 px-3">
                <Download className="h-4 w-4 mr-1" />
                  Izvezi
              </Button>

              <div className="w-px h-6 bg-border" />

              {/* Clear */}
              <Button
                variant="outline"
                size="sm"
                onClick={clearCanvas}
                className="h-8 px-3 text-destructive border-destructive/20 hover:bg-destructive/5"
              >
                <Trash2 className="h-4 w-4 mr-1" />
                Obriši
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className="flex h-[calc(100vh-4rem)]">
        {/* Left sidebar - Palette/Patterns */}
        <aside className="w-80 border-r border-border bg-card flex flex-col">
          {/* Tab switcher */}
          <div className="flex border-b border-border">
            <button
              onClick={() => setActiveTab("primitives")}
              className={`flex-1 flex items-center justify-center gap-2 px-4 py-3 text-sm font-medium transition-colors ${
                activeTab === "primitives"
                  ? "bg-forge-amber/10 text-forge-amber border-b-2 border-forge-amber"
                  : "text-muted-foreground hover:text-foreground hover:bg-workshop-gray/50"
              }`}
            >
              <Palette className="h-4 w-4" />
              Elementi
            </button>
            <button
              onClick={() => setActiveTab("patterns")}
              className={`flex-1 flex items-center justify-center gap-2 px-4 py-3 text-sm font-medium transition-colors ${
                activeTab === "patterns"
                  ? "bg-forge-amber/10 text-forge-amber border-b-2 border-forge-amber"
                  : "text-muted-foreground hover:text-foreground hover:bg-workshop-gray/50"
              }`}
            >
              <Grid3x3 className="h-4 w-4" />
              Paterni
            </button>
          </div>

          {/* Tab content */}
          <div className="flex-1 overflow-hidden">
            {activeTab === "primitives" ? <PrimitivePalette /> : <PatternPresets />}
          </div>
        </aside>

        {/* Center - Canvas */}
        <section className="flex-1 flex flex-col bg-workshop-gray">
          {/* Canvas toolbar */}
          <div className="flex items-center justify-between px-4 py-2 border-b border-border bg-card">
            <div className="flex items-center gap-2">
              {/* Zoom controls */}
              <Button variant="outline" size="sm" onClick={handleZoomOut} className="h-8 w-8 p-0">
                <ZoomOut className="h-4 w-4" />
              </Button>
              <span className="text-sm font-mono min-w-[60px] text-center">
                {Math.round(zoom * 100)}%
              </span>
              <Button variant="outline" size="sm" onClick={handleZoomIn} className="h-8 w-8 p-0">
                <ZoomIn className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="sm" onClick={handleZoomReset} className="h-8 px-2">
                <Maximize2 className="h-4 w-4" />
              </Button>

              <div className="w-px h-6 bg-border ml-2" />

              {/* Canvas info */}
              <span className="text-xs text-muted-foreground">
                Platno: {canvasSize.width}×{canvasSize.height}px
              </span>
            </div>

            <div className="flex items-center gap-2">
              {/* Snap to grid */}
              <Button
                variant={snapToGrid ? "default" : "outline"}
                size="sm"
                onClick={toggleSnapToGrid}
                className="h-8 px-3"
              >
                <Grid3x3 className="h-4 w-4 mr-1" />
                Lepi
              </Button>
            </div>
          </div>

          {/* Canvas */}
          <div className="flex-1 p-4 overflow-hidden">
            <DesignCanvas width={canvasSize.width} height={canvasSize.height} />
          </div>
        </section>

        {/* Right sidebar - Properties */}
        <aside className="w-80 border-l border-border bg-card">
          <DesignProperties />
        </aside>
      </main>

      {/* Keyboard shortcuts help */}
      <div className="fixed bottom-4 left-4 bg-iron-deep/90 text-white p-3 rounded-lg text-xs max-w-xs">
        <div className="font-semibold mb-1">Prečice:</div>
        <div className="space-y-0.5">
          <div>Ctrl+Z: Poništi</div>
          <div>Ctrl+Shift+Z: Ponovi</div>
          <div>Ctrl+S: Sačuvaj</div>
          <div>Shift+Delete: Obriši sve</div>
          <div>Shift: Pomeri platno</div>
        </div>
      </div>
    </div>
  );
}
