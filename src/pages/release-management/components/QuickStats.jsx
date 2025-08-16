import React from 'react';
import Icon from '../../../components/AppIcon';

const QuickStats = ({ releases }) => {
  const calculateStats = () => {
    const totalReleases = releases?.length;
    const liveReleases = releases?.filter(r => r?.status === 'live')?.length;
    const processingReleases = releases?.filter(r => r?.status === 'processing')?.length;
    const failedReleases = releases?.filter(r => r?.status === 'failed')?.length;
    const totalStreams = releases?.reduce((sum, r) => sum + r?.totalStreams, 0);
    const totalRevenue = releases?.reduce((sum, r) => sum + r?.totalRevenue, 0);
    
    // Calculate this month's releases
    const currentMonth = new Date()?.getMonth();
    const currentYear = new Date()?.getFullYear();
    const thisMonthReleases = releases?.filter(r => {
      const releaseDate = new Date(r.releaseDate);
      return releaseDate?.getMonth() === currentMonth && releaseDate?.getFullYear() === currentYear;
    })?.length;

    return {
      totalReleases,
      liveReleases,
      processingReleases,
      failedReleases,
      totalStreams,
      totalRevenue,
      thisMonthReleases
    };
  };

  const stats = calculateStats();

  const formatNumber = (num) => {
    return new Intl.NumberFormat('pt-BR')?.format(num);
  };

  const formatCompactNumber = (num) => {
    if (num >= 1000000) {
      return (num / 1000000)?.toFixed(1) + 'M';
    } else if (num >= 1000) {
      return (num / 1000)?.toFixed(1) + 'K';
    }
    return num?.toString();
  };

  const statCards = [
    {
      title: 'Total de Lançamentos',
      value: stats?.totalReleases,
      icon: 'Music',
      color: 'text-primary',
      bgColor: 'bg-primary/10'
    },
    {
      title: 'Lançamentos Ativos',
      value: stats?.liveReleases,
      icon: 'CheckCircle',
      color: 'text-success',
      bgColor: 'bg-success/10'
    },
    {
      title: 'Em Processamento',
      value: stats?.processingReleases,
      icon: 'Clock',
      color: 'text-warning',
      bgColor: 'bg-warning/10'
    },
    {
      title: 'Falharam',
      value: stats?.failedReleases,
      icon: 'AlertCircle',
      color: 'text-error',
      bgColor: 'bg-error/10'
    },
    {
      title: 'Streams Totais',
      value: formatCompactNumber(stats?.totalStreams),
      icon: 'Play',
      color: 'text-accent',
      bgColor: 'bg-accent/10'
    },
    {
      title: 'Receita Total',
      value: `R$ ${formatCompactNumber(stats?.totalRevenue)}`,
      icon: 'DollarSign',
      color: 'text-secondary',
      bgColor: 'bg-secondary/10'
    },
    {
      title: 'Este Mês',
      value: stats?.thisMonthReleases,
      icon: 'Calendar',
      color: 'text-primary',
      bgColor: 'bg-primary/10'
    }
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4 mb-6">
      {statCards?.map((stat, index) => (
        <div key={index} className="bg-card rounded-lg border border-border p-4">
          <div className="flex items-center justify-between mb-2">
            <div className={`p-2 rounded-lg ${stat?.bgColor}`}>
              <Icon name={stat?.icon} size={16} className={stat?.color} />
            </div>
          </div>
          <div className="space-y-1">
            <p className="text-2xl font-bold text-foreground">{stat?.value}</p>
            <p className="text-xs text-muted-foreground">{stat?.title}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default QuickStats;