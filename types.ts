export type SocialPlatform = 'Instagram' | 'Twitter' | 'Facebook' | 'LinkedIn';

export interface Post {
  id: string;
  date: string; // YYYY-MM-DD format
  content: string;
  platform: SocialPlatform;
  time: string; // HH:mm format
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