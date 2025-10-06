'use client';

import { useState, useRef, useEffect } from 'react';
import Image, { StaticImageData } from 'next/image';

const PlayIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
    <path d="M8 5v14l11-7z"/>
  </svg>
);

const PauseIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
    <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/>
  </svg>
);

type AudioPreviewProps = {
  audioSrc: string;
  waveformSrc: StaticImageData;
  alt: string;
};

export default function AudioPreview({ audioSrc, waveformSrc, alt }: AudioPreviewProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const audioRef = useRef<HTMLAudioElement>(null);
  const animationFrameId = useRef<number>(0);

  // pause and manage animation loop
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const animate = () => {
      if (audio.duration > 0) {
        setProgress((audio.currentTime / audio.duration) * 100);
      }
      animationFrameId.current = requestAnimationFrame(animate);
    };

    if (isPlaying) {
      animationFrameId.current = requestAnimationFrame(animate);
    }
    else {
      audio.pause();
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }
    }

    return () => {
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }
    };
  }, [isPlaying]);

  const togglePlayPause = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      setIsPlaying(false);
    }
    else {
      audio.play().catch(error => {
        console.error("Error attempting to play audio:", error);
      });
      setIsPlaying(true);
    }
  };

  const onEnded = () => {
    setIsPlaying(false);
    setProgress(0);
  };

  return (
    <div
      className="relative w-full aspect-video rounded-lg overflow-hidden group cursor-pointer"
      style={{ backgroundColor: "#0a0a0af2" }}
      onClick={togglePlayPause}
    >
      <Image
        src={waveformSrc}
        alt={alt}
        fill
        className="object-contain rounded-2xl p-4 md:p-2"
      />
      <div
        className={`
          ${isPlaying || progress > 0 ? "opacity-100" : "opacity-0"}
          absolute top-0 h-full w-0.5 
          bg-white/70 shadow-[0_0_5px_rgba(255, 255, 255, 0.8)] 
          pointer-events-none
        `}
        style={{ left: `${progress}%` }}
      />
      <div 
        className="
          absolute inset-0 flex items-center justify-center 
          bg-transparent md:bg-black/30 text-white/70 
          opacity-100 md:opacity-0 group-hover:opacity-100 
          transition-opacity duration-300
        "
      >
        {isPlaying ? <PauseIcon /> : <PlayIcon />}
      </div>
      <audio
        ref={audioRef}
        src={audioSrc}
        onEnded={onEnded}
        preload="metadata"
      />
    </div>
  );
}
