"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import {
  getModulesForProduct,
  getProductsUsingModule,
} from "@/data/modules";
import { getProductById } from "@/data/products";

interface SharedPartsStripProps {
  productId: string;
}

export default function SharedPartsStrip({ productId }: SharedPartsStripProps) {
  const productModules = getModulesForProduct(productId);

  // Find all other products that share at least one module
  const sharedProductIds = new Set<string>();
  const sharedModuleMap: Record<string, string[]> = {}; // productId → module names

  for (const mod of productModules) {
    const otherProducts = getProductsUsingModule(mod.id).filter(
      (pid) => pid !== productId
    );
    for (const pid of otherProducts) {
      sharedProductIds.add(pid);
      if (!sharedModuleMap[pid]) sharedModuleMap[pid] = [];
      sharedModuleMap[pid].push(mod.name);
    }
  }

  if (sharedProductIds.size === 0) return null;

  const sharedProducts = Array.from(sharedProductIds)
    .map((pid) => getProductById(pid))
    .filter(Boolean);

  return (
    <div className="rounded-xl border border-border/60 bg-workshop-gray p-6 sm:p-8">
      <p className="mb-1 text-xs font-semibold uppercase tracking-[0.15em] text-forge-amber">
        Deljeni moduli
      </p>
      <h3 className="mb-1 font-display text-lg tracking-tight sm:text-xl">
        Isti delovi, različiti proizvodi
      </h3>
      <p className="mb-5 text-sm text-muted-foreground">
        Ovi proizvodi koriste iste modularne komponente — ista kolekcija, isti jezik dizajna.
      </p>

      <div className="space-y-3">
        {sharedProducts.map((product, i) => {
          if (!product) return null;
          const sharedNames = sharedModuleMap[product.id] || [];

          return (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, x: -12 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{
                delay: i * 0.08,
                duration: 0.4,
                ease: [0.25, 0.46, 0.45, 0.94],
              }}
            >
              <Link
                href={`/proizvodi/${product.slug}`}
                className="group flex items-center justify-between rounded-xl border border-border/50 bg-card p-4 transition-all duration-200 hover:border-forge-amber/30 hover:shadow-warm"
              >
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-semibold tracking-tight group-hover:text-forge-amber">
                    {product.name}
                  </p>
                  <div className="mt-1.5 flex flex-wrap gap-1">
                    {sharedNames.map((name) => (
                      <span
                        key={name}
                        className="inline-flex rounded-md border border-forge-amber/20 bg-forge-amber/5 px-2 py-0.5 text-[10px] font-medium text-forge-amber"
                      >
                        {name}
                      </span>
                    ))}
                  </div>
                </div>
                <ArrowRight className="ml-3 h-4 w-4 flex-shrink-0 text-muted-foreground transition-transform duration-200 group-hover:translate-x-1 group-hover:text-forge-amber" />
              </Link>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
