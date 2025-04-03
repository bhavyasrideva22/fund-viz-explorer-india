
import React from 'react';
import CalculatorHeader from '../components/CalculatorHeader';
import MutualFundCalculator from '../components/MutualFundCalculator';
import ExplanationSection from '../components/ExplanationSection';
import CalculatorFooter from '../components/CalculatorFooter';

const Index: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col bg-brandBackground">
      <CalculatorHeader />
      
      <main className="flex-grow py-10">
        <div className="section-container">
          <div className="text-center mb-10 mx-auto max-w-3xl">
            <h1 className="heading-primary mb-4">Mutual Fund Calculator</h1>
            <p className="text-gray-600 text-lg">
              Plan your investment journey with our interactive calculator. 
              Visualize your wealth growth and make informed decisions for a secure financial future.
            </p>
          </div>
        </div>
        
        <MutualFundCalculator />
        <ExplanationSection />
      </main>
      
      <CalculatorFooter />
    </div>
  );
};

export default Index;
