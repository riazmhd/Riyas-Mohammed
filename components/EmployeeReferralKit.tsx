import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Copy, Check, MessageCircle, Mail, ArrowLeft, Share2, User, Calendar, QrCode } from 'lucide-react';
import { useReferral } from '../context/ReferralContext';
import {
  WHATSAPP_TEMPLATE,
  EMAIL_SIGNATURE_TEMPLATE,
  LINKEDIN_TEMPLATE,
  REFERRAL_CARD_TEMPLATE,
  WEEKLY_CONTENT_THEMES,
} from '../referralConstants';

const EmployeeReferralKit: React.FC = () => {
  const { selectedEmployee, employees, selectEmployee, setReferralView, stats } = useReferral();
  const [copiedField, setCopiedField] = useState<string | null>(null);
  const [selectedCode, setSelectedCode] = useState(selectedEmployee?.code || '');

  const employee = selectedEmployee || employees.find(e => e.code === selectedCode);
  const employeeStats = employee ? stats.find(s => s.employeeCode === employee.code) : null;
  const referralLink = employee ? `https://dpsexpo.com/join/${employee.code}` : '';

  const copyToClipboard = (text: string, field: string) => {
    navigator.clipboard.writeText(text).catch(() => {
      // Fallback: create a textarea and copy
      const ta = document.createElement('textarea');
      ta.value = text;
      document.body.appendChild(ta);
      ta.select();
      document.execCommand('copy');
      document.body.removeChild(ta);
    });
    setCopiedField(field);
    setTimeout(() => setCopiedField(null), 2000);
  };

  const CopyButton: React.FC<{ text: string; field: string; label?: string }> = ({ text, field, label }) => (
    <button
      onClick={() => copyToClipboard(text, field)}
      className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white/70 hover:bg-white/90 border border-slate-200 rounded-lg text-xs font-medium text-slate-600 hover:text-slate-800 transition-all"
    >
      {copiedField === field ? (
        <>
          <Check className="h-3.5 w-3.5 text-emerald-500" />
          <span className="text-emerald-600">Copied!</span>
        </>
      ) : (
        <>
          <Copy className="h-3.5 w-3.5" />
          <span>{label || 'Copy'}</span>
        </>
      )}
    </button>
  );

  return (
    <div className="space-y-6 max-w-2xl mx-auto">
      {/* Back Button */}
      <button
        onClick={() => {
          selectEmployee(null);
          setReferralView('dashboard');
        }}
        className="flex items-center gap-1.5 text-sm text-slate-500 hover:text-slate-800 transition-colors"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to Dashboard
      </button>

      {/* Employee Selector */}
      {!employee && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white/60 backdrop-blur-lg rounded-2xl p-5 border border-white/30 shadow-lg"
        >
          <h3 className="font-bold text-slate-800 mb-3">Employee Referral Kit</h3>
          <p className="text-sm text-slate-500 mb-3">Select an employee to view their referral kit.</p>
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

      {employee && (
        <>
          {/* Employee Header Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white/60 backdrop-blur-lg rounded-2xl p-5 border border-white/30 shadow-lg"
          >
            <div className="flex items-center gap-4">
              <img src={employee.avatarUrl} className="w-14 h-14 rounded-full border-2 border-white shadow-md" alt="" />
              <div className="flex-1">
                <h3 className="text-lg font-bold text-slate-800">{employee.name}</h3>
                <p className="text-sm text-slate-500">{employee.department} | {employee.code}</p>
              </div>
              {employeeStats && (
                <div className="text-right">
                  <p className="text-2xl font-bold text-emerald-600">{employeeStats.estimatedFollowers}</p>
                  <p className="text-xs text-slate-500">followers</p>
                </div>
              )}
            </div>

            {/* Quick Stats */}
            {employeeStats && (
              <div className="grid grid-cols-4 gap-2 mt-4">
                {[
                  { label: 'Rank', value: `#${employeeStats.rank}` },
                  { label: 'Clicks', value: employeeStats.linkClicks },
                  { label: 'Shared', value: employeeStats.linksShared },
                  { label: 'Rate', value: `${employeeStats.engagementRate}%` },
                ].map((s, i) => (
                  <div key={i} className="bg-white/50 rounded-xl p-2 text-center">
                    <p className="text-lg font-bold text-slate-800">{s.value}</p>
                    <p className="text-xs text-slate-400">{s.label}</p>
                  </div>
                ))}
              </div>
            )}
          </motion.div>

          {/* Unique Referral Link */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white/60 backdrop-blur-lg rounded-2xl p-5 border border-white/30 shadow-lg"
          >
            <div className="flex items-center gap-2 mb-3">
              <Share2 className="h-5 w-5 text-blue-500" />
              <h3 className="font-bold text-slate-800">Your Unique Referral Link</h3>
            </div>
            <div className="flex items-center gap-2">
              <div className="flex-1 bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm font-mono text-slate-700 overflow-x-auto">
                {referralLink}
              </div>
              <CopyButton text={referralLink} field="link" label="Copy Link" />
            </div>
            <p className="text-xs text-slate-400 mt-2">Share this link to track your referrals. Each click is recorded.</p>
          </motion.div>

          {/* Digital Referral Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            className="bg-white/60 backdrop-blur-lg rounded-2xl p-5 border border-white/30 shadow-lg"
          >
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <QrCode className="h-5 w-5 text-purple-500" />
                <h3 className="font-bold text-slate-800">Digital Referral Card</h3>
              </div>
              <CopyButton text={REFERRAL_CARD_TEMPLATE(employee.name, referralLink)} field="card" />
            </div>
            <div className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 rounded-2xl p-5 text-white">
              <div className="flex items-center gap-2 mb-3">
                <div className="text-lg font-extrabold tracking-tight">DPS EXPO</div>
              </div>
              <p className="text-amber-300 font-semibold text-sm mb-2">You're Invited to Follow DPS Expo!</p>
              <p className="text-slate-300 text-xs mb-3">
                Your colleague <strong className="text-white">{employee.name}</strong> invites you to join Dubai's premier property expo community.
              </p>
              <div className="space-y-1 mb-3">
                {['New property launches', 'Investment opportunities', 'Expo early bird tickets', 'Market insights'].map((item, i) => (
                  <p key={i} className="text-xs text-slate-400 flex items-center gap-1.5">
                    <span className="text-emerald-400">&#8226;</span> {item}
                  </p>
                ))}
              </div>
              <div className="bg-white/10 rounded-lg px-3 py-2 text-xs text-slate-300 font-mono break-all">
                {referralLink}
              </div>
            </div>
          </motion.div>

          {/* WhatsApp Template */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white/60 backdrop-blur-lg rounded-2xl p-5 border border-white/30 shadow-lg"
          >
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <MessageCircle className="h-5 w-5 text-emerald-500" />
                <h3 className="font-bold text-slate-800">WhatsApp Message</h3>
              </div>
              <CopyButton text={WHATSAPP_TEMPLATE(employee.name, referralLink)} field="whatsapp" />
            </div>
            <pre className="bg-emerald-50 border border-emerald-100 rounded-xl p-4 text-xs text-slate-700 whitespace-pre-wrap font-sans leading-relaxed">
              {WHATSAPP_TEMPLATE(employee.name, referralLink)}
            </pre>
          </motion.div>

          {/* Email Signature */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25 }}
            className="bg-white/60 backdrop-blur-lg rounded-2xl p-5 border border-white/30 shadow-lg"
          >
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <Mail className="h-5 w-5 text-blue-500" />
                <h3 className="font-bold text-slate-800">Email Signature</h3>
              </div>
              <CopyButton text={EMAIL_SIGNATURE_TEMPLATE(referralLink)} field="email" />
            </div>
            <pre className="bg-blue-50 border border-blue-100 rounded-xl p-4 text-xs text-slate-700 whitespace-pre-wrap font-sans leading-relaxed">
              {EMAIL_SIGNATURE_TEMPLATE(referralLink)}
            </pre>
          </motion.div>

          {/* LinkedIn Template */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white/60 backdrop-blur-lg rounded-2xl p-5 border border-white/30 shadow-lg"
          >
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <User className="h-5 w-5 text-blue-700" />
                <h3 className="font-bold text-slate-800">LinkedIn Post</h3>
              </div>
              <CopyButton text={LINKEDIN_TEMPLATE(referralLink)} field="linkedin" />
            </div>
            <pre className="bg-sky-50 border border-sky-100 rounded-xl p-4 text-xs text-slate-700 whitespace-pre-wrap font-sans leading-relaxed">
              {LINKEDIN_TEMPLATE(referralLink)}
            </pre>
          </motion.div>

          {/* Weekly Content Themes */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35 }}
            className="bg-white/60 backdrop-blur-lg rounded-2xl p-5 border border-white/30 shadow-lg"
          >
            <div className="flex items-center gap-2 mb-3">
              <Calendar className="h-5 w-5 text-orange-500" />
              <h3 className="font-bold text-slate-800">Weekly Content Themes</h3>
            </div>
            <p className="text-xs text-slate-500 mb-3">Share alongside your referral link for maximum impact.</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {WEEKLY_CONTENT_THEMES.map((theme, i) => (
                <div key={i} className="bg-white/50 rounded-xl p-3 border border-slate-100">
                  <p className="text-xs font-bold text-slate-700">{theme.day}: {theme.theme}</p>
                  <p className="text-xs text-slate-500 mt-0.5">{theme.description}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </>
      )}
    </div>
  );
};

export default EmployeeReferralKit;
