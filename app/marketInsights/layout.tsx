import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Market Insights | Pre-Construction Data | Findle Global",
  description: "Track pre-construction prices, compare neighbourhoods and follow market trends with Findle’s live data.",
  alternates: {
    canonical: "https://www.findle.global/marketInsights",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
