import React from 'react';
        import Icon from '../../../components/AppIcon';
        
        import Select from '../../../components/ui/Select';
        import { Checkbox } from '../../../components/ui/Checkbox';
        import Button from '../../../components/ui/Button';

        const AccountPreferences = ({ settings, updateSettings }) => {
          const languageOptions = [
            { value: 'pt-BR', label: 'Português (Brasil)' },
            { value: 'en-US', label: 'English (US)' },
            { value: 'es-ES', label: 'Español' },
            { value: 'fr-FR', label: 'Français' }
          ];

          const timezoneOptions = [
            { value: 'America/Sao_Paulo', label: 'São Paulo (GMT-3)' },
            { value: 'America/New_York', label: 'New York (GMT-5)' },
            { value: 'Europe/London', label: 'London (GMT+0)' },
            { value: 'Europe/Madrid', label: 'Madrid (GMT+1)' }
          ];

          const currencyOptions = [
            { value: 'BRL', label: 'Real Brasileiro (R$)' },
            { value: 'USD', label: 'US Dollar ($)' },
            { value: 'EUR', label: 'Euro (€)' },
            { value: 'GBP', label: 'British Pound (£)' }
          ];

          const dateFormatOptions = [
            { value: 'DD/MM/YYYY', label: 'DD/MM/YYYY' },
            { value: 'MM/DD/YYYY', label: 'MM/DD/YYYY' },
            { value: 'YYYY-MM-DD', label: 'YYYY-MM-DD' }
          ];

          const sessionTimeoutOptions = [
            { value: 15, label: '15 minutos' },
            { value: 30, label: '30 minutos' },
            { value: 60, label: '1 hora' },
            { value: 120, label: '2 horas' },
            { value: 480, label: '8 horas' }
          ];

          return (
            <div className="p-6 space-y-8">
              {/* Section Header */}
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                  <Icon name="User" size={20} className="text-primary" />
                </div>
                <div>
                  <h2 className="text-xl font-semibold text-foreground">
                    Preferências da Conta
                  </h2>
                  <p className="text-sm text-muted-foreground">
                    Configure suas preferências pessoais e configurações de conta
                  </p>
                </div>
              </div>

              {/* Language & Localization */}
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-medium text-foreground mb-4">
                    Idioma e Localização
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Select
                      label="Idioma da Interface"
                      value={settings?.language}
                      options={languageOptions}
                      onChange={(value) => updateSettings({ language: value })}
                      description="Escolha o idioma principal da plataforma"
                    />
                    
                    <Select
                      label="Fuso Horário"
                      value={settings?.timezone}
                      options={timezoneOptions}
                      onChange={(value) => updateSettings({ timezone: value })}
                      description="Horário usado para exibir datas e horários"
                    />
                    
                    <Select
                      label="Moeda Padrão"
                      value={settings?.currency}
                      options={currencyOptions}
                      onChange={(value) => updateSettings({ currency: value })}
                      description="Moeda para exibição de valores"
                    />
                    
                    <Select
                      label="Formato de Data"
                      value={settings?.dateFormat}
                      options={dateFormatOptions}
                      onChange={(value) => updateSettings({ dateFormat: value })}
                      description="Como as datas serão exibidas"
                    />
                  </div>
                </div>

                {/* Security & Sessions */}
                <div className="border-t border-border pt-6">
                  <h3 className="text-lg font-medium text-foreground mb-4">
                    Segurança e Sessões
                  </h3>
                  <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <Select
                        label="Tempo Limite de Sessão"
                        value={settings?.sessionTimeout}
                        options={sessionTimeoutOptions}
                        onChange={(value) => updateSettings({ sessionTimeout: value })}
                        description="Tempo de inatividade antes do logout automático"
                      />
                      
                      <div className="space-y-4">
                        <Checkbox
                          label="Logout Automático"
                          description="Fazer logout automaticamente após o tempo limite"
                          checked={settings?.autoLogout}
                          onChange={(checked) => updateSettings({ autoLogout: checked })}
                        />
                        
                        <Checkbox
                          label="Autenticação de Dois Fatores"
                          description="Adicionar camada extra de segurança"
                          checked={settings?.twoFactorAuth}
                          onChange={(checked) => updateSettings({ twoFactorAuth: checked })}
                        />
                      </div>
                    </div>

                    {settings?.twoFactorAuth && (
                      <div className="p-4 bg-primary/5 border border-primary/20 rounded-lg">
                        <div className="flex items-start space-x-3">
                          <Icon name="Shield" size={20} className="text-primary mt-0.5" />
                          <div>
                            <h4 className="font-medium text-foreground">
                              Autenticação de Dois Fatores Ativada
                            </h4>
                            <p className="text-sm text-muted-foreground mt-1">
                              Sua conta está protegida com 2FA. Você pode gerenciar seus dispositivos autenticados.
                            </p>
                            <Button variant="outline" size="sm" className="mt-3">
                              <Icon name="Smartphone" size={16} className="mr-2" />
                              Gerenciar Dispositivos
                            </Button>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Communication Preferences */}
                <div className="border-t border-border pt-6">
                  <h3 className="text-lg font-medium text-foreground mb-4">
                    Preferências de Comunicação
                  </h3>
                  <div className="space-y-4">
                    <Checkbox
                      label="Notificações por Email"
                      description="Receber atualizações importantes por email"
                      checked={settings?.emailNotifications}
                      onChange={(checked) => updateSettings({ emailNotifications: checked })}
                    />
                  </div>
                </div>

                {/* Actions */}
                <div className="border-t border-border pt-6 flex flex-col sm:flex-row gap-3">
                  <Button variant="default">
                    <Icon name="Save" size={16} className="mr-2" />
                    Salvar Alterações
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

        export default AccountPreferences;