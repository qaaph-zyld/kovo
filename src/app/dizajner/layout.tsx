import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dizajner",
  description:
    "Interaktivni alat za dizajn kovanog nameštaja. Kreirajte sopstvene kombinacije modularnih elemenata iz LINEA kolekcije.",
};

export default function DizajnerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
