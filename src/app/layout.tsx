import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin", "latin-ext"],
});

export const metadata: Metadata = {
  title: "KOVO — Modularni kovani nameštaj",
  description:
    "Kovani nameštaj premium izgleda, projektovan za isplativ transport. Rastavljiv, brz za montažu, bez kompromisa u čvrstini. LINEA kolekcija za terase i dvorišta.",
  keywords: [
    "kovani nameštaj",
    "modularni nameštaj",
    "baštenske stolice",
    "kovano gvožđe",
    "KOVO",
    "LINEA",
    "nameštaj za terase",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="sr">
      <body className={`${inter.variable} font-sans antialiased`}>
        <Header />
        <main className="min-h-screen">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
