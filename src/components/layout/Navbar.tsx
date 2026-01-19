import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HiMenuAlt3, HiX } from 'react-icons/hi';
import { useScrollTo } from '@/hooks/useScrollTo';

interface NavbarProps {
  sections: { id: string; title: string }[];
}

const Navbar = ({ sections }: NavbarProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const scrollTo = useScrollTo();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNav = (id: string) => {
    setIsOpen(false);
    scrollTo(id);
  };

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-night/80 backdrop-blur-md py-4 border-b border-white/5' : 'py-6 bg-transparent'}`}>
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        <span className="text-xl font-serif font-bold text-white tracking-widest">
          MY<span className="text-neonpink">BARAA</span>
        </span>

        <div className="hidden md:flex gap-8">
          {sections.map((item) => (
            <button
              key={item.id}
              onClick={() => handleNav(item.id)}
              className="text-sm font-medium text-textsoft hover:text-white transition-colors uppercase tracking-wider"
            >
              {item.title}
            </button>
          ))}
        </div>

        <button onClick={() => setIsOpen(!isOpen)} className="md:hidden text-2xl text-white">
          {isOpen ? <HiX /> : <HiMenuAlt3 />}
        </button>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-full left-0 right-0 bg-night/95 backdrop-blur-xl border-b border-white/10 p-6 md:hidden flex flex-col gap-4 shadow-2xl"
          >
            {sections.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNav(item.id)}
                className="text-lg font-medium text-textsoft hover:text-neonpink py-2 border-b border-white/5 last:border-0 text-left"
              >
                {item.title}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;