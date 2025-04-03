
import React, { useState, useEffect } from 'react';
import { 
  Calculator, 
  Download, 
  ArrowRight, 
  ChartBar,
  Calendar 
} from 'lucide-react';
import { 
  calculateSIP, 
  calculateLumpSum, 
  calculateTotalInvestment,
  calculateReturns,
  generateYearlyData,
  formatCurrency
} from '../utils/calculatorUtils';
import { downloadPDF, CalculationResult } from '../utils/pdfGenerator';
import InvestmentChart from './InvestmentChart';
import EmailForm from './EmailForm';
import { toast } from 'sonner';

type InvestmentType = 'sip' | 'lumpsum';

const MutualFundCalculator: React.FC = () => {
  // Form state
  const [investmentType, setInvestmentType] = useState<InvestmentType>('sip');
  const [monthlyInvestment, setMonthlyInvestment] = useState<number>(5000);
  const [lumpsum, setLumpsum] = useState<number>(100000);
  const [years, setYears] = useState<number>(10);
  const [expectedReturn, setExpectedReturn] = useState<number>(12);
  
  // Results state
  const [futureValue, setFutureValue] = useState<number>(0);
  const [totalInvestment, setTotalInvestment] = useState<number>(0);
  const [totalReturns, setTotalReturns] = useState<number>(0);
  const [yearlyData, setYearlyData] = useState<Array<any>>([]);
  const [hasCalculated, setHasCalculated] = useState<boolean>(false);
  const [calculationResult, setCalculationResult] = useState<CalculationResult | null>(null);
  
  // Handle calculation
  const handleCalculate = () => {
    let calculatedFutureValue = 0;
    let calculatedTotalInvestment = 0;
    
    if (investmentType === 'sip') {
      calculatedFutureValue = calculateSIP(monthlyInvestment, years, expectedReturn);
      calculatedTotalInvestment = calculateTotalInvestment(monthlyInvestment, years);
      setYearlyData(generateYearlyData(monthlyInvestment, years, expectedReturn));
    } else {
      calculatedFutureValue = calculateLumpSum(lumpsum, years, expectedReturn);
      calculatedTotalInvestment = lumpsum;
      
      // Generate yearly data for lumpsum
      const lumpYearlyData = [];
      for (let year = 1; year <= years; year++) {
        const yearFutureValue = calculateLumpSum(lumpsum, year, expectedReturn);
        lumpYearlyData.push({
          year,
          investmentValue: lumpsum,
          futureValue: yearFutureValue
        });
      }
      setYearlyData(lumpYearlyData);
    }
    
    const calculatedReturns = calculateReturns(calculatedFutureValue, calculatedTotalInvestment);
    
    setFutureValue(calculatedFutureValue);
    setTotalInvestment(calculatedTotalInvestment);
    setTotalReturns(calculatedReturns);
    setHasCalculated(true);
    
    // Create calculation result for PDF and email
    setCalculationResult({
      investmentType: investmentType === 'sip' ? 'SIP (Monthly)' : 'Lump Sum',
      monthlyInvestment: investmentType === 'sip' ? monthlyInvestment : 0,
      investmentAmount: calculatedTotalInvestment,
      years,
      expectedReturn,
      futureValue: calculatedFutureValue,
      totalReturns: calculatedReturns,
      calculationDate: new Date()
    });
    
    toast.success('Calculation completed successfully!');
  };
  
  // Handle download
  const handleDownload = () => {
    if (calculationResult) {
      downloadPDF(calculationResult);
      toast.success('PDF report downloaded successfully!');
    }
  };
  
  // Calculate on initial load
  useEffect(() => {
    handleCalculate();
  }, []);
  
  return (
    <div className="section-container">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Input Panel */}
        <div className="lg:col-span-1">
          <div className="calculator-card">
            <div className="flex items-center gap-2 mb-6">
              <Calculator className="h-5 w-5 text-brandPrimary" />
              <h2 className="text-xl font-semibold text-brandPrimary">Mutual Fund Calculator</h2>
            </div>
            
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Investment Type
              </label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  className={`py-3 px-4 rounded-lg border-2 transition-all flex items-center justify-center gap-2 ${
                    investmentType === 'sip'
                      ? 'bg-brandPrimary text-white border-brandPrimary'
                      : 'bg-white text-gray-700 border-gray-200 hover:border-brandPrimary/50'
                  }`}
                  onClick={() => setInvestmentType('sip')}
                >
                  <Calendar className="h-4 w-4" />
                  <span>SIP (Monthly)</span>
                </button>
                <button
                  type="button"
                  className={`py-3 px-4 rounded-lg border-2 transition-all flex items-center justify-center gap-2 ${
                    investmentType === 'lumpsum'
                      ? 'bg-brandPrimary text-white border-brandPrimary'
                      : 'bg-white text-gray-700 border-gray-200 hover:border-brandPrimary/50'
                  }`}
                  onClick={() => setInvestmentType('lumpsum')}
                >
                  <ChartBar className="h-4 w-4" />
                  <span>Lump Sum</span>
                </button>
              </div>
            </div>
            
            {investmentType === 'sip' ? (
              <div className="mb-6">
                <label htmlFor="monthlyInvestment" className="block text-sm font-medium text-gray-700 mb-1">
                  Monthly Investment (₹)
                </label>
                <input
                  type="number"
                  id="monthlyInvestment"
                  value={monthlyInvestment}
                  onChange={(e) => setMonthlyInvestment(Math.max(0, Number(e.target.value)))}
                  className="input-field"
                  min="500"
                  step="500"
                />
                <div className="mt-2 flex justify-between">
                  <span className="text-xs text-gray-500">Min: ₹500</span>
                  <span className="text-xs text-gray-500">Max: ₹1,00,000</span>
                </div>
                <input
                  type="range"
                  min="500"
                  max="100000"
                  step="500"
                  value={monthlyInvestment}
                  onChange={(e) => setMonthlyInvestment(Number(e.target.value))}
                  className="w-full mt-2 accent-brandPrimary"
                />
              </div>
            ) : (
              <div className="mb-6">
                <label htmlFor="lumpsum" className="block text-sm font-medium text-gray-700 mb-1">
                  Lump Sum Amount (₹)
                </label>
                <input
                  type="number"
                  id="lumpsum"
                  value={lumpsum}
                  onChange={(e) => setLumpsum(Math.max(0, Number(e.target.value)))}
                  className="input-field"
                  min="1000"
                  step="1000"
                />
                <div className="mt-2 flex justify-between">
                  <span className="text-xs text-gray-500">Min: ₹1,000</span>
                  <span className="text-xs text-gray-500">Max: ₹1,00,00,000</span>
                </div>
                <input
                  type="range"
                  min="1000"
                  max="10000000"
                  step="1000"
                  value={lumpsum}
                  onChange={(e) => setLumpsum(Number(e.target.value))}
                  className="w-full mt-2 accent-brandPrimary"
                />
              </div>
            )}
            
            <div className="mb-6">
              <label htmlFor="years" className="block text-sm font-medium text-gray-700 mb-1">
                Investment Period (Years)
              </label>
              <input
                type="number"
                id="years"
                value={years}
                onChange={(e) => setYears(Math.max(1, Math.min(30, Number(e.target.value))))}
                className="input-field"
                min="1"
                max="30"
              />
              <div className="mt-2 flex justify-between">
                <span className="text-xs text-gray-500">Min: 1 year</span>
                <span className="text-xs text-gray-500">Max: 30 years</span>
              </div>
              <input
                type="range"
                min="1"
                max="30"
                value={years}
                onChange={(e) => setYears(Number(e.target.value))}
                className="w-full mt-2 accent-brandPrimary"
              />
            </div>
            
            <div className="mb-6">
              <label htmlFor="expectedReturn" className="block text-sm font-medium text-gray-700 mb-1">
                Expected Annual Return (%)
              </label>
              <input
                type="number"
                id="expectedReturn"
                value={expectedReturn}
                onChange={(e) => setExpectedReturn(Math.max(1, Math.min(30, Number(e.target.value))))}
                className="input-field"
                min="1"
                max="30"
                step="0.5"
              />
              <div className="mt-2 flex justify-between">
                <span className="text-xs text-gray-500">Conservative: 8%</span>
                <span className="text-xs text-gray-500">Aggressive: 15%</span>
              </div>
              <input
                type="range"
                min="5"
                max="20"
                step="0.5"
                value={expectedReturn}
                onChange={(e) => setExpectedReturn(Number(e.target.value))}
                className="w-full mt-2 accent-brandPrimary"
              />
            </div>
            
            <button
              type="button"
              onClick={handleCalculate}
              className="btn-primary w-full flex items-center justify-center gap-2"
            >
              <Calculator className="h-5 w-5" />
              <span>Calculate</span>
              <ArrowRight className="h-5 w-5" />
            </button>
          </div>
          
          {/* Download and Email Panel */}
          <div className="calculator-card mt-6">
            <h3 className="text-lg font-semibold text-brandPrimary mb-4">Share Your Results</h3>
            <div className="flex flex-col sm:flex-row gap-3">
              <button 
                onClick={handleDownload}
                className="flex items-center gap-2 btn-accent"
                disabled={!hasCalculated}
              >
                <Download className="h-5 w-5" />
                <span>Download PDF</span>
              </button>
              
              <EmailForm calculationResult={calculationResult} />
            </div>
          </div>
        </div>
        
        {/* Results and Chart Panel */}
        <div className="lg:col-span-2">
          <div className="calculator-card mb-6">
            <h3 className="text-lg font-semibold text-brandPrimary mb-6">Investment Summary</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-brandBackground rounded-lg p-4 text-center">
                <p className="text-sm text-gray-600 mb-1">Total Investment</p>
                <p className="text-2xl font-bold text-brandPrimary">
                  {formatCurrency(totalInvestment)}
                </p>
              </div>
              
              <div className="bg-brandBackground rounded-lg p-4 text-center">
                <p className="text-sm text-gray-600 mb-1">Estimated Returns</p>
                <p className="text-2xl font-bold text-brandSecondary">
                  {formatCurrency(totalReturns)}
                </p>
              </div>
              
              <div className="bg-brandBackground rounded-lg p-4 text-center">
                <p className="text-sm text-gray-600 mb-1">Future Value</p>
                <p className="text-2xl font-bold text-brandAccent">
                  {formatCurrency(futureValue)}
                </p>
              </div>
            </div>
            
            <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-brandBackground rounded-lg p-4">
                <p className="text-sm text-gray-600 mb-1">Investment Strategy</p>
                <p className="font-semibold">
                  {investmentType === 'sip' 
                    ? `Monthly SIP of ${formatCurrency(monthlyInvestment)}`
                    : `One-time investment of ${formatCurrency(lumpsum)}`
                  }
                </p>
              </div>
              
              <div className="bg-brandBackground rounded-lg p-4">
                <p className="text-sm text-gray-600 mb-1">Returns to Investment Ratio</p>
                <p className="font-semibold">
                  {((totalReturns / totalInvestment) * 100).toFixed(2)}%
                </p>
              </div>
            </div>
          </div>
          
          {/* Chart */}
          <InvestmentChart data={yearlyData} />
        </div>
      </div>
    </div>
  );
};

export default MutualFundCalculator;
