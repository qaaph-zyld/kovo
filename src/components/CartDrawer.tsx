"use client";

import Link from "next/link";
import { Minus, Plus, Trash2, ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCartStore } from "@/store/cart";
import { formatPrice } from "@/data/products";

interface CartDrawerProps {
  onClose: () => void;
}

export default function CartDrawer({ onClose }: CartDrawerProps) {
  const { items, updateQuantity, removeItem, getTotal } = useCartStore();

  if (items.length === 0) {
    return (
      <div className="flex h-full flex-col items-center justify-center gap-5 p-6">
        <ShoppingBag className="h-16 w-16 text-muted-foreground/20" />
        <h3 className="font-display text-lg">Korpa je prazna</h3>
        <p className="text-center text-sm text-muted-foreground">
          Dodajte proizvode iz naše LINEA kolekcije
        </p>
        <Button asChild className="bg-forge-amber font-semibold text-white hover:bg-forge-amber-light" onClick={onClose}>
          <Link href="/proizvodi">Pregledajte proizvode</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="flex h-full flex-col">
      <div className="px-1 pb-5 pt-2">
        <h2 className="font-display text-lg">Vaša korpa</h2>
        <p className="mt-0.5 text-sm text-muted-foreground">
          {items.reduce((c, i) => c + i.quantity, 0)} proizvod(a)
        </p>
      </div>
      <div className="h-px bg-gradient-to-r from-transparent via-border to-transparent" />

      <div className="flex-1 overflow-y-auto py-5">
        {items.map((item) => (
          <div key={item.product.id} className="mb-5 flex gap-3 px-1">
            <div className="relative h-20 w-20 flex-shrink-0 overflow-hidden rounded-xl bg-workshop-gray">
              <div className="absolute inset-0 dot-grid opacity-30" />
            </div>
            <div className="flex flex-1 flex-col">
              <h4 className="font-display text-sm leading-tight">{item.product.name}</h4>
              <p className="mt-0.5 text-xs text-muted-foreground">
                {item.product.shortDescription}
              </p>
              <div className="mt-auto flex items-center justify-between pt-2">
                <div className="flex items-center gap-1">
                  <Button
                    variant="outline"
                    size="icon"
                    className="h-7 w-7 rounded-lg border-border/60"
                    onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                  >
                    <Minus className="h-3 w-3" />
                  </Button>
                  <span className="w-8 text-center font-mono text-sm">{item.quantity}</span>
                  <Button
                    variant="outline"
                    size="icon"
                    className="h-7 w-7 rounded-lg border-border/60"
                    onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                  >
                    <Plus className="h-3 w-3" />
                  </Button>
                </div>
                <div className="flex items-center gap-2">
                  <span className="font-mono text-sm font-semibold">
                    {formatPrice(item.product.price * item.quantity)}
                  </span>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-7 w-7 text-muted-foreground hover:text-destructive"
                    onClick={() => removeItem(item.product.id)}
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="h-px bg-gradient-to-r from-transparent via-border to-transparent" />
      <div className="space-y-3 px-1 py-5">
        <div className="flex items-center justify-between">
          <span className="text-sm text-muted-foreground">Ukupno</span>
          <span className="font-mono text-lg font-bold">{formatPrice(getTotal())}</span>
        </div>
        <p className="text-xs text-muted-foreground">
          Dostava se obračunava pri naručivanju
        </p>
        <Button asChild className="w-full bg-forge-amber font-semibold text-white transition-all duration-200 hover:bg-forge-amber-light active:scale-[0.98]" onClick={onClose}>
          <Link href="/korpa">Pregledajte korpu</Link>
        </Button>
      </div>
    </div>
  );
}
