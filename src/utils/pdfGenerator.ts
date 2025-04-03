
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import { formatCurrency } from './calculatorUtils';

// Define types for TypeScript
declare module 'jspdf' {
  interface jsPDF {
    autoTable: (options: any) => jsPDF;
  }
}

// Define the calculation result type
export interface CalculationResult {
  investmentType: string;
  monthlyInvestment: number;
  investmentAmount: number;
  years: number;
  expectedReturn: number;
  futureValue: number;
  totalReturns: number;
  calculationDate: Date;
}

/**
 * Generate a PDF report for mutual fund calculations
 */
export const generatePDF = (result: CalculationResult): jsPDF => {
  // Create new PDF document
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4',
  });
  
  // Add header with branding
  doc.setFillColor(36, 94, 79); // #245e4f (brandPrimary)
  doc.rect(0, 0, 210, 30, 'F');
  
  // Add header text
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(20);
  doc.setFont('helvetica', 'bold');
  doc.text('Mutual Fund Calculator Report', 105, 15, { align: 'center' });
  
  // Add date
  doc.setTextColor(51, 51, 51);
  doc.setFontSize(10);
  doc.setFont('helvetica', 'normal');
  doc.text(
    `Generated on: ${result.calculationDate.toLocaleDateString('en-IN')}`,
    20, 
    40
  );
  
  // Summary section
  doc.setFontSize(16);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(36, 94, 79);
  doc.text('Investment Summary', 20, 50);
  
  // Investment details table
  const tableColumn = ['Parameter', 'Value'];
  const tableRows = [
    ['Investment Type', result.investmentType],
    ['Monthly Investment', formatCurrency(result.monthlyInvestment)],
    ['Investment Period', `${result.years} years`],
    ['Expected Return Rate', `${result.expectedReturn}% p.a.`],
    ['Total Investment Amount', formatCurrency(result.investmentAmount)],
    ['Expected Future Value', formatCurrency(result.futureValue)],
    ['Total Expected Returns', formatCurrency(result.totalReturns)],
    ['Returns to Investment Ratio', `${((result.totalReturns / result.investmentAmount) * 100).toFixed(2)}%`],
  ];
  
  // Add table to document
  doc.autoTable({
    head: [tableColumn],
    body: tableRows,
    startY: 55,
    theme: 'grid',
    styles: { 
      fontSize: 10,
      cellPadding: 5,
    },
    headStyles: { 
      fillColor: [122, 201, 167], // #7ac9a7 (brandSecondary)
      textColor: [36, 94, 79],
      fontStyle: 'bold',
    },
    alternateRowStyles: {
      fillColor: [248, 248, 248], // #f8f8f8 (brandBackground)
    },
  });
  
  // Add disclaimer
  doc.setFontSize(9);
  doc.setFont('helvetica', 'italic');
  doc.setTextColor(100, 100, 100);
  const disclaimer = 
    'Disclaimer: This calculation is based on the information provided and assumes ' +
    'a constant rate of return. Actual returns may vary and past performance is not ' +
    'indicative of future results. This is not investment advice. Please consult with ' +
    'a financial advisor before making investment decisions.';
  
  const splitDisclaimer = doc.splitTextToSize(disclaimer, 170);
  doc.text(splitDisclaimer, 20, 260);
  
  // Add footer with branding
  doc.setFillColor(36, 94, 79);
  doc.rect(0, 280, 210, 17, 'F');
  
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(10);
  doc.setFont('helvetica', 'normal');
  doc.text('www.fund-viz-explorer-india.com', 105, 288, { align: 'center' });
  
  return doc;
};

/**
 * Generate and download PDF report
 */
export const downloadPDF = (result: CalculationResult): void => {
  const doc = generatePDF(result);
  doc.save('mutual-fund-calculation-report.pdf');
};

/**
 * Generate PDF for email attachment
 */
export const getPDFBlob = async (result: CalculationResult): Promise<Blob> => {
  const doc = generatePDF(result);
  return doc.output('blob');
};
