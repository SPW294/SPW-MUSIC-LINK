import React from 'react';
import Button from '../../../components/ui/Button';
import Select from '../../../components/ui/Select';

const BulkActionsBar = ({ 
  selectedReleases, 
  onSelectAll, 
  onDeselectAll, 
  onBulkEdit, 
  onBulkDelete, 
  onBulkStatusUpdate,
  totalReleases 
}) => {
  const selectedCount = selectedReleases?.length;
  const isAllSelected = selectedCount === totalReleases && totalReleases > 0;

  const statusUpdateOptions = [
    { value: 'live', label: 'Marcar como Ativo' },
    { value: 'pending', label: 'Marcar como Pendente' },
    { value: 'processing', label: 'Marcar como Processando' }
  ];

  if (selectedCount === 0) {
    return null;
  }

  return (
    <div className="bg-primary/10 border border-primary/20 rounded-lg p-4 mb-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <span className="text-sm font-medium text-foreground">
              {selectedCount} de {totalReleases} selecionados
            </span>
            {!isAllSelected && (
              <Button
                variant="link"
                size="sm"
                onClick={onSelectAll}
                className="text-primary hover:text-primary/80 p-0 h-auto"
              >
                Selecionar todos
              </Button>
            )}
            <Button
              variant="link"
              size="sm"
              onClick={onDeselectAll}
              className="text-muted-foreground hover:text-foreground p-0 h-auto"
            >
              Desmarcar todos
            </Button>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full sm:w-auto">
          {/* Status Update Dropdown */}
          <div className="min-w-0 sm:min-w-48">
            <Select
              options={statusUpdateOptions}
              value=""
              onChange={(value) => onBulkStatusUpdate(value)}
              placeholder="Atualizar status"
            />
          </div>

          {/* Action Buttons */}
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={onBulkEdit}
              iconName="Edit"
              iconPosition="left"
              iconSize={16}
            >
              Editar
            </Button>
            
            <Button
              variant="destructive"
              size="sm"
              onClick={onBulkDelete}
              iconName="Trash2"
              iconPosition="left"
              iconSize={16}
            >
              Excluir
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BulkActionsBar;