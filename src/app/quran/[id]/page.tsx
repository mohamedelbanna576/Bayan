"use client";

import { useState, useEffect, useRef, use } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { ArrowLeft, Pause, Loader2, Volume2, Volume1, VolumeX, ChevronDown } from "lucide-react";
import Link from "next/link";

interface Ayah {
  number: number;
  text: string;
  numberInSurah: number;
  juz: number;
  page: number;
}

interface SurahData {
  number: number;
  name: string;
  englishName: string;
  englishNameTranslation: string;
  revelationType: string;
  numberOfAyahs: number;
  ayahs: Ayah[];
}

interface Reciter {
  identifier: string;
  englishName: string;
  name: string;
}

export default function SurahPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const [surah, setSurah] = useState<SurahData | null>(null);
  const [loading, setLoading] = useState(true);
  const [playing, setPlaying] = useState<number | null>(null);
  const [surahAudioPlaying, setSurahAudioPlaying] = useState(false);
  const [reciters, setReciters] = useState<Reciter[]>([]);
  const [selectedReciter, setSelectedReciter] = useState<string>("ar.alafasy");
  const [showReciters, setShowReciters] = useState(false);
  const [volume, setVolume] = useState(0.8);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const surahAudioRef = useRef<HTMLAudioElement | null>(null);

  // Fetch surah
  useEffect(() => {
    const fetchSurah = async () => {
      try {
        const res = await fetch(`https://api.alquran.cloud/v1/surah/${id}`);
        const data = await res.json();
        if (data.code === 200) {
          setSurah(data.data);
        }
      } catch (err) {
        console.error("Failed to fetch surah:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchSurah();
  }, [id]);

  // Fetch reciters from API — both versebyverse and complete (mujawwad)
  useEffect(() => {
    const fetchReciters = async () => {
      try {
        const res = await fetch("https://api.alquran.cloud/v1/edition?format=audio");
        const data = await res.json();
        if (data.code === 200) {
          const arabicReciters = data.data
            .filter((e: any) => e.language === "ar")
            .map((e: any) => ({
              identifier: e.identifier,
              englishName: e.englishName,
              name: e.name,
            }));
          setReciters(arabicReciters);
        }
      } catch (err) {
        console.error("Failed to fetch reciters:", err);
      }
    };
    fetchReciters();
  }, []);

  // Apply volume to active audio elements
  useEffect(() => {
    if (audioRef.current) audioRef.current.volume = volume;
    if (surahAudioRef.current) surahAudioRef.current.volume = volume;
  }, [volume]);

  // Stop audio when reciter changes
  useEffect(() => {
    if (audioRef.current) { audioRef.current.pause(); audioRef.current = null; }
    if (surahAudioRef.current) { surahAudioRef.current.pause(); surahAudioRef.current = null; }
    setPlaying(null);
    setSurahAudioPlaying(false);
  }, [selectedReciter]);

  const playAyah = (ayah: Ayah) => {
    if (audioRef.current) {
      audioRef.current.pause();
    }
    if (playing === ayah.numberInSurah) {
      setPlaying(null);
      return;
    }

    const url = `https://cdn.islamic.network/quran/audio/128/${selectedReciter}/${ayah.number}.mp3`;
    const audio = new Audio(url);
    audio.volume = volume;
    audioRef.current = audio;
    setPlaying(ayah.numberInSurah);
    audio.play().catch(() => setPlaying(null));
    audio.onended = () => setPlaying(null);
    audio.onerror = () => setPlaying(null);
  };

  const toggleSurahAudio = () => {
    if (surahAudioRef.current) {
      if (surahAudioPlaying) {
        surahAudioRef.current.pause();
        setSurahAudioPlaying(false);
      } else {
        surahAudioRef.current.play();
        setSurahAudioPlaying(true);
      }
      return;
    }

    if (!surah) return;
    
    let currentIndex = 0;
    const playNext = () => {
      if (currentIndex >= surah.ayahs.length) {
        setSurahAudioPlaying(false);
        surahAudioRef.current = null;
        setPlaying(null);
        return;
      }
      const ayah = surah.ayahs[currentIndex];
      const url = `https://cdn.islamic.network/quran/audio/128/${selectedReciter}/${ayah.number}.mp3`;
      const audio = new Audio(url);
      audio.volume = volume;
      surahAudioRef.current = audio;
      setPlaying(ayah.numberInSurah);
      audio.play().catch(() => {
        setSurahAudioPlaying(false);
        setPlaying(null);
      });
      audio.onended = () => {
        currentIndex++;
        playNext();
      };
      audio.onerror = () => {
        setSurahAudioPlaying(false);
        setPlaying(null);
      };
    };

    setSurahAudioPlaying(true);
    playNext();
  };

  const stopAll = () => {
    if (audioRef.current) { audioRef.current.pause(); audioRef.current = null; }
    if (surahAudioRef.current) { surahAudioRef.current.pause(); surahAudioRef.current = null; }
    setPlaying(null);
    setSurahAudioPlaying(false);
  };

  useEffect(() => {
    return () => {
      if (audioRef.current) audioRef.current.pause();
      if (surahAudioRef.current) surahAudioRef.current.pause();
    };
  }, []);

  const currentReciter = reciters.find(r => r.identifier === selectedReciter);
  const VolumeIcon = volume === 0 ? VolumeX : volume < 0.5 ? Volume1 : Volume2;

  if (loading) {
    return (
      <main className="min-h-screen bg-emerald-forest pt-24">
        <Navbar />
        <div className="flex justify-center items-center py-32">
          <Loader2 className="w-12 h-12 text-gold-soft animate-spin" />
        </div>
      </main>
    );
  }

  if (!surah) {
    return (
      <main className="min-h-screen bg-emerald-forest pt-24">
        <Navbar />
        <div className="text-center py-32 text-white/60">Surah not found.</div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-emerald-forest pt-24">
      <Navbar />

      <div className="pb-24 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back */}
        <Link href="/quran" className="inline-flex items-center gap-2 text-gold-soft hover:text-gold-light transition-colors mb-8 text-sm">
          <ArrowLeft className="w-4 h-4" />
          Back to Quran
        </Link>

        {/* Surah Header */}
        <div className="flat-card p-8 text-center mb-6">
          <h1 className="text-6xl font-bold text-gold-soft font-[family-name:var(--font-amiri)] mb-3">{surah.name}</h1>
          <p className="text-white text-lg mb-1">{surah.englishName}</p>
          <p className="text-white/50 text-sm">{surah.englishNameTranslation} · {surah.revelationType} · {surah.numberOfAyahs} Ayahs</p>
        </div>

        {/* Reciter Selector + Volume + Play */}
        <div className="flat-card p-4 mb-6 space-y-4">
          {/* Row 1: Reciter + Play */}
          <div className="flex flex-col sm:flex-row items-center gap-4">
            <div className="relative w-full sm:flex-1">
              <button
                onClick={() => setShowReciters(!showReciters)}
                className="w-full bg-emerald-forest border border-gold-soft/20 text-white rounded-lg px-4 py-3 flex items-center justify-between hover:border-gold-soft/40 transition-colors"
              >
                <div className="flex items-center gap-2 truncate">
                  <span className="text-gold-soft text-sm font-[family-name:var(--font-cairo)] truncate">
                    {currentReciter ? currentReciter.name : "مشاري العفاسي"}
                  </span>
                  <span className="text-white/40">·</span>
                  <span className="text-white/60 text-sm truncate">
                    {currentReciter ? currentReciter.englishName : "Mishary Rashid al-Afasy"}
                  </span>
                </div>
                <ChevronDown className={`w-4 h-4 text-white/40 ml-2 shrink-0 transition-transform ${showReciters ? "rotate-180" : ""}`} />
              </button>

              {showReciters && (
                <div className="absolute top-full left-0 right-0 mt-1 bg-emerald-deep border border-gold-soft/20 rounded-lg overflow-hidden z-50 max-h-72 overflow-y-auto">
                  {reciters.map((reciter) => (
                    <button
                      key={reciter.identifier}
                      onClick={() => { setSelectedReciter(reciter.identifier); setShowReciters(false); }}
                      className={`w-full px-4 py-3 hover:bg-emerald-mid transition-colors text-sm flex items-center justify-between gap-3 ${
                        selectedReciter === reciter.identifier ? "bg-emerald-mid border-r-2 border-gold-soft" : ""
                      }`}
                    >
                      <span className={`truncate ${selectedReciter === reciter.identifier ? "text-gold-soft" : "text-white/80"}`}>{reciter.englishName}</span>
                      <span className="text-gold-soft/70 font-[family-name:var(--font-cairo)] text-xs shrink-0">{reciter.name}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {surahAudioPlaying ? (
              <button
                onClick={stopAll}
                className="bg-red-500/20 text-red-400 border border-red-500/30 px-6 py-3 rounded-lg inline-flex items-center gap-2 text-sm shrink-0 w-full sm:w-auto justify-center hover:bg-red-500/30 transition-colors"
              >
                <Pause className="w-4 h-4" /> Stop
              </button>
            ) : (
              <button
                onClick={toggleSurahAudio}
                className="btn-gold px-6 py-3 inline-flex items-center gap-2 text-sm shrink-0 w-full sm:w-auto justify-center"
              >
                <Volume2 className="w-4 h-4" /> Play Full Surah
              </button>
            )}
          </div>

          {/* Row 2: Volume Control */}
          <div className="flex items-center gap-3 px-1">
            <button onClick={() => setVolume(volume === 0 ? 0.8 : 0)} className="text-white/60 hover:text-gold-soft transition-colors">
              <VolumeIcon className="w-5 h-5" />
            </button>
            <input
              type="range"
              min="0"
              max="1"
              step="0.01"
              value={volume}
              onChange={(e) => setVolume(parseFloat(e.target.value))}
              className="flex-1 h-1.5 rounded-full appearance-none cursor-pointer"
              style={{
                background: `linear-gradient(to right, var(--gold-soft) 0%, var(--gold-soft) ${volume * 100}%, rgba(255,255,255,0.15) ${volume * 100}%, rgba(255,255,255,0.15) 100%)`,
              }}
            />
            <span className="text-white/40 text-xs w-8 text-right">{Math.round(volume * 100)}%</span>
          </div>
        </div>

        {/* Bismillah */}
        {surah.number !== 1 && surah.number !== 9 && (
          <div className="text-center mb-6 py-6 flat-card">
            <p className="text-4xl text-gold-soft font-[family-name:var(--font-amiri)] leading-relaxed">بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ</p>
          </div>
        )}

        {/* Quran Text - Mushaf Style */}
        <div className="flat-card p-6 sm:p-10">
          <div className="text-right" dir="rtl">
            {surah.ayahs.map((ayah) => (
              <span key={ayah.numberInSurah} className="inline">
                <span
                  onClick={() => playAyah(ayah)}
                  className={`font-[family-name:var(--font-amiri)] text-2xl sm:text-3xl leading-[2.8] cursor-pointer transition-colors hover:text-gold-soft ${
                    playing === ayah.numberInSurah ? "text-gold-soft" : "text-white"
                  }`}
                >
                  {ayah.text}
                </span>
                <span
                  className={`inline-flex items-center justify-center w-8 h-8 mx-1 rounded-full text-xs font-bold align-middle cursor-pointer transition-colors ${
                    playing === ayah.numberInSurah
                      ? "bg-gold-soft text-emerald-forest"
                      : "bg-white/10 text-gold-soft hover:bg-gold-soft/20"
                  }`}
                  onClick={() => playAyah(ayah)}
                >
                  {ayah.numberInSurah}
                </span>
              </span>
            ))}
          </div>
        </div>

        {/* Page info */}
        {surah.ayahs.length > 0 && (
          <div className="text-center mt-6 text-white/30 text-xs">
            Juz {surah.ayahs[0].juz} · Page {surah.ayahs[0].page}
          </div>
        )}
      </div>

      <Footer />
    </main>
  );
}
