import { ReactNode } from 'react';

interface SectionProps {
  id: string;
  children: ReactNode;
  className?: string;
}

const Section = ({ id, children, className = "" }: SectionProps) => {
  return (
    <section 
      id={id} 
      className={`relative py-16 md:py-24 px-4 md:px-8 max-w-6xl mx-auto ${className}`}
    >
      {children}
    </section>
  );
};

export default Section;