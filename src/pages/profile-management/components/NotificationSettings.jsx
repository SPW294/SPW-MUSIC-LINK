import React, { useState } from 'react';
        import Button from '../../../components/ui/Button';
        import { Checkbox } from '../../../components/ui/Checkbox';
        import Select from '../../../components/ui/Select';
        import Icon from '../../../components/AppIcon';

        const NotificationSettings = ({ profile, updateProfile }) => {
          const [localProfile, setLocalProfile] = useState(profile);

          const notificationCategories = [
            {
              key: 'payments',
              title: 'Pagamentos e Royalties',
              description: 'Notificações sobre receitas, pagamentos e relatórios financeiros',
              icon: 'DollarSign',
              color: 'text-green-500',
              settings: [
                { key: 'paymentReceived', label: 'Pagamento recebido', critical: true },
                { key: 'monthlyReport', label: 'Relatório mensal de receitas', critical: false },
                { key: 'paymentIssues', label: 'Problemas com pagamentos', critical: true },
                { key: 'royaltyUpdates', label: 'Atualizações de royalties', critical: false }
              ]
            },
            {
              key: 'releases',
              title: 'Lançamentos e Distribuição',
              description: 'Status de uploads, aprovações e disponibilidade nas plataformas',
              icon: 'Music',
              color: 'text-blue-500',
              settings: [
                { key: 'releaseApproved', label: 'Lançamento aprovado', critical: false },
                { key: 'releaseRejected', label: 'Lançamento rejeitado', critical: true },
                { key: 'releaseProcessing', label: 'Status de processamento', critical: false },
                { key: 'platformAvailable', label: 'Disponível nas plataformas', critical: false }
              ]
            },
            {
              key: 'analytics',
              title: 'Analytics e Performance',
              description: 'Insights sobre streams, downloads e performance das músicas',
              icon: 'BarChart3',
              color: 'text-purple-500',
              settings: [
                { key: 'weeklyStats', label: 'Relatório semanal', critical: false },
                { key: 'milestones', label: 'Marcos importantes (1K, 10K streams)', critical: false },
                { key: 'trendingAlert', label: 'Música em alta', critical: false },
                { key: 'newFollowers', label: 'Novos seguidores', critical: false }
              ]
            },
            {
              key: 'account',
              title: 'Conta e Segurança',
              description: 'Alterações na conta, login e configurações de segurança',
              icon: 'Shield',
              color: 'text-red-500',
              settings: [
                { key: 'loginAlert', label: 'Novo login detectado', critical: true },
                { key: 'passwordChanged', label: 'Senha alterada', critical: true },
                { key: 'profileUpdated', label: 'Perfil atualizado', critical: false },
                { key: 'subscriptionChanges', label: 'Alterações no plano', critical: true }
              ]
            },
            {
              key: 'marketing',
              title: 'Marketing e Promoções',
              description: 'Novidades da plataforma, dicas e oportunidades promocionais',
              icon: 'Megaphone',
              color: 'text-orange-500',
              settings: [
                { key: 'platformNews', label: 'Novidades da plataforma', critical: false },
                { key: 'promotionalOffers', label: 'Ofertas promocionais', critical: false },
                { key: 'industryTips', label: 'Dicas da indústria musical', critical: false },
                { key: 'partnerships', label: 'Oportunidades de parceria', critical: false }
              ]
            },
            {
              key: 'collaboration',
              title: 'Colaborações e Rede',
              description: 'Convites para colaboração, mensagens e atividades da rede',
              icon: 'Users',
              color: 'text-cyan-500',
              settings: [
                { key: 'collabInvites', label: 'Convites para colaboração', critical: false },
                { key: 'networkMessages', label: 'Mensagens da rede', critical: false },
                { key: 'followRequests', label: 'Solicitações para seguir', critical: false },
                { key: 'mentions', label: 'Menções e tags', critical: false }
              ]
            }
          ];

          const timeOptions = [
            { value: 'immediate', label: 'Imediato' },
            { value: 'daily', label: 'Resumo diário (9h)' },
            { value: 'weekly', label: 'Resumo semanal (segunda)' },
            { value: 'monthly', label: 'Resumo mensal' }
          ];

          const handleNotificationChange = (category, setting, type, value) => {
            const updatedNotifications = {
              ...localProfile?.notifications,
              [`${category}_${setting}_${type}`]: value
            };
            
            const updatedProfile = {
              ...localProfile,
              notifications: updatedNotifications
            };
            
            setLocalProfile(updatedProfile);
            updateProfile(updatedProfile);
          };

          const handleCategoryToggle = (category, enabled) => {
            const updatedNotifications = { ...localProfile?.notifications };
            
            notificationCategories
              ?.find(cat => cat?.key === category)
              ?.settings?.forEach(setting => {
                updatedNotifications[`${category}_${setting?.key}_email`] = enabled;
                updatedNotifications[`${category}_${setting?.key}_push`] = enabled;
              });
            
            const updatedProfile = {
              ...localProfile,
              notifications: updatedNotifications
            };
            
            setLocalProfile(updatedProfile);
            updateProfile(updatedProfile);
          };

          const isCategoryEnabled = (category) => {
            const categorySettings = notificationCategories
              ?.find(cat => cat?.key === category)
              ?.settings || [];
            
            return categorySettings?.some(setting => 
              localProfile?.notifications?.[`${category}_${setting?.key}_email`] ||
              localProfile?.notifications?.[`${category}_${setting?.key}_push`]
            );
          };

          const getEnabledCount = () => {
            let count = 0;
            notificationCategories?.forEach(category => {
              category?.settings?.forEach(setting => {
                if (localProfile?.notifications?.[`${category?.key}_${setting?.key}_email`] ||
                    localProfile?.notifications?.[`${category?.key}_${setting?.key}_push`]) {
                  count++;
                }
              });
            });
            return count;
          };

          const getTotalCount = () => {
            return notificationCategories?.reduce((total, category) => 
              total + category?.settings?.length, 0
            );
          };

          return (
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-xl font-semibold text-foreground mb-1">
                    Configurações de Notificação
                  </h2>
                  <p className="text-muted-foreground">
                    Personalize como e quando você recebe notificações
                  </p>
                </div>

                {/* Notification Status */}
                <div className="text-right">
                  <div className="text-sm text-muted-foreground mb-1">
                    Notificações ativas
                  </div>
                  <div className="text-lg font-semibold text-primary">
                    {getEnabledCount()}/{getTotalCount()}
                  </div>
                </div>
              </div>

              {/* Global Settings */}
              <div className="bg-card border border-border rounded-lg p-4 mb-6">
                <h3 className="font-medium text-foreground mb-4">Configurações Gerais</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <Select
                    label="Frequência de Email"
                    name="emailFrequency"
                    value={localProfile?.notifications?.emailFrequency || 'immediate'}
                    onChange={(e) => handleNotificationChange('global', 'emailFrequency', '', e?.target?.value)}
                    options={timeOptions}
                  />
                  
                  <Select
                    label="Horário de Notificações Push"
                    name="pushHours"
                    value={localProfile?.notifications?.pushHours || 'always'}
                    onChange={(e) => handleNotificationChange('global', 'pushHours', '', e?.target?.value)}
                    options={[
                      { value: 'always', label: 'Sempre' },
                      { value: 'business', label: 'Horário comercial (9h-18h)' },
                      { value: 'evening', label: 'Apenas à noite (18h-22h)' },
                      { value: 'custom', label: 'Personalizado' }
                    ]}
                  />
                </div>

                <div className="flex flex-col sm:flex-row gap-4">
                  <Checkbox
                    name="doNotDisturb"
                    checked={localProfile?.notifications?.doNotDisturb || false}
                    onChange={(e) => handleNotificationChange('global', 'doNotDisturb', '', e?.target?.checked)}
                    label="Não perturbe (22h-8h)"
                  />
                  
                  <Checkbox
                    name="soundEnabled"
                    checked={localProfile?.notifications?.soundEnabled !== false}
                    onChange={(e) => handleNotificationChange('global', 'soundEnabled', '', e?.target?.checked)}
                    label="Sons de notificação"
                  />
                </div>
              </div>

              {/* Notification Categories */}
              <div className="space-y-6">
                {notificationCategories?.map((category) => {
                  const isEnabled = isCategoryEnabled(category?.key);
                  
                  return (
                    <div key={category?.key} className="bg-card border border-border rounded-lg overflow-hidden">
                      {/* Category Header */}
                      <div className="p-4 border-b border-border">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-3">
                            <div className={`p-2 rounded-lg bg-secondary/10`}>
                              <Icon name={category?.icon} size={20} className={category?.color} />
                            </div>
                            <div>
                              <h3 className="font-medium text-foreground">{category?.title}</h3>
                              <p className="text-sm text-muted-foreground">{category?.description}</p>
                            </div>
                          </div>
                          
                          <div className="flex items-center space-x-3">
                            <Button
                              variant={isEnabled ? "default" : "outline"}
                              size="sm"
                              onClick={() => handleCategoryToggle(category?.key, !isEnabled)}
                            >
                              {isEnabled ? 'Ativo' : 'Inativo'}
                            </Button>
                          </div>
                        </div>
                      </div>

                      {/* Category Settings */}
                      <div className="p-4">
                        <div className="space-y-4">
                          {/* Header Row */}
                          <div className="grid grid-cols-12 gap-4 text-sm font-medium text-muted-foreground border-b border-border pb-2">
                            <div className="col-span-6">Notificação</div>
                            <div className="col-span-3 text-center">Email</div>
                            <div className="col-span-3 text-center">Push</div>
                          </div>

                          {/* Settings Rows */}
                          {category?.settings?.map((setting) => {
                            const emailKey = `${category?.key}_${setting?.key}_email`;
                            const pushKey = `${category?.key}_${setting?.key}_push`;
                            
                            return (
                              <div key={setting?.key} className="grid grid-cols-12 gap-4 items-center py-2 hover:bg-muted/30 rounded transition-colors">
                                <div className="col-span-6">
                                  <div className="flex items-center space-x-2">
                                    <span className="text-sm text-foreground">{setting?.label}</span>
                                    {setting?.critical && (
                                      <div className="px-1.5 py-0.5 bg-error/10 text-error text-xs rounded-full">
                                        Importante
                                      </div>
                                    )}
                                  </div>
                                </div>
                                
                                <div className="col-span-3 flex justify-center">
                                  <Checkbox
                                    name={emailKey}
                                    checked={localProfile?.notifications?.[emailKey] || false}
                                    onChange={(e) => handleNotificationChange(category?.key, setting?.key, 'email', e?.target?.checked)}
                                  />
                                </div>
                                
                                <div className="col-span-3 flex justify-center">
                                  <Checkbox
                                    name={pushKey}
                                    checked={localProfile?.notifications?.[pushKey] || false}
                                    onChange={(e) => handleNotificationChange(category?.key, setting?.key, 'push', e?.target?.checked)}
                                  />
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Quick Actions */}
              <div className="mt-8 flex flex-col sm:flex-row gap-3">
                <Button
                  variant="outline"
                  onClick={() => {
                    // Enable all critical notifications
                    const updatedNotifications = { ...localProfile?.notifications };
                    notificationCategories?.forEach(category => {
                      category?.settings?.forEach(setting => {
                        if (setting?.critical) {
                          updatedNotifications[`${category?.key}_${setting?.key}_email`] = true;
                          updatedNotifications[`${category?.key}_${setting?.key}_push`] = true;
                        }
                      });
                    });
                    updateProfile({ ...localProfile, notifications: updatedNotifications });
                    setLocalProfile({ ...localProfile, notifications: updatedNotifications });
                  }}
                  iconName="Shield"
                  iconPosition="left"
                  className="flex-1"
                >
                  Ativar Essenciais
                </Button>
                
                <Button
                  variant="outline"
                  onClick={() => {
                    // Disable all non-critical notifications
                    const updatedNotifications = { ...localProfile?.notifications };
                    notificationCategories?.forEach(category => {
                      category?.settings?.forEach(setting => {
                        if (!setting?.critical) {
                          updatedNotifications[`${category?.key}_${setting?.key}_email`] = false;
                          updatedNotifications[`${category?.key}_${setting?.key}_push`] = false;
                        }
                      });
                    });
                    updateProfile({ ...localProfile, notifications: updatedNotifications });
                    setLocalProfile({ ...localProfile, notifications: updatedNotifications });
                  }}
                  iconName="VolumeX"
                  iconPosition="left"
                  className="flex-1"
                >
                  Silenciar Opcionais
                </Button>
              </div>

              {/* Info Section */}
              <div className="mt-6 bg-secondary/10 border border-secondary/20 rounded-lg p-4">
                <div className="flex items-start space-x-3">
                  <Icon name="Info" size={20} className="text-secondary mt-0.5" />
                  <div>
                    <h3 className="font-medium text-foreground mb-2">Sobre as Notificações</h3>
                    <ul className="space-y-1 text-sm text-muted-foreground">
                      <li>• <strong>Importantes:</strong> Notificações críticas para segurança e pagamentos</li>
                      <li>• <strong>Email:</strong> Receba por email com possibilidade de resumos</li>
                      <li>• <strong>Push:</strong> Notificações instantâneas no navegador ou app</li>
                      <li>• Você pode ajustar as configurações a qualquer momento</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          );
        };

        export default NotificationSettings;