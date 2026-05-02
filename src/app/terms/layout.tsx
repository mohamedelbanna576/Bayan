import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Use | Bayan",
  description: "Read the terms of use for Bayan platform.",
};

export default function TermsLayout({ children }: { children: React.ReactNode }) {
  return children;
}
