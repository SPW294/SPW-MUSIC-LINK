import React from 'react';
        import Icon from '../../../components/AppIcon';
        import Input from '../../../components/ui/Input';
        import Button from '../../../components/ui/Button';

        const SettingsHeader = ({ searchQuery, onSearchChange, hasUnsavedChanges, isAutoSaving }) => {
          return (
            <div className="mb-8">
              {/* Header Title */}
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h1 className="text-3xl font-bold text-foreground">
                    Configurações da Plataforma
                  </h1>
                  <p className="mt-2 text-muted-foreground">
                    Centralize configurações do sistema, preferências e controles administrativos
                  </p>
                </div>
                
                {/* Save Status */}
                <div className="flex items-center space-x-3">
                  {isAutoSaving && (
                    <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                      <div className="w-4 h-4 border-2 border-primary border-t-transparent rounded-full animate-spin"></div>
                      <span>Salvando...</span>
                    </div>
                  )}
                  
                  {hasUnsavedChanges && !isAutoSaving && (
                    <div className="flex items-center space-x-2 text-sm text-warning">
                      <Icon name="AlertCircle" size={16} />
                      <span>Alterações não salvas</span>
                    </div>
                  )}
                  
                  {!hasUnsavedChanges && !isAutoSaving && (
                    <div className="flex items-center space-x-2 text-sm text-success">
                      <Icon name="CheckCircle" size={16} />
                      <span>Todas as alterações salvas</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Search and Quick Actions */}
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                {/* Search Bar */}
                <div className="relative flex-1 max-w-md">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Icon name="Search" size={16} className="text-muted-foreground" />
                  </div>
                  <Input
                    placeholder="Buscar configurações..."
                    value={searchQuery}
                    onChange={(e) => onSearchChange(e?.target?.value)}
                    className="pl-10"
                  />
                  {searchQuery && (
                    <button
                      onClick={() => onSearchChange('')}
                      className="absolute inset-y-0 right-0 pr-3 flex items-center"
                    >
                      <Icon name="X" size={16} className="text-muted-foreground hover:text-foreground" />
                    </button>
                  )}
                </div>

                {/* Quick Actions */}
                <div className="flex items-center space-x-3">
                  <Button variant="outline" size="sm">
                    <Icon name="Download" size={16} className="mr-2" />
                    Exportar Configurações
                  </Button>
                  
                  <Button variant="outline" size="sm">
                    <Icon name="Upload" size={16} className="mr-2" />
                    Importar Configurações
                  </Button>
                  
                  <Button variant="outline" size="sm">
                    <Icon name="RefreshCw" size={16} className="mr-2" />
                    Restaurar Padrões
                  </Button>
                </div>
              </div>
            </div>
          );
        };

        export default SettingsHeader;