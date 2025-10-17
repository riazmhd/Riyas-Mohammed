import React from 'react';

interface MarqueeProps {
  messages: string[];
}

export const Marquee: React.FC<MarqueeProps> = ({ messages }) => {
  return (
    <div className="relative flex overflow-x-hidden bg-blue-600 text-white h-10 items-center">
      <div className="animate-marquee whitespace-nowrap py-2">
        {messages.map((msg, index) => (
          <span key={index} className="mx-8 text-base font-medium">
            ✨ {msg}
          </span>
        ))}
      </div>
      <div className="absolute top-0 animate-marquee2 whitespace-nowrap py-2">
        {messages.map((msg, index) => (
          <span key={index} className="mx-8 text-base font-medium">
            ✨ {msg}
          </span>
        ))}
      </div>
      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0%); }
          100% { transform: translateX(-100%); }
        }
        @keyframes marquee2 {
          0% { transform: translateX(100%); }
          100% { transform: translateX(0%); }
        }
        .animate-marquee {
          animation: marquee 120s linear infinite;
        }
        .animate-marquee2 {
          animation: marquee2 120s linear infinite;
        }
      `}</style>
    </div>
  );
};