"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { ArrowRight, Sun, Moon, CloudSun } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

interface PrayerTimesData {
  Fajr: string;
  Sunrise: string;
  Dhuhr: string;
  Asr: string;
  Maghrib: string;
  Isha: string;
}

const PRAYER_TIMES_TIMEOUT_MS = 8000;
const cairoFallbackTimes: PrayerTimesData = {
  Fajr: "04:36",
  Sunrise: "06:12",
  Dhuhr: "12:52",
  Asr: "16:28",
  Maghrib: "19:33",
  Isha: "20:57",
};

export default function LandingPrayerTimes() {
  const [times, setTimes] = useState<PrayerTimesData>(cairoFallbackTimes);
  const { language, t } = useLanguage();

  const fetchTimes = useCallback(async () => {
    const controller = new AbortController();
    const timeoutId = window.setTimeout(() => controller.abort(), PRAYER_TIMES_TIMEOUT_MS);

    try {
      const res = await fetch(`https://api.aladhan.com/v1/timingsByCity?city=Cairo&country=Egypt`, {
        signal: controller.signal,
        cache: "no-store",
      });
      const data = await res.json();
      if (data.code === 200) {
        setTimes(data.data.timings);
      }
    } catch (err) {
      console.error(err);
    } finally {
      window.clearTimeout(timeoutId);
    }
  }, []);

  useEffect(() => {
    const timeoutId = window.setTimeout(fetchTimes, 0);
    return () => window.clearTimeout(timeoutId);
  }, [fetchTimes]);

  const convertTo12Hour = (time24: string) => {
    const cleanTime = time24.split(" ")[0];
    const [hours, minutes] = cleanTime.split(":");
    let h = parseInt(hours, 10);
    h = h % 12 || 12;
    const ampm = parseInt(hours, 10) >= 12 ? "م" : "ص";
    return `${h}:${minutes} ${ampm}`;
  };

  const getTimeInMinutes = (time24: string) => {
    const cleanTime = time24.split(" ")[0];
    const [hours, minutes] = cleanTime.split(":").map(Number);
    if (Number.isNaN(hours) || Number.isNaN(minutes)) {
      return null;
    }
    return hours * 60 + minutes;
  };

  const getPrayerData = () => {
    return [
      { name: "Fajr", time: convertTo12Hour(times.Fajr), icon: Sun },
      { name: "Dhuhr", time: convertTo12Hour(times.Dhuhr), icon: Sun },
      { name: "Asr", time: convertTo12Hour(times.Asr), icon: CloudSun },
      { name: "Maghrib", time: convertTo12Hour(times.Maghrib), icon: Moon },
      { name: "Isha", time: convertTo12Hour(times.Isha), icon: Moon },
    ];
  };

  const prayerData = getPrayerData();
  const activePrayerName = (() => {
    const currentDate = new Date();
    const currentMinutes = currentDate.getHours() * 60 + currentDate.getMinutes();
    const schedule = [
      { name: "Fajr", minutes: getTimeInMinutes(times.Fajr) },
      { name: "Dhuhr", minutes: getTimeInMinutes(times.Dhuhr) },
      { name: "Asr", minutes: getTimeInMinutes(times.Asr) },
      { name: "Maghrib", minutes: getTimeInMinutes(times.Maghrib) },
      { name: "Isha", minutes: getTimeInMinutes(times.Isha) },
    ];

    let activeName = "Isha";

    for (const prayer of schedule) {
      if (prayer.minutes !== null && currentMinutes >= prayer.minutes) {
        activeName = prayer.name;
      }
    }

    return activeName;
  })();

  return (
    <section className="bg-ed-beige-light px-6 py-16 md:px-12 lg:px-16 xl:px-20 min-h-[38vh] flex flex-col justify-center border-t border-ed-green/5 shadow-[inset_0_1px_0_rgba(44,54,42,0.04)]">
      <div className="text-center mb-10">
        <h3 className="text-3xl text-ed-green" style={{ fontFamily: 'Georgia, serif' }}>
          {t("Prayer Times", "مواقيت الصلاة")}
        </h3>
        <p className="text-sm text-ed-text-muted mt-2">{t("Cairo, Egypt", "القاهرة، مصر")}</p>
      </div>

      <div className="relative max-w-2xl mx-auto w-full">
        {/* Timeline line */}
        <div className="hidden sm:block absolute top-9 left-10 right-10 h-px bg-ed-green/10"></div>

        <div className="grid grid-cols-2 sm:grid-cols-5 gap-4 relative z-10">
          {prayerData.map((prayer, i) => {
            const isActive = prayer.name === activePrayerName;

            return (
            <div key={i} className={`flex flex-col items-center relative rounded-2xl border px-3 py-5 ${isActive ? "border-ed-gold-muted bg-ed-gold-muted/15 shadow-[0_10px_24px_rgba(44,54,42,0.08)]" : "border-ed-green/10 bg-white shadow-[0_10px_24px_rgba(44,54,42,0.06)]"}`}>
              <prayer.icon className={`w-5 h-5 mb-2 ${isActive ? "text-ed-gold" : "text-ed-green-dark"}`} />
              <div className={`w-2 h-2 rounded-full mb-3 ${isActive ? "bg-ed-gold" : "bg-ed-green"}`}></div>
              <span className={`text-sm font-semibold text-ed-green ${language === "ar" ? "font-[family-name:var(--font-tajawal)]" : ""}`} style={{ fontFamily: language === "ar" ? undefined : 'Georgia, serif' }}>{t(prayer.name, prayer.name === "Fajr" ? "الفجر" : prayer.name === "Dhuhr" ? "الظهر" : prayer.name === "Asr" ? "العصر" : prayer.name === "Maghrib" ? "المغرب" : "العشاء")}</span>
              <span className={`text-xl md:text-2xl text-ed-green-dark mt-1 tracking-tight ${isActive ? "font-extrabold" : "font-bold"}`}>{prayer.time}</span>
            </div>
            );
          })}
        </div>
      </div>

      <div className="text-center mt-10">
        <Link href="/prayer-times" className="inline-flex items-center gap-1.5 text-sm text-ed-green-dark font-semibold focus-visible:outline focus-visible:outline-2 focus-visible:outline-ed-gold">
          {t("View All Times", "عرض كل المواقيت")} <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>
    </section>
  );
}
