import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Pre-Construction Buyer Guide (2026) | Findle Global",
  description: "The 2026 guide to buying pre-construction in Ontario — deposits, closing costs, assignments, and the questions to ask before you sign.",
  alternates: {
    canonical: "https://www.findle.global/guide",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
