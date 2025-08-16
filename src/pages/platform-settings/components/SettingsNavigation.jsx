import React from 'react';
        import Icon from '../../../components/AppIcon';

        const SettingsNavigation = ({ sections, activeSection, onSectionChange, searchQuery }) => {
          return (
            <div className="space-y-2">
              {/* Mobile Dropdown for smaller screens */}
              <div className="lg:hidden mb-4">
                <select
                  value={activeSection}
                  onChange={(e) => onSectionChange(e?.target?.value)}
                  className="w-full p-3 bg-background border border-border rounded-lg text-foreground"
                >
                  {sections?.map((section) => (
                    <option key={section?.id} value={section?.id}>
                      {section?.title}
                    </option>
                  ))}
                </select>
              </div>

              {/* Desktop Navigation */}
              <nav className="hidden lg:block space-y-1">
                {searchQuery && (
                  <div className="px-3 py-2 text-xs font-medium text-muted-foreground uppercase tracking-wider">
                    Resultados da busca ({sections?.length})
                  </div>
                )}
                
                {sections?.map((section) => {
                  const isActive = activeSection === section?.id;
                  
                  return (
                    <button
                      key={section?.id}
                      onClick={() => onSectionChange(section?.id)}
                      className={`w-full flex items-start space-x-3 p-3 rounded-lg text-left transition-all duration-200 ${
                        isActive
                          ? 'bg-primary text-primary-foreground shadow-soft-sm'
                          : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
                      }`}
                    >
                      <Icon 
                        name={section?.icon} 
                        size={20} 
                        className={`mt-0.5 flex-shrink-0 ${
                          isActive ? 'text-primary-foreground' : 'text-muted-foreground'
                        }`}
                      />
                      <div className="flex-1 min-w-0">
                        <p className={`font-medium ${
                          isActive ? 'text-primary-foreground' : 'text-foreground'
                        }`}>
                          {section?.title}
                        </p>
                        <p className={`text-sm mt-1 ${
                          isActive ? 'text-primary-foreground/80' : 'text-muted-foreground'
                        }`}>
                          {section?.description}
                        </p>
                      </div>
                      
                      {isActive && (
                        <div className="w-2 h-2 bg-primary-foreground rounded-full flex-shrink-0 mt-2"></div>
                      )}
                    </button>
                  );
                })}
                
                {sections?.length === 0 && searchQuery && (
                  <div className="text-center py-8 text-muted-foreground">
                    <Icon name="Search" size={32} className="mx-auto mb-3" />
                    <p>Nenhuma configuração encontrada</p>
                  </div>
                )}
              </nav>
              
              {/* Quick Settings Shortcuts */}
              <div className="hidden lg:block mt-8 pt-6 border-t border-border">
                <h4 className="px-3 text-xs font-medium text-muted-foreground uppercase tracking-wider mb-3">
                  Acesso Rápido
                </h4>
                <div className="space-y-1">
                  <button
                    onClick={() => onSectionChange('theme')}
                    className="w-full flex items-center space-x-2 px-3 py-2 text-sm text-muted-foreground hover:text-foreground hover:bg-muted/50 rounded-lg transition-colors"
                  >
                    <Icon name="Moon" size={16} />
                    <span>Modo Escuro</span>
                  </button>
                  <button
                    onClick={() => onSectionChange('notifications')}
                    className="w-full flex items-center space-x-2 px-3 py-2 text-sm text-muted-foreground hover:text-foreground hover:bg-muted/50 rounded-lg transition-colors"
                  >
                    <Icon name="Bell" size={16} />
                    <span>Notificações</span>
                  </button>
                  <button
                    onClick={() => onSectionChange('privacy')}
                    className="w-full flex items-center space-x-2 px-3 py-2 text-sm text-muted-foreground hover:text-foreground hover:bg-muted/50 rounded-lg transition-colors"
                  >
                    <Icon name="Shield" size={16} />
                    <span>Privacidade</span>
                  </button>
                </div>
              </div>
            </div>
          );
        };

        export default SettingsNavigation;