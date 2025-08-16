import React, { useState } from 'react';
import Header from '../../components/ui/Header';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import RevenueOverviewCards from './components/RevenueOverviewCards';
import EarningsBreakdownTable from './components/EarningsBreakdownTable';
import RoyaltyDistribution from './components/RoyaltyDistribution';
import PaymentProcessing from './components/PaymentProcessing';
import RevenueChart from './components/RevenueChart';
import TaxDocuments from './components/TaxDocuments';

const RevenueManagement = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [showNotifications, setShowNotifications] = useState(false);

  const tabs = [
    { id: 'overview', label: 'Visão Geral', icon: 'BarChart3' },
    { id: 'earnings', label: 'Ganhos', icon: 'DollarSign' },
    { id: 'royalties', label: 'Royalties', icon: 'Users' },
    { id: 'payments', label: 'Pagamentos', icon: 'CreditCard' },
    { id: 'taxes', label: 'Documentos Fiscais', icon: 'FileText' }
  ];

  const notifications = [
    {
      id: 1,
      type: 'payment',
      title: 'Novo pagamento disponível',
      message: 'R$ 892,50 do Spotify está disponível para saque',
      time: '2 horas atrás',
      read: false
    },
    {
      id: 2,
      type: 'milestone',
      title: 'Meta de receita atingida',
      message: 'Você ultrapassou R$ 45.000 em ganhos totais!',
      time: '1 dia atrás',
      read: false
    },
    {
      id: 3,
      type: 'tax',
      title: 'Documento fiscal gerado',
      message: 'Comprovante de retenção de agosto disponível',
      time: '3 dias atrás',
      read: true
    }
  ];

  const getNotificationIcon = (type) => {
    const icons = {
      payment: 'DollarSign',
      milestone: 'Trophy',
      tax: 'FileText'
    };
    return icons?.[type] || 'Bell';
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'overview':
        return (
          <div className="space-y-8">
            <RevenueOverviewCards />
            <RevenueChart />
          </div>
        );
      case 'earnings':
        return <EarningsBreakdownTable />;
      case 'royalties':
        return <RoyaltyDistribution />;
      case 'payments':
        return <PaymentProcessing />;
      case 'taxes':
        return <TaxDocuments />;
      default:
        return (
          <div className="space-y-8">
            <RevenueOverviewCards />
            <RevenueChart />
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="pt-16">
        {/* Page Header */}
        <div className="bg-card border-b border-border">
          <div className="max-w-7xl mx-auto px-4 lg:px-6 py-6">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
              <div className="flex items-center space-x-4 mb-4 lg:mb-0">
                <div className="p-3 bg-primary/10 rounded-lg">
                  <Icon name="DollarSign" size={24} color="var(--color-primary)" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-foreground">Gestão de Receitas</h1>
                  <p className="text-muted-foreground">
                    Acompanhe seus ganhos, gerencie royalties e processe pagamentos
                  </p>
                </div>
              </div>
              
              <div className="flex items-center space-x-3">
                {/* Notifications */}
                <div className="relative">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setShowNotifications(!showNotifications)}
                    className="relative"
                  >
                    <Icon name="Bell" size={16} />
                    {notifications?.filter(n => !n?.read)?.length > 0 && (
                      <span className="absolute -top-1 -right-1 w-5 h-5 bg-error text-error-foreground text-xs rounded-full flex items-center justify-center">
                        {notifications?.filter(n => !n?.read)?.length}
                      </span>
                    )}
                  </Button>
                  
                  {showNotifications && (
                    <div className="absolute right-0 mt-2 w-80 bg-popover border border-border rounded-lg shadow-lg z-50">
                      <div className="p-4 border-b border-border">
                        <h3 className="font-medium text-popover-foreground">Notificações</h3>
                      </div>
                      <div className="max-h-64 overflow-y-auto">
                        {notifications?.map((notification) => (
                          <div 
                            key={notification?.id} 
                            className={`p-4 border-b border-border hover:bg-muted/20 transition-colors ${
                              !notification?.read ? 'bg-primary/5' : ''
                            }`}
                          >
                            <div className="flex items-start space-x-3">
                              <div className={`p-2 rounded-lg ${
                                notification?.type === 'payment' ? 'bg-success/10' :
                                notification?.type === 'milestone'? 'bg-warning/10' : 'bg-accent/10'
                              }`}>
                                <Icon 
                                  name={getNotificationIcon(notification?.type)} 
                                  size={16} 
                                  color={
                                    notification?.type === 'payment' ? 'var(--color-success)' :
                                    notification?.type === 'milestone' ? 'var(--color-warning)' :
                                    'var(--color-accent)'
                                  }
                                />
                              </div>
                              <div className="flex-1">
                                <h4 className="font-medium text-popover-foreground text-sm">
                                  {notification?.title}
                                </h4>
                                <p className="text-xs text-muted-foreground mt-1">
                                  {notification?.message}
                                </p>
                                <p className="text-xs text-muted-foreground mt-2">
                                  {notification?.time}
                                </p>
                              </div>
                              {!notification?.read && (
                                <div className="w-2 h-2 bg-primary rounded-full mt-2" />
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                      <div className="p-3 border-t border-border">
                        <Button variant="ghost" size="sm" fullWidth>
                          Ver todas as notificações
                        </Button>
                      </div>
                    </div>
                  )}
                </div>

                {/* Quick Actions */}
                <Button variant="outline" size="sm" iconName="Download" iconPosition="left">
                  Exportar
                </Button>
                <Button variant="default" size="sm" iconName="Plus" iconPosition="left">
                  Nova Transação
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="bg-card border-b border-border">
          <div className="max-w-7xl mx-auto px-4 lg:px-6">
            <div className="flex items-center space-x-1 overflow-x-auto">
              {tabs?.map((tab) => (
                <button
                  key={tab?.id}
                  onClick={() => setActiveTab(tab?.id)}
                  className={`flex items-center space-x-2 px-4 py-3 text-sm font-medium whitespace-nowrap border-b-2 transition-all duration-200 ${
                    activeTab === tab?.id
                      ? 'border-primary text-primary bg-primary/5' :'border-transparent text-muted-foreground hover:text-foreground hover:border-border'
                  }`}
                >
                  <Icon name={tab?.icon} size={16} />
                  <span>{tab?.label}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-7xl mx-auto px-4 lg:px-6 py-8">
          {renderTabContent()}
        </div>

        {/* Overlay for notifications */}
        {showNotifications && (
          <div
            className="fixed inset-0 z-40"
            onClick={() => setShowNotifications(false)}
          />
        )}
      </div>
    </div>
  );
};

export default RevenueManagement;