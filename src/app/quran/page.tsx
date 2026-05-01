"use client";

import { useState, useEffect, useMemo } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Search, Loader2, ArrowRight } from "lucide-react";
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
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSurahs = async () => {
      try {
        const res = await fetch("https://api.alquran.cloud/v1/surah");
        const data = await res.json();
        if (data.code === 200) {
          setSurahs(data.data);
        }
      } catch (err) {
        console.error("Failed to fetch surahs:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchSurahs();
  }, []);

  const filtered = useMemo(() => {
    if (!search.trim()) return surahs;
    const q = search.toLowerCase();
    const normalizeArabic = (text: string) =>
      text
        .replace(/[\u064B-\u065F\u0670]/g, "")
        .replace(/[أإآٱ]/g, "ا")
        .replace(/ة/g, "ه")
        .replace(/سورة /g, "")
        .replace(/سوره /g, "")
        .trim();
    const normalizedQuery = normalizeArabic(q);
    return surahs.filter(
      (s) =>
        s.englishName.toLowerCase().includes(q) ||
        normalizeArabic(s.name).includes(normalizedQuery) ||
        s.englishNameTranslation.toLowerCase().includes(q)
    );
  }, [search, surahs]);

  return (
    <main className="min-h-screen bg-ed-beige pt-20">
      <Navbar />

      {/* Editorial Header */}
      <div className="max-w-6xl mx-auto px-6 lg:px-10 pt-12 pb-6">
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-12">
          <div>
            <h1 className="text-5xl md:text-6xl font-[family-name:var(--font-tajawal)] text-ed-green font-bold mb-3">
              القرآن الكريم
            </h1>
            <p className="text-sm text-ed-text-muted tracking-wide">
              The Holy Quran — 114 Surahs with full Arabic text and audio recitations
            </p>
          </div>

          {/* Search */}
          <div className="relative w-full lg:w-80">
            <Search className="w-4 h-4 text-ed-text-muted absolute left-4 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search surahs..."
              className="w-full bg-white border border-ed-green/10 text-ed-text rounded-none pl-11 pr-4 py-3 text-sm focus:outline-none focus:border-ed-green/30 transition-colors placeholder:text-ed-text-muted"
            />
          </div>
        </div>

        <div className="h-px bg-ed-green/8 mb-10"></div>
      </div>

      {/* Surah List */}
      <div className="max-w-6xl mx-auto px-6 lg:px-10 pb-24">
        {loading ? (
          <div className="flex justify-center items-center py-32">
            <Loader2 className="w-8 h-8 text-ed-green-soft animate-spin" />
          </div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-24 text-ed-text-muted text-sm">
            No surahs found. Try another name.
          </div>
        ) : (
          <div className="space-y-0">
            {filtered.map((surah, index) => (
              <Link key={surah.number} href={`/quran/${surah.number}`} className="block group">
                <div className={`flex items-center justify-between py-5 px-4 transition-colors hover:bg-white ${index > 0 ? 'border-t border-ed-green/5' : ''}`}>
                  {/* Left: Number + Names */}
                  <div className="flex items-center gap-6">
                    <span className="w-10 text-right text-xs text-ed-text-muted font-medium tabular-nums">
                      {surah.number}
                    </span>
                    <div>
                      <h3 className="text-base font-[family-name:var(--font-amiri)] text-ed-green mb-0.5">
                        {surah.name}
                      </h3>
                      <p className="text-xs text-ed-text-muted">
                        {surah.englishName} · {surah.englishNameTranslation}
                      </p>
                    </div>
                  </div>

                  {/* Right: Meta */}
                  <div className="flex items-center gap-6">
                    <div className="hidden sm:flex items-center gap-2">
                      <span className={`w-1.5 h-1.5 rounded-full ${surah.revelationType === "Meccan" ? "bg-ed-green-soft" : "bg-ed-gold"}`}></span>
                      <span className="text-[10px] text-ed-text-muted uppercase tracking-wider">{surah.revelationType}</span>
                    </div>
                    <span className="text-xs text-ed-text-muted tabular-nums">{surah.numberOfAyahs} verses</span>
                    <ArrowRight className="w-3.5 h-3.5 text-ed-text-muted opacity-0 group-hover:opacity-100 transition-opacity" />
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
