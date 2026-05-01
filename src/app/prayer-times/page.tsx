"use client";

import { useState, useEffect, useCallback } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { MapPin, Loader2, Navigation } from "lucide-react";

interface PrayerTimesData {
  Fajr: string;
  Sunrise: string;
  Dhuhr: string;
  Asr: string;
  Maghrib: string;
  Isha: string;
}

type PrayerName = keyof PrayerTimesData;

interface AladhanTimings extends PrayerTimesData {
  [key: string]: string;
}

interface AladhanDate {
  hijri?: {
    day: string;
    month: { en: string; ar: string };
    year: string;
  };
}

const commonLocations = [
  { country: "Egypt", city: "Cairo", label: "Cairo, Egypt - القاهرة، مصر" },
  { country: "Egypt", city: "Alexandria", label: "Alexandria, Egypt - الإسكندرية، مصر" },
  { country: "Saudi Arabia", city: "Makkah", label: "Makkah, Saudi Arabia - مكة المكرمة، السعودية" },
  { country: "Saudi Arabia", city: "Madinah", label: "Madinah, Saudi Arabia - المدينة المنورة، السعودية" },
  { country: "Saudi Arabia", city: "Riyadh", label: "Riyadh, Saudi Arabia - الرياض، السعودية" },
  { country: "United Arab Emirates", city: "Dubai", label: "Dubai, UAE - دبي، الإمارات" },
  { country: "Palestine", city: "Jerusalem", label: "Jerusalem, Palestine - القدس، فلسطين" },
  { country: "Jordan", city: "Amman", label: "Amman, Jordan - عمّان، الأردن" },
  { country: "Morocco", city: "Casablanca", label: "Casablanca, Morocco - الدار البيضاء، المغرب" },
  { country: "Algeria", city: "Algiers", label: "Algiers, Algeria - الجزائر، الجزائر" },
  { country: "Turkey", city: "Istanbul", label: "Istanbul, Turkey - إسطنبول، تركيا" },
  { country: "United Kingdom", city: "London", label: "London, UK - لندن، بريطانيا" },
  { country: "United States", city: "New York", label: "New York, USA - نيويورك، أمريكا" },
];

export default function PrayerTimes() {
  const [times, setTimes] = useState<PrayerTimesData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [locationName, setLocationName] = useState<string>("Detecting location...");
  const [dateStr] = useState<string>(() => {
    const now = new Date();
    return now.toLocaleDateString("en-US", { weekday: "long", year: "numeric", month: "long", day: "numeric" });
  });
  const [hijriDate, setHijriDate] = useState<string>("");

  const setPrayerData = useCallback((pt: AladhanTimings, date?: AladhanDate) => {
    setTimes({ Fajr: pt.Fajr, Sunrise: pt.Sunrise, Dhuhr: pt.Dhuhr, Asr: pt.Asr, Maghrib: pt.Maghrib, Isha: pt.Isha });
    if (date?.hijri) setHijriDate(`${date.hijri.day} ${date.hijri.month.en} ${date.hijri.year} AH`);
  }, []);

  const fetchPrayerTimesByCoords = useCallback(async (lat: number, lng: number) => {
    try {
      const timestamp = Math.floor(Date.now() / 1000);
      const res = await fetch(`https://api.aladhan.com/v1/timings/${timestamp}?latitude=${lat}&longitude=${lng}`);
      const data = await res.json();
      if (data.code === 200) setPrayerData(data.data.timings, data.data.date);
      else setError("Could not fetch prayer times.");
    } catch (err) { console.error(err); setError("Failed to connect to prayer times service."); }
    finally { setLoading(false); }
  }, [setPrayerData]);

  const fetchPrayerTimesByCity = useCallback(async (city: string, country: string) => {
    setLoading(true); setError(null);
    try {
      const res = await fetch(`https://api.aladhan.com/v1/timingsByCity?city=${encodeURIComponent(city)}&country=${encodeURIComponent(country)}`);
      const data = await res.json();
      if (data.code === 200) { setPrayerData(data.data.timings, data.data.date); setLocationName(`${city}, ${country}`); }
      else setError("Could not fetch prayer times for this location.");
    } catch (err) { console.error(err); setError("Failed to connect to prayer times service."); }
    finally { setLoading(false); }
  }, [setPrayerData]);

  const handleDetectLocation = useCallback((isInitial = false) => {
    setLoading(true); setError(null); setLocationName("Detecting GPS location...");
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          fetchPrayerTimesByCoords(latitude, longitude);
          try {
            const res = await fetch(`https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=en`);
            const data = await res.json();
            setLocationName(`${data.city || data.locality || "Unknown City"}, ${data.countryName || ""}`);
          } catch { setLocationName("Your GPS Location"); }
        },
        (err) => {
          console.error("Geolocation error:", err.message);
          if (isInitial) { fetchPrayerTimesByCity("Cairo", "Egypt"); setError("Location access denied. Displaying default location (Cairo)."); }
          else { setError("Location access denied. Please enable location services."); setLoading(false); }
        }
      );
    } else {
      if (isInitial) fetchPrayerTimesByCity("Cairo", "Egypt");
      else { setError("Geolocation is not supported by your browser."); setLoading(false); }
    }
  }, [fetchPrayerTimesByCity, fetchPrayerTimesByCoords]);

  useEffect(() => {
    const timer = window.setTimeout(() => handleDetectLocation(true), 0);
    return () => window.clearTimeout(timer);
  }, [handleDetectLocation]);

  const convertTo12Hour = (time24: string) => {
    const cleanTime = time24.split(" ")[0];
    const [hours, minutes] = cleanTime.split(":");
    let h = parseInt(hours, 10);
    const ampm = h >= 12 ? "PM" : "AM";
    h = h % 12 || 12;
    return `${h}:${minutes} ${ampm}`;
  };

  const prayersList = times
    ? [
        { name: "Fajr", arabic: "الفَجْر", time: times.Fajr },
        { name: "Sunrise", arabic: "الشروق", time: times.Sunrise },
        { name: "Dhuhr", arabic: "الظُّهْر", time: times.Dhuhr },
        { name: "Asr", arabic: "العَصْر", time: times.Asr },
        { name: "Maghrib", arabic: "المَغْرِب", time: times.Maghrib },
        { name: "Isha", arabic: "العِشَاء", time: times.Isha },
      ]
    : [];

  const nextPrayer = times
    ? (Object.entries(times) as [PrayerName, string][])
        .map(([name, time]) => ({ name, time, minutes: (() => { const c = time.split(" ")[0]; const [h, m] = c.split(":").map(Number); return h * 60 + m; })() }))
        .find((p) => p.minutes > new Date().getHours() * 60 + new Date().getMinutes()) ||
      { name: "Fajr" as PrayerName, time: times.Fajr, minutes: 0 }
    : null;

  return (
    <main className="min-h-screen bg-ed-beige pt-20">
      <Navbar />

      <div className="max-w-5xl mx-auto px-6 lg:px-10 pt-12 pb-24">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-5xl md:text-6xl font-[family-name:var(--font-tajawal)] text-ed-green font-bold mb-3">
            مواقيت الصلاة
          </h1>
          <p className="text-sm text-ed-text-muted tracking-wide">Prayer Times</p>
        </div>

        {/* Location Controls */}
        <div className="flex flex-col sm:flex-row gap-3 mb-10">
          <select
            className="bg-white border border-ed-green/10 text-ed-text text-sm px-4 py-3 focus:outline-none focus:border-ed-green/30 transition-colors w-full sm:w-auto"
            onChange={(e) => {
              if (e.target.value === "gps") handleDetectLocation(false);
              else { const loc = commonLocations[parseInt(e.target.value)]; fetchPrayerTimesByCity(loc.city, loc.country); }
            }}
            defaultValue="default"
          >
            <option value="default" disabled>Select a City / اختر مدينة</option>
            {commonLocations.map((loc, idx) => (<option key={idx} value={idx}>{loc.label}</option>))}
          </select>
          <button
            onClick={() => handleDetectLocation(false)}
            className="flex items-center justify-center gap-2 px-6 py-3 bg-white border border-ed-green/10 text-ed-text text-sm hover:bg-ed-beige-light transition-colors"
          >
            <Navigation className="w-3.5 h-3.5 text-ed-green-soft" />
            Use My Location
          </button>
        </div>

        {error && !times && (
          <div className="bg-red-50 border border-red-200 text-red-700 p-4 mb-8 text-sm">{error}</div>
        )}

        {loading ? (
          <div className="flex justify-center items-center py-32">
            <Loader2 className="w-8 h-8 text-ed-green-soft animate-spin" />
          </div>
        ) : times ? (
          <div>
            {error && (
              <div className="bg-amber-50 border border-amber-200 text-amber-700 p-3 mb-8 text-sm">{error}</div>
            )}

            {/* Location Info */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12 pb-8 border-b border-ed-green/8">
              <div className="flex items-start gap-4">
                <MapPin className="w-5 h-5 text-ed-green-soft mt-0.5 flex-shrink-0" />
                <div>
                  <h2 className="text-xl font-semibold text-ed-green">{locationName}</h2>
                  <p className="text-xs text-ed-text-muted mt-1">{dateStr}</p>
                  {hijriDate && <p className="text-xs text-ed-gold mt-1">{hijriDate}</p>}
                </div>
              </div>
              {nextPrayer && (
                <div className="bg-white border border-ed-green/8 px-6 py-4 text-center">
                  <p className="text-[10px] text-ed-text-muted uppercase tracking-[0.2em] mb-1">Next Prayer</p>
                  <p className="text-lg font-semibold text-ed-green" style={{ fontFamily: 'Georgia, serif' }}>{nextPrayer.name}</p>
                  <p className="text-sm text-ed-text-secondary font-mono">{convertTo12Hour(nextPrayer.time)}</p>
                </div>
              )}
            </div>

            {/* Prayer Times — Editorial List */}
            <div className="space-y-0">
              {prayersList.map((prayer, index) => (
                <div
                  key={prayer.name}
                  className={`flex items-center justify-between py-6 px-4 ${index > 0 ? "border-t border-ed-green/5" : ""} ${
                    nextPrayer?.name === prayer.name ? "bg-white" : ""
                  }`}
                >
                  <div className="flex items-center gap-6">
                    <span className="text-2xl font-[family-name:var(--font-amiri)] text-ed-green w-32 text-right" dir="rtl">
                      {prayer.arabic}
                    </span>
                    <span className="text-xs text-ed-text-muted uppercase tracking-widest">{prayer.name}</span>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="text-lg font-mono text-ed-green font-medium">
                      {convertTo12Hour(prayer.time)}
                    </span>
                    {nextPrayer?.name === prayer.name && (
                      <span className="text-[10px] bg-ed-green text-ed-beige px-2.5 py-1 uppercase tracking-widest font-medium">
                        Next
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : null}
      </div>

      <Footer />
    </main>
  );
}
