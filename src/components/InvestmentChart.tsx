
import React from 'react';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  Legend
} from 'recharts';
import { formatCurrency } from '../utils/calculatorUtils';

interface InvestmentChartProps {
  data: Array<{
    year: number;
    investmentValue: number;
    futureValue: number;
  }>;
}

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white p-4 border border-gray-200 rounded-lg shadow-md">
        <p className="font-semibold text-brandPrimary mb-2">Year {label}</p>
        <p className="text-sm text-gray-600">
          <span className="inline-block w-3 h-3 bg-brandPrimary mr-2 rounded-full"></span>
          Investment: {formatCurrency(payload[0].value)}
        </p>
        <p className="text-sm text-gray-600">
          <span className="inline-block w-3 h-3 bg-brandSecondary mr-2 rounded-full"></span>
          Future Value: {formatCurrency(payload[1].value)}
        </p>
        <p className="text-sm text-gray-600 mt-1 font-semibold">
          Returns: {formatCurrency(payload[1].value - payload[0].value)}
        </p>
      </div>
    );
  }
  return null;
};

const InvestmentChart: React.FC<InvestmentChartProps> = ({ data }) => {
  return (
    <div className="w-full h-[350px] sm:h-[400px] mt-6 calculator-card">
      <h3 className="text-lg font-semibold text-brandPrimary mb-4">Investment Growth Projection</h3>
      <ResponsiveContainer width="100%" height="90%">
        <AreaChart
          data={data}
          margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
        >
          <defs>
            <linearGradient id="investmentGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#245e4f" stopOpacity={0.1}/>
              <stop offset="95%" stopColor="#245e4f" stopOpacity={0}/>
            </linearGradient>
            <linearGradient id="futureValueGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#7ac9a7" stopOpacity={0.3}/>
              <stop offset="95%" stopColor="#7ac9a7" stopOpacity={0}/>
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
          <XAxis 
            dataKey="year" 
            label={{ 
              value: 'Years', 
              position: 'insideBottomRight', 
              offset: -10 
            }}
            tick={{ fontSize: 12 }}
          />
          <YAxis 
            tickFormatter={(value) => `₹${value.toLocaleString('en-IN')}`}
            width={80}
            tick={{ fontSize: 12 }}
          />
          <Tooltip content={<CustomTooltip />} />
          <Legend />
          <Area 
            type="monotone" 
            dataKey="investmentValue" 
            name="Investment Amount"
            stroke="#245e4f" 
            fillOpacity={1}
            fill="url(#investmentGradient)" 
            strokeWidth={2}
          />
          <Area 
            type="monotone" 
            dataKey="futureValue" 
            name="Future Value"
            stroke="#7ac9a7" 
            fillOpacity={1}
            fill="url(#futureValueGradient)" 
            strokeWidth={2}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default InvestmentChart;
