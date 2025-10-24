import React, { useState, useRef, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { LogOut, User as UserIcon, Edit3 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export const UserProfile: React.FC = () => {
    const { user, logout } = useAuth();
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    if (!user) return null;

    return (
        <div className="fixed top-6 right-20 z-[60]" ref={dropdownRef}>
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="h-12 w-12 rounded-full bg-white/50 backdrop-blur-lg border border-white/50 shadow-lg flex items-center justify-center transition-transform duration-300 hover:scale-110"
                aria-label="User menu"
            >
                <img src={user.avatarUrl} alt={user.name} className="h-full w-full object-cover rounded-full" />
            </button>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -10, scale: 0.95 }}
                        transition={{ duration: 0.2, ease: 'easeOut' }}
                        className="absolute top-16 right-0 w-64 bg-white/60 backdrop-blur-2xl border border-white/50 rounded-2xl shadow-2xl overflow-hidden"
                    >
                        <div className="p-4 border-b border-white/40">
                            <p className="font-bold text-slate-800 truncate">{user.name}</p>
                            <p className="text-sm text-slate-600 truncate">{user.email}</p>
                        </div>
                        <div className="p-2">
                             <button
                                onClick={() => { /* Placeholder for edit profile */ setIsOpen(false); }}
                                className="w-full flex items-center gap-3 px-3 py-2 text-sm text-slate-700 hover:bg-black/5 rounded-lg transition-colors"
                            >
                                <Edit3 className="h-4 w-4" />
                                <span>Edit Profile</span>
                            </button>
                             <div className="h-px bg-white/30 my-1 mx-2"></div>
                             <button
                                onClick={logout}
                                className="w-full flex items-center gap-3 px-3 py-2 text-sm text-red-600 hover:bg-red-500/10 rounded-lg transition-colors"
                            >
                                <LogOut className="h-4 w-4" />
                                <span>Logout</span>
                            </button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};