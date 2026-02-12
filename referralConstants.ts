import { ReferralEmployee, ReferralStats, RewardPrize, ReferralProgramRules } from './types';

export const REFERRAL_EMPLOYEES: ReferralEmployee[] = [
  { id: 'emp-1', code: 'DPS-AHMED-01', name: 'Ahmed Khan', email: 'ahmed@dpsexpo.com', department: 'Sales', avatarUrl: 'https://i.pravatar.cc/150?u=ahmed', joinedDate: '2025-01-15' },
  { id: 'emp-2', code: 'DPS-FATIMA-02', name: 'Fatima Ali', email: 'fatima@dpsexpo.com', department: 'Marketing', avatarUrl: 'https://i.pravatar.cc/150?u=fatima', joinedDate: '2025-01-15' },
  { id: 'emp-3', code: 'DPS-JOHN-03', name: 'John Smith', email: 'john@dpsexpo.com', department: 'Operations', avatarUrl: 'https://i.pravatar.cc/150?u=john', joinedDate: '2025-01-20' },
  { id: 'emp-4', code: 'DPS-SARA-04', name: 'Sara Hassan', email: 'sara@dpsexpo.com', department: 'Sales', avatarUrl: 'https://i.pravatar.cc/150?u=sara', joinedDate: '2025-01-20' },
  { id: 'emp-5', code: 'DPS-OMAR-05', name: 'Omar Rashid', email: 'omar@dpsexpo.com', department: 'Events', avatarUrl: 'https://i.pravatar.cc/150?u=omar', joinedDate: '2025-02-01' },
  { id: 'emp-6', code: 'DPS-LAYLA-06', name: 'Layla Mahmoud', email: 'layla@dpsexpo.com', department: 'Marketing', avatarUrl: 'https://i.pravatar.cc/150?u=layla', joinedDate: '2025-02-01' },
  { id: 'emp-7', code: 'DPS-RAVI-07', name: 'Ravi Patel', email: 'ravi@dpsexpo.com', department: 'Sales', avatarUrl: 'https://i.pravatar.cc/150?u=ravi', joinedDate: '2025-02-10' },
  { id: 'emp-8', code: 'DPS-NOOR-08', name: 'Noor Khalid', email: 'noor@dpsexpo.com', department: 'Events', avatarUrl: 'https://i.pravatar.cc/150?u=noor', joinedDate: '2025-02-10' },
  { id: 'emp-9', code: 'DPS-MARIA-09', name: 'Maria Santos', email: 'maria@dpsexpo.com', department: 'Operations', avatarUrl: 'https://i.pravatar.cc/150?u=maria', joinedDate: '2025-02-15' },
  { id: 'emp-10', code: 'DPS-ALI-10', name: 'Ali Mohammed', email: 'ali@dpsexpo.com', department: 'Sales', avatarUrl: 'https://i.pravatar.cc/150?u=ali', joinedDate: '2025-02-15' },
];

export const MOCK_REFERRAL_STATS: ReferralStats[] = [
  { employeeCode: 'DPS-AHMED-01', employeeName: 'Ahmed Khan', linksShared: 45, linkClicks: 120, estimatedFollowers: 23, lastWeekFollowers: 5, thisMonthFollowers: 23, engagementRate: 4.2, rank: 1 },
  { employeeCode: 'DPS-FATIMA-02', employeeName: 'Fatima Ali', linksShared: 38, linkClicks: 95, estimatedFollowers: 18, lastWeekFollowers: 7, thisMonthFollowers: 18, engagementRate: 5.1, rank: 2 },
  { employeeCode: 'DPS-JOHN-03', employeeName: 'John Smith', linksShared: 32, linkClicks: 78, estimatedFollowers: 15, lastWeekFollowers: 3, thisMonthFollowers: 15, engagementRate: 3.8, rank: 3 },
  { employeeCode: 'DPS-SARA-04', employeeName: 'Sara Hassan', linksShared: 28, linkClicks: 65, estimatedFollowers: 12, lastWeekFollowers: 4, thisMonthFollowers: 12, engagementRate: 4.5, rank: 4 },
  { employeeCode: 'DPS-OMAR-05', employeeName: 'Omar Rashid', linksShared: 25, linkClicks: 58, estimatedFollowers: 11, lastWeekFollowers: 2, thisMonthFollowers: 11, engagementRate: 3.2, rank: 5 },
  { employeeCode: 'DPS-LAYLA-06', employeeName: 'Layla Mahmoud', linksShared: 22, linkClicks: 50, estimatedFollowers: 9, lastWeekFollowers: 3, thisMonthFollowers: 9, engagementRate: 4.8, rank: 6 },
  { employeeCode: 'DPS-RAVI-07', employeeName: 'Ravi Patel', linksShared: 18, linkClicks: 42, estimatedFollowers: 8, lastWeekFollowers: 2, thisMonthFollowers: 8, engagementRate: 3.5, rank: 7 },
  { employeeCode: 'DPS-NOOR-08', employeeName: 'Noor Khalid', linksShared: 15, linkClicks: 35, estimatedFollowers: 6, lastWeekFollowers: 1, thisMonthFollowers: 6, engagementRate: 4.0, rank: 8 },
  { employeeCode: 'DPS-MARIA-09', employeeName: 'Maria Santos', linksShared: 12, linkClicks: 28, estimatedFollowers: 5, lastWeekFollowers: 2, thisMonthFollowers: 5, engagementRate: 3.9, rank: 9 },
  { employeeCode: 'DPS-ALI-10', employeeName: 'Ali Mohammed', linksShared: 10, linkClicks: 22, estimatedFollowers: 4, lastWeekFollowers: 1, thisMonthFollowers: 4, engagementRate: 3.6, rank: 10 },
];

export const REWARD_PRIZES: RewardPrize[] = [
  // Weekly
  { tier: 'weekly', position: 1, label: '1st Place', prize: 'AED 200 Voucher', amount: 200 },
  { tier: 'weekly', position: 2, label: '2nd Place', prize: 'AED 100 Voucher', amount: 100 },
  { tier: 'weekly', position: 3, label: '3rd Place', prize: 'Recognition on Board', amount: 0 },
  // Monthly
  { tier: 'monthly', position: 1, label: 'Top Ambassador', prize: 'AED 1,000 + Certificate', amount: 1000 },
  { tier: 'monthly', position: 2, label: '2nd Place', prize: 'AED 600', amount: 600 },
  { tier: 'monthly', position: 3, label: '3rd Place', prize: 'AED 400', amount: 400 },
  { tier: 'monthly', position: 4, label: 'Top 5', prize: 'Free VIP Expo Passes', amount: 0 },
  { tier: 'monthly', position: 5, label: 'Top 5', prize: 'Free VIP Expo Passes', amount: 0 },
  // Quarterly
  { tier: 'quarterly', position: 1, label: '#1 Overall', prize: 'AED 5,000 Bonus + Trophy', amount: 5000 },
  { tier: 'quarterly', position: 2, label: 'Runner Up', prize: 'AED 2,500 Bonus', amount: 2500 },
  { tier: 'quarterly', position: 3, label: '3rd Place', prize: 'AED 1,000 Bonus', amount: 1000 },
];

export const PROGRAM_RULES: ReferralProgramRules = {
  pointsPerFollower: 1,
  pointsPerEngagedFollower: 2,
  prohibited: [
    'Buying followers',
    'Spam tactics',
    'Fake/bot accounts',
    'Multiple accounts for same person',
  ],
  encouraged: [
    'Personal network outreach',
    'Professional connections',
    'Client referrals',
    'Industry events networking',
  ],
};

export const WHATSAPP_TEMPLATE = (employeeName: string, link: string) =>
  `Hi! 👋\n\nI'm inviting you to follow @dps_expo on Instagram - Dubai's biggest property show where you'll find the latest launches, investment opportunities, and expo updates.\n\nFollow through my link and stay updated:\n${link}\n\nSee you at the next expo! 🏢`;

export const EMAIL_SIGNATURE_TEMPLATE = (link: string) =>
  `---\n📸 Follow DPS Expo on Instagram\n${link}\nYour gateway to Dubai's property market`;

export const LINKEDIN_TEMPLATE = (link: string) =>
  `Excited to share that DPS Expo is bringing the best of Dubai's real estate market to one platform!\n\nIf you're interested in property investment, development updates, or attending our upcoming expo, follow @dps_expo on Instagram.\n\n${link}\n\n#DubaiRealEstate #PropertyInvestment #DPSExpo`;

export const REFERRAL_CARD_TEMPLATE = (employeeName: string, link: string) =>
  `🎉 You're Invited to Follow DPS Expo!\n\nYour colleague ${employeeName} invites you to join Dubai's premier property expo community.\n\nGet exclusive access to:\n• New property launches\n• Investment opportunities\n• Expo early bird tickets\n• Market insights\n\n👉 Follow now: ${link}\n\n#DPSExpo #DubaiRealEstate #PropertyShow`;

export const WEEKLY_CONTENT_THEMES = [
  { day: 'Monday', theme: 'Market Insights', description: 'Dubai property trends this week' },
  { day: 'Wednesday', theme: 'Property Spotlight', description: 'Feature a new development' },
  { day: 'Friday', theme: 'Expo Updates', description: 'Behind-the-scenes, countdown to next event' },
  { day: 'Weekend', theme: 'Lifestyle Content', description: 'Dubai living, investment tips' },
];
