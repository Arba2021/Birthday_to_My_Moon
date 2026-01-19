import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaHeart, FaPuzzlePiece, FaHandHoldingHeart } from 'react-icons/fa';

// --- FIXED IMPORTS: Points to src/games/ ---
import Quiz from '@/games/Quiz';
import MemoryMatch from '@/games/MemoryMatch';
import CatchHearts from '@/games/CatchHearts';

const TABS = [
  { id: 'quiz', label: 'The Heart Test', icon: <FaHeart /> },
  { id: 'memory', label: 'Perfect Match', icon: <FaPuzzlePiece /> },
  { id: 'catch', label: 'Catch My Love', icon: <FaHandHoldingHeart /> },
];

const Games = () => {
  const [activeTab, setActiveTab] = useState('quiz');

  return (
    <section className="min-h-screen py-20 px-4 flex flex-col items-center justify-center relative overflow-hidden">
      
      {/* 1. Header Area */}
      <div className="text-center mb-10 z-10">
        <h2 className="text-5xl md:text-6xl text-white drop-shadow-md mb-2" style={{ fontFamily: "'Great Vibes', cursive" }}>
          Let's Play
        </h2>
        <p className="text-pink-200/60 uppercase tracking-[0.2em] text-xs font-medium">
          Win my heart, over and over
        </p>
      </div>

      {/* 2. Elegant Tab Switcher */}
      <div className="flex justify-center gap-4 mb-12 z-10 flex-wrap">
        {TABS.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`
              relative flex items-center gap-2 px-6 py-3 rounded-full border transition-all duration-300
              ${activeTab === tab.id 
                ? 'bg-rose-600/20 border-rose-400/50 text-white shadow-[0_0_20px_rgba(244,63,94,0.3)]' 
                : 'bg-black/20 border-white/10 text-white/40 hover:bg-white/5 hover:text-white'}
            `}
          >
            <span className="text-lg">{tab.icon}</span>
            <span className="text-sm font-bold tracking-wide uppercase">{tab.label}</span>
          </button>
        ))}
      </div>

      {/* 3. Game Container */}
      <div className="w-full max-w-2xl relative z-10 min-h-[500px]">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
            className="w-full h-full"
          >
            {activeTab === 'quiz' && <Quiz />}
            {activeTab === 'memory' && <MemoryMatch />}
            {activeTab === 'catch' && <CatchHearts />}
          </motion.div>
        </AnimatePresence>
      </div>

    </section>
  );
};

export default Games;