
import React, { useState, useMemo, useRef, useEffect } from 'react';
import { Calendar } from './components/Calendar';
import { ContentModal } from './components/ContentModal';
import { Marquee } from './components/Marquee';
import { Post, Notification as NotificationType, User } from './types';
import { SPECIAL_DAYS } from './constants';
import { format } from 'date-fns';
import Dock from './components/Dock';
import NotificationBell from './components/NotificationBell';
import GroupChat from './components/GroupChat';
import { NotificationToast } from './components/NotificationToast';
import { UploadsSidebar } from './components/UploadsSidebar';
import { AuthProvider, useAuth } from './context/AuthContext';
import { LoginScreen } from './components/LoginScreen';
import { UserProfile } from './components/UserProfile';
import { ActivityLogSidebar } from './components/ActivityLogSidebar';
import { ConfettiAnimation } from './components/ConfettiAnimation';
import { AppsSidebar } from './components/AppsSidebar';

const sampleNotifications: Omit<NotificationType, 'id'>[] = [
  { type: 'success', title: 'Upload Complete', message: 'Your file "launch-creative.jpg" has been saved.' },
  { type: 'info', title: 'New Suggestion', message: 'Consider a post for International Friendship Day.' },
  { type: 'warning', title: 'API Key Low Credit', message: 'Your API key is running low on credits. Please top up.' },
  { type: 'error', title: 'Failed to Post', message: 'Could not connect to the Instagram API. Please try again.' },
];

let notificationCycle = 0;

export type ActiveView = 'chat' | 'activity' | 'uploads' | 'apps';

const AppContent: React.FC = () => {
  const { user, logActivity, history } = useAuth();
  const [posts, setPosts] = useState<Record<string, Post[]>>({
     '2024-07-28': [{id: '1', date: '2024-07-28', content: 'Initial post example!', platform: 'Instagram', time: '10:00', client: 'H&S', uploader: 'System'}],
     '2024-07-25': [{
        id: '2',
        date: '2024-07-25',
        content: 'launch-creative.jpg',
        platform: 'Facebook',
        time: '14:30',
        client: 'DECA',
        file: { name: 'launch-creative.jpg', type: 'image/jpeg' },
        uploader: 'Alice',
     }]
  });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [notifications, setNotifications] = useState<NotificationType[]>([]);
  const [selectedDayUploads, setSelectedDayUploads] = useState<{date: Date, posts: Post[]} | null>(null);
  const [activeView, setActiveView] = useState<ActiveView | null>('chat');
  const [showConfettiForUser, setShowConfettiForUser] = useState<User | null>(null);
  const notificationSoundRef = useRef<HTMLAudioElement>(null);

  const playNotificationSound = () => {
    notificationSoundRef.current?.play().catch(error => console.error("Audio play failed:", error));
  };

  const addNotification = () => {
    const notificationData = sampleNotifications[notificationCycle % sampleNotifications.length];
    notificationCycle++;
    const newNotification: NotificationType = {
      id: new Date().toISOString() + Math.random(),
      ...notificationData,
    };
    setNotifications(current => [...current, newNotification]);
    logActivity(`triggered a notification: "${newNotification.title}"`);
    playNotificationSound();
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
    const newPost = { ...post, id: new Date().toISOString(), uploader: user?.name || 'Unknown' };
    setPosts(prevPosts => {
      const existingPosts = prevPosts[dateKey] || [];
      return {
        ...prevPosts,
        [dateKey]: [...existingPosts, newPost].sort((a,b) => a.time.localeCompare(b.time)),
      };
    });
    logActivity(`scheduled a post for ${post.platform} on ${post.date} for client ${post.client}`);
    handleCloseModal();
    if(user) {
        setShowConfettiForUser(user);
        setTimeout(() => setShowConfettiForUser(null), 3000);
    }
  };
  
  const marqueeSuggestions = useMemo(() => {
    return SPECIAL_DAYS.map(day => `On ${day.date.substring(3,5)}/${day.date.substring(0,2)} (${day.name}): ${day.suggestion}`);
  }, []);

  const handleDayClick = (date: Date) => {
    const dateKey = format(date, 'yyyy-MM-dd');
    const dayPosts = posts[dateKey] || [];
    const uploadedPosts = dayPosts.filter(p => p.file);
    if (uploadedPosts.length > 0) {
        setActiveView('uploads');
        setSelectedDayUploads({ date, posts: uploadedPosts });
    } else {
      if (activeView === 'uploads') {
        setActiveView(null);
      }
    }
  };

  return (
    <div className="min-h-screen text-slate-800 antialiased overflow-hidden">
       <div id="bg-wallpaper"></div>
      <UserProfile />
      <NotificationBell 
        count={notifications.length}
        onClick={addNotification}
      />

      <audio ref={notificationSoundRef} src="data:audio/wav;base64,UklGRl9vT19XQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YV_2T19AAAAA//8/f/j/5//j/6//j/7v/o/7v/l/+f/5/9n/4//b/9//6/8v/9P/K//X/zP/9/8v/9f/P//n/9f/O//X/y//V/8v/1f/L/9X/yv/U/8r/1P/K/9T/yv/U/8r/0//K/9P/yv/T/8r/0//K/9T/yv/U/8r/1P/K/9P/yv/T/8r/0//K/9P/yv/U/8r/1P/K/9T/yv/T/8r/0//K/9P/yv/S/8r/0v/K/9L/yv/S/8r/0v/K/9L/yv/S/8r/0v/K/9L/yv/S/8r/0v/K/9P/yv/T/8r/0//K/9P/yv/T/8r/0//K/9P/yv/T/8o=" />
      
      {showConfettiForUser && <ConfettiAnimation user={showConfettiForUser} />}

      <div aria-live="assertive" className="fixed inset-0 flex flex-col items-end px-4 py-24 pointer-events-none sm:p-6 sm:items-end sm:justify-start z-[100] gap-3">
        {notifications.map((n) => (
          <NotificationToast
            key={n.id}
            notification={n}
            onDismiss={removeNotification}
          />
        ))}
      </div>
      
      <ActivityLogSidebar history={history} isOpen={activeView === 'activity'} onClose={() => setActiveView(null)} />
      <UploadsSidebar data={selectedDayUploads} isOpen={activeView === 'uploads'} onClose={() => setActiveView(null)} />
      <GroupChat isOpen={activeView === 'chat'} />
      <AppsSidebar isOpen={activeView === 'apps'} onClose={() => setActiveView(null)} />

      <div className="p-4 lg:p-8 relative z-10">
        <div className="fixed top-0 left-0 right-0 z-20">
          <Marquee messages={marqueeSuggestions} />
        </div>
        <main className="container mx-auto p-4 pt-16 pb-24">
          <header className="text-center my-8">
            <h1 className="text-5xl font-extrabold text-slate-800 tracking-tight">H&S Content Hub</h1>
            <p className="mt-2 text-lg text-slate-600">Your central dashboard for social media management.</p>
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
      <Dock activeView={activeView} setActiveView={setActiveView} />
    </div>
  );
};

const AppRouter: React.FC = () => {
  const { authState } = useAuth();

  if (authState === 'unauthenticated') {
    return <LoginScreen />;
  }
  
  if (authState === 'authenticated') {
    return <AppContent />;
  }

  return null; // Or a loading spinner
};

const App: React.FC = () => {
  return (
    <AuthProvider>
      <AppRouter />
    </AuthProvider>
  );
};

export default App;
