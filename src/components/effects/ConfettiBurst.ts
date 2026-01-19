import confetti from 'canvas-confetti';

export const triggerConfetti = () => {
  const duration = 3000;
  const animationEnd = Date.now() + duration;
  const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 100 };

  const randomInRange = (min: number, max: number) => {
    return Math.random() * (max - min) + min;
  };

  // Fixed: Type safety + mobile optimized interval (400ms instead of 250ms)
  const interval = window.setInterval(function () {
    const timeLeft = animationEnd - Date.now();

    if (timeLeft <= 0) {
      return clearInterval(interval);
    }

    // Mobile Fix: Reduced particle count (30 instead of 50)
    const particleCount = 30 * (timeLeft / duration);

    confetti({
      ...defaults,
      particleCount,
      origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
      colors: ['#7C3AED', '#FF4FD8', '#FF2D55']
    });
    confetti({
      ...defaults,
      particleCount,
      origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
      colors: ['#7C3AED', '#FF4FD8', '#FF2D55']
    });
  }, 400);
};

export const triggerHeartExplosion = () => {
  const defaults = {
    spread: 360,
    ticks: 100,
    gravity: 0,
    decay: 0.94,
    startVelocity: 30,
    shapes: ['heart'],
    colors: ['#FF2D55', '#FF4FD8']
  };

  confetti({
    ...defaults,
    particleCount: 40, // Slightly reduced for mobile
    scalar: 2
  });

  confetti({
    ...defaults,
    particleCount: 20,
    scalar: 3
  });
};