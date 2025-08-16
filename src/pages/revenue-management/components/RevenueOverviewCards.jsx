import React from 'react';
import Icon from '../../../components/AppIcon';

const RevenueOverviewCards = () => {
  const overviewData = [
    {
      id: 1,
      title: "Total Earnings",
      amount: "R$ 45.892,50",
      change: "+12.5%",
      changeType: "increase",
      icon: "DollarSign",
      description: "Total revenue from all platforms"
    },
    {
      id: 2,
      title: "Pending Payments",
      amount: "R$ 8.234,75",
      change: "+5.2%",
      changeType: "increase",
      icon: "Clock",
      description: "Awaiting platform payouts"
    },
    {
      id: 3,
      title: "Available for Withdrawal",
      amount: "R$ 12.567,25",
      change: "-2.1%",
      changeType: "decrease",
      icon: "Wallet",
      description: "Ready to withdraw"
    },
    {
      id: 4,
      title: "This Month",
      amount: "R$ 6.789,00",
      change: "+18.7%",
      changeType: "increase",
      icon: "TrendingUp",
      description: "Current month earnings"
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {overviewData?.map((item) => (
        <div key={item?.id} className="bg-card border border-border rounded-lg p-6 hover:shadow-lg transition-shadow duration-200">
          <div className="flex items-center justify-between mb-4">
            <div className={`p-3 rounded-lg ${
              item?.changeType === 'increase' ? 'bg-success/10' : 'bg-warning/10'
            }`}>
              <Icon 
                name={item?.icon} 
                size={24} 
                color={item?.changeType === 'increase' ? 'var(--color-success)' : 'var(--color-warning)'} 
              />
            </div>
            <div className={`flex items-center space-x-1 text-sm font-medium ${
              item?.changeType === 'increase' ? 'text-success' : 'text-warning'
            }`}>
              <Icon 
                name={item?.changeType === 'increase' ? 'ArrowUp' : 'ArrowDown'} 
                size={16} 
              />
              <span>{item?.change}</span>
            </div>
          </div>
          
          <div className="space-y-2">
            <h3 className="text-sm font-medium text-muted-foreground">{item?.title}</h3>
            <p className="text-2xl font-bold text-foreground">{item?.amount}</p>
            <p className="text-xs text-muted-foreground">{item?.description}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default RevenueOverviewCards;