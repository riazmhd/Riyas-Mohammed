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

// DPS Expo Referral Program Types
export interface ReferralEmployee {
  id: string;
  code: string; // e.g. DPS-AHMED-01
  name: string;
  email: string;
  department: string;
  avatarUrl: string;
  joinedDate: string; // ISO date
}

export interface ReferralRecord {
  id: string;
  employeeCode: string;
  timestamp: string; // ISO date
  source: 'whatsapp' | 'email' | 'linkedin' | 'instagram' | 'direct' | 'other';
  followerEstimate: boolean; // whether this click likely converted
}

export interface ReferralStats {
  employeeCode: string;
  employeeName: string;
  linksShared: number;
  linkClicks: number;
  estimatedFollowers: number;
  lastWeekFollowers: number;
  thisMonthFollowers: number;
  engagementRate: number;
  rank: number;
}

export type RewardTier = 'weekly' | 'monthly' | 'quarterly';

export interface RewardPrize {
  tier: RewardTier;
  position: number;
  label: string;
  prize: string;
  amount: number; // AED
}

export interface ReferralProgramRules {
  pointsPerFollower: number;
  pointsPerEngagedFollower: number;
  prohibited: string[];
  encouraged: string[];
}

export type ReferralView = 'dashboard' | 'landing' | 'kit';