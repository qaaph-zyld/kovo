"use client";

import { useState, useEffect } from "react";
import { 
  Palette, 
  Grid3x3, 
  Download, 
  Upload, 
  Trash2, 
  Undo2, 
  Redo2, 
  ZoomIn, 
  ZoomOut, 
  Maximize2,
  PanelLeftOpen,
  PanelRightOpen,
  Monitor
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
  const [leftSidebarOpen, setLeftSidebarOpen] = useState(false);
  const [rightSidebarOpen, setRightSidebarOpen] = useState(false);
  
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
      {/* Mobile notice — shown only on small screens */}
      <div className="flex items-center gap-3 border-b border-forge-amber/20 bg-forge-amber/5 px-4 py-3 lg:hidden">
        <Monitor className="h-4 w-4 flex-shrink-0 text-forge-amber" />
        <p className="text-xs leading-relaxed text-muted-foreground">
          Dizajner je optimizovan za desktop. Za najbolje iskustvo koristite veći ekran.
        </p>
      </div>

      {/* Header */}
      <header className="border-b border-border bg-card">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-14 lg:h-16">
            <div className="flex items-center gap-3">
              {/* Mobile sidebar toggles */}
              <Button
                variant="outline"
                size="sm"
                onClick={() => setLeftSidebarOpen(!leftSidebarOpen)}
                className="h-9 w-9 p-0 lg:hidden"
                aria-label="Otvori paletu"
              >
                <PanelLeftOpen className="h-4 w-4" />
              </Button>
              <h1 className="font-display text-xl tracking-tight lg:text-2xl">Dizajner</h1>
              <span className="hidden text-sm text-muted-foreground sm:inline">
                Modulni kovani dizajn
              </span>
            </div>

            {/* Toolbar — compact on mobile */}
            <div className="flex items-center gap-1 sm:gap-2">
              {/* Undo/Redo — always visible */}
              <Button
                variant="outline"
                size="sm"
                onClick={undo}
                disabled={!canUndo}
                className="h-9 w-9 p-0"
              >
                <Undo2 className="h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={redo}
                disabled={!canRedo}
                className="h-9 w-9 p-0"
              >
                <Redo2 className="h-4 w-4" />
              </Button>

              <div className="hidden w-px h-6 bg-border sm:block" />

              {/* Grid controls — hidden on mobile */}
              <Button
                variant={showGrid ? "default" : "outline"}
                size="sm"
                onClick={toggleGrid}
                className="hidden h-9 px-3 sm:flex"
              >
                <Grid3x3 className="h-4 w-4 mr-1" />
                Mreža
              </Button>

              <div className="hidden w-px h-6 bg-border md:block" />

              {/* Import/Export — hidden on small mobile */}
              <div className="relative hidden md:block">
                <input
                  type="file"
                  accept=".json"
                  onChange={handleImport}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                />
                <Button variant="outline" size="sm" className="h-9 px-3">
                  <Upload className="h-4 w-4 mr-1" />
                  Učitaj
                </Button>
              </div>
              <Button variant="outline" size="sm" onClick={handleExport} className="h-9 px-3">
                <Download className="h-4 w-4" />
                <span className="ml-1 hidden md:inline">Izvezi</span>
              </Button>

              <div className="hidden w-px h-6 bg-border sm:block" />

              {/* Clear — icon-only on mobile */}
              <Button
                variant="outline"
                size="sm"
                onClick={clearCanvas}
                className="h-9 px-2 text-destructive border-destructive/20 hover:bg-destructive/5 sm:px-3"
              >
                <Trash2 className="h-4 w-4" />
                <span className="ml-1 hidden sm:inline">Obriši</span>
              </Button>

              {/* Mobile right sidebar toggle */}
              <Button
                variant="outline"
                size="sm"
                onClick={() => setRightSidebarOpen(!rightSidebarOpen)}
                className="h-9 w-9 p-0 lg:hidden"
                aria-label="Otvori svojstva"
              >
                <PanelRightOpen className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className="relative flex h-[calc(100vh-4rem)] lg:h-[calc(100vh-4rem)]">
        {/* Left sidebar - Palette/Patterns */}
        <aside className={`absolute inset-y-0 left-0 z-30 w-72 border-r border-border bg-card flex flex-col transition-transform duration-300 lg:relative lg:w-80 lg:translate-x-0 ${leftSidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
          {/* Tab switcher */}
          <div className="flex border-b border-border">
            <button
              onClick={() => setActiveTab("primitives")}
              className={`flex-1 flex items-center justify-center gap-2 px-4 py-3 text-sm font-medium transition-colors outline-none focus-visible:ring-[3px] focus-visible:ring-forge-amber/30 ${
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
              className={`flex-1 flex items-center justify-center gap-2 px-4 py-3 text-sm font-medium transition-colors outline-none focus-visible:ring-[3px] focus-visible:ring-forge-amber/30 ${
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

        {/* Mobile sidebar overlay */}
        {(leftSidebarOpen || rightSidebarOpen) && (
          <div
            className="absolute inset-0 z-20 bg-iron-deep/40 lg:hidden"
            onClick={() => { setLeftSidebarOpen(false); setRightSidebarOpen(false); }}
          />
        )}

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
        <aside className={`absolute inset-y-0 right-0 z-30 w-72 border-l border-border bg-card transition-transform duration-300 lg:relative lg:w-80 lg:translate-x-0 ${rightSidebarOpen ? 'translate-x-0' : 'translate-x-full'}`}>
          <DesignProperties />
        </aside>
      </main>

      {/* Keyboard shortcuts help — hidden on mobile */}
      <div className="fixed bottom-4 left-4 hidden bg-iron-deep/90 text-white p-3 rounded-lg text-xs max-w-xs lg:block">
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
