import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Layout & UI
import Navbar from '@/components/layout/Navbar'; 
import Footer from '@/components/layout/Footer';

// Sections
import Hero from '@/sections/Hero';
import Poems from '@/sections/Poems';
import LoveLetter from '@/sections/LoveLetter';
import Timeline from '@/sections/Timeline';
import Games from '@/sections/Games';
import Gifts from '@/sections/Gifts';
import Duas from '@/sections/Duas';
import Finale from '@/sections/Finale';
import Playlist from '@/sections/Playlist'; 

// Global Elements
import CatCorner from '@/components/cat/CatCorner';
import FloatingHearts from '@/components/effects/FloatingHearts';
import AudioPlayer from '@/components/audio/AudioPlayer';
import FireworkIntro from '@/components/effects/FireworkIntro';

// --- WRAPPER: The Page Container ---
const PageContainer = ({ children, onBack, title }: { children: React.ReactNode, onBack: () => void, title: string }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: 20 }}
    transition={{ duration: 0.6, ease: "easeInOut" }}
    className="min-h-screen pt-24 pb-10 px-4 md:px-8 relative z-20"
  >
    {/* ✅ FIXED: Changed from <button> to <div> to 100% prevent refreshing */}
    <motion.div
      onClick={(e) => {
        e.preventDefault(); 
        onBack();
      }}
      initial={{ width: "48px" }}
      whileHover={{ width: "160px" }}
      transition={{ type: "spring", stiffness: 300, damping: 25 }}
      className="fixed top-6 left-6 z-50 h-12 rounded-full 
                 bg-white/5 backdrop-blur-md border border-white/10 
                 flex items-center overflow-hidden shadow-lg group hover:bg-rose-900/80 transition-colors duration-300 cursor-pointer select-none"
      role="button"
    >
      <div className="w-12 h-12 flex items-center justify-center flex-shrink-0">
        <motion.span 
          animate={{ scale: [1, 1.2, 1] }} 
          transition={{ duration: 1.5, repeat: Infinity }}
          className="text-xl filter drop-shadow-md"
        >
          ❤️
        </motion.span>
      </div>
      <span className="whitespace-nowrap text-sm font-serif italic text-rose-100 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pl-1">
        Back to Menu
      </span>
    </motion.div>

    <div className="absolute top-6 right-6 opacity-20 pointer-events-none hidden md:block">
      <h2 className="text-4xl text-white font-serif" style={{ fontFamily: "'Great Vibes', cursive" }}>
        {title}
      </h2>
    </div>

    <div className="max-w-4xl mx-auto h-full">
      {children}
    </div>
  </motion.div>
);

const App = () => {
  // Intro starts as FALSE (so it shows on every refresh)
  const [introFinished, setIntroFinished] = useState(false);
  const [currentView, setCurrentView] = useState('hero'); 

  const handleIntroComplete = () => {
    setIntroFinished(true);
  };

  const navigateTo = (viewId: string) => {
    // Scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
    // Switch view
    setCurrentView(viewId);
  };

  return (
    <>
      {/* 1. Firework Intro (Shows only on Refresh) */}
      <AnimatePresence mode="wait">
        {!introFinished && (
          <motion.div
            key="intro"
            exit={{ opacity: 0 }}
            transition={{ duration: 1.5 }}
            className="fixed inset-0 z-[200]"
          >
            <FireworkIntro onComplete={handleIntroComplete} />
          </motion.div>
        )}
      </AnimatePresence>

      {/* 2. Main App */}
      {introFinished && (
        <motion.div
          key="main-app"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.5, delay: 0.5 }}
          className="relative min-h-screen bg-night text-white overflow-x-hidden selection:bg-neonpink/30"
        >
          <FloatingHearts />
          <AudioPlayer />
          
          <main className="relative z-10">
            <AnimatePresence mode="wait">
              
              {/* VIEW: HERO (The Menu with Options + Cat) */}
              {currentView === 'hero' && (
                <Hero key="hero" onNavigate={navigateTo} />
              )}

              {/* VIEW: PLAYLIST */}
              {currentView === 'playlist' && (
                <PageContainer key="playlist" title="Our Melodies" onBack={() => navigateTo('hero')}>
                  <Playlist />
                </PageContainer>
              )}

              {/* VIEW: POEMS */}
              {currentView === 'poems' && (
                <PageContainer key="poems" title="Poetry" onBack={() => navigateTo('hero')}>
                  <Poems />
                </PageContainer>
              )}

              {/* VIEW: LETTER */}
              {currentView === 'letter' && (
                <PageContainer key="letter" title="Letter" onBack={() => navigateTo('hero')}>
                  <LoveLetter />
                </PageContainer>
              )}

              {/* VIEW: TIMELINE */}
              {currentView === 'timeline' && (
                <PageContainer key="timeline" title="Our Story" onBack={() => navigateTo('hero')}>
                  <Timeline />
                </PageContainer>
              )}

              {/* VIEW: GAMES */}
              {currentView === 'play' && (
                <PageContainer key="play" title="Games" onBack={() => navigateTo('hero')}>
                  <Games />
                </PageContainer>
              )}

              {/* VIEW: GIFTS */}
              {currentView === 'surprises' && (
                <PageContainer key="surprises" title="Surprises" onBack={() => navigateTo('hero')}>
                  <Gifts />
                </PageContainer>
              )}

              {/* VIEW: DUAS */}
              {currentView === 'duas' && (
                <PageContainer key="duas" title="Duas" onBack={() => navigateTo('hero')}>
                  <Duas />
                </PageContainer>
              )}

              {/* VIEW: FOREVER */}
              {currentView === 'forever' && (
                <PageContainer key="forever" title="Forever" onBack={() => navigateTo('hero')}>
                  <Finale />
                </PageContainer>
              )}

            </AnimatePresence>
          </main>

          {/* Footer shows everywhere EXCEPT Hero */}
          {currentView !== 'hero' && <Footer />}
          
          {/* The Cat - Always Visible */}
          <CatCorner />
        </motion.div>
      )}
    </>
  );
};

export default App;