import React from 'react';
import { CheckSquare, MessageSquare, List, Search, Grid3x3 } from 'lucide-react';
import { motion } from 'framer-motion';
import { ActiveView } from '../App';


interface DockProps {
  activeView: ActiveView | null;
  setActiveView: (view: ActiveView | null) => void;
}

const navItems: { view: ActiveView; label: string; icon: React.FC<{className?: string}> }[] = [
    { view: 'uploads', label: 'Tasks', icon: CheckSquare },
    { view: 'chat', label: 'Chat', icon: MessageSquare },
    { view: 'activity', label: 'Library', icon: List },
    { view: 'apps', label: 'Apps', icon: Grid3x3 },
];


const Dock: React.FC<DockProps> = ({ activeView, setActiveView }) => {

  const handleItemClick = (view: ActiveView) => {
    setActiveView(activeView === view ? null : view);
  };

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 flex items-center gap-4">
      <nav 
        className="flex items-center gap-2 bg-[#1C1C1E]/75 backdrop-blur-xl border border-white/20 rounded-full shadow-2xl shadow-black/30 p-2"
      >
        {navItems.map(({ view, label, icon: Icon }) => (
          <button
            key={view}
            onClick={() => handleItemClick(view)}
            className="relative flex flex-col items-center justify-center w-20 h-14 text-xs font-medium text-gray-300 transition-colors duration-300 hover:text-white outline-none"
          >
            {activeView === view && (
              <motion.div
                layoutId="active-pill"
                className="absolute inset-0 bg-white/20 rounded-full"
                transition={{ type: 'spring', stiffness: 400, damping: 30 }}
              />
            )}
            <div className="relative z-10 flex flex-col items-center">
              <Icon className={`h-6 w-6 mb-1 ${activeView === view ? 'text-white' : ''}`} />
              <span className={activeView === view ? 'font-semibold' : ''}>{label}</span>
            </div>
          </button>
        ))}
      </nav>
      <button className="flex items-center justify-center w-14 h-14 bg-[#1C1C1E]/75 backdrop-blur-xl border border-white/20 rounded-full shadow-2xl shadow-black/30 text-gray-300 hover:text-white transition-colors duration-300">
        <Search className="h-6 w-6"/>
      </button>
    </div>
  );
};

export default Dock;