import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const siteName = "Larry Corso";
const siteTitle = "Larry Corso | Night-Mode Product Visionary";
const siteDescription =
  "Meet Larry Corso, the night-working product visionary crafting neon-soaked digital experiences for bold teams, weirdos, and underdogs.";

export const metadata: Metadata = {
  title: {
    default: siteTitle,
    template: "%s | Larry Corso",
  },
  description: siteDescription,
  keywords: [
    "Larry Corso",
    "night developer",
    "retro design",
    "digital product visionary",
    "creative technologist",
    "portfolio",
  ],
  authors: [{ name: "Larry Corso" }],
  creator: "Larry Corso",
  publisher: "Larry Corso",
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: siteTitle,
    description: siteDescription,
    url: "https://rumidesign.tech",
    siteName,
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/marketing-logo.png",
        width: 1200,
        height: 630,
        alt: "Larry Corso neon crest over a retro gradient background",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: siteTitle,
    description: siteDescription,
    creator: "@rumidesign",
    images: ["/marketing-logo.png"],
  },
  icons: {
    icon: [
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/favicon.ico", type: "image/x-icon" },
    ],
    shortcut: ["/favicon.ico"],
  },
  category: "portfolio",
  alternates: {
    canonical: "/",
  },
  viewport: {
    width: "device-width",
    initialScale: 1,
  },
  themeColor: "#0f172a",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        {/* Google tag (gtag.js) */}
        <script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-06WHFTGY49"
        ></script>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());

              gtag('config', 'G-06WHFTGY49');
            `,
          }}
        />
        {/*
          JSON-LD address / LocalBusiness schema for SEO.
          IMPORTANT: update the placeholder address/telephone/email below with your real business/contact data.
        */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "LocalBusiness",
              "name": "Larry Corso",
              "url": "https://rumidesign.tech",
              "logo": "https://rumidesign.tech/logo.svg",
              "sameAs": [
                "https://twitter.com/rumidesign",
                "https://www.linkedin.com/in/larrycorso"
              ],
              "address": {
                "@type": "PostalAddress",
                "streetAddress": "123 Night St",
                "addressLocality": "YourCity",
                "addressRegion": "YourState",
                "postalCode": "12345",
                "addressCountry": "US"
              },
              "telephone": "+1-555-555-5555",
              "contactPoint": {
                "@type": "ContactPoint",
                "telephone": "+1-555-555-5555",
                "contactType": "customer service",
                "email": "mailto:hello@rumidesign.tech"
              }
            })
          }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
