"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, Sparkles } from "lucide-react";
import {
  getAssemblyForProduct,
  getModuleById,
  type Module,
} from "@/data/modules";
import { formatPrice } from "@/data/products";

interface ModuleConfiguratorProps {
  productId: string;
  basePrice: number;
}

export default function ModuleConfigurator({
  productId,
  basePrice,
}: ModuleConfiguratorProps) {
  const assembly = getAssemblyForProduct(productId);

  // Build initial selection from defaults
  const [selections, setSelections] = useState<Record<string, string>>(() => {
    if (!assembly) return {};
    return { ...assembly.defaultConfiguration };
  });

  if (!assembly || assembly.configurableSlots.length === 0) return null;

  const configurableSlotDefs = assembly.slots.filter((s) =>
    assembly.configurableSlots.includes(s.slotId)
  );

  // Calculate price delta from default config
  const defaultModules = Object.values(assembly.defaultConfiguration)
    .map((id) => getModuleById(id))
    .filter(Boolean) as Module[];
  const selectedModules = Object.values(selections)
    .map((id) => getModuleById(id))
    .filter(Boolean) as Module[];

  // Price adjustment based on spare price difference (configurable modules only)
  let priceDelta = 0;
  for (const slotId of assembly.configurableSlots) {
    const defaultId = assembly.defaultConfiguration[slotId];
    const selectedId = selections[slotId];
    if (defaultId !== selectedId) {
      const defaultMod = getModuleById(defaultId);
      const selectedMod = getModuleById(selectedId);
      if (defaultMod?.sparePrice && selectedMod?.sparePrice) {
        priceDelta += selectedMod.sparePrice - defaultMod.sparePrice;
      }
    }
  }

  const totalPrice = basePrice + priceDelta;

  return (
    <div className="rounded-2xl border border-forge-amber/20 bg-forge-amber/[0.03] p-6 sm:p-8">
      <div className="mb-5 flex items-center gap-3">
        <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-forge-amber/10">
          <Sparkles className="h-4 w-4 text-forge-amber" />
        </div>
        <div>
          <h3 className="font-display text-lg tracking-tight">Konfigurator</h3>
          <p className="text-xs text-muted-foreground">
            Izaberite module koji odgovaraju vašem stilu
          </p>
        </div>
      </div>

      {configurableSlotDefs.map((slot) => {
        const options = slot.accepts
          .map((id) => getModuleById(id))
          .filter(Boolean) as Module[];

        return (
          <div key={slot.slotId} className="mb-5">
            <p className="mb-2.5 text-sm font-semibold tracking-tight">
              {slot.slotName}
              {!slot.required && (
                <span className="ml-2 text-xs font-normal text-muted-foreground">
                  (opciono)
                </span>
              )}
            </p>
            <div className="grid gap-2 sm:grid-cols-3">
              {options.map((mod) => {
                const isSelected = selections[slot.slotId] === mod.id;
                const isDefault =
                  assembly.defaultConfiguration[slot.slotId] === mod.id;

                return (
                  <button
                    key={mod.id}
                    onClick={() =>
                      setSelections((prev) => ({
                        ...prev,
                        [slot.slotId]: mod.id,
                      }))
                    }
                    className={`relative rounded-xl border-2 p-4 text-left transition-all duration-200 ${
                      isSelected
                        ? "border-forge-amber bg-white shadow-warm"
                        : "border-border/50 bg-white hover:border-forge-amber/30"
                    }`}
                  >
                    {/* Selected checkmark */}
                    <AnimatePresence>
                      {isSelected && (
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          exit={{ scale: 0 }}
                          className="absolute -right-1.5 -top-1.5 flex h-6 w-6 items-center justify-center rounded-full bg-forge-amber text-white"
                        >
                          <Check className="h-3.5 w-3.5" />
                        </motion.div>
                      )}
                    </AnimatePresence>

                    <p className="text-sm font-semibold tracking-tight">
                      {mod.name.replace("Naslon panel — ", "").replace("Drvena ploča ", "")}
                    </p>
                    <p className="mt-1 text-xs leading-relaxed text-muted-foreground line-clamp-2">
                      {mod.description}
                    </p>

                    <div className="mt-2 flex items-center gap-2">
                      {isDefault && (
                        <span className="rounded-md bg-workshop-gray px-1.5 py-0.5 text-[10px] font-medium text-muted-foreground">
                          Podrazumevano
                        </span>
                      )}
                      {mod.sparePrice && (
                        <span className="font-mono text-[11px] font-medium text-forge-amber">
                          {formatPrice(mod.sparePrice)}
                        </span>
                      )}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        );
      })}

      {/* Price summary */}
      {priceDelta !== 0 && (
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-4 rounded-xl border border-forge-amber/20 bg-white p-4"
        >
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">
              Cena sa izabranom konfiguracijom
            </span>
            <span className="font-mono text-lg font-bold tracking-tight">
              {formatPrice(totalPrice)}
            </span>
          </div>
          <p className="mt-1 text-xs text-muted-foreground">
            {priceDelta > 0 ? "+" : ""}
            {formatPrice(priceDelta)} u odnosu na podrazumevanu konfiguraciju
          </p>
        </motion.div>
      )}
    </div>
  );
}
