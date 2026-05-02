import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Quran Tafsir | Bayan",
  description: "Explore Quran tafsir and verse meanings on Bayan.",
};

export default function TafsirLayout({ children }: { children: React.ReactNode }) {
  return children;
}
