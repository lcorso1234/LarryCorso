import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  title: "Portfolio Highlights",
  description:
    "Dive into Larry Corso's portfolio: neon-crafted case studies, futuristic grids, and the tech stack powering transformative digital experiences.",
  keywords: [
    "portfolio",
    "case studies",
    "Larry Corso work",
    "retro projects",
    "creative technology",
  ],
};

export default function PortfolioLayout({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
