import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Digital Tasbeeh | Bayan",
  description: "Use Bayan digital tasbeeh to count dhikr with daily and lifetime totals.",
};

export default function TasbeehLayout({ children }: { children: React.ReactNode }) {
  return children;
}
