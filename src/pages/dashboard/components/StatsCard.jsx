import React from 'react';
import Icon from '../../../components/AppIcon';

const StatsCard = ({ icon, label, value, trend, trendValue }) => {
  const isPositive = trend === 'up';
  
  return (
    <div className="bg-card rounded-xl shadow-sm border border-border p-4 md:p-5 lg:p-6">
      <div className="flex items-start justify-between mb-4">
        <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
          <Icon name={icon} size={24} color="var(--color-primary)" />
        </div>
        
        {trend && (
          <div className={`flex items-center gap-1 px-2 py-1 rounded-full text-xs font-caption font-medium ${
            isPositive 
              ? 'bg-success/10 text-success' :'bg-destructive/10 text-destructive'
          }`}>
            <Icon 
              name={isPositive ? 'TrendingUp' : 'TrendingDown'} 
              size={14} 
            />
            <span>{trendValue}</span>
          </div>
        )}
      </div>

      <div>
        <p className="text-sm md:text-base text-muted-foreground mb-1 font-caption">
          {label}
        </p>
        <p className="text-2xl md:text-3xl lg:text-4xl font-heading font-semibold text-foreground">
          {value}
        </p>
      </div>
    </div>
  );
};

export default StatsCard;
