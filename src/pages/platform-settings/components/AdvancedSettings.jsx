import React, { useState } from 'react';
        import Icon from '../../../components/AppIcon';
        import Select from '../../../components/ui/Select';
        import { Checkbox } from '../../../components/ui/Checkbox';
        import Button from '../../../components/ui/Button';
        import Input from '../../../components/ui/Input';

        const AdvancedSettings = ({ settings, updateSettings }) => {
          const [apiKey, setApiKey] = useState('');
          const [showApiKey, setShowApiKey] = useState(false);

          const performanceModeOptions = [
            { value: 'performance', label: 'Performance - Máxima velocidade' },
            { value: 'balanced', label: 'Balanceado - Velocidade e bateria' },
            { value: 'economy', label: 'Economia - Menor consumo' }
          ];

          const generateApiKey = () => {
            const newKey = 'spw_' + Array(32)?.fill(0)?.map(() => Math.random()?.toString(36)?.charAt(0))?.join('');
            setApiKey(newKey);
          };

          const handleDangerousAction = (action) => {
            const confirmation = window.confirm(`Tem certeza que deseja ${action}? Esta ação não pode ser desfeita.`);
            if (confirmation) {
              console.log(`Executing: ${action}`);
              // Simulate action execution
            }
          };

          return (
            <div className="p-6 space-y-8">
              {/* Section Header */}
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                  <Icon name="Settings" size={20} className="text-primary" />
                </div>
                <div>
                  <h2 className="text-xl font-semibold text-foreground">
                    Configurações Avançadas
                  </h2>
                  <p className="text-sm text-muted-foreground">
                    Opções para usuários experientes, incluindo acesso à API e recursos beta
                  </p>
                </div>
              </div>
              {/* Developer Mode */}
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-medium text-foreground mb-4">
                    Modo Desenvolvedor
                  </h3>
                  <div className="space-y-4">
                    <Checkbox
                      label="Ativar Modo Desenvolvedor"
                      description="Habilita recursos avançados para desenvolvedores e integrações"
                      checked={settings?.developerMode}
                      onChange={(checked) => updateSettings({ developerMode: checked })}
                    />
                    
                    <Checkbox
                      label="Modo Debug"
                      description="Exibe logs detalhados e informações de depuração"
                      checked={settings?.debugMode}
                      onChange={(checked) => updateSettings({ debugMode: checked })}
                    />

                    {settings?.developerMode && (
                      <div className="p-4 bg-info/5 border border-info/20 rounded-lg">
                        <div className="flex items-start space-x-3">
                          <Icon name="Code" size={20} className="text-info mt-0.5" />
                          <div>
                            <h4 className="font-medium text-foreground">
                              Modo Desenvolvedor Ativo
                            </h4>
                            <p className="text-sm text-muted-foreground mt-1">
                              Você agora tem acesso a recursos de desenvolvedor, incluindo API, webhooks e logs detalhados.
                            </p>
                            <div className="mt-3 space-x-3">
                              <Button variant="outline" size="sm">
                                <Icon name="Book" size={16} className="mr-2" />
                                Documentação
                              </Button>
                              <Button variant="outline" size="sm">
                                <Icon name="Terminal" size={16} className="mr-2" />
                                Console
                              </Button>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* API Access */}
                {settings?.developerMode && (
                  <div className="border-t border-border pt-6">
                    <h3 className="text-lg font-medium text-foreground mb-4">
                      Acesso à API
                    </h3>
                    <div className="space-y-6">
                      <Checkbox
                        label="Habilitar Acesso à API"
                        description="Permite fazer chamadas para a API da plataforma"
                        checked={settings?.apiAccess}
                        onChange={(checked) => updateSettings({ apiAccess: checked })}
                      />

                      {settings?.apiAccess && (
                        <div className="space-y-4">
                          <div className="p-4 bg-card border border-border rounded-lg">
                            <div className="flex items-center justify-between mb-3">
                              <h4 className="font-medium text-foreground">
                                Chave da API
                              </h4>
                              <Button 
                                onClick={generateApiKey}
                                variant="outline" 
                                size="sm"
                              >
                                <Icon name="RefreshCw" size={16} className="mr-2" />
                                Gerar Nova Chave
                              </Button>
                            </div>
                            
                            {apiKey && (
                              <div className="relative">
                                <Input
                                  value={apiKey}
                                  type={showApiKey ? 'text' : 'password'}
                                  readOnly
                                  className="font-mono text-sm pr-20"
                                />
                                <div className="absolute inset-y-0 right-0 flex items-center space-x-1 pr-3">
                                  <button
                                    onClick={() => setShowApiKey(!showApiKey)}
                                    className="text-muted-foreground hover:text-foreground"
                                  >
                                    <Icon name={showApiKey ? 'EyeOff' : 'Eye'} size={16} />
                                  </button>
                                  <button
                                    onClick={() => navigator.clipboard?.writeText(apiKey)}
                                    className="text-muted-foreground hover:text-foreground"
                                  >
                                    <Icon name="Copy" size={16} />
                                  </button>
                                </div>
                              </div>
                            )}
                            
                            <p className="text-sm text-muted-foreground mt-2">
                              Use esta chave para autenticar suas requisições à API. 
                              Mantenha-a segura e não a compartilhe.
                            </p>
                          </div>

                          <Input
                            label="Webhook URL"
                            placeholder="https://seusite.com/webhook"
                            value={settings?.webhookUrl}
                            onChange={(e) => updateSettings({ webhookUrl: e?.target?.value })}
                            description="URL para receber notificações de eventos via webhook"
                          />
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {/* Beta Features */}
                <div className="border-t border-border pt-6">
                  <h3 className="text-lg font-medium text-foreground mb-4">
                    Recursos Beta
                  </h3>
                  <div className="space-y-4">
                    <Checkbox
                      label="Participar do Programa Beta"
                      description="Acesso antecipado a novos recursos em desenvolvimento"
                      checked={settings?.betaFeatures}
                      onChange={(checked) => updateSettings({ betaFeatures: checked })}
                    />

                    {settings?.betaFeatures && (
                      <div className="p-4 bg-warning/5 border border-warning/20 rounded-lg">
                        <div className="flex items-start space-x-3">
                          <Icon name="TestTube" size={20} className="text-warning mt-0.5" />
                          <div>
                            <h4 className="font-medium text-foreground">
                              Programa Beta Ativo
                            </h4>
                            <p className="text-sm text-muted-foreground mt-1">
                              Você está participando do programa beta. Recursos podem estar instáveis 
                              e seus dados podem ser usados para testes e melhorias.
                            </p>
                            <Button variant="outline" size="sm" className="mt-3">
                              <Icon name="MessageSquare" size={16} className="mr-2" />
                              Enviar Feedback
                            </Button>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Performance Settings */}
                <div className="border-t border-border pt-6">
                  <h3 className="text-lg font-medium text-foreground mb-4">
                    Configurações de Performance
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Select
                      label="Modo de Performance"
                      value={settings?.performanceMode}
                      options={performanceModeOptions}
                      onChange={(value) => updateSettings({ performanceMode: value })}
                      description="Balanceamento entre velocidade e consumo de recursos"
                    />
                  </div>
                </div>

                {/* Data Management */}
                <div className="border-t border-border pt-6">
                  <h3 className="text-lg font-medium text-foreground mb-4">
                    Gerenciamento de Dados
                  </h3>
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="p-4 bg-card border border-border rounded-lg">
                        <div className="flex items-center justify-between">
                          <div>
                            <h4 className="font-medium text-foreground">
                              Limpar Cache
                            </h4>
                            <p className="text-sm text-muted-foreground">
                              Remove arquivos temporários e cache local
                            </p>
                          </div>
                          <Button variant="outline" size="sm">
                            <Icon name="Trash2" size={16} className="mr-2" />
                            Limpar
                          </Button>
                        </div>
                      </div>
                      
                      <div className="p-4 bg-card border border-border rounded-lg">
                        <div className="flex items-center justify-between">
                          <div>
                            <h4 className="font-medium text-foreground">
                              Exportar Dados
                            </h4>
                            <p className="text-sm text-muted-foreground">
                              Download completo de todos os dados da conta
                            </p>
                          </div>
                          <Button variant="outline" size="sm">
                            <Icon name="Download" size={16} className="mr-2" />
                            Exportar
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Danger Zone */}
                <div className="border-t border-destructive/20 pt-6">
                  <h3 className="text-lg font-medium text-destructive mb-4">
                    Zona de Perigo
                  </h3>
                  <div className="space-y-4">
                    <div className="p-4 bg-destructive/5 border border-destructive/20 rounded-lg">
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <h4 className="font-medium text-foreground">
                              Resetar Todas as Configurações
                            </h4>
                            <p className="text-sm text-muted-foreground">
                              Restaura todas as configurações para os valores padrão
                            </p>
                          </div>
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => handleDangerousAction('resetar todas as configurações')}
                            className="border-destructive text-destructive hover:bg-destructive/10"
                          >
                            <Icon name="RotateCcw" size={16} className="mr-2" />
                            Resetar Tudo
                          </Button>
                        </div>
                        
                        <hr className="border-destructive/20" />
                        
                        <div className="flex items-center justify-between">
                          <div>
                            <h4 className="font-medium text-foreground">
                              Excluir Conta Permanentemente
                            </h4>
                            <p className="text-sm text-muted-foreground">
                              Remove permanentemente sua conta e todos os dados associados
                            </p>
                          </div>
                          <Button 
                            variant="destructive" 
                            size="sm"
                            onClick={() => handleDangerousAction('excluir a conta permanentemente')}
                          >
                            <Icon name="Trash2" size={16} className="mr-2" />
                            Excluir Conta
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="border-t border-border pt-6 flex flex-col sm:flex-row gap-3">
                  <Button variant="default">
                    <Icon name="Save" size={16} className="mr-2" />
                    Salvar Configurações Avançadas
                  </Button>
                  <Button variant="outline">
                    <Icon name="FileText" size={16} className="mr-2" />
                    Log de Atividades
                  </Button>
                  <Button variant="outline">
                    <Icon name="HelpCircle" size={16} className="mr-2" />
                    Ajuda Avançada
                  </Button>
                </div>
              </div>
            </div>
          );
        };

        export default AdvancedSettings;