"use client";

import Link from "next/link";
import {
  Minus,
  Plus,
  Trash2,
  ShoppingBag,
  ArrowRight,
  ArrowLeft,
  Truck,
  MapPin,
  CreditCard,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useCartStore } from "@/store/cart";
import { formatPrice } from "@/data/products";
import { useState } from "react";

type DeliveryMethod = "pickup" | "courier" | "pallet";

const deliveryOptions: {
  value: DeliveryMethod;
  label: string;
  description: string;
  price: number;
}[] = [
  {
    value: "pickup",
    label: "Lično preuzimanje",
    description: "Loznica — popust 5%",
    price: 0,
  },
  {
    value: "courier",
    label: "Kurirska dostava",
    description: "Za manje pakete, 2–5 radnih dana",
    price: 1200,
  },
  {
    value: "pallet",
    label: "Paletna dostava",
    description: "Za setove i veće porudžbine, 3–7 radnih dana",
    price: 3500,
  },
];

export default function KorpaPage() {
  const { items, updateQuantity, removeItem, getTotal, clearCart } =
    useCartStore();
  const [delivery, setDelivery] = useState<DeliveryMethod>("courier");
  const [step, setStep] = useState<"cart" | "checkout" | "success">("cart");
  const [form, setForm] = useState({
    ime: "",
    prezime: "",
    email: "",
    telefon: "",
    adresa: "",
    grad: "",
    postanskiBroj: "",
    napomena: "",
    placanje: "pouzecem" as "pouzecem" | "kartica",
  });

  const subtotal = getTotal();
  const selectedDelivery = deliveryOptions.find((d) => d.value === delivery)!;
  const pickupDiscount = delivery === "pickup" ? Math.round(subtotal * 0.05) : 0;
  const total = subtotal - pickupDiscount + selectedDelivery.price;

  if (items.length === 0 && step !== "success") {
    return (
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-center px-4 py-24 sm:px-6 lg:px-8">
        <ShoppingBag className="h-20 w-20 text-muted-foreground/30" />
        <h1 className="mt-6 text-2xl font-bold">Korpa je prazna</h1>
        <p className="mt-2 text-muted-foreground">
          Dodajte proizvode iz LINEA kolekcije
        </p>
        <Button asChild className="mt-6 bg-amber-700 hover:bg-amber-800">
          <Link href="/proizvodi">Pregledajte proizvode</Link>
        </Button>
      </div>
    );
  }

  if (step === "success") {
    return (
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-center px-4 py-24 text-center sm:px-6 lg:px-8">
        <div className="flex h-20 w-20 items-center justify-center rounded-full bg-green-100 text-green-600">
          <ShoppingBag className="h-10 w-10" />
        </div>
        <h1 className="mt-6 text-2xl font-bold">Porudžbina primljena!</h1>
        <p className="mt-2 max-w-md text-muted-foreground">
          Hvala vam na porudžbini. Kontaktiraćemo vas u roku od 24h sa
          potvrdom i detaljima isporuke.
        </p>
        <Button asChild className="mt-6">
          <Link href="/">Nazad na početnu</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <h1 className="mb-8 text-3xl font-bold tracking-tight">
        {step === "cart" ? "Vaša korpa" : "Završite porudžbinu"}
      </h1>

      <div className="grid gap-8 lg:grid-cols-3">
        {/* Main content */}
        <div className="lg:col-span-2">
          {step === "cart" && (
            <div className="space-y-4">
              {items.map((item) => (
                <Card key={item.product.id} className="border-border/60">
                  <CardContent className="flex gap-4 p-4">
                    <div className="h-24 w-24 flex-shrink-0 rounded-md bg-secondary" />
                    <div className="flex flex-1 flex-col">
                      <div className="flex items-start justify-between">
                        <div>
                          <Link
                            href={`/proizvodi/${item.product.slug}`}
                            className="font-semibold hover:text-amber-700"
                          >
                            {item.product.name}
                          </Link>
                          <p className="mt-0.5 text-sm text-muted-foreground">
                            {item.product.shortDescription}
                          </p>
                        </div>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 text-muted-foreground hover:text-destructive"
                          onClick={() => removeItem(item.product.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                      <div className="mt-auto flex items-center justify-between pt-3">
                        <div className="flex items-center gap-1">
                          <Button
                            variant="outline"
                            size="icon"
                            className="h-8 w-8"
                            onClick={() =>
                              updateQuantity(
                                item.product.id,
                                item.quantity - 1
                              )
                            }
                          >
                            <Minus className="h-3 w-3" />
                          </Button>
                          <span className="w-10 text-center text-sm font-medium">
                            {item.quantity}
                          </span>
                          <Button
                            variant="outline"
                            size="icon"
                            className="h-8 w-8"
                            onClick={() =>
                              updateQuantity(
                                item.product.id,
                                item.quantity + 1
                              )
                            }
                          >
                            <Plus className="h-3 w-3" />
                          </Button>
                        </div>
                        <span className="text-lg font-bold">
                          {formatPrice(item.product.price * item.quantity)}
                        </span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}

          {step === "checkout" && (
            <div className="space-y-6">
              {/* Contact info */}
              <Card className="border-border/60">
                <CardContent className="p-6">
                  <h3 className="mb-4 flex items-center gap-2 font-semibold">
                    <MapPin className="h-4 w-4 text-amber-700" />
                    Podaci za dostavu
                  </h3>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <label className="mb-1 block text-sm font-medium">
                        Ime *
                      </label>
                      <Input
                        value={form.ime}
                        onChange={(e) =>
                          setForm({ ...form, ime: e.target.value })
                        }
                        placeholder="Vaše ime"
                      />
                    </div>
                    <div>
                      <label className="mb-1 block text-sm font-medium">
                        Prezime *
                      </label>
                      <Input
                        value={form.prezime}
                        onChange={(e) =>
                          setForm({ ...form, prezime: e.target.value })
                        }
                        placeholder="Vaše prezime"
                      />
                    </div>
                    <div>
                      <label className="mb-1 block text-sm font-medium">
                        Email *
                      </label>
                      <Input
                        type="email"
                        value={form.email}
                        onChange={(e) =>
                          setForm({ ...form, email: e.target.value })
                        }
                        placeholder="email@primer.com"
                      />
                    </div>
                    <div>
                      <label className="mb-1 block text-sm font-medium">
                        Telefon *
                      </label>
                      <Input
                        type="tel"
                        value={form.telefon}
                        onChange={(e) =>
                          setForm({ ...form, telefon: e.target.value })
                        }
                        placeholder="+381 60 ..."
                      />
                    </div>
                    <div className="sm:col-span-2">
                      <label className="mb-1 block text-sm font-medium">
                        Adresa *
                      </label>
                      <Input
                        value={form.adresa}
                        onChange={(e) =>
                          setForm({ ...form, adresa: e.target.value })
                        }
                        placeholder="Ulica i broj"
                      />
                    </div>
                    <div>
                      <label className="mb-1 block text-sm font-medium">
                        Grad *
                      </label>
                      <Input
                        value={form.grad}
                        onChange={(e) =>
                          setForm({ ...form, grad: e.target.value })
                        }
                        placeholder="Grad"
                      />
                    </div>
                    <div>
                      <label className="mb-1 block text-sm font-medium">
                        Poštanski broj *
                      </label>
                      <Input
                        value={form.postanskiBroj}
                        onChange={(e) =>
                          setForm({ ...form, postanskiBroj: e.target.value })
                        }
                        placeholder="15000"
                      />
                    </div>
                    <div className="sm:col-span-2">
                      <label className="mb-1 block text-sm font-medium">
                        Napomena (opciono)
                      </label>
                      <Textarea
                        value={form.napomena}
                        onChange={(e) =>
                          setForm({ ...form, napomena: e.target.value })
                        }
                        placeholder="Dodatne napomene uz porudžbinu..."
                        rows={3}
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Delivery method */}
              <Card className="border-border/60">
                <CardContent className="p-6">
                  <h3 className="mb-4 flex items-center gap-2 font-semibold">
                    <Truck className="h-4 w-4 text-amber-700" />
                    Način dostave
                  </h3>
                  <div className="space-y-3">
                    {deliveryOptions.map((opt) => (
                      <label
                        key={opt.value}
                        className={`flex cursor-pointer items-center justify-between rounded-lg border p-4 transition-colors ${
                          delivery === opt.value
                            ? "border-amber-700 bg-amber-50"
                            : "border-border hover:bg-secondary/50"
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <input
                            type="radio"
                            name="delivery"
                            value={opt.value}
                            checked={delivery === opt.value}
                            onChange={() => setDelivery(opt.value)}
                            className="accent-amber-700"
                          />
                          <div>
                            <p className="text-sm font-medium">{opt.label}</p>
                            <p className="text-xs text-muted-foreground">
                              {opt.description}
                            </p>
                          </div>
                        </div>
                        <span className="text-sm font-semibold">
                          {opt.price === 0
                            ? "Besplatno"
                            : formatPrice(opt.price)}
                        </span>
                      </label>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Payment method */}
              <Card className="border-border/60">
                <CardContent className="p-6">
                  <h3 className="mb-4 flex items-center gap-2 font-semibold">
                    <CreditCard className="h-4 w-4 text-amber-700" />
                    Način plaćanja
                  </h3>
                  <div className="space-y-3">
                    <label
                      className={`flex cursor-pointer items-center gap-3 rounded-lg border p-4 transition-colors ${
                        form.placanje === "pouzecem"
                          ? "border-amber-700 bg-amber-50"
                          : "border-border hover:bg-secondary/50"
                      }`}
                    >
                      <input
                        type="radio"
                        name="payment"
                        value="pouzecem"
                        checked={form.placanje === "pouzecem"}
                        onChange={() =>
                          setForm({ ...form, placanje: "pouzecem" })
                        }
                        className="accent-amber-700"
                      />
                      <div>
                        <p className="text-sm font-medium">Pouzećem</p>
                        <p className="text-xs text-muted-foreground">
                          Plaćanje prilikom preuzimanja
                        </p>
                      </div>
                    </label>
                    <label
                      className={`flex cursor-pointer items-center gap-3 rounded-lg border p-4 transition-colors ${
                        form.placanje === "kartica"
                          ? "border-amber-700 bg-amber-50"
                          : "border-border hover:bg-secondary/50"
                      }`}
                    >
                      <input
                        type="radio"
                        name="payment"
                        value="kartica"
                        checked={form.placanje === "kartica"}
                        onChange={() =>
                          setForm({ ...form, placanje: "kartica" })
                        }
                        className="accent-amber-700"
                      />
                      <div>
                        <p className="text-sm font-medium">Platnom karticom</p>
                        <p className="text-xs text-muted-foreground">
                          Visa, Mastercard — sigurno plaćanje putem Stripe-a
                        </p>
                      </div>
                    </label>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </div>

        {/* Order summary sidebar */}
        <div>
          <Card className="sticky top-24 border-border/60">
            <CardContent className="p-6">
              <h3 className="mb-4 font-semibold">Pregled porudžbine</h3>

              <div className="space-y-2">
                {items.map((item) => (
                  <div
                    key={item.product.id}
                    className="flex items-center justify-between text-sm"
                  >
                    <span className="text-muted-foreground">
                      {item.product.name} × {item.quantity}
                    </span>
                    <span>
                      {formatPrice(item.product.price * item.quantity)}
                    </span>
                  </div>
                ))}
              </div>

              <Separator className="my-4" />

              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Međuzbir</span>
                  <span>{formatPrice(subtotal)}</span>
                </div>
                {pickupDiscount > 0 && (
                  <div className="flex justify-between text-green-600">
                    <span>Popust (lično preuzimanje)</span>
                    <span>-{formatPrice(pickupDiscount)}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Dostava</span>
                  <span>
                    {selectedDelivery.price === 0
                      ? "Besplatno"
                      : formatPrice(selectedDelivery.price)}
                  </span>
                </div>
              </div>

              <Separator className="my-4" />

              <div className="flex items-center justify-between text-lg font-bold">
                <span>Ukupno</span>
                <span>{formatPrice(total)}</span>
              </div>

              {step === "cart" && (
                <Button
                  className="mt-6 w-full bg-amber-700 text-white hover:bg-amber-800"
                  size="lg"
                  onClick={() => setStep("checkout")}
                >
                  Nastavi na plaćanje
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              )}

              {step === "checkout" && (
                <div className="mt-6 space-y-2">
                  <Button
                    className="w-full bg-amber-700 text-white hover:bg-amber-800"
                    size="lg"
                    onClick={() => {
                      clearCart();
                      setStep("success");
                    }}
                  >
                    Potvrdite porudžbinu
                  </Button>
                  <Button
                    variant="ghost"
                    className="w-full"
                    onClick={() => setStep("cart")}
                  >
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Nazad na korpu
                  </Button>
                </div>
              )}

              <p className="mt-4 text-center text-xs text-muted-foreground">
                Sigurna kupovina. Kontaktiraćemo vas za potvrdu.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
