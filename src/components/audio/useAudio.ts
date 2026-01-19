import { useState, useEffect, useRef } from 'react';

// ✅ UPDATED: Added 'autoPlay' parameter (defaults to false)
export const useAudio = (url: string, defaultVolume: number = 0.3, autoPlay: boolean = false) => {
  // ✅ Initialize state based on autoPlay preference
  const [playing, setPlaying] = useState(autoPlay);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    const audio = new Audio(url);
    audio.loop = true;
    audio.volume = defaultVolume;
    audioRef.current = audio;

    // If autoPlay is on, try to play immediately
    if (autoPlay) {
      const playPromise = audio.play();
      if (playPromise !== undefined) {
        playPromise.catch((error) => {
          console.log("Autoplay prevented by browser:", error);
          setPlaying(false); // Fallback if browser blocks it
        });
      }
    }

    const handleEnded = () => setPlaying(false);
    audio.addEventListener('ended', handleEnded);

    return () => {
      audio.removeEventListener('ended', handleEnded);
      audio.pause();
      audioRef.current = null;
    };
  }, [url, defaultVolume, autoPlay]);

  useEffect(() => {
    if (!audioRef.current) return;
    
    // Skip this effect on mount if we already handled autoplay in the first effect
    // But for toggling later, we need this.
    if (playing) {
      // Only call play if it's paused to avoid errors
      if (audioRef.current.paused) {
        const playPromise = audioRef.current.play();
        if (playPromise !== undefined) {
          playPromise.catch(() => setPlaying(false));
        }
      }
    } else {
      audioRef.current.pause();
    }
  }, [playing]);

  const toggle = () => setPlaying(!playing);

  return { playing, toggle };
};