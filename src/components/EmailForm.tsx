
import React, { useState } from 'react';
import { toast } from 'sonner';
import { Mail } from 'lucide-react';
import { CalculationResult, getPDFBlob } from '../utils/pdfGenerator';

interface EmailFormProps {
  calculationResult: CalculationResult | null;
}

const EmailForm: React.FC<EmailFormProps> = ({ calculationResult }) => {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!calculationResult) {
      toast.error('Please complete a calculation first');
      return;
    }
    
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      toast.error('Please enter a valid email address');
      return;
    }
    
    setIsSubmitting(true);
    
    // In a real application, you would send the email through a backend service
    // For now, we'll simulate the email sending
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      toast.success('Calculation report sent to your email!');
      setEmail('');
      setIsOpen(false);
    } catch (error) {
      toast.error('Failed to send email. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div>
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 btn-outline"
        disabled={!calculationResult}
      >
        <Mail className="h-5 w-5" />
        <span>Email Results</span>
      </button>
      
      {isOpen && (
        <div className="mt-4 calculator-card">
          <h3 className="text-lg font-semibold text-brandPrimary mb-3">Send Calculation Report</h3>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                Email Address
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
                className="input-field"
                required
              />
            </div>
            <button 
              type="submit" 
              className="btn-primary w-full flex justify-center items-center gap-2"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Sending...
                </>
              ) : (
                <>
                  <Mail className="h-5 w-5" />
                  Send Report
                </>
              )}
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default EmailForm;
