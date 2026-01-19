import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { quizQuestions } from '@/data/quiz';
import { triggerConfetti } from '@/components/effects/ConfettiBurst';
import { FaHeart, FaChevronRight, FaRedo } from 'react-icons/fa';

const Quiz = () => {
  const [currentQ, setCurrentQ] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [isFinished, setIsFinished] = useState(false);

  const question = quizQuestions[currentQ];

  const handleAnswer = (index: number) => {
    if (showExplanation) return; 
    setSelected(index);
    setShowExplanation(true); // Always show explanation for flow
    
    if (index === question.correctIndex) {
      triggerConfetti();
    }
  };

  const nextQuestion = () => {
    if (currentQ < quizQuestions.length - 1) {
      setCurrentQ(prev => prev + 1);
      setSelected(null);
      setShowExplanation(false);
    } else {
      setIsFinished(true);
    }
  };

  if (isFinished) {
    return (
      <div className="flex flex-col items-center justify-center p-10 text-center bg-white/5 backdrop-blur-xl border border-white/10 rounded-[2rem]">
        <div className="text-6xl mb-4">👑</div>
        <h3 className="text-3xl text-white font-serif mb-2">You Know Me Best</h3>
        <p className="text-pink-200/70 mb-8">Every answer was love.</p>
        <button 
          onClick={() => { setIsFinished(false); setCurrentQ(0); setSelected(null); setShowExplanation(false); }}
          className="flex items-center gap-2 text-white/50 hover:text-white transition-colors"
        >
          <FaRedo /> Play Again
        </button>
      </div>
    );
  }

  return (
    <div className="relative w-full bg-white/5 backdrop-blur-xl border border-white/10 rounded-[2rem] p-6 md:p-10 shadow-2xl">
      <div className="flex justify-between text-xs text-white/30 uppercase tracking-widest mb-6">
        <span>Question {currentQ + 1}</span>
        <span>{quizQuestions.length} Total</span>
      </div>

      <h3 className="text-2xl md:text-3xl text-white font-bold mb-8 leading-snug">
        {question.question}
      </h3>

      <div className="space-y-3">
        {question.options.map((option, idx) => {
          let btnClass = "bg-black/20 border-white/10 text-white/70 hover:bg-white/10";
          if (showExplanation) {
            if (idx === question.correctIndex) btnClass = "bg-green-500/20 border-green-500/50 text-green-100";
            else if (idx === selected) btnClass = "bg-red-500/20 border-red-500/50 text-red-100 opacity-50";
            else btnClass = "opacity-30";
          }

          return (
            <motion.button
              key={idx}
              onClick={() => handleAnswer(idx)}
              disabled={showExplanation}
              whileTap={{ scale: 0.98 }}
              className={`w-full p-4 rounded-xl text-left border transition-all duration-300 flex items-center justify-between ${btnClass}`}
            >
              <span>{option}</span>
              {showExplanation && idx === question.correctIndex && <FaHeart className="text-green-400" />}
            </motion.button>
          );
        })}
      </div>

      <AnimatePresence>
        {showExplanation && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-6 pt-6 border-t border-white/10"
          >
            <p className="text-pink-100 italic font-serif mb-6">
              "{question.explanation}"
            </p>
            <button
              onClick={nextQuestion}
              className="w-full py-3 bg-rose-600 rounded-xl text-white font-bold shadow-lg hover:bg-rose-500 transition-all flex items-center justify-center gap-2"
            >
              Next <FaChevronRight size={12} />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Quiz;