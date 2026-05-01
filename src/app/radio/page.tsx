"use client";

import { useState, useEffect, useMemo } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Search, Loader2, Play, Pause } from "lucide-react";
import { useAudio } from "@/context/AudioContext";
import GlobalAudioPlayer from "@/components/GlobalAudioPlayer";

interface RadioStation {
  id: number;
  name: string;
  url: string;
}

interface RadioApiStation {
  id?: number;
  name: string;
  url: string;
}

export default function IslamicRadio() {
  const [stations, setStations] = useState<RadioStation[]>([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { currentTrack, isPlaying, playTrack, togglePlayPause } = useAudio();

  const isCurrentlyPlaying = (stationId: number) =>
    currentTrack?.type === "radio" && currentTrack.id === stationId && isPlaying;
  const isCurrentStation = (stationId: number) =>
    currentTrack?.type === "radio" && currentTrack.id === stationId;

  useEffect(() => {
    const fetchRadios = async () => {
      try {
        const res = await fetch("/api/radios");
        const data = await res.json();
        if (data.radios && data.radios.length > 0) {
          setStations(
            data.radios.map((r: RadioApiStation, index: number) => ({
              id: r.id || index + 1,
              name: r.name,
              url: r.url ? r.url.replace("http://", "https://") : r.url,
            }))
          );
        } else setError("No stations available.");
      } catch { setError("Failed to load radio stations."); }
      finally { setLoading(false); }
    };
    fetchRadios();
  }, []);

  const filtered = useMemo(() => {
    if (!search.trim()) return stations;
    const q = search.toLowerCase();
    return stations.filter((s) => s.name.includes(search) || s.name.toLowerCase().includes(q));
  }, [search, stations]);

  const togglePlay = (station: RadioStation) => {
    if (isCurrentStation(station.id)) togglePlayPause();
    else playTrack({ id: station.id, title: station.name, url: station.url, type: "radio" });
  };

  return (
    <main className="min-h-screen bg-ed-beige pt-20">
      <Navbar />

      <div className="max-w-5xl mx-auto px-6 lg:px-10 pt-12 pb-24">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-12">
          <div>
            <h1 className="text-5xl md:text-6xl font-[family-name:var(--font-tajawal)] text-ed-green font-bold mb-3">
              إذاعة القرآن الكريم  </h1>

            <p className="text-sm text-ed-text-muted tracking-wide">
              Islamic Radio Stations — Live Quran recitations from renowned reciters
            </p>
          </div>
          <div className="relative w-full lg:w-72">
            <Search className="w-4 h-4 text-ed-text-muted absolute left-4 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search stations..."
              className="w-full bg-white border border-ed-green/10 text-ed-text rounded-none pl-11 pr-4 py-3 text-sm focus:outline-none focus:border-ed-green/30 transition-colors placeholder:text-ed-text-muted"
            />
          </div>
        </div>

        <div className="h-px bg-ed-green/8 mb-8"></div>

        <GlobalAudioPlayer />

        {loading ? (
          <div className="flex justify-center items-center py-32">
            <Loader2 className="w-8 h-8 text-ed-green-soft animate-spin" />
          </div>
        ) : error ? (
          <div className="text-center py-24 text-ed-text-muted text-sm">{error}</div>
        ) : (
          <div className="space-y-0">
            {filtered.map((station, index) => (
              <div
                key={station.id}
                className={`flex items-center justify-between py-4 px-4 transition-colors hover:bg-white group ${index > 0 ? "border-t border-ed-green/5" : ""
                  } ${isCurrentStation(station.id) ? "bg-white" : ""}`}
              >
                <div className="flex items-center gap-4 flex-1 min-w-0">
                  {isCurrentlyPlaying(station.id) && (
                    <div className="flex gap-0.5 items-end h-4 flex-shrink-0">
                      <span className="w-0.5 h-2 bg-ed-gold animate-[bounce_1s_infinite]"></span>
                      <span className="w-0.5 h-3 bg-ed-gold animate-[bounce_1.2s_infinite]"></span>
                      <span className="w-0.5 h-1.5 bg-ed-gold animate-[bounce_0.8s_infinite]"></span>
                    </div>
                  )}
                  <span className="text-sm text-ed-green font-[family-name:var(--font-tajawal)] truncate">
                    {station.name}
                  </span>
                </div>

                <button
                  onClick={() => togglePlay(station)}
                  className={`flex items-center gap-2 px-4 py-2 text-xs font-medium transition-all flex-shrink-0 ${isCurrentStation(station.id)
                    ? isCurrentlyPlaying(station.id)
                      ? "bg-ed-green text-ed-beige"
                      : "bg-ed-green/10 text-ed-green border border-ed-green/20"
                    : "bg-white border border-ed-green/10 text-ed-text-muted hover:border-ed-green/20 hover:text-ed-green opacity-0 group-hover:opacity-100"
                    }`}
                >
                  {isCurrentlyPlaying(station.id) ? (
                    <><Pause className="w-3 h-3" /> Pause</>
                  ) : isCurrentStation(station.id) ? (
                    <><Play className="w-3 h-3" /> Resume</>
                  ) : (
                    <><Play className="w-3 h-3" /> Listen</>
                  )}
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      <Footer />
    </main>
  );
}
