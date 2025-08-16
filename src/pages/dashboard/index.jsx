import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Header from '../../components/ui/Header';
import MetricCard from './components/MetricCard';
import RevenueChart from './components/RevenueChart';
import RecentReleases from './components/RecentReleases';
import QuickActions from './components/QuickActions';
import ActivityFeed from './components/ActivityFeed';
import PendingTasks from './components/PendingTasks';
import Button from '../../components/ui/Button';
import Icon from '../../components/AppIcon';

const Dashboard = () => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [greeting, setGreeting] = useState('');

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000); // Update every minute

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const hour = currentTime?.getHours();
    if (hour < 12) {
      setGreeting('Bom dia');
    } else if (hour < 18) {
      setGreeting('Boa tarde');
    } else {
      setGreeting('Boa noite');
    }
  }, [currentTime]);

  const metrics = [
    {
      title: "Total de Streams",
      value: "1.2M",
      change: "+12.5%",
      changeType: "positive",
      icon: "Play",
      color: "primary"
    },
    {
      title: "Receita Este Mês",
      value: "R$ 8.450,00",
      change: "+8.2%",
      changeType: "positive",
      icon: "DollarSign",
      color: "success"
    },
    {
      title: "Lançamentos Ativos",
      value: "24",
      change: "+3",
      changeType: "positive",
      icon: "Music",
      color: "secondary"
    },
    {
      title: "Plataformas Conectadas",
      value: "12",
      change: "Estável",
      changeType: "neutral",
      icon: "Globe",
      color: "warning"
    }
  ];

  const formatTime = (date) => {
    return date?.toLocaleTimeString('pt-BR', { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  const formatDate = (date) => {
    return date?.toLocaleDateString('pt-BR', { 
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Welcome Section */}
          <div className="mb-8">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h1 className="text-3xl font-bold text-foreground mb-2">
                  {greeting}, João! 👋
                </h1>
                <p className="text-muted-foreground">
                  {formatDate(currentTime)} • {formatTime(currentTime)}
                </p>
              </div>
              <div className="mt-4 sm:mt-0 flex items-center space-x-3">
                <Link to="/music-upload">
                  <Button iconName="Upload" iconPosition="left">
                    Novo Lançamento
                  </Button>
                </Link>
                <Button variant="outline" iconName="Bell" />
              </div>
            </div>
          </div>

          {/* Metrics Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {metrics?.map((metric, index) => (
              <MetricCard
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

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
            {/* Revenue Chart - Takes 2 columns on large screens */}
            <div className="lg:col-span-2">
              <RevenueChart />
            </div>

            {/* Quick Actions - Takes 1 column */}
            <div>
              <QuickActions />
            </div>
          </div>

          {/* Secondary Content Grid */}
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-8 mb-8">
            {/* Recent Releases - Takes 2 columns on extra large screens */}
            <div className="xl:col-span-2">
              <RecentReleases />
            </div>

            {/* Right Sidebar - Takes 1 column */}
            <div className="space-y-8">
              <PendingTasks />
              <ActivityFeed />
            </div>
          </div>

          {/* Platform Status Section */}
          <div className="bg-card border border-border rounded-lg p-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-xl font-semibold text-foreground mb-1">Status das Plataformas</h2>
                <p className="text-sm text-muted-foreground">Conectividade com serviços de streaming</p>
              </div>
              <Button variant="outline" size="sm" iconName="RefreshCw" iconPosition="left">
                Atualizar
              </Button>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
              {[
                { name: 'Spotify', status: 'connected', icon: 'Music' },
                { name: 'Apple Music', status: 'connected', icon: 'Music' },
                { name: 'YouTube Music', status: 'connected', icon: 'Play' },
                { name: 'Deezer', status: 'connected', icon: 'Music' },
                { name: 'TikTok', status: 'processing', icon: 'Video' },
                { name: 'Amazon Music', status: 'error', icon: 'Music' }
              ]?.map((platform) => (
                <div key={platform?.name} className="flex flex-col items-center p-4 rounded-lg border border-border hover:border-primary/50 transition-colors">
                  <div className={`p-3 rounded-lg mb-3 ${
                    platform?.status === 'connected' ? 'bg-success/10 text-success' :
                    platform?.status === 'processing'? 'bg-warning/10 text-warning' : 'bg-error/10 text-error'
                  }`}>
                    <Icon name={platform?.icon} size={20} />
                  </div>
                  <h3 className="font-medium text-foreground text-sm text-center mb-2">
                    {platform?.name}
                  </h3>
                  <div className={`flex items-center space-x-1 ${
                    platform?.status === 'connected' ? 'text-success' :
                    platform?.status === 'processing'? 'text-warning' : 'text-error'
                  }`}>
                    <Icon 
                      name={
                        platform?.status === 'connected' ? 'CheckCircle' :
                        platform?.status === 'processing'? 'Clock' : 'XCircle'
                      } 
                      size={12} 
                    />
                    <span className="text-xs font-medium">
                      {platform?.status === 'connected' ? 'Conectado' :
                       platform?.status === 'processing' ? 'Processando' :
                       'Erro'}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;