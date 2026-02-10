"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Send,
  CheckCircle2,
  Building2,
  User,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { Suspense } from "react";

function ContactForm() {
  const searchParams = useSearchParams();
  const isB2B = searchParams.get("tip") === "b2b";
  const [formType, setFormType] = useState<"b2c" | "b2b">(
    isB2B ? "b2b" : "b2c"
  );
  const [submitted, setSubmitted] = useState(false);

  if (submitted) {
    return (
      <div className="flex flex-col items-center justify-center rounded-xl border border-green-200 bg-green-50 p-12 text-center">
        <CheckCircle2 className="h-16 w-16 text-green-600" />
        <h3 className="mt-4 text-xl font-bold">Poruka poslata!</h3>
        <p className="mt-2 text-muted-foreground">
          Odgovorićemo vam u roku od 24 sata. Hvala na interesovanju!
        </p>
      </div>
    );
  }

  return (
    <div>
      {/* Type selector */}
      <div className="mb-6 flex gap-2">
        <Button
          variant={formType === "b2c" ? "default" : "outline"}
          onClick={() => setFormType("b2c")}
          className={
            formType === "b2c" ? "bg-zinc-900 hover:bg-zinc-800" : ""
          }
        >
          <User className="mr-2 h-4 w-4" />
          Opšti upit
        </Button>
        <Button
          variant={formType === "b2b" ? "default" : "outline"}
          onClick={() => setFormType("b2b")}
          className={
            formType === "b2b" ? "bg-amber-700 hover:bg-amber-800" : ""
          }
        >
          <Building2 className="mr-2 h-4 w-4" />
          B2B ponuda
        </Button>
      </div>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          setSubmitted(true);
        }}
        className="space-y-4"
      >
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className="mb-1 block text-sm font-medium">Ime *</label>
            <Input placeholder="Vaše ime" required />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium">
              Prezime *
            </label>
            <Input placeholder="Vaše prezime" required />
          </div>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className="mb-1 block text-sm font-medium">Email *</label>
            <Input type="email" placeholder="email@primer.com" required />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium">Telefon</label>
            <Input type="tel" placeholder="+381 60 ..." />
          </div>
        </div>

        {formType === "b2b" && (
          <>
            <div>
              <label className="mb-1 block text-sm font-medium">
                Naziv objekta / firme *
              </label>
              <Input placeholder="Naziv kafića, restorana, hotela..." required />
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className="mb-1 block text-sm font-medium">
                  Broj komada (okvirno) *
                </label>
                <Input
                  type="number"
                  placeholder="npr. 20"
                  min={1}
                  required
                />
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium">
                  Tip proizvoda
                </label>
                <Input placeholder="Stolice, stolovi, setovi..." />
              </div>
            </div>
          </>
        )}

        <div>
          <label className="mb-1 block text-sm font-medium">Poruka *</label>
          <Textarea
            placeholder={
              formType === "b2b"
                ? "Opišite vaše potrebe — broj mesta, tip prostora, željeni rok isporuke..."
                : "Vaše pitanje ili poruka..."
            }
            rows={5}
            required
          />
        </div>

        <Button
          type="submit"
          size="lg"
          className="w-full bg-amber-700 text-white hover:bg-amber-800"
        >
          <Send className="mr-2 h-4 w-4" />
          {formType === "b2b" ? "Zatražite ponudu" : "Pošaljite poruku"}
        </Button>
      </form>
    </div>
  );
}

export default function KontaktPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="mb-10">
        <h1 className="text-3xl font-bold tracking-tight">Kontakt</h1>
        <p className="mt-2 text-muted-foreground">
          Javite nam se za pitanja, ponude ili saradnju.
        </p>
      </div>

      <div className="grid gap-10 lg:grid-cols-3">
        {/* Contact info */}
        <div className="space-y-6">
          <Card className="border-border/60">
            <CardContent className="p-6">
              <h3 className="mb-4 font-semibold">Podaci za kontakt</h3>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <MapPin className="mt-0.5 h-5 w-5 flex-shrink-0 text-amber-700" />
                  <div>
                    <p className="text-sm font-medium">Adresa</p>
                    <p className="text-sm text-muted-foreground">
                      Loznica, Srbija
                    </p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <Phone className="mt-0.5 h-5 w-5 flex-shrink-0 text-amber-700" />
                  <div>
                    <p className="text-sm font-medium">Telefon</p>
                    <a
                      href="tel:+381600000000"
                      className="text-sm text-muted-foreground hover:text-foreground"
                    >
                      +381 60 000 0000
                    </a>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <Mail className="mt-0.5 h-5 w-5 flex-shrink-0 text-amber-700" />
                  <div>
                    <p className="text-sm font-medium">Email</p>
                    <a
                      href="mailto:info@kovo.rs"
                      className="text-sm text-muted-foreground hover:text-foreground"
                    >
                      info@kovo.rs
                    </a>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <Clock className="mt-0.5 h-5 w-5 flex-shrink-0 text-amber-700" />
                  <div>
                    <p className="text-sm font-medium">Radno vreme</p>
                    <p className="text-sm text-muted-foreground">
                      Pon–Pet: 08–16h
                      <br />
                      Sub: 08–13h
                    </p>
                  </div>
                </li>
              </ul>
            </CardContent>
          </Card>

          <Card className="border-amber-200 bg-amber-50">
            <CardContent className="p-6">
              <h3 className="font-semibold text-amber-900">
                Lično preuzimanje
              </h3>
              <p className="mt-2 text-sm text-amber-800">
                Dođite u našu radionicu u Loznici i uštedite 5% na celokupnu
                porudžbinu. Vidite nameštaj uživo pre kupovine!
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Form */}
        <div className="lg:col-span-2">
          <Suspense fallback={<div>Učitavanje...</div>}>
            <ContactForm />
          </Suspense>
        </div>
      </div>
    </div>
  );
}
