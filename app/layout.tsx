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

const siteName = "Lawrence Corso • Pluto Smoke";
const siteUrl = "https://rumidesign.tech";
const siteTitle =
  "Lawrence Corso (Pluto Smoke) | Night-Mode Visionary & Guardian of Outcasts";
const siteDescription =
  "Lawrence “Pluto Smoke” Corso crafts night-mode product strategy, Earth home ecosystems, and crowdfunding campaigns that champion outcasts, rebels, and future-focused communities.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: siteTitle,
    template: "%s | Pluto Smoke",
  },
  description: siteDescription,
  keywords: [
    "Lawrence Corso",
    "Larry Corso",
    "Pluto Smoke",
    "night-mode strategist",
    "night developer",
    "creative technologist",
    "digital product visionary",
    "Earth homes innovation",
    "supporting the outcasts",
    "crowdfunding strategist",
    "brand storytelling",
    "portfolio",
    "Pluto Smoke portfolio",
  ],
  authors: [{ name: "Lawrence Corso", url: siteUrl }],
  creator: "Lawrence Corso",
  publisher: "Lawrence Corso",
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: siteTitle,
    description: siteDescription,
    url: siteUrl,
    siteName,
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/marketing-logo.png",
        width: 1200,
        height: 630,
        alt: "Pluto Smoke neon crest over a retro gradient background",
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
  category: "Creative Portfolio",
  alternates: {
    canonical: siteUrl,
  },
  viewport: {
    width: "device-width",
    initialScale: 1,
  },
  themeColor: "#000000",
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
        {/* JSON-LD Person schema for SEO. Update contact channels as needed. */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              "name": "Lawrence Corso",
              "alternateName": ["Larry Corso", "Pluto Smoke"],
              "url": siteUrl,
              "description": siteDescription,
              "jobTitle":
                "Creative Technologist & Night-Mode Product Visionary",
              "brand": {
                "@type": "Brand",
                "name": "Pluto Smoke",
                "slogan":
                  "Night-mode product visionary supporting the outcasts.",
                "url": siteUrl,
                "logo": `${siteUrl}/logo.svg`,
              },
              "sameAs": [
                "https://twitter.com/rumidesign",
                "https://www.linkedin.com/in/larrycorso",
              ],
              "knowsAbout": [
                "Earth homes",
                "crowdfunding campaigns",
                "supporting the outcasts",
                "digital brand strategy",
                "creative technology",
              ],
              "contactPoint": {
                "@type": "ContactPoint",
                "contactType": "partnership inquiries",
                "email": "mailto:lawrence@rumidesign.tech",
                "areaServed": ["US", "Global"],
                "availableLanguage": ["English"],
              },
            }),
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
