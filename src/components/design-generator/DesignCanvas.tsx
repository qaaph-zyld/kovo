"use client";

import { useState, useRef, useCallback } from "react";
import { motion } from "framer-motion";
import { useDesignStore, useSelectedPrimitive } from "@/store/design";
import { getPrimitiveById } from "@/data/design-primitives";

interface DesignCanvasProps {
  width: number;
  height: number;
}

export default function DesignCanvas({ width, height }: DesignCanvasProps) {
  const svgRef = useRef<SVGSVGElement>(null);
  const {
    placedPrimitives,
    selectedId,
    activeTool,
    dragState,
    zoom,
    panX,
    panY,
    showGrid,
    gridSize,
    snapToGrid,
    selectPrimitive,
    startDrag,
    updateDrag,
    endDrag,
    removePrimitive,
  } = useDesignStore();

  const selectedPrimitive = useSelectedPrimitive();
  const [isPanning, setIsPanning] = useState(false);
  const [panStart, setPanStart] = useState({ x: 0, y: 0 });

  // Convert screen coordinates to canvas coordinates
  const screenToCanvas = useCallback((screenX: number, screenY: number) => {
    if (!svgRef.current) return { x: 0, y: 0 };
    const pt = svgRef.current.createSVGPoint();
    pt.x = screenX;
    pt.y = screenY;
    const svgP = pt.matrixTransform(svgRef.current.getScreenCTM()?.inverse());
    return {
      x: (svgP.x - panX) / zoom,
      y: (svgP.y - panY) / zoom,
    };
  }, [zoom, panX, panY]);

  // Handle mouse down on canvas
  const handleCanvasMouseDown = useCallback((e: React.MouseEvent<SVGSVGElement>) => {
    const coords = screenToCanvas(e.clientX, e.clientY);
    
    if (activeTool === "pan" || e.shiftKey) {
      setIsPanning(true);
      setPanStart({ x: e.clientX, y: e.clientY });
      return;
    }
    
    // Check if clicking on empty space to deselect
    const target = e.target as SVGElement;
    if (target === svgRef.current) {
      selectPrimitive(null);
    }
  }, [activeTool, screenToCanvas, selectPrimitive]);

  // Handle mouse move for dragging and panning
  const handleMouseMove = useCallback((e: React.MouseEvent<SVGSVGElement>) => {
    if (isPanning) {
      const dx = e.clientX - panStart.x;
      const dy = e.clientY - panStart.y;
      // TODO: Update pan in store
      return;
    }
    
    if (dragState.isDragging) {
      const coords = screenToCanvas(e.clientX, e.clientY);
      updateDrag(coords.x, coords.y);
    }
  }, [isPanning, panStart, dragState.isDragging, screenToCanvas, updateDrag]);

  // Handle mouse up
  const handleMouseUp = useCallback(() => {
    if (isPanning) {
      setIsPanning(false);
      return;
    }
    
    if (dragState.isDragging) {
      endDrag();
    }
  }, [isPanning, dragState.isDragging, endDrag]);

  // Handle primitive click
  const handlePrimitiveClick = useCallback((instanceId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    selectPrimitive(instanceId);
  }, [selectPrimitive]);

  // Handle primitive drag start
  const handlePrimitiveDragStart = useCallback((instanceId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const coords = screenToCanvas(e.clientX, e.clientY);
    startDrag(null, coords.x, coords.y, instanceId);
  }, [screenToCanvas, startDrag]);

  // Handle key press for delete
  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (e.key === "Delete" || e.key === "Backspace") {
      if (selectedId) {
        removePrimitive(selectedId);
      }
    }
  }, [selectedId, removePrimitive]);

  // Add keyboard event listener
  useState(() => {
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  });

  // Render grid
  const renderGrid = () => {
    if (!showGrid) return null;
    
    const gridLines = [];
    const step = gridSize * zoom;
    
    // Vertical lines
    for (let x = panX % step; x < width; x += step) {
      gridLines.push(
        <line
          key={`v-${x}`}
          x1={x}
          y1={0}
          x2={x}
          y2={height}
          stroke="var(--color-border)"
          strokeWidth="0.5"
          opacity="0.3"
        />
      );
    }
    
    // Horizontal lines
    for (let y = panY % step; y < height; y += step) {
      gridLines.push(
        <line
          key={`h-${y}`}
          x1={0}
          y1={y}
          x2={width}
          y2={y}
          stroke="var(--color-border)"
          strokeWidth="0.5"
          opacity="0.3"
        />
      );
    }
    
    return <g className="grid">{gridLines}</g>;
  };

  // Render a single primitive
  const renderPrimitive = (placed: typeof placedPrimitives[0]) => {
    const primitive = getPrimitiveById(placed.primitiveId);
    if (!primitive) return null;

    const isSelected = selectedId === placed.id;
    const isBeingDragged = dragState.draggedInstanceId === placed.id;

    return (
      <g
        key={placed.id}
        transform={`translate(${placed.x * zoom + panX}, ${placed.y * zoom + panY}) rotate(${placed.rotation}) scale(${placed.scale * zoom})`}
        className={`primitive ${isSelected ? "selected" : ""} ${isBeingDragged ? "dragging" : ""}`}
        onMouseDown={(e) => handlePrimitiveClick(placed.id, e)}
        onDragStart={(e) => handlePrimitiveDragStart(placed.id, e)}
        style={{ cursor: activeTool === "select" ? "move" : "default" }}
      >
        {/* Selection outline */}
        {isSelected && (
          <rect
            x={-primitive.width / 2 - 5}
            y={-primitive.height / 2 - 5}
            width={primitive.width + 10}
            height={primitive.height + 10}
            fill="none"
            stroke="var(--color-forge-amber)"
            strokeWidth="2"
            strokeDasharray="5,5"
            className="selection-outline"
          />
        )}
        
        {/* The primitive path */}
        <path
          d={primitive.svgPath}
          fill="none"
          stroke="var(--color-iron-black)"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="primitive-path"
          transform={`translate(${-primitive.width / 2}, ${-primitive.height / 2})`}
        />
        
        {/* Snap points (visible when dragging) */}
        {isBeingDragged && primitive.snapPoints.map((snap) => (
          <circle
            key={snap.id}
            cx={snap.x - primitive.width / 2}
            cy={snap.y - primitive.height / 2}
            r="4"
            fill="var(--color-forge-amber)"
            opacity="0.6"
            className="snap-point"
          />
        ))}
      </g>
    );
  };

  // Render drag preview
  const renderDragPreview = () => {
    if (!dragState.isDragging || !dragState.draggedPrimitive) return null;

    const primitive = dragState.draggedPrimitive;
    return (
      <g
        transform={`translate(${dragState.currentX * zoom + panX}, ${dragState.currentY * zoom + panY}) scale(${zoom})`}
        opacity="0.6"
        className="drag-preview"
        pointerEvents="none"
      >
        <path
          d={primitive.svgPath}
          fill="none"
          stroke="var(--color-iron-black)"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
          transform={`translate(${-primitive.width / 2}, ${-primitive.height / 2})`}
        />
      </g>
    );
  };

  return (
    <div className="relative overflow-hidden rounded-xl border border-border bg-workshop-gray">
      <svg
        ref={svgRef}
        width={width}
        height={height}
        className="design-canvas"
        role="img"
        aria-label="Platno za dizajn kovanog nameštaja"
        onMouseDown={handleCanvasMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        style={{
          cursor: activeTool === "pan" || isPanning ? "grab" : activeTool === "select" ? "default" : "crosshair",
        }}
      >
        {/* Background */}
        <rect width={width} height={height} fill="var(--color-workshop-gray)" />
        
        {/* Grid */}
        {renderGrid()}
        
        {/* Empty state hint */}
        {placedPrimitives.length === 0 && (
          <g>
            <text
              x={width / 2}
              y={height / 2 - 24}
              textAnchor="middle"
              fill="var(--color-ash)"
              fontSize="16"
              fontFamily="var(--font-sans)"
              opacity="0.6"
            >
              Prevucite elemente sa leve strane
            </text>
            <text
              x={width / 2}
              y={height / 2 + 4}
              textAnchor="middle"
              fill="var(--color-ash)"
              fontSize="13"
              fontFamily="var(--font-sans)"
              opacity="0.4"
            >
              ili izaberite patern za početak
            </text>
            <rect
              x={width / 2 - 40}
              y={height / 2 + 16}
              width="80"
              height="2"
              rx="1"
              fill="var(--color-forge-amber)"
              opacity="0.3"
            />
          </g>
        )}
        
        {/* Canvas content group */}
        <g transform={`translate(${panX}, ${panY}) scale(${zoom})`}>
          {placedPrimitives.map(renderPrimitive)}
        </g>
        
        {/* Drag preview */}
        {renderDragPreview()}
        
        {/* Snap point hints */}
        {dragState.snapPoints.map((hint, i) => (
          <circle
            key={i}
            cx={hint.x * zoom + panX}
            cy={hint.y * zoom + panY}
            r={hint.strength === "strong" ? 8 : 6}
            fill="none"
            stroke="var(--color-forge-amber)"
            strokeWidth="2"
            opacity={hint.strength === "strong" ? 0.8 : 0.4}
            strokeDasharray="3,3"
            className="snap-hint"
            pointerEvents="none"
          />
        ))}
      </svg>
      
      {/* Canvas overlay info */}
      <div className="absolute bottom-2 left-2 rounded-md bg-iron-deep/80 px-2 py-1 text-xs text-white">
        Zoom: {Math.round(zoom * 100)}% | Grid: {showGrid ? `${gridSize}cm` : "off"}
      </div>
      
      {/* Selected primitive info */}
      {selectedPrimitive && (
        <div className="absolute top-2 right-2 rounded-md bg-iron-deep/80 px-3 py-2 text-xs text-white">
          <div className="font-semibold">{getPrimitiveById(selectedPrimitive.primitiveId)?.name}</div>
          <div>Pos: ({Math.round(selectedPrimitive.x)}, {Math.round(selectedPrimitive.y)})</div>
          <div>Rot: {selectedPrimitive.rotation}° | Scale: {selectedPrimitive.scale.toFixed(2)}</div>
        </div>
      )}
    </div>
  );
}
