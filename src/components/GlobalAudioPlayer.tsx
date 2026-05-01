"use client";

import { useAudio } from "@/context/AudioContext";
import { Play, Pause, X, Volume2, Volume1, VolumeX, SkipForward, SkipBack } from "lucide-react";

export default function GlobalAudioPlayer() {
  const { currentTrack, isPlaying, togglePlayPause, stopAudio, volume, setVolume, playlist, currentIndex, playPlaylist } = useAudio();

  if (!currentTrack) return null;

  const isRadio = currentTrack.type === "radio";
  const hasPlaylist = playlist.length > 1;

  const handleNext = () => { if (currentIndex < playlist.length - 1) playPlaylist(playlist, currentIndex + 1); };
  const handlePrev = () => { if (currentIndex > 0) playPlaylist(playlist, currentIndex - 1); };

  return (
    <div className="mb-8">
      <div className="bg-ed-green p-4 sm:p-5 flex flex-col sm:flex-row items-center gap-4 sm:gap-6">
        {/* Track Info */}
        <div className="flex items-center gap-4 flex-1 w-full min-w-0">
          <div className={`w-10 h-10 bg-ed-green-soft/30 flex items-center justify-center flex-shrink-0 ${isPlaying && isRadio ? "animate-pulse" : ""}`}>
            {isPlaying ? (
              <div className="flex gap-0.5 items-end h-3">
                <span className="w-0.5 h-2 bg-ed-gold animate-[bounce_1s_infinite]"></span>
                <span className="w-0.5 h-3 bg-ed-gold animate-[bounce_1.2s_infinite]"></span>
                <span className="w-0.5 h-1.5 bg-ed-gold animate-[bounce_0.8s_infinite]"></span>
              </div>
            ) : (
              <Pause className="w-4 h-4 text-ed-gold" />
            )}
          </div>

          <div className="flex-1 min-w-0">
            <p className="text-[10px] text-ed-gold uppercase tracking-[0.2em] mb-0.5 font-medium">
              {isRadio ? "Live Radio" : "Now Playing"}
            </p>
            <p className="text-sm text-ed-beige-warm font-[family-name:var(--font-tajawal)] truncate">
              {currentTrack.title}
            </p>
            {currentTrack.subtitle && (
              <p className="text-xs text-ed-beige-warm/50 truncate">{currentTrack.subtitle}</p>
            )}
          </div>
        </div>

        {/* Controls */}
        <div className="flex items-center gap-4 sm:gap-5 w-full sm:w-auto justify-center">
          {hasPlaylist && (
            <button onClick={handlePrev} disabled={currentIndex === 0} className="text-ed-beige-warm/50 hover:text-ed-beige-warm disabled:opacity-30 transition-colors">
              <SkipBack className="w-4 h-4" />
            </button>
          )}

          <button
            onClick={togglePlayPause}
            className="w-10 h-10 flex items-center justify-center bg-ed-gold text-ed-green-dark hover:brightness-105 transition-all"
          >
            {isPlaying ? <Pause className="w-4 h-4 fill-current" /> : <Play className="w-4 h-4 ml-0.5 fill-current" />}
          </button>

          {hasPlaylist && (
            <button onClick={handleNext} disabled={currentIndex === playlist.length - 1} className="text-ed-beige-warm/50 hover:text-ed-beige-warm disabled:opacity-30 transition-colors">
              <SkipForward className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Volume & Close */}
        <div className="flex items-center gap-3 w-full sm:w-auto justify-end">
          <div className="flex items-center gap-2">
            <button onClick={() => setVolume(volume === 0 ? 0.8 : 0)} className="text-ed-beige-warm/50 hover:text-ed-gold transition-colors p-1">
              {volume === 0 ? <VolumeX className="w-4 h-4" /> : volume < 0.5 ? <Volume1 className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
            </button>
            <div className="w-20 hidden sm:block">
              <input
                type="range" min="0" max="1" step="0.01" value={volume}
                onChange={(e) => setVolume(parseFloat(e.target.value))}
                className="w-full h-1 rounded-full appearance-none cursor-pointer"
                style={{
                  background: `linear-gradient(to right, var(--gold) 0%, var(--gold) ${volume * 100}%, rgba(255,255,255,0.15) ${volume * 100}%, rgba(255,255,255,0.15) 100%)`,
                }}
              />
            </div>
          </div>

          <button onClick={stopAudio} className="text-ed-beige-warm/30 hover:text-red-400 p-1.5 transition-colors ml-2" title="Stop & Close">
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
