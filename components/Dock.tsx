import React, { useRef, useEffect } from 'react';

// --- SVG Icon Components for Dock Apps ---

// Generic icon for Cloud Folder, keeps color change on hover
const FolderUpIcon = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M20 20a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.9a2 2 0 0 1-1.69-.9L8.6 3.3A2 2 0 0 0 6.9 2H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2Z" />
    <path d="M12 12v-4" />
    <path d="m14 10-2-2-2 2" />
  </svg>
);

// YouTube Logo
const YouTubeIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 28 20" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M27.4 3.06C27.1 1.86 26.1 0.86 24.9 0.56C22.7 0 14 0 14 0C14 0 5.3 0 3.1 0.56C1.9 0.86 0.9 1.86 0.6 3.06C0 5.26 0 10 0 10C0 10 0 14.74 0.6 16.94C0.9 18.14 1.9 19.14 3.1 19.44C5.3 20 14 20 14 20C14 20 22.7 20 24.9 19.44C26.1 19.14 27.1 18.14 27.4 16.94C28 14.74 28 10 28 10C28 10 28 5.26 27.4 3.06Z" fill="#FF0000"/>
    <path d="M11.2 14.28V5.72L18.4 10L11.2 14.28Z" fill="white"/>
  </svg>
);

// Instagram Logo
const InstagramIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <radialGradient id="insta-gradient" cx="0.35" cy="0.95" r="1.5">
        <stop stopColor="#feda75" offset="0%"/>
        <stop stopColor="#fa7e1e" offset="25%"/>
        <stop stopColor="#d62976" offset="50%"/>
        <stop stopColor="#962fbf" offset="75%"/>
        <stop stopColor="#4f5bd5" offset="100%"/>
      </radialGradient>
    </defs>
    <rect width="32" height="32" rx="8" fill="url(#insta-gradient)"/>
    <rect x="5" y="5" width="22" height="22" rx="6" stroke="white" strokeWidth="2.5"/>
    <circle cx="16" cy="16" r="5.5" stroke="white" strokeWidth="2.5"/>
    <circle cx="23" cy="9" r="1.5" fill="white"/>
  </svg>
);

// Gemini Logo
const GeminiIcon = ({ className }: { className?: string }) => (
    <svg className={className} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M16 0L19.309 9.873L30.416 12.691L21.708 21.217L23.818 32L16 26.217L8.182 32L10.292 21.217L1.584 12.691L12.691 9.873L16 0Z" fill="#785EF0" />
        <path d="M16 8.333L18.392 14.091L24.839 15.817L19.896 19.458L21.273 25.908L16 22.633L10.727 25.908L12.104 19.458L7.161 15.817L13.608 14.091L16 8.333Z" fill="#5835C6"/>
    </svg>
);

// ChatGPT Logo
const ChatGptIcon = ({ className }: { className?: string }) => (
    <svg className={className} viewBox="0 0 512 512" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M255.517 386.589C255.517 386.589 255.517 386.589 255.517 386.589C216.273 386.589 184.423 355.653 184.423 317.502V194.498C184.423 156.347 216.273 125.411 255.517 125.411C294.762 125.411 326.611 156.347 326.611 194.498V209.613C326.611 226.734 312.24 240.734 294.695 240.734C277.15 240.734 262.779 226.734 262.779 209.613V194.498C262.779 190.17 259.489 186.973 255.517 186.973C251.545 186.973 248.255 190.17 248.255 194.498V317.502C248.255 321.83 251.545 325.027 255.517 325.027C259.489 325.027 262.779 321.83 262.779 317.502V302.387C262.779 285.266 277.15 271.266 294.695 271.266C312.24 271.266 326.611 285.266 326.611 302.387V317.502C326.611 355.653 294.762 386.589 255.517 386.589Z" fill="#10A37F"/>
      <path d="M255.517 512C114.6 512 0 399.4 0 256C0 112.6 114.6 0 255.517 0C396.434 0 511.034 112.6 511.034 256C511.034 399.4 396.434 512 255.517 512ZM255.517 62.7053C148.889 62.7053 63.8316 148.9 63.8316 256C63.8316 363.1 148.889 449.295 255.517 449.295C362.145 449.295 447.203 363.1 447.203 256C447.203 148.9 362.145 62.7053 255.517 62.7053Z" fill="#10A37F"/>
    </svg>
);

// Spotify Logo
const SpotifyIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="16" cy="16" r="16" fill="#1DB954"/>
    <path d="M9.168,19.381A9.167,9.167,0,0,1,22.832,19.381" stroke="black" strokeWidth="2" strokeLinecap="round"/>
    <path d="M10.168,16.011A5.85,5.85,0,0,1,21.832,16.011" stroke="black" strokeWidth="2" strokeLinecap="round"/>
    <path d="M11.668,12.641A2.8,2.8,0,0,1,20.332,12.641" stroke="black" strokeWidth="2" strokeLinecap="round"/>
  </svg>
);


const DOCK_APPS = [
  { name: 'Cloud Folder', icon: FolderUpIcon, href: '#' },
  { name: 'YouTube', icon: YouTubeIcon, href: 'https://youtube.com' },
  { name: 'Instagram', icon: InstagramIcon, href: 'https://instagram.com' },
  { name: 'Gemini', icon: GeminiIcon, href: 'https://gemini.google.com' },
  { name: 'ChatGPT', icon: ChatGptIcon, href: 'https://chat.openai.com' },
  { name: 'Spotify', icon: SpotifyIcon, href: 'https://spotify.com' },
];

const Dock: React.FC = () => {
  const dockRef = useRef<HTMLDivElement>(null);
  const iconRefs = useRef<(HTMLAnchorElement | null)[]>([]);

  useEffect(() => {
    const dock = dockRef.current;
    if (!dock) return;

    const handleMouseMove = (e: MouseEvent) => {
      const { clientX } = e;
      const dockRect = dock.getBoundingClientRect();

      iconRefs.current.forEach(icon => {
        if (!icon) return;

        const iconRect = icon.getBoundingClientRect();
        const iconCenterX = iconRect.left + iconRect.width / 2;
        
        const distance = Math.abs(clientX - iconCenterX);
        
        // Max distance for the effect to take place
        const maxDistance = dockRect.width / 2.5;
        const scaleFactor = 0.5; // How much it scales up

        // Calculate scale based on distance, using a cosine falloff for smoothness
        const scale = distance < maxDistance 
          ? 1 + scaleFactor * Math.cos((distance / maxDistance) * (Math.PI / 2)) 
          : 1;

        icon.style.transform = `scale(${scale})`;
        icon.style.transition = 'transform 0.1s ease-out';
      });
    };
    
    const handleMouseLeave = () => {
       iconRefs.current.forEach(icon => {
        if (!icon) return;
        icon.style.transform = 'scale(1)';
        icon.style.transition = 'transform 0.2s ease-in-out';
      });
    }

    dock.addEventListener('mousemove', handleMouseMove);
    dock.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      dock.removeEventListener('mousemove', handleMouseMove);
      dock.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  return (
    <div className="fixed bottom-12 left-1/2 -translate-x-1/2 z-50">
      <div 
        ref={dockRef}
        className="flex items-end h-16 p-2 space-x-16 bg-white/20 backdrop-blur-lg rounded-2xl border border-white/30 shadow-lg"
      >
        {DOCK_APPS.map((app, index) => (
          <div key={app.name} className="relative group flex flex-col items-center">
             <span className="absolute bottom-full mb-2 w-max left-1/2 -translate-x-1/2 bg-slate-800 text-white text-xs font-bold px-2 py-1 rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
              {app.name}
            </span>
            <a 
              href={app.href} 
              target="_blank" 
              rel="noopener noreferrer"
              ref={el => (iconRefs.current[index] = el)}
              className="w-12 h-12 flex items-center justify-center rounded-xl bg-slate-50/80 shadow-md transform-gpu hover:bg-blue-600 transition-colors duration-300 group"
              >
              <app.icon className="h-7 w-7 text-slate-800 group-hover:text-white transition-colors duration-300" />
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dock;