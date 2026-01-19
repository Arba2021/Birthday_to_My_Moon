import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface FireworkIntroProps {
  onComplete: () => void;
}

const FireworkIntro: React.FC<FireworkIntroProps> = ({ onComplete }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [showText, setShowText] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // --- SETUP ---
    let w = (canvas.width = window.innerWidth);
    let h = (canvas.height = window.innerHeight);
    let animationId: number;

    // Colors: Deep Pink, Red, Gold, White
    const heartColors = ['#be185d', '#dc2626', '#fbbf24', '#ffffff', '#9d174d'];

    // --- CLASSES ---

    class Rocket {
      x: number;
      y: number;
      targetY: number;
      speed: number;
      exploded: boolean;

      constructor() {
        this.x = w / 2; 
        this.y = h;     
        this.targetY = h / 2.5; // Explode above center
        this.speed = 15;
        this.exploded = false;
      }

      update() {
        this.y -= this.speed;
        this.speed *= 0.95;

        // Trail
        ctx!.fillStyle = 'rgba(255, 255, 255, 0.8)';
        ctx!.beginPath();
        ctx!.arc(this.x, this.y, 4, 0, Math.PI * 2);
        ctx!.fill();

        if (this.y <= this.targetY || this.speed < 1) {
          this.exploded = true;
          createHeartExplosion(this.x, this.y);
          setShowText(true);
        }
      }
    }

    class HeartParticle {
      x: number;
      y: number;
      vx: number;
      vy: number;
      color: string;
      size: number;
      alpha: number;
      decay: number;
      gravity: number;
      rotation: number;

      constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
        const angle = Math.random() * Math.PI * 2;
        const velocity = Math.random() * 12 + 2; 
        this.vx = Math.cos(angle) * velocity;
        this.vy = Math.sin(angle) * velocity;
        this.color = heartColors[Math.floor(Math.random() * heartColors.length)];
        this.size = Math.random() * 20 + 10; 
        this.alpha = 1;
        this.decay = Math.random() * 0.01 + 0.005; 
        this.gravity = 0.05;
        this.rotation = Math.random() * 360;
      }

      update() {
        this.x += this.vx;
        this.y += this.vy;
        this.vy += this.gravity;
        this.vx *= 0.96;
        this.alpha -= this.decay;
      }

      draw() {
        ctx!.save();
        ctx!.globalAlpha = this.alpha;
        ctx!.translate(this.x, this.y);
        ctx!.rotate((this.rotation * Math.PI) / 180);
        ctx!.fillStyle = this.color;
        ctx!.font = `${this.size}px Arial`;
        ctx!.fillText('❤', -this.size/2, -this.size/2);
        ctx!.restore();
      }
    }

    let rocket: Rocket | null = new Rocket();
    const particles: HeartParticle[] = [];

    function createHeartExplosion(x: number, y: number) {
      for (let i = 0; i < 150; i++) {
        particles.push(new HeartParticle(x, y));
      }
    }

    const loop = () => {
      animationId = requestAnimationFrame(loop);
      ctx!.clearRect(0, 0, w, h);

      if (rocket) {
        rocket.update();
        if (rocket.exploded) rocket = null;
      }

      for (let i = particles.length - 1; i >= 0; i--) {
        particles[i].update();
        particles[i].draw();
        if (particles[i].alpha <= 0) particles.splice(i, 1);
      }
    };

    loop();
    
    // NOTE: Removed the automatic timer. 
    // Now it waits for the user to click the heart.

    const handleResize = () => {
      w = canvas.width = window.innerWidth;
      h = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', handleResize);
    };
  }, [onComplete]);

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center overflow-hidden">
      {/* 1. BACKGROUND */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#f472b6] via-[#fbcfe8] to-white" />
      
      {/* Font Import */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Great+Vibes&display=swap');
      `}</style>

      {/* 2. Canvas */}
      <canvas ref={canvasRef} className="absolute inset-0 z-10 touch-none pointer-events-none" />

      {/* 3. Text & Interactive Heart */}
      <AnimatePresence>
        {showText && (
          <motion.div
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", duration: 1.5 }}
            className="relative z-50 flex flex-col items-center justify-center text-center pt-10"
          >
            {/* "Happy Birthday Sweet" */}
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="text-4xl md:text-5xl text-[#9d174d] drop-shadow-md select-none"
              style={{ fontFamily: "'Great Vibes', cursive" }}
            >
              Happy Birthday Sweet
            </motion.h2>

            {/* "Baraa" */}
            <motion.h1
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.8 }}
              className="text-7xl md:text-9xl text-[#be185d] drop-shadow-lg select-none mb-8"
              style={{ 
                fontFamily: "'Great Vibes', cursive",
                textShadow: "2px 2px 0px rgba(255,255,255,0.6), 0 0 30px rgba(255, 255, 255, 0.8)" 
              }}
            >
              Baraa
            </motion.h1>
            
            {/* --- CLICKABLE HEART BUTTON --- */}
            <motion.button
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 1.5, type: "spring" }}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={onComplete} // <--- THIS TRIGGERS THE PAGE OPENING
              className="group relative cursor-pointer outline-none"
            >
               {/* Pulsing Background Ring */}
               <motion.div 
                 animate={{ scale: [1, 1.5, 1], opacity: [0.5, 0, 0.5] }}
                 transition={{ repeat: Infinity, duration: 2 }}
                 className="absolute inset-0 bg-pink-500 rounded-full blur-xl"
               />
               
               {/* The Heart Icon */}
               <div className="text-6xl md:text-7xl text-[#db2777] drop-shadow-xl filter transition-all group-hover:brightness-110">
                 ❤
               </div>

               {/* "Click Me" Hint */}
               <motion.p
                 initial={{ opacity: 0 }}
                 animate={{ opacity: 1 }}
                 transition={{ delay: 2 }}
                 className="absolute -bottom-8 left-1/2 -translate-x-1/2 whitespace-nowrap text-[#9d174d] text-sm tracking-widest font-serif"
               >
                 ( Click to Open )
               </motion.p>
            </motion.button>

          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default FireworkIntro;