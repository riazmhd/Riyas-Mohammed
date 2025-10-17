import React, { useState, useMemo } from 'react';
import { Calendar } from './components/Calendar';
import { ContentModal } from './components/ContentModal';
import { Marquee } from './components/Marquee';
import { Post, Notification as NotificationType } from './types';
import { SPECIAL_DAYS } from './constants';
import { format } from 'date-fns';
import Dock from './components/Dock';
import NotificationBell from './components/NotificationBell';
import GroupChat from './components/GroupChat';
import { NotificationToast } from './components/NotificationToast';
import { UploadsSidebar } from './components/UploadsSidebar';

// FIX: Explicitly typed `sampleNotifications` to prevent TypeScript from inferring the `type` property as a generic `string`.
const sampleNotifications: Omit<NotificationType, 'id'>[] = [
  { type: 'success', title: 'Upload Complete', message: 'Your file "launch-creative.jpg" has been saved.' },
  { type: 'info', title: 'New Suggestion', message: 'Consider a post for International Friendship Day.' },
  { type: 'warning', title: 'API Key Low Credit', message: 'Your API key is running low on credits. Please top up.' },
  { type: 'error', title: 'Failed to Post', message: 'Could not connect to the Instagram API. Please try again.' },
];

let notificationCycle = 0;

const App: React.FC = () => {
  const [posts, setPosts] = useState<Record<string, Post[]>>({
     '2024-07-28': [{id: '1', date: '2024-07-28', content: 'Initial post example!', platform: 'Instagram', time: '10:00'}],
     '2024-07-25': [{
        id: '2',
        date: '2024-07-25',
        content: 'launch-creative.jpg',
        platform: 'Facebook',
        time: '14:30',
        file: { name: 'launch-creative.jpg', type: 'image/jpeg' },
        uploader: 'Alice',
     }]
  });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [notifications, setNotifications] = useState<NotificationType[]>([]);
  const [selectedDayUploads, setSelectedDayUploads] = useState<{date: Date, posts: Post[]} | null>(null);


  const addNotification = () => {
    const notificationData = sampleNotifications[notificationCycle % sampleNotifications.length];
    notificationCycle++;
    const newNotification: NotificationType = {
      id: new Date().toISOString() + Math.random(),
      ...notificationData,
    };
    setNotifications(current => [...current, newNotification]);
  };

  const removeNotification = (id: string) => {
    setNotifications(current => current.filter(n => n.id !== id));
  };


  const handleAddPost = (date: Date) => {
    setSelectedDate(date);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedDate(null);
  };

  const handleSavePost = (post: Omit<Post, 'id'>) => {
    const dateKey = post.date;
    const newPost = { ...post, id: new Date().toISOString(), uploader: 'You' };
    setPosts(prevPosts => {
      const existingPosts = prevPosts[dateKey] || [];
      return {
        ...prevPosts,
        [dateKey]: [...existingPosts, newPost].sort((a,b) => a.time.localeCompare(b.time)),
      };
    });
    handleCloseModal();
  };
  
  const marqueeSuggestions = useMemo(() => {
    return SPECIAL_DAYS.map(day => `On ${day.date.substring(3,5)}/${day.date.substring(0,2)} (${day.name}): ${day.suggestion}`);
  }, []);

  const handleDayClick = (date: Date) => {
    const dateKey = format(date, 'yyyy-MM-dd');
    const dayPosts = posts[dateKey] || [];
    const uploadedPosts = dayPosts.filter(p => p.file);
    if (uploadedPosts.length > 0) {
        setSelectedDayUploads({ date, posts: uploadedPosts });
    }
  };

  const handleCloseUploadsSidebar = () => setSelectedDayUploads(null);

  return (
    <div className="bg-slate-50 min-h-screen text-slate-800 antialiased">
      {/* Notification System */}
      <NotificationBell 
        count={notifications.length}
        onClick={addNotification}
      />
      <div aria-live="assertive" className="fixed inset-0 flex flex-col items-end px-4 py-24 pointer-events-none sm:p-6 sm:items-end sm:justify-start z-50 gap-3">
        {notifications.map((n) => (
          <NotificationToast
            key={n.id}
            notification={n}
            onDismiss={removeNotification}
          />
        ))}
      </div>

      <UploadsSidebar data={selectedDayUploads} onClose={handleCloseUploadsSidebar} />

      <div className="ml-80 pr-96">
        <div className="fixed top-0 left-80 right-96 z-20 bg-slate-50/80 backdrop-blur-sm">
          <Marquee messages={marqueeSuggestions} />
        </div>
        <main className="container mx-auto p-4 pt-12 pb-24">
           <p className="text-center text-xs text-slate-500 font-bold">
            Created by Riaz - With Google AI Labs
          </p>
          <header className="text-center mt-12 mb-8">
            <h1 className="text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl">
              H&S Content Hub
            </h1>
            <p className="mt-4 text-lg text-slate-600">
              Plan, schedule, and visualize your social media content with ease.
            </p>
          </header>
          <Calendar 
            posts={posts} 
            onAddPost={handleAddPost}
            specialDays={SPECIAL_DAYS} 
            onDayClick={handleDayClick}
          />
        </main>
      </div>
      
      {selectedDate && (
        <ContentModal
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          onSave={handleSavePost}
          selectedDate={selectedDate}
        />
      )}
      <Dock />
      <GroupChat />
    </div>
  );
};

export default App;