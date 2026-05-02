import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Daily Azkar | Bayan",
  description: "Read and count morning, evening, and post-prayer azkar on Bayan.",
};

export default function AzkarLayout({ children }: { children: React.ReactNode }) {
  return children;
}
