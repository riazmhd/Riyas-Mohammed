import React from 'react';
import { formatDistanceToNow } from 'date-fns';
import { ActivityLog } from '../types';
import { X, List } from 'lucide-react';

interface ActivityLogSidebarProps {
  history: ActivityLog[];
  isOpen: boolean;
  onClose: () => void;
}

export const ActivityLogSidebar: React.FC<ActivityLogSidebarProps> = ({ history, isOpen, onClose }) => {

  return (
    <div
      className={`fixed top-0 left-0 h-full w-80 bg-white/30 backdrop-blur-2xl z-40 flex flex-col border-r border-white/40 shadow-2xl transition-transform duration-500 ease-in-out ${
        isOpen ? 'translate-x-0' : '-translate-x-full'
      }`}
    >
        <>
          <div className="flex items-center justify-between p-4 border-b border-white/30 bg-black/5">
            <div className="flex items-center gap-3">
              <List className="h-5 w-5 text-blue-600"/>
              <h3 className="font-bold text-slate-800">Activity History</h3>
            </div>
            <button
              onClick={onClose}
              className="p-2 rounded-full hover:bg-black/10 transition-colors"
              aria-label="Close activity log"
            >
              <X className="h-5 w-5 text-slate-600" />
            </button>
          </div>

          <div className="flex-1 p-4 overflow-y-auto">
            {history.length > 0 ? (
              <ul className="space-y-4">
                {history.map((log) => (
                  <li key={log.id} className="flex gap-3">
                     <div className="relative flex-shrink-0 pt-1">
                        <div className="h-3 w-3 rounded-full bg-blue-500/50 border-2 border-blue-500"></div>
                        <div className="absolute top-5 left-1/2 w-0.5 h-full bg-slate-300 -translate-x-1/2"></div>
                     </div>
                     <div className="overflow-hidden pb-4">
                        <p className="text-sm text-slate-800 break-words">
                            <span className="font-semibold">{log.user}</span> {log.action}
                        </p>
                        <p className="text-xs text-slate-500 mt-0.5">
                            {formatDistanceToNow(log.timestamp, { addSuffix: true })}
                        </p>
                     </div>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-center text-sm text-slate-500 mt-8">No activity recorded yet.</p>
            )}
          </div>
        </>
    </div>
  );
};
