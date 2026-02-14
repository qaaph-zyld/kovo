"use client";

import { motion } from "framer-motion";
import { RefreshCw } from "lucide-react";
import { getReplaceableModulesForProduct, type Module } from "@/data/modules";
import { formatPrice } from "@/data/products";

interface ReplacementPartsProps {
  productId: string;
}

export default function ReplacementParts({ productId }: ReplacementPartsProps) {
  const replaceable = getReplaceableModulesForProduct(productId);

  if (replaceable.length === 0) return null;

  return (
    <div className="rounded-xl border border-border/60 bg-workshop-gray p-6 sm:p-8">
      <div className="mb-5 flex items-center gap-3">
        <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-green-600/10">
          <RefreshCw className="h-4 w-4 text-green-600" />
        </div>
        <div>
          <h3 className="font-display text-lg tracking-tight">Zamenski delovi</h3>
          <p className="text-xs text-muted-foreground">
            Osvežite proizvod bez kupovine novog — zamenite samo istrošeni modul.
          </p>
        </div>
      </div>

      <div className="space-y-2">
        {replaceable.map((mod, i) => (
          <PartRow key={mod.id} mod={mod} index={i} />
        ))}
      </div>

      <p className="mt-4 text-xs leading-relaxed text-muted-foreground">
        Za poručivanje zamenskih delova kontaktirajte nas direktno. Svaki deo se šalje
        sa priborom za montažu.
      </p>
    </div>
  );
}

function PartRow({ mod, index }: { mod: Module; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.06, duration: 0.3 }}
      className="flex items-center justify-between rounded-xl border border-border/50 bg-card px-4 py-3 transition-colors hover:border-forge-amber/20"
    >
      <div className="min-w-0 flex-1">
        <p className="text-sm font-medium">{mod.name}</p>
        <p className="mt-0.5 text-xs text-muted-foreground line-clamp-1">
          {mod.material === "wood" ? "Masivno drvo — menja se posle 5+ sezona" : mod.description}
        </p>
      </div>
      {mod.sparePrice && (
        <span className="ml-3 flex-shrink-0 font-mono text-sm font-semibold text-forge-amber">
          {formatPrice(mod.sparePrice)}
        </span>
      )}
    </motion.div>
  );
}
