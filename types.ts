export type SocialPlatform = 'Instagram' | 'Twitter' | 'Facebook' | 'LinkedIn';
export type Client = 'H&S' | 'DECA' | 'DPS';

export interface Post {
  id: string;
  date: string; // YYYY-MM-DD format
  content: string;
  platform: SocialPlatform;
  time: string; // HH:mm format
  client: Client;
  file?: {
    name: string;
    type: string;
  };
  uploader?: string;
}

export interface SpecialDay {
  date: string; // MM-DD format
  name: string;
  type: 'International' | 'UAE';
  suggestion: string;
}

export interface Notification {
  id: string;
  type: 'info' | 'success' | 'warning' | 'error';
  title: string;
  message: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  avatarUrl: string;
}

export interface ActivityLog {
  id: string;
  timestamp: Date;
  user: string;
  action: string;
}