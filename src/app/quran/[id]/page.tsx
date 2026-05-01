"use client";

import { useState, useEffect, useRef, use } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { ArrowLeft, Pause, Loader2, Play, ChevronDown } from "lucide-react";
import Link from "next/link";
import { useAudio } from "@/context/AudioContext";
import GlobalAudioPlayer from "@/components/GlobalAudioPlayer";

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
  bitrate?: number;
}

export default function SurahPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const [surah, setSurah] = useState<SurahData | null>(null);
  const [loading, setLoading] = useState(true);
  const [reciters, setReciters] = useState<Reciter[]>([]);
  const [selectedReciter, setSelectedReciter] = useState<string>("ar.alafasy");
  const [showReciters, setShowReciters] = useState(false);
  
  const { currentTrack, isPlaying, playPlaylist, stopAudio, togglePlayPause } = useAudio();

  const isSurahPlaying = currentTrack?.type === "quran" && currentTrack.id.toString().startsWith(`${surah?.number}-`);
  
  const getAyahPlaying = () => {
    if (isSurahPlaying) {
      const parts = currentTrack!.id.toString().split("-");
      return parseInt(parts[1], 10);
    }
    return null;
  };

  const playingAyahNumber = getAyahPlaying();

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
            .filter((e: any) => e.language === "ar" && e.type === "versebyverse")
            .map((e: any) => ({
              identifier: e.identifier,
              englishName: e.englishName,
              name: e.name,
            }));
          
          // Add some more popular reciters if they are missing from the default API response
          const moreSheikhs: Reciter[] = [
            { identifier: "ar.mahermuaiqly", englishName: "Maher Al Muaiqly", name: "ماهر المعيقلي" },
            { identifier: "ar.abdurrahmaansudais", englishName: "Abdurrahmaan As-Sudais", name: "عبد الرحمن السديس" },
            { identifier: "ar.hudhaify", englishName: "Ali Al-Hudhaify", name: "علي الحذيفي" },
            { identifier: "ar.saoodshuraym", englishName: "Saood Ash-Shuraym", name: "سعود الشريم" },
            { identifier: "ar.minshawi", englishName: "Mohamed Siddiq al-Minshawi", name: "محمد صديق المنشاوي" },
            { identifier: "ar.minshawimujawwad", englishName: "Mohamed Siddiq al-Minshawi (Mujawwad)", name: "محمد صديق المنشاوي (مجود)", bitrate: 64 },
            { identifier: "ar.abdulsamad", englishName: "Abdul Basit (Mujawwad/Murattal)", name: "عبد الباسط عبد الصمد", bitrate: 64 }
          ];
          
          moreSheikhs.forEach(sheikh => {
            if (!arabicReciters.find((r: any) => r.identifier === sheikh.identifier)) {
              arabicReciters.push(sheikh);
            }
          });
          
          setReciters(arabicReciters);
        }
      } catch (err) {
        console.error("Failed to fetch reciters:", err);
      }
    };
    fetchReciters();
  }, []);

  const currentReciter = reciters.find(r => r.identifier === selectedReciter);

  const getSurahTracks = () => {
    if (!surah) return [];
    const bitrate = currentReciter?.bitrate || 128;
    return surah.ayahs.map(ayah => ({
      id: `${surah.number}-${ayah.numberInSurah}`,
      title: surah.name,
      subtitle: `Ayah ${ayah.numberInSurah} · ${currentReciter ? currentReciter.name : ''}`,
      url: `https://cdn.islamic.network/quran/audio/${bitrate}/${selectedReciter}/${ayah.number}.mp3`,
      type: "quran" as const
    }));
  };

  const playAyah = (ayah: Ayah) => {
    const tracks = getSurahTracks();
    if (playingAyahNumber === ayah.numberInSurah) {
      togglePlayPause();
    } else {
      playPlaylist(tracks, ayah.numberInSurah - 1);
    }
  };

  const toggleSurahAudio = () => {
    if (isSurahPlaying) {
      togglePlayPause();
    } else {
      const tracks = getSurahTracks();
      playPlaylist(tracks, 0);
    }
  };

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

        {/* Now Playing Banner */}
        <GlobalAudioPlayer />

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
                  <span className="text-gold-soft text-sm font-[family-name:var(--font-amiri)] truncate font-bold text-lg">
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
                      <span className="text-gold-soft/70 font-[family-name:var(--font-amiri)] text-sm shrink-0 font-bold">{reciter.name}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {isSurahPlaying && isPlaying ? (
              <button
                onClick={togglePlayPause}
                className="bg-emerald-deep text-gold-soft border border-gold-soft/30 shadow-[inset_0_2px_10px_rgba(0,0,0,0.2)] px-6 py-3 rounded-lg inline-flex items-center gap-2 text-sm shrink-0 w-full sm:w-auto justify-center transition-colors"
              >
                <Pause className="w-4 h-4" /> Pause Surah
              </button>
            ) : (
              <button
                onClick={toggleSurahAudio}
                className="btn-gold px-6 py-3 inline-flex items-center gap-2 text-sm shrink-0 w-full sm:w-auto justify-center"
              >
                <Play className="w-4 h-4" /> {isSurahPlaying ? "Resume Surah" : "Play Full Surah"}
              </button>
            )}
          </div>

        {/* Volume Control is now managed globally by GlobalAudioPlayer */}
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
                    playingAyahNumber === ayah.numberInSurah ? "text-gold-soft drop-shadow-[0_0_8px_rgba(212,175,55,0.4)]" : "text-white"
                  }`}
                >
                  {ayah.text}
                </span>
                <span
                  className={`inline-flex items-center justify-center w-8 h-8 mx-1 rounded-full text-xs font-bold align-middle cursor-pointer transition-colors ${
                    playingAyahNumber === ayah.numberInSurah
                      ? "bg-gold-soft text-emerald-forest shadow-[0_0_10px_rgba(212,175,55,0.5)]"
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
