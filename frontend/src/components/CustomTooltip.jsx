import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { cn } from '@/lib/utils';

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-card p-3 rounded-lg shadow-elevated border border-border/60 text-sm">
        <p className="font-medium">{label}</p>
        <p className="text-primary font-semibold mt-1">
          {payload[0].value?.toLocaleString()}
        </p>
      </div>
    );
  }
  return null;
};

const Chart = ({ data, title, description, xKey, yKey, className }) => {
  return (
    <div className={cn("p-6 rounded-xl subtle-border bg-card space-y-4 animate-scale-in", className)}>
      <div>
        <h3 className="text-lg font-medium">{title}</h3>
        {description && <p className="text-sm text-muted-foreground mt-1">{description}</p>}
      </div>
      
      <div className="h-64 mt-4">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={data}
            margin={{ top: 5, right: 5, left: 5, bottom: 5 }}
          >
            <defs>
              <linearGradient id="colorBar" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="currentColor" stopOpacity={0.8} />
                <stop offset="95%" stopColor="currentColor" stopOpacity={0.2} />
              </linearGradient>
            </defs>
            <XAxis 
              dataKey={xKey} 
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 12 }}
              dy={10}
            />
            <YAxis 
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 12 }}
              dx={-10}
            />
            <Tooltip content={<CustomTooltip />} cursor={{ fill: 'transparent' }} />
            <Bar 
              dataKey={yKey} 
              fill="url(#colorBar)" 
              className="text-primary"
              radius={[4, 4, 0, 0]}
              animationDuration={1000}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default Chart;
