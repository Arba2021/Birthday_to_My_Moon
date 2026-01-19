import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaHeart } from 'react-icons/fa';

interface Heart {
  id: number;
  x: number;
  speed: number;
}

const CatchHearts = () => {
  const [hearts, setHearts] = useState<Heart[]>([]);
  const [score, setScore] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    if (!isPlaying) return;
    const interval = setInterval(() => {
      const newHeart = {
        id: Date.now(),
        x: Math.random() * 80 + 10,
        speed: Math.random() * 2 + 2,
      };
      setHearts(prev => [...prev, newHeart]);
    }, 800);
    return () => clearInterval(interval);
  }, [isPlaying]);

  const catchHeart = (id: number) => {
    setHearts(prev => prev.filter(h => h.id !== id));
    setScore(s => s + 1);
  };

  return (
    <div 
      className="relative w-full h-[500px] bg-black/20 backdrop-blur-sm border border-white/10 rounded-[2rem] overflow-hidden flex flex-col items-center justify-center"
    >
      {!isPlaying ? (
        <div className="text-center z-10">
          <div className="text-6xl mb-4">🤲</div>
          <h3 className="text-2xl text-white font-bold mb-2">Catch My Love</h3>
          <p className="text-pink-200/60 mb-6">Don't let the hearts fall!</p>
          <button 
            onClick={() => setIsPlaying(true)}
            className="px-8 py-3 bg-rose-600 text-white rounded-full font-bold shadow-lg hover:scale-105 transition-transform"
          >
            Start
          </button>
        </div>
      ) : (
        <>
          <div className="absolute top-4 right-6 text-white font-bold text-xl z-20">
            Score: {score}
          </div>
          <AnimatePresence>
            {hearts.map(heart => (
              <motion.button
                key={heart.id}
                initial={{ top: -50, left: `${heart.x}%`, opacity: 0 }}
                animate={{ top: '100%', opacity: 1 }}
                exit={{ scale: 0, opacity: 0 }}
                transition={{ duration: heart.speed, ease: "linear" }}
                onAnimationComplete={() => setHearts(prev => prev.filter(h => h.id !== heart.id))}
                onClick={() => catchHeart(heart.id)}
                className="absolute text-4xl text-rose-500 hover:text-rose-300 drop-shadow-lg cursor-pointer z-10 p-4"
              >
                <FaHeart />
              </motion.button>
            ))}
          </AnimatePresence>
        </>
      )}
    </div>
  );
};

export default CatchHearts;