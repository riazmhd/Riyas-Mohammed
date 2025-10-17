import React from 'react';
import { Bell } from 'lucide-react';

interface NotificationBellProps {
  count: number;
  onClick: () => void;
}

const NotificationBell: React.FC<NotificationBellProps> = ({ count, onClick }) => {
  return (
    <button 
      onClick={onClick}
      className="fixed top-6 right-6 z-[60] h-12 w-12 rounded-full bg-white/80 backdrop-blur-md shadow-lg flex items-center justify-center text-slate-700 hover:text-blue-600 transition-colors duration-300 group" 
      aria-label="Show new notification"
    >
      <Bell className="h-6 w-6" />
      {count > 0 && (
        <span className="absolute top-0 right-0 block h-6 w-6 transform -translate-y-1/3 translate-x-1/3 rounded-full bg-red-500 border-2 border-white text-white text-xs font-bold flex items-center justify-center">
          {count}
        </span>
      )}
    </button>
  );
};

export default NotificationBell;