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
  metadataBase: new URL('https://sunrayspreschool.edu.np'),
  title: {
    default: "Sunrays Pre School",
    template: "%s | Sunrays Pre School"
  },
  description: "Sunrays Pre School provides a fun, safe, and enriching environment for your child's early education. Expert teachers, modern facilities, and engaging programs for holistic development.",
  keywords: [
    "sunrays",
    "sunrays pre school",
    "preschool",
    "kindergarten",
    "early education",
    "Kathmandu",
    "preschool in kathmandu",
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
    canonical: 'https://sunrayspreschool.edu.np',
  },
  icons: {
    icon: [
      { url: "/sunrays-logo.png", sizes: "any" },
      { url: "/sunrays-logo.png", sizes: "32x32", type: "image/png" },
      { url: "/sunrays-logo.png", sizes: "16x16", type: "image/png" },
      { url: "/sunrays-logo.png", sizes: "192x192", type: "image/png" },
      { url: "/sunrays-logo.png", sizes: "512x512", type: "image/png" },
    ],
    apple: [
      { url: "/sunrays-logo.png", sizes: "180x180", type: "image/png" },
    ],
    shortcut: "/sunrays-logo.png",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://sunrayspreschool.edu.np",
    siteName: "Sunrays Pre School",
    title: "Sunrays Pre School - Nurturing Young Minds with Quality Early Education",
    description: "A fun, safe, and enriching environment for your child's early education",
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
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Preschool',
    name: 'Sunrays Pre School',
    image: 'https://sunrayspreschool.edu.np/sunrays-logo.png',
    logo: 'https://sunrayspreschool.edu.np/sunrays-logo.png',
    description: "Sunrays Pre School provides a fun, safe, and enriching environment for your child's early education .",
    url: 'https://sunrayspreschool.edu.np',
    telephone: '01-4282926',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Purnadevi Marg, Dallu',
      addressLocality: 'Kathmandu',
      addressRegion: 'Bagmati',
      postalCode: '44600',
      addressCountry: 'NP'
    },
    priceRange: '$$',
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
        opens: '09:00',
        closes: '16:00'
      }
    ],
    sameAs: [
      'https://www.facebook.com/sunrayspreschool',
    ]
  };

  return (
    <html lang="en">
      <body className={`${outfit.variable} ${fredoka.variable} ${notoSansDevanagari.variable} antialiased`} suppressHydrationWarning>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {children}
        <Analytics />
      </body>
    </html>
  );
}
