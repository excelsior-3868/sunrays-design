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
    default: "Sunrays Pre School | Nurturing Young Minds",
    template: "%s | Sunrays Pre School"
  },
  description: "Sunrays Pre School in Kathmandu provides a fun, safe, and enriching environment for your child's early education. Expert teachers and modern facilities for holistic development.",
  keywords: [
    "sunrays",
    "sunrays pre school",
    "preschool",
    "sun rays ",
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
    "best preschool kathmandu",
    "Preschool Kathmandu",
    "Play Way Method"
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
  manifest: "/manifest.json",
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/icon.png", type: "image/png", sizes: "32x32" },
      { url: "/apple-icon.png", type: "image/png", sizes: "180x180" },
    ],
    apple: [
      { url: "/apple-icon.png" },
    ],
    shortcut: "/favicon.ico",
  },

  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://sunrayspreschool.edu.np",
    siteName: "Sunrays Pre School",
    title: "Sunrays Pre School - Nurturing Young Minds",
    description: "A fun, safe, and enriching environment for your child's early education.",
    images: [
      {
        url: "https://sunrayspreschool.edu.np/sunrays-logo.png",
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
    images: ["https://sunrayspreschool.edu.np/sunrays-logo.png"],
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
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = [
    {
      '@context': 'https://schema.org',
      '@type': 'Preschool',
      '@id': 'https://sunrayspreschool.edu.np/#organization',
      name: 'Sunrays Pre School',
      image: 'https://sunrayspreschool.edu.np/sunrays-logo.png',
      logo: {
        '@type': 'ImageObject',
        url: 'https://sunrayspreschool.edu.np/sunrays-logo.png',
        width: { '@type': 'QuantitativeValue', value: 512 },
        height: { '@type': 'QuantitativeValue', value: 512 }
      },
      description: "Sunrays Pre School provides a fun, safe, and enriching environment for your child's early education.",
      url: 'https://sunrayspreschool.edu.np',
      telephone: '01-5382926',
      address: {
        '@type': 'PostalAddress',
        streetAddress: 'Purnadevi Marg, Dallu',
        addressLocality: 'Kathmandu',
        addressRegion: 'Bagmati',
        postalCode: '44600',
        addressCountry: 'NP'
      },
      sameAs: [
        'https://www.facebook.com/sunrayspreschool',
      ]
    },
    {
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      url: 'https://sunrayspreschool.edu.np',
      name: 'Sunrays Pre School',
      publisher: {
        '@id': 'https://sunrayspreschool.edu.np/#organization'
      },
      potentialAction: {
        '@type': 'SearchAction',
        target: {
          '@type': 'EntryPoint',
          urlTemplate: 'https://sunrayspreschool.edu.np/?s={search_term_string}'
        },
        'query-input': 'required name=search_term_string'
      }
    }
  ];

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
