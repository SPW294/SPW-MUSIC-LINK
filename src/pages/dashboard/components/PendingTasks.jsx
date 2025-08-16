import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const PendingTasks = () => {
  const tasks = [
    {
      id: 1,
      title: "Completar perfil do artista",
      description: "Adicione biografia e foto de perfil",
      priority: "high",
      dueDate: "Hoje",
      icon: "User",
      action: "Completar"
    },
    {
      id: 2,
      title: "Verificar documentos fiscais",
      description: "Documentos para pagamento pendentes",
      priority: "medium",
      dueDate: "Amanhã",
      icon: "FileText",
      action: "Verificar"
    },
    {
      id: 3,
      title: "Aprovar distribuição",
      description: "\"Eletrônica Brasil\" aguarda aprovação",
      priority: "high",
      dueDate: "2 dias",
      icon: "CheckCircle",
      action: "Aprovar"
    },
    {
      id: 4,
      title: "Atualizar informações bancárias",
      description: "Dados bancários expiram em breve",
      priority: "low",
      dueDate: "1 semana",
      icon: "CreditCard",
      action: "Atualizar"
    }
  ];

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high':
        return 'text-error bg-error/10 border-error/20';
      case 'medium':
        return 'text-warning bg-warning/10 border-warning/20';
      case 'low':
        return 'text-success bg-success/10 border-success/20';
      default:
        return 'text-muted-foreground bg-muted/10 border-border';
    }
  };

  const getPriorityLabel = (priority) => {
    switch (priority) {
      case 'high':
        return 'Alta';
      case 'medium':
        return 'Média';
      case 'low':
        return 'Baixa';
      default:
        return 'Normal';
    }
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-semibold text-foreground mb-1">Tarefas Pendentes</h2>
          <p className="text-sm text-muted-foreground">
            {tasks?.length} {tasks?.length === 1 ? 'tarefa pendente' : 'tarefas pendentes'}
          </p>
        </div>
        <div className="flex items-center justify-center w-8 h-8 bg-warning/10 text-warning rounded-full">
          <span className="text-sm font-bold">{tasks?.length}</span>
        </div>
      </div>
      <div className="space-y-4">
        {tasks?.map((task) => (
          <div key={task?.id} className="p-4 rounded-lg border border-border hover:border-primary/50 hover:bg-muted/30 transition-all duration-200">
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-muted rounded-lg">
                  <Icon name={task?.icon} size={16} className="text-muted-foreground" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-medium text-foreground text-sm mb-1">
                    {task?.title}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {task?.description}
                  </p>
                </div>
              </div>
              <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getPriorityColor(task?.priority)}`}>
                {getPriorityLabel(task?.priority)}
              </span>
            </div>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2 text-xs text-muted-foreground">
                <Icon name="Clock" size={12} />
                <span>Prazo: {task?.dueDate}</span>
              </div>
              <Button variant="outline" size="sm">
                {task?.action}
              </Button>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-6 pt-4 border-t border-border">
        <Button variant="ghost" fullWidth iconName="Plus" iconPosition="left">
          Adicionar Nova Tarefa
        </Button>
      </div>
    </div>
  );
};

export default PendingTasks;