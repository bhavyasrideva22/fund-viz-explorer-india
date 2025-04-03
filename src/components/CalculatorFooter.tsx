
import React from 'react';
import { BadgeIndianRupee } from 'lucide-react';

const CalculatorFooter: React.FC = () => {
  return (
    <footer className="bg-brandPrimary text-white pt-12 pb-8">
      <div className="section-container">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <BadgeIndianRupee className="h-6 w-6" />
              <h3 className="text-xl font-bold">Fund Viz Explorer India</h3>
            </div>
            <p className="text-white/80 text-sm">
              Empowering Indian investors with interactive tools to make informed financial decisions and achieve their investment goals.
            </p>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">More Calculators</h3>
            <ul className="space-y-2 text-white/80">
              <li className="hover:text-brandAccent transition-colors">
                <a href="#">SIP Calculator</a>
              </li>
              <li className="hover:text-brandAccent transition-colors">
                <a href="#">Lumpsum Calculator</a>
              </li>
              <li className="hover:text-brandAccent transition-colors">
                <a href="#">Goal Planning Calculator</a>
              </li>
              <li className="hover:text-brandAccent transition-colors">
                <a href="#">Return Calculator</a>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Resources</h3>
            <ul className="space-y-2 text-white/80">
              <li className="hover:text-brandAccent transition-colors">
                <a href="#">Mutual Fund Basics</a>
              </li>
              <li className="hover:text-brandAccent transition-colors">
                <a href="#">Investment Strategies</a>
              </li>
              <li className="hover:text-brandAccent transition-colors">
                <a href="#">Tax Planning</a>
              </li>
              <li className="hover:text-brandAccent transition-colors">
                <a href="#">Financial News</a>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="mt-12 pt-6 border-t border-white/20 text-white/60 text-sm flex flex-col md:flex-row justify-between">
          <p>© 2025 Fund Viz Explorer India. All rights reserved.</p>
          <div className="flex gap-4 mt-4 md:mt-0">
            <a href="#" className="hover:text-white">Privacy Policy</a>
            <a href="#" className="hover:text-white">Terms of Use</a>
            <a href="#" className="hover:text-white">Disclaimer</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default CalculatorFooter;
