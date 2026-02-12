import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Building2, CheckCircle, Instagram, Users, Sparkles, MapPin, CalendarDays, ArrowLeft } from 'lucide-react';
import { useReferral } from '../context/ReferralContext';

const features = [
  { icon: Building2, text: 'Premium property developers' },
  { icon: Sparkles, text: 'Exclusive pre-launch offers' },
  { icon: Users, text: 'Industry networking events' },
  { icon: MapPin, text: 'Expert market insights' },
];

const instagramHighlights = [
  'Latest property launches',
  'Expo updates & dates',
  'Exclusive behind-the-scenes content',
  'Special investor opportunities',
];

const ReferralLandingPage: React.FC = () => {
  const { selectedEmployee, employees, selectEmployee, setReferralView, addRecord } = useReferral();
  const [selectedCode, setSelectedCode] = useState(selectedEmployee?.code || '');
  const [clickTracked, setClickTracked] = useState(false);

  const employee = selectedEmployee || employees.find(e => e.code === selectedCode);

  const handleFollowClick = () => {
    if (employee) {
      addRecord({
        employeeCode: employee.code,
        source: 'direct',
        followerEstimate: true,
      });
      setClickTracked(true);
    }
  };

  return (
    <div className="space-y-6 max-w-lg mx-auto">
      {/* Back Button */}
      <button
        onClick={() => setReferralView('dashboard')}
        className="flex items-center gap-1.5 text-sm text-slate-500 hover:text-slate-800 transition-colors"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to Dashboard
      </button>

      {/* Employee Selector (if no employee selected) */}
      {!employee && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white/60 backdrop-blur-lg rounded-2xl p-5 border border-white/30 shadow-lg"
        >
          <h3 className="font-bold text-slate-800 mb-3">Preview Landing Page</h3>
          <p className="text-sm text-slate-500 mb-3">Select an employee to preview their referral landing page.</p>
          <select
            value={selectedCode}
            onChange={(e) => {
              setSelectedCode(e.target.value);
              const emp = employees.find(em => em.code === e.target.value);
              if (emp) selectEmployee(emp);
            }}
            className="w-full px-3 py-2 bg-white/70 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            <option value="">Choose employee...</option>
            {employees.map(emp => (
              <option key={emp.id} value={emp.code}>{emp.name} ({emp.code})</option>
            ))}
          </select>
        </motion.div>
      )}

      {/* Landing Page Preview */}
      {employee && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white/80 backdrop-blur-xl rounded-3xl border border-white/40 shadow-2xl overflow-hidden"
        >
          {/* Header Banner */}
          <div className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-6 text-center">
            <div className="flex items-center justify-center gap-2 mb-3">
              <Building2 className="h-8 w-8 text-amber-400" />
              <span className="text-2xl font-extrabold text-white tracking-tight">DPS EXPO</span>
            </div>
            <p className="text-slate-300 text-sm">Join the DPS Property Expo Community</p>
            <div className="mt-3 inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-1.5">
              <img src={employee.avatarUrl} className="w-6 h-6 rounded-full" alt="" />
              <span className="text-sm text-white">Invited by <strong>{employee.name}</strong></span>
            </div>
          </div>

          {/* Content */}
          <div className="p-6 space-y-6">
            {/* Hero */}
            <div className="text-center">
              <h2 className="text-xl font-bold text-slate-800">Discover Dubai's Most Exclusive Property Show</h2>
              <p className="text-sm text-slate-500 mt-1">DPS Expo connects you with:</p>
            </div>

            {/* Features */}
            <div className="grid grid-cols-2 gap-3">
              {features.map((f, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 + i * 0.1 }}
                  className="flex items-center gap-2 bg-white/60 rounded-xl p-3 border border-slate-100"
                >
                  <f.icon className="h-4 w-4 text-blue-500 flex-shrink-0" />
                  <span className="text-xs font-medium text-slate-700">{f.text}</span>
                </motion.div>
              ))}
            </div>

            {/* Instagram Highlights */}
            <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-4 border border-purple-100/50">
              <div className="flex items-center gap-2 mb-3">
                <Instagram className="h-5 w-5 text-pink-500" />
                <span className="text-sm font-bold text-slate-800">Follow us on Instagram for:</span>
              </div>
              <ul className="space-y-1.5">
                {instagramHighlights.map((item, i) => (
                  <li key={i} className="flex items-center gap-2 text-sm text-slate-600">
                    <CheckCircle className="h-3.5 w-3.5 text-emerald-500 flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* CTA Button */}
            <div className="text-center">
              {!clickTracked ? (
                <button
                  onClick={handleFollowClick}
                  className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-600 via-pink-500 to-orange-400 text-white font-bold py-3 px-8 rounded-full shadow-lg shadow-purple-500/30 hover:shadow-xl hover:shadow-purple-500/40 transition-all hover:scale-105"
                >
                  <Instagram className="h-5 w-5" />
                  Follow @dps_expo on Instagram
                </button>
              ) : (
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="inline-flex items-center gap-2 bg-emerald-500 text-white font-bold py-3 px-8 rounded-full"
                >
                  <CheckCircle className="h-5 w-5" />
                  Click Tracked! Redirecting...
                </motion.div>
              )}
            </div>

            {/* Social Proof */}
            <div className="text-center border-t border-slate-100 pt-4">
              <p className="text-sm text-slate-500">
                Join <strong className="text-slate-700">10,000+</strong> property investors and enthusiasts
              </p>
              <div className="flex items-center justify-center gap-1.5 mt-1.5 text-xs text-slate-400">
                <CalendarDays className="h-3.5 w-3.5" />
                <span>Next Expo: March 2026 | Dubai World Trade Centre</span>
              </div>
            </div>

            {/* Referral Code */}
            <div className="text-center">
              <span className="inline-block bg-slate-100 text-slate-500 text-xs px-3 py-1 rounded-full">
                Referral: {employee.code}
              </span>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default ReferralLandingPage;
