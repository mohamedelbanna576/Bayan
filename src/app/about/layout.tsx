import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About | Bayan",
  description: "Learn about Bayan, a modern Islamic digital companion.",
};

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return children;
}
