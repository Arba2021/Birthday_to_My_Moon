import { useCallback, useEffect, useRef } from 'react';

export const useSound = (url: string, volume: number = 0.5) => {
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    const audio = new Audio(url);
    audio.volume = volume;
    audioRef.current = audio;

    return () => {
      audio.pause(); 
      audioRef.current = null;
    };
  }, [url, volume]);

  const play = useCallback(() => {
    if (audioRef.current) {
      audioRef.current.currentTime = 0;
      audioRef.current.play().catch(() => {
        // Ignored: User hasn't interacted with document yet
      });
    }
  }, []);

  return play;
};

export default useSound;