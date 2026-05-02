import type { Metadata } from "next";
import { Inter, Outfit, Tajawal, Amiri, Cairo, Scheherazade_New } from "next/font/google";
import "./globals.css";
import { LanguageProvider } from "@/context/LanguageContext";
import { AudioProvider } from "@/context/AudioContext";
import ShareButton from "@/components/ShareButton";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const outfit = Outfit({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
});

const tajawal = Tajawal({
  variable: "--font-tajawal",
  subsets: ["arabic", "latin"],
  weight: ["400", "500", "700", "800"],
});

const amiri = Amiri({
  variable: "--font-amiri",
  subsets: ["arabic", "latin"],
  weight: ["400", "700"],
});

const cairo = Cairo({
  variable: "--font-cairo",
  subsets: ["arabic", "latin"],
  weight: ["400", "600", "700", "800", "900"],
});

const scheherazade = Scheherazade_New({
  variable: "--font-scheherazade",
  subsets: ["arabic", "latin"],
  weight: ["400", "700"],
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"),
  title: "Bayan | بيان",
  description: "A modern Islamic digital platform featuring Quran recitations, Islamic Radio, Tafsir, and Prayer Times",
  openGraph: {
    title: "Bayan | بيان",
    description: "A modern Islamic digital platform featuring Quran recitations, Islamic Radio, Tafsir, and Prayer Times",
    images: ["/assets/logo.png"],
  },
  twitter: {
    card: "summary",
    title: "Bayan | بيان",
    description: "A modern Islamic digital platform featuring Quran recitations, Islamic Radio, Tafsir, and Prayer Times",
    images: ["/assets/logo.png"],
  },
  icons: {
    icon: "/assets/logo.png",
    apple: "/assets/logo.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ar" dir="rtl" className={`${inter.variable} ${outfit.variable} ${tajawal.variable} ${amiri.variable} ${cairo.variable} ${scheherazade.variable}`} suppressHydrationWarning>
      <body className="min-h-screen antialiased" dir="rtl" suppressHydrationWarning>
        <LanguageProvider>
          <AudioProvider>
            {children}
            <ShareButton />
          </AudioProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}
