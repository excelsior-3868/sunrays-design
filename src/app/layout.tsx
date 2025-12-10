import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/next";
import { Outfit, Fredoka, Noto_Sans_Devanagari } from "next/font/google"; // Fredoka is great for kids sites
import "./globals.css";

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
  display: "swap",
});

const fredoka = Fredoka({
  subsets: ["latin"],
  variable: "--font-fredoka",
  display: "swap",
});

const notoSansDevanagari = Noto_Sans_Devanagari({
  subsets: ["devanagari"],
  variable: "--font-devanagari",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Sunrays Pre School",
  description: "A fun and safe environment for your child's growth. Join us at Sunrays Pre School!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${outfit.variable} ${fredoka.variable} ${notoSansDevanagari.variable} antialiased`} suppressHydrationWarning>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
