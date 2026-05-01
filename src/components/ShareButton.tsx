"use client";

import { Share2, Link as LinkIcon } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { useState } from "react";

export default function ShareButton() {
  const { t } = useLanguage();
  const [showToast, setShowToast] = useState(false);

  const handleShare = async () => {
    const shareData: ShareData = {
      title: "Bayan Platform | منصة بيان",
      text: t(
        "Explore the Holy Quran, Prayer Times, and Azkar on Bayan - A Sadaqah Jariyah project.",
        "استكشف القرآن الكريم ومواقيت الصلاة والأذكار على منصة بيان - مشروع صدقة جارية."
      ) as string,
      url: window.location.origin,
    };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
      } catch (err) {
        console.log("Error sharing:", err);
      }
    } else {
      // Fallback: Copy to clipboard
      navigator.clipboard.writeText(window.location.origin);
      setShowToast(true);
      setTimeout(() => setShowToast(false), 3000);
    }
  };

  return (
    <>
      <button
        onClick={handleShare}
        className="fixed bottom-8 right-8 z-50 p-4 rounded-full bg-gold-soft text-emerald-forest shadow-[0_0_20px_rgba(212,175,55,0.4)] hover:scale-110 transition-transform flex items-center gap-2 font-bold group"
        title={t("Share the reward", "انشر الخير") as string}
      >
        <Share2 className="w-6 h-6" />
        <span className="max-w-0 overflow-hidden group-hover:max-w-xs transition-all duration-300 ease-in-out whitespace-nowrap">
          {t("Share Reward", "انشر الخير")}
        </span>
      </button>

      {/* Toast Notification */}
      {showToast && (
        <div className="fixed bottom-24 right-8 z-50 glass-card px-6 py-3 border border-gold-soft/50 text-white flex items-center gap-2 animate-in slide-in-from-bottom-5">
          <LinkIcon className="w-4 h-4 text-gold-soft" />
          <span>{t("Link copied to clipboard!", "تم نسخ الرابط!")}</span>
        </div>
      )}
    </>
  );
}
