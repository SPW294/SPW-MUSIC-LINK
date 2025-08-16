import React, { useState, useEffect } from 'react';
        import Header from '../../components/ui/Header';
        import SettingsHeader from './components/SettingsHeader';
        import SettingsNavigation from './components/SettingsNavigation';
        import AccountPreferences from './components/AccountPreferences';
        import DistributionSettings from './components/DistributionSettings';
        import NotificationCenter from './components/NotificationCenter';
        import IntegrationsManager from './components/IntegrationsManager';
        import PrivacyControls from './components/PrivacyControls';
        import ThemeCustomization from './components/ThemeCustomization';
        import LanguageRegionSettings from './components/LanguageRegionSettings';
        import AdvancedSettings from './components/AdvancedSettings';
        import Icon from '../../components/AppIcon';

        const PlatformSettings = () => {
          const [activeSection, setActiveSection] = useState('account');
          const [searchQuery, setSearchQuery] = useState('');
          const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
          const [isAutoSaving, setIsAutoSaving] = useState(false);
          const [settings, setSettings] = useState({
            // Account Preferences
            account: {
              language: 'pt-BR',
              timezone: 'America/Sao_Paulo',
              currency: 'BRL',
              dateFormat: 'DD/MM/YYYY',
              emailNotifications: true,
              twoFactorAuth: false,
              sessionTimeout: 30,
              autoLogout: true
            },
            
            // Distribution Settings
            distribution: {
              defaultPlatforms: ['spotify', 'apple-music', 'youtube-music', 'deezer'],
              autoRelease: false,
              releaseScheduling: true,
              qualityCheck: true,
              metadataTemplate: 'default',
              copyrightProtection: true,
              contentID: true,
              territoryRestrictions: []
            },
            
            // Notification Center
            notifications: {
              email: {
                releases: true,
                analytics: true,
                payments: true,
                marketing: false,
                system: true,
                frequency: 'weekly'
              },
              push: {
                releases: true,
                analytics: false,
                payments: true,
                marketing: false,
                system: true
              },
              dashboard: {
                realTime: true,
                batched: false,
                priority: 'high'
              }
            },
            
            // API Integrations
            integrations: {
              spotify: { connected: true, status: 'active', lastSync: '2025-08-15T10:30:00Z' },
              appleMusic: { connected: true, status: 'active', lastSync: '2025-08-15T10:25:00Z' },
              instagram: { connected: false, status: 'disconnected', lastSync: null },
              youtube: { connected: true, status: 'limited', lastSync: '2025-08-14T15:20:00Z' },
              tiktok: { connected: false, status: 'disconnected', lastSync: null }
            },
            
            // Privacy Controls
            privacy: {
              profileVisibility: 'public',
              dataSharing: false,
              analyticsVisibility: 'private',
              collaborationPermissions: 'friends-only',
              marketingConsent: false,
              dataExport: true,
              rightToBeForgotten: true
            },
            
            // Theme & Interface
            theme: {
              mode: 'system',
              accentColor: '#3b82f6',
              compactMode: false,
              animations: true,
              soundEffects: false,
              fontSize: 'medium'
            },
            
            // Language & Region
            localization: {
              language: 'pt-BR',
              region: 'BR',
              currency: 'BRL',
              dateFormat: 'DD/MM/YYYY',
              numberFormat: 'european',
              firstDayOfWeek: 'monday'
            },
            
            // Advanced Settings
            advanced: {
              developerMode: false,
              betaFeatures: false,
              apiAccess: false,
              webhookUrl: '',
              debugMode: false,
              performanceMode: 'balanced'
            }
          });

          const settingsSections = [
            {
              id: 'account',
              title: 'Preferências da Conta',
              description: 'Configurações gerais de conta e perfil',
              icon: 'User',
              keywords: ['conta', 'perfil', 'idioma', 'fuso', 'horário']
            },
            {
              id: 'distribution',
              title: 'Distribuição',
              description: 'Configurações de distribuição e lançamentos',
              icon: 'Share2',
              keywords: ['distribuição', 'plataformas', 'lançamento', 'spotify', 'apple']
            },
            {
              id: 'notifications',
              title: 'Centro de Notificações',
              description: 'Gerencie alertas e comunicações',
              icon: 'Bell',
              keywords: ['notificações', 'email', 'alertas', 'comunicações']
            },
            {
              id: 'integrations',
              title: 'Integrações',
              description: 'Conecte plataformas e serviços externos',
              icon: 'Link',
              keywords: ['integrações', 'api', 'conectar', 'plataformas', 'serviços']
            },
            {
              id: 'privacy',
              title: 'Controles de Privacidade',
              description: 'Gerencie privacidade e compartilhamento de dados',
              icon: 'Lock',
              keywords: ['privacidade', 'dados', 'compartilhamento', 'visibilidade']
            },
            {
              id: 'theme',
              title: 'Personalização',
              description: 'Personalize a aparência da interface',
              icon: 'Palette',
              keywords: ['tema', 'aparência', 'cores', 'interface', 'personalizar']
            },
            {
              id: 'localization',
              title: 'Idioma e Região',
              description: 'Configurações de idioma, moeda e formato',
              icon: 'Globe',
              keywords: ['idioma', 'região', 'moeda', 'formato', 'localização']
            },
            {
              id: 'advanced',
              title: 'Configurações Avançadas',
              description: 'Opções para usuários experientes',
              icon: 'Settings',
              keywords: ['avançado', 'desenvolvedor', 'api', 'beta', 'debug']
            }
          ];

          // Filter sections based on search
          const filteredSections = settingsSections?.filter(section => {
            if (!searchQuery) return true;
            const query = searchQuery?.toLowerCase();
            return (
              section?.title?.toLowerCase()?.includes(query) ||
              section?.description?.toLowerCase()?.includes(query) ||
              section?.keywords?.some(keyword => keyword?.toLowerCase()?.includes(query))
            );
          });

          // Auto-save functionality
          useEffect(() => {
            if (hasUnsavedChanges) {
              setIsAutoSaving(true);
              const timer = setTimeout(() => {
                console.log('Auto-saving settings...', settings);
                setHasUnsavedChanges(false);
                setIsAutoSaving(false);
              }, 2000);
              
              return () => clearTimeout(timer);
            }
          }, [hasUnsavedChanges, settings]);

          const updateSettings = (section, updates) => {
            setSettings(prev => ({
              ...prev,
              [section]: { ...prev?.[section], ...updates }
            }));
            setHasUnsavedChanges(true);
          };

          const renderSettingsContent = () => {
            switch (activeSection) {
              case 'account':
                return (
                  <AccountPreferences
                    settings={settings?.account}
                    updateSettings={(updates) => updateSettings('account', updates)}
                  />
                );
              case 'distribution':
                return (
                  <DistributionSettings
                    settings={settings?.distribution}
                    updateSettings={(updates) => updateSettings('distribution', updates)}
                  />
                );
              case 'notifications':
                return (
                  <NotificationCenter
                    settings={settings?.notifications}
                    updateSettings={(updates) => updateSettings('notifications', updates)}
                  />
                );
              case 'integrations':
                return (
                  <IntegrationsManager
                    settings={settings?.integrations}
                    updateSettings={(updates) => updateSettings('integrations', updates)}
                  />
                );
              case 'privacy':
                return (
                  <PrivacyControls
                    settings={settings?.privacy}
                    updateSettings={(updates) => updateSettings('privacy', updates)}
                  />
                );
              case 'theme':
                return (
                  <ThemeCustomization
                    settings={settings?.theme}
                    updateSettings={(updates) => updateSettings('theme', updates)}
                  />
                );
              case 'localization':
                return (
                  <LanguageRegionSettings
                    settings={settings?.localization}
                    updateSettings={(updates) => updateSettings('localization', updates)}
                  />
                );
              case 'advanced':
                return (
                  <AdvancedSettings
                    settings={settings?.advanced}
                    updateSettings={(updates) => updateSettings('advanced', updates)}
                  />
                );
              default:
                return (
                  <div className="p-8 text-center">
                    <Icon name="Settings" size={48} className="mx-auto mb-4 text-muted-foreground" />
                    <h3 className="text-lg font-medium text-foreground mb-2">
                      Selecione uma configuração
                    </h3>
                    <p className="text-muted-foreground">
                      Escolha uma seção no menu lateral para começar
                    </p>
                  </div>
                );
            }
          };

          return (
            <div className="min-h-screen bg-background">
              <Header />
              <main className="pt-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                  {/* Settings Header */}
                  <SettingsHeader
                    searchQuery={searchQuery}
                    onSearchChange={setSearchQuery}
                    hasUnsavedChanges={hasUnsavedChanges}
                    isAutoSaving={isAutoSaving}
                  />

                  {/* Main Content Grid */}
                  <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                    {/* Sidebar Navigation */}
                    <div className="lg:col-span-1">
                      <SettingsNavigation
                        sections={filteredSections}
                        activeSection={activeSection}
                        onSectionChange={setActiveSection}
                        searchQuery={searchQuery}
                      />
                    </div>

                    {/* Settings Content */}
                    <div className="lg:col-span-3">
                      <div className="bg-card border border-border rounded-lg min-h-[600px]">
                        {filteredSections?.length === 0 ? (
                          <div className="p-8 text-center">
                            <Icon name="Search" size={48} className="mx-auto mb-4 text-muted-foreground" />
                            <h3 className="text-lg font-medium text-foreground mb-2">
                              Nenhum resultado encontrado
                            </h3>
                            <p className="text-muted-foreground">
                              Tente ajustar sua busca ou limpar o filtro
                            </p>
                          </div>
                        ) : (
                          renderSettingsContent()
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </main>
            </div>
          );
        };

        export default PlatformSettings;