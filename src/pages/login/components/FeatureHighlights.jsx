import React from 'react';
import Icon from '../../../components/AppIcon';

const FeatureHighlights = () => {
  const features = [
    {
      icon: 'Globe',
      title: '150+ Plataformas',
      description: 'Distribua para Spotify, Apple Music, YouTube Music e muito mais'
    },
    {
      icon: 'TrendingUp',
      title: 'Analytics Avançado',
      description: 'Acompanhe performance e receita em tempo real'
    },
    {
      icon: 'Zap',
      title: 'IA Marketing',
      description: 'Recomendações inteligentes para impulsionar suas músicas'
    },
    {
      icon: 'DollarSign',
      title: 'Monetização Automática',
      description: 'Receba royalties de forma transparente e justa'
    }
  ];

  return (
    <div className="hidden lg:block lg:w-1/2 bg-gradient-to-br from-primary/10 to-secondary/10 p-12">
      <div className="h-full flex flex-col justify-center">
        <div className="mb-12">
          <h3 className="text-3xl font-bold text-foreground mb-4">
            Transforme sua música em sucesso global
          </h3>
          <p className="text-lg text-muted-foreground">
            Junte-se a milhares de artistas que já distribuem suas músicas com a SPW Music Link
          </p>
        </div>
        
        <div className="grid grid-cols-1 gap-8">
          {features?.map((feature, index) => (
            <div key={index} className="flex items-start space-x-4">
              <div className="flex-shrink-0 w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                <Icon name={feature?.icon} size={24} className="text-primary" />
              </div>
              <div>
                <h4 className="text-lg font-semibold text-foreground mb-2">
                  {feature?.title}
                </h4>
                <p className="text-muted-foreground">
                  {feature?.description}
                </p>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-12 p-6 bg-card rounded-xl border border-border">
          <div className="flex items-center space-x-3 mb-4">
            <div className="w-10 h-10 bg-success/10 rounded-full flex items-center justify-center">
              <Icon name="CheckCircle" size={20} className="text-success" />
            </div>
            <div>
              <p className="font-semibold text-foreground">Mais de 50.000 artistas</p>
              <p className="text-sm text-muted-foreground">confiam na nossa plataforma</p>
            </div>
          </div>
          <div className="flex items-center space-x-4 text-sm text-muted-foreground">
            <div className="flex items-center space-x-1">
              <Icon name="Star" size={16} className="text-warning fill-current" />
              <span>4.9/5 avaliação</span>
            </div>
            <div className="flex items-center space-x-1">
              <Icon name="Shield" size={16} className="text-success" />
              <span>100% seguro</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeatureHighlights;