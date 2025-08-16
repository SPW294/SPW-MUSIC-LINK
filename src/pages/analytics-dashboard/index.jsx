import React, { useState, useEffect } from 'react';
import Header from '../../components/ui/Header';
import MetricsCard from './components/MetricsCard';
import FilterBar from './components/FilterBar';
import StreamingChart from './components/StreamingChart';
import GeographicMap from './components/GeographicMap';
import PlatformComparison from './components/PlatformComparison';
import DemographicsChart from './components/DemographicsChart';
import PerformanceTable from './components/PerformanceTable';
import AIRecommendations from './components/AIRecommendations';
import Icon from '../../components/AppIcon';

const AnalyticsDashboard = () => {
  const [filters, setFilters] = useState({
    dateRange: '30d',
    platform: 'all',
    track: 'all'
  });
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [lastUpdated, setLastUpdated] = useState('16/08/2024 10:17');

  useEffect(() => {
    // Set page title
    document.title = 'Analytics Dashboard - SPW Music Link';
  }, []);

  const handleFiltersChange = (newFilters) => {
    setFilters(newFilters);
    // In a real app, this would trigger data refetch
    console.log('Filters changed:', newFilters);
  };

  const handleRefresh = async () => {
    setIsRefreshing(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    setLastUpdated(new Date()?.toLocaleString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }));
    setIsRefreshing(false);
  };

  const handleExport = () => {
    // Simulate export functionality
    const exportData = {
      filters,
      timestamp: new Date()?.toISOString(),
      type: 'analytics_report'
    };
    
    const blob = new Blob([JSON.stringify(exportData, null, 2)], {
      type: 'application/json'
    });
    
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `analytics_report_${new Date()?.toISOString()?.split('T')?.[0]}.json`;
    document.body?.appendChild(a);
    a?.click();
    document.body?.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const metricsData = [
    {
      title: 'Total de Streams',
      value: '2.8M',
      change: '+12.5%',
      changeType: 'positive',
      icon: 'Play',
      color: 'primary'
    },
    {
      title: 'Ouvintes Únicos',
      value: '453K',
      change: '+8.7%',
      changeType: 'positive',
      icon: 'Users',
      color: 'success'
    },
    {
      title: 'Receita Gerada',
      value: 'R$ 48.2K',
      change: '+15.3%',
      changeType: 'positive',
      icon: 'DollarSign',
      color: 'warning'
    },
    {
      title: 'Taxa de Crescimento',
      value: '9.2%',
      change: '+2.1%',
      changeType: 'positive',
      icon: 'TrendingUp',
      color: 'accent'
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Page Header */}
          <div className="mb-8">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold text-foreground">Analytics Dashboard</h1>
                <p className="text-muted-foreground mt-2">
                  Acompanhe o desempenho das suas músicas em tempo real
                </p>
              </div>
              
              <div className="flex items-center space-x-2">
                {isRefreshing && (
                  <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                    <Icon name="RefreshCw" size={16} className="animate-spin" />
                    <span>Atualizando...</span>
                  </div>
                )}
                <div className="text-sm text-muted-foreground">
                  Última atualização: {lastUpdated}
                </div>
              </div>
            </div>
          </div>

          {/* Filter Bar */}
          <FilterBar
            onFiltersChange={handleFiltersChange}
            onExport={handleExport}
            onRefresh={handleRefresh}
            lastUpdated={lastUpdated}
          />

          {/* Key Metrics Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {metricsData?.map((metric, index) => (
              <MetricsCard
                key={index}
                title={metric?.title}
                value={metric?.value}
                change={metric?.change}
                changeType={metric?.changeType}
                icon={metric?.icon}
                color={metric?.color}
              />
            ))}
          </div>

          {/* Charts Section */}
          <div className="grid lg:grid-cols-3 gap-6 mb-8">
            {/* Streaming Trends Chart - Takes 2 columns */}
            <div className="lg:col-span-2">
              <StreamingChart data={[]} />
            </div>
            
            {/* Geographic Performance */}
            <div className="lg:col-span-1">
              <GeographicMap />
            </div>
          </div>

          {/* Platform Comparison */}
          <div className="mb-8">
            <PlatformComparison />
          </div>

          {/* Demographics and AI Recommendations */}
          <div className="grid lg:grid-cols-2 gap-6 mb-8">
            <DemographicsChart />
            <AIRecommendations />
          </div>

          {/* Performance Table */}
          <div className="mb-8">
            <PerformanceTable />
          </div>

          {/* Footer Info */}
          <div className="mt-12 p-6 bg-muted/20 border border-border rounded-lg">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Icon name="Info" size={20} className="text-primary" />
                <div>
                  <h4 className="font-medium text-foreground">Sobre os Dados</h4>
                  <p className="text-sm text-muted-foreground">
                    Os dados são atualizados a cada 15 minutos e incluem informações de todas as plataformas conectadas.
                  </p>
                </div>
              </div>
              <div className="text-right">
                <div className="text-sm text-muted-foreground">Próxima atualização</div>
                <div className="font-medium text-foreground">10:32</div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AnalyticsDashboard;