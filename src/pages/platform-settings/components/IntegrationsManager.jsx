import React, { useState } from 'react';
        import Icon from '../../../components/AppIcon';
        import Button from '../../../components/ui/Button';
        import Input from '../../../components/ui/Input';

        const IntegrationsManager = ({ settings, updateSettings }) => {
          const [connectingService, setConnectingService] = useState(null);

          const integrations = [
            {
              id: 'spotify',
              name: 'Spotify for Artists',
              description: 'Conecte sua conta do Spotify for Artists para sincronizar dados de streaming',
              icon: 'Music',
              color: '#1DB954',
              type: 'streaming',
              features: ['Analytics detalhados', 'Perfil de artista', 'Playlist pitching']
            },
            {
              id: 'appleMusic',
              name: 'Apple Music Connect',
              description: 'Integração com Apple Music for Artists para estatísticas e promoção',
              icon: 'Music',
              color: '#FA57C1',
              type: 'streaming',
              features: ['Dados de reprodução', 'Demographics', 'Shazam insights']
            },
            {
              id: 'youtube',
              name: 'YouTube Music',
              description: 'Conecte ao YouTube Music e YouTube Content ID',
              icon: 'Youtube',
              color: '#FF0000',
              type: 'streaming',
              features: ['Content ID', 'Analytics', 'Channel management']
            },
            {
              id: 'instagram',
              name: 'Instagram',
              description: 'Integração para compartilhar lançamentos e stories',
              icon: 'Instagram',
              color: '#E4405F',
              type: 'social',
              features: ['Auto-post lançamentos', 'Stories', 'Music stickers']
            },
            {
              id: 'tiktok',
              name: 'TikTok',
              description: 'Distribua música para TikTok e acesse analytics',
              icon: 'Music',
              color: '#000000',
              type: 'social',
              features: ['Music library', 'Trend analytics', 'Creator partnerships']
            }
          ];

          const getStatusColor = (status) => {
            switch (status) {
              case 'active': return 'text-success';
              case 'limited': return 'text-warning';
              case 'disconnected': return 'text-muted-foreground';
              default: return 'text-muted-foreground';
            }
          };

          const getStatusIcon = (status) => {
            switch (status) {
              case 'active': return 'CheckCircle';
              case 'limited': return 'AlertCircle';
              case 'disconnected': return 'XCircle';
              default: return 'Circle';
            }
          };

          const getStatusText = (status) => {
            switch (status) {
              case 'active': return 'Conectado';
              case 'limited': return 'Limitado';
              case 'disconnected': return 'Desconectado';
              default: return 'Desconhecido';
            }
          };

          const handleConnect = async (integrationId) => {
            setConnectingService(integrationId);
            
            // Simulate connection process
            setTimeout(() => {
              const newSettings = {
                ...settings,
                [integrationId]: {
                  ...settings?.[integrationId],
                  connected: true,
                  status: 'active',
                  lastSync: new Date()?.toISOString()
                }
              };
              updateSettings(newSettings);
              setConnectingService(null);
            }, 2000);
          };

          const handleDisconnect = (integrationId) => {
            const newSettings = {
              ...settings,
              [integrationId]: {
                ...settings?.[integrationId],
                connected: false,
                status: 'disconnected',
                lastSync: null
              }
            };
            updateSettings(newSettings);
          };

          const handleSync = async (integrationId) => {
            const newSettings = {
              ...settings,
              [integrationId]: {
                ...settings?.[integrationId],
                lastSync: new Date()?.toISOString()
              }
            };
            updateSettings(newSettings);
          };

          const formatLastSync = (lastSync) => {
            if (!lastSync) return 'Nunca';
            const date = new Date(lastSync);
            const now = new Date();
            const diffMs = now - date;
            const diffMins = Math.floor(diffMs / (1000 * 60));
            
            if (diffMins < 60) return `${diffMins} min atrás`;
            if (diffMins < 1440) return `${Math.floor(diffMins / 60)}h atrás`;
            return date?.toLocaleDateString('pt-BR');
          };

          return (
            <div className="p-6 space-y-8">
              {/* Section Header */}
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                  <Icon name="Link" size={20} className="text-primary" />
                </div>
                <div>
                  <h2 className="text-xl font-semibold text-foreground">
                    Gerenciamento de Integrações
                  </h2>
                  <p className="text-sm text-muted-foreground">
                    Conecte plataformas e serviços externos com indicadores de status de autenticação
                  </p>
                </div>
              </div>

              {/* Integration Cards */}
              <div className="space-y-6">
                {integrations?.map((integration) => {
                  const integrationSettings = settings?.[integration?.id] || {};
                  const isConnected = integrationSettings?.connected || false;
                  const status = integrationSettings?.status || 'disconnected';
                  const lastSync = integrationSettings?.lastSync;
                  const isConnecting = connectingService === integration?.id;

                  return (
                    <div
                      key={integration?.id}
                      className="bg-card border border-border rounded-lg p-6 hover:shadow-soft-sm transition-shadow"
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex items-start space-x-4 flex-1">
                          {/* Integration Icon */}
                          <div 
                            className="w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0"
                            style={{ backgroundColor: `${integration?.color}20` }}
                          >
                            <Icon 
                              name={integration?.icon} 
                              size={24} 
                              style={{ color: integration?.color }}
                            />
                          </div>

                          {/* Integration Info */}
                          <div className="flex-1">
                            <div className="flex items-center space-x-3 mb-2">
                              <h3 className="text-lg font-medium text-foreground">
                                {integration?.name}
                              </h3>
                              <div className={`flex items-center space-x-1 ${getStatusColor(status)}`}>
                                <Icon name={getStatusIcon(status)} size={16} />
                                <span className="text-sm font-medium">
                                  {getStatusText(status)}
                                </span>
                              </div>
                              {integration?.type && (
                                <span className="px-2 py-1 text-xs bg-muted text-muted-foreground rounded-full">
                                  {integration?.type === 'streaming' ? 'Streaming' : 'Social'}
                                </span>
                              )}
                            </div>
                            
                            <p className="text-sm text-muted-foreground mb-3">
                              {integration?.description}
                            </p>

                            {/* Features */}
                            <div className="flex flex-wrap gap-2 mb-4">
                              {integration?.features?.map((feature, index) => (
                                <span 
                                  key={index}
                                  className="px-2 py-1 text-xs bg-primary/10 text-primary rounded-full"
                                >
                                  {feature}
                                </span>
                              ))}
                            </div>

                            {/* Connection Info */}
                            {isConnected && lastSync && (
                              <div className="text-sm text-muted-foreground">
                                <span>Última sincronização: {formatLastSync(lastSync)}</span>
                              </div>
                            )}
                          </div>
                        </div>

                        {/* Actions */}
                        <div className="flex flex-col space-y-2 ml-4">
                          {!isConnected ? (
                            <Button
                              onClick={() => handleConnect(integration?.id)}
                              loading={isConnecting}
                              size="sm"
                              className="min-w-[100px]"
                            >
                              {isConnecting ? (
                                <Icon name="Loader2" size={16} className="mr-2 animate-spin" />
                              ) : (
                                <Icon name="Link" size={16} className="mr-2" />
                              )}
                              {isConnecting ? 'Conectando...' : 'Conectar'}
                            </Button>
                          ) : (
                            <div className="space-y-2">
                              <Button
                                onClick={() => handleSync(integration?.id)}
                                variant="outline"
                                size="sm"
                                className="min-w-[100px]"
                              >
                                <Icon name="RefreshCw" size={16} className="mr-2" />
                                Sincronizar
                              </Button>
                              <Button
                                onClick={() => handleDisconnect(integration?.id)}
                                variant="outline"
                                size="sm"
                                className="min-w-[100px] text-destructive hover:bg-destructive/10"
                              >
                                <Icon name="Unlink" size={16} className="mr-2" />
                                Desconectar
                              </Button>
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Connection Details for Connected Services */}
                      {isConnected && status === 'limited' && (
                        <div className="mt-4 p-3 bg-warning/5 border border-warning/20 rounded-lg">
                          <div className="flex items-start space-x-2">
                            <Icon name="AlertTriangle" size={16} className="text-warning mt-0.5" />
                            <div>
                              <h4 className="text-sm font-medium text-foreground">
                                Acesso Limitado
                              </h4>
                              <p className="text-sm text-muted-foreground">
                                Algumas funcionalidades podem não estar disponíveis. 
                                Reconecte para acesso completo.
                              </p>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>

              {/* API Configuration */}
              <div className="border-t border-border pt-6">
                <h3 className="text-lg font-medium text-foreground mb-4">
                  Configuração de API
                </h3>
                <div className="space-y-4">
                  <Input
                    label="Webhook URL"
                    placeholder="https://seusite.com/webhook"
                    value=""
                    description="URL para receber notificações de eventos da plataforma"
                  />
                  
                  <div className="flex items-center justify-between p-4 bg-card border border-border rounded-lg">
                    <div>
                      <h4 className="font-medium text-foreground">
                        Chave de API
                      </h4>
                      <p className="text-sm text-muted-foreground">
                        Para desenvolvedores que querem integrar com nossa API
                      </p>
                    </div>
                    <Button variant="outline" size="sm">
                      <Icon name="Key" size={16} className="mr-2" />
                      Gerar Chave
                    </Button>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="border-t border-border pt-6 flex flex-col sm:flex-row gap-3">
                <Button variant="default">
                  <Icon name="Save" size={16} className="mr-2" />
                  Salvar Configurações
                </Button>
                <Button variant="outline">
                  <Icon name="RefreshCw" size={16} className="mr-2" />
                  Sincronizar Todas
                </Button>
                <Button variant="outline">
                  <Icon name="FileText" size={16} className="mr-2" />
                  Documentação da API
                </Button>
              </div>
            </div>
          );
        };

        export default IntegrationsManager;