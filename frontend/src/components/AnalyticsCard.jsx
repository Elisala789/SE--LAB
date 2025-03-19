import React from 'react';
import { ArrowDown, ArrowUp, ArrowRight } from 'lucide-react';

const AnalyticsCard = ({ 
  title, 
  value, 
  icon, 
  change, 
  description, 
  className,
  trend = [35, 60, 25, 65, 40, 75, 55, 80, 65]
}) => {
  const getChangeIcon = () => {
    if (!change) return null;
    
    switch (change.type) {
      case 'increase':
        return <ArrowUp className="w-3 h-3 text-green-500" />;
      case 'decrease':
        return <ArrowDown className="w-3 h-3 text-red-500" />;
      case 'neutral':
        return <ArrowRight className="w-3 h-3 text-yellow-500" />;
      default:
        return null;
    }
  };
  
  const getChangeColor = () => {
    if (!change) return '';
    
    switch (change.type) {
      case 'increase':
        return 'text-green-500';
      case 'decrease':
        return 'text-red-500';
      case 'neutral':
        return 'text-yellow-500';
      default:
        return '';
    }
  };

  const width = 80;
  const height = 24;
  const maxValue = Math.max(...trend);
  const minValue = Math.min(...trend);
  const range = maxValue - minValue;
  
  const points = trend.map((point, index) => {
    const x = (index / (trend.length - 1)) * width;
    const y = height - ((point - minValue) / range) * height;
    return ${x},${y};
  }).join(' ');

  return (
    <div className={p-6 rounded-xl subtle-border bg-card card-hover animate-scale-in ${className}}>
      <div className="flex items-start justify-between mb-4">
        <div className="p-2 rounded-lg bg-primary/10">
          {icon}
        </div>
        
        <svg width={width} height={height} className="text-primary/50">
          <polyline
            points={points}
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
      
      <div className="space-y-1">
        <div className="text-sm font-medium text-muted-foreground">{title}</div>
        <div className="text-2xl font-semibold">{value}</div>
        
        {change && (
          <div className="flex items-center gap-1 text-xs">
            <div className={flex items-center ${getChangeColor()}}>
              {getChangeIcon()}
              <span className="ml-1">{Math.abs(change.value)}%</span>
            </div>
            <span className="text-muted-foreground">vs last period</span>
          </div>
        )}
        
        {description && (
          <p className="text-sm text-muted-foreground mt-2">{description}</p>
        )}
      </div>
    </div>
  );
};

export default AnalyticsCard;
