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
import { Suspense } from "react";
import ScrollReveal from "@/components/ScrollReveal";

function ContactForm() {
  const searchParams = useSearchParams();
  const isB2B = searchParams.get("tip") === "b2b";
  const [formType, setFormType] = useState<"b2c" | "b2b">(
    isB2B ? "b2b" : "b2c"
  );
  const [submitted, setSubmitted] = useState(false);

  if (submitted) {
    return (
      <div className="flex flex-col items-center justify-center rounded-xl border border-green-600/20 bg-green-600/5 p-14 text-center">
        <CheckCircle2 className="h-16 w-16 text-green-600" />
        <h3 className="mt-5 font-display text-xl">Poruka poslata!</h3>
        <p className="mt-2 text-muted-foreground">
          Odgovorićemo vam u roku od 24 sata. Hvala na interesovanju!
        </p>
      </div>
    );
  }

  return (
    <div>
      {/* Type selector */}
      <div className="mb-7 flex gap-2">
        <Button
          variant={formType === "b2c" ? "default" : "outline"}
          onClick={() => setFormType("b2c")}
          className={
            formType === "b2c" ? "bg-iron-black hover:bg-forge-amber" : "border-border/60"
          }
        >
          <User className="mr-2 h-4 w-4" />
          Opšti upit
        </Button>
        <Button
          variant={formType === "b2b" ? "default" : "outline"}
          onClick={() => setFormType("b2b")}
          className={
            formType === "b2b" ? "bg-forge-amber hover:bg-forge-amber-light" : "border-border/60"
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
        className="space-y-5"
      >
        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <label className="mb-1.5 block text-sm font-medium">Ime *</label>
            <Input placeholder="Vaše ime" required className="rounded-xl border-border/60 bg-workshop-gray focus:border-forge-amber focus:ring-forge-amber/20" />
          </div>
          <div>
            <label className="mb-1.5 block text-sm font-medium">
              Prezime *
            </label>
            <Input placeholder="Vaše prezime" required className="rounded-xl border-border/60 bg-workshop-gray focus:border-forge-amber focus:ring-forge-amber/20" />
          </div>
        </div>
        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <label className="mb-1.5 block text-sm font-medium">Email *</label>
            <Input type="email" placeholder="email@primer.com" required className="rounded-xl border-border/60 bg-workshop-gray focus:border-forge-amber focus:ring-forge-amber/20" />
          </div>
          <div>
            <label className="mb-1.5 block text-sm font-medium">Telefon</label>
            <Input type="tel" placeholder="+381 60 ..." className="rounded-xl border-border/60 bg-workshop-gray focus:border-forge-amber focus:ring-forge-amber/20" />
          </div>
        </div>

        {formType === "b2b" && (
          <>
            <div>
              <label className="mb-1.5 block text-sm font-medium">
                Naziv objekta / firme *
              </label>
              <Input placeholder="Naziv kafića, restorana, hotela..." required className="rounded-xl border-border/60 bg-workshop-gray focus:border-forge-amber focus:ring-forge-amber/20" />
            </div>
            <div className="grid gap-5 sm:grid-cols-2">
              <div>
                <label className="mb-1.5 block text-sm font-medium">
                  Broj komada (okvirno) *
                </label>
                <Input
                  type="number"
                  placeholder="npr. 20"
                  min={1}
                  required
                  className="rounded-xl border-border/60 bg-workshop-gray focus:border-forge-amber focus:ring-forge-amber/20"
                />
              </div>
              <div>
                <label className="mb-1.5 block text-sm font-medium">
                  Tip proizvoda
                </label>
                <Input placeholder="Stolice, stolovi, setovi..." className="rounded-xl border-border/60 bg-workshop-gray focus:border-forge-amber focus:ring-forge-amber/20" />
              </div>
            </div>
          </>
        )}

        <div>
          <label className="mb-1.5 block text-sm font-medium">Poruka *</label>
          <Textarea
            placeholder={
              formType === "b2b"
                ? "Opišite vaše potrebe — broj mesta, tip prostora, željeni rok isporuke..."
                : "Vaše pitanje ili poruka..."
            }
            rows={5}
            required
            className="rounded-xl border-border/60 bg-workshop-gray focus:border-forge-amber focus:ring-forge-amber/20"
          />
        </div>

        <Button
          type="submit"
          size="lg"
          className="w-full bg-forge-amber font-semibold text-white transition-all duration-200 hover:bg-forge-amber-light hover:scale-[1.01] active:scale-[0.98]"
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
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8 lg:py-20">
      <ScrollReveal className="mb-12">
        <p className="mb-2 text-xs font-semibold uppercase tracking-[0.15em] text-forge-amber">
          Javite nam se
        </p>
        <h1 className="font-display text-3xl tracking-tight sm:text-4xl">Kontakt</h1>
        <p className="mt-3 text-muted-foreground">
          Javite nam se za pitanja, ponude ili saradnju.
        </p>
      </ScrollReveal>

      <div className="grid gap-10 lg:grid-cols-3">
        {/* Contact info */}
        <ScrollReveal delay={0.1} className="space-y-6">
          <div className="rounded-xl border border-border/50 bg-card p-7">
            <h3 className="mb-5 font-semibold tracking-tight">Podaci za kontakt</h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin className="mt-0.5 h-5 w-5 flex-shrink-0 text-forge-amber" />
                <div>
                  <p className="text-sm font-medium">Adresa</p>
                  <p className="text-sm text-muted-foreground">
                    Loznica, Srbija
                  </p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <Phone className="mt-0.5 h-5 w-5 flex-shrink-0 text-forge-amber" />
                <div>
                  <p className="text-sm font-medium">Telefon</p>
                  <a
                    href="tel:+381600000000"
                    className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                  >
                    +381 60 000 0000
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <Mail className="mt-0.5 h-5 w-5 flex-shrink-0 text-forge-amber" />
                <div>
                  <p className="text-sm font-medium">Email</p>
                  <a
                    href="mailto:info@kovo.rs"
                    className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                  >
                    info@kovo.rs
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <Clock className="mt-0.5 h-5 w-5 flex-shrink-0 text-forge-amber" />
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
          </div>

          <div className="rounded-xl border border-forge-amber/20 bg-forge-amber/5 p-7 transition-all duration-300 hover:shadow-warm">
            <h3 className="font-semibold tracking-tight text-foreground">
              Lično preuzimanje
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              Dođite u našu radionicu u Loznici i uštedite 5% na celokupnu
              porudžbinu. Vidite nameštaj uživo pre kupovine!
            </p>
          </div>
        </ScrollReveal>

        {/* Form */}
        <ScrollReveal delay={0.15} className="lg:col-span-2">
          <Suspense fallback={<div>Učitavanje...</div>}>
            <ContactForm />
          </Suspense>
        </ScrollReveal>
      </div>
    </div>
  );
}
