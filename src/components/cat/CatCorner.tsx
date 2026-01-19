import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';

const CatCorner = () => {
  // State to track if the cat has been clicked
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <motion.div
        className="relative cursor-pointer select-none"
        // Toggle open/close on click
        onClick={() => setIsOpen(!isOpen)}
        // Bobbing Animation
        initial={{ y: 0 }}
        animate={{ 
          y: [0, -10, 0], 
        }}
        transition={{ 
          duration: 4, 
          repeat: Infinity, 
          ease: "easeInOut" 
        }}
        // Interaction Effects
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        {/* THE EMOJI SWITCH */}
        {/* If open (clicked), show 😼. If closed, show 😾 */}
        <span className="text-4xl filter drop-shadow-lg block">
          {isOpen ? "😽" : "😾"}
        </span>

        {/* SPEECH BUBBLE (Only visible when clicked) */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, scale: 0, x: -10 }}
              animate={{ opacity: 1, scale: 1, x: 0 }}
              exit={{ opacity: 0, scale: 0, x: -10 }}
              className="absolute bottom-full right-full mb-2 mr-2 bg-white text-black px-4 py-2 rounded-2xl rounded-br-none shadow-xl border border-rose-100 whitespace-nowrap"
            >
              <p className="text-sm font-medium italic">
                "Happy Birthday Baraa! Meow! ❤️"
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};

export default CatCorner;