import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Partner With Findle Global | Builders & Agents",
  description: "List your development or partner with Canada’s pre-construction marketplace. Reach 700+ projects’ worth of buyer demand.",
  alternates: {
    canonical: "https://www.findle.global/partner",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
