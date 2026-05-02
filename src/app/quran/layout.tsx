import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Quran Recitations | Bayan",
  description: "Read and listen to Quran recitations with Bayan.",
};

export default function QuranLayout({ children }: { children: React.ReactNode }) {
  return children;
}
