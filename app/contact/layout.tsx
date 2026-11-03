import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Us | Findle Global",
  description: "Questions about a pre-construction development? Reach the Findle Global team — buyers, investors, agents and builders welcome.",
  alternates: {
    canonical: "https://www.findle.global/contact",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
