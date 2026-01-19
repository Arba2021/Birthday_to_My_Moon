import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { poems } from "@/data/poems";
import { FaHeart, FaRegHeart, FaCopy, FaQuoteLeft } from "react-icons/fa";
import { HiChevronLeft, HiChevronRight } from "react-icons/hi";

// --- CONFIG ---
const CATEGORIES = ["Romantic", "Dua", "I Miss You", "Short", "Long"];

export default function Poems() {
  const [activeCategory, setActiveCategory] = useState("Romantic");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const [liked, setLiked] = useState(false);
  const [copied, setCopied] = useState(false);

  const filteredPoems = poems.filter(p => p.category.toLowerCase() === activeCategory.toLowerCase());
  const currentPoem = filteredPoems[currentIndex] || { title: "My Love", content: "I am writing more poems for you..." };

  useEffect(() => {
    setCurrentIndex(0);
    setDirection(0);
    setLiked(false);
  }, [activeCategory]);

  // --- ACTIONS ---
  const nextPoem = () => {
    if (currentIndex < filteredPoems.length - 1) {
      setDirection(1);
      setCurrentIndex(prev => prev + 1);
      setLiked(false);
    }
  };

  const prevPoem = () => {
    if (currentIndex > 0) {
      setDirection(-1);
      setCurrentIndex(prev => prev - 1);
      setLiked(false);
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(currentPoem.content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // --- SWIPE LOGIC ---
  const swipeConfidenceThreshold = 10000;
  const swipePower = (offset: number, velocity: number) => {
    return Math.abs(offset) * velocity;
  };

  const handleDragEnd = (e: any, { offset, velocity }: any) => {
    const swipe = swipePower(offset.x, velocity.x);

    if (swipe < -swipeConfidenceThreshold) {
      nextPoem(); // Swipe Left -> Next
    } else if (swipe > swipeConfidenceThreshold) {
      prevPoem(); // Swipe Right -> Prev
    }
  };

  // --- ANIMATION VARIANTS ---
  const variants = {
    enter: (dir: number) => ({
      x: dir > 0 ? 300 : -300,
      opacity: 0,
      scale: 0.8,
      rotate: dir > 0 ? 5 : -5,
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
      scale: 1,
      rotate: 0,
      transition: { duration: 0.3 }
    },
    exit: (dir: number) => ({
      zIndex: 0,
      x: dir < 0 ? 300 : -300, // If dir is 1 (next), exit left (-300)
      opacity: 0,
      scale: 0.8,
      rotate: dir < 0 ? -5 : 5,
      transition: { duration: 0.3 }
    }),
  };

  return (
    <section className="relative w-full h-full flex flex-col items-center">
      
      {/* 1. CATEGORY TABS (Fixed: justify-start for mobile scrolling) */}
      <div className="w-full flex justify-start md:justify-center gap-3 mb-6 overflow-x-auto no-scrollbar py-4 px-6 snap-x">
        {CATEGORIES.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`
              relative px-5 py-2 rounded-full text-xs md:text-sm font-bold tracking-wide transition-all duration-300 whitespace-nowrap snap-center shrink-0
              ${activeCategory === cat 
                ? "bg-gradient-to-r from-rose-500 to-pink-600 text-white shadow-[0_0_15px_rgba(244,63,94,0.6)] scale-105 border border-white/20" 
                : "bg-black/30 text-pink-200/60 hover:bg-white/10 hover:text-white border border-white/5"}
            `}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* 2. THE SWIPEABLE DECK */}
      <div className="relative w-full max-w-md h-[520px] flex items-center justify-center perspective-1000">
        
        <AnimatePresence initial={false} custom={direction} mode="popLayout">
          <motion.div
            key={activeCategory + currentIndex}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            
            // --- SWIPE PROPS ---
            drag="x"
            dragConstraints={{ left: 0, right: 0 }} // Snap back if not swiped far enough
            dragElastic={0.7}
            onDragEnd={handleDragEnd}
            
            className="absolute w-full h-full p-6 md:p-8 flex flex-col cursor-grab active:cursor-grabbing"
          >
            {/* GLASS CARD */}
            <div className="relative w-full h-full bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl border border-white/20 rounded-[2rem] shadow-[0_10px_40px_rgba(0,0,0,0.3)] flex flex-col items-center justify-between overflow-hidden">
              
              {/* Shine BG */}
              <div className="absolute -top-20 -right-20 w-40 h-40 bg-rose-500/20 blur-[50px] rounded-full pointer-events-none" />
              
              {/* Header */}
              <div className="w-full flex justify-between items-center p-5 border-b border-white/5">
                <FaQuoteLeft className="text-white/20 text-xl" />
                <span className="text-[10px] text-pink-200/50 uppercase tracking-[0.2em] font-bold">
                  {currentIndex + 1} / {filteredPoems.length}
                </span>
                <button 
                  onClick={(e) => { e.stopPropagation(); copyToClipboard(); }} 
                  className="text-white/40 hover:text-white transition-colors"
                >
                  {copied ? <span className="text-xs text-green-400 font-bold">Copied!</span> : <FaCopy />}
                </button>
              </div>

              {/* Scrollable Text Area (Touch-action pan-y allows scrolling text vertically without triggering swipe) */}
              <div 
                className="flex-1 w-full overflow-y-auto no-scrollbar flex flex-col items-center justify-center text-center p-4 touch-pan-y"
                onPointerDownCapture={(e) => e.stopPropagation()} // Optional: helps text selection
              >
                <h3 className="text-2xl md:text-3xl text-white mb-4 drop-shadow-md leading-tight" style={{ fontFamily: "'Great Vibes', cursive" }}>
                  {currentPoem.title}
                </h3>
                <p className="text-pink-100/90 text-sm md:text-base leading-relaxed font-serif italic whitespace-pre-line select-text">
                  {currentPoem.content}
                </p>
              </div>

              {/* Footer */}
              <div className="w-full p-4 border-t border-white/5 flex justify-center pb-6">
                 <button 
                   onClick={(e) => { e.stopPropagation(); setLiked(!liked); }}
                   className="group relative flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 hover:bg-rose-500/20 transition-all border border-white/5 hover:border-rose-500/30"
                 >
                    <motion.span 
                      animate={liked ? { scale: [1, 1.4, 1] } : {}}
                      className={`${liked ? 'text-rose-500' : 'text-white/40 group-hover:text-rose-400'} text-xl transition-colors`}
                    >
                      {liked ? <FaHeart /> : <FaRegHeart />}
                    </motion.span>
                    <span className="text-[10px] text-white/50 uppercase tracking-widest font-bold">
                      {liked ? "Saved" : "Save Poem"}
                    </span>
                 </button>
              </div>

            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* 3. NAVIGATION HINT (Updated) */}
      <div className="flex items-center gap-6 mt-6 opacity-60">
        <button 
          onClick={prevPoem} 
          disabled={currentIndex === 0}
          className="p-2 rounded-full border border-white/20 text-white hover:bg-white/10 disabled:opacity-0 transition-all"
        >
          <HiChevronLeft size={20} />
        </button>

        <span className="text-[10px] text-pink-200 uppercase tracking-[0.2em] animate-pulse">
          Swipe to Read
        </span>

        <button 
          onClick={nextPoem} 
          disabled={currentIndex === filteredPoems.length - 1}
          className="p-2 rounded-full border border-white/20 text-white hover:bg-white/10 disabled:opacity-0 transition-all"
        >
          <HiChevronRight size={20} />
        </button>
      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Great+Vibes&display=swap');
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </section>
  );
}