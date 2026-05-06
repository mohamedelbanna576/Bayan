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
  const isArabic = language === "ar";
  const pathname = usePathname();

  const isActive = (href: string) => pathname === href || pathname.startsWith(href + "/");

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-ed-beige/95 backdrop-blur-md border-b border-ed-green/10 shadow-sm">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="flex items-center h-16">
          {/* Logo — pinned to the end (right in RTL) */}
          <Link href="/" className="flex items-center gap-2.5 shrink-0">
            <Image src="/assets/logo.png" alt="Bayan" width={28} height={28} className="h-7 w-auto opacity-85" />
            <span className="text-lg font-bold text-ed-green font-[family-name:var(--font-tajawal)]">بيان</span>
            <span className="text-[13px] font-medium text-ed-text-muted tracking-wide hidden sm:block" style={{ fontFamily: 'Georgia, serif' }}>Bayan</span>
          </Link>

          {/* Spacer */}
          <div className="flex-1" />

          {/* Desktop Links — centered group */}
          <div className="hidden lg:flex items-center h-full">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className={`relative flex items-center h-full px-4 text-sm transition-colors duration-200 ${
                  isActive(link.href)
                    ? "text-ed-green font-bold"
                    : "text-ed-text-secondary hover:text-ed-green"
                }`}
              >
                <span className={isArabic ? 'font-[family-name:var(--font-tajawal)]' : ''}>
                  {isArabic ? link.arabic : link.name}
                </span>
                {/* Active indicator — bottom bar */}
                {isActive(link.href) && (
                  <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-5 h-[2.5px] bg-ed-gold rounded-full" />
                )}
              </Link>
            ))}
          </div>

          {/* Spacer */}
          <div className="flex-1" />

          {/* Language toggle — pinned to the start (left in RTL) */}
          <div className="hidden lg:flex items-center shrink-0">
            <button
              onClick={toggleLanguage}
              className="flex items-center gap-1.5 text-sm text-ed-text-muted hover:text-ed-green transition-colors px-3 py-2"
              aria-label="Toggle Language"
            >
              <Globe className="w-3.5 h-3.5" />
              <span className="font-[family-name:var(--font-tajawal)] font-medium">
                {language === "en" ? "عربي" : "EN"}
              </span>
            </button>
          </div>

          {/* Mobile controls */}
          <div className="lg:hidden flex items-center gap-1">
            <button
              onClick={toggleLanguage}
              className="text-ed-text-muted hover:text-ed-green transition-colors p-2.5"
            >
              <Globe className="w-4 h-4" />
            </button>
            <button
              className="text-ed-green p-2.5"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle navigation menu"
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden bg-ed-beige border-t border-ed-green/8">
          <div className="px-6 py-3 space-y-0.5">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className={`flex items-center justify-between py-3 px-4 transition-colors border-r-2 ${
                  isActive(link.href)
                    ? "text-ed-green font-semibold border-ed-gold bg-ed-green/[0.03]"
                    : "text-ed-text-muted hover:text-ed-green border-transparent"
                }`}
              >
                <span className={`text-sm ${isArabic ? 'font-[family-name:var(--font-tajawal)]' : ''}`}>
                  {isArabic ? link.arabic : link.name}
                </span>
                <span className="text-xs text-ed-text-muted font-[family-name:var(--font-tajawal)]">
                  {isArabic ? link.name : link.arabic}
                </span>
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}
