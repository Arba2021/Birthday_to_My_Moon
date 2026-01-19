import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { memoryIcons } from '@/data/quiz'; 
import { triggerConfetti } from '@/components/effects/ConfettiBurst';
import { FaRedo } from 'react-icons/fa';

const MemoryMatch = () => {
  const [cards, setCards] = useState<any[]>([]);
  const [flipped, setFlipped] = useState<number[]>([]);
  const [matched, setMatched] = useState<number[]>([]);
  const [isWon, setIsWon] = useState(false);

  useEffect(() => {
    shuffleCards();
  }, []);

  const shuffleCards = () => {
    const shuffled = [...memoryIcons, ...memoryIcons]
      .sort(() => Math.random() - 0.5)
      .map((card, id) => ({ ...card, uniqueId: id }));
    
    setCards(shuffled);
    setFlipped([]);
    setMatched([]);
    setIsWon(false);
  };

  const handleChoice = (index: number) => {
    if (flipped.length === 2 || flipped.includes(index) || matched.includes(index)) return;

    const newFlipped = [...flipped, index];
    setFlipped(newFlipped);

    if (newFlipped.length === 2) {
      const [first, second] = newFlipped;
      if (cards[first].id === cards[second].id) {
        setMatched(prev => [...prev, first, second]);
        setFlipped([]);
        if (matched.length + 2 === cards.length) {
          triggerConfetti();
          setIsWon(true);
        }
      } else {
        setTimeout(() => setFlipped([]), 1000);
      }
    }
  };

  return (
    <div className="w-full flex flex-col items-center">
      {!isWon ? (
        <div className="grid grid-cols-4 gap-3 md:gap-4 w-full max-w-md">
          {cards.map((card, index) => {
            const isFlipped = flipped.includes(index) || matched.includes(index);
            return (
              <div 
                key={card.uniqueId} 
                className="aspect-square relative cursor-pointer perspective-1000"
                onClick={() => handleChoice(index)}
              >
                <motion.div
                  initial={false}
                  animate={{ rotateY: isFlipped ? 180 : 0 }}
                  transition={{ duration: 0.6, type: "spring" }}
                  style={{ transformStyle: "preserve-3d" }}
                  className="w-full h-full relative"
                >
                  {/* FRONT: Golden Tile */}
                  <div 
                    className="absolute inset-0 backface-hidden rounded-xl bg-gradient-to-br from-amber-200 to-amber-600 border border-white/20 shadow-lg flex items-center justify-center"
                    style={{ backfaceVisibility: 'hidden' }}
                  >
                    <span className="text-2xl opacity-40 mix-blend-overlay">❦</span>
                  </div>

                  {/* BACK: Revealed */}
                  <div 
                    className="absolute inset-0 backface-hidden rounded-xl bg-white flex items-center justify-center text-3xl shadow-xl border-2 border-rose-200"
                    style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}
                  >
                    {card.label}
                  </div>
                </motion.div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="text-center bg-white/5 backdrop-blur-xl border border-white/10 p-10 rounded-[2rem]">
          <h3 className="text-3xl font-bold text-white mb-2">Perfect Match!</h3>
          <p className="text-pink-200/80 mb-6">Just like us.</p>
          <button onClick={shuffleCards} className="flex items-center gap-2 mx-auto text-white hover:text-rose-300 transition-colors">
            <FaRedo /> Play Again
          </button>
        </div>
      )}
    </div>
  );
};

export default MemoryMatch;