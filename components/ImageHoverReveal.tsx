import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface ImageHoverRevealProps {
  imageUrl: string | null;
  cursorPosition: { x: number; y: number };
}

export const ImageHoverReveal: React.FC<ImageHoverRevealProps> = ({ imageUrl, cursorPosition }) => {
  return (
    <AnimatePresence>
      {imageUrl && (
        <motion.div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            pointerEvents: 'none',
            x: cursorPosition.x + 15, // Offset to not be directly under cursor
            y: cursorPosition.y + 15,
          }}
          initial={{ opacity: 0, scale: 0.5, rotate: '-10deg' }}
          animate={{ opacity: 1, scale: 1, rotate: '3deg', transition: { type: 'spring', stiffness: 400, damping: 30 } }}
          exit={{ opacity: 0, scale: 0.5, rotate: '-10deg', transition: { duration: 0.2 } }}
          className="z-[100]"
        >
          <div className="p-2 bg-white/60 backdrop-blur-md rounded-xl shadow-2xl shadow-slate-900/20">
            <img
              src={imageUrl}
              alt="Post preview"
              className="w-40 h-40 object-cover rounded-lg"
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
