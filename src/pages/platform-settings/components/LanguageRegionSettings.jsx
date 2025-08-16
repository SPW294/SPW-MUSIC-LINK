import React from 'react';
        import Icon from '../../../components/AppIcon';
        import Select from '../../../components/ui/Select';
        import Button from '../../../components/ui/Button';

        const LanguageRegionSettings = ({ settings, updateSettings }) => {
          const languageOptions = [
            { value: 'pt-BR', label: 'Português (Brasil)', flag: '🇧🇷' },
            { value: 'en-US', label: 'English (United States)', flag: '🇺🇸' },
            { value: 'en-GB', label: 'English (United Kingdom)', flag: '🇬🇧' },
            { value: 'es-ES', label: 'Español (España)', flag: '🇪🇸' },
            { value: 'es-MX', label: 'Español (México)', flag: '🇲🇽' },
            { value: 'fr-FR', label: 'Français (France)', flag: '🇫🇷' },
            { value: 'de-DE', label: 'Deutsch (Deutschland)', flag: '🇩🇪' },
            { value: 'it-IT', label: 'Italiano (Italia)', flag: '🇮🇹' },
            { value: 'ja-JP', label: '日本語 (日本)', flag: '🇯🇵' },
            { value: 'ko-KR', label: '한국어 (대한민국)', flag: '🇰🇷' }
          ];

          const regionOptions = [
            { value: 'BR', label: 'Brasil', flag: '🇧🇷' },
            { value: 'US', label: 'Estados Unidos', flag: '🇺🇸' },
            { value: 'GB', label: 'Reino Unido', flag: '🇬🇧' },
            { value: 'ES', label: 'Espanha', flag: '🇪🇸' },
            { value: 'MX', label: 'México', flag: '🇲🇽' },
            { value: 'FR', label: 'França', flag: '🇫🇷' },
            { value: 'DE', label: 'Alemanha', flag: '🇩🇪' },
            { value: 'IT', label: 'Itália', flag: '🇮🇹' },
            { value: 'JP', label: 'Japão', flag: '🇯🇵' },
            { value: 'KR', label: 'Coreia do Sul', flag: '🇰🇷' }
          ];

          const currencyOptions = [
            { value: 'BRL', label: 'Real Brasileiro (R$)', symbol: 'R$' },
            { value: 'USD', label: 'US Dollar ($)', symbol: '$' },
            { value: 'EUR', label: 'Euro (€)', symbol: '€' },
            { value: 'GBP', label: 'British Pound (£)', symbol: '£' },
            { value: 'JPY', label: 'Japanese Yen (¥)', symbol: '¥' },
            { value: 'KRW', label: 'Korean Won (₩)', symbol: '₩' },
            { value: 'MXN', label: 'Mexican Peso ($)', symbol: '$' }
          ];

          const dateFormatOptions = [
            { value: 'DD/MM/YYYY', label: 'DD/MM/YYYY (31/12/2025)', example: '31/12/2025' },
            { value: 'MM/DD/YYYY', label: 'MM/DD/YYYY (12/31/2025)', example: '12/31/2025' },
            { value: 'YYYY-MM-DD', label: 'YYYY-MM-DD (2025-12-31)', example: '2025-12-31' },
            { value: 'DD.MM.YYYY', label: 'DD.MM.YYYY (31.12.2025)', example: '31.12.2025' }
          ];

          const numberFormatOptions = [
            { value: 'american', label: 'Americano (1,234.56)', example: '1,234.56' },
            { value: 'european', label: 'Europeu (1.234,56)', example: '1.234,56' },
            { value: 'indian', label: 'Indiano (1,23,456.78)', example: '1,23,456.78' }
          ];

          const weekStartOptions = [
            { value: 'monday', label: 'Segunda-feira' },
            { value: 'sunday', label: 'Domingo' },
            { value: 'saturday', label: 'Sábado' }
          ];

          // Get current selections for display
          const currentLanguage = languageOptions?.find(opt => opt?.value === settings?.language);
          const currentRegion = regionOptions?.find(opt => opt?.value === settings?.region);
          const currentCurrency = currencyOptions?.find(opt => opt?.value === settings?.currency);

          return (
            <div className="p-6 space-y-8">
              {/* Section Header */}
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                  <Icon name="Globe" size={20} className="text-primary" />
                </div>
                <div>
                  <h2 className="text-xl font-semibold text-foreground">
                    Idioma e Região
                  </h2>
                  <p className="text-sm text-muted-foreground">
                    Configure idioma, moeda, formato de data e preferências de localização
                  </p>
                </div>
              </div>

              {/* Current Settings Preview */}
              <div className="bg-card border border-border rounded-lg p-4">
                <h3 className="font-medium text-foreground mb-3">
                  Configuração Atual
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                  <div className="flex items-center space-x-2">
                    <span className="text-2xl">{currentLanguage?.flag}</span>
                    <div>
                      <p className="font-medium text-foreground">Idioma</p>
                      <p className="text-muted-foreground">{currentLanguage?.label}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="text-2xl">{currentRegion?.flag}</span>
                    <div>
                      <p className="font-medium text-foreground">Região</p>
                      <p className="text-muted-foreground">{currentRegion?.label}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
                      <span className="text-sm font-bold text-primary">{currentCurrency?.symbol}</span>
                    </div>
                    <div>
                      <p className="font-medium text-foreground">Moeda</p>
                      <p className="text-muted-foreground">{currentCurrency?.label}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Language & Region */}
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-medium text-foreground mb-4">
                    Idioma e Localização
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Select
                      label="Idioma da Interface"
                      value={settings?.language}
                      options={languageOptions?.map(opt => ({
                        value: opt?.value,
                        label: `${opt?.flag} ${opt?.label}`
                      }))}
                      onChange={(value) => updateSettings({ language: value })}
                      description="Idioma principal da plataforma"
                    />
                    
                    <Select
                      label="Região"
                      value={settings?.region}
                      options={regionOptions?.map(opt => ({
                        value: opt?.value,
                        label: `${opt?.flag} ${opt?.label}`
                      }))}
                      onChange={(value) => updateSettings({ region: value })}
                      description="Região para configurações locais"
                    />
                  </div>
                </div>

                {/* Currency & Number Formats */}
                <div className="border-t border-border pt-6">
                  <h3 className="text-lg font-medium text-foreground mb-4">
                    Moeda e Formatos Numéricos
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Select
                      label="Moeda Padrão"
                      value={settings?.currency}
                      options={currencyOptions?.map(opt => ({
                        value: opt?.value,
                        label: `${opt?.symbol} ${opt?.label}`
                      }))}
                      onChange={(value) => updateSettings({ currency: value })}
                      description="Moeda para exibição de valores financeiros"
                    />
                    
                    <Select
                      label="Formato de Números"
                      value={settings?.numberFormat}
                      options={numberFormatOptions?.map(opt => ({
                        value: opt?.value,
                        label: `${opt?.label}`
                      }))}
                      onChange={(value) => updateSettings({ numberFormat: value })}
                      description="Como números e valores serão formatados"
                    />
                  </div>
                </div>

                {/* Date & Time Formats */}
                <div className="border-t border-border pt-6">
                  <h3 className="text-lg font-medium text-foreground mb-4">
                    Formatos de Data e Hora
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Select
                      label="Formato de Data"
                      value={settings?.dateFormat}
                      options={dateFormatOptions?.map(opt => ({
                        value: opt?.value,
                        label: opt?.label
                      }))}
                      onChange={(value) => updateSettings({ dateFormat: value })}
                      description="Como as datas serão exibidas"
                    />
                    
                    <Select
                      label="Primeiro Dia da Semana"
                      value={settings?.firstDayOfWeek}
                      options={weekStartOptions}
                      onChange={(value) => updateSettings({ firstDayOfWeek: value })}
                      description="Que dia começar a semana em calendários"
                    />
                  </div>
                </div>

                {/* Format Examples */}
                <div className="border-t border-border pt-6">
                  <h3 className="text-lg font-medium text-foreground mb-4">
                    Exemplos de Formatação
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    <div className="p-4 bg-card border border-border rounded-lg">
                      <h4 className="font-medium text-foreground mb-2">Data</h4>
                      <p className="text-sm text-muted-foreground">
                        {dateFormatOptions?.find(opt => opt?.value === settings?.dateFormat)?.example || '31/12/2025'}
                      </p>
                    </div>
                    
                    <div className="p-4 bg-card border border-border rounded-lg">
                      <h4 className="font-medium text-foreground mb-2">Número</h4>
                      <p className="text-sm text-muted-foreground">
                        {numberFormatOptions?.find(opt => opt?.value === settings?.numberFormat)?.example || '1.234,56'}
                      </p>
                    </div>
                    
                    <div className="p-4 bg-card border border-border rounded-lg">
                      <h4 className="font-medium text-foreground mb-2">Moeda</h4>
                      <p className="text-sm text-muted-foreground">
                        {currentCurrency?.symbol} 1.234,56
                      </p>
                    </div>
                    
                    <div className="p-4 bg-card border border-border rounded-lg">
                      <h4 className="font-medium text-foreground mb-2">Hora</h4>
                      <p className="text-sm text-muted-foreground">
                        14:30 ({settings?.region === 'US' ? '2:30 PM' : '14:30'})
                      </p>
                    </div>
                  </div>
                </div>

                {/* Regional Content */}
                <div className="border-t border-border pt-6">
                  <h3 className="text-lg font-medium text-foreground mb-4">
                    Conteúdo Regional
                  </h3>
                  <div className="space-y-4">
                    <div className="p-4 bg-info/5 border border-info/20 rounded-lg">
                      <div className="flex items-start space-x-3">
                        <Icon name="Info" size={20} className="text-info mt-0.5" />
                        <div>
                          <h4 className="font-medium text-foreground">
                            Conteúdo Localizado
                          </h4>
                          <p className="text-sm text-muted-foreground mt-1">
                            Algumas funcionalidades e conteúdos podem variar baseado na sua região, 
                            incluindo plataformas de distribuição disponíveis e regulamentações locais.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="border-t border-border pt-6 flex flex-col sm:flex-row gap-3">
                  <Button variant="default">
                    <Icon name="Save" size={16} className="mr-2" />
                    Aplicar Configurações
                  </Button>
                  <Button variant="outline">
                    <Icon name="Globe" size={16} className="mr-2" />
                    Detectar Automaticamente
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

        export default LanguageRegionSettings;