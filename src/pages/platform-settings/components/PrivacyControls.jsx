import React from 'react';
        import Icon from '../../../components/AppIcon';
        import Select from '../../../components/ui/Select';
        import { Checkbox } from '../../../components/ui/Checkbox';
        import Button from '../../../components/ui/Button';

        const PrivacyControls = ({ settings, updateSettings }) => {
          const visibilityOptions = [
            { value: 'public', label: 'Público - Visível para todos' },
            { value: 'limited', label: 'Limitado - Apenas usuários logados' },
            { value: 'private', label: 'Privado - Apenas você' }
          ];

          const collaborationOptions = [
            { value: 'everyone', label: 'Qualquer pessoa' },
            { value: 'friends-only', label: 'Apenas amigos/seguidores' },
            { value: 'invite-only', label: 'Apenas por convite' },
            { value: 'none', label: 'Não permitir' }
          ];

          const analyticsVisibilityOptions = [
            { value: 'public', label: 'Público - Estatísticas visíveis' },
            { value: 'limited', label: 'Limitado - Apenas números gerais' },
            { value: 'private', label: 'Privado - Ocultar todas as estatísticas' }
          ];

          return (
            <div className="p-6 space-y-8">
              {/* Section Header */}
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                  <Icon name="Lock" size={20} className="text-primary" />
                </div>
                <div>
                  <h2 className="text-xl font-semibold text-foreground">
                    Controles de Privacidade
                  </h2>
                  <p className="text-sm text-muted-foreground">
                    Gerencie privacidade, compartilhamento de dados e permissões de colaboração
                  </p>
                </div>
              </div>

              {/* Profile Visibility */}
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-medium text-foreground mb-4">
                    Visibilidade do Perfil
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Select
                      label="Visibilidade do Perfil"
                      value={settings?.profileVisibility}
                      options={visibilityOptions}
                      onChange={(value) => updateSettings({ profileVisibility: value })}
                      description="Quem pode ver seu perfil público"
                    />
                    
                    <Select
                      label="Visibilidade das Analytics"
                      value={settings?.analyticsVisibility}
                      options={analyticsVisibilityOptions}
                      onChange={(value) => updateSettings({ analyticsVisibility: value })}
                      description="Quem pode ver suas estatísticas de reprodução"
                    />
                  </div>
                </div>

                {/* Data Sharing */}
                <div className="border-t border-border pt-6">
                  <h3 className="text-lg font-medium text-foreground mb-4">
                    Compartilhamento de Dados
                  </h3>
                  <div className="space-y-4">
                    <Checkbox
                      label="Compartilhamento de Dados Agregados"
                      description="Permitir uso de dados anonimizados para insights da indústria"
                      checked={settings?.dataSharing}
                      onChange={(checked) => updateSettings({ dataSharing: checked })}
                    />
                    
                    <Checkbox
                      label="Consentimento para Marketing"
                      description="Permitir uso dos dados para comunicações de marketing personalizadas"
                      checked={settings?.marketingConsent}
                      onChange={(checked) => updateSettings({ marketingConsent: checked })}
                    />

                    {settings?.dataSharing && (
                      <div className="p-4 bg-info/5 border border-info/20 rounded-lg">
                        <div className="flex items-start space-x-3">
                          <Icon name="Info" size={20} className="text-info mt-0.5" />
                          <div>
                            <h4 className="font-medium text-foreground">
                              Dados Compartilhados
                            </h4>
                            <p className="text-sm text-muted-foreground mt-1">
                              Apenas dados agregados e anonimizados são compartilhados. 
                              Isso inclui tendências de gênero, estatísticas regionais e comportamentos gerais de streaming.
                            </p>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Collaboration Permissions */}
                <div className="border-t border-border pt-6">
                  <h3 className="text-lg font-medium text-foreground mb-4">
                    Permissões de Colaboração
                  </h3>
                  <div className="space-y-6">
                    <Select
                      label="Solicitações de Colaboração"
                      value={settings?.collaborationPermissions}
                      options={collaborationOptions}
                      onChange={(value) => updateSettings({ collaborationPermissions: value })}
                      description="Quem pode enviar solicitações de colaboração"
                    />

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="p-4 bg-card border border-border rounded-lg">
                        <h4 className="font-medium text-foreground mb-2">
                          Colaborações Ativas
                        </h4>
                        <p className="text-sm text-muted-foreground mb-3">
                          Você tem 3 colaborações ativas
                        </p>
                        <Button variant="outline" size="sm" fullWidth>
                          <Icon name="Users" size={16} className="mr-2" />
                          Gerenciar Colaborações
                        </Button>
                      </div>
                      
                      <div className="p-4 bg-card border border-border rounded-lg">
                        <h4 className="font-medium text-foreground mb-2">
                          Solicitações Pendentes
                        </h4>
                        <p className="text-sm text-muted-foreground mb-3">
                          2 solicitações aguardando resposta
                        </p>
                        <Button variant="outline" size="sm" fullWidth>
                          <Icon name="Clock" size={16} className="mr-2" />
                          Ver Solicitações
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Data Rights */}
                <div className="border-t border-border pt-6">
                  <h3 className="text-lg font-medium text-foreground mb-4">
                    Direitos sobre seus Dados
                  </h3>
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="p-4 bg-card border border-border rounded-lg">
                        <div className="flex items-center justify-between">
                          <div>
                            <h4 className="font-medium text-foreground">
                              Exportar Dados
                            </h4>
                            <p className="text-sm text-muted-foreground">
                              Baixar todos os seus dados em formato JSON
                            </p>
                          </div>
                          <Button variant="outline" size="sm">
                            <Icon name="Download" size={16} className="mr-2" />
                            Exportar
                          </Button>
                        </div>
                      </div>
                      
                      <div className="p-4 bg-card border border-border rounded-lg">
                        <div className="flex items-center justify-between">
                          <div>
                            <h4 className="font-medium text-foreground">
                              Relatório de Privacidade
                            </h4>
                            <p className="text-sm text-muted-foreground">
                              Detalhes sobre coleta e uso dos dados
                            </p>
                          </div>
                          <Button variant="outline" size="sm">
                            <Icon name="FileText" size={16} className="mr-2" />
                            Ver Relatório
                          </Button>
                        </div>
                      </div>
                    </div>

                    <div className="p-4 bg-destructive/5 border border-destructive/20 rounded-lg">
                      <div className="flex items-start space-x-3">
                        <Icon name="AlertTriangle" size={20} className="text-destructive mt-0.5" />
                        <div className="flex-1">
                          <h4 className="font-medium text-foreground">
                            Direito ao Esquecimento
                          </h4>
                          <p className="text-sm text-muted-foreground mt-1">
                            Você pode solicitar a remoção completa de todos os seus dados. 
                            Esta ação é irreversível e resultará no encerramento da conta.
                          </p>
                          <Button variant="destructive" size="sm" className="mt-3">
                            <Icon name="Trash2" size={16} className="mr-2" />
                            Solicitar Remoção de Dados
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Cookie & Tracking */}
                <div className="border-t border-border pt-6">
                  <h3 className="text-lg font-medium text-foreground mb-4">
                    Cookies e Rastreamento
                  </h3>
                  <div className="space-y-4">
                    <div className="p-4 bg-card border border-border rounded-lg">
                      <div className="flex items-center justify-between mb-3">
                        <h4 className="font-medium text-foreground">
                          Preferências de Cookie
                        </h4>
                        <Button variant="outline" size="sm">
                          <Icon name="Settings" size={16} className="mr-2" />
                          Configurar
                        </Button>
                      </div>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between items-center">
                          <span className="text-muted-foreground">Cookies Essenciais</span>
                          <span className="text-success">Ativo</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-muted-foreground">Cookies de Analytics</span>
                          <span className="text-success">Ativo</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-muted-foreground">Cookies de Marketing</span>
                          <span className="text-muted-foreground">Inativo</span>
                        </div>
                      </div>
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
                    <Icon name="Shield" size={16} className="mr-2" />
                    Política de Privacidade
                  </Button>
                  <Button variant="outline">
                    <Icon name="FileText" size={16} className="mr-2" />
                    Termos de Uso
                  </Button>
                </div>
              </div>
            </div>
          );
        };

        export default PrivacyControls;