import { useCallback } from 'react';

export const useScrollTo = () => {
  const scrollTo = useCallback((id: string, offset: number = 80) => {
    const element = document.getElementById(id);
    if (!element) return;

    const elementPosition = element.getBoundingClientRect().top;
    const offsetPosition = elementPosition + window.scrollY - offset;

    window.scrollTo({
      top: offsetPosition,
      behavior: 'smooth'
    });
  }, []);

  return scrollTo;
};

export default useScrollTo;