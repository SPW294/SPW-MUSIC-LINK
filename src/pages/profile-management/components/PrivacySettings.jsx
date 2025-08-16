import React, { useState } from 'react';
        import Button from '../../../components/ui/Button';
        import Select from '../../../components/ui/Select';
        import { Checkbox } from '../../../components/ui/Checkbox';
        import Icon from '../../../components/AppIcon';

        const PrivacySettings = ({ profile, updateProfile }) => {
          const [localProfile, setLocalProfile] = useState(profile);

          const privacyOptions = [
            {
              key: 'profileVisibility',
              title: 'Visibilidade do Perfil',
              description: 'Quem pode ver seu perfil público',
              icon: 'Eye',
              type: 'select',
              options: [
                { value: 'public', label: 'Público - Visível para todos' },
                { value: 'network', label: 'Rede - Apenas para conexões' },
                { value: 'private', label: 'Privado - Apenas eu' }
              ]
            },
            {
              key: 'showEmail',
              title: 'Mostrar Email',
              description: 'Exibir seu email no perfil público',
              icon: 'Mail',
              type: 'checkbox'
            },
            {
              key: 'showPhone',
              title: 'Mostrar Telefone',
              description: 'Exibir seu telefone no perfil público',
              icon: 'Phone',
              type: 'checkbox'
            },
            {
              key: 'showLocation',
              title: 'Mostrar Localização',
              description: 'Exibir sua cidade no perfil público',
              icon: 'MapPin',
              type: 'checkbox'
            },
            {
              key: 'allowMessages',
              title: 'Permitir Mensagens',
              description: 'Outros usuários podem enviar mensagens',
              icon: 'MessageSquare',
              type: 'checkbox'
            },
            {
              key: 'allowCollaborations',
              title: 'Convites para Colaboração',
              description: 'Receber propostas de colaboração musical',
              icon: 'Users',
              type: 'checkbox'
            },
            {
              key: 'showStatistics',
              title: 'Estatísticas Públicas',
              description: 'Mostrar número de streams e lançamentos',
              icon: 'BarChart3',
              type: 'checkbox'
            },
            {
              key: 'searchableProfile',
              title: 'Perfil Pesquisável',
              description: 'Aparecer nos resultados de busca',
              icon: 'Search',
              type: 'checkbox'
            }
          ];

          const dataManagementOptions = [
            {
              key: 'analytics',
              title: 'Coleta de Analytics',
              description: 'Permitir coleta de dados de uso para melhorar a plataforma',
              icon: 'BarChart3',
              enabled: localProfile?.dataSettings?.analytics !== false
            },
            {
              key: 'personalization',
              title: 'Personalização',
              description: 'Usar seus dados para personalizar recomendações',
              icon: 'Settings',
              enabled: localProfile?.dataSettings?.personalization !== false
            },
            {
              key: 'thirdPartySharing',
              title: 'Compartilhamento com Terceiros',
              description: 'Compartilhar dados anonimizados com parceiros',
              icon: 'Share2',
              enabled: localProfile?.dataSettings?.thirdPartySharing === true
            },
            {
              key: 'marketingData',
              title: 'Dados para Marketing',
              description: 'Usar informações para campanhas de marketing direcionadas',
              icon: 'Target',
              enabled: localProfile?.dataSettings?.marketingData === true
            }
          ];

          const handlePrivacyChange = (key, value) => {
            const updatedProfile = {
              ...localProfile,
              [key]: value
            };
            setLocalProfile(updatedProfile);
            updateProfile(updatedProfile);
          };

          const handleDataSettingChange = (key, enabled) => {
            const updatedDataSettings = {
              ...localProfile?.dataSettings,
              [key]: enabled
            };
            const updatedProfile = {
              ...localProfile,
              dataSettings: updatedDataSettings
            };
            setLocalProfile(updatedProfile);
            updateProfile(updatedProfile);
          };

          const handleExportData = () => {
            const confirmed = confirm(
              'Deseja exportar todos os seus dados? Você receberá um arquivo com todas as informações da sua conta.'
            );
            if (confirmed) {
              // Simulate data export
              setTimeout(() => {
                alert('Seus dados foram exportados! Você receberá um email com o link para download em alguns minutos.');
              }, 1000);
            }
          };

          const handleDeleteAccount = () => {
            const confirmed = confirm(
              'ATENÇÃO: Esta ação é irreversível! Todos os seus dados, músicas e histórico serão permanentemente excluídos. Tem certeza que deseja continuar?'
            );
            if (confirmed) {
              const finalConfirmation = confirm(
                'ÚLTIMA CONFIRMAÇÃO: Digite "DELETAR" na próxima tela para confirmar a exclusão da conta.'
              );
              if (finalConfirmation) {
                const userInput = prompt('Digite "DELETAR" para confirmar:');
                if (userInput === 'DELETAR') {
                  alert('Sua conta foi marcada para exclusão. Você receberá um email de confirmação em alguns minutos.');
                } else {
                  alert('Confirmação incorreta. Sua conta não foi excluída.');
                }
              }
            }
          };

          const getVisibilityDescription = (visibility) => {
            switch (visibility) {
              case 'public':
                return 'Seu perfil aparece nos resultados de busca e é visível para qualquer pessoa';
              case 'network':
                return 'Apenas pessoas conectadas à sua rede podem ver seu perfil completo';
              case 'private':
                return 'Seu perfil não é visível publicamente, apenas você pode vê-lo';
              default:
                return '';
            }
          };

          return (
            <div className="p-6 space-y-8">
              <div>
                <h2 className="text-xl font-semibold text-foreground mb-1">
                  Configurações de Privacidade
                </h2>
                <p className="text-muted-foreground">
                  Controle quem pode ver suas informações e como seus dados são utilizados
                </p>
              </div>

              {/* Profile Privacy */}
              <div className="bg-card border border-border rounded-lg p-6">
                <h3 className="text-lg font-medium text-foreground mb-4 flex items-center">
                  <Icon name="Shield" size={20} className="mr-2" />
                  Privacidade do Perfil
                </h3>

                <div className="space-y-6">
                  {privacyOptions?.map((option) => (
                    <div key={option?.key} className="flex items-start justify-between py-4 border-b border-border last:border-0">
                      <div className="flex items-start space-x-3 flex-1">
                        <div className="p-2 bg-secondary/10 rounded-lg mt-1">
                          <Icon name={option?.icon} size={18} className="text-muted-foreground" />
                        </div>
                        <div className="flex-1">
                          <h4 className="font-medium text-foreground mb-1">{option?.title}</h4>
                          <p className="text-sm text-muted-foreground mb-2">{option?.description}</p>
                          
                          {/* Special description for profile visibility */}
                          {option?.key === 'profileVisibility' && (
                            <p className="text-xs text-muted-foreground italic">
                              {getVisibilityDescription(localProfile?.[option?.key])}
                            </p>
                          )}
                        </div>
                      </div>

                      <div className="ml-4">
                        {option?.type === 'select' ? (
                          <Select
                            value={localProfile?.[option?.key] || 'public'}
                            onChange={(e) => handlePrivacyChange(option?.key, e?.target?.value)}
                            options={option?.options}
                            className="min-w-[200px]"
                          />
                        ) : (
                          <Checkbox
                            checked={localProfile?.[option?.key] !== false}
                            onChange={(e) => handlePrivacyChange(option?.key, e?.target?.checked)}
                          />
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Data Management */}
              <div className="bg-card border border-border rounded-lg p-6">
                <h3 className="text-lg font-medium text-foreground mb-4 flex items-center">
                  <Icon name="Database" size={20} className="mr-2" />
                  Gerenciamento de Dados
                </h3>

                <div className="space-y-6">
                  {dataManagementOptions?.map((option) => (
                    <div key={option?.key} className="flex items-start justify-between py-4 border-b border-border last:border-0">
                      <div className="flex items-start space-x-3 flex-1">
                        <div className="p-2 bg-secondary/10 rounded-lg mt-1">
                          <Icon name={option?.icon} size={18} className="text-muted-foreground" />
                        </div>
                        <div className="flex-1">
                          <h4 className="font-medium text-foreground mb-1">{option?.title}</h4>
                          <p className="text-sm text-muted-foreground">{option?.description}</p>
                        </div>
                      </div>

                      <div className="ml-4">
                        <Checkbox
                          checked={option?.enabled}
                          onChange={(e) => handleDataSettingChange(option?.key, e?.target?.checked)}
                        />
                      </div>
                    </div>
                  ))}
                </div>

                {/* Data Usage Summary */}
                <div className="mt-6 p-4 bg-secondary/10 rounded-lg">
                  <div className="flex items-start space-x-3">
                    <Icon name="Info" size={18} className="text-secondary mt-0.5" />
                    <div>
                      <h4 className="font-medium text-foreground mb-2">Como usamos seus dados</h4>
                      <ul className="text-sm text-muted-foreground space-y-1">
                        <li>• Melhorar a experiência da plataforma e recursos</li>
                        <li>• Fornecer analytics e insights sobre sua música</li>
                        <li>• Personalizar recomendações e conteúdo</li>
                        <li>• Garantir segurança e prevenir fraudes</li>
                        <li>• Cumprir obrigações legais e contratuais</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

              {/* Account Actions */}
              <div className="bg-card border border-border rounded-lg p-6">
                <h3 className="text-lg font-medium text-foreground mb-4 flex items-center">
                  <Icon name="FileText" size={20} className="mr-2" />
                  Controle de Dados
                </h3>

                <div className="space-y-4">
                  {/* Export Data */}
                  <div className="flex items-center justify-between p-4 border border-border rounded-lg">
                    <div>
                      <h4 className="font-medium text-foreground mb-1">Exportar Meus Dados</h4>
                      <p className="text-sm text-muted-foreground">
                        Baixe uma cópia de todos os seus dados armazenados
                      </p>
                    </div>
                    <Button
                      variant="outline"
                      onClick={handleExportData}
                      iconName="Download"
                    >
                      Exportar
                    </Button>
                  </div>

                  {/* Data Portability */}
                  <div className="flex items-center justify-between p-4 border border-border rounded-lg">
                    <div>
                      <h4 className="font-medium text-foreground mb-1">Portabilidade de Dados</h4>
                      <p className="text-sm text-muted-foreground">
                        Transferir seus dados para outra plataforma
                      </p>
                    </div>
                    <Button
                      variant="outline"
                      onClick={() => alert('Funcionalidade em desenvolvimento. Entre em contato com o suporte.')}
                      iconName="Share"
                    >
                      Solicitar
                    </Button>
                  </div>

                  {/* Delete Account */}
                  <div className="flex items-center justify-between p-4 border border-error/50 bg-error/5 rounded-lg">
                    <div>
                      <h4 className="font-medium text-error mb-1">Excluir Conta</h4>
                      <p className="text-sm text-muted-foreground">
                        Excluir permanentemente sua conta e todos os dados
                      </p>
                    </div>
                    <Button
                      variant="outline"
                      onClick={handleDeleteAccount}
                      iconName="Trash2"
                      className="border-error text-error hover:bg-error hover:text-white"
                    >
                      Excluir
                    </Button>
                  </div>
                </div>
              </div>

              {/* Privacy Tips */}
              <div className="bg-secondary/10 border border-secondary/20 rounded-lg p-4">
                <div className="flex items-start space-x-3">
                  <Icon name="Lightbulb" size={20} className="text-secondary mt-0.5" />
                  <div>
                    <h3 className="font-medium text-foreground mb-2">Dicas de Privacidade</h3>
                    <ul className="space-y-1 text-sm text-muted-foreground">
                      <li>• Revise regularmente suas configurações de privacidade</li>
                      <li>• Use perfil privado se você preferir maior controle sobre quem vê suas informações</li>
                      <li>• Considere limitar o compartilhamento de dados para marketing se valoriza privacidade</li>
                      <li>• Você pode exportar seus dados a qualquer momento</li>
                      <li>• Entre em contato conosco se tiver dúvidas sobre como usamos seus dados</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Legal Links */}
              <div className="flex flex-col sm:flex-row gap-4 pt-4 border-t border-border">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => window.open('/privacy-policy', '_blank')}
                  iconName="ExternalLink"
                  className="justify-start"
                >
                  Política de Privacidade
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => window.open('/terms-of-use', '_blank')}
                  iconName="ExternalLink"
                  className="justify-start"
                >
                  Termos de Uso
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => window.open('/cookie-policy', '_blank')}
                  iconName="ExternalLink"
                  className="justify-start"
                >
                  Política de Cookies
                </Button>
              </div>
            </div>
          );
        };

        export default PrivacySettings;