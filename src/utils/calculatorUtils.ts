
/**
 * Utility functions for mutual fund calculator
 */

/**
 * Format a number as Indian Rupees
 */
export const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(amount);
};

/**
 * Calculate future value of SIP investments
 */
export const calculateSIP = (
  monthlyInvestment: number,
  years: number,
  expectedReturn: number
): number => {
  const monthlyRate = expectedReturn / 12 / 100;
  const months = years * 12;
  
  // FV of SIP = P × ((1 + r)^n - 1) / r) × (1 + r)
  const futureValue = 
    monthlyInvestment * 
    (((Math.pow(1 + monthlyRate, months) - 1) / monthlyRate) * 
    (1 + monthlyRate));
  
  return Math.round(futureValue);
};

/**
 * Calculate future value of lump sum investment
 */
export const calculateLumpSum = (
  investment: number,
  years: number,
  expectedReturn: number
): number => {
  // FV = PV(1 + r)^n
  const futureValue = investment * Math.pow(1 + expectedReturn / 100, years);
  
  return Math.round(futureValue);
};

/**
 * Calculate total investment amount
 */
export const calculateTotalInvestment = (
  monthlyInvestment: number,
  years: number
): number => {
  return monthlyInvestment * years * 12;
};

/**
 * Calculate expected returns
 */
export const calculateReturns = (
  futureValue: number,
  totalInvestment: number
): number => {
  return futureValue - totalInvestment;
};

/**
 * Generate yearly growth data for charts
 */
export const generateYearlyData = (
  monthlyInvestment: number,
  years: number,
  expectedReturn: number
): Array<{year: number; investmentValue: number; futureValue: number}> => {
  const yearlyData = [];
  let investmentValue = 0;
  
  for (let year = 1; year <= years; year++) {
    investmentValue = monthlyInvestment * year * 12;
    const futureValue = calculateSIP(monthlyInvestment, year, expectedReturn);
    
    yearlyData.push({
      year,
      investmentValue,
      futureValue
    });
  }
  
  return yearlyData;
};

/**
 * Calculate SIP amount needed for target amount
 */
export const calculateSIPforTarget = (
  targetAmount: number,
  years: number,
  expectedReturn: number
): number => {
  const monthlyRate = expectedReturn / 12 / 100;
  const months = years * 12;
  
  // Monthly SIP = Target Amount / (((1 + r)^n - 1) / r) × (1 + r)
  const monthlyInvestment = 
    targetAmount / 
    (((Math.pow(1 + monthlyRate, months) - 1) / monthlyRate) * 
    (1 + monthlyRate));
  
  return Math.round(monthlyInvestment);
};
