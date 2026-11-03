import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Findle Finance | Mortgages for Pre-Construction",
  description: "Estimate payments, compare financing options and plan your pre-construction purchase with Findle Finance.",
  alternates: {
    canonical: "https://www.findle.global/FindleFinance",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
