"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Wrench, Clock, ChevronDown, ChevronUp } from "lucide-react";
import {
  getAssemblyForProduct,
  getModuleById,
  connectionSystem,
  type AssemblyStep,
} from "@/data/modules";

interface ModuleExplodedViewProps {
  productId: string;
}

const materialColors: Record<string, string> = {
  steel: "bg-iron-black/10 text-iron-black border-iron-black/20",
  wood: "bg-forge-amber/10 text-forge-amber border-forge-amber/30",
  hardware: "bg-forge-amber/10 text-forge-amber border-forge-amber/30",
  upholstery: "bg-copper/10 text-copper border-copper/30",
};

const materialLabels: Record<string, string> = {
  steel: "Čelik",
  wood: "Drvo",
  hardware: "Pribor",
  upholstery: "Tapacirung",
};

export default function ModuleExplodedView({ productId }: ModuleExplodedViewProps) {
  const assembly = getAssemblyForProduct(productId);
  const [expandedStep, setExpandedStep] = useState<number | null>(null);
  const [showAll, setShowAll] = useState(false);

  if (!assembly) return null;

  const totalTime = assembly.assemblySteps.reduce((sum, s) => sum + s.timeMinutes, 0);

  return (
    <div className="rounded-xl border border-border/60 bg-workshop-gray p-6 sm:p-8">
      {/* Header */}
      <div className="mb-6 flex items-start justify-between">
        <div>
          <p className="mb-1 text-xs font-semibold uppercase tracking-[0.15em] text-forge-amber">
            Modularna konstrukcija
          </p>
          <h3 className="font-display text-xl tracking-tight sm:text-2xl">
            Kako se sklapa
          </h3>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1.5 rounded-xl border border-border/50 bg-card px-3 py-1.5 text-sm">
            <Clock className="h-3.5 w-3.5 text-forge-amber" />
            <span className="font-mono text-xs font-medium">{totalTime} min</span>
          </div>
          <div className="flex items-center gap-1.5 rounded-xl border border-border/50 bg-card px-3 py-1.5 text-sm">
            <Wrench className="h-3.5 w-3.5 text-forge-amber" />
            <span className="font-mono text-xs font-medium">{assembly.slots.length} modula</span>
          </div>
        </div>
      </div>

      {/* Module list */}
      <div className="mb-6 grid gap-2 sm:grid-cols-2">
        {assembly.slots.map((slot, i) => {
          const defaultModuleId = assembly.defaultConfiguration[slot.slotId];
          const mod = defaultModuleId ? getModuleById(defaultModuleId) : null;
          if (!mod) return null;

          const matClass = materialColors[mod.material] || materialColors.steel;
          const isConfigurable = assembly.configurableSlots.includes(slot.slotId);

          return (
            <motion.div
              key={slot.slotId}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08, duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="group relative overflow-hidden rounded-xl border border-border/50 bg-card p-4 transition-all duration-200 hover:border-forge-amber/30 hover:shadow-warm"
            >
              {/* Module number badge */}
              <div className="absolute -right-1 -top-1 flex h-7 w-7 items-center justify-center rounded-bl-sm bg-forge-amber/10 font-mono text-[10px] font-bold text-forge-amber">
                {i + 1}
              </div>

              <div className="mb-2 flex items-center gap-2">
                <span className={`inline-flex rounded-sm border px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider ${matClass}`}>
                  {materialLabels[mod.material]}
                </span>
                {isConfigurable && (
                  <span className="inline-flex rounded-sm border border-forge-amber/30 bg-forge-amber/10 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-forge-amber">
                    Birljiv
                  </span>
                )}
                {mod.material === "wood" && (
                  <span className="inline-flex rounded-sm border border-green-600/20 bg-green-600/10 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-green-700">
                    Zamenljivo
                  </span>
                )}
              </div>

              <h4 className="text-sm font-semibold tracking-tight">{mod.name}</h4>
              <p className="mt-1 text-xs leading-relaxed text-muted-foreground line-clamp-2">
                {mod.description}
              </p>

              {/* Weight + dimensions */}
              <div className="mt-2 flex items-center gap-3 text-[10px] text-muted-foreground">
                <span className="font-mono">{mod.weight}kg</span>
                {mod.dimensions && (
                  <span className="font-mono">
                    {mod.dimensions.w}×{mod.dimensions.d}×{mod.dimensions.h}cm
                  </span>
                )}
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Assembly steps */}
      <div>
        <button
          onClick={() => setShowAll(!showAll)}
          className="mb-4 flex w-full items-center justify-between rounded-xl border border-border/50 bg-card px-4 py-3 text-left transition-colors hover:border-forge-amber/30"
        >
          <span className="text-sm font-semibold tracking-tight">
            Koraci montaže ({assembly.assemblySteps.length} koraka)
          </span>
          {showAll ? (
            <ChevronUp className="h-4 w-4 text-muted-foreground" />
          ) : (
            <ChevronDown className="h-4 w-4 text-muted-foreground" />
          )}
        </button>

        <AnimatePresence>
          {showAll && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="overflow-hidden"
            >
              <div className="space-y-3">
                {assembly.assemblySteps.map((step, i) => (
                  <StepCard
                    key={step.order}
                    step={step}
                    index={i}
                    isExpanded={expandedStep === i}
                    onToggle={() => setExpandedStep(expandedStep === i ? null : i)}
                  />
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Connection system note */}
      <div className="mt-6 rounded-xl border border-dashed border-forge-amber/30 bg-forge-amber/5 p-4">
        <p className="text-xs font-semibold uppercase tracking-[0.1em] text-forge-amber">
          Sistem spojeva
        </p>
        <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
          {connectionSystem.standard}. {connectionSystem.positioning}. {connectionSystem.hidden}
        </p>
        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
          {assembly.packingNote}
        </p>
      </div>
    </div>
  );
}

function StepCard({
  step,
  index,
  isExpanded,
  onToggle,
}: {
  step: AssemblyStep;
  index: number;
  isExpanded: boolean;
  onToggle: () => void;
}) {
  const involvedModules = step.moduleIds
    .map((id) => getModuleById(id))
    .filter(Boolean);

  return (
    <motion.div
      initial={{ opacity: 0, x: -12 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.1, duration: 0.3 }}
      className="rounded-xl border border-border/50 bg-card transition-all duration-200 hover:border-forge-amber/20"
    >
      <button
        onClick={onToggle}
        className="flex w-full items-center gap-4 p-4 text-left"
      >
        <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg bg-forge-amber/10 font-mono text-sm font-bold text-forge-amber">
          {step.order}
        </div>
        <div className="flex-1">
          <p className="text-sm font-medium">{step.action}</p>
          <p className="mt-0.5 font-mono text-[10px] text-muted-foreground">
            ~{step.timeMinutes} min
          </p>
        </div>
        {isExpanded ? (
          <ChevronUp className="h-4 w-4 text-muted-foreground" />
        ) : (
          <ChevronDown className="h-4 w-4 text-muted-foreground" />
        )}
      </button>

      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <div className="border-t border-border/30 px-4 pb-4 pt-3">
              <p className="mb-2 text-xs text-muted-foreground">
                <span className="font-semibold text-foreground">Spojevi:</span>{" "}
                {step.connectionUsed}
              </p>
              <div className="flex flex-wrap gap-1.5">
                {involvedModules.map((mod) =>
                  mod ? (
                    <span
                      key={mod.id}
                      className={`inline-flex rounded-sm border px-2 py-0.5 text-[10px] font-medium ${
                        materialColors[mod.material]
                      }`}
                    >
                      {mod.name}
                    </span>
                  ) : null
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
