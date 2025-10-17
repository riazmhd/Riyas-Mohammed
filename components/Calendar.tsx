import React, { useState } from 'react';
// FIX: Replaced `subMonths` with `sub` to resolve a module export error.
import { format, addMonths, sub, startOfMonth, endOfMonth, startOfWeek, endOfWeek, eachDayOfInterval, isSameMonth, isToday } from 'date-fns';
import { Post, SocialPlatform, SpecialDay } from '../types';
import { ChevronLeft, ChevronRight, Plus, Paperclip } from 'lucide-react';
import { ImageHoverReveal } from './ImageHoverReveal';

interface CalendarProps {
  posts: Record<string, Post[]>;
  onAddPost: (date: Date) => void;
  specialDays: SpecialDay[];
  onDayClick: (date: Date) => void;
}

const platformColors: Record<SocialPlatform, string> = {
    'Instagram': 'bg-pink-500',
    'Twitter': 'bg-sky-500',
    'Facebook': 'bg-blue-600',
    'LinkedIn': 'bg-blue-800',
};

const specialDayColors: Record<SpecialDay['type'], string> = {
    'International': 'bg-purple-500',
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

  const dayBaseClass = "relative flex flex-col h-36 rounded-xl p-2 transition-all duration-300 overflow-hidden";
  const currentMonthClass = "bg-white border-2 border-transparent hover:border-blue-300 hover:shadow-md cursor-pointer";
  const otherMonthClass = "bg-slate-100/80 border-2 border-transparent text-slate-400";
  const todayClass = "border-4 border-blue-500 bg-blue-100 shadow-xl shadow-blue-400/50";

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    setCursorPosition({ x: e.clientX, y: e.clientY });
  };
  
  const handleDayMouseEnter = (day: Date) => {
    const dateKey = format(day, 'yyyy-MM-dd');
    const dayPosts = posts[dateKey] || [];
    const firstPostWithUpload = dayPosts.find(p => p.file);

    if (firstPostWithUpload) {
      // Simulate a unique image URL for preview using a placeholder service
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

      <div className="relative bg-slate-50/95 backdrop-blur-sm rounded-[44px] p-1 shadow-2xl shadow-blue-300/40">
        <div className="flex items-center justify-between px-2 py-4">
          <div className="flex items-baseline gap-3">
            <h2 className="text-3xl font-bold text-slate-800">{format(currentDate, 'MMMM')}</h2>
            <p className="text-xl font-medium text-slate-500">{format(currentDate, 'yyyy')}</p>
          </div>
          <div className="flex items-center gap-2">
            <button onClick={prevMonth} className="p-2 rounded-full text-slate-500 hover:bg-slate-200/70 transition-colors duration-200">
              <ChevronLeft className="h-6 w-6" />
            </button>
            <button onClick={() => setCurrentDate(new Date())} className="px-4 py-2 text-sm font-semibold text-slate-700 bg-white border border-slate-300 rounded-lg hover:bg-slate-100 transition-colors duration-200 shadow-sm">
              Today
            </button>
            <button onClick={nextMonth} className="p-2 rounded-full text-slate-500 hover:bg-slate-200/70 transition-colors duration-200">
              <ChevronRight className="h-6 w-6" />
            </button>
          </div>
        </div>
        
        <div className="grid grid-cols-7 gap-3">
          {dayLabels.map(label => (
            <div key={label} className="text-center text-xs font-bold text-slate-400 tracking-wider py-2">
              {label}
            </div>
          ))}

          {days.map(day => {
            const dateKey = format(day, 'yyyy-MM-dd');
            const dayPosts = posts[dateKey] || [];
            const specialDay = specialDaysMap.get(format(day, 'MM-dd'));
            const hasUpload = dayPosts.some(p => !!p.file);
            const isCurrentMonth = isSameMonth(day, currentDate);
            
            const dayClasses = [
                dayBaseClass,
                isCurrentMonth ? currentMonthClass : otherMonthClass,
                isToday(day) && isCurrentMonth ? todayClass : ""
            ].join(" ");

            return (
              <div
                key={day.toString()}
                onClick={() => isCurrentMonth && onDayClick(day)}
                onMouseEnter={isCurrentMonth && hasUpload ? () => handleDayMouseEnter(day) : undefined}
                onMouseLeave={isCurrentMonth && hasUpload ? handleDayMouseLeave : undefined}
                className={dayClasses}
              >
                  <time dateTime={dateKey} className={`text-2xl font-semibold ${isToday(day) && isCurrentMonth ? 'text-blue-700 !font-extrabold' : isCurrentMonth ? 'text-slate-700' : 'text-slate-400'}`}>
                    {format(day, 'd')}
                  </time>
                  
                  {isCurrentMonth && (
                      <button 
                        onClick={(e) => { e.stopPropagation(); onAddPost(day); }} 
                        className="absolute top-2 right-2 w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center shadow-lg hover:bg-blue-700 transition-all duration-300" 
                        title="Add Post"
                        aria-label={`Add post for ${format(day, 'MMMM d')}`}
                      >
                          <Plus className="h-5 w-5 text-white" />
                      </button>
                  )}

                <div className="mt-1 flex-1 overflow-y-auto custom-scrollbar">
                  {specialDay && isCurrentMonth && (
                    <div className="flex items-center gap-1.5 mb-1" title={specialDay.name}>
                      <div className={`w-2 h-2 rounded-full ${specialDayColors[specialDay.type]}`}></div>
                      <p className={`text-xs font-medium truncate ${isCurrentMonth ? 'text-slate-600' : ''}`}>{specialDay.name}</p>
                    </div>
                  )}
                </div>
                
                <div className="flex items-center justify-between h-5">
                  <div className="flex items-center gap-1.5 flex-wrap">
                      {dayPosts.length > 0 && isCurrentMonth && (
                          dayPosts.map(post => (
                              <div key={post.id} title={`${post.platform}: ${post.content}`} className={`h-2 w-2 rounded-full ${platformColors[post.platform]}`} />
                          ))
                      )}
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