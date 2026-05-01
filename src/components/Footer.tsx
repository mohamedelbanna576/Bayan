"use client";

import Link from "next/link";
import Image from "next/image";
import { useLanguage } from "@/context/LanguageContext";

const footerLinks = [
  { name: "About", arabic: "عن المنصة", href: "/about" },
  { name: "Privacy", arabic: "الخصوصية", href: "/privacy" },
  { name: "Terms", arabic: "الشروط", href: "/terms" },
  { name: "Contact", arabic: "اتصل بنا", href: "/contact" },
];

export default function Footer() {
  const { language, t } = useLanguage();

  return (
    <footer className="border-t border-ed-green/8 bg-ed-beige">
      <div className="max-w-7xl mx-auto px-6 lg:px-10 py-16">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
          <div>
            <Link href="/" className="flex items-center gap-2.5 mb-3">
              <Image src="/assets/logo.png" alt="Bayan" width={24} height={24} className="h-6 w-auto opacity-70" />
              <span className="text-lg font-bold text-ed-green font-[family-name:var(--font-tajawal)]">بيان</span>
            </Link>
            <p className="text-xs text-ed-text-muted max-w-xs leading-relaxed">
              {t("A premium Islamic digital companion for Quran, prayer, and daily remembrance.", "رفيقك الرقمي الإسلامي للقرآن والصلاة والأذكار اليومية.")}
            </p>
          </div>

          <div className="flex items-center gap-8">
            {footerLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className={`text-sm text-ed-text-muted hover:text-ed-green transition-colors ${language === 'ar' ? 'font-[family-name:var(--font-tajawal)]' : ''}`}
              >
                {t(link.name, link.arabic)}
              </a>
            ))}
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-ed-green/5 text-xs text-ed-text-muted">
          {t("© 2026 Bayan Platform. Made by Mohamed El Banna.", "© 2026 منصة بيان. صنع بواسطة محمد البنا.")}
        </div>
      </div>
    </footer>
  );
}
