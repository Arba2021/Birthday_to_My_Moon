import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const CHAPTERS = [
  { id: 'hero', title: 'Cover', label: 'The Beginning' },
  { id: 'poetry', title: 'Chapter I', label: 'Words for You' },
  { id: 'story', title: 'Chapter II', label: 'Our Journey' },
  { id: 'letter', title: 'Chapter III', label: 'My Heart' },
  { id: 'gallery', title: 'Chapter IV', label: 'Memories' },
];

const GiftMenu = () => {
  const [isOpen, setIsOpen] = useState(false);

  const scrollToSection = (id: string) => {
    setIsOpen(false);
    const section = document.getElementById(id);
    if (section) section.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      {/* 1. THE TRIGGER (Wax Seal / Heart) */}
      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }} // Fade in late
        onClick={() => setIsOpen(true)}
        className="fixed top-6 right-6 z-50 w-12 h-12 flex items-center justify-center rounded-full bg-white/10 backdrop-blur-md border border-white/20 shadow-[0_0_20px_rgba(255,255,255,0.1)] hover:bg-white/20 transition-all group"
      >
        {/* Simple Menu Icon (Heart) */}
        <span className="text-xl text-pink-200 group-hover:scale-110 transition-transform">❤</span>
      </motion.button>

      {/* 2. THE CHAPTERS DRAWER */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50"
            />

            {/* Drawer */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 h-full w-full max-w-sm bg-[#9f1239] z-[60] shadow-2xl border-l border-white/10 flex flex-col p-8 overflow-y-auto"
              style={{ background: 'linear-gradient(180deg, #9f1239 0%, #be185d 100%)' }}
            >
              {/* Close Button */}
              <button 
                onClick={() => setIsOpen(false)}
                className="self-end text-white/50 hover:text-white p-2 mb-8"
              >
                ✕
              </button>

              {/* Title */}
              <h2 className="text-white font-serif text-3xl italic mb-10 text-center" style={{ fontFamily: "'Playfair Display', serif" }}>
                Table of Contents
              </h2>

              {/* Chapter List */}
              <div className="flex flex-col gap-6">
                {CHAPTERS.map((chapter, i) => (
                  <motion.button
                    key={chapter.id}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1 }}
                    onClick={() => scrollToSection(chapter.id)}
                    className="group text-left"
                  >
                    <span className="block text-pink-200/60 text-xs font-sans tracking-[0.2em] uppercase mb-1">
                      {chapter.title}
                    </span>
                    <span className="block text-2xl text-white font-serif italic group-hover:text-pink-200 transition-colors" style={{ fontFamily: "'Playfair Display', serif" }}>
                      {chapter.label}
                    </span>
                    <div className="h-[1px] w-0 group-hover:w-full bg-white/30 mt-4 transition-all duration-500 ease-out" />
                  </motion.button>
                ))}
              </div>

              {/* Footer Decoration */}
              <div className="mt-auto pt-10 text-center">
                <span className="text-4xl text-white/10">❦</span>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default GiftMenu;