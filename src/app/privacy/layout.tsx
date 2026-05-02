import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy | Bayan",
  description: "Read Bayan's privacy policy and data practices.",
};

export default function PrivacyLayout({ children }: { children: React.ReactNode }) {
  return children;
}
