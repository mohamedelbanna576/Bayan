"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Globe, Menu, X } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

const navLinks = [
  { name: "Home", arabic: "الرئيسية", href: "/" },
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

  return (
    <nav className="relative z-20 flex flex-col">
      <div className="flex items-center justify-between gap-8 px-6 md:px-10 xl:px-12 pt-6">
        <div className="flex items-center gap-3 shrink-0">
          <Image src="/assets/logo.png" alt="Bayan" width={32} height={32} className="opacity-90 drop-shadow-md" />
          <span className="text-2xl text-ed-beige-warm/90 tracking-wider" style={{ fontFamily: 'Georgia, serif' }}>
            Bayan
          </span>
        </div>

        <div className="hidden md:flex items-center gap-5 xl:gap-6 text-[15px] font-semibold text-ed-beige-warm/85">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className={`relative focus-visible:outline focus-visible:outline-2 focus-visible:outline-ed-gold ${
                link.href === "/"
                  ? "text-white font-bold after:absolute after:left-0 after:-bottom-1.5 after:h-0.5 after:w-full after:bg-ed-gold"
                  : "text-ed-beige-warm/85"
              }`}
            >
              {language === "ar" ? link.arabic : link.name}
            </Link>
          ))}
          <button
            onClick={toggleLanguage}
            className="flex items-center gap-1.5 text-ed-beige-warm/85 hover:text-white transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-ed-gold"
            aria-label="Toggle Language"
          >
            <Globe className="w-3.5 h-3.5" />
            <span className="font-[family-name:var(--font-tajawal)]">{language === "ar" ? "EN" : "عربي"}</span>
          </button>
        </div>

        <div className="md:hidden flex items-center gap-2">
          <button
            onClick={toggleLanguage}
            className="text-ed-beige-warm p-2"
            aria-label="Toggle Language"
          >
            <Globe className="w-4 h-4" />
          </button>
          <button
            className="text-ed-beige-warm p-2"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle navigation menu"
          >
            {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {isMobileMenuOpen && (
        <div className="md:hidden bg-ed-green-dark/90 backdrop-blur-sm mx-4 mt-4 rounded-xl border border-white/10">
          <div className="px-4 py-3 space-y-1">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className={`block py-3 px-4 text-sm transition-colors rounded-lg ${
                  link.href === "/"
                    ? "text-white font-semibold bg-white/10"
                    : "text-ed-beige-warm/80 hover:text-white hover:bg-white/5"
                }`}
              >
                {language === "ar" ? link.arabic : link.name}
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}
