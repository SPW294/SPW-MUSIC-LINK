import React from 'react';
        import Icon from '../../../components/AppIcon';
        import Select from '../../../components/ui/Select';
        import { Checkbox } from '../../../components/ui/Checkbox';
        import Button from '../../../components/ui/Button';

        const NotificationCenter = ({ settings, updateSettings }) => {
          const frequencyOptions = [
            { value: 'immediate', label: 'Imediato' },
            { value: 'daily', label: 'Diário' },
            { value: 'weekly', label: 'Semanal' },
            { value: 'monthly', label: 'Mensal' },
            { value: 'never', label: 'Nunca' }
          ];

          const priorityOptions = [
            { value: 'high', label: 'Alta Prioridade' },
            { value: 'medium', label: 'Média Prioridade' },
            { value: 'low', label: 'Baixa Prioridade' }
          ];

          const updateEmailSettings = (key, value) => {
            updateSettings({
              email: { ...settings?.email, [key]: value }
            });
          };

          const updatePushSettings = (key, value) => {
            updateSettings({
              push: { ...settings?.push, [key]: value }
            });
          };

          const updateDashboardSettings = (key, value) => {
            updateSettings({
              dashboard: { ...settings?.dashboard, [key]: value }
            });
          };

          return (
            <div className="p-6 space-y-8">
              {/* Section Header */}
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                  <Icon name="Bell" size={20} className="text-primary" />
                </div>
                <div>
                  <h2 className="text-xl font-semibold text-foreground">
                    Centro de Notificações
                  </h2>
                  <p className="text-sm text-muted-foreground">
                    Gerencie alertas por email, push notifications e atualizações do dashboard
                  </p>
                </div>
              </div>

              {/* Email Notifications */}
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-medium text-foreground mb-4">
                    Notificações por Email
                  </h3>
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-4">
                        <Checkbox
                          label="Lançamentos"
                          description="Atualizações sobre status de lançamentos"
                          checked={settings?.email?.releases}
                          onChange={(checked) => updateEmailSettings('releases', checked)}
                        />
                        
                        <Checkbox
                          label="Analytics"
                          description="Relatórios de performance e estatísticas"
                          checked={settings?.email?.analytics}
                          onChange={(checked) => updateEmailSettings('analytics', checked)}
                        />
                        
                        <Checkbox
                          label="Pagamentos"
                          description="Notificações de royalties e pagamentos"
                          checked={settings?.email?.payments}
                          onChange={(checked) => updateEmailSettings('payments', checked)}
                        />
                      </div>
                      
                      <div className="space-y-4">
                        <Checkbox
                          label="Marketing"
                          description="Dicas, promoções e novidades"
                          checked={settings?.email?.marketing}
                          onChange={(checked) => updateEmailSettings('marketing', checked)}
                        />
                        
                        <Checkbox
                          label="Sistema"
                          description="Manutenções e atualizações importantes"
                          checked={settings?.email?.system}
                          onChange={(checked) => updateEmailSettings('system', checked)}
                        />
                        
                        <Select
                          label="Frequência de Resumos"
                          value={settings?.email?.frequency}
                          options={frequencyOptions}
                          onChange={(value) => updateEmailSettings('frequency', value)}
                          description="Com que frequência receber resumos"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Push Notifications */}
                <div className="border-t border-border pt-6">
                  <h3 className="text-lg font-medium text-foreground mb-4">
                    Push Notifications
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <Checkbox
                        label="Lançamentos"
                        description="Status de uploads e distribuição"
                        checked={settings?.push?.releases}
                        onChange={(checked) => updatePushSettings('releases', checked)}
                      />
                      
                      <Checkbox
                        label="Analytics"
                        description="Alertas de performance importantes"
                        checked={settings?.push?.analytics}
                        onChange={(checked) => updatePushSettings('analytics', checked)}
                      />
                      
                      <Checkbox
                        label="Pagamentos"
                        description="Notificações de royalties recebidos"
                        checked={settings?.push?.payments}
                        onChange={(checked) => updatePushSettings('payments', checked)}
                      />
                    </div>
                    
                    <div className="space-y-4">
                      <Checkbox
                        label="Marketing"
                        description="Oportunidades e promoções"
                        checked={settings?.push?.marketing}
                        onChange={(checked) => updatePushSettings('marketing', checked)}
                      />
                      
                      <Checkbox
                        label="Sistema"
                        description="Alertas críticos e manutenções"
                        checked={settings?.push?.system}
                        onChange={(checked) => updatePushSettings('system', checked)}
                      />
                    </div>
                  </div>

                  <div className="mt-6 p-4 bg-info/5 border border-info/20 rounded-lg">
                    <div className="flex items-start space-x-3">
                      <Icon name="Smartphone" size={20} className="text-info mt-0.5" />
                      <div>
                        <h4 className="font-medium text-foreground">
                          Configuração do Navegador
                        </h4>
                        <p className="text-sm text-muted-foreground mt-1">
                          Para receber push notifications, você precisa permitir notificações no seu navegador.
                        </p>
                        <Button variant="outline" size="sm" className="mt-3">
                          <Icon name="Settings" size={16} className="mr-2" />
                          Configurar Notificações
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Dashboard Notifications */}
                <div className="border-t border-border pt-6">
                  <h3 className="text-lg font-medium text-foreground mb-4">
                    Notificações do Dashboard
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <Checkbox
                        label="Atualizações em Tempo Real"
                        description="Mostrar notificações instantâneas no dashboard"
                        checked={settings?.dashboard?.realTime}
                        onChange={(checked) => updateDashboardSettings('realTime', checked)}
                      />
                      
                      <Checkbox
                        label="Notificações Agrupadas"
                        description="Agrupar notificações similares"
                        checked={settings?.dashboard?.batched}
                        onChange={(checked) => updateDashboardSettings('batched', checked)}
                      />
                    </div>
                    
                    <div className="space-y-4">
                      <Select
                        label="Nível de Prioridade"
                        value={settings?.dashboard?.priority}
                        options={priorityOptions}
                        onChange={(value) => updateDashboardSettings('priority', value)}
                        description="Quais notificações mostrar no dashboard"
                      />
                    </div>
                  </div>
                </div>

                {/* Notification History */}
                <div className="border-t border-border pt-6">
                  <h3 className="text-lg font-medium text-foreground mb-4">
                    Histórico e Gerenciamento
                  </h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 bg-card border border-border rounded-lg">
                      <div>
                        <h4 className="font-medium text-foreground">
                          Histórico de Notificações
                        </h4>
                        <p className="text-sm text-muted-foreground">
                          Visualizar todas as notificações enviadas nos últimos 30 dias
                        </p>
                      </div>
                      <Button variant="outline" size="sm">
                        <Icon name="History" size={16} className="mr-2" />
                        Ver Histórico
                      </Button>
                    </div>
                    
                    <div className="flex items-center justify-between p-4 bg-card border border-border rounded-lg">
                      <div>
                        <h4 className="font-medium text-foreground">
                          Limpar Notificações
                        </h4>
                        <p className="text-sm text-muted-foreground">
                          Remover todas as notificações não lidas
                        </p>
                      </div>
                      <Button variant="outline" size="sm">
                        <Icon name="Trash2" size={16} className="mr-2" />
                        Limpar Todas
                      </Button>
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="border-t border-border pt-6 flex flex-col sm:flex-row gap-3">
                  <Button variant="default">
                    <Icon name="Save" size={16} className="mr-2" />
                    Salvar Preferências
                  </Button>
                  <Button variant="outline">
                    <Icon name="TestTube" size={16} className="mr-2" />
                    Testar Notificações
                  </Button>
                  <Button variant="outline">
                    <Icon name="RotateCcw" size={16} className="mr-2" />
                    Restaurar Padrões
                  </Button>
                </div>
              </div>
            </div>
          );
        };

        export default NotificationCenter;