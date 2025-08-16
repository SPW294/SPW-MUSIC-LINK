import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const AIRecommendations = ({ title = "Recomendações de IA" }) => {
  const [activeRecommendation, setActiveRecommendation] = useState(null);

  const recommendations = [
    {
      id: 1,
      type: 'optimization',
      priority: 'high',
      title: 'Otimize o horário de lançamento',
      description: `Seus ouvintes são mais ativos entre 18h-22h. Considere lançar suas próximas faixas neste período para maximizar o alcance inicial.`,
      impact: 'Aumento potencial de 25% nos streams nas primeiras 24h',
      action: 'Agendar próximo lançamento',
      icon: 'Clock',
      category: 'Timing'
    },
    {
      id: 2,
      type: 'marketing',
      priority: 'high',
      title: 'Foque no mercado mexicano',
      description: `O México mostra crescimento de 15.3% em seus streams. Considere campanhas direcionadas e colaborações com artistas locais.`,
      impact: 'Potencial de expansão de 40% no mercado latino',
      action: 'Criar campanha direcionada',
      icon: 'Target',
      category: 'Marketing'
    },
    {
      id: 3,
      type: 'content',
      priority: 'medium',
      title: 'Explore o gênero Funk Carioca',
      description: `Sua faixa "Funk Carioca" tem o maior crescimento (+18.2%) apesar de menos streams. Este gênero tem potencial inexplorado.`,
      impact: 'Diversificação de audiência e novos nichos',
      action: 'Produzir mais conteúdo similar',
      icon: 'Music',
      category: 'Conteúdo'
    },
    {
      id: 4,
      type: 'platform',
      priority: 'medium',
      title: 'Melhore presença no TikTok',
      description: `TikTok representa apenas 8.4% dos seus streams, mas tem potencial viral. Crie conteúdo de 15-30 segundos das suas melhores faixas.`,
      impact: 'Alcance de audiência mais jovem (13-24 anos)',
      action: 'Criar snippets para TikTok',
      icon: 'Video',
      category: 'Plataforma'
    },
    {
      id: 5,
      type: 'collaboration',
      priority: 'low',
      title: 'Colabore com artistas similares',
      description: `Artistas com perfil similar ao seu têm 60% mais engajamento em colaborações. Identifique parceiros estratégicos.`,
      impact: 'Expansão de base de fãs e cross-promotion',
      action: 'Buscar colaboradores',
      icon: 'Users',
      category: 'Colaboração'
    },
    {
      id: 6,
      type: 'monetization',
      priority: 'low',
      title: 'Otimize RPM no Spotify',
      description: `Seu RPM no Spotify está abaixo da média. Considere estratégias para aumentar o tempo de escuta e reduzir skips.`,
      impact: 'Aumento de 15% na receita por stream',
      action: 'Analisar pontos de skip',
      icon: 'DollarSign',
      category: 'Monetização'
    }
  ];

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return 'text-error';
      case 'medium': return 'text-warning';
      case 'low': return 'text-success';
      default: return 'text-muted-foreground';
    }
  };

  const getPriorityBg = (priority) => {
    switch (priority) {
      case 'high': return 'bg-error/10 border-error/20';
      case 'medium': return 'bg-warning/10 border-warning/20';
      case 'low': return 'bg-success/10 border-success/20';
      default: return 'bg-muted/10 border-border';
    }
  };

  const getPriorityLabel = (priority) => {
    switch (priority) {
      case 'high': return 'Alta Prioridade';
      case 'medium': return 'Média Prioridade';
      case 'low': return 'Baixa Prioridade';
      default: return 'Prioridade';
    }
  };

  const toggleRecommendation = (id) => {
    setActiveRecommendation(activeRecommendation === id ? null : id);
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-primary/10 rounded-lg">
            <Icon name="Brain" size={20} className="text-primary" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-foreground">{title}</h3>
            <p className="text-sm text-muted-foreground">Insights baseados em IA para otimizar sua performance</p>
          </div>
        </div>
        <Button variant="outline" size="sm" iconName="RefreshCw">
          Atualizar
        </Button>
      </div>
      <div className="space-y-4">
        {recommendations?.map((rec) => (
          <div
            key={rec?.id}
            className={`border rounded-lg transition-all duration-200 ${getPriorityBg(rec?.priority)} ${
              activeRecommendation === rec?.id ? 'ring-2 ring-primary/20' : ''
            }`}
          >
            <div
              className="p-4 cursor-pointer"
              onClick={() => toggleRecommendation(rec?.id)}
            >
              <div className="flex items-start justify-between">
                <div className="flex items-start space-x-3 flex-1">
                  <div className="p-2 bg-background/50 rounded-lg">
                    <Icon name={rec?.icon} size={18} className="text-foreground" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-1">
                      <h4 className="font-medium text-foreground">{rec?.title}</h4>
                      <span className={`text-xs px-2 py-1 rounded-full ${getPriorityColor(rec?.priority)} bg-background/50`}>
                        {getPriorityLabel(rec?.priority)}
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground mb-2">{rec?.description}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-xs bg-background/50 px-2 py-1 rounded-full text-muted-foreground">
                        {rec?.category}
                      </span>
                      <Icon 
                        name={activeRecommendation === rec?.id ? "ChevronUp" : "ChevronDown"} 
                        size={16} 
                        className="text-muted-foreground" 
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {activeRecommendation === rec?.id && (
              <div className="px-4 pb-4 border-t border-border/50 pt-4 bg-background/30">
                <div className="space-y-3">
                  <div>
                    <h5 className="text-sm font-medium text-foreground mb-1">Impacto Esperado</h5>
                    <p className="text-sm text-muted-foreground">{rec?.impact}</p>
                  </div>
                  
                  <div className="flex items-center justify-between pt-2">
                    <div className="flex items-center space-x-2">
                      <Icon name="Lightbulb" size={16} className="text-warning" />
                      <span className="text-sm text-muted-foreground">Recomendação baseada em dados</span>
                    </div>
                    <Button variant="default" size="sm" iconName="ArrowRight" iconPosition="right">
                      {rec?.action}
                    </Button>
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
      {/* AI Insights Summary */}
      <div className="mt-6 p-4 bg-primary/5 border border-primary/20 rounded-lg">
        <div className="flex items-start space-x-3">
          <Icon name="Sparkles" size={20} className="text-primary mt-0.5" />
          <div>
            <h4 className="font-medium text-foreground mb-1">Resumo de Insights</h4>
            <p className="text-sm text-muted-foreground mb-3">
              Com base na análise dos seus dados, identificamos 6 oportunidades de otimização. 
              Implementar as recomendações de alta prioridade pode resultar em um aumento de até 40% no seu alcance.
            </p>
            <div className="flex flex-wrap gap-2">
              <div className="flex items-center space-x-1 text-xs bg-error/10 text-error px-2 py-1 rounded-full">
                <Icon name="AlertCircle" size={12} />
                <span>2 Alta Prioridade</span>
              </div>
              <div className="flex items-center space-x-1 text-xs bg-warning/10 text-warning px-2 py-1 rounded-full">
                <Icon name="Clock" size={12} />
                <span>2 Média Prioridade</span>
              </div>
              <div className="flex items-center space-x-1 text-xs bg-success/10 text-success px-2 py-1 rounded-full">
                <Icon name="CheckCircle" size={12} />
                <span>2 Baixa Prioridade</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AIRecommendations;