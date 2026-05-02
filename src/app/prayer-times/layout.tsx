import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Prayer Times | Bayan",
  description: "Find accurate daily Islamic prayer times with Bayan.",
};

export default function PrayerTimesLayout({ children }: { children: React.ReactNode }) {
  return children;
}
