"use client";

import { useState, useEffect, useMemo } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Search, Radio as RadioIcon, Loader2, Play, Pause } from "lucide-react";
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
  
  const isCurrentlyPlaying = (stationId: number) => {
    return currentTrack?.type === "radio" && currentTrack.id === stationId && isPlaying;
  };

  const isCurrentStation = (stationId: number) => {
    return currentTrack?.type === "radio" && currentTrack.id === stationId;
  };

  useEffect(() => {
    const fetchRadios = async () => {
      try {
        // Use our own API proxy to avoid CORS
        const res = await fetch("/api/radios");
        const data = await res.json();
        if (data.radios && data.radios.length > 0) {
          const mapped = data.radios.map((r: RadioApiStation, index: number) => ({
            id: r.id || index + 1,
            name: r.name,
            url: r.url ? r.url.replace("http://", "https://") : r.url,
          }));
          setStations(mapped);
        } else {
          setError("No stations available. Please try again later.");
        }
      } catch {
        setError("Failed to load radio stations. Please try again later.");
      } finally {
        setLoading(false);
      }
    };
    fetchRadios();
  }, []);

  const filtered = useMemo(() => {
    if (!search.trim()) {
      return stations;
    }

    const normalizedSearch = search.toLowerCase();
    return stations.filter((s) => s.name.includes(search) || s.name.toLowerCase().includes(normalizedSearch));
  }, [search, stations]);

  const togglePlay = (station: RadioStation) => {
    if (isCurrentStation(station.id)) {
      togglePlayPause();
    } else {
      playTrack({
        id: station.id,
        title: station.name,
        url: station.url,
        type: "radio"
      });
    }
  };

  return (
    <main className="min-h-screen bg-emerald-forest pt-24">
      <Navbar />

      <div className="pb-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-gold-soft font-[family-name:var(--font-tajawal)] mb-4">إِذَاعَةُ القُرْآنِ الكَرِيمِ</h1>
          <p className="text-white text-lg">Islamic Radio Stations</p>
          <p className="text-white/60 text-sm mt-4 max-w-2xl mx-auto">
            Listen to live Islamic radio stations from around the world, featuring Quran recitations from renowned reciters.
          </p>
        </div>

        {/* Now Playing Banner */}
        <GlobalAudioPlayer />

        {/* Search */}
        <div className="flat-card p-6 mb-8">
          <h2 className="text-white font-bold mb-4">Search Radio Stations</h2>
          <div className="relative">
            <Search className="w-5 h-5 text-white/50 absolute left-4 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by station name..."
              className="w-full bg-emerald-forest border border-gold-soft/20 text-white rounded-lg pl-12 pr-4 py-3 focus:outline-none focus:border-gold-soft transition-colors"
            />
          </div>
        </div>

        {loading ? (
          <div className="flex justify-center items-center py-24">
            <Loader2 className="w-12 h-12 text-gold-soft animate-spin" />
          </div>
        ) : error ? (
          <div className="text-center py-24 text-white/60">{error}</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {filtered.map((station) => (
              <div key={station.id} className="flat-card p-6 flex flex-col items-center card-hover">
                <div className="mb-6 mt-4">
                  <RadioIcon className={`w-12 h-12 ${isCurrentlyPlaying(station.id) ? "text-gold-soft animate-pulse" : "text-gold-soft"}`} />
                </div>
                <h3 className="text-white font-bold font-[family-name:var(--font-tajawal)] text-center mb-4 text-sm leading-relaxed min-h-[3rem] flex items-center">
                  {station.name}
                </h3>

                <div className="bg-white/10 px-3 py-1 rounded text-xs text-white/70 mb-6 flex items-center gap-2">
                  <span className={`w-2 h-2 rounded-full ${isCurrentlyPlaying(station.id) ? "bg-red-400 animate-pulse" : "bg-gold-soft"}`}></span>
                  {isCurrentStation(station.id) ? "Selected" : "Live Radio"}
                </div>

                <button
                  onClick={() => togglePlay(station)}
                  className={`w-full font-medium py-3 rounded-lg transition-colors flex items-center justify-center gap-2 text-sm mt-auto ${
                    isCurrentStation(station.id)
                      ? isCurrentlyPlaying(station.id)
                        ? "bg-emerald-deep text-gold-soft border border-gold-soft/30 shadow-[inset_0_2px_10px_rgba(0,0,0,0.2)]"
                        : "bg-emerald-mid hover:bg-emerald-deep text-white border border-gold-soft/50"
                      : "bg-emerald-mid hover:bg-emerald-deep text-white border border-white/10"
                  }`}
                >
                  {isCurrentlyPlaying(station.id) ? (
                    <>
                      <Pause className="w-4 h-4" /> Pause
                    </>
                  ) : isCurrentStation(station.id) ? (
                     <>
                      <Play className="w-4 h-4 text-gold-soft" /> Resume
                    </>
                  ) : (
                    <>
                      <Play className="w-4 h-4 text-gold-soft" /> Listen Live
                    </>
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
