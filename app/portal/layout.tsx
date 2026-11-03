import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Agent Portal | Findle Global",
  description: "Agent login for the Findle Global portal.",
  robots: { index: false, follow: true },
  alternates: {
    canonical: "https://www.findle.global/portal",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
