import type { Metadata } from "next";
import { Inter, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { siteConfig } from "@/lib/config";
import { Navbar } from "@/components/chrome/Navbar";
import { Footer } from "@/components/chrome/Footer";
import { StickyCtaBar } from "@/components/chrome/StickyCtaBar";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-jakarta",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://aigana.com"),
  title: `${siteConfig.agentName} – Real Estate Agent in Abuja | Find Homes & Rentals`,
  description: siteConfig.tagline,
  icons: {
    icon: [
      { url: siteConfig.profileImage, type: "image/png" },
    ],
    shortcut: siteConfig.profileImage,
    apple: siteConfig.profileImage,
  },
  keywords: [
    "AI GANA",
    "Abdullahi Idris Gana",
    "Abuja Real Estate Agent",
    "Maitama Properties",
    "Wuse Apartments",
    "Asokoro Villa",
    "Jabi Penthouse",
    "Nigeria Real Estate Agent",
  ],
  openGraph: {
    title: `${siteConfig.agentName} – Real Estate Agent in Abuja | Find Homes & Rentals`,
    description: siteConfig.tagline,
    url: "https://aigana.com",
    siteName: siteConfig.agentName,
    images: [
      {
        url: siteConfig.profileImage,
        width: 1200,
        height: 630,
        alt: `${siteConfig.agentName} - ${siteConfig.fullName}`,
      },
    ],
    locale: "en_NG",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: `${siteConfig.agentName} – Real Estate Agent in Abuja | Find Homes & Rentals`,
    description: siteConfig.tagline,
    images: [siteConfig.profileImage],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "RealEstateAgent",
    name: siteConfig.agentName,
    image: siteConfig.profileImage,
    address: {
      "@type": "PostalAddress",
      addressLocality: "Abuja",
      addressCountry: "NG",
    },
    telephone: siteConfig.phone,
    email: siteConfig.email,
    url: "https://aigana.com",
    areaServed: "Abuja",
    description: siteConfig.tagline,
    openingHours: "Mo-Sa 09:00-18:00",
  };

  return (
    <html lang="en" className={`${inter.variable} ${plusJakartaSans.variable} scroll-smooth`}>
      <head>
        <link rel="icon" href={siteConfig.profileImage} type="image/png" />
        <link rel="apple-touch-icon" href={siteConfig.profileImage} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-screen flex flex-col bg-bg text-ink font-body antialiased">
        <Navbar />
        <main className="flex-grow">{children}</main>
        <Footer />
        <StickyCtaBar />
      </body>
    </html>
  );
}
