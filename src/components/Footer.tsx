import Link from "next/link";
import Image from "next/image";
import { MapPin, Phone, Mail, Clock } from "lucide-react";
import { Separator } from "@/components/ui/separator";

export default function Footer() {
  return (
    <footer className="border-t border-border bg-zinc-950 text-zinc-300">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div className="space-y-4">
            <Image
              src="/logo.svg"
              alt="KOVO"
              width={120}
              height={32}
              className="brightness-0 invert"
            />
            <p className="text-sm leading-relaxed text-zinc-400">
              Modularni kovani nameštaj premium izgleda. Projektovan za isplativ
              transport, brzu montažu i trajnost.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="mb-4 text-sm font-semibold uppercase tracking-wider text-zinc-100">
              Navigacija
            </h4>
            <ul className="space-y-2">
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
                    className="text-sm text-zinc-400 transition-colors hover:text-white"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="mb-4 text-sm font-semibold uppercase tracking-wider text-zinc-100">
              Kontakt
            </h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-2 text-sm text-zinc-400">
                <MapPin className="mt-0.5 h-4 w-4 flex-shrink-0 text-amber-600" />
                <span>Loznica, Srbija</span>
              </li>
              <li className="flex items-start gap-2 text-sm text-zinc-400">
                <Phone className="mt-0.5 h-4 w-4 flex-shrink-0 text-amber-600" />
                <a href="tel:+381600000000" className="hover:text-white">
                  +381 60 000 0000
                </a>
              </li>
              <li className="flex items-start gap-2 text-sm text-zinc-400">
                <Mail className="mt-0.5 h-4 w-4 flex-shrink-0 text-amber-600" />
                <a href="mailto:info@kovo.rs" className="hover:text-white">
                  info@kovo.rs
                </a>
              </li>
              <li className="flex items-start gap-2 text-sm text-zinc-400">
                <Clock className="mt-0.5 h-4 w-4 flex-shrink-0 text-amber-600" />
                <span>Pon–Pet: 08–16h<br />Sub: 08–13h</span>
              </li>
            </ul>
          </div>

          {/* B2B */}
          <div>
            <h4 className="mb-4 text-sm font-semibold uppercase tracking-wider text-zinc-100">
              Za ugostiteljstvo
            </h4>
            <p className="mb-3 text-sm text-zinc-400">
              Opremite vaš kafić, restoran ili hotel. Setovi na paleti, montaža za 45 min.
            </p>
            <Link
              href="/kontakt?tip=b2b"
              className="inline-block rounded-md bg-amber-700 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-amber-800"
            >
              Zatražite ponudu
            </Link>
          </div>
        </div>

        <Separator className="my-8 bg-zinc-800" />

        <div className="flex flex-col items-center justify-between gap-2 text-xs text-zinc-500 sm:flex-row">
          <p>&copy; {new Date().getFullYear()} KOVO. Sva prava zadržana.</p>
          <p>Kovačka radnja Cotrić — Loznica, Srbija</p>
        </div>
      </div>
    </footer>
  );
}
