import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Findle Global | Pre-Construction Marketplace",
  description: "Findle Global is Canada’s pre-construction marketplace — 700+ new developments, live data, and expert guidance for buyers and investors.",
  alternates: {
    canonical: "https://www.findle.global/about",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
