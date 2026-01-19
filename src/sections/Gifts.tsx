import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { giftBoxes } from '@/data/gifts';
import { triggerConfetti, triggerHeartExplosion } from '@/components/effects/ConfettiBurst';
import { FaGift, FaTimes, FaHeart, FaFingerprint, FaCat, FaStarAndCrescent } from 'react-icons/fa';

// --- ICONS MAPPING ---
// We assign a specific icon to each box ID for a custom look
const getBoxIcon = (id: string) => {
  switch (id) {
    case 'box1': return <FaCat />;
    case 'box2': return <FaStarAndCrescent />;
    case 'box3': return <FaHeart />;
    default: return <FaGift />;
  }
};

const getBoxColor = (id: string) => {
  switch (id) {
    case 'box1': return 'from-pink-400 to-rose-400';
    case 'box2': return 'from-amber-300 to-yellow-600'; // Golden for Dua
    case 'box3': return 'from-red-500 to-rose-700';
    default: return 'from-rose-400 to-pink-600';
  }
};

const Gifts = () => {
  const [activeBoxId, setActiveBoxId] = useState<string | null>(null);
  const activeBox = giftBoxes.find(b => b.id === activeBoxId);

  return (
    <section className="min-h-screen py-24 px-4 flex flex-col items-center justify-center relative overflow-hidden" id="gifts">
      
      {/* Background Ambience */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(244,63,94,0.1)_0%,transparent_70%)] pointer-events-none" />
      
      {/* Header */}
      <div className="text-center mb-16 relative z-10">
        <h2 className="text-5xl md:text-7xl text-white drop-shadow-[0_0_15px_rgba(255,255,255,0.4)]" style={{ fontFamily: "'Great Vibes', cursive" }}>
          Surprises
        </h2>
        <p className="text-pink-200/60 uppercase tracking-[0.3em] text-xs mt-4">
          Open the Treasury of my Heart
        </p>
      </div>

      {/* --- THE TREASURY GRID --- */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-5xl z-10">
        {giftBoxes.map((box, index) => (
          <motion.button
            key={box.id}
            onClick={() => setActiveBoxId(box.id)}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.2 }}
            whileHover={{ y: -10, scale: 1.02 }}
            whileTap={{ scale: 0.95 }}
            className="group relative h-80 rounded-[2.5rem] bg-black/40 backdrop-blur-xl border border-white/10 flex flex-col items-center justify-center overflow-hidden"
          >
            {/* Inner Glow */}
            <div className={`absolute inset-0 bg-gradient-to-br ${getBoxColor(box.id)} opacity-0 group-hover:opacity-20 transition-opacity duration-500`} />
            <div className={`absolute -top-20 -right-20 w-40 h-40 bg-gradient-to-br ${getBoxColor(box.id)} blur-[60px] opacity-40`} />

            {/* Floating Icon */}
            <motion.div 
              animate={{ y: [-5, 5, -5] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              className={`w-24 h-24 rounded-full bg-gradient-to-br ${getBoxColor(box.id)} flex items-center justify-center text-4xl text-white shadow-[0_10px_30px_rgba(0,0,0,0.3)] mb-6 group-hover:scale-110 transition-transform duration-500`}
            >
              {getBoxIcon(box.id)}
            </motion.div>

            {/* Title */}
            <h3 className="text-2xl text-white font-serif tracking-wide group-hover:text-pink-200 transition-colors">
              {box.title.split('—')[1] || "Gift Box"}
            </h3>
            
            <span className="mt-4 px-4 py-1 rounded-full border border-white/20 text-[10px] text-white/50 uppercase tracking-widest group-hover:bg-white/10 transition-all">
              Tap to Reveal
            </span>
          </motion.button>
        ))}
      </div>

      {/* --- THE REVEAL MODAL --- */}
      <AnimatePresence>
        {activeBox && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            
            {/* Dark Backdrop */}
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setActiveBoxId(null)}
              className="absolute inset-0 bg-black/90 backdrop-blur-md"
            />
            
            {/* The Stage */}
            <motion.div 
              initial={{ scale: 0.8, opacity: 0, y: 50 }} 
              animate={{ scale: 1, opacity: 1, y: 0 }} 
              exit={{ scale: 0.8, opacity: 0, y: 50 }}
              className="relative w-full max-w-lg bg-gradient-to-br from-gray-900 to-black border border-white/10 rounded-[3rem] p-8 md:p-12 shadow-2xl overflow-hidden text-center"
            >
              {/* Close Button */}
              <button 
                onClick={() => setActiveBoxId(null)}
                className="absolute top-6 right-6 w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-white/50 hover:bg-white/20 hover:text-white transition-all z-50"
              >
                <FaTimes />
              </button>

              {/* Dynamic Content Based on Box Type */}
              <div className="relative z-10">
                <h3 className="text-2xl md:text-3xl text-white font-serif mb-2">
                  {activeBox.title.split('—')[1]}
                </h3>
                <p className="text-white/40 text-xs uppercase tracking-widest mb-8">
                  {activeBox.hint}
                </p>

                {activeBox.revealType === 'cat_tap_letter' && <CatReveal box={activeBox} />}
                {activeBox.revealType === 'dua' && <DuaReveal box={activeBox} />}
                {activeBox.revealType === 'heartbeat_name' && <HeartbeatReveal box={activeBox} />}
              </div>

            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </section>
  );
};

// --- SUB-COMPONENTS FOR REVEALS ---

// 1. Cat Reveal (Tap through steps)
const CatReveal = ({ box }: { box: any }) => {
  const [step, setStep] = useState(0);

  const handleTap = () => {
    if (step < box.steps.length) {
      setStep(s => s + 1);
      if (step === box.steps.length - 1) triggerConfetti();
    }
  };

  return (
    <div className="h-64 flex flex-col items-center justify-center" onClick={handleTap}>
      <AnimatePresence mode='wait'>
        {step < box.steps.length ? (
          <motion.div
            key={step}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, y: -20 }}
            className="cursor-pointer"
          >
            <p className="text-xl md:text-2xl text-pink-100 font-serif leading-relaxed px-4">
              "{box.steps[step]}"
            </p>
            <p className="mt-8 text-xs text-white/30 animate-pulse uppercase tracking-widest">
              Tap to continue...
            </p>
          </motion.div>
        ) : (
          <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="text-center">
            <div className="text-8xl mb-4">😻</div>
            <p className="text-rose-300 font-serif text-xl">"Forever Yours"</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

// 2. Dua Reveal (Golden Light Beam)
const DuaReveal = ({ box }: { box: any }) => {
  return (
    <div className="relative h-auto py-4">
      {/* Light Beam Effect */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-64 bg-amber-500/20 blur-[50px] -z-10" />
      
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="space-y-6"
      >
        <p className="text-2xl md:text-4xl text-amber-200 leading-loose drop-shadow-[0_0_10px_rgba(251,191,36,0.5)]" dir="rtl" style={{ fontFamily: 'serif' }}>
          {box.arabic}
        </p>
        <div className="w-16 h-px bg-amber-500/30 mx-auto" />
        <p className="text-pink-100/80 italic text-sm md:text-base leading-relaxed">
          {box.translation}
        </p>
        <motion.button 
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={triggerConfetti}
          className="mt-4 px-8 py-2 rounded-full bg-amber-600/20 border border-amber-500/50 text-amber-200 text-sm font-bold uppercase tracking-widest hover:bg-amber-600 hover:text-white transition-all"
        >
          {box.ctaLabel}
        </motion.button>
      </motion.div>
    </div>
  );
};

// 3. Heartbeat Reveal (Pulse Interaction)
const HeartbeatReveal = ({ box }: { box: any }) => {
  const [beatIndex, setBeatIndex] = useState(0);
  const isComplete = beatIndex >= box.beats.length;

  const handleBeat = () => {
    if (!isComplete) {
      setBeatIndex(i => i + 1);
      // Visual feedback handled by motion below
    }
    if (beatIndex === box.beats.length - 1) triggerHeartExplosion();
  };

  return (
    <div className="h-64 flex flex-col items-center justify-center">
      {!isComplete ? (
        <motion.button
          whileTap={{ scale: 0.8 }}
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 0.8, repeat: Infinity }}
          onClick={handleBeat}
          className="w-32 h-32 rounded-full bg-gradient-to-tr from-rose-600 to-red-600 flex items-center justify-center shadow-[0_0_50px_rgba(225,29,72,0.6)] border-4 border-rose-950"
        >
          <FaFingerprint className="text-5xl text-rose-200/50" />
        </motion.button>
      ) : (
        <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="text-center">
          <h3 className="text-6xl text-white font-bold mb-4 drop-shadow-[0_0_20px_rgba(255,45,85,1)]" style={{ fontFamily: "'Great Vibes', cursive" }}>
            {box.name}
          </h3>
          <p className="text-pink-200/80 text-sm max-w-xs mx-auto italic">
            {box.finalMessage}
          </p>
        </motion.div>
      )}

      {/* Progress Text */}
      {!isComplete && (
        <div className="mt-10 h-8">
           <AnimatePresence mode='wait'>
             <motion.span 
               key={beatIndex}
               initial={{ opacity: 0, y: 10 }}
               animate={{ opacity: 1, y: 0 }}
               className="text-3xl font-serif font-bold text-white tracking-widest"
             >
               {box.beats[beatIndex] || ""}
             </motion.span>
           </AnimatePresence>
        </div>
      )}
    </div>
  );
};

export default Gifts;