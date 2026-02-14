import Link from "next/link";
import { MapPin, Phone, Mail, Clock } from "lucide-react";
import KovoLogo from "@/components/KovoLogo";

export default function Footer() {
  return (
    <footer className="relative overflow-hidden bg-iron-black text-white/80">
      {/* Atmospheric amber gradient */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_oklch(0.55_0.14_55_/_0.06),transparent_60%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_oklch(0.55_0.14_55_/_0.04),transparent_50%)]" />

      <div className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div className="space-y-5">
            <KovoLogo className="h-10 w-auto" inverted showTagline />
            <p className="text-sm leading-relaxed text-white/60">
              Modularni kovani nameštaj premium izgleda. Projektovan za isplativ
              transport, brzu montažu i trajnost.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="mb-5 text-xs font-semibold uppercase tracking-[0.15em] text-white/40">
              Navigacija
            </h4>
            <ul className="space-y-2.5">
              {[
                { href: "/proizvodi", label: "Proizvodi" },
                { href: "/setovi", label: "Setovi" },
                { href: "/kako-funkcionise", label: "Kako funkcioniše" },
                { href: "/o-nama", label: "O nama" },
                { href: "/dostava", label: "Dostava" },
                { href: "/kontakt", label: "Kontakt" },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="inline-block min-h-[44px] py-1.5 text-sm text-white/60 transition-colors duration-200 hover:text-forge-amber-light sm:min-h-0 sm:py-0"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="mb-5 text-xs font-semibold uppercase tracking-[0.15em] text-white/40">
              Kontakt
            </h4>
            <ul className="space-y-3.5">
              <li className="flex items-start gap-2.5 text-sm text-white/60">
                <MapPin className="mt-0.5 h-4 w-4 flex-shrink-0 text-forge-amber" />
                <span>Loznica, Srbija</span>
              </li>
              <li className="flex items-start gap-2.5 text-sm text-white/60">
                <Phone className="mt-0.5 h-4 w-4 flex-shrink-0 text-forge-amber" />
                <a href="tel:+381600000000" className="transition-colors hover:text-white">
                  +381 60 000 0000
                </a>
              </li>
              <li className="flex items-start gap-2.5 text-sm text-white/60">
                <Mail className="mt-0.5 h-4 w-4 flex-shrink-0 text-forge-amber" />
                <a href="mailto:info@kovo.rs" className="transition-colors hover:text-white">
                  info@kovo.rs
                </a>
              </li>
              <li className="flex items-start gap-2.5 text-sm text-white/60">
                <Clock className="mt-0.5 h-4 w-4 flex-shrink-0 text-forge-amber" />
                <span>Pon–Pet: 08–16h<br />Sub: 08–13h</span>
              </li>
            </ul>
          </div>

          {/* B2B */}
          <div>
            <h4 className="mb-5 text-xs font-semibold uppercase tracking-[0.15em] text-white/40">
              Za ugostiteljstvo
            </h4>
            <p className="mb-4 text-sm leading-relaxed text-white/60">
              Opremite vaš kafić, restoran ili hotel. Setovi na paleti, montaža za 45 min.
            </p>
            <Link
              href="/kontakt?tip=b2b"
              className="inline-block rounded-lg bg-forge-amber px-5 py-2.5 text-sm font-semibold text-white transition-all duration-200 hover:bg-forge-amber-light hover:scale-[1.02]"
            >
              Zatražite ponudu
            </Link>
          </div>
        </div>

        {/* Divider */}
        <div className="my-10 h-px bg-gradient-to-r from-transparent via-forge-amber/20 to-transparent" />

        <div className="flex flex-col items-center justify-between gap-3 text-xs text-white/30 sm:flex-row">
          <p>&copy; {new Date().getFullYear()} KOVO. Sva prava zadržana.</p>
          <p>Kovačka radnja Cotrić — Loznica, Srbija</p>
        </div>
      </div>
    </footer>
  );
}
