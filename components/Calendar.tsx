import React, { useState } from 'react';
// FIX: Using direct imports for date-fns functions to resolve export errors.
import { format } from 'date-fns/format';
import { addMonths } from 'date-fns/addMonths';
import { sub } from 'date-fns/sub';
import { startOfMonth } from 'date-fns/startOfMonth';
import { endOfMonth } from 'date-fns/endOfMonth';
import { startOfWeek } from 'date-fns/startOfWeek';
import { endOfWeek } from 'date-fns/endOfWeek';
import { eachDayOfInterval } from 'date-fns/eachDayOfInterval';
import { isSameMonth } from 'date-fns/isSameMonth';
import { isToday } from 'date-fns/isToday';
import { Post, SocialPlatform, SpecialDay, Client } from '../types';
import { ChevronLeft, ChevronRight, Plus, Paperclip } from 'lucide-react';
import { ImageHoverReveal } from './ImageHoverReveal';

interface CalendarProps {
  posts: Record<string, Post[]>;
  onAddPost: (date: Date) => void;
  specialDays: SpecialDay[];
  onDayClick: (date: Date) => void;
}

const clientColors: Record<Client, string> = {
    'H&S': 'bg-blue-500',
    'DECA': 'bg-purple-500',
    'DPS': 'bg-pink-500',
};

const specialDayColors: Record<SpecialDay['type'], string> = {
    'International': 'bg-indigo-500',
    'UAE': 'bg-green-500',
};

export const Calendar: React.FC<CalendarProps> = ({ posts, onAddPost, specialDays, onDayClick }) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [hoveredImageUrl, setHoveredImageUrl] = useState<string | null>(null);
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });

  const specialDaysMap = new Map<string, SpecialDay>(specialDays.map(day => [day.date, day]));

  const nextMonth = () => setCurrentDate(addMonths(currentDate, 1));
  const prevMonth = () => setCurrentDate(sub(currentDate, { months: 1 }));

  const monthStart = startOfMonth(currentDate);
  const monthEnd = endOfMonth(currentDate);
  const startDate = startOfWeek(monthStart);
  const endDate = endOfWeek(monthEnd);
  const days = eachDayOfInterval({ start: startDate, end: endDate });
  const dayLabels = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];

  const dayBaseClass = "relative flex flex-col h-36 rounded-2xl p-2 transition-all duration-300 overflow-hidden group";
  const currentMonthClass = "bg-white/30 border border-white/50 backdrop-blur-sm hover:bg-white/50 cursor-pointer";
  const otherMonthClass = "bg-white/10 border border-transparent text-slate-300";
  const todayClass = "relative !border-2 !border-white/80 !bg-white/60";

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    setCursorPosition({ x: e.clientX, y: e.clientY });
  };
  
  const handleDayMouseEnter = (day: Date) => {
    const dateKey = format(day, 'yyyy-MM-dd');
    const dayPosts = posts[dateKey] || [];
    const firstPostWithUpload = dayPosts.find(p => p.file);

    if (firstPostWithUpload) {
      const imageUrl = `https://picsum.photos/seed/${firstPostWithUpload.id}/200/200`;
      setHoveredImageUrl(imageUrl);
    }
  };

  const handleDayMouseLeave = () => {
    setHoveredImageUrl(null);
  };

  return (
    <div className="relative" onMouseMove={handleMouseMove}>
      <ImageHoverReveal imageUrl={hoveredImageUrl} cursorPosition={cursorPosition} />

      <div className="relative bg-black/10 backdrop-blur-xl rounded-3xl p-6 shadow-2xl shadow-black/20 border border-white/50">
        <div className="flex items-center justify-between px-2 py-4">
          <div className="flex items-baseline gap-3">
            <h2 className="text-3xl font-bold text-slate-800">{format(currentDate, 'MMMM')}</h2>
            <p className="text-xl font-medium text-slate-600">{format(currentDate, 'yyyy')}</p>
          </div>
          <div className="flex items-center gap-2">
            <button onClick={prevMonth} className="p-2 rounded-full text-slate-600 hover:bg-white/30 transition-colors duration-200">
              <ChevronLeft className="h-6 w-6" />
            </button>
            <button onClick={() => setCurrentDate(new Date())} className="px-4 py-2 text-sm font-semibold text-slate-700 bg-white/50 border border-white/50 rounded-lg hover:bg-white/80 transition-colors duration-200 shadow-sm">
              Today
            </button>
            <button onClick={nextMonth} className="p-2 rounded-full text-slate-600 hover:bg-white/30 transition-colors duration-200">
              <ChevronRight className="h-6 w-6" />
            </button>
          </div>
        </div>
        
        <div className="grid grid-cols-7 gap-3">
          {dayLabels.map(label => (
            <div key={label} className="text-center text-xs font-bold text-slate-500 tracking-wider py-2">
              {label}
            </div>
          ))}

          {days.map(day => {
            const dateKey = format(day, 'yyyy-MM-dd');
            const dayPosts = posts[dateKey] || [];
            const specialDay = specialDaysMap.get(format(day, 'MM-dd'));
            const hasUpload = dayPosts.some(p => !!p.file);
            const isCurrentMonth = isSameMonth(day, currentDate);
            const isDayToday = isToday(day);
            
            const dayClasses = [
                dayBaseClass,
                isCurrentMonth ? currentMonthClass : otherMonthClass,
                isDayToday && isCurrentMonth ? todayClass : ""
            ].join(" ");

            return (
              <div
                key={day.toString()}
                onClick={() => isCurrentMonth && onDayClick(day)}
                onMouseEnter={isCurrentMonth && hasUpload ? () => handleDayMouseEnter(day) : undefined}
                onMouseLeave={isCurrentMonth && hasUpload ? handleDayMouseLeave : undefined}
                className={dayClasses}
              >
                  <time dateTime={dateKey} className={`text-xl font-semibold ${isDayToday && isCurrentMonth ? 'text-blue-700 !font-extrabold' : isCurrentMonth ? 'text-slate-700' : 'text-slate-400'}`}>
                    {format(day, 'd')}
                  </time>
                  
                  {isCurrentMonth && (
                      <button 
                        onClick={(e) => { e.stopPropagation(); onAddPost(day); }} 
                        className="absolute top-2 right-2 w-7 h-7 rounded-full bg-blue-600/50 flex items-center justify-center shadow-lg hover:bg-blue-600 transition-all duration-300 opacity-0 group-hover:opacity-100" 
                        title="Add Post"
                        aria-label={`Add post for ${format(day, 'MMMM d')}`}
                      >
                          <Plus className="h-5 w-5 text-white" />
                      </button>
                  )}

                <div className="mt-1 flex-1 overflow-y-auto custom-scrollbar">
                  {specialDay && isCurrentMonth && (
                    <div className="flex items-center gap-1.5 mb-1" title={specialDay.name}>
                      <div className={`w-1.5 h-1.5 rounded-full ${specialDayColors[specialDay.type]}`}></div>
                      <p className={`text-xs font-medium truncate ${isCurrentMonth ? 'text-slate-600' : ''}`}>{specialDay.name}</p>
                    </div>
                  )}
                  {dayPosts.map(post => (
                    <div key={post.id} className="flex items-center gap-1.5 mb-1" title={`${post.client}: ${post.content}`}>
                       <div className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${clientColors[post.client]}`}></div>
                       <p className="text-xs font-medium truncate text-slate-700">{post.content}</p>
                    </div>
                  ))}
                </div>
                
                <div className="flex items-center justify-between h-5">
                   <div className="flex items-center gap-1 flex-wrap">
                      {/* Client indicators were moved into the main content area for better visibility */}
                   </div>
                  {hasUpload && isCurrentMonth && <Paperclip className="h-4 w-4 text-slate-400" />}
                </div>
              </div>
            );
          })}
        </div>
        <style>{`
          .custom-scrollbar::-webkit-scrollbar {
            width: 4px;
          }
          .custom-scrollbar::-webkit-scrollbar-thumb {
            background-color: #cbd5e1;
            border-radius: 20px;
          }
          .custom-scrollbar::-webkit-scrollbar-track {
            background: transparent;
          }
        `}</style>
      </div>
    </div>
  );
};
