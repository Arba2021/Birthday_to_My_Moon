import { motion } from 'framer-motion';

interface Tab {
  id: string;
  label: string;
  icon?: React.ReactNode;
}

interface TabsProps {
  tabs: Tab[];
  activeTab: string;
  onChange: (id: string) => void;
  className?: string;
}

const Tabs = ({ tabs, activeTab, onChange, className = "" }: TabsProps) => {
  return (
    <div className={`flex overflow-x-auto p-1 gap-2 scrollbar-hide snap-x ${className}`}>
      {tabs.map((tab) => {
        const isActive = activeTab === tab.id;
        
        return (
          <button
            key={tab.id}
            onClick={() => onChange(tab.id)}
            className={`
              relative px-6 py-2.5 rounded-full text-sm font-medium transition-colors whitespace-nowrap snap-center
              flex items-center gap-2 z-10
              ${isActive ? 'text-white' : 'text-textsoft/60 hover:text-white'}
            `}
          >
            {isActive && (
              <motion.div
                layoutId="active-tab-pill"
                className="absolute inset-0 bg-neonpink rounded-full -z-10 shadow-[0_0_15px_rgba(255,79,216,0.4)]"
                transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
              />
            )}
            
            {tab.icon && <span className="relative z-10">{tab.icon}</span>}
            <span className="relative z-10">{tab.label}</span>
          </button>
        );
      })}
    </div>
  );
};

export default Tabs;