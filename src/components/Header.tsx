"use client";

import Link from "next/link";
import { useState } from "react";
import { ShoppingCart, Menu, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from "@/components/ui/sheet";
import { useCartStore } from "@/store/cart";
import CartDrawer from "@/components/CartDrawer";
import KovoLogo from "@/components/KovoLogo";

const navLinks = [
  { href: "/", label: "Početna" },
  { href: "/proizvodi", label: "Proizvodi" },
  { href: "/setovi", label: "Setovi" },
  { href: "/dizajner", label: "Dizajner" },
  { href: "/3d-chair", label: "3D Konfigurator" },
  { href: "/kako-funkcionise", label: "Kako funkcioniše" },
  { href: "/o-nama", label: "O nama" },
  { href: "/kontakt", label: "Kontakt" },
];

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const itemCount = useCartStore((s) => s.getItemCount());

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-oak-white/90 backdrop-blur-md supports-[backdrop-filter]:bg-oak-white/75">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 transition-opacity hover:opacity-80">
          <KovoLogo className="h-10 w-auto" showTagline={false} />
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden items-center gap-1 lg:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="nav-underline px-3 py-2 text-xs font-medium uppercase tracking-[0.08em] text-foreground/70 transition-colors hover:text-foreground"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-3">
          <Button
            asChild
            size="sm"
            className="hidden bg-forge-amber px-4 text-xs font-semibold text-white transition-all duration-200 hover:bg-forge-amber-light lg:inline-flex"
          >
            <Link href="/kontakt?tip=b2b">Zatražite B2B ponudu</Link>
          </Button>

          <a
            href="tel:+381600000000"
            className="hidden items-center gap-1.5 text-xs font-medium tracking-wide text-muted-foreground transition-colors hover:text-foreground sm:flex"
          >
            <Phone className="h-3.5 w-3.5" />
            <span className="hidden xl:inline">Pozovite nas</span>
          </a>

          {/* Cart button */}
          <Sheet open={cartOpen} onOpenChange={setCartOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="relative h-11 w-11" aria-label="Korpa">
                <ShoppingCart className="h-5 w-5" />
                {itemCount > 0 && (
                  <Badge className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-sm bg-forge-amber p-0 text-[10px] font-semibold text-white">
                    {itemCount}
                  </Badge>
                )}
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-full sm:max-w-md">
              <SheetTitle className="sr-only">Korpa</SheetTitle>
              <CartDrawer onClose={() => setCartOpen(false)} />
            </SheetContent>
          </Sheet>

          {/* Mobile menu trigger */}
          <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="h-11 w-11 lg:hidden" aria-label="Meni">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] bg-iron-black p-0 text-white sm:w-[360px]">
              <SheetTitle className="sr-only">Navigacija</SheetTitle>
              <div className="flex h-full flex-col">
                <div className="border-b border-white/10 px-6 py-6">
                  <KovoLogo className="h-8 w-auto" inverted showTagline={false} />
                </div>
                <nav className="flex flex-1 flex-col gap-1 px-4 py-6">
                  {navLinks.map((link, i) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      onClick={() => setMobileOpen(false)}
                      className="animate-slide-right rounded-lg px-4 py-3.5 text-sm font-medium tracking-wide text-white transition-colors hover:bg-white/5"
                      style={{ animationDelay: `${i * 60}ms` }}
                    >
                      {link.label}
                    </Link>
                  ))}
                </nav>
                <div className="border-t border-white/10 px-6 py-5">
                  <Button
                    asChild
                    className="mb-4 w-full bg-forge-amber text-sm font-semibold text-white hover:bg-forge-amber-light"
                    onClick={() => setMobileOpen(false)}
                  >
                    <Link href="/kontakt?tip=b2b">Zatražite B2B ponudu</Link>
                  </Button>
                  <a
                    href="tel:+381600000000"
                    className="flex items-center gap-2 text-sm text-white/60 transition-colors hover:text-white"
                  >
                    <Phone className="h-4 w-4" />
                    +381 60 000 0000
                  </a>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
