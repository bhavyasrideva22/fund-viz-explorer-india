
import React from 'react';
import { Calculator, BadgeIndianRupee } from 'lucide-react';

const CalculatorHeader: React.FC = () => {
  return (
    <header className="bg-brandPrimary text-white py-6">
      <div className="section-container">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <BadgeIndianRupee className="h-8 w-8" />
            <h1 className="text-2xl sm:text-3xl font-bold">Fund Viz Explorer India</h1>
          </div>
          <div className="hidden md:flex items-center gap-2 bg-white/10 px-4 py-2 rounded-lg text-sm">
            <Calculator className="h-4 w-4" />
            <span>Mutual Fund Calculator</span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default CalculatorHeader;
