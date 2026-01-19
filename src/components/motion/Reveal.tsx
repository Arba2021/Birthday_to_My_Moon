import { motion } from 'framer-motion';
import { ReactNode } from 'react';
import { fadeInUp } from './variants';

interface RevealProps {
  children: ReactNode;
  width?: "fit-content" | "100%";
  delay?: number;
}

const Reveal = ({ children, width = "100%", delay = 0 }: RevealProps) => {
  return (
    <motion.div
      variants={fadeInUp}
      custom={delay}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
      style={{ width, position: "relative" }}
    >
      {children}
    </motion.div>
  );
};

export default Reveal;