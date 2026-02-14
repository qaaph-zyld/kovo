import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Proizvodi — LINEA Kolekcija",
  description:
    "Modularni kovani nameštaj za terase i dvorišta. Stolice, stolovi, klupe, setovi i ležaljke od kovanog gvožđa. Flat-pack isporuka, montaža do 45 min.",
};

export default function ProizvodiLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
