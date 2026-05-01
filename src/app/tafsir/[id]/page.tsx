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
    <main className="min-h-screen bg-ed-beige pt-20">
      <Navbar />

      <div className="max-w-4xl mx-auto px-6 lg:px-10 pt-12 pb-24">
        {/* Back */}
        <Link href="/tafsir" className="inline-flex items-center gap-2 text-ed-text-muted hover:text-ed-green transition-colors mb-10 text-sm">
          <ArrowLeft className="w-3.5 h-3.5" /> Back to Tafsir
        </Link>

        {/* Header */}
        {surahInfo && (
          <div className="text-center mb-10 pb-10 border-b border-ed-green/8">
            <h1 className="text-5xl md:text-6xl text-ed-green font-[family-name:var(--font-amiri)] mb-3">{surahInfo.name}</h1>
            <p className="text-base text-ed-text-secondary">{surahInfo.englishName}</p>
            <p className="text-xs text-ed-text-muted mt-2">{surahInfo.englishNameTranslation} · {surahInfo.numberOfAyahs} verses</p>
          </div>
        )}

        {/* Tafsir Selector */}
        <div className="mb-10">
          <div className="relative">
            <button
              onClick={() => setShowDropdown(!showDropdown)}
              className="w-full bg-white border border-ed-green/10 text-ed-text px-4 py-3 flex items-center justify-between hover:border-ed-green/20 transition-colors text-sm"
            >
              <div className="flex items-center gap-2">
                <span className="text-ed-green font-[family-name:var(--font-cairo)] text-sm">{selectedTafsir.name}</span>
                <span className="text-ed-text-muted">·</span>
                <span className="text-ed-text-muted text-xs">{selectedTafsir.english}</span>
              </div>
              <ChevronDown className={`w-3.5 h-3.5 text-ed-text-muted ml-2 shrink-0 transition-transform ${showDropdown ? "rotate-180" : ""}`} />
            </button>

            {showDropdown && (
              <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-ed-green/10 z-50 max-h-72 overflow-y-auto shadow-lg">
                {tafsirEditions.map((edition) => (
                  <button
                    key={edition.id}
                    onClick={() => { setSelectedTafsir(edition); setShowDropdown(false); }}
                    className={`w-full px-4 py-3 hover:bg-ed-beige-light transition-colors text-sm flex items-center justify-between gap-3 ${
                      selectedTafsir.id === edition.id ? "bg-ed-beige-light border-l-2 border-ed-green" : ""
                    }`}
                  >
                    <span className={`${selectedTafsir.id === edition.id ? "text-ed-green font-medium" : "text-ed-text-secondary"}`}>{edition.english}</span>
                    <span className="text-ed-green-soft font-[family-name:var(--font-cairo)] text-xs shrink-0">{edition.name}</span>
                  </button>
                ))}
              </div>
            )}
          </div>

          <p className="text-ed-text-muted text-[10px] mt-2 text-center uppercase tracking-widest">
            Source: AlQuran Cloud API — {selectedTafsir.english}
          </p>
        </div>

        {/* Content */}
        {loading ? (
          <div className="flex justify-center items-center py-24">
            <Loader2 className="w-8 h-8 text-ed-green-soft animate-spin" />
          </div>
        ) : error ? (
          <div className="text-center py-16">
            <p className="text-ed-text-muted font-[family-name:var(--font-cairo)] text-base">{error}</p>
          </div>
        ) : (
          <div className="space-y-6">
            {ayahs.map((ayah, index) => (
              <div key={ayah.numberInSurah} className="bg-white border border-ed-green/5 overflow-hidden">
                {/* Ayah number bar */}
                <div className="flex items-center justify-between px-5 py-3 border-b border-ed-green/5 bg-ed-beige-light">
                  <span className="w-7 h-7 bg-ed-green text-ed-beige flex items-center justify-center text-[10px] font-bold">
                    {ayah.numberInSurah}
                  </span>
                  <span className="text-[10px] text-ed-text-muted uppercase tracking-widest">Verse {ayah.numberInSurah} of {surahInfo?.numberOfAyahs}</span>
                </div>

                <div className="p-6 space-y-5">
                  {/* Original Arabic Text */}
                  {arabicAyahs[index] && (
                    <div className="bg-ed-beige-light p-5 border border-ed-green/5">
                      <p className="text-ed-green text-xl sm:text-2xl leading-[2.5] font-[family-name:var(--font-amiri)] text-right" dir="rtl">
                        {arabicAyahs[index].text}
                      </p>
                    </div>
                  )}

                  {/* Tafsir Text */}
                  <div className="pt-2">
                    <p className="text-[10px] text-ed-gold uppercase tracking-widest mb-3 flex items-center gap-2 font-[family-name:var(--font-cairo)] font-medium">
                      <span className="w-1 h-1 rounded-full bg-ed-gold"></span>
                      {selectedTafsir.name}
                    </p>
                    <p className="text-ed-text-secondary text-base leading-[2.2] font-[family-name:var(--font-amiri)] text-right" dir="rtl">
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
