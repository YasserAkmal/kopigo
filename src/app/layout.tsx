// app/layout.tsx
import type { Metadata, Viewport } from "next";
import "./globals.css";
import { EB_Garamond, Noto_Sans } from "next/font/google";
import { ReactNode } from "react";
import Navbar from "./components/Navbar";

const ebGaramond = EB_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"], // pilih yang kamu perlu
  style: ["normal", "italic"], // opsional; hapus kalau tak perlu italic
  variable: "--font-eb-garamond",
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

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#111F15" },
    { media: "(prefers-color-scheme: dark)", color: "#111F15" },
  ],
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html
      lang="en"
      className={`h-full ${noto.variable} ${ebGaramond.variable}`}
    >
      <body className="min-h-screen bg-white text-gray-900 font-sans">
        <Navbar />
        {children}
        <footer
          id="footer"
          className="border-t bg-[#111F15] border-black/5 py-10 text-center text-sm text-gray-500 flex justify-evenly gap-4 sm:px-5 md:px-10 lg:px-20 xl:px-40 flex-col sm:flex-row items-center"
        >
          <div className="text-left">
            <div>{new Date().getFullYear()} © Kopigo. All rights reserved.</div>
            <div>Over One Million Cups Served - Since 2018</div>
          </div>
          <div className="text-left max-w-100 flex gap-4">
            <div className="">
              <div>
                <span className="font-medium">Address: </span>
                <a
                  href="https://www.google.com/maps/place/K+O+P+I+G+O/@-0.3031384,100.3624037,17z/data=!3m1!4b1!4m6!3m5!1s0x2fd539f41bca7507:0xdb1d47323bbe5b9e!8m2!3d-0.3031384!4d100.3672746!16s%2Fg%2F11gmxpg671?entry=ttu&g_ep=EgoyMDI1MTAxNC4wIKXMDSoASAFQAw%3D%3D"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-500 hover:underline"
                >
                  Jl. Teuku Umar No.16, Benteng Ps. Atas, Kec. Guguk Panjang,
                  Kota Bukittinggi, Sumatera Barat 26136
                </a>
              </div>
              <div className="">
                <span className="font-medium">Email: </span>
                <a
                  href="mailto:contact@kopigoasia.com"
                  className="text-gray-500 hover:underline"
                >
                  contact@kopigoasia.com
                </a>
              </div>
              <div>
                <span className="font-medium">Phone: </span>
                <a
                  href="https://wa.me/6285890038225"
                  target="_blank"
                  className="text-gray-500 hover:underline"
                >
                  +62&nbsp;858-9003-8225
                </a>
              </div>
            </div>
            <div className="">
              <div>
                <a
                  href="https://www.linkedin.com/company/kopigoutamaindonesia"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-500 hover:underline"
                >
                  LinkedIn
                </a>
              </div>

              <div>
                <a
                  href="https://www.instagram.com/therealkopigo"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-500 hover:underline"
                >
                  Instagram
                </a>
              </div>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
