"use client";

import { useState, useRef } from "react";
import { Trash2, FlipHorizontal, FlipVertical } from "lucide-react";
import { useDesignStore, useSelectedPrimitive } from "@/store/design";
import { getPrimitiveById } from "@/data/design-primitives";

export default function DesignProperties() {
  const selectedPrimitive = useSelectedPrimitive();
  const {
    removePrimitive,
    rotatePrimitive,
    scalePrimitive,
    flipPrimitive,
  } = useDesignStore();

  const [rotationInput, setRotationInput] = useState(selectedPrimitive?.rotation || 0);
  const [scaleInput, setScaleInput] = useState(selectedPrimitive?.scale || 1);

  // Keep inputs in sync with selected primitive WITHOUT using useEffect
  // This is a cleaner pattern for derived state
  const prevSelectedId = useRef(selectedPrimitive?.id);
  if (selectedPrimitive?.id !== prevSelectedId.current) {
    prevSelectedId.current = selectedPrimitive?.id;
    if (selectedPrimitive) {
      setRotationInput(selectedPrimitive.rotation || 0);
      setScaleInput(selectedPrimitive.scale || 1);
    }
  }

  if (!selectedPrimitive) {
    return (
      <div className="flex h-full flex-col bg-card">
        <div className="border-b border-border p-4">
          <h3 className="font-display text-lg tracking-tight">Svojstva</h3>
          <p className="text-xs text-muted-foreground mt-1">
            Izaberite element za uređivanje
          </p>
        </div>
        
        <div className="flex-1 flex items-center justify-center p-8">
          <div className="text-center">
            <div className="h-12 w-12 rounded-full bg-workshop-gray flex items-center justify-center mx-auto mb-3">
              <div className="h-6 w-6 rounded-sm bg-border/30" />
            </div>
            <p className="text-sm text-muted-foreground">Nema izabranog elementa</p>
            <p className="text-xs text-muted-foreground mt-1">
              Kliknite na element na platnu
            </p>
          </div>
        </div>
      </div>
    );
  }

  const primitive = getPrimitiveById(selectedPrimitive.primitiveId);
  if (!primitive) return null;

  // Handle rotation change
  const handleRotationChange = (value: number) => {
    setRotationInput(value);
    rotatePrimitive(selectedPrimitive.id, value);
  };

  // Handle scale change
  const handleScaleChange = (value: number) => {
    setScaleInput(value);
    scalePrimitive(selectedPrimitive.id, value);
  };

  // Handle flip
  const handleFlip = (axis: "x" | "y") => {
    flipPrimitive(selectedPrimitive.id, axis);
  };

  // Handle delete
  const handleDelete = () => {
    removePrimitive(selectedPrimitive.id);
  };

  return (
    <div className="flex h-full flex-col bg-card">
      {/* Header */}
      <div className="border-b border-border p-4">
        <h3 className="font-display text-lg tracking-tight">Svojstva</h3>
        <p className="text-xs text-muted-foreground mt-1">
          {primitive.name}
        </p>
      </div>

      {/* Properties */}
      <div className="flex-1 overflow-y-auto p-4 space-y-6">
        {/* Primitive info */}
        <div>
          <h4 className="text-sm font-semibold tracking-tight mb-3">Informacije</h4>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Tip:</span>
              <span className="font-medium">{primitive.category}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Veličina:</span>
              <span className="font-mono">{primitive.width}×{primitive.height}cm</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Pozicija:</span>
              <span className="font-mono">
                ({Math.round(selectedPrimitive.x)}, {Math.round(selectedPrimitive.y)})
              </span>
            </div>
          </div>
        </div>

        {/* Transform controls */}
        <div>
          <h4 className="text-sm font-semibold tracking-tight mb-3">Transformacije</h4>
          
          {/* Rotation */}
          <div className="mb-4">
            <label className="text-xs text-muted-foreground uppercase tracking-wider mb-2 block">
              Rotacija
            </label>
            <div className="flex items-center gap-2">
              <input
                type="range"
                min="0"
                max="360"
                step="15"
                value={rotationInput}
                onChange={(e) => handleRotationChange(Number(e.target.value))}
                className="flex-1"
              />
              <input
                type="number"
                min="0"
                max="360"
                value={rotationInput}
                onChange={(e) => handleRotationChange(Number(e.target.value))}
                className="w-16 px-2 py-1 text-sm border border-border/50 rounded-md bg-card text-center font-mono"
              />
              <span className="text-xs text-muted-foreground">°</span>
            </div>
            <div className="flex gap-1 mt-2">
              <button
                onClick={() => handleRotationChange(0)}
                className="px-2 py-1 text-xs border border-border/50 rounded-md hover:border-forge-amber/30 transition-colors outline-none focus-visible:ring-[2px] focus-visible:ring-forge-amber/30"
              >
                0°
              </button>
              <button
                onClick={() => handleRotationChange(45)}
                className="px-2 py-1 text-xs border border-border/50 rounded-md hover:border-forge-amber/30 transition-colors outline-none focus-visible:ring-[2px] focus-visible:ring-forge-amber/30"
              >
                45°
              </button>
              <button
                onClick={() => handleRotationChange(90)}
                className="px-2 py-1 text-xs border border-border/50 rounded-md hover:border-forge-amber/30 transition-colors outline-none focus-visible:ring-[2px] focus-visible:ring-forge-amber/30"
              >
                90°
              </button>
              <button
                onClick={() => handleRotationChange(180)}
                className="px-2 py-1 text-xs border border-border/50 rounded-md hover:border-forge-amber/30 transition-colors outline-none focus-visible:ring-[2px] focus-visible:ring-forge-amber/30"
              >
                180°
              </button>
            </div>
          </div>

          {/* Scale */}
          <div className="mb-4">
            <label className="text-xs text-muted-foreground uppercase tracking-wider mb-2 block">
              Skaliranje
            </label>
            <div className="flex items-center gap-2">
              <input
                type="range"
                min="0.1"
                max="3"
                step="0.1"
                value={scaleInput}
                onChange={(e) => handleScaleChange(Number(e.target.value))}
                className="flex-1"
              />
              <input
                type="number"
                min="0.1"
                max="3"
                step="0.1"
                value={scaleInput}
                onChange={(e) => handleScaleChange(Number(e.target.value))}
                className="w-16 px-2 py-1 text-sm border border-border/50 rounded-md bg-card text-center font-mono"
              />
              <span className="text-xs text-muted-foreground">×</span>
            </div>
            <div className="flex gap-1 mt-2">
              <button
                onClick={() => handleScaleChange(0.5)}
                className="px-2 py-1 text-xs border border-border/50 rounded-md hover:border-forge-amber/30 transition-colors outline-none focus-visible:ring-[2px] focus-visible:ring-forge-amber/30"
              >
                0.5×
              </button>
              <button
                onClick={() => handleScaleChange(1)}
                className="px-2 py-1 text-xs border border-border/50 rounded-md hover:border-forge-amber/30 transition-colors outline-none focus-visible:ring-[2px] focus-visible:ring-forge-amber/30"
              >
                1×
              </button>
              <button
                onClick={() => handleScaleChange(1.5)}
                className="px-2 py-1 text-xs border border-border/50 rounded-md hover:border-forge-amber/30 transition-colors outline-none focus-visible:ring-[2px] focus-visible:ring-forge-amber/30"
              >
                1.5×
              </button>
              <button
                onClick={() => handleScaleChange(2)}
                className="px-2 py-1 text-xs border border-border/50 rounded-md hover:border-forge-amber/30 transition-colors outline-none focus-visible:ring-[2px] focus-visible:ring-forge-amber/30"
              >
                2×
              </button>
            </div>
          </div>

          {/* Flip */}
          <div>
            <label className="text-xs text-muted-foreground uppercase tracking-wider mb-2 block">
              Obrtanje
            </label>
            <div className="flex gap-2">
              <button
                onClick={() => handleFlip("x")}
                className="flex-1 flex items-center justify-center gap-2 px-3 py-2 text-sm border border-border/50 rounded-md hover:border-forge-amber/30 transition-colors"
              >
                <FlipHorizontal className="h-4 w-4" />
                Horizontalno
              </button>
              <button
                onClick={() => handleFlip("y")}
                className="flex-1 flex items-center justify-center gap-2 px-3 py-2 text-sm border border-border/50 rounded-md hover:border-forge-amber/30 transition-colors"
              >
                <FlipVertical className="h-4 w-4" />
                Vertikalno
              </button>
            </div>
          </div>
        </div>

        {/* Primitive description */}
        {primitive.description && (
          <div>
            <h4 className="text-sm font-semibold tracking-tight mb-3">Opis</h4>
            <p className="text-sm text-muted-foreground leading-relaxed">
              {primitive.description}
            </p>
          </div>
        )}

        {/* Tags */}
        {primitive.tags.length > 0 && (
          <div>
            <h4 className="text-sm font-semibold tracking-tight mb-3">Oznake</h4>
            <div className="flex flex-wrap gap-1">
              {primitive.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-2 py-1 text-xs rounded-md bg-workshop-gray text-muted-foreground border border-border/30"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Actions */}
      <div className="border-t border-border p-4">
        <button
          onClick={handleDelete}
          className="w-full flex items-center justify-center gap-2 px-4 py-2 text-sm border border-red-200 text-red-600 rounded-md hover:bg-red-50 transition-colors"
        >
          <Trash2 className="h-4 w-4" />
          Obriši element
        </button>
      </div>
    </div>
  );
}
