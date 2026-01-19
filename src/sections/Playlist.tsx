import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { playlist } from '@/data/songs';
import { FaPlay, FaYoutube, FaHeadphones, FaExternalLinkAlt, FaChevronDown } from 'react-icons/fa';

const Playlist = () => {
  // CONFIG
  const PLAYLIST_ID = "PLbRh6Y0-zRb5OcJrtPeUOUKJj3MzK5Pg1";
  
  // State: Start with 12 songs, allow expanding to show all
  const [visibleCount, setVisibleCount] = useState(12);
  const [isExpanded, setIsExpanded] = useState(false);

  const handleShowMore = () => {
    setVisibleCount(playlist.length);
    setIsExpanded(true);
  };

  return (
    <section className="min-h-screen py-24 px-4 flex flex-col items-center relative overflow-hidden" id="playlist">
      
      {/* 1. Theme Background (Deep Rose Night) - No heavy black */}
      <div className="absolute inset-0 bg-gradient-to-b from-rose-900 via-rose-950 to-[#0a0a0a] pointer-events-none" />
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-20 pointer-events-none" />
      
      {/* Soft Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-lg h-64 bg-rose-500/10 blur-[80px] pointer-events-none" />

      {/* 2. Header */}
      <div className="relative z-10 text-center mb-16">
        <h2 className="text-5xl md:text-7xl text-white drop-shadow-md mb-4" style={{ fontFamily: "'Great Vibes', cursive" }}>
          Our Melodies
        </h2>
        <p className="text-pink-200/60 uppercase tracking-[0.3em] text-[10px] font-medium mb-8">
          The Soundtrack of Us
        </p>

        {/* Button to Open Full Playlist on YouTube */}
        <motion.a 
          href={`https://www.youtube.com/playlist?list=${PLAYLIST_ID}`}
          target="_blank"
          rel="noopener noreferrer"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-white/5 border border-white/10 hover:bg-rose-600 hover:border-rose-500 transition-all text-xs uppercase tracking-widest text-white/80 hover:text-white mb-8"
        >
          <FaYoutube className="text-lg" /> Open Full Playlist <FaExternalLinkAlt className="text-[10px]" />
        </motion.a>
      </div>

      {/* 3. The Gallery Grid */}
      <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-6xl px-2">
        <AnimatePresence>
          {playlist.slice(0, visibleCount).map((song, index) => (
            <SongCard key={song.id} song={song} index={index} playlistId={PLAYLIST_ID} />
          ))}
        </AnimatePresence>
      </div>

      {/* 4. "Explore All" Button */}
      {!isExpanded && (
        <div className="relative z-20 mt-16 w-full flex flex-col items-center">
          {/* Subtle fade to smooth the cut-off */}
          <div className="absolute bottom-full w-full h-40 bg-gradient-to-t from-rose-950/80 to-transparent pointer-events-none" />
          
          <motion.button
            onClick={handleShowMore}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="group relative px-8 py-3 bg-white/5 hover:bg-rose-600/20 backdrop-blur-md border border-white/10 rounded-full flex items-center gap-3 transition-all duration-300"
          >
            <span className="text-xs uppercase tracking-[0.2em] text-white/80 group-hover:text-white">
              Explore All Songs
            </span>
            <div className="w-6 h-6 rounded-full bg-white/10 flex items-center justify-center group-hover:bg-white/20">
              <FaChevronDown className="text-[10px] text-white animate-bounce" />
            </div>
          </motion.button>
        </div>
      )}

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Great+Vibes&display=swap');
      `}</style>
    </section>
  );
};

// --- SUB-COMPONENT: The Song Card (Glass Style) ---
const SongCard = ({ song, index, playlistId }: { song: any, index: number, playlistId: string }) => {
  const thumbnail = `https://img.youtube.com/vi/${song.videoId}/hqdefault.jpg`;
  const link = `https://www.youtube.com/watch?v=${song.videoId}&list=${playlistId}`;

  return (
    <motion.a
      href={link}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
      // GLASS STYLE: bg-white/5 instead of black
      className="group relative w-full aspect-video rounded-2xl overflow-hidden bg-white/5 backdrop-blur-md border border-white/10 shadow-lg hover:shadow-[0_0_30px_rgba(244,63,94,0.4)] transition-all duration-500"
    >
      {/* Thumbnail */}
      <div className="absolute inset-0 overflow-hidden">
        <img 
          src={thumbnail} 
          alt={song.title} 
          loading="lazy"
          className="w-full h-full object-cover opacity-90 group-hover:opacity-100 group-hover:scale-110 transition-all duration-700"
          onError={(e) => {
            (e.target as HTMLImageElement).src = `https://img.youtube.com/vi/${song.videoId}/mqdefault.jpg`;
          }}
        />
      </div>

      {/* Subtle Gradient (Only at bottom for text) */}
      <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

      {/* Play Button */}
      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500 transform scale-75 group-hover:scale-100">
        <div className="w-14 h-14 rounded-full bg-rose-600/90 backdrop-blur-md flex items-center justify-center shadow-2xl">
          <FaPlay className="text-white ml-1 text-xl" />
        </div>
      </div>

      {/* Text Info */}
      <div className="absolute bottom-0 left-0 w-full p-6 flex flex-col justify-end translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
        <h3 className="text-lg text-white font-serif leading-tight mb-1 group-hover:text-pink-200 transition-colors line-clamp-1 drop-shadow-md">
          {song.title}
        </h3>
        <p className="text-white/70 text-xs font-medium uppercase tracking-widest line-clamp-1">
          {song.artist}
        </p>
      </div>

      {/* Corner Icon */}
      <div className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/10 backdrop-blur-md border border-white/10 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
        <FaHeadphones className="text-white/90 text-xs" />
      </div>

    </motion.a>
  );
};

export default Playlist;