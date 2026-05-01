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
      try { await navigator.share(shareData); } catch (err) { console.log("Error sharing:", err); }
    } else {
      navigator.clipboard.writeText(window.location.origin);
      setShowToast(true);
      setTimeout(() => setShowToast(false), 3000);
    }
  };

  return (
    <>
      <button
        onClick={handleShare}
        className="fixed bottom-8 right-8 z-50 w-14 h-14 rounded-full flex items-center justify-center bg-white text-ed-green border border-ed-green/10 shadow-2xl hover:bg-ed-beige transition-all hover:scale-105"
        title={t("Share the reward", "انشر الخير") as string}
      >
        <Share2 className="w-5 h-5" />
      </button>

      {showToast && (
        <div className="fixed bottom-28 right-8 z-50 bg-white border border-ed-green/10 text-ed-green px-6 py-4 text-sm font-medium flex items-center gap-3 shadow-2xl animate-fade-up rounded-sm">
          <LinkIcon className="w-4 h-4 text-ed-gold" />
          <span>{t("Link copied to clipboard!", "تم نسخ الرابط!")}</span>
        </div>
      )}
    </>
  );
}
