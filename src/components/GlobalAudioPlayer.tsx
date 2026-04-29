"use client";

import { useAudio } from "@/context/AudioContext";
import { Play, Pause, X, Volume2, Volume1, VolumeX, SkipForward, SkipBack } from "lucide-react";
import { useEffect, useState } from "react";

export default function GlobalAudioPlayer() {
  const { currentTrack, isPlaying, togglePlayPause, stopAudio, volume, setVolume, playlist, currentIndex, playPlaylist } = useAudio();
  const [showVolume, setShowVolume] = useState(false);

  // Hide when not playing or no track
  if (!currentTrack) return null;

  const isRadio = currentTrack.type === "radio";
  const hasPlaylist = playlist.length > 1;

  const handleNext = () => {
    if (currentIndex < playlist.length - 1) {
      playPlaylist(playlist, currentIndex + 1);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      playPlaylist(playlist, currentIndex - 1);
    }
  };

  return (
    <div className="animate-in zoom-in-95 fade-in duration-300 mb-8">
      <div className="glass-card border border-gold-soft/50 bg-emerald-forest/80 p-4 sm:p-6 rounded-2xl shadow-[0_10px_40px_rgba(212,175,55,0.15)] flex flex-col sm:flex-row items-center gap-4 sm:gap-6">
        
        {/* Track Info */}
        <div className="flex items-center gap-4 flex-1 w-full min-w-0">
          <div className={`w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-gold-soft/20 flex items-center justify-center shrink-0 ${isPlaying && isRadio ? 'animate-pulse' : ''}`}>
            {isPlaying ? (
              <div className="flex gap-1 items-end h-4">
                <span className="w-1 h-3 bg-gold-soft animate-[bounce_1s_infinite] origin-bottom"></span>
                <span className="w-1 h-4 bg-gold-soft animate-[bounce_1.2s_infinite] origin-bottom"></span>
                <span className="w-1 h-2 bg-gold-soft animate-[bounce_0.8s_infinite] origin-bottom"></span>
              </div>
            ) : (
              <Pause className="w-6 h-6 text-gold-soft" />
            )}
          </div>
          
          <div className="flex-1 min-w-0">
            <p className="text-xs text-gold-soft font-bold uppercase tracking-widest mb-1">
              {isRadio ? 'Live Radio' : 'Now Playing'}
            </p>
            <p className="text-white font-bold font-[family-name:var(--font-cairo)] text-sm sm:text-base truncate">
              {currentTrack.title}
            </p>
            {currentTrack.subtitle && (
              <p className="text-white/60 text-xs truncate font-[family-name:var(--font-sans)]">
                {currentTrack.subtitle}
              </p>
            )}
          </div>
        </div>

        {/* Controls */}
        <div className="flex items-center gap-4 sm:gap-6 w-full sm:w-auto justify-center">
          {hasPlaylist && (
            <button 
              onClick={handlePrev} 
              disabled={currentIndex === 0}
              className="text-white/60 hover:text-white disabled:opacity-30 transition-colors"
            >
              <SkipBack className="w-5 h-5 sm:w-6 sm:h-6" />
            </button>
          )}

          <button
            onClick={togglePlayPause}
            className="w-12 h-12 flex items-center justify-center shadow-lg transform hover:scale-105 transition-all active:scale-95"
            style={{ 
              backgroundColor: 'var(--gold-soft)', 
              color: 'var(--emerald-forest)',
              borderRadius: '50%',
              border: 'none'
            }}
          >
            {isPlaying ? <Pause className="w-5 h-5 fill-current" /> : <Play className="w-5 h-5 ml-1 fill-current" />}
          </button>

          {hasPlaylist && (
            <button 
              onClick={handleNext} 
              disabled={currentIndex === playlist.length - 1}
              className="text-white/60 hover:text-white disabled:opacity-30 transition-colors"
            >
              <SkipForward className="w-5 h-5 sm:w-6 sm:h-6" />
            </button>
          )}
        </div>

        {/* Volume & Close */}
        <div className="flex items-center gap-3 sm:gap-4 w-full sm:w-auto justify-end">
          <div className="flex items-center gap-2 group relative">
            <button 
              onClick={() => setVolume(volume === 0 ? 0.8 : 0)} 
              className="text-white/60 hover:text-gold-soft transition-colors p-2"
            >
              {volume === 0 ? <VolumeX className="w-5 h-5" /> : volume < 0.5 ? <Volume1 className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
            </button>
            <div className="w-24 hidden sm:block">
              <input
                type="range"
                min="0"
                max="1"
                step="0.01"
                value={volume}
                onChange={(e) => setVolume(parseFloat(e.target.value))}
                className="w-full h-1.5 rounded-full appearance-none cursor-pointer"
                style={{
                  background: `linear-gradient(to right, var(--gold-soft) 0%, var(--gold-soft) ${volume * 100}%, rgba(255,255,255,0.15) ${volume * 100}%, rgba(255,255,255,0.15) 100%)`,
                }}
              />
            </div>
          </div>

          <button
            onClick={stopAudio}
            className="text-white/40 hover:text-red-400 hover:bg-red-500/10 p-2 rounded-full transition-colors ml-2"
            title="Stop & Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        
      </div>
    </div>
  );
}
