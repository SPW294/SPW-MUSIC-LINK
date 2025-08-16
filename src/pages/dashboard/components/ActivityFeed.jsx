import React from 'react';
import Icon from '../../../components/AppIcon';

const ActivityFeed = () => {
  const activities = [
    {
      id: 1,
      type: "release",
      title: "Nova música publicada",
      description: "\"Noites de Verão\" foi distribuída para todas as plataformas",
      timestamp: "2 horas atrás",
      icon: "Music",
      color: "success"
    },
    {
      id: 2,
      type: "payment",
      title: "Pagamento processado",
      description: "R$ 245,80 transferidos via Pix",
      timestamp: "5 horas atrás",
      icon: "DollarSign",
      color: "primary"
    },
    {
      id: 3,
      type: "milestone",
      title: "Meta alcançada",
      description: "\"Batida Urbana\" atingiu 10K streams",
      timestamp: "1 dia atrás",
      icon: "Target",
      color: "warning"
    },
    {
      id: 4,
      type: "platform",
      title: "Nova plataforma",
      description: "Sua música foi aprovada no TikTok",
      timestamp: "2 dias atrás",
      icon: "CheckCircle",
      color: "success"
    },
    {
      id: 5,
      type: "analytics",
      title: "Relatório disponível",
      description: "Relatório mensal de agosto está pronto",
      timestamp: "3 dias atrás",
      icon: "FileText",
      color: "secondary"
    }
  ];

  const getIconColor = (color) => {
    switch (color) {
      case 'success':
        return 'text-success';
      case 'primary':
        return 'text-primary';
      case 'warning':
        return 'text-warning';
      case 'secondary':
        return 'text-secondary';
      default:
        return 'text-muted-foreground';
    }
  };

  const getBgColor = (color) => {
    switch (color) {
      case 'success':
        return 'bg-success/10';
      case 'primary':
        return 'bg-primary/10';
      case 'warning':
        return 'bg-warning/10';
      case 'secondary':
        return 'bg-secondary/10';
      default:
        return 'bg-muted/50';
    }
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-foreground mb-1">Atividade Recente</h2>
        <p className="text-sm text-muted-foreground">Acompanhe as últimas atualizações</p>
      </div>
      <div className="space-y-4">
        {activities?.map((activity) => (
          <div key={activity?.id} className="flex items-start space-x-4 p-3 rounded-lg hover:bg-muted/30 transition-colors">
            <div className={`p-2 rounded-lg ${getBgColor(activity?.color)} flex-shrink-0`}>
              <Icon 
                name={activity?.icon} 
                size={16} 
                className={getIconColor(activity?.color)}
              />
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="font-medium text-foreground text-sm mb-1">
                {activity?.title}
              </h3>
              <p className="text-sm text-muted-foreground mb-2">
                {activity?.description}
              </p>
              <p className="text-xs text-muted-foreground">
                {activity?.timestamp}
              </p>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-6 pt-4 border-t border-border">
        <button className="w-full text-sm text-primary hover:text-primary/80 font-medium transition-colors">
          Ver todas as atividades
        </button>
      </div>
    </div>
  );
};

export default ActivityFeed;