import React, { useState } from 'react';
        import Icon from '../../../components/AppIcon';
        import Select from '../../../components/ui/Select';
        import { Checkbox } from '../../../components/ui/Checkbox';
        import Button from '../../../components/ui/Button';

        const ThemeCustomization = ({ settings, updateSettings }) => {
          const [selectedColor, setSelectedColor] = useState(settings?.accentColor || '#3b82f6');

          const themeOptions = [
            { value: 'light', label: 'Claro' },
            { value: 'dark', label: 'Escuro' },
            { value: 'system', label: 'Automático (seguir sistema)' }
          ];

          const fontSizeOptions = [
            { value: 'small', label: 'Pequena' },
            { value: 'medium', label: 'Média' },
            { value: 'large', label: 'Grande' }
          ];

          const accentColors = [
            { name: 'Azul', value: '#3b82f6' },
            { name: 'Verde', value: '#10b981' },
            { name: 'Roxo', value: '#8b5cf6' },
            { name: 'Rosa', value: '#ec4899' },
            { name: 'Laranja', value: '#f59e0b' },
            { name: 'Vermelho', value: '#ef4444' },
            { name: 'Teal', value: '#14b8a6' },
            { name: 'Índigo', value: '#6366f1' }
          ];

          const handleColorChange = (color) => {
            setSelectedColor(color);
            updateSettings({ accentColor: color });
          };

          return (
            <div className="p-6 space-y-8">
              {/* Section Header */}
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                  <Icon name="Palette" size={20} className="text-primary" />
                </div>
                <div>
                  <h2 className="text-xl font-semibold text-foreground">
                    Personalização de Tema
                  </h2>
                  <p className="text-sm text-muted-foreground">
                    Personalize a aparência da interface com tema, cores e configurações visuais
                  </p>
                </div>
              </div>

              {/* Theme Mode */}
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-medium text-foreground mb-4">
                    Modo de Tema
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Select
                      label="Aparência"
                      value={settings?.mode}
                      options={themeOptions}
                      onChange={(value) => updateSettings({ mode: value })}
                      description="Escolha entre tema claro, escuro ou automático"
                    />

                    {/* Theme Preview */}
                    <div className="space-y-3">
                      <label className="text-sm font-medium text-foreground">
                        Pré-visualização
                      </label>
                      <div className="border border-border rounded-lg p-4 space-y-3">
                        <div className="flex items-center justify-between">
                          <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center">
                            <Icon name="Music" size={20} color="white" />
                          </div>
                          <div className="flex space-x-2">
                            <div className="w-3 h-3 bg-success rounded-full"></div>
                            <div className="w-3 h-3 bg-warning rounded-full"></div>
                            <div className="w-3 h-3 bg-destructive rounded-full"></div>
                          </div>
                        </div>
                        <div className="space-y-2">
                          <div className="h-3 bg-muted rounded"></div>
                          <div className="h-3 bg-muted rounded w-3/4"></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Accent Color */}
                <div className="border-t border-border pt-6">
                  <h3 className="text-lg font-medium text-foreground mb-4">
                    Cor de Destaque
                  </h3>
                  <p className="text-sm text-muted-foreground mb-6">
                    Escolha a cor principal usada em botões, links e elementos interativos
                  </p>
                  
                  <div className="grid grid-cols-4 md:grid-cols-8 gap-3">
                    {accentColors?.map((color) => (
                      <button
                        key={color?.value}
                        onClick={() => handleColorChange(color?.value)}
                        className={`relative w-full aspect-square rounded-lg border-2 transition-all duration-200 ${
                          selectedColor === color?.value
                            ? 'border-foreground scale-105 shadow-soft-sm'
                            : 'border-border hover:border-border-hover'
                        }`}
                        style={{ backgroundColor: color?.value }}
                        title={color?.name}
                      >
                        {selectedColor === color?.value && (
                          <div className="absolute inset-0 flex items-center justify-center">
                            <Icon name="Check" size={16} color="white" />
                          </div>
                        )}
                      </button>
                    ))}
                  </div>

                  {/* Custom Color Input */}
                  <div className="mt-6 flex items-center space-x-3">
                    <input
                      type="color"
                      value={selectedColor}
                      onChange={(e) => handleColorChange(e?.target?.value)}
                      className="w-12 h-12 rounded-lg border border-border cursor-pointer"
                    />
                    <div>
                      <p className="text-sm font-medium text-foreground">
                        Cor Personalizada
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {selectedColor?.toUpperCase()}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Interface Options */}
                <div className="border-t border-border pt-6">
                  <h3 className="text-lg font-medium text-foreground mb-4">
                    Opções da Interface
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <Select
                        label="Tamanho da Fonte"
                        value={settings?.fontSize}
                        options={fontSizeOptions}
                        onChange={(value) => updateSettings({ fontSize: value })}
                        description="Ajuste o tamanho do texto na interface"
                      />
                      
                      <Checkbox
                        label="Modo Compacto"
                        description="Reduzir espaçamento entre elementos"
                        checked={settings?.compactMode}
                        onChange={(checked) => updateSettings({ compactMode: checked })}
                      />
                    </div>
                    
                    <div className="space-y-4">
                      <Checkbox
                        label="Animações"
                        description="Ativar animações e transições suaves"
                        checked={settings?.animations}
                        onChange={(checked) => updateSettings({ animations: checked })}
                      />
                      
                      <Checkbox
                        label="Efeitos Sonoros"
                        description="Sons de notificação e feedback"
                        checked={settings?.soundEffects}
                        onChange={(checked) => updateSettings({ soundEffects: checked })}
                      />
                    </div>
                  </div>
                </div>

                {/* Accessibility */}
                <div className="border-t border-border pt-6">
                  <h3 className="text-lg font-medium text-foreground mb-4">
                    Acessibilidade
                  </h3>
                  <div className="space-y-4">
                    <div className="p-4 bg-card border border-border rounded-lg">
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="font-medium text-foreground">
                            Alto Contraste
                          </h4>
                          <p className="text-sm text-muted-foreground">
                            Ativar modo de alto contraste para melhor legibilidade
                          </p>
                        </div>
                        <Button variant="outline" size="sm">
                          <Icon name="Eye" size={16} className="mr-2" />
                          Ativar
                        </Button>
                      </div>
                    </div>
                    
                    <div className="p-4 bg-card border border-border rounded-lg">
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="font-medium text-foreground">
                            Redução de Movimento
                          </h4>
                          <p className="text-sm text-muted-foreground">
                            Reduzir animações para pessoas sensíveis ao movimento
                          </p>
                        </div>
                        <Button variant="outline" size="sm">
                          <Icon name="Minimize" size={16} className="mr-2" />
                          Configurar
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Theme Presets */}
                <div className="border-t border-border pt-6">
                  <h3 className="text-lg font-medium text-foreground mb-4">
                    Temas Pré-definidos
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="p-4 bg-card border border-border rounded-lg cursor-pointer hover:shadow-soft-sm transition-shadow">
                      <div className="flex items-center space-x-3 mb-3">
                        <div className="w-8 h-8 bg-blue-500 rounded-lg"></div>
                        <h4 className="font-medium text-foreground">Oceano</h4>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        Tema azul com tons oceânicos
                      </p>
                    </div>
                    
                    <div className="p-4 bg-card border border-border rounded-lg cursor-pointer hover:shadow-soft-sm transition-shadow">
                      <div className="flex items-center space-x-3 mb-3">
                        <div className="w-8 h-8 bg-green-500 rounded-lg"></div>
                        <h4 className="font-medium text-foreground">Floresta</h4>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        Tema verde inspirado na natureza
                      </p>
                    </div>
                    
                    <div className="p-4 bg-card border border-border rounded-lg cursor-pointer hover:shadow-soft-sm transition-shadow">
                      <div className="flex items-center space-x-3 mb-3">
                        <div className="w-8 h-8 bg-purple-500 rounded-lg"></div>
                        <h4 className="font-medium text-foreground">Noite</h4>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        Tema escuro com detalhes roxos
                      </p>
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="border-t border-border pt-6 flex flex-col sm:flex-row gap-3">
                  <Button variant="default">
                    <Icon name="Save" size={16} className="mr-2" />
                    Salvar Tema
                  </Button>
                  <Button variant="outline">
                    <Icon name="RotateCcw" size={16} className="mr-2" />
                    Restaurar Padrão
                  </Button>
                  <Button variant="outline">
                    <Icon name="Share" size={16} className="mr-2" />
                    Compartilhar Tema
                  </Button>
                </div>
              </div>
            </div>
          );
        };

        export default ThemeCustomization;