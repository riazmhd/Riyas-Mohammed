import React from 'react';
import { X, Grid3x3, Youtube, Instagram, Bot, Clapperboard, Disc } from 'lucide-react';

interface AppsSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const apps = [
    { name: 'YouTube', icon: Youtube, color: 'text-red-500' },
    { name: 'Instagram', icon: Instagram, color: 'text-pink-500' },
    { name: 'Gemini', icon: Bot, color: 'text-blue-500' },
    { name: 'Google', icon: Clapperboard, color: 'text-green-500' },
    { name: 'Spotify', icon: Disc, color: 'text-green-400' },
]

export const AppsSidebar: React.FC<AppsSidebarProps> = ({ isOpen, onClose }) => {

  return (
    <div
      className={`fixed top-0 right-0 h-full w-80 bg-white/30 backdrop-blur-2xl z-40 flex flex-col border-l border-white/50 shadow-2xl transition-transform duration-500 ease-in-out ${
        isOpen ? 'translate-x-0' : 'translate-x-full'
      }`}
    >
        <>
          <div className="flex items-center justify-between p-4 border-b border-white/40 bg-black/5">
            <div className="flex items-center gap-3">
              <Grid3x3 className="h-5 w-5 text-blue-600"/>
              <h3 className="font-bold text-slate-800">Connected Apps</h3>
            </div>
            <button
              onClick={onClose}
              className="p-2 rounded-full hover:bg-black/10 transition-colors"
              aria-label="Close apps sidebar"
            >
              <X className="h-5 w-5 text-slate-600" />
            </button>
          </div>

          <div className="flex-1 p-4 overflow-y-auto">
            <div className="grid grid-cols-3 gap-4">
                {apps.map(app => (
                    <a href="#" key={app.name} className="flex flex-col items-center justify-center gap-2 p-3 bg-white/40 hover:bg-white/60 rounded-xl border border-white/40 transition-colors duration-200 group">
                        <app.icon className={`h-8 w-8 ${app.color} transition-transform duration-200 group-hover:scale-110`} />
                        <p className="text-xs font-semibold text-slate-700">{app.name}</p>
                    </a>
                ))}
            </div>
          </div>
        </>
    </div>
  );
};