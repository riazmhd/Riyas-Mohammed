import React from 'react';
import { useReferral } from '../context/ReferralContext';
import ReferralDashboard from './ReferralDashboard';
import ReferralLandingPage from './ReferralLandingPage';
import EmployeeReferralKit from './EmployeeReferralKit';

const ReferralProgram: React.FC = () => {
  const { referralView } = useReferral();

  const renderView = () => {
    switch (referralView) {
      case 'landing':
        return <ReferralLandingPage />;
      case 'kit':
        return <EmployeeReferralKit />;
      case 'dashboard':
      default:
        return <ReferralDashboard />;
    }
  };

  return <div className="pb-8">{renderView()}</div>;
};

export default ReferralProgram;
