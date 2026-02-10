"use client";

import Link from "next/link";
import { Minus, Plus, Trash2, ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useCartStore } from "@/store/cart";
import { formatPrice } from "@/data/products";

interface CartDrawerProps {
  onClose: () => void;
}

export default function CartDrawer({ onClose }: CartDrawerProps) {
  const { items, updateQuantity, removeItem, getTotal } = useCartStore();

  if (items.length === 0) {
    return (
      <div className="flex h-full flex-col items-center justify-center gap-4 p-6">
        <ShoppingBag className="h-16 w-16 text-muted-foreground/40" />
        <h3 className="text-lg font-semibold">Korpa je prazna</h3>
        <p className="text-center text-sm text-muted-foreground">
          Dodajte proizvode iz naše LINEA kolekcije
        </p>
        <Button asChild onClick={onClose}>
          <Link href="/proizvodi">Pregledajte proizvode</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="flex h-full flex-col">
      <div className="px-1 pb-4 pt-2">
        <h2 className="text-lg font-semibold">Vaša korpa</h2>
        <p className="text-sm text-muted-foreground">
          {items.reduce((c, i) => c + i.quantity, 0)} proizvod(a)
        </p>
      </div>
      <Separator />

      <div className="flex-1 overflow-y-auto py-4">
        {items.map((item) => (
          <div key={item.product.id} className="mb-4 flex gap-3 px-1">
            <div className="h-20 w-20 flex-shrink-0 rounded-md bg-secondary" />
            <div className="flex flex-1 flex-col">
              <h4 className="text-sm font-medium leading-tight">{item.product.name}</h4>
              <p className="mt-0.5 text-xs text-muted-foreground">
                {item.product.shortDescription}
              </p>
              <div className="mt-auto flex items-center justify-between pt-2">
                <div className="flex items-center gap-1">
                  <Button
                    variant="outline"
                    size="icon"
                    className="h-7 w-7"
                    onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                  >
                    <Minus className="h-3 w-3" />
                  </Button>
                  <span className="w-8 text-center text-sm">{item.quantity}</span>
                  <Button
                    variant="outline"
                    size="icon"
                    className="h-7 w-7"
                    onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                  >
                    <Plus className="h-3 w-3" />
                  </Button>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-semibold">
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

      <Separator />
      <div className="space-y-3 px-1 py-4">
        <div className="flex items-center justify-between">
          <span className="text-sm text-muted-foreground">Ukupno</span>
          <span className="text-lg font-bold">{formatPrice(getTotal())}</span>
        </div>
        <p className="text-xs text-muted-foreground">
          Dostava se obračunava pri naručivanju
        </p>
        <Button asChild className="w-full bg-amber-700 hover:bg-amber-800" onClick={onClose}>
          <Link href="/korpa">Pregledajte korpu</Link>
        </Button>
      </div>
    </div>
  );
}
