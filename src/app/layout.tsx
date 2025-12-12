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
  metadataBase: new URL('https://sunrayspreschool.com'),
  title: {
    default: "Sunrays Pre School - Nurturing Young Minds in Kathmandu",
    template: "%s | Sunrays Pre School"
  },
  description: "Sunrays Pre School provides a fun, safe, and enriching environment for your child's early education in Kathmandu. Expert teachers, modern facilities, and engaging programs for holistic development.",
  keywords: [
    "preschool",
    "kindergarten",
    "early education",
    "Kathmandu",
    "Nepal",
    "childcare",
    "learning programs",
    "child development",
    "play group",
    "nursery",
    "LKG",
    "UKG",
    "Dallu preschool",
    "best preschool kathmandu"
  ],
  authors: [{ name: "Sunrays Pre School" }],
  creator: "Sunrays Pre School",
  publisher: "Sunrays Pre School",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  alternates: {
    canonical: 'https://sunrayspreschool.com',
  },
  icons: {
    icon: [
      { url: "/sunrays-logo.png", sizes: "any" },
      { url: "/sunrays-logo.png", sizes: "32x32", type: "image/png" },
      { url: "/sunrays-logo.png", sizes: "16x16", type: "image/png" },
    ],
    apple: [
      { url: "/sunrays-logo.png", sizes: "180x180", type: "image/png" },
    ],
    shortcut: "/sunrays-logo.png",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://sunrayspreschool.com",
    siteName: "Sunrays Pre School",
    title: "Sunrays Pre School - Nurturing Young Minds",
    description: "A fun, safe, and enriching environment for your child's early education in Kathmandu",
    images: [
      {
        url: "/sunrays-logo.png",
        width: 1200,
        height: 630,
        alt: "Sunrays Pre School Logo",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Sunrays Pre School",
    description: "Nurturing Young Minds with Quality Early Education",
    images: ["/sunrays-logo.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    // Add Google Search Console verification code here when available
    // google: 'your-google-verification-code',
  },
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
