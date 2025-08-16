import React from 'react';
import Button from '../../../components/ui/Button';

const ViewToggle = ({ currentView, onViewChange }) => {
  const views = [
    { key: 'table', label: 'Tabela', icon: 'Table' },
    { key: 'calendar', label: 'Calendário', icon: 'Calendar' }
  ];

  return (
    <div className="flex items-center space-x-2 bg-muted/30 rounded-lg p-1">
      {views?.map((view) => (
        <Button
          key={view?.key}
          variant={currentView === view?.key ? 'default' : 'ghost'}
          size="sm"
          onClick={() => onViewChange(view?.key)}
          iconName={view?.icon}
          iconPosition="left"
          iconSize={16}
          className={currentView === view?.key ? '' : 'text-muted-foreground hover:text-foreground'}
        >
          {view?.label}
        </Button>
      ))}
    </div>
  );
};

export default ViewToggle;