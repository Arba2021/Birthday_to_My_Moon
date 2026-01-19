import { useState, useEffect, useRef } from 'react';

export const useAudio = (path: string) => {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    // 1. Get the base URL (e.g., "/Birthday_to_My_Moon/")
    const basePath = import.meta.env.BASE_URL;
    
    // 2. Clean up the path inputs to avoid double slashes
    const cleanPath = path.startsWith('/') ? path.slice(1) : path;
    const cleanBase = basePath.endsWith('/') ? basePath : `${basePath}/`;

    // 3. Create the full URL
    const fullPath = `${cleanBase}${cleanPath}`;

    console.log("🎵 Attempting to play music from:", fullPath); 

    audioRef.current = new Audio(fullPath);
    audioRef.current.loop = true; 
    audioRef.current.volume = 0.5;

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, [path]);

  const toggle = () => {
    if (!audioRef.current) return;

    if (playing) {
      audioRef.current.pause();
    } else {
      const playPromise = audioRef.current.play();
      if (playPromise !== undefined) {
        playPromise.catch((error) => {
          console.error("Playback failed (User interaction needed):", error);
        });
      }
    }
    setPlaying(!playing);
  };

  return { playing, toggle };
};

export default useAudio;