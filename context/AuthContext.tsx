import React, { createContext, useState, useContext, PropsWithChildren, useEffect } from 'react';
import { User, ActivityLog } from '../types';

type AuthState = 'unauthenticated' | 'authenticated';

interface AuthContextType {
  user: User | null;
  history: ActivityLog[];
  authState: AuthState;
  login: (email: string, password: string) => boolean;
  logout: () => void;
  logActivity: (action: string) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const MOCK_USER_KEY = 'hs_content_hub_user';

const mockUser: User = {
    id: 'user-1',
    name: 'Riaz',
    email: 'riaz@example.com',
    avatarUrl: `https://i.pravatar.cc/150?u=riaz`,
};


export const AuthProvider = ({ children }: PropsWithChildren) => {
  const [user, setUser] = useState<User | null>(null);
  const [history, setHistory] = useState<ActivityLog[]>([]);
  const [authState, setAuthState] = useState<AuthState>('unauthenticated');

  useEffect(() => {
    // Auto-login the mock user on initial load
    setUser(mockUser);
    setAuthState('authenticated');
    localStorage.setItem(MOCK_USER_KEY, JSON.stringify(mockUser));
  }, []);
  
  const logActivity = (action: string, userName?: string) => {
    const activityUser = userName || user?.name || 'System';
    const newLog: ActivityLog = {
      id: new Date().toISOString() + Math.random(),
      timestamp: new Date(),
      user: activityUser,
      action,
    };
    setHistory(prev => [newLog, ...prev]);
  };

  const login = (email: string, password: string): boolean => {
    // Mock login: succeeds with any non-empty email/password
    if (email && password) {
        const loggedInUser = { ...mockUser, email };
        setUser(loggedInUser);
        localStorage.setItem(MOCK_USER_KEY, JSON.stringify(loggedInUser));
        setAuthState('authenticated');
        logActivity('logged in', loggedInUser.name);
        return true;
    }
    return false;
  };

  const logout = () => {
    if (user) {
      logActivity('logged out');
    }
    setUser(null);
    localStorage.removeItem(MOCK_USER_KEY);
    setAuthState('unauthenticated');
    // For this design, we might want to prevent logout or handle it differently
    // since there's no easy way to log back in.
    // For now, it will just clear the state.
  };

  return (
    <AuthContext.Provider value={{ user, history, authState, login, logout, logActivity }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};