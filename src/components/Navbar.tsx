"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X, BookOpen, Radio, Bookmark, Clock, Hash, Heart, Globe } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

const navLinks = [
  { name: "Quran", arabic: "القرآن", href: "/quran", icon: BookOpen },
  { name: "Radio", arabic: "الإذاعة", href: "/radio", icon: Radio },
  { name: "Tafsir", arabic: "التفسير", href: "/tafsir", icon: Bookmark },
  { name: "Prayer Times", arabic: "مواقيت الصلاة", href: "/prayer-times", icon: Clock },
  { name: "Tasbeeh", arabic: "التسبيح", href: "/tasbeeh", icon: Hash },
  { name: "Azkar", arabic: "الأذكار", href: "/azkar", icon: Heart },
];

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { language, toggleLanguage } = useLanguage();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-emerald-deep border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-2">
            <Image src="/assets/logo.png" alt="Bayan Logo" width={32} height={32} className="h-8 w-auto" />
            <span className="text-2xl font-bold text-gold font-[family-name:var(--font-tajawal)]">
              بيان
            </span>
            <span className="text-sm font-semibold text-gold-soft hidden sm:block">
              Bayan
            </span>
          </Link>

          <div className="hidden lg:flex items-center gap-6">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="group flex items-center gap-1.5 text-white/70 hover:text-gold-soft transition-colors duration-200"
              >
                <link.icon className="w-4 h-4" />
                <span className={`text-sm font-medium ${language === 'ar' ? 'font-[family-name:var(--font-tajawal)]' : ''}`}>
                  {language === "en" ? link.name : link.arabic}
                </span>
              </Link>
            ))}
            
            <button
              onClick={toggleLanguage}
              className="flex items-center gap-1.5 text-white/70 hover:text-gold-soft transition-colors duration-200 border-l border-white/20 pl-6 ml-2"
              aria-label="Toggle Language"
            >
              <Globe className="w-4 h-4" />
              <span className="text-sm font-medium font-[family-name:var(--font-tajawal)]">
                {language === "en" ? "عربي" : "English"}
              </span>
            </button>
          </div>

          <div className="lg:hidden flex items-center gap-4">
            <button
              onClick={toggleLanguage}
              className="text-white/70 hover:text-gold-soft transition-colors duration-200 flex items-center gap-1"
            >
              <Globe className="w-4 h-4" />
              <span className="text-sm font-medium font-[family-name:var(--font-tajawal)]">
                {language === "en" ? "ع" : "EN"}
              </span>
            </button>
            <button
              className="text-white hover:text-gold-soft transition-colors"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {isMobileMenuOpen && (
        <div className="lg:hidden bg-emerald-deep border-t border-white/10">
          <div className="px-4 py-4 space-y-2">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className="flex items-center gap-3 text-white/80 hover:text-gold-soft transition-colors py-3 px-2 rounded-lg hover:bg-emerald-mid"
              >
                <link.icon className="w-5 h-5" />
                <span className={`text-base font-medium ${language === 'ar' ? 'font-[family-name:var(--font-tajawal)]' : ''}`}>
                  {language === "en" ? link.name : link.arabic}
                </span>
                <span className="text-sm text-gold-soft/60 font-[family-name:var(--font-tajawal)] ml-auto">
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
