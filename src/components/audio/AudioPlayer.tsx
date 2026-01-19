import { motion, AnimatePresence } from 'framer-motion';
import { useAudio } from './useAudio';
import { FaMusic, FaSlash } from 'react-icons/fa';

// Make sure your file is at: public/music/bg.mp3
const bgmUrl = "/music/bg.mp3"; 

const AudioPlayer = () => {
  // ✅ UPDATED: Passed 'true' as the 3rd argument to enable AUTOPLAY
  const { playing, toggle } = useAudio(bgmUrl, 0.4, true);

  return (
    <div className="fixed bottom-6 left-6 z-50">
      <motion.button
        onClick={toggle}
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        whileTap={{ scale: 0.9 }}
        className={`
          relative flex items-center justify-center w-12 h-12 rounded-full 
          backdrop-blur-md border transition-all duration-500 shadow-lg
          ${playing 
            ? 'bg-neonpink/20 border-neonpink/50 shadow-[0_0_20px_rgba(255,79,216,0.4)]' 
            : 'bg-night/40 border-white/10'
          }
        `}
      >
        <AnimatePresence mode='wait'>
          {playing ? (
            <motion.div
              key="playing"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0 }}
              className="absolute inset-0 rounded-full border border-neonpink/30"
              style={{ borderTopColor: 'transparent' }}
              transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
            />
          ) : null}
        </AnimatePresence>

        <motion.div
          animate={{ rotate: playing ? 360 : 0 }}
          transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
          className="relative z-10"
        >
          {playing ? (
            <FaMusic className="text-neonpink text-sm" />
          ) : (
            <div className="relative">
              <FaMusic className="text-textsoft/50 text-sm" />
              <FaSlash className="absolute -top-1 -left-1 text-textsoft/50 text-xs transform rotate-90" />
            </div>
          )}
        </motion.div>
      </motion.button>

      {!playing && (
        <motion.div
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0 }}
          className="absolute left-14 top-1/2 -translate-y-1/2 bg-surface/80 backdrop-blur-md px-3 py-1 rounded-full border border-white/5 whitespace-nowrap"
        >
          <span className="text-[10px] text-textsoft uppercase tracking-wider">
            Play Music
          </span>
        </motion.div>
      )}
    </div>
  );
};

export default AudioPlayer;