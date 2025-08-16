import React from 'react';
        import Icon from '../../../components/AppIcon';

        const ProfileTabs = ({ tabs, activeTab, onTabChange, hasUnsavedChanges }) => {
          return (
            <div className="bg-card border border-border rounded-lg overflow-hidden">
              <div className="p-4 border-b border-border">
                <h2 className="font-semibold text-foreground">Configurações</h2>
              </div>
              
              <nav className="p-2">
                {tabs?.map((tab) => (
                  <button
                    key={tab?.id}
                    onClick={() => onTabChange(tab?.id)}
                    className={`
                      flex items-center space-x-3 w-full px-3 py-2.5 text-left rounded-lg transition-all duration-200
                      ${activeTab === tab?.id
                        ? 'bg-primary text-primary-foreground shadow-soft-sm'
                        : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
                      }
                    `}
                  >
                    <Icon name={tab?.icon} size={18} />
                    <span className="font-medium">{tab?.label}</span>
                    
                    {hasUnsavedChanges && activeTab === tab?.id && (
                      <div className="ml-auto">
                        <div className="w-2 h-2 bg-warning rounded-full"></div>
                      </div>
                    )}
                  </button>
                ))}
              </nav>
              
              {/* Mobile Tab Navigation (Horizontal) */}
              <div className="lg:hidden border-t border-border bg-muted/20">
                <div className="flex overflow-x-auto">
                  {tabs?.map((tab) => (
                    <button
                      key={tab?.id}
                      onClick={() => onTabChange(tab?.id)}
                      className={`
                        flex-shrink-0 flex flex-col items-center space-y-1 px-4 py-3 transition-all duration-200
                        ${activeTab === tab?.id
                          ? 'text-primary border-b-2 border-primary' :'text-muted-foreground hover:text-foreground'
                        }
                      `}
                    >
                      <Icon name={tab?.icon} size={18} />
                      <span className="text-xs font-medium whitespace-nowrap">
                        {tab?.label}
                      </span>
                      
                      {hasUnsavedChanges && activeTab === tab?.id && (
                        <div className="w-1.5 h-1.5 bg-warning rounded-full"></div>
                      )}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          );
        };

        export default ProfileTabs;