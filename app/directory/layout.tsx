import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Browse 700+ Pre-Construction Developments in Ontario | Findle Global",
  description: "Search every pre-construction condo, townhouse and detached home for sale across Ontario — filter by city, price, builder and occupancy.",
  alternates: {
    canonical: "https://www.findle.global/directory",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
