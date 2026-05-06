"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Globe, Menu, X } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

const navLinks = [
  { name: "Quran", arabic: "القرآن", href: "/quran" },
  { name: "Radio", arabic: "الإذاعة", href: "/radio" },
  { name: "Tafsir", arabic: "التفسير", href: "/tafsir" },
  { name: "Prayer Times", arabic: "الصلاة", href: "/prayer-times" },
  { name: "Tasbeeh", arabic: "التسبيح", href: "/tasbeeh" },
  { name: "Azkar", arabic: "الأذكار", href: "/azkar" },
];

export default function LandingNav() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { language, toggleLanguage } = useLanguage();
  const isArabic = language === "ar";

  return (
    <nav className="relative z-20 flex flex-col">
      <div className="flex items-center px-6 md:px-10 xl:px-12 pt-6 pb-2">
        {/* Logo — pinned to the end (right in RTL) */}
        <div className="flex items-center gap-3 shrink-0">
          <Image src="/assets/logo.png" alt="Bayan" width={30} height={30} className="opacity-90 drop-shadow-md" />
          <span className="text-xl text-ed-beige-warm/90 tracking-wide" style={{ fontFamily: 'Georgia, serif' }}>
            Bayan
          </span>
        </div>

        {/* Spacer */}
        <div className="flex-1" />

        {/* Desktop Links — centered */}
        <div className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="text-[14px] font-medium text-ed-beige-warm/70 hover:text-white px-3.5 py-2 transition-colors duration-200"
            >
              <span className={isArabic ? 'font-[family-name:var(--font-tajawal)]' : ''}>
                {isArabic ? link.arabic : link.name}
              </span>
            </Link>
          ))}
        </div>

        {/* Spacer */}
        <div className="flex-1" />

        {/* Language toggle — pinned to the start (left in RTL) */}
        <div className="hidden md:flex items-center shrink-0">
          <button
            onClick={toggleLanguage}
            className="flex items-center gap-1.5 text-sm text-ed-beige-warm/70 hover:text-white transition-colors px-3 py-2"
            aria-label="Toggle Language"
          >
            <Globe className="w-3.5 h-3.5" />
            <span className="font-[family-name:var(--font-tajawal)] font-medium">{isArabic ? "EN" : "عربي"}</span>
          </button>
        </div>

        {/* Mobile controls */}
        <div className="md:hidden flex items-center gap-1">
          <button
            onClick={toggleLanguage}
            className="text-ed-beige-warm/80 hover:text-white p-2.5 transition-colors"
            aria-label="Toggle Language"
          >
            <Globe className="w-4 h-4" />
          </button>
          <button
            className="text-ed-beige-warm/80 hover:text-white p-2.5 transition-colors"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle navigation menu"
          >
            {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-ed-green-dark/80 backdrop-blur-md mx-4 mt-2 rounded-xl border border-white/10">
          <div className="px-3 py-3 space-y-0.5">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className="block py-3 px-4 text-sm text-ed-beige-warm/80 hover:text-white hover:bg-white/[0.06] transition-all rounded-lg"
              >
                <span className={isArabic ? 'font-[family-name:var(--font-tajawal)]' : ''}>
                  {isArabic ? link.arabic : link.name}
                </span>
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}
