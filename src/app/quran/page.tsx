"use client";

import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Search, BookOpen, Loader2 } from "lucide-react";
import Link from "next/link";

interface Surah {
  number: number;
  name: string;
  englishName: string;
  englishNameTranslation: string;
  numberOfAyahs: number;
  revelationType: string;
}

export default function Quran() {
  const [surahs, setSurahs] = useState<Surah[]>([]);
  const [filtered, setFiltered] = useState<Surah[]>([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSurahs = async () => {
      try {
        const res = await fetch("https://api.alquran.cloud/v1/surah");
        const data = await res.json();
        if (data.code === 200) {
          setSurahs(data.data);
          setFiltered(data.data);
        }
      } catch (err) {
        console.error("Failed to fetch surahs:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchSurahs();
  }, []);

  useEffect(() => {
    if (!search.trim()) {
      setFiltered(surahs);
    } else {
      const q = search.toLowerCase();
      
      const normalizeArabic = (text: string) => {
        return text
          .replace(/[\u0617-\u061A\u064B-\u0652]/g, "") // Remove tashkeel
          .replace(/[أإآ]/g, "ا") // Normalize Alef
          .replace(/ة/g, "ه") // Normalize Teh Marbuta to Heh
          .replace(/سورة /g, "") // Remove 'Surah '
          .replace(/سوره /g, "");
      };

      const normalizedQuery = normalizeArabic(q);

      setFiltered(
        surahs.filter(
          (s) =>
            s.englishName.toLowerCase().includes(q) ||
            normalizeArabic(s.name).includes(normalizedQuery) ||
            s.englishNameTranslation.toLowerCase().includes(q)
        )
      );
    }
  }, [search, surahs]);

  return (
    <main className="min-h-screen bg-emerald-forest pt-24">
      <Navbar />

      <div className="pb-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-gold-soft font-[family-name:var(--font-tajawal)] mb-4">القرآن الكريم</h1>
          <p className="text-white text-lg">The Holy Quran</p>
          <p className="text-white/60 text-sm mt-4 max-w-2xl mx-auto">
            Read and listen to the Holy Quran — all 114 surahs with full Arabic text and audio recitations.
          </p>
        </div>

        {/* Search */}
        <div className="flat-card p-6 mb-8">
          <h2 className="text-white font-bold mb-4">Search Surahs</h2>
          <div className="relative">
            <Search className="w-5 h-5 text-white/50 absolute left-4 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by surah name..."
              className="w-full bg-emerald-forest border border-gold-soft/20 text-white rounded-lg pl-12 pr-4 py-3 focus:outline-none focus:border-gold-soft transition-colors"
            />
          </div>
        </div>

        {loading ? (
          <div className="flex justify-center items-center py-24">
            <Loader2 className="w-12 h-12 text-gold-soft animate-spin" />
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {filtered.map((surah) => (
              <Link key={surah.number} href={`/quran/${surah.number}`} className="block">
                <div className="flat-card p-6 flex flex-col items-center card-hover h-full">
                  <div className="mb-6 mt-4 relative">
                    <BookOpen className="w-12 h-12 text-gold-soft" />
                    <span className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-emerald-forest border border-gold-soft text-gold-soft flex items-center justify-center text-xs font-bold">
                      {surah.number}
                    </span>
                  </div>
                  <h3 className="text-white font-bold font-[family-name:var(--font-amiri)] text-center text-3xl mb-1">
                    {surah.name}
                  </h3>
                  <p className="text-sm text-white/50 mb-1">{surah.englishName}</p>
                  <p className="text-xs text-white/40 mb-4">{surah.englishNameTranslation}</p>

                  <div className="bg-white/10 px-3 py-1 rounded text-xs text-white/70 mb-4 flex items-center gap-2">
                    <span className={`w-2 h-2 rounded-full ${surah.revelationType === "Meccan" ? "bg-emerald-400" : "bg-blue-400"}`}></span>
                    {surah.revelationType}
                  </div>

                  <div className="w-full flex items-center justify-between">
                    <span className="text-xs text-white/50">Verses:</span>
                    <span className="text-xs text-gold-soft font-bold">{surah.numberOfAyahs}</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>

      <Footer />
    </main>
  );
}
