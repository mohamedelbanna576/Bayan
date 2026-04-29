"use client";

import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";

const footerLinks = [
  { name: "About", arabic: "عن المنصة", href: "#" },
  { name: "Privacy", arabic: "الخصوصية", href: "#" },
  { name: "Terms", arabic: "الشروط", href: "#" },
  { name: "Contact", arabic: "اتصل بنا", href: "#" },
];

export default function Footer() {
  const { language, t } = useLanguage();

  return (
    <footer className="py-12 border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <Link href="/" className="flex items-center gap-3">
            <span className="text-xl font-bold text-gold-soft font-[family-name:var(--font-cairo)]">
              ذِكْر
            </span>
            <span className="text-sm font-medium text-white/60">
              {t("Dhikr", "ذكر")}
            </span>
          </Link>

          <div className="flex items-center gap-6">
            {footerLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className={`text-sm text-white/60 hover:text-gold-soft transition-colors ${language === 'ar' ? 'font-[family-name:var(--font-cairo)]' : ''}`}
              >
                {t(link.name, link.arabic)}
              </a>
            ))}
          </div>
        </div>

        <div className="mt-8 text-center text-xs text-white/30">
          {t("© 2026 Dhikr Platform. Made by Mohamed El Banna.", "© 2026 منصة ذِكْر. صنع بواسطة محمد البنا.")}
        </div>
      </div>
    </footer>
  );
}