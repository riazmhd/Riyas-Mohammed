import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Trophy, TrendingUp, Users, MousePointerClick, Star, Award, Crown, ChevronDown, ChevronUp, BarChart3 } from 'lucide-react';
import { useReferral } from '../context/ReferralContext';
import { REWARD_PRIZES, PROGRAM_RULES } from '../referralConstants';
import { RewardTier } from '../types';

const tierLabels: Record<RewardTier, string> = {
  weekly: 'Weekly Prizes',
  monthly: 'Monthly Grand Prizes',
  quarterly: 'Quarterly Mega Prize',
};

const tierColors: Record<RewardTier, string> = {
  weekly: 'from-blue-500 to-cyan-400',
  monthly: 'from-purple-500 to-pink-400',
  quarterly: 'from-amber-500 to-orange-400',
};

const ReferralDashboard: React.FC = () => {
  const { stats, getTotalFollowers, getTotalClicks, getTopPerformers, setReferralView, selectEmployee, employees } = useReferral();
  const [expandedTier, setExpandedTier] = useState<RewardTier | null>('weekly');
  const [showRules, setShowRules] = useState(false);

  const totalFollowers = getTotalFollowers();
  const totalClicks = getTotalClicks();
  const topPerformers = getTopPerformers(3);
  const avgEngagement = stats.length > 0 ? (stats.reduce((s, r) => s + r.engagementRate, 0) / stats.length).toFixed(1) : '0';
  const totalLinksShared = stats.reduce((s, r) => s + r.linksShared, 0);

  const getRankIcon = (rank: number) => {
    if (rank === 1) return <Crown className="h-5 w-5 text-amber-400" />;
    if (rank === 2) return <Award className="h-5 w-5 text-gray-300" />;
    if (rank === 3) return <Award className="h-5 w-5 text-amber-600" />;
    return <span className="text-sm font-bold text-slate-400">#{rank}</span>;
  };

  const getRankBg = (rank: number) => {
    if (rank === 1) return 'bg-gradient-to-r from-amber-500/20 to-yellow-500/10 border-amber-400/30';
    if (rank === 2) return 'bg-gradient-to-r from-gray-300/20 to-gray-200/10 border-gray-300/30';
    if (rank === 3) return 'bg-gradient-to-r from-amber-700/20 to-orange-600/10 border-amber-600/30';
    return 'bg-white/5 border-white/10';
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center">
        <h2 className="text-3xl font-extrabold text-slate-800 tracking-tight">DPS Ambassadors Program</h2>
        <p className="mt-1 text-slate-600 italic">"Share the Expo, Grow Together"</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {[
          { label: 'Total Followers', value: totalFollowers, icon: Users, color: 'from-blue-500 to-indigo-500' },
          { label: 'Link Clicks', value: totalClicks, icon: MousePointerClick, color: 'from-emerald-500 to-teal-500' },
          { label: 'Links Shared', value: totalLinksShared, icon: TrendingUp, color: 'from-purple-500 to-violet-500' },
          { label: 'Avg Engagement', value: `${avgEngagement}%`, icon: BarChart3, color: 'from-orange-500 to-red-500' },
        ].map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="bg-white/60 backdrop-blur-lg rounded-2xl p-4 border border-white/30 shadow-lg"
          >
            <div className={`inline-flex p-2 rounded-xl bg-gradient-to-br ${stat.color} mb-2`}>
              <stat.icon className="h-5 w-5 text-white" />
            </div>
            <p className="text-2xl font-bold text-slate-800">{stat.value}</p>
            <p className="text-xs text-slate-500 mt-0.5">{stat.label}</p>
          </motion.div>
        ))}
      </div>

      {/* Top 3 Podium */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="bg-white/60 backdrop-blur-lg rounded-2xl p-5 border border-white/30 shadow-lg"
      >
        <h3 className="text-lg font-bold text-slate-800 flex items-center gap-2 mb-4">
          <Trophy className="h-5 w-5 text-amber-500" />
          Top Performers This Month
        </h3>
        <div className="flex items-end justify-center gap-3">
          {/* 2nd Place */}
          {topPerformers[1] && (
            <div className="flex flex-col items-center">
              <img src={employees.find(e => e.code === topPerformers[1].employeeCode)?.avatarUrl || ''} className="w-12 h-12 rounded-full border-2 border-gray-300 mb-1" alt="" />
              <div className="bg-gradient-to-t from-gray-200 to-gray-100 rounded-t-lg w-20 h-20 flex flex-col items-center justify-end pb-2 border border-gray-200/50">
                <Award className="h-4 w-4 text-gray-400 mb-1" />
                <span className="text-xs font-bold text-slate-600">2nd</span>
              </div>
              <p className="text-xs font-semibold text-slate-700 mt-1 text-center">{topPerformers[1].employeeName.split(' ')[0]}</p>
              <p className="text-xs text-slate-500">{topPerformers[1].estimatedFollowers} followers</p>
            </div>
          )}
          {/* 1st Place */}
          {topPerformers[0] && (
            <div className="flex flex-col items-center -mt-4">
              <Crown className="h-6 w-6 text-amber-400 mb-1" />
              <img src={employees.find(e => e.code === topPerformers[0].employeeCode)?.avatarUrl || ''} className="w-14 h-14 rounded-full border-2 border-amber-400 mb-1" alt="" />
              <div className="bg-gradient-to-t from-amber-200 to-amber-100 rounded-t-lg w-24 h-28 flex flex-col items-center justify-end pb-2 border border-amber-300/50">
                <Trophy className="h-5 w-5 text-amber-500 mb-1" />
                <span className="text-xs font-bold text-amber-700">1st</span>
              </div>
              <p className="text-xs font-bold text-slate-800 mt-1 text-center">{topPerformers[0].employeeName.split(' ')[0]}</p>
              <p className="text-xs text-slate-500">{topPerformers[0].estimatedFollowers} followers</p>
            </div>
          )}
          {/* 3rd Place */}
          {topPerformers[2] && (
            <div className="flex flex-col items-center">
              <img src={employees.find(e => e.code === topPerformers[2].employeeCode)?.avatarUrl || ''} className="w-12 h-12 rounded-full border-2 border-amber-600 mb-1" alt="" />
              <div className="bg-gradient-to-t from-orange-200 to-orange-100 rounded-t-lg w-20 h-16 flex flex-col items-center justify-end pb-2 border border-orange-300/50">
                <Award className="h-4 w-4 text-amber-600 mb-1" />
                <span className="text-xs font-bold text-amber-700">3rd</span>
              </div>
              <p className="text-xs font-semibold text-slate-700 mt-1 text-center">{topPerformers[2].employeeName.split(' ')[0]}</p>
              <p className="text-xs text-slate-500">{topPerformers[2].estimatedFollowers} followers</p>
            </div>
          )}
        </div>
      </motion.div>

      {/* Full Leaderboard */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="bg-white/60 backdrop-blur-lg rounded-2xl p-5 border border-white/30 shadow-lg"
      >
        <h3 className="text-lg font-bold text-slate-800 flex items-center gap-2 mb-4">
          <Star className="h-5 w-5 text-purple-500" />
          Full Leaderboard
        </h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-slate-500 border-b border-slate-200/50">
                <th className="pb-2 pr-2">Rank</th>
                <th className="pb-2 pr-2">Employee</th>
                <th className="pb-2 pr-2 text-right">Shared</th>
                <th className="pb-2 pr-2 text-right">Clicks</th>
                <th className="pb-2 pr-2 text-right">Followers</th>
                <th className="pb-2 pr-2 text-right">This Week</th>
                <th className="pb-2 text-right">Engagement</th>
              </tr>
            </thead>
            <tbody>
              {stats.map((row) => (
                <tr
                  key={row.employeeCode}
                  className={`border-b border-slate-100/50 cursor-pointer hover:bg-white/40 transition-colors ${getRankBg(row.rank)}`}
                  onClick={() => {
                    const emp = employees.find(e => e.code === row.employeeCode);
                    if (emp) {
                      selectEmployee(emp);
                      setReferralView('kit');
                    }
                  }}
                >
                  <td className="py-2.5 pr-2">
                    <div className="flex items-center justify-center w-7 h-7">{getRankIcon(row.rank)}</div>
                  </td>
                  <td className="py-2.5 pr-2">
                    <div className="flex items-center gap-2">
                      <img
                        src={employees.find(e => e.code === row.employeeCode)?.avatarUrl || ''}
                        className="w-7 h-7 rounded-full"
                        alt=""
                      />
                      <div>
                        <p className="font-semibold text-slate-800">{row.employeeName}</p>
                        <p className="text-xs text-slate-400">{row.employeeCode}</p>
                      </div>
                    </div>
                  </td>
                  <td className="py-2.5 pr-2 text-right font-medium">{row.linksShared}</td>
                  <td className="py-2.5 pr-2 text-right font-medium">{row.linkClicks}</td>
                  <td className="py-2.5 pr-2 text-right font-bold text-emerald-600">{row.estimatedFollowers}</td>
                  <td className="py-2.5 pr-2 text-right">
                    <span className="text-emerald-500 text-xs font-medium">+{row.lastWeekFollowers}</span>
                  </td>
                  <td className="py-2.5 text-right font-medium">{row.engagementRate}%</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>

      {/* Reward Tiers */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="bg-white/60 backdrop-blur-lg rounded-2xl p-5 border border-white/30 shadow-lg"
      >
        <h3 className="text-lg font-bold text-slate-800 flex items-center gap-2 mb-4">
          <Award className="h-5 w-5 text-amber-500" />
          Rewards & Prizes
        </h3>
        <div className="space-y-2">
          {(['weekly', 'monthly', 'quarterly'] as RewardTier[]).map((tier) => {
            const prizes = REWARD_PRIZES.filter(p => p.tier === tier);
            const isExpanded = expandedTier === tier;
            return (
              <div key={tier} className="border border-white/20 rounded-xl overflow-hidden">
                <button
                  onClick={() => setExpandedTier(isExpanded ? null : tier)}
                  className={`w-full flex items-center justify-between p-3 bg-gradient-to-r ${tierColors[tier]} text-white font-semibold text-sm`}
                >
                  <span>{tierLabels[tier]}</span>
                  {isExpanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                </button>
                {isExpanded && (
                  <div className="p-3 space-y-1.5 bg-white/30">
                    {prizes.map((p, i) => (
                      <div key={i} className="flex items-center justify-between text-sm">
                        <div className="flex items-center gap-2">
                          <span className="font-semibold text-slate-700">{p.label}</span>
                        </div>
                        <span className="font-medium text-slate-600">{p.prize}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </motion.div>

      {/* Program Rules */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="bg-white/60 backdrop-blur-lg rounded-2xl p-5 border border-white/30 shadow-lg"
      >
        <button
          onClick={() => setShowRules(!showRules)}
          className="w-full flex items-center justify-between"
        >
          <h3 className="text-lg font-bold text-slate-800">Program Rules</h3>
          {showRules ? <ChevronUp className="h-5 w-5 text-slate-500" /> : <ChevronDown className="h-5 w-5 text-slate-500" />}
        </button>
        {showRules && (
          <div className="mt-4 space-y-4 text-sm">
            <div>
              <p className="font-semibold text-slate-700 mb-1">Scoring</p>
              <p className="text-slate-600">Each verified follower = {PROGRAM_RULES.pointsPerFollower} point</p>
              <p className="text-slate-600">Engaged follower (likes/comments) = {PROGRAM_RULES.pointsPerEngagedFollower} points</p>
            </div>
            <div>
              <p className="font-semibold text-red-600 mb-1">Prohibited</p>
              <ul className="space-y-0.5">
                {PROGRAM_RULES.prohibited.map((rule, i) => (
                  <li key={i} className="text-slate-600 flex items-center gap-1.5">
                    <span className="text-red-400 text-xs">&#10005;</span> {rule}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p className="font-semibold text-emerald-600 mb-1">Encouraged</p>
              <ul className="space-y-0.5">
                {PROGRAM_RULES.encouraged.map((rule, i) => (
                  <li key={i} className="text-slate-600 flex items-center gap-1.5">
                    <span className="text-emerald-400 text-xs">&#10003;</span> {rule}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default ReferralDashboard;
