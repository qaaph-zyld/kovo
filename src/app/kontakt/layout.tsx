import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Kontakt",
  description:
    "Javite nam se za pitanja, ponude ili B2B saradnju. Kovačka radnja Cotrić, Loznica. Telefon, email, radno vreme i lično preuzimanje.",
};

export default function KontaktLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
