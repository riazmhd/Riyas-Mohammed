import React from 'react';

interface BorderBeamProps {
  size?: number;
  duration?: number;
  delay?: number;
  colorFrom?: string;
  colorTo?: string;
  reverse?: boolean;
  initialOffset?: number;
  borderThickness?: number;
  opacity?: number;
  glowIntensity?: number;
  beamBorderRadius?: number;
  pauseOnHover?: boolean;
  speedMultiplier?: number;
  className?: string;
}

export const BorderBeam: React.FC<BorderBeamProps> = ({
  duration = 6,
  delay = 0,
  colorFrom = "#22c55e",
  colorTo = "#10b981",
  reverse = false,
  initialOffset = 0,
  borderThickness = 2,
  opacity = 1,
  glowIntensity = 8,
  beamBorderRadius = 45,
  pauseOnHover = false,
  speedMultiplier = 1,
  className = '',
}) => {
  const effectiveDuration = duration / speedMultiplier;
  const fromAngle = initialOffset;
  const toAngle = initialOffset + (reverse ? -360 : 360);

  return (
    <>
      <style>{`
        @keyframes border-beam-spin {
          from {
            transform: rotate(${fromAngle}deg);
          }
          to {
            transform: rotate(${toAngle}deg);
          }
        }
        .border-beam-effect {
          position: absolute;
          inset: 0;
          border-radius: ${beamBorderRadius}px;
          padding: ${borderThickness}px;
          background: conic-gradient(from 180deg at 50% 50%, transparent 50%, ${colorFrom} 85%, ${colorTo} 100%, transparent 100%);
          -webkit-mask:
            linear-gradient(#fff 0 0) content-box,
            linear-gradient(#fff 0 0);
          -webkit-mask-composite: xor;
          mask-composite: exclude;
          animation: border-beam-spin ${effectiveDuration}s linear infinite;
          animation-delay: ${delay}s;
          filter: drop-shadow(0 0 ${glowIntensity}px ${colorFrom});
          opacity: ${opacity};
          pointer-events: none;
        }

        ${pauseOnHover ? `.group:hover .border-beam-effect { animation-play-state: paused; }` : ''}

      `}</style>
      <div className={`border-beam-effect ${className}`} />
    </>
  );
};
