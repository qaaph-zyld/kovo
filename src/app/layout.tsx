import type { Metadata } from "next";
import { DM_Sans, DM_Serif_Display, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const dmSans = DM_Sans({
  variable: "--font-sans",
  subsets: ["latin", "latin-ext"],
  weight: ["200", "300", "400", "500", "600", "700", "800", "900"],
});

const dmSerif = DM_Serif_Display({
  variable: "--font-display",
  subsets: ["latin", "latin-ext"],
  weight: "400",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin", "latin-ext"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://kovo.rs"),
  title: {
    default: "KOVO — Modularni kovani nameštaj",
    template: "%s | KOVO",
  },
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
    "kovačka radnja",
    "Loznica",
  ],
  authors: [{ name: "Kovačka radnja Cotrić" }],
  creator: "KOVO",
  openGraph: {
    type: "website",
    locale: "sr_RS",
    url: "https://kovo.rs",
    siteName: "KOVO",
    title: "KOVO — Modularni kovani nameštaj",
    description:
      "Kovani nameštaj premium izgleda. Rastavljiv, brz za montažu, bez kompromisa u čvrstini. LINEA kolekcija.",
    images: [
      {
        url: "/images/og-image.png",
        width: 1200,
        height: 630,
        alt: "KOVO — Modularni kovani nameštaj za terase i dvorišta",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "KOVO — Modularni kovani nameštaj",
    description:
      "Kovani nameštaj premium izgleda. Rastavljiv, brz za montažu. LINEA kolekcija.",
    images: ["/images/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
  other: {
    "theme-color": "#1a1a1a",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="sr">
      <body className={`${dmSans.variable} ${dmSerif.variable} ${jetbrainsMono.variable} font-sans antialiased`}>
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-lg focus:bg-forge-amber focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-white focus:outline-none"
        >
          Preskoči na sadržaj
        </a>
        <Header />
        <main id="main-content" className="min-h-screen">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
