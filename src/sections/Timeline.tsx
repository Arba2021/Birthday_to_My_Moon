import { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { halalGallery } from '@/data/letter';
import { FaHandSparkles, FaRing, FaLaughSquint, FaPaperPlane, FaStar, FaMosque, FaQuoteLeft } from 'react-icons/fa';

// --- CONFIG: Icon Mapping ---
// We map icons to your specific story moments based on their order
const getIcon = (index: number) => {
  const icons = [
    <FaHandSparkles />, // First Hello
    <FaRing />,         // Proposal
    <FaLaughSquint />,  // "I will kill you" joke
    <FaPaperPlane />,   // Distance
    <FaMosque />,       // Future/Prayer
    <FaStar />,         // Extras
  ];
  return icons[index] || <FaStar />;
};

const TimelineCard = ({ moment, index }: { moment: any, index: number }) => {
  const isEven = index % 2 === 0;

  return (
    <motion.div 
      initial={{ opacity: 0, y: 50, x: isEven ? -50 : 50 }}
      whileInView={{ opacity: 1, y: 0, x: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.7, delay: index * 0.1 }}
      className={`relative flex items-center justify-between mb-24 w-full ${isEven ? 'flex-row-reverse' : ''}`}
    >
      {/* 1. THE CARD (Width 45%) */}
      <div className="w-[85%] md:w-[45%] pl-12 md:pl-0"> 
        <div className="relative group">
            {/* Glow Effect */}
            <div className="absolute -inset-1 bg-gradient-to-r from-rose-500 to-amber-300 rounded-2xl blur opacity-20 group-hover:opacity-40 transition duration-500" />
            
            {/* Glass Container */}
            <div className="relative bg-black/40 backdrop-blur-xl border border-white/10 p-6 md:p-8 rounded-2xl shadow-[0_10px_30px_rgba(0,0,0,0.3)]">
               {/* Shine */}
               <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-rose-400 to-transparent opacity-50" />
               
               {/* Decorative Quote */}
               <FaQuoteLeft className="absolute -top-4 -left-2 text-3xl text-rose-500/20" />

               {/* Title */}
               <h3 className="text-2xl md:text-3xl text-white mb-3 drop-shadow-md" style={{ fontFamily: "'Great Vibes', cursive" }}>
                 {moment.title}
               </h3>

               {/* Story Text */}
               <p className="text-pink-100/80 font-serif italic text-sm md:text-base leading-relaxed">
                 {moment.story}
               </p>
            </div>
        </div>
      </div>

      {/* 2. THE CENTER JEWEL (Absolute Center) */}
      <div className="absolute left-4 md:left-1/2 -translate-x-1/2 flex items-center justify-center z-20">
        <motion.div 
          initial={{ scale: 0 }}
          whileInView={{ scale: 1 }}
          viewport={{ once: true }}
          className="w-12 h-12 md:w-16 md:h-16 rounded-full bg-gradient-to-br from-rose-600 to-purple-800 border-4 border-rose-950 shadow-[0_0_20px_rgba(244,63,94,0.6)] flex items-center justify-center text-white text-xl md:text-2xl z-20"
        >
           {getIcon(index)}
        </motion.div>
        {/* Pulsing Ring */}
        <div className="absolute inset-0 bg-rose-500 rounded-full animate-ping opacity-20" />
      </div>

      {/* 3. EMPTY SPACE (To balance the flex layout on desktop) */}
      <div className="hidden md:block w-[45%]" />

    </motion.div>
  );
};

const Timeline = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });
  
  // Smooth out the progress bar
  const scaleY = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const { ourMoments } = halalGallery;

  return (
    <section ref={containerRef} className="relative min-h-screen py-20 px-4 md:px-0 overflow-hidden">
      
      {/* BACKGROUND AMBIENCE */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(244,63,94,0.05)_0%,transparent_70%)] pointer-events-none" />

      {/* HEADER */}
      <div className="text-center mb-24 relative z-10">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-5xl md:text-7xl text-white drop-shadow-[0_0_15px_rgba(255,255,255,0.4)]"
          style={{ fontFamily: "'Great Vibes', cursive" }}
        >
          Our Story
        </motion.h2>
        <p className="text-pink-200/60 uppercase tracking-[0.3em] text-xs mt-4">
          The Journey of Us
        </p>
      </div>

      <div className="max-w-5xl mx-auto relative">
        
        {/* --- THE GOLDEN THREAD (LINE) --- */}
        {/* Desktop: Center. Mobile: Left aligned (through the jewels) */}
        <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-1 md:-translate-x-1/2 bg-white/10 rounded-full overflow-hidden">
           <motion.div 
             style={{ scaleY }} // This connects the drawing animation
             className="w-full h-full bg-gradient-to-b from-rose-400 via-amber-200 to-rose-500 origin-top shadow-[0_0_20px_#f43f5e]"
           />
        </div>

        {/* --- TIMELINE ITEMS --- */}
        <div className="relative z-10">
          {ourMoments.map((moment, index) => (
            <TimelineCard key={moment.id} moment={moment} index={index} />
          ))}
        </div>

        {/* FINALE STAR */}
        <div className="flex justify-center mt-12 relative z-20">
           <div className="ml-8 md:ml-0 px-6 py-2 rounded-full bg-rose-900/40 border border-rose-500/30 text-rose-200 text-sm font-serif italic">
             To be continued...
           </div>
        </div>

      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Great+Vibes&display=swap');
      `}</style>
    </section>
  );
};

export default Timeline;