"use client";

import { useState, useEffect, use } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { ArrowLeft, Loader2, ChevronDown } from "lucide-react";
import Link from "next/link";

interface TafsirAyah {
  number: number;
  text: string;
  numberInSurah: number;
}

interface SurahInfo {
  number: number;
  name: string;
  englishName: string;
  englishNameTranslation: string;
  numberOfAyahs: number;
}

// All tafsir editions available from AlQuran Cloud API
const tafsirEditions = [
  { id: "ar.muyassar", name: "التفسير الميسر", english: "Tafsir Al-Muyassar" },
  { id: "ar.jalalayn", name: "تفسير الجلالين", english: "Tafsir Al-Jalalayn" },
  { id: "ar.qurtubi", name: "تفسير القرطبي", english: "Tafsir Al-Qurtubi" },
  { id: "ar.katheer", name: "تفسير ابن كثير", english: "Tafsir Ibn Katheer" },
  { id: "ar.tabary", name: "تفسير الطبري", english: "Tafsir Al-Tabari" },
  { id: "ar.saddi", name: "تفسير السعدي", english: "Tafsir As-Sa'di" },
  { id: "ar.baghawi", name: "تفسير البغوي", english: "Tafsir Al-Baghawi" },
  { id: "ar.waseet", name: "التفسير الوسيط", english: "Tafsir Al-Waseet" },
  { id: "ar.tanweer", name: "التحرير والتنوير", english: "At-Tahrir wa At-Tanwir" },
];

export default function TafsirPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const [surahInfo, setSurahInfo] = useState<SurahInfo | null>(null);
  const [ayahs, setAyahs] = useState<TafsirAyah[]>([]);
  const [arabicAyahs, setArabicAyahs] = useState<TafsirAyah[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedTafsir, setSelectedTafsir] = useState(tafsirEditions[0]);
  const [showDropdown, setShowDropdown] = useState(false);

  useEffect(() => {
    const fetchTafsir = async () => {
      setLoading(true);
      setError(null);
      try {
        const [tafsirRes, arabicRes] = await Promise.all([
          fetch(`https://api.alquran.cloud/v1/surah/${id}/${selectedTafsir.id}`),
          fetch(`https://api.alquran.cloud/v1/surah/${id}`),
        ]);
        const tafsirData = await tafsirRes.json();
        const arabicData = await arabicRes.json();

        if (tafsirData.code === 200 && arabicData.code === 200) {
          setSurahInfo({
            number: tafsirData.data.number,
            name: tafsirData.data.name,
            englishName: tafsirData.data.englishName,
            englishNameTranslation: tafsirData.data.englishNameTranslation,
            numberOfAyahs: tafsirData.data.numberOfAyahs,
          });
          setAyahs(tafsirData.data.ayahs);
          setArabicAyahs(arabicData.data.ayahs);
        } else {
          setError("هذا التفسير غير متوفر لهذه السورة. جرب تفسيراً آخر.");
        }
      } catch (err) {
        console.error("Failed to fetch tafsir:", err);
        setError("هذا التفسير غير متوفر. جرب تفسيراً آخر.");
      } finally {
        setLoading(false);
      }
    };
    fetchTafsir();
  }, [id, selectedTafsir]);

  return (
    <main className="min-h-screen bg-emerald-forest pt-24">
      <Navbar />

      <div className="pb-24 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back */}
        <Link href="/tafsir" className="inline-flex items-center gap-2 text-gold-soft hover:text-gold-light transition-colors mb-8 text-sm">
          <ArrowLeft className="w-4 h-4" />
          Back to Tafsir
        </Link>

        {/* Header */}
        {surahInfo && (
          <div className="flat-card p-8 text-center mb-6">
            <h1 className="text-6xl font-bold text-gold-soft font-[family-name:var(--font-amiri)] mb-3">{surahInfo.name}</h1>
            <p className="text-white text-lg mb-1">{surahInfo.englishName}</p>
            <p className="text-white/50 text-sm">{surahInfo.englishNameTranslation} · {surahInfo.numberOfAyahs} verses</p>
          </div>
        )}

        {/* Tafsir Selector */}
        <div className="flat-card p-4 mb-6">
          <div className="relative">
            <button
              onClick={() => setShowDropdown(!showDropdown)}
              className="w-full bg-emerald-forest border border-gold-soft/20 text-white rounded-lg px-4 py-3 flex items-center justify-between hover:border-gold-soft/40 transition-colors"
            >
              <div className="flex items-center gap-2">
                <span className="text-gold-soft text-sm font-[family-name:var(--font-cairo)]">{selectedTafsir.name}</span>
                <span className="text-white/40">·</span>
                <span className="text-white/60 text-sm">{selectedTafsir.english}</span>
              </div>
              <ChevronDown className={`w-4 h-4 text-white/40 ml-2 shrink-0 transition-transform ${showDropdown ? "rotate-180" : ""}`} />
            </button>

            {showDropdown && (
              <div className="absolute top-full left-0 right-0 mt-1 bg-emerald-deep border border-gold-soft/20 rounded-lg overflow-hidden z-50 max-h-72 overflow-y-auto">
                {tafsirEditions.map((edition) => (
                  <button
                    key={edition.id}
                    onClick={() => { setSelectedTafsir(edition); setShowDropdown(false); }}
                    className={`w-full px-4 py-3 hover:bg-emerald-mid transition-colors text-sm flex items-center justify-between gap-3 ${
                      selectedTafsir.id === edition.id ? "bg-emerald-mid border-r-2 border-gold-soft" : ""
                    }`}
                  >
                    <span className={`${selectedTafsir.id === edition.id ? "text-gold-soft" : "text-white/80"}`}>{edition.english}</span>
                    <span className="text-gold-soft/70 font-[family-name:var(--font-cairo)] text-xs shrink-0">{edition.name}</span>
                  </button>
                ))}
              </div>
            )}
          </div>

          <p className="text-white/30 text-xs mt-3 text-center">
            Source: AlQuran Cloud API — {selectedTafsir.english}
          </p>
        </div>

        {/* Content */}
        {loading ? (
          <div className="flex justify-center items-center py-24">
            <Loader2 className="w-12 h-12 text-gold-soft animate-spin" />
          </div>
        ) : error ? (
          <div className="flat-card p-8 text-center">
            <p className="text-white/60 font-[family-name:var(--font-cairo)] text-lg">{error}</p>
          </div>
        ) : (
          <div className="space-y-4">
            {ayahs.map((ayah, index) => (
              <div key={ayah.numberInSurah} className="flat-card overflow-hidden">
                {/* Ayah number bar */}
                <div className="flex items-center justify-between px-6 py-3 bg-emerald-mid/50 border-b border-white/5">
                  <span className="w-8 h-8 rounded-full bg-emerald-forest border border-gold-soft/30 text-gold-soft flex items-center justify-center text-xs font-bold">
                    {ayah.numberInSurah}
                  </span>
                  <span className="text-xs text-white/40">Verse {ayah.numberInSurah} of {surahInfo?.numberOfAyahs}</span>
                </div>

                <div className="p-6 space-y-4">
                  {/* Original Arabic Text */}
                  {arabicAyahs[index] && (
                    <div className="bg-emerald-forest rounded-lg p-5 border border-white/5">
                      <p className="text-white text-2xl sm:text-3xl leading-[2.5] font-[family-name:var(--font-amiri)] text-right" dir="rtl">
                        {arabicAyahs[index].text}
                      </p>
                    </div>
                  )}

                  {/* Tafsir Text */}
                  <div className="border-t border-white/5 pt-4">
                    <p className="text-xs text-gold-soft font-bold tracking-wide mb-3 flex items-center gap-2 font-[family-name:var(--font-cairo)]">
                      <span className="w-1.5 h-1.5 rounded-full bg-gold-soft"></span>
                      {selectedTafsir.name}
                    </p>
                    <p className="text-white/80 text-lg leading-[2.2] font-[family-name:var(--font-amiri)] text-right" dir="rtl">
                      {ayah.text}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <Footer />
    </main>
  );
}
