"use client";

import { useState, useEffect, use } from "react";
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

interface AudioEdition {
  identifier: string;
  englishName: string;
  name: string;
  language: string;
  type: string;
}

export default function SurahPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const [surah, setSurah] = useState<SurahData | null>(null);
  const [englishAyahs, setEnglishAyahs] = useState<Ayah[]>([]);
  const [loading, setLoading] = useState(true);
  const [reciters, setReciters] = useState<Reciter[]>([]);
  const [selectedReciter, setSelectedReciter] = useState<string>("ar.alafasy");
  const [showReciters, setShowReciters] = useState(false);

  const { currentTrack, isPlaying, playPlaylist, togglePlayPause } = useAudio();

  const isSurahPlaying = currentTrack?.type === "quran" && currentTrack.id.toString().startsWith(`${surah?.number}-`);

  const getAyahPlaying = () => {
    if (isSurahPlaying) {
      const parts = currentTrack!.id.toString().split("-");
      return parseInt(parts[1], 10);
    }
    return null;
  };

  const playingAyahNumber = getAyahPlaying();

  useEffect(() => {
    const fetchSurah = async () => {
      try {
        const [arabicRes, englishRes] = await Promise.all([
          fetch(`https://api.alquran.cloud/v1/surah/${id}/quran-uthmani`),
          fetch(`https://api.alquran.cloud/v1/surah/${id}/en.sahih`),
        ]);
        const arabicData = await arabicRes.json();
        const englishData = await englishRes.json();

        if (arabicData.code === 200) setSurah(arabicData.data);
        if (englishData.code === 200) setEnglishAyahs(englishData.data.ayahs);
      } catch (err) { console.error("Failed to fetch surah:", err); }
      finally { setLoading(false); }
    };
    fetchSurah();
  }, [id]);

  useEffect(() => {
    const fetchReciters = async () => {
      try {
        const res = await fetch("https://api.alquran.cloud/v1/edition?format=audio");
        const data = await res.json();
        if (data.code === 200) {
          const arabicReciters = data.data
            .filter((e: AudioEdition) => e.language === "ar" && e.type === "versebyverse")
            .map((e: AudioEdition) => ({ identifier: e.identifier, englishName: e.englishName, name: e.name }));

          const moreSheikhs: Reciter[] = [
            { identifier: "ar.mahermuaiqly", englishName: "Maher Al Muaiqly", name: "ماهر المعيقلي" },
            { identifier: "ar.abdurrahmaansudais", englishName: "Abdurrahmaan As-Sudais", name: "عبد الرحمن السديس" },
            { identifier: "ar.hudhaify", englishName: "Ali Al-Hudhaify", name: "علي الحذيفي" },
            { identifier: "ar.saoodshuraym", englishName: "Saood Ash-Shuraym", name: "سعود الشريم" },
            { identifier: "ar.minshawi", englishName: "Mohamed Siddiq al-Minshawi", name: "محمد صديق المنشاوي" },
            { identifier: "ar.minshawimujawwad", englishName: "Mohamed Siddiq al-Minshawi (Mujawwad)", name: "محمد صديق المنشاوي (مجود)", bitrate: 64 },
            { identifier: "ar.abdulsamad", englishName: "Abdul Basit (Mujawwad/Murattal)", name: "عبد الباسط عبد الصمد", bitrate: 64 },
          ];

          moreSheikhs.forEach((sheikh) => {
            if (!arabicReciters.find((r: Reciter) => r.identifier === sheikh.identifier)) arabicReciters.push(sheikh);
          });

          setReciters(arabicReciters);
        }
      } catch (err) { console.error("Failed to fetch reciters:", err); }
    };
    fetchReciters();
  }, []);

  const currentReciter = reciters.find((r) => r.identifier === selectedReciter);

  const getSurahTracks = () => {
    if (!surah) return [];
    const bitrate = currentReciter?.bitrate || 128;
    return surah.ayahs.map((ayah) => ({
      id: `${surah.number}-${ayah.numberInSurah}`,
      title: surah.name,
      subtitle: `Ayah ${ayah.numberInSurah} · ${currentReciter ? currentReciter.name : ""}`,
      url: `https://cdn.islamic.network/quran/audio/${bitrate}/${selectedReciter}/${ayah.number}.mp3`,
      type: "quran" as const,
    }));
  };

  const playAyah = (ayah: Ayah) => {
    const tracks = getSurahTracks();
    if (playingAyahNumber === ayah.numberInSurah) togglePlayPause();
    else playPlaylist(tracks, ayah.numberInSurah - 1);
  };

  const toggleSurahAudio = () => {
    if (isSurahPlaying) togglePlayPause();
    else playPlaylist(getSurahTracks(), 0);
  };

  if (loading) {
    return (
      <main className="min-h-screen bg-ed-beige pt-20">
        <Navbar />
        <div className="flex justify-center items-center py-32">
          <Loader2 className="w-8 h-8 text-ed-green-soft animate-spin" />
        </div>
      </main>
    );
  }

  if (!surah) {
    return (
      <main className="min-h-screen bg-ed-beige pt-20">
        <Navbar />
        <div className="text-center py-32 text-ed-text-muted text-sm">Surah not found.</div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-ed-beige pt-20">
      <Navbar />

      <div className="max-w-4xl mx-auto px-6 lg:px-10 pt-12 pb-24">
        {/* Back */}
        <Link href="/quran" className="inline-flex items-center gap-2 text-ed-text-muted hover:text-ed-green transition-colors mb-10 text-sm">
          <ArrowLeft className="w-3.5 h-3.5" /> Back to Quran
        </Link>

        {/* Surah Header */}
        <div className="text-center mb-10 pb-10 border-b border-ed-green/8">
          <h1 className="text-5xl md:text-6xl text-ed-green font-[family-name:var(--font-amiri)] mb-3">{surah.name}</h1>
          <p className="text-base text-ed-text-secondary">{surah.englishName}</p>
          <p className="text-xs text-ed-text-muted mt-2">
            {surah.englishNameTranslation} · {surah.revelationType} · {surah.numberOfAyahs} Ayahs
          </p>
        </div>

        {/* Now Playing Banner */}
        <GlobalAudioPlayer />

        {/* Reciter Selector + Play */}
        <div className="flex flex-col sm:flex-row items-stretch gap-3 mb-10">
          <div className="relative flex-1">
            <button
              onClick={() => setShowReciters(!showReciters)}
              className="w-full bg-white border border-ed-green/10 text-ed-text px-4 py-3 flex items-center justify-between hover:border-ed-green/20 transition-colors text-sm"
            >
              <div className="flex items-center gap-2 truncate">
                <span className="text-ed-green font-[family-name:var(--font-amiri)] truncate text-base">
                  {currentReciter ? currentReciter.name : "مشاري العفاسي"}
                </span>
                <span className="text-ed-text-muted">·</span>
                <span className="text-ed-text-muted text-xs truncate">
                  {currentReciter ? currentReciter.englishName : "Mishary Rashid al-Afasy"}
                </span>
              </div>
              <ChevronDown className={`w-3.5 h-3.5 text-ed-text-muted ml-2 shrink-0 transition-transform ${showReciters ? "rotate-180" : ""}`} />
            </button>

            {showReciters && (
              <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-ed-green/10 z-50 max-h-72 overflow-y-auto shadow-lg">
                {reciters.map((reciter) => (
                  <button
                    key={reciter.identifier}
                    onClick={() => { setSelectedReciter(reciter.identifier); setShowReciters(false); }}
                    className={`w-full px-4 py-3 hover:bg-ed-beige-light transition-colors text-sm flex items-center justify-between gap-3 ${
                      selectedReciter === reciter.identifier ? "bg-ed-beige-light border-l-2 border-ed-green" : ""
                    }`}
                  >
                    <span className={`truncate ${selectedReciter === reciter.identifier ? "text-ed-green font-medium" : "text-ed-text-secondary"}`}>
                      {reciter.englishName}
                    </span>
                    <span className="text-ed-green-soft font-[family-name:var(--font-amiri)] text-sm shrink-0">{reciter.name}</span>
                  </button>
                ))}
              </div>
            )}
          </div>

          {isSurahPlaying && isPlaying ? (
            <button
              onClick={togglePlayPause}
              className="bg-ed-green/10 text-ed-green border border-ed-green/20 px-6 py-3 inline-flex items-center gap-2 text-sm shrink-0 justify-center transition-colors hover:bg-ed-green/15"
            >
              <Pause className="w-3.5 h-3.5" /> Pause Surah
            </button>
          ) : (
            <button
              onClick={toggleSurahAudio}
              className="bg-ed-green text-ed-beige px-6 py-3 inline-flex items-center gap-2 text-sm shrink-0 justify-center transition-colors hover:bg-ed-green-dark"
            >
              <Play className="w-3.5 h-3.5" /> {isSurahPlaying ? "Resume Surah" : "Play Full Surah"}
            </button>
          )}
        </div>

        {/* Bismillah */}
        {surah.number !== 1 && surah.number !== 9 && (
          <div className="text-center mb-10 py-8 border-y border-ed-green/8">
            <p className="text-3xl md:text-4xl text-ed-green font-[family-name:var(--font-amiri)] leading-relaxed">بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ</p>
          </div>
        )}

        {/* Quran Text - Mushaf Style */}
        <div className="bg-white border border-ed-green/5 p-6 sm:p-10">
          <div className="text-right font-[family-name:var(--font-scheherazade)] text-2xl sm:text-3xl leading-[3] text-ed-green" dir="rtl">
            {surah.ayahs.map((ayah) => {
              const isPlayingAyah = playingAyahNumber === ayah.numberInSurah;
              // Convert to Arabic-Indic digits
              const arabicNum = ayah.numberInSurah.toString().replace(/\d/g, (d: string) => '٠١٢٣٤٥٦٧٨٩'[parseInt(d)]);
              // U+06DD is "End of Ayah" — Scheherazade New renders digits inside it
              const marker = "\u06DD" + arabicNum;
              
              let ayahText = ayah.text;
              // Strip Basmala from first Ayah if not Surah 1 or 9
              if (ayah.numberInSurah === 1 && surah.number !== 1 && surah.number !== 9) {
                const words = ayahText.split(" ");
                if (words.length > 4) {
                  ayahText = words.slice(4).join(" ");
                }
              }

              return (
                <span
                  key={ayah.numberInSurah}
                  onClick={() => playAyah(ayah)}
                  className={`cursor-pointer transition-colors hover:text-ed-gold ${
                    isPlayingAyah ? "text-ed-gold" : ""
                  }`}
                >
                  {ayahText} {marker}{" "}
                </span>
              );
            })}
          </div>
        </div>

        {englishAyahs.length > 0 && (
          <section className="mt-10 bg-white border border-ed-green/5 p-6 sm:p-10">
            <div className="mb-8 pb-5 border-b border-ed-green/8">
              <h2 className="text-2xl text-ed-green font-semibold mb-2">Quran in English</h2>
              <p className="text-xs text-ed-text-muted tracking-wide">Sahih International translation from AlQuran Cloud API</p>
            </div>

            <div className="space-y-6">
              {englishAyahs.map((ayah) => {
                const isPlayingAyah = playingAyahNumber === ayah.numberInSurah;

                return (
                  <article
                    key={ayah.numberInSurah}
                    className={`border-l-2 pl-5 py-1 ${
                      isPlayingAyah ? "border-ed-gold bg-ed-gold-muted/10" : "border-ed-green/10"
                    }`}
                  >
                    <div className="flex items-start gap-4">
                      <span className="mt-1 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-ed-beige-light text-[11px] font-semibold text-ed-green">
                        {ayah.numberInSurah}
                      </span>
                      <p className="text-base md:text-lg leading-8 text-ed-text-secondary">
                        {ayah.text}
                      </p>
                    </div>
                  </article>
                );
              })}
            </div>
          </section>
        )}

        {/* Page info */}
        {surah.ayahs.length > 0 && (
          <div className="text-center mt-6 text-ed-text-muted text-xs">
            Juz {surah.ayahs[0].juz} · Page {surah.ayahs[0].page}
          </div>
        )}
      </div>

      <Footer />
    </main>
  );
}
