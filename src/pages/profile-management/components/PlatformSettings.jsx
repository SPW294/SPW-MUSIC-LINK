import React, { useState } from 'react';
        import Button from '../../../components/ui/Button';
        import Select from '../../../components/ui/Select';
        import { Checkbox } from '../../../components/ui/Checkbox';
        import Input from '../../../components/ui/Input';
        import Icon from '../../../components/AppIcon';

        const PlatformSettings = ({ profile, updateProfile }) => {
          const [localProfile, setLocalProfile] = useState(profile);

          const distributionSettings = [
            {
              key: 'autoDistribution',
              title: 'Distribuição Automática',
              description: 'Enviar automaticamente para todas as plataformas conectadas',
              icon: 'Zap',
              type: 'checkbox'
            },
            {
              key: 'qualityCheck',
              title: 'Verificação de Qualidade',
              description: 'Análise automática de qualidade de áudio antes da distribuição',
              icon: 'CheckCircle',
              type: 'checkbox'
            },
            {
              key: 'metadataValidation',
              title: 'Validação de Metadados',
              description: 'Verificar informações obrigatórias antes do envio',
              icon: 'FileCheck',
              type: 'checkbox'
            },
            {
              key: 'copyrightProtection',
              title: 'Proteção de Direitos Autorais',
              description: 'Monitoramento automático de uso não autorizado',
              icon: 'Shield',
              type: 'checkbox'
            }
          ];

          const releaseTypes = [
            { value: 'single', label: 'Single' },
            { value: 'ep', label: 'EP' },
            { value: 'album', label: 'Álbum' },
            { value: 'compilation', label: 'Compilação' }
          ];

          const musicGenres = [
            'Pop', 'Rock', 'Hip Hop', 'Eletrônica', 'Sertanejo', 'Funk', 'MPB', 
            'Samba', 'Bossa Nova', 'Forró', 'Pagode', 'Gospel', 'Jazz', 'Blues',
            'Reggae', 'Indie', 'Alternative', 'Classical', 'Folk', 'R&B'
          ];

          const platforms = [
            {
              name: 'Spotify',
              key: 'spotify',
              icon: 'Music',
              connected: true,
              settings: {
                autoSubmitPlaylists: true,
                releaseRadar: true,
                preReleasePromo: false
              }
            },
            {
              name: 'Apple Music',
              key: 'apple',
              icon: 'Music',
              connected: true,
              settings: {
                autoSubmitPlaylists: true,
                newMusicMix: true,
                preReleasePromo: true
              }
            },
            {
              name: 'YouTube Music',
              key: 'youtube',
              icon: 'Play',
              connected: true,
              settings: {
                contentID: true,
                autoGenerate: false,
                shorts: true
              }
            },
            {
              name: 'TikTok',
              key: 'tiktok',
              icon: 'Video',
              connected: false,
              settings: {
                commercialMusic: false,
                clipPreview: true
              }
            },
            {
              name: 'Instagram',
              key: 'instagram',
              icon: 'Instagram',
              connected: true,
              settings: {
                stories: true,
                reels: true,
                posts: false
              }
            }
          ];

          const handleSettingChange = (key, value) => {
            const updatedSettings = {
              ...localProfile?.platformSettings,
              [key]: value
            };
            const updatedProfile = {
              ...localProfile,
              platformSettings: updatedSettings
            };
            setLocalProfile(updatedProfile);
            updateProfile(updatedProfile);
          };

          const handlePlatformSettingChange = (platformKey, settingKey, value) => {
            const updatedPlatforms = {
              ...localProfile?.platformConnections,
              [platformKey]: {
                ...localProfile?.platformConnections?.[platformKey],
                [settingKey]: value
              }
            };
            const updatedProfile = {
              ...localProfile,
              platformConnections: updatedPlatforms
            };
            setLocalProfile(updatedProfile);
            updateProfile(updatedProfile);
          };

          const resetToDefaults = () => {
            const confirmed = confirm('Tem certeza que deseja resetar todas as configurações para os valores padrão?');
            if (confirmed) {
              const defaultSettings = {
                defaultReleaseType: 'single',
                defaultGenre: 'Pop',
                autoDistribution: false,
                qualityCheck: true,
                metadataValidation: true,
                copyrightProtection: true
              };
              
              const updatedProfile = {
                ...localProfile,
                platformSettings: defaultSettings
              };
              setLocalProfile(updatedProfile);
              updateProfile(updatedProfile);
              
              alert('Configurações resetadas para os valores padrão!');
            }
          };

          const exportSettings = () => {
            const settings = {
              platformSettings: localProfile?.platformSettings,
              platformConnections: localProfile?.platformConnections
            };
            
            const dataStr = JSON.stringify(settings, null, 2);
            const dataBlob = new Blob([dataStr], { type: 'application/json' });
            
            const url = URL.createObjectURL(dataBlob);
            const link = document.createElement('a');
            link.href = url;
            link.download = 'platform-settings.json';
            link?.click();
            
            URL.revokeObjectURL(url);
            alert('Configurações exportadas com sucesso!');
          };

          return (
            <div className="p-6 space-y-8">
              <div>
                <h2 className="text-xl font-semibold text-foreground mb-1">
                  Configurações da Plataforma
                </h2>
                <p className="text-muted-foreground">
                  Personalize como suas músicas são processadas e distribuídas
                </p>
              </div>
              {/* Default Settings */}
              <div className="bg-card border border-border rounded-lg p-6">
                <h3 className="text-lg font-medium text-foreground mb-4 flex items-center">
                  <Icon name="Settings" size={20} className="mr-2" />
                  Configurações Padrão
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <Select
                    label="Tipo de Lançamento Padrão"
                    value={localProfile?.platformSettings?.defaultReleaseType || 'single'}
                    onChange={(e) => handleSettingChange('defaultReleaseType', e?.target?.value)}
                    options={releaseTypes}
                  />

                  <Select
                    label="Gênero Musical Padrão"
                    value={localProfile?.platformSettings?.defaultGenre || 'Pop'}
                    onChange={(e) => handleSettingChange('defaultGenre', e?.target?.value)}
                    options={musicGenres?.map(genre => ({ value: genre, label: genre }))}
                  />
                </div>

                {/* Distribution Settings */}
                <div className="space-y-4">
                  <h4 className="font-medium text-foreground">Processamento e Distribuição</h4>
                  {distributionSettings?.map((setting) => (
                    <div key={setting?.key} className="flex items-start justify-between py-3 border-b border-border last:border-0">
                      <div className="flex items-start space-x-3 flex-1">
                        <div className="p-2 bg-secondary/10 rounded-lg mt-1">
                          <Icon name={setting?.icon} size={18} className="text-muted-foreground" />
                        </div>
                        <div>
                          <h5 className="font-medium text-foreground mb-1">{setting?.title}</h5>
                          <p className="text-sm text-muted-foreground">{setting?.description}</p>
                        </div>
                      </div>
                      <div className="ml-4">
                        <Checkbox
                          checked={localProfile?.platformSettings?.[setting?.key] !== false}
                          onChange={(e) => handleSettingChange(setting?.key, e?.target?.checked)}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              {/* Platform Connections */}
              <div className="bg-card border border-border rounded-lg p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-medium text-foreground flex items-center">
                    <Icon name="Globe" size={20} className="mr-2" />
                    Plataformas Conectadas
                  </h3>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => alert('Funcionalidade de conectar nova plataforma em desenvolvimento')}
                    iconName="Plus"
                  >
                    Conectar Nova
                  </Button>
                </div>

                <div className="space-y-6">
                  {platforms?.map((platform) => (
                    <div key={platform?.key} className="border border-border rounded-lg overflow-hidden">
                      {/* Platform Header */}
                      <div className={`p-4 ${platform?.connected ? 'bg-success/5 border-b border-border' : 'bg-muted/20'}`}>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-3">
                            <div className={`p-2 rounded-lg ${
                              platform?.connected ? 'bg-success/10' : 'bg-secondary/20'
                            }`}>
                              <Icon 
                                name={platform?.icon} 
                                size={20} 
                                className={platform?.connected ? 'text-success' : 'text-muted-foreground'} 
                              />
                            </div>
                            <div>
                              <h4 className="font-medium text-foreground">{platform?.name}</h4>
                              <p className="text-sm text-muted-foreground">
                                {platform?.connected ? 'Conectado e ativo' : 'Não conectado'}
                              </p>
                            </div>
                          </div>

                          <div className="flex items-center space-x-2">
                            <div className={`px-3 py-1 rounded-full text-sm font-medium ${
                              platform?.connected 
                                ? 'bg-success/10 text-success' :'bg-error/10 text-error'
                            }`}>
                              {platform?.connected ? 'Ativo' : 'Inativo'}
                            </div>
                            
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => {
                                if (platform?.connected) {
                                  alert(`Desconectando de ${platform?.name}...`);
                                } else {
                                  alert(`Conectando com ${platform?.name}...`);
                                }
                              }}
                            >
                              {platform?.connected ? 'Desconectar' : 'Conectar'}
                            </Button>
                          </div>
                        </div>
                      </div>

                      {/* Platform Settings */}
                      {platform?.connected && (
                        <div className="p-4">
                          <h5 className="font-medium text-foreground mb-3">Configurações Específicas</h5>
                          <div className="space-y-3">
                            {Object.entries(platform?.settings || {})?.map(([settingKey, value]) => {
                              const settingNames = {
                                autoSubmitPlaylists: 'Submeter para playlists automaticamente',
                                releaseRadar: 'Incluir no Release Radar',
                                newMusicMix: 'Incluir no New Music Mix',
                                preReleasePromo: 'Promoção pré-lançamento',
                                contentID: 'Content ID ativo',
                                autoGenerate: 'Gerar vídeos automaticamente',
                                shorts: 'Disponível para Shorts',
                                commercialMusic: 'Música comercial',
                                clipPreview: 'Preview de clipes',
                                stories: 'Disponível para Stories',
                                reels: 'Disponível para Reels',
                                posts: 'Disponível para Posts'
                              };

                              return (
                                <div key={settingKey} className="flex items-center justify-between py-2">
                                  <span className="text-sm text-foreground">
                                    {settingNames?.[settingKey] || settingKey}
                                  </span>
                                  <Checkbox
                                    checked={value}
                                    onChange={(e) => handlePlatformSettingChange(platform?.key, settingKey, e?.target?.checked)}
                                  />
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
              {/* Advanced Settings */}
              <div className="bg-card border border-border rounded-lg p-6">
                <h3 className="text-lg font-medium text-foreground mb-4 flex items-center">
                  <Icon name="Sliders" size={20} className="mr-2" />
                  Configurações Avançadas
                </h3>

                <div className="space-y-6">
                  {/* Custom Metadata */}
                  <div>
                    <h4 className="font-medium text-foreground mb-3">Metadados Personalizados</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <Input
                        label="Label Padrão"
                        placeholder="Nome da sua gravadora"
                        value={localProfile?.platformSettings?.defaultLabel || ''}
                        onChange={(e) => handleSettingChange('defaultLabel', e?.target?.value)}
                      />
                      
                      <Input
                        label="Copyright Padrão"
                        placeholder="© 2025 Seu Nome"
                        value={localProfile?.platformSettings?.defaultCopyright || ''}
                        onChange={(e) => handleSettingChange('defaultCopyright', e?.target?.value)}
                      />
                      
                      <Input
                        label="Compositor Padrão"
                        placeholder="Nome do compositor"
                        value={localProfile?.platformSettings?.defaultComposer || ''}
                        onChange={(e) => handleSettingChange('defaultComposer', e?.target?.value)}
                      />
                      
                      <Input
                        label="Produtor Padrão"
                        placeholder="Nome do produtor"
                        value={localProfile?.platformSettings?.defaultProducer || ''}
                        onChange={(e) => handleSettingChange('defaultProducer', e?.target?.value)}
                      />
                    </div>
                  </div>

                  {/* Release Schedule */}
                  <div>
                    <h4 className="font-medium text-foreground mb-3">Configurações de Lançamento</h4>
                    <div className="space-y-4">
                      <div className="flex items-center space-x-4">
                        <Checkbox
                          checked={localProfile?.platformSettings?.scheduleReleases !== false}
                          onChange={(e) => handleSettingChange('scheduleReleases', e?.target?.checked)}
                          label="Permitir agendamento de lançamentos"
                        />
                      </div>
                      
                      <div className="flex items-center space-x-4">
                        <Checkbox
                          checked={localProfile?.platformSettings?.preOrderEnabled === true}
                          onChange={(e) => handleSettingChange('preOrderEnabled', e?.target?.checked)}
                          label="Habilitar pré-venda quando disponível"
                        />
                      </div>
                      
                      <div className="flex items-center space-x-4">
                        <Checkbox
                          checked={localProfile?.platformSettings?.takeDowmProtection === true}
                          onChange={(e) => handleSettingChange('takeDowmProtection', e?.target?.checked)}
                          label="Proteção contra remoção automática"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {/* Management Actions */}
              <div className="bg-card border border-border rounded-lg p-6">
                <h3 className="text-lg font-medium text-foreground mb-4 flex items-center">
                  <Icon name="Tool" size={20} className="mr-2" />
                  Gerenciamento de Configurações
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <Button
                    variant="outline"
                    onClick={resetToDefaults}
                    iconName="RotateCcw"
                    iconPosition="left"
                    className="justify-center"
                  >
                    Resetar Padrões
                  </Button>
                  
                  <Button
                    variant="outline"
                    onClick={exportSettings}
                    iconName="Download"
                    iconPosition="left"
                    className="justify-center"
                  >
                    Exportar Config
                  </Button>
                  
                  <Button
                    variant="outline"
                    onClick={() => alert('Funcionalidade de importar configurações em desenvolvimento')}
                    iconName="Upload"
                    iconPosition="left"
                    className="justify-center"
                  >
                    Importar Config
                  </Button>
                </div>
              </div>
              {/* Help Section */}
              <div className="bg-secondary/10 border border-secondary/20 rounded-lg p-4">
                <div className="flex items-start space-x-3">
                  <Icon name="HelpCircle" size={20} className="text-secondary mt-0.5" />
                  <div>
                    <h3 className="font-medium text-foreground mb-2">Dicas de Configuração</h3>
                    <ul className="space-y-1 text-sm text-muted-foreground">
                      <li>• Ative a verificação de qualidade para evitar rejeições</li>
                      <li>• Configure metadados padrão para agilizar futuros lançamentos</li>
                      <li>• Teste configurações com lançamentos menores primeiro</li>
                      <li>• Mantenha as conexões das plataformas sempre atualizadas</li>
                      <li>• Exporte suas configurações regularmente como backup</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          );
        };

        export default PlatformSettings;