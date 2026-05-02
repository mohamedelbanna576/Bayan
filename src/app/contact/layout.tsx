import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact | Bayan",
  description: "Contact the Bayan team for feedback, support, and suggestions.",
};

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return children;
}
