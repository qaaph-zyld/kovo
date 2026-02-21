"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { X, CheckCircle2 } from "lucide-react";

interface QuoteModalProps {
  isOpen: boolean;
  onClose: () => void;
  productName: string;
  configuration: {
    backrest?: string;
    seat?: string;
    color?: string;
    base?: string;
    top?: string;
    unitPrice: number;
  };
}

export function QuoteModal({ isOpen, onClose, productName, configuration }: QuoteModalProps) {
  const [quantity, setQuantity] = useState<number>(1);
  const [isB2B, setIsB2B] = useState<boolean>(false);
  const [companyName, setCompanyName] = useState("");
  const [bulkQuantity, setBulkQuantity] = useState<number | "">("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const isB2BLead = isB2B || quantity > 4 || companyName.trim().length > 0;
  const subtotal = configuration.unitPrice * quantity;

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    const form = e.currentTarget;
    const formData = new FormData(form);
    formData.set("is_b2b", isB2BLead ? "yes" : "no");
    formData.set("quantity", String(quantity));
    formData.set("company", companyName);
    formData.set("bulk_quantity", isB2B && bulkQuantity ? String(bulkQuantity) : "");

    const encoded = new URLSearchParams();
    formData.forEach((value, key) => {
      encoded.append(key, String(value));
    });

    try {
      const response = await fetch("/", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: encoded.toString(),
      });

      if (!response.ok) {
        throw new Error("Netlify form submission failed");
      }

      setIsSubmitting(false);
      setIsSuccess(true);
      setTimeout(() => {
        setIsSuccess(false);
        onClose();
      }, 3000);
    } catch {
      setIsSubmitting(false);
      const subject = encodeURIComponent(`B2B ponuda - ${productName}`);
      const body = encodeURIComponent(
        [
          `Proizvod: ${productName}`,
          configuration.color ? `Boja: ${configuration.color}` : "",
          configuration.backrest ? `Naslon: ${configuration.backrest}` : "",
          configuration.base ? `Baza: ${configuration.base}` : "",
          configuration.top ? `Ploča: ${configuration.top}` : "",
          `Količina: ${quantity}`,
          `Ukupno: ${subtotal.toLocaleString("sr-RS")} RSD`,
        ]
          .filter(Boolean)
          .join("\n")
      );
      window.location.href = `mailto:info@kovo.rs?subject=${subject}&body=${body}`;
    }
  };

  const netlifyFormStub = (
    <form name="b2b-quote" data-netlify="true" netlify-honeypot="bot-field" hidden>
      <input type="hidden" name="form-name" value="b2b-quote" />
      <input type="hidden" name="bot-field" />
      <input type="text" name="product" />
      <input type="text" name="color" />
      <input type="text" name="backrest" />
      <input type="text" name="seat" />
      <input type="text" name="base" />
      <input type="text" name="top" />
      <input type="text" name="unit_price" />
      <input type="text" name="quantity" />
      <input type="text" name="bulk_quantity" />
      <input type="text" name="is_b2b" />
      <input type="text" name="name" />
      <input type="email" name="email" />
      <input type="tel" name="phone" />
      <input type="text" name="company" />
      <textarea name="message" />
    </form>
  );

  if (!isOpen) {
    return netlifyFormStub;
  }

  return (
    <>
      {netlifyFormStub}
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm sm:p-6" onClick={onClose}>
      <div 
        className="w-full max-w-lg bg-iron-deep border border-white/10 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-white/10 bg-white/5">
          <h2 className="text-xl font-display text-white">Zatražite ponudu</h2>
          <button 
            onClick={onClose}
            className="text-white/50 hover:text-white transition-colors p-2 -mr-2"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Success State */}
        {isSuccess ? (
          <div className="p-8 text-center flex flex-col items-center justify-center flex-1">
            <div className="w-16 h-16 bg-forge-amber/20 rounded-full flex items-center justify-center mb-6">
              <CheckCircle2 className="w-8 h-8 text-forge-amber" />
            </div>
            <h3 className="text-2xl font-display text-white mb-2">Hvala na upitu!</h3>
            <p className="text-white/70">
              Vaš zahtev za ponudu je uspešno poslat. Odgovorićemo vam u roku od 24h sa detaljnom specifikacijom i rokom isporuke.
            </p>
            <Button 
              onClick={onClose}
              className="mt-8 bg-white/10 hover:bg-white/20 text-white"
            >
              Zatvori
            </Button>
          </div>
        ) : (
          /* Form Content */
          <div className="overflow-y-auto flex-1 p-6">
            
            {/* Configuration Summary */}
            <div className="bg-iron-black rounded-xl p-4 border border-white/5 mb-6">
              <h3 className="text-xs font-semibold uppercase tracking-widest text-forge-amber-light mb-3">
                Vaša konfiguracija
              </h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-white/60">Proizvod:</span>
                  <span className="font-medium text-white">{productName}</span>
                </div>
                {configuration.color && (
                  <div className="flex justify-between">
                    <span className="text-white/60">Boja (RAL):</span>
                    <span className="font-medium text-white">{configuration.color}</span>
                  </div>
                )}
                {configuration.backrest && (
                  <div className="flex justify-between">
                    <span className="text-white/60">Naslon:</span>
                    <span className="font-medium text-white">{configuration.backrest}</span>
                  </div>
                )}
                {configuration.seat && (
                  <div className="flex justify-between">
                    <span className="text-white/60">Sedište:</span>
                    <span className="font-medium text-white">{configuration.seat}</span>
                  </div>
                )}
                {configuration.base && (
                  <div className="flex justify-between">
                    <span className="text-white/60">Baza:</span>
                    <span className="font-medium text-white">{configuration.base}</span>
                  </div>
                )}
                {configuration.top && (
                  <div className="flex justify-between">
                    <span className="text-white/60">Ploča:</span>
                    <span className="font-medium text-white">{configuration.top}</span>
                  </div>
                )}
                <div className="pt-2 mt-2 border-t border-white/10 flex justify-between items-center">
                  <span className="text-white/60">Jedinična cena:</span>
                  <span className="font-mono text-forge-amber">{configuration.unitPrice.toLocaleString('sr-RS')} RSD</span>
                </div>
              </div>
            </div>

            {/* Netlify Form */}
            <form 
              name="b2b-quote" 
              method="POST" 
              data-netlify="true" 
              netlify-honeypot="bot-field"
              onSubmit={handleSubmit}
              className="space-y-5"
            >
              {/* Hidden inputs for Netlify and Configuration Data */}
              <input type="hidden" name="form-name" value="b2b-quote" />
              <input type="hidden" name="bot-field" />
              <input type="hidden" name="product" value={productName} />
              <input type="hidden" name="color" value={configuration.color || ''} />
              <input type="hidden" name="backrest" value={configuration.backrest || ''} />
              <input type="hidden" name="seat" value={configuration.seat || ''} />
              <input type="hidden" name="base" value={configuration.base || ''} />
              <input type="hidden" name="top" value={configuration.top || ''} />
              <input type="hidden" name="unit_price" value={configuration.unitPrice} />
              <input type="hidden" name="is_b2b" value={isB2BLead ? 'yes' : 'no'} />

              {/* Quantity */}
              <div>
                <label className="block text-sm font-medium text-white/80 mb-2">Količina</label>
                <div className="flex items-center gap-4">
                  <input 
                    type="number" 
                    name="quantity"
                    min="1"
                    value={quantity}
                    onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                    className="w-24 bg-iron-black border border-white/20 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-forge-amber focus:ring-1 focus:ring-forge-amber transition-all"
                  />
                  <div className="text-sm text-white/50">
                    Ukupno: <span className="font-mono text-forge-amber font-medium ml-1">{subtotal.toLocaleString('sr-RS')} RSD</span>
                  </div>
                </div>
              </div>

              {/* B2B Toggle */}
              <label className="flex items-start gap-3 p-3 bg-white/5 border border-white/10 rounded-xl cursor-pointer hover:bg-white/10 transition-colors">
                <input 
                  type="checkbox" 
                  name="b2b_interest"
                  checked={isB2B}
                  onChange={(e) => setIsB2B(e.target.checked)}
                  className="mt-1 w-4 h-4 rounded border-white/30 text-forge-amber focus:ring-forge-amber focus:ring-offset-iron-deep bg-iron-black"
                />
                <div>
                  <span className="block text-sm font-medium text-white">Želim ponudu za veće količine (B2B)</span>
                  <span className="block text-xs text-white/50 mt-0.5">Za opremanje bašti, restorana ili hotela odobravamo rabate na količinu.</span>
                </div>
              </label>

              {isB2B && (
                <div>
                  <label htmlFor="bulkQuantity" className="block text-sm font-medium text-white/80 mb-1.5">Koliko komada? *</label>
                  <input
                    type="number"
                    id="bulkQuantity"
                    min="5"
                    required={isB2B}
                    value={bulkQuantity}
                    onChange={(e) => setBulkQuantity(Number(e.target.value) || "")}
                    className="w-full bg-iron-black border border-forge-amber/30 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-forge-amber focus:ring-1 focus:ring-forge-amber transition-all"
                  />
                </div>
              )}

              {/* Contact Info */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-white/80 mb-1.5">Ime i prezime *</label>
                  <input 
                    type="text" 
                    id="name"
                    name="name" 
                    required
                    className="w-full bg-iron-black border border-white/20 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-forge-amber focus:ring-1 focus:ring-forge-amber transition-all"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-white/80 mb-1.5">Email adresa *</label>
                  <input 
                    type="email" 
                    id="email"
                    name="email" 
                    required
                    className="w-full bg-iron-black border border-white/20 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-forge-amber focus:ring-1 focus:ring-forge-amber transition-all"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-white/80 mb-1.5">Telefon</label>
                  <input 
                    type="tel" 
                    id="phone"
                    name="phone" 
                    className="w-full bg-iron-black border border-white/20 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-forge-amber focus:ring-1 focus:ring-forge-amber transition-all"
                  />
                </div>
                <div>
                  <label htmlFor="company" className="block text-sm font-medium text-white/80 mb-1.5">Naziv firme (opciono)</label>
                  <input 
                    type="text" 
                    id="company"
                    name="company"
                    value={companyName}
                    onChange={(e) => setCompanyName(e.target.value)}
                    className="w-full bg-iron-black border border-white/20 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-forge-amber focus:ring-1 focus:ring-forge-amber transition-all"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-white/80 mb-1.5">Dodatna poruka (opciono)</label>
                <textarea 
                  id="message"
                  name="message" 
                  rows={3}
                  className="w-full bg-iron-black border border-white/20 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-forge-amber focus:ring-1 focus:ring-forge-amber transition-all resize-none"
                  placeholder="Posebni zahtevi, rok isporuke..."
                ></textarea>
              </div>

              {/* Submit Button */}
              <div className="pt-4 border-t border-white/10">
                <Button 
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-forge-amber text-white hover:bg-forge-amber-light h-12 text-lg font-medium shadow-[0_0_20px_rgba(184,115,51,0.2)]"
                >
                  {isSubmitting ? "Slanje..." : "Pošalji zahtev za ponudu"}
                </Button>
                <p className="text-center text-xs text-white/40 mt-3">
                  Vaši podaci su sigurni. Ne šaljemo spam.
                </p>
              </div>

            </form>
          </div>
        )}
      </div>
      </div>
    </>
  );
}
