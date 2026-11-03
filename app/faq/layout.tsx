import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Pre-Construction FAQs | Findle Global",
  description: "Answers on deposits, occupancy, assignments, HST rebates and buying pre-construction in Ontario.",
  alternates: {
    canonical: "https://www.findle.global/faq",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
