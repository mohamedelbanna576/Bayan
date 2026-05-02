import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Islamic Radio | Bayan",
  description: "Listen to live Islamic radio and Quran recitation stations on Bayan.",
};

export default function RadioLayout({ children }: { children: React.ReactNode }) {
  return children;
}
