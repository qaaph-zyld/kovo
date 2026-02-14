// ============================================================================
// Design Store - Zustand state management for design generator
// Handles canvas state, drag-and-drop, selection, and design persistence
// ============================================================================

import { create } from "zustand";
import { devtools } from "zustand/middleware";
import type { DesignPrimitive } from "@/data/design-primitives";
import type { DesignPattern, PlacedPrimitive } from "@/data/design-patterns";

export type ActiveTool = "select" | "place" | "pan";

export interface DragState {
  isDragging: boolean;
  draggedPrimitive: DesignPrimitive | null;
  draggedInstanceId: string | null; // for moving existing primitives
  startX: number;
  startY: number;
  currentX: number;
  currentY: number;
  snapPoints: SnapPointHint[];
}

export interface SnapPointHint {
  x: number;
  y: number;
  primitiveId: string;
  snapPointId: string;
  strength: "weak" | "strong"; // visual feedback strength
}

export interface DesignState {
  // Canvas state
  placedPrimitives: PlacedPrimitive[];
  selectedId: string | null;
  activeTool: ActiveTool;
  
  // Drag and drop state
  dragState: DragState;
  
  // Canvas viewport
  zoom: number;
  panX: number;
  panY: number;
  canvasWidth: number;
  canvasHeight: number;
  
  // Grid and guides
  showGrid: boolean;
  gridSize: number; // cm
  snapToGrid: boolean;
  
  // History for undo/redo
  history: PlacedPrimitive[][];
  historyIndex: number;
  
  // Actions
  setActiveTool: (tool: ActiveTool) => void;
  addPrimitive: (primitive: DesignPrimitive, x: number, y: number) => void;
  removePrimitive: (instanceId: string) => void;
  selectPrimitive: (instanceId: string | null) => void;
  movePrimitive: (instanceId: string, x: number, y: number) => void;
  rotatePrimitive: (instanceId: string, rotation: number) => void;
  scalePrimitive: (instanceId: string, scale: number) => void;
  flipPrimitive: (instanceId: string, axis: "x" | "y") => void;
  
  // Drag and drop actions
  startDrag: (primitive: DesignPrimitive | null, startX: number, startY: number, instanceId?: string) => void;
  updateDrag: (currentX: number, currentY: number) => void;
  endDrag: () => void;
  
  // Pattern actions
  loadPattern: (pattern: DesignPattern) => void;
  clearCanvas: () => void;
  
  // Viewport actions
  setZoom: (zoom: number) => void;
  setPan: (x: number, y: number) => void;
  setCanvasSize: (width: number, height: number) => void;
  toggleGrid: () => void;
  setGridSize: (size: number) => void;
  toggleSnapToGrid: () => void;
  
  // History actions
  undo: () => void;
  redo: () => void;
  saveToHistory: () => void;
  
  // Utility actions
  exportDesign: () => string; // JSON export
  importDesign: (json: string) => void;
}

export const useDesignStore = create<DesignState>()(
  devtools(
    (set, get) => ({
      // Initial state
      placedPrimitives: [],
      selectedId: null,
      activeTool: "select",
      
      dragState: {
        isDragging: false,
        draggedPrimitive: null,
        draggedInstanceId: null,
        startX: 0,
        startY: 0,
        currentX: 0,
        currentY: 0,
        snapPoints: [],
      },
      
      zoom: 1,
      panX: 0,
      panY: 0,
      canvasWidth: 800,
      canvasHeight: 600,
      
      showGrid: true,
      gridSize: 5, // 5cm grid
      snapToGrid: true,
      
      history: [[]],
      historyIndex: 0,
      
      // Tool actions
      setActiveTool: (tool) => set({ activeTool: tool }),
      
      // Primitive actions
      addPrimitive: (primitive, x, y) => {
        const state = get();
        const newPrimitive: PlacedPrimitive = {
          id: `${primitive.id}-${Date.now()}`,
          primitiveId: primitive.id,
          x: state.snapToGrid ? Math.round(x / state.gridSize) * state.gridSize : x,
          y: state.snapToGrid ? Math.round(y / state.gridSize) * state.gridSize : y,
          rotation: 0,
          scale: 1,
        };
        
        set((prev) => ({
          placedPrimitives: [...prev.placedPrimitives, newPrimitive],
          selectedId: newPrimitive.id,
        }));
        
        get().saveToHistory();
      },
      
      removePrimitive: (instanceId) => {
        set((prev) => ({
          placedPrimitives: prev.placedPrimitives.filter((p) => p.id !== instanceId),
          selectedId: prev.selectedId === instanceId ? null : prev.selectedId,
        }));
        get().saveToHistory();
      },
      
      selectPrimitive: (instanceId) => set({ selectedId: instanceId }),
      
      movePrimitive: (instanceId, x, y) => {
        const state = get();
        set((prev) => ({
          placedPrimitives: prev.placedPrimitives.map((p) =>
            p.id === instanceId
              ? {
                  ...p,
                  x: state.snapToGrid ? Math.round(x / state.gridSize) * state.gridSize : x,
                  y: state.snapToGrid ? Math.round(y / state.gridSize) * state.gridSize : y,
                }
              : p
          ),
        }));
      },
      
      rotatePrimitive: (instanceId, rotation) => {
        set((prev) => ({
          placedPrimitives: prev.placedPrimitives.map((p) =>
            p.id === instanceId ? { ...p, rotation } : p
          ),
        }));
        get().saveToHistory();
      },
      
      scalePrimitive: (instanceId, scale) => {
        set((prev) => ({
          placedPrimitives: prev.placedPrimitives.map((p) =>
            p.id === instanceId ? { ...p, scale: Math.max(0.1, Math.min(3, scale)) } : p
          ),
        }));
        get().saveToHistory();
      },
      
      flipPrimitive: (instanceId, axis) => {
        set((prev) => ({
          placedPrimitives: prev.placedPrimitives.map((p) =>
            p.id === instanceId
              ? { ...p, [`flip${axis.toUpperCase()}`]: !p[`flip${axis.toUpperCase()}` as "flipX" | "flipY"] }
              : p
          ),
        }));
        get().saveToHistory();
      },
      
      // Drag and drop actions
      startDrag: (primitive, startX, startY, instanceId) => {
        set({
          dragState: {
            isDragging: true,
            draggedPrimitive: primitive,
            draggedInstanceId: instanceId || null,
            startX,
            startY,
            currentX: startX,
            currentY: startY,
            snapPoints: [],
          },
          activeTool: primitive ? "place" : "select",
        });
      },
      
      updateDrag: (currentX, currentY) => {
        const state = get();
        set({
          dragState: {
            ...state.dragState,
            currentX,
            currentY,
            snapPoints: [], // TODO: Implement snap point calculation
          },
        });
        
        // If moving existing primitive, update its position
        if (state.dragState.draggedInstanceId) {
          get().movePrimitive(state.dragState.draggedInstanceId, currentX, currentY);
        }
      },
      
      endDrag: () => {
        const state = get();
        
        // If placing new primitive, add it to canvas
        if (state.dragState.draggedPrimitive && !state.dragState.draggedInstanceId) {
          get().addPrimitive(
            state.dragState.draggedPrimitive,
            state.dragState.currentX,
            state.dragState.currentY
          );
        }
        
        set({
          dragState: {
            isDragging: false,
            draggedPrimitive: null,
            draggedInstanceId: null,
            startX: 0,
            startY: 0,
            currentX: 0,
            currentY: 0,
            snapPoints: [],
          },
          activeTool: "select",
        });
      },
      
      // Pattern actions
      loadPattern: (pattern) => {
        set({
          placedPrimitives: pattern.primitives.map((p) => ({
            ...p,
            id: `${p.primitiveId}-${Date.now()}-${Math.random()}`,
          })),
          selectedId: null,
        });
        get().saveToHistory();
      },
      
      clearCanvas: () => {
        set({
          placedPrimitives: [],
          selectedId: null,
        });
        get().saveToHistory();
      },
      
      // Viewport actions
      setZoom: (zoom) => set({ zoom: Math.max(0.1, Math.min(5, zoom)) }),
      setPan: (x, y) => set({ panX: x, panY: y }),
      setCanvasSize: (width, height) => set({ canvasWidth: width, canvasHeight: height }),
      toggleGrid: () => set((prev) => ({ showGrid: !prev.showGrid })),
      setGridSize: (size) => set({ gridSize: Math.max(1, Math.min(20, size)) }),
      toggleSnapToGrid: () => set((prev) => ({ snapToGrid: !prev.snapToGrid })),
      
      // History actions
      undo: () => {
        const state = get();
        if (state.historyIndex > 0) {
          const newIndex = state.historyIndex - 1;
          set({
            placedPrimitives: state.history[newIndex],
            historyIndex: newIndex,
          });
        }
      },
      
      redo: () => {
        const state = get();
        if (state.historyIndex < state.history.length - 1) {
          const newIndex = state.historyIndex + 1;
          set({
            placedPrimitives: state.history[newIndex],
            historyIndex: newIndex,
          });
        }
      },
      
      saveToHistory: () => {
        const state = get();
        const newHistory = state.history.slice(0, state.historyIndex + 1);
        newHistory.push([...state.placedPrimitives]);
        
        // Limit history to 50 states
        if (newHistory.length > 50) {
          newHistory.shift();
        } else {
          set({
            history: newHistory,
            historyIndex: newHistory.length - 1,
          });
        }
      },
      
      // Utility actions
      exportDesign: () => {
        const state = get();
        return JSON.stringify({
          placedPrimitives: state.placedPrimitives,
          canvasWidth: state.canvasWidth,
          canvasHeight: state.canvasHeight,
          gridSize: state.gridSize,
          version: "1.0",
        }, null, 2);
      },
      
      importDesign: (json) => {
        try {
          const data = JSON.parse(json);
          if (data.placedPrimitives && Array.isArray(data.placedPrimitives)) {
            set({
              placedPrimitives: data.placedPrimitives,
              selectedId: null,
              canvasWidth: data.canvasWidth || 800,
              canvasHeight: data.canvasHeight || 600,
              gridSize: data.gridSize || 5,
            });
            get().saveToHistory();
          }
        } catch (error) {
          console.error("Failed to import design:", error);
        }
      },
    }),
    {
      name: "design-store",
    }
  )
);

// Selector hooks for common combinations
export const useSelectedPrimitive = () => {
  const selectedId = useDesignStore((state) => state.selectedId);
  const placedPrimitives = useDesignStore((state) => state.placedPrimitives);
  return selectedId ? placedPrimitives.find((p) => p.id === selectedId) : null;
};

export const useCanvasTransform = () => {
  return useDesignStore((state) => ({
    zoom: state.zoom,
    panX: state.panX,
    panY: state.panY,
  }));
};

export const useCanUndo = () => {
  return useDesignStore((state) => state.historyIndex > 0);
};

export const useCanRedo = () => {
  return useDesignStore((state) => state.historyIndex < state.history.length - 1);
};
