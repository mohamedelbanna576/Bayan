"use client";

import React, { createContext, useContext, useState, useEffect, useRef, useCallback } from "react";

interface AudioTrack {
  id: string | number;
  title: string;
  subtitle?: string;
  url: string;
  type: "radio" | "quran";
}

interface AudioContextType {
  currentTrack: AudioTrack | null;
  isPlaying: boolean;
  volume: number;
  playTrack: (track: AudioTrack) => void;
  playPlaylist: (tracks: AudioTrack[], startIndex?: number) => void;
  togglePlayPause: () => void;
  stopAudio: () => void;
  setVolume: (v: number) => void;
  playlist: AudioTrack[];
  currentIndex: number;
}

const AudioContext = createContext<AudioContextType | undefined>(undefined);

export function AudioProvider({ children }: { children: React.ReactNode }) {
  const [currentTrack, setCurrentTrack] = useState<AudioTrack | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolumeState] = useState(0.8);
  const [playlist, setPlaylist] = useState<AudioTrack[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Use refs for the internal audio logic so the ended handler always has
  // up-to-date values without relying on functional state updaters
  const playlistRef = useRef<AudioTrack[]>([]);
  const indexRef = useRef(0);
  const isAdvancingRef = useRef(false);

  // Sync refs whenever state changes
  useEffect(() => { playlistRef.current = playlist; }, [playlist]);
  useEffect(() => { indexRef.current = currentIndex; }, [currentIndex]);

  const safePlay = useCallback(async () => {
    if (!audioRef.current) return;
    try {
      await audioRef.current.play();
    } catch (err: any) {
      // AbortError is expected when a new load interrupts an old play — ignore it
      if (err.name !== "AbortError") {
        console.error("Audio playback error:", err);
      }
    }
  }, []);

  const advanceToNext = useCallback(() => {
    // Prevent double-advance (React StrictMode / rapid events)
    if (isAdvancingRef.current) return;
    isAdvancingRef.current = true;

    const pl = playlistRef.current;
    const idx = indexRef.current;

    if (pl.length > 0 && idx < pl.length - 1) {
      const nextIdx = idx + 1;
      const nextTrack = pl[nextIdx];

      // Update state
      setCurrentIndex(nextIdx);
      indexRef.current = nextIdx;
      setCurrentTrack(nextTrack);
      setIsPlaying(true);

      // Load and play next track
      if (audioRef.current) {
        audioRef.current.src = nextTrack.url;
        safePlay();
      }
    } else {
      setIsPlaying(false);
    }

    // Allow next advance after a short delay
    setTimeout(() => { isAdvancingRef.current = false; }, 200);
  }, [safePlay]);

  useEffect(() => {
    if (!audioRef.current) {
      const audio = new Audio();
      audio.volume = volume;
      audioRef.current = audio;

      audio.addEventListener("ended", () => {
        advanceToNext();
      });

      audio.addEventListener("error", () => {
        setIsPlaying(false);
      });
    }

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.src = "";
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const setVolume = useCallback((v: number) => {
    setVolumeState(v);
    if (audioRef.current) {
      audioRef.current.volume = v;
    }
  }, []);

  const playTrack = useCallback((track: AudioTrack) => {
    playlistRef.current = [track];
    indexRef.current = 0;
    setPlaylist([track]);
    setCurrentIndex(0);
    setCurrentTrack(track);
    setIsPlaying(true);

    if (audioRef.current) {
      audioRef.current.src = track.url;
      safePlay();
    }
  }, [safePlay]);

  const playPlaylist = useCallback((tracks: AudioTrack[], startIndex = 0) => {
    if (tracks.length === 0) return;

    playlistRef.current = tracks;
    indexRef.current = startIndex;
    setPlaylist(tracks);
    setCurrentIndex(startIndex);
    setCurrentTrack(tracks[startIndex]);
    setIsPlaying(true);

    if (audioRef.current) {
      audioRef.current.src = tracks[startIndex].url;
      safePlay();
    }
  }, [safePlay]);

  const togglePlayPause = useCallback(() => {
    if (!audioRef.current) return;

    if (audioRef.current.paused) {
      safePlay();
      setIsPlaying(true);
    } else {
      audioRef.current.pause();
      setIsPlaying(false);
    }
  }, [safePlay]);

  const stopAudio = useCallback(() => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
      audioRef.current.src = "";
    }
    playlistRef.current = [];
    indexRef.current = 0;
    setIsPlaying(false);
    setCurrentTrack(null);
    setPlaylist([]);
    setCurrentIndex(0);
  }, []);

  return (
    <AudioContext.Provider
      value={{
        currentTrack,
        isPlaying,
        volume,
        playTrack,
        playPlaylist,
        togglePlayPause,
        stopAudio,
        setVolume,
        playlist,
        currentIndex
      }}
    >
      {children}
    </AudioContext.Provider>
  );
}

export function useAudio() {
  const context = useContext(AudioContext);
  if (context === undefined) {
    throw new Error("useAudio must be used within an AudioProvider");
  }
  return context;
}
