import React, { useState, useEffect } from 'react';
import { Notification } from '../types';
import { X, CheckCircle2, AlertTriangle, Info, XCircle } from 'lucide-react';

interface NotificationToastProps {
  notification: Notification;
  onDismiss: (id: string) => void;
}

const ICONS: Record<Notification['type'], React.ReactNode> = {
  success: <CheckCircle2 className="h-6 w-6 text-green-500" />,
  warning: <AlertTriangle className="h-6 w-6 text-yellow-500" />,
  error: <XCircle className="h-6 w-6 text-red-500" />,
  info: <Info className="h-6 w-6 text-blue-500" />,
};

const BORDER_COLORS: Record<Notification['type'], string> = {
    success: 'border-green-500/50',
    warning: 'border-yellow-500/50',
    error: 'border-red-500/50',
    info: 'border-blue-500/50',
}

export const NotificationToast: React.FC<NotificationToastProps> = ({ notification, onDismiss }) => {
  const [isExiting, setIsExiting] = useState(false);
  const { id, type, title, message } = notification;

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsExiting(true);
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (isExiting) {
      const timer = setTimeout(() => onDismiss(id), 400);
      return () => clearTimeout(timer);
    }
  }, [isExiting, onDismiss, id]);

  const animationClass = isExiting ? 'animate-fade-out-right' : 'animate-slide-in-right';

  return (
    <>
      <style>{`
        @keyframes slide-in-right {
          from { 
            transform: translateX(100%); 
            opacity: 0; 
          }
          to { 
            transform: translateX(0); 
            opacity: 1; 
          }
        }
        @keyframes fade-out-right {
          from { 
            transform: translateX(0); 
            opacity: 1; 
          }
          to { 
            transform: translateX(100%); 
            opacity: 0; 
          }
        }
        .animate-slide-in-right { animation: slide-in-right 0.5s cubic-bezier(0.21, 1.02, 0.73, 1) both; }
        .animate-fade-out-right { animation: fade-out-right 0.4s ease-out both; }
      `}</style>
      <div
        className={`w-full max-w-sm bg-white/60 backdrop-blur-lg rounded-xl shadow-2xl pointer-events-auto overflow-hidden border ${BORDER_COLORS[type]} ${animationClass}`}
        role="alert"
        aria-live="polite"
      >
        <div className="p-4">
          <div className="flex items-start">
            <div className="flex-shrink-0">
              {ICONS[type]}
            </div>
            <div className="ml-3 w-0 flex-1 pt-0.5">
              <p className="text-sm font-bold text-slate-900">{title}</p>
              <p className="mt-1 text-sm text-slate-600">{message}</p>
            </div>
            <div className="ml-4 flex-shrink-0 flex">
              <button
                onClick={() => setIsExiting(true)}
                className="rounded-md inline-flex text-slate-400 hover:text-slate-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                <span className="sr-only">Close</span>
                <X className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};