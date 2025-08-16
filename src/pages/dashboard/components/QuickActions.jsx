import React from 'react';
import { Link } from 'react-router-dom';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const QuickActions = () => {
  const quickActions = [
    {
      title: "Novo Lançamento",
      description: "Faça upload de uma nova música",
      icon: "Upload",
      color: "primary",
      link: "/music-upload"
    },
    {
      title: "Ver Analytics",
      description: "Análise detalhada de performance",
      icon: "BarChart3",
      color: "secondary",
      link: "/analytics-dashboard"
    },
    {
      title: "Gerenciar Receitas",
      description: "Controle seus ganhos e pagamentos",
      icon: "DollarSign",
      color: "success",
      link: "/revenue-management"
    }
  ];

  const getColorClasses = (color) => {
    switch (color) {
      case 'primary':
        return 'bg-primary hover:bg-primary/90 text-primary-foreground';
      case 'secondary':
        return 'bg-secondary hover:bg-secondary/90 text-secondary-foreground';
      case 'success':
        return 'bg-success hover:bg-success/90 text-success-foreground';
      default:
        return 'bg-primary hover:bg-primary/90 text-primary-foreground';
    }
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-foreground mb-1">Ações Rápidas</h2>
        <p className="text-sm text-muted-foreground">Acesse rapidamente as principais funcionalidades</p>
      </div>
      <div className="space-y-4">
        {quickActions?.map((action, index) => (
          <Link key={index} to={action?.link} className="block">
            <div className="group p-4 rounded-lg border border-border hover:border-primary/50 hover:bg-muted/30 transition-all duration-200 cursor-pointer">
              <div className="flex items-center space-x-4">
                <div className={`p-3 rounded-lg ${getColorClasses(action?.color)} group-hover:scale-105 transition-transform duration-200`}>
                  <Icon name={action?.icon} size={20} />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-medium text-foreground group-hover:text-primary transition-colors">
                    {action?.title}
                  </h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    {action?.description}
                  </p>
                </div>
                <Icon 
                  name="ChevronRight" 
                  size={16} 
                  className="text-muted-foreground group-hover:text-primary transition-colors" 
                />
              </div>
            </div>
          </Link>
        ))}
      </div>
      <div className="mt-6 pt-6 border-t border-border">
        <Button variant="outline" fullWidth iconName="Plus" iconPosition="left">
          Ver Todas as Ações
        </Button>
      </div>
    </div>
  );
};

export default QuickActions;