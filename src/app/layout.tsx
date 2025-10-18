// app/layout.tsx
import type { Metadata, Viewport } from "next";
import "./globals.css";
import { Lora, Noto_Sans } from "next/font/google";
import { ReactNode } from "react";
import Navbar from "./components/Navbar";

const lora = Lora({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-lora",
  display: "swap",
});

const noto = Noto_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-noto-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Kopigo",
  description: "Kopigo site",
  
  icons: {
    icon: [
      { url: "/LOGO-KOPIGO.svg" },
      { url: "/LOGO-KOPIGO.svg", sizes: "32x32", type: "image/svg+xml" },
      { url: "/LOGO-KOPIGO.svg", sizes: "16x16", type: "image/svg+xml" },
    ],
    apple: [{ url: "/LOGO-KOPIGO.svg", sizes: "180x180" }],
    shortcut: ["/LOGO-KOPIGO.svg"],
  },
};

// ✅ Next 15: themeColor diletakkan di viewport
export const viewport: Viewport = {
  // satu warna:
  // themeColor: "#0c4a6e",

  // atau mode light/dark:
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#0c4a6e" },
    { media: "(prefers-color-scheme: dark)", color: "#0b1220" },
  ],
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={`h-full ${noto.variable} ${lora.variable}`}>
      <body className="min-h-screen bg-white text-gray-900 font-sans">
        <Navbar />
        {children}
        <footer
          id="footer"
          className="border-t border-black/5 py-10 mt-16 text-center text-sm text-gray-500"
        >
          © {new Date().getFullYear()} Kopigo. All rights reserved.
        </footer>
      </body>
    </html>
  );
}
