import React from 'react';
import Icon from '../../../components/AppIcon';

const UploadSidebar = () => {
  const guidelines = [
    {
      icon: 'FileAudio',
      title: 'Formatos Aceitos',
      items: [
        'MP3 (320kbps recomendado)',
        'WAV (16-bit/44.1kHz mínimo)',
        'FLAC (qualidade lossless)',
        'M4A (AAC de alta qualidade)'
      ]
    },
    {
      icon: 'Clock',
      title: 'Tempos de Processamento',
      items: [
        'Spotify: 1-3 dias úteis',
        'Apple Music: 1-2 dias úteis',
        'YouTube Music: 2-4 dias úteis',
        'Outras plataformas: 3-7 dias úteis'
      ]
    },
    {
      icon: 'Shield',
      title: 'Requisitos de Qualidade',
      items: [
        'Duração mínima: 30 segundos',
        'Tamanho máximo: 500MB',
        'Sem clipping ou distorção',
        'Metadados completos obrigatórios'
      ]
    },
    {
      icon: 'DollarSign',
      title: 'Monetização',
      items: [
        'Royalties pagos mensalmente',
        'Transparência total de ganhos',
        'Suporte a múltiplas moedas',
        'Relatórios detalhados'
      ]
    }
  ];

  const tips = [
    {
      icon: 'Lightbulb',
      title: 'Dica de Qualidade',
      content: 'Use arquivos WAV ou FLAC para melhor qualidade de áudio. O sistema converterá automaticamente para os formatos necessários de cada plataforma.'
    },
    {
      icon: 'Target',
      title: 'Maximize o Alcance',
      content: 'Selecione múltiplas plataformas para aumentar sua audiência. Cada plataforma tem seu público específico.'
    },
    {
      icon: 'Calendar',
      title: 'Planejamento de Lançamento',
      content: 'Agende seu lançamento com antecedência para permitir tempo de processamento e criar expectativa.'
    }
  ];

  const supportInfo = {
    processingTime: '24-48 horas',
    supportHours: '24/7',
    responseTime: 'Até 2 horas',
    languages: ['Português', 'Inglês', 'Espanhol']
  };

  return (
    <div className="space-y-6">
      {/* Guidelines */}
      <div className="bg-card border border-border rounded-lg p-6">
        <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center">
          <Icon name="BookOpen" size={20} className="mr-2" />
          Diretrizes de Upload
        </h3>
        
        <div className="space-y-6">
          {guidelines?.map((guideline, index) => (
            <div key={index} className="space-y-2">
              <div className="flex items-center space-x-2">
                <Icon name={guideline?.icon} size={16} className="text-primary" />
                <h4 className="text-sm font-medium text-foreground">{guideline?.title}</h4>
              </div>
              <ul className="space-y-1 ml-6">
                {guideline?.items?.map((item, itemIndex) => (
                  <li key={itemIndex} className="text-xs text-muted-foreground flex items-start">
                    <span className="w-1 h-1 bg-muted-foreground rounded-full mt-2 mr-2 flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
      {/* Tips */}
      <div className="bg-card border border-border rounded-lg p-6">
        <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center">
          <Icon name="Zap" size={20} className="mr-2" />
          Dicas Importantes
        </h3>
        
        <div className="space-y-4">
          {tips?.map((tip, index) => (
            <div key={index} className="p-3 bg-accent/5 border border-accent/20 rounded-lg">
              <div className="flex items-start space-x-3">
                <Icon name={tip?.icon} size={16} className="text-accent mt-0.5 flex-shrink-0" />
                <div>
                  <h4 className="text-sm font-medium text-foreground mb-1">{tip?.title}</h4>
                  <p className="text-xs text-muted-foreground">{tip?.content}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* Platform Stats */}
      <div className="bg-card border border-border rounded-lg p-6">
        <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center">
          <Icon name="BarChart3" size={20} className="mr-2" />
          Estatísticas da Plataforma
        </h3>
        
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="text-center p-3 bg-primary/5 rounded-lg">
              <div className="text-lg font-bold text-primary">150+</div>
              <div className="text-xs text-muted-foreground">Plataformas</div>
            </div>
            <div className="text-center p-3 bg-success/5 rounded-lg">
              <div className="text-lg font-bold text-success">98.5%</div>
              <div className="text-xs text-muted-foreground">Taxa de Sucesso</div>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="text-center p-3 bg-warning/5 rounded-lg">
              <div className="text-lg font-bold text-warning">24h</div>
              <div className="text-xs text-muted-foreground">Tempo Médio</div>
            </div>
            <div className="text-center p-3 bg-secondary/5 rounded-lg">
              <div className="text-lg font-bold text-secondary">50K+</div>
              <div className="text-xs text-muted-foreground">Artistas Ativos</div>
            </div>
          </div>
        </div>
      </div>
      {/* Support Information */}
      <div className="bg-card border border-border rounded-lg p-6">
        <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center">
          <Icon name="Headphones" size={20} className="mr-2" />
          Suporte Técnico
        </h3>
        
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">Tempo de Processamento</span>
            <span className="text-sm font-medium text-foreground">{supportInfo?.processingTime}</span>
          </div>
          
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">Horário de Atendimento</span>
            <span className="text-sm font-medium text-foreground">{supportInfo?.supportHours}</span>
          </div>
          
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">Tempo de Resposta</span>
            <span className="text-sm font-medium text-foreground">{supportInfo?.responseTime}</span>
          </div>
          
          <div className="pt-3 border-t border-border">
            <div className="text-sm text-muted-foreground mb-2">Idiomas Suportados</div>
            <div className="flex flex-wrap gap-1">
              {supportInfo?.languages?.map((language, index) => (
                <span key={index} className="px-2 py-1 bg-muted/30 text-xs rounded">
                  {language}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
      {/* Contact Support */}
      <div className="bg-gradient-to-r from-primary/10 to-secondary/10 border border-primary/20 rounded-lg p-6">
        <div className="text-center">
          <Icon name="MessageCircle" size={24} className="text-primary mx-auto mb-2" />
          <h4 className="text-sm font-medium text-foreground mb-2">Precisa de Ajuda?</h4>
          <p className="text-xs text-muted-foreground mb-3">
            Nossa equipe está disponível 24/7 para ajudar com qualquer dúvida sobre o processo de upload.
          </p>
          <button className="w-full bg-primary text-primary-foreground text-sm font-medium py-2 px-4 rounded-lg hover:bg-primary/90 transition-colors">
            Falar com Suporte
          </button>
        </div>
      </div>
    </div>
  );
};

export default UploadSidebar;