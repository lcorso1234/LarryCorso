import type { Metadata } from "next";
import type { ReactNode } from "react";

const portfolioUrl = "https://rumidesign.tech/portfolio";

export const metadata: Metadata = {
  title: "Lawrence Corso Portfolio Highlights",
  description:
    "Dive into Lawrence 'Pluto Smoke' Corso's portfolio of Earth home concepts, crowdfunding campaigns, and digital strategies built for outcasts and rebels.",
  keywords: [
    "Lawrence Corso portfolio",
    "Larry Corso work",
    "Pluto Smoke projects",
    "Earth homes case studies",
    "supporting the outcasts",
    "creative technology",
    "crowdfunding strategy",
  ],
  openGraph: {
    title: "Lawrence Corso Portfolio Highlights",
    description:
      "Explore Pluto Smoke's showcase of visionary night-mode builds powering Earth homes, underdog movements, and immersive digital brands.",
    url: portfolioUrl,
    type: "website",
  },
  twitter: {
    title: "Lawrence Corso Portfolio Highlights",
    description:
      "Lawrence 'Pluto Smoke' Corso engineers neon-powered experiences for Earth homes, outcasts, and bold founders.",
    card: "summary_large_image",
  },
  alternates: {
    canonical: portfolioUrl,
  },
};

export default function PortfolioLayout({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
