import React, { createContext, useState, useContext, PropsWithChildren } from 'react';
import { ReferralEmployee, ReferralStats, ReferralRecord, ReferralView } from '../types';
import { REFERRAL_EMPLOYEES, MOCK_REFERRAL_STATS } from '../referralConstants';

interface ReferralContextType {
  employees: ReferralEmployee[];
  stats: ReferralStats[];
  records: ReferralRecord[];
  selectedEmployee: ReferralEmployee | null;
  referralView: ReferralView;
  setReferralView: (view: ReferralView) => void;
  selectEmployee: (employee: ReferralEmployee | null) => void;
  addRecord: (record: Omit<ReferralRecord, 'id' | 'timestamp'>) => void;
  updateStats: (code: string, updates: Partial<ReferralStats>) => void;
  getEmployeeByCode: (code: string) => ReferralEmployee | undefined;
  getTotalFollowers: () => number;
  getTotalClicks: () => number;
  getTopPerformers: (count: number) => ReferralStats[];
}

const ReferralContext = createContext<ReferralContextType | undefined>(undefined);

export const ReferralProvider = ({ children }: PropsWithChildren) => {
  const [employees] = useState<ReferralEmployee[]>(REFERRAL_EMPLOYEES);
  const [stats, setStats] = useState<ReferralStats[]>(MOCK_REFERRAL_STATS);
  const [records, setRecords] = useState<ReferralRecord[]>([]);
  const [selectedEmployee, setSelectedEmployee] = useState<ReferralEmployee | null>(null);
  const [referralView, setReferralView] = useState<ReferralView>('dashboard');

  const selectEmployee = (employee: ReferralEmployee | null) => {
    setSelectedEmployee(employee);
  };

  const addRecord = (record: Omit<ReferralRecord, 'id' | 'timestamp'>) => {
    const newRecord: ReferralRecord = {
      ...record,
      id: `ref-${Date.now()}-${Math.random().toString(36).slice(2)}`,
      timestamp: new Date().toISOString(),
    };
    setRecords(prev => [newRecord, ...prev]);

    // Update stats for the employee
    setStats(prev =>
      prev.map(s => {
        if (s.employeeCode === record.employeeCode) {
          return {
            ...s,
            linkClicks: s.linkClicks + 1,
            estimatedFollowers: record.followerEstimate ? s.estimatedFollowers + 1 : s.estimatedFollowers,
            thisMonthFollowers: record.followerEstimate ? s.thisMonthFollowers + 1 : s.thisMonthFollowers,
            lastWeekFollowers: record.followerEstimate ? s.lastWeekFollowers + 1 : s.lastWeekFollowers,
          };
        }
        return s;
      })
    );
  };

  const updateStats = (code: string, updates: Partial<ReferralStats>) => {
    setStats(prev =>
      prev.map(s => (s.employeeCode === code ? { ...s, ...updates } : s))
    );
  };

  const getEmployeeByCode = (code: string) => {
    return employees.find(e => e.code === code);
  };

  const getTotalFollowers = () => {
    return stats.reduce((sum, s) => sum + s.estimatedFollowers, 0);
  };

  const getTotalClicks = () => {
    return stats.reduce((sum, s) => sum + s.linkClicks, 0);
  };

  const getTopPerformers = (count: number) => {
    return [...stats].sort((a, b) => b.estimatedFollowers - a.estimatedFollowers).slice(0, count);
  };

  return (
    <ReferralContext.Provider
      value={{
        employees,
        stats,
        records,
        selectedEmployee,
        referralView,
        setReferralView,
        selectEmployee,
        addRecord,
        updateStats,
        getEmployeeByCode,
        getTotalFollowers,
        getTotalClicks,
        getTopPerformers,
      }}
    >
      {children}
    </ReferralContext.Provider>
  );
};

export const useReferral = () => {
  const context = useContext(ReferralContext);
  if (context === undefined) {
    throw new Error('useReferral must be used within a ReferralProvider');
  }
  return context;
};
