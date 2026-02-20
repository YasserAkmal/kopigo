// app/layout.tsx
import type { Metadata, Viewport } from "next";
import "./globals.css";
import { ReactNode } from "react";
import Navbar from "./components/Navbar";
import { Playfair_Display, Playfair_Display_SC } from "next/font/google";
import AOSProvider from "./components/AOSProvider";


const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
});

const playfairSC = Playfair_Display_SC({
  subsets: ["latin"],
  weight: ["400", "700", "900"],
  variable: "--font-playfair-sc",
});


export const metadata: Metadata = {
  title: "Kopigo",
  description: "Kopigo site",
  icons: {
    icon: [
      { url: "/KPG-LOGO.png" },
      { url: "/KPG-LOGO.png", sizes: "32x32", type: "image/png" },
      { url: "/KPG-LOGO.png", sizes: "16x16", type: "image/png" },
    ],
    apple: [{ url: "/KPG-LOGO.png", sizes: "180x180" }],
    shortcut: ["/KPG-LOGO.png"],
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#354338" },
    { media: "(prefers-color-scheme: dark)", color: "#354338" },
  ],
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={`h-full ${playfair.variable} ${playfairSC.variable}`}>
      <body className="min-h-screen bg-white text-gray-900 font-playfair">
        <AOSProvider />
        <Navbar />
        {children}
        <footer
          id="footer"
          className="border-t bg-[#354338] border-black/5 py-10 text-center text-sm text-white flex justify-evenly gap-4 sm:px-5 md:px-10 lg:px-20 xl:px-40 flex-col sm:flex-row items-center"
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
                  className="text-white hover:underline"
                >
                  Jl. Teuku Umar No.16, Benteng Ps. Atas, Kec. Guguk Panjang,
                  Kota Bukittinggi, Sumatera Barat 26136
                </a>
              </div>
              <div className="">
                <span className="font-medium">Email: </span>
                <a
                  href="mailto:contact@kopigoasia.com"
                  className="text-white hover:underline"
                >
                  contact@kopigoasia.com
                </a>
              </div>
              <div>
                <span className="font-medium">Phone: </span>
                <a
                  href="https://wa.me/6285890038225"
                  target="_blank"
                  className="text-white hover:underline"
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
                  className="text-white hover:underline"
                >
                  LinkedIn
                </a>
              </div>

              <div>
                <a
                  href="https://www.instagram.com/therealkopigo"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white hover:underline"
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
