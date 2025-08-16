import React, { useState } from 'react';
        import Icon from '../../../components/AppIcon';
        import Select from '../../../components/ui/Select';
        import { Checkbox } from '../../../components/ui/Checkbox';
        import Button from '../../../components/ui/Button';
        import Input from '../../../components/ui/Input';

        const DistributionSettings = ({ settings, updateSettings }) => {
          const [selectedPlatforms, setSelectedPlatforms] = useState(settings?.defaultPlatforms || []);

          const platforms = [
            { id: 'spotify', name: 'Spotify', icon: 'Music', color: '#1DB954' },
            { id: 'apple-music', name: 'Apple Music', icon: 'Music', color: '#FA57C1' },
            { id: 'youtube-music', name: 'YouTube Music', icon: 'Youtube', color: '#FF0000' },
            { id: 'deezer', name: 'Deezer', icon: 'Music', color: '#FEAA2D' },
            { id: 'tidal', name: 'TIDAL', icon: 'Music', color: '#00FFFF' },
            { id: 'amazon-music', name: 'Amazon Music', icon: 'Music', color: '#FF9900' },
            { id: 'soundcloud', name: 'SoundCloud', icon: 'Cloud', color: '#FF5500' },
            { id: 'bandcamp', name: 'Bandcamp', icon: 'Music', color: '#629AA0' }
          ];

          const releaseTypeOptions = [
            { value: 'single', label: 'Single' },
            { value: 'album', label: 'Álbum' },
            { value: 'ep', label: 'EP' },
            { value: 'compilation', label: 'Coletânea' }
          ];

          const genreOptions = [
            { value: 'eletronica', label: 'Eletrônica' },
            { value: 'pop', label: 'Pop' },
            { value: 'rock', label: 'Rock' },
            { value: 'hip-hop', label: 'Hip Hop' },
            { value: 'sertanejo', label: 'Sertanejo' },
            { value: 'funk', label: 'Funk' },
            { value: 'mpb', label: 'MPB' },
            { value: 'gospel', label: 'Gospel' }
          ];

          const togglePlatform = (platformId) => {
            const newSelection = selectedPlatforms?.includes(platformId)
              ? selectedPlatforms?.filter(id => id !== platformId)
              : [...selectedPlatforms, platformId];
            
            setSelectedPlatforms(newSelection);
            updateSettings({ defaultPlatforms: newSelection });
          };

          return (
            <div className="p-6 space-y-8">
              {/* Section Header */}
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                  <Icon name="Share2" size={20} className="text-primary" />
                </div>
                <div>
                  <h2 className="text-xl font-semibold text-foreground">
                    Configurações de Distribuição
                  </h2>
                  <p className="text-sm text-muted-foreground">
                    Configure plataformas padrão, agendamento de lançamentos e templates de metadados
                  </p>
                </div>
              </div>

              {/* Default Platforms */}
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-medium text-foreground mb-4">
                    Plataformas Padrão
                  </h3>
                  <p className="text-sm text-muted-foreground mb-6">
                    Selecione as plataformas que serão marcadas por padrão em novos lançamentos
                  </p>
                  
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {platforms?.map((platform) => {
                      const isSelected = selectedPlatforms?.includes(platform?.id);
                      return (
                        <button
                          key={platform?.id}
                          onClick={() => togglePlatform(platform?.id)}
                          className={`p-4 rounded-lg border-2 transition-all duration-200 ${
                            isSelected
                              ? 'border-primary bg-primary/5' :'border-border hover:border-border-hover bg-card'
                          }`}
                        >
                          <div className="flex flex-col items-center space-y-2">
                            <div 
                              className="w-10 h-10 rounded-lg flex items-center justify-center"
                              style={{ backgroundColor: `${platform?.color}20` }}
                            >
                              <Icon 
                                name={platform?.icon} 
                                size={20} 
                                style={{ color: platform?.color }}
                              />
                            </div>
                            <span className="text-sm font-medium text-foreground">
                              {platform?.name}
                            </span>
                            {isSelected && (
                              <Icon name="CheckCircle" size={16} className="text-primary" />
                            )}
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Release Settings */}
                <div className="border-t border-border pt-6">
                  <h3 className="text-lg font-medium text-foreground mb-4">
                    Configurações de Lançamento
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Select
                      label="Tipo de Lançamento Padrão"
                      value={settings?.defaultReleaseType}
                      options={releaseTypeOptions}
                      onChange={(value) => updateSettings({ defaultReleaseType: value })}
                      description="Tipo selecionado por padrão em novos uploads"
                    />
                    
                    <Select
                      label="Gênero Padrão"
                      value={settings?.defaultGenre}
                      options={genreOptions}
                      onChange={(value) => updateSettings({ defaultGenre: value })}
                      description="Gênero pré-selecionado em novos lançamentos"
                    />
                  </div>
                </div>

                {/* Automation Settings */}
                <div className="border-t border-border pt-6">
                  <h3 className="text-lg font-medium text-foreground mb-4">
                    Automação e Agendamento
                  </h3>
                  <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-4">
                        <Checkbox
                          label="Distribuição Automática"
                          description="Distribuir automaticamente para plataformas padrão"
                          checked={settings?.autoDistribution}
                          onChange={(checked) => updateSettings({ autoDistribution: checked })}
                        />
                        
                        <Checkbox
                          label="Agendamento de Lançamentos"
                          description="Permitir agendar lançamentos futuros"
                          checked={settings?.releaseScheduling}
                          onChange={(checked) => updateSettings({ releaseScheduling: checked })}
                        />
                      </div>
                      
                      <div className="space-y-4">
                        <Checkbox
                          label="Verificação de Qualidade"
                          description="Análise automática de qualidade de áudio"
                          checked={settings?.qualityCheck}
                          onChange={(checked) => updateSettings({ qualityCheck: checked })}
                        />
                        
                        <Checkbox
                          label="Validação de Metadados"
                          description="Verificar completude dos metadados"
                          checked={settings?.metadataValidation}
                          onChange={(checked) => updateSettings({ metadataValidation: checked })}
                        />
                      </div>
                    </div>

                    {settings?.autoDistribution && (
                      <div className="p-4 bg-warning/5 border border-warning/20 rounded-lg">
                        <div className="flex items-start space-x-3">
                          <Icon name="AlertTriangle" size={20} className="text-warning mt-0.5" />
                          <div>
                            <h4 className="font-medium text-foreground">
                              Distribuição Automática Ativada
                            </h4>
                            <p className="text-sm text-muted-foreground mt-1">
                              Novos uploads serão automaticamente distribuídos para as plataformas selecionadas. 
                              Certifique-se de que todos os metadados estão corretos.
                            </p>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Copyright Protection */}
                <div className="border-t border-border pt-6">
                  <h3 className="text-lg font-medium text-foreground mb-4">
                    Proteção de Direitos Autorais
                  </h3>
                  <div className="space-y-4">
                    <Checkbox
                      label="Proteção de Copyright"
                      description="Ativar monitoramento de direitos autorais"
                      checked={settings?.copyrightProtection}
                      onChange={(checked) => updateSettings({ copyrightProtection: checked })}
                    />
                    
                    <Checkbox
                      label="Content ID"
                      description="Registrar conteúdo para identificação automática"
                      checked={settings?.contentID}
                      onChange={(checked) => updateSettings({ contentID: checked })}
                    />
                  </div>
                </div>

                {/* Territory Restrictions */}
                <div className="border-t border-border pt-6">
                  <h3 className="text-lg font-medium text-foreground mb-4">
                    Restrições Territoriais
                  </h3>
                  <div className="space-y-4">
                    <Input
                      label="Territórios Excluídos"
                      placeholder="Ex: US, UK, DE (separados por vírgula)"
                      value={settings?.territoryRestrictions?.join(', ')}
                      onChange={(e) => {
                        const territories = e?.target?.value?.split(',')?.map(t => t?.trim())?.filter(Boolean);
                        updateSettings({ territoryRestrictions: territories });
                      }}
                      description="Países onde o conteúdo não deve ser distribuído"
                    />
                  </div>
                </div>

                {/* Actions */}
                <div className="border-t border-border pt-6 flex flex-col sm:flex-row gap-3">
                  <Button variant="default">
                    <Icon name="Save" size={16} className="mr-2" />
                    Salvar Configurações
                  </Button>
                  <Button variant="outline">
                    <Icon name="RotateCcw" size={16} className="mr-2" />
                    Restaurar Padrões
                  </Button>
                  <Button variant="outline">
                    <Icon name="FileDown" size={16} className="mr-2" />
                    Exportar Template
                  </Button>
                </div>
              </div>
            </div>
          );
        };

        export default DistributionSettings;