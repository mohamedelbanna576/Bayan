"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Menu, X, Globe } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

const navLinks = [
  { name: "Quran", arabic: "القرآن", href: "/quran" },
  { name: "Radio", arabic: "الإذاعة", href: "/radio" },
  { name: "Tafsir", arabic: "التفسير", href: "/tafsir" },
  { name: "Prayer Times", arabic: "الصلاة", href: "/prayer-times" },
  { name: "Tasbeeh", arabic: "التسبيح", href: "/tasbeeh" },
  { name: "Azkar", arabic: "الأذكار", href: "/azkar" },
];

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { language, toggleLanguage } = useLanguage();
  const pathname = usePathname();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-ed-beige/90 backdrop-blur-sm border-b border-ed-green/5">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5">
            <Image src="/assets/logo.png" alt="Bayan" width={28} height={28} className="h-7 w-auto opacity-80" />
            <span className="text-xl font-bold text-ed-green font-[family-name:var(--font-tajawal)]">بيان</span>
            <span className="text-sm font-medium text-ed-text-muted tracking-wide hidden sm:block">Bayan</span>
          </Link>

          {/* Desktop Links */}
          <div className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className={`px-3.5 py-2 text-sm transition-colors duration-200 ${
                  pathname === link.href
                    ? "text-ed-green font-semibold"
                    : "text-ed-text-muted hover:text-ed-green"
                }`}
              >
                <span className={language === 'ar' ? 'font-[family-name:var(--font-tajawal)]' : ''}>
                  {language === "en" ? link.name : link.arabic}
                </span>
              </Link>
            ))}

            <div className="w-px h-5 bg-ed-green/10 mx-3"></div>

            <button
              onClick={toggleLanguage}
              className="flex items-center gap-1.5 text-sm text-ed-text-muted hover:text-ed-green transition-colors px-3 py-2"
              aria-label="Toggle Language"
            >
              <Globe className="w-3.5 h-3.5" />
              <span className="font-[family-name:var(--font-tajawal)]">
                {language === "en" ? "عربي" : "EN"}
              </span>
            </button>
          </div>

          {/* Mobile */}
          <div className="lg:hidden flex items-center gap-3">
            <button
              onClick={toggleLanguage}
              className="text-ed-text-muted hover:text-ed-green transition-colors flex items-center gap-1 p-2"
            >
              <Globe className="w-4 h-4" />
            </button>
            <button
              className="text-ed-green p-2"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle navigation menu"
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {isMobileMenuOpen && (
        <div className="lg:hidden bg-ed-beige border-t border-ed-green/5">
          <div className="px-6 py-4 space-y-1">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className={`flex items-center justify-between py-3 px-3 transition-colors ${
                  pathname === link.href
                    ? "text-ed-green font-semibold bg-ed-green/5"
                    : "text-ed-text-muted hover:text-ed-green"
                }`}
              >
                <span className={`text-sm ${language === 'ar' ? 'font-[family-name:var(--font-tajawal)]' : ''}`}>
                  {language === "en" ? link.name : link.arabic}
                </span>
                <span className="text-xs text-ed-text-muted font-[family-name:var(--font-tajawal)]">
                  {language === "en" ? link.arabic : link.name}
                </span>
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}
