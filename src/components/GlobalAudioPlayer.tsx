"use client";

import { useAudio } from "@/context/AudioContext";
import { useLanguage } from "@/context/LanguageContext";
import { Play, Pause, X, Volume2, Volume1, VolumeX, SkipForward, SkipBack } from "lucide-react";

export default function GlobalAudioPlayer() {
  const { currentTrack, isPlaying, togglePlayPause, stopAudio, volume, setVolume, playlist, currentIndex, playPlaylist } = useAudio();
  const { language } = useLanguage();

  if (!currentTrack) return null;

  const isArabic = language === "ar";
  const isRadio = currentTrack.type === "radio";
  const hasPlaylist = playlist.length > 1;

  const handleNext = () => { if (currentIndex < playlist.length - 1) playPlaylist(playlist, currentIndex + 1); };
  const handlePrev = () => { if (currentIndex > 0) playPlaylist(playlist, currentIndex - 1); };

  const VolumeIcon = volume === 0 ? VolumeX : volume < 0.5 ? Volume1 : Volume2;

  return (
    <div className="mb-8">
      <div className="bg-ed-green rounded-xl shadow-lg overflow-hidden">
        <div className="px-5 sm:px-6 py-4 flex items-center gap-4">

          {/* Track Info */}
          <div className="flex items-center gap-3.5 flex-1 min-w-0">
            {/* Icon/Visualizer */}
            <div className={`w-11 h-11 rounded-lg bg-white/10 flex items-center justify-center flex-shrink-0 ${isPlaying && isRadio ? "animate-pulse" : ""}`}>
              {isPlaying ? (
                <div className="flex gap-[3px] items-end h-4">
                  <span className="w-[3px] rounded-full bg-ed-gold animate-[bounce_1s_infinite]" style={{ height: '8px' }}></span>
                  <span className="w-[3px] rounded-full bg-ed-gold animate-[bounce_1.2s_infinite]" style={{ height: '14px' }}></span>
                  <span className="w-[3px] rounded-full bg-ed-gold animate-[bounce_0.8s_infinite]" style={{ height: '6px' }}></span>
                  <span className="w-[3px] rounded-full bg-ed-gold animate-[bounce_1.1s_infinite]" style={{ height: '10px' }}></span>
                </div>
              ) : (
                <Pause className="w-4 h-4 text-ed-gold" />
              )}
            </div>

            {/* Text */}
            <div className="flex-1 min-w-0">
              <p className="text-[10px] text-ed-gold uppercase tracking-[0.2em] mb-0.5 font-semibold">
                {isRadio ? "البث المباشر" : "يُتلى الآن"}
              </p>
              <p className="text-sm text-white font-[family-name:var(--font-tajawal)] truncate font-medium">
                {currentTrack.title}
              </p>
              {currentTrack.subtitle && (
                <p className="text-xs text-white/40 truncate">{currentTrack.subtitle}</p>
              )}
            </div>
          </div>

          {/* Playback Controls */}
          <div className="flex items-center gap-2 sm:gap-3" dir="ltr">
            {hasPlaylist && (
              <button onClick={handlePrev} disabled={currentIndex === 0} className="text-white/40 hover:text-white disabled:opacity-20 transition-colors p-1.5">
                <SkipBack className="w-4 h-4" />
              </button>
            )}

            <button
              onClick={togglePlayPause}
              className="w-10 h-10 rounded-full flex items-center justify-center bg-ed-gold text-ed-green-dark hover:bg-ed-gold/90 transition-all shadow-md"
            >
              {isPlaying ? <Pause className="w-4 h-4 fill-current" /> : <Play className="w-4 h-4 fill-current" style={{ marginLeft: '2px' }} />}
            </button>

            {hasPlaylist && (
              <button onClick={handleNext} disabled={currentIndex === playlist.length - 1} className="text-white/40 hover:text-white disabled:opacity-20 transition-colors p-1.5">
                <SkipForward className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Volume & Close */}
          <div className="flex items-center gap-2 shrink-0">
            {/* Volume Control */}
            <div className="hidden sm:flex items-center gap-2">
              <button onClick={() => setVolume(volume === 0 ? 0.8 : 0)} className="text-white/40 hover:text-ed-gold transition-colors p-1">
                <VolumeIcon className="w-4 h-4" />
              </button>
              <input
                  type="range" min="0" max="1" step="0.01" value={volume}
                  onChange={(e) => setVolume(parseFloat(e.target.value))}
                  className="volume-slider w-20"
                  dir="ltr"
                  style={{
                    background: `linear-gradient(to right, var(--gold) 0%, var(--gold) ${volume * 100}%, rgba(255,255,255,0.12) ${volume * 100}%, rgba(255,255,255,0.12) 100%)`,
                    height: '3px',
                    borderRadius: '999px',
                  }}
                />
            </div>

            {/* Divider */}
            <div className="w-px h-5 bg-white/10 mx-1 hidden sm:block"></div>

            {/* Close */}
            <button onClick={stopAudio} className="text-white/20 hover:text-red-400 p-1.5 transition-colors" title="إغلاق">
              <X className="w-4 h-4" />
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}
