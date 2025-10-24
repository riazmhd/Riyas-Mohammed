import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { User } from '../types';

interface ConfettiAnimationProps {
    user: User;
}

const NUM_CONFETTI = 50;

const ConfettiPiece: React.FC = () => {
    const x = Math.random() * 2 - 1;
    const y = Math.random() * 2 - 1;
    const rotate = Math.random() * 360;
    const scale = Math.random() * 0.5 + 0.5;
    const duration = Math.random() * 1 + 0.5;
    const colors = ['#60a5fa', '#a78bfa', '#f472b6', '#ffffff'];
    const color = colors[Math.floor(Math.random() * colors.length)];
  
    return (
      <motion.div
        style={{ 
            position: 'absolute', 
            width: 10, height: 20, 
            backgroundColor: color,
            borderRadius: '5px',
            originX: 0.5, originY: 0.5 
        }}
        initial={{ x: 0, y: 0, opacity: 1, scale: 1, rotate: 0 }}
        animate={{
          x: x * 200,
          y: y * 200,
          opacity: 0,
          scale: scale * 0.5,
          rotate: rotate,
          transition: { duration, ease: 'easeOut' },
        }}
      />
    );
};

export const ConfettiAnimation: React.FC<ConfettiAnimationProps> = ({ user }) => {
    return (
        <AnimatePresence>
            <motion.div
                className="fixed inset-0 z-[200] flex items-center justify-center pointer-events-none"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
            >
                <motion.div
                    className="relative"
                    initial={{ scale: 0, y: 100 }}
                    animate={{ scale: 1, y: 0, transition: { type: 'spring', stiffness: 300, damping: 20, delay: 0.1 } }}
                    exit={{ scale: 0, opacity: 0, transition: { duration: 0.5, ease: 'easeIn' } }}
                >
                    <img
                        src={user.avatarUrl}
                        alt={user.name}
                        className="h-32 w-32 rounded-full object-cover shadow-2xl border-4 border-white/80"
                    />
                    <div className="absolute inset-0 flex items-center justify-center">
                        {Array.from({ length: NUM_CONFETTI }).map((_, i) => (
                            <ConfettiPiece key={i} />
                        ))}
                    </div>
                </motion.div>
            </motion.div>
        </AnimatePresence>
    );
};