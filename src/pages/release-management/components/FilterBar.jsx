import React from 'react';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';

const FilterBar = ({ 
  searchTerm, 
  setSearchTerm, 
  statusFilter, 
  setStatusFilter, 
  platformFilter, 
  setPlatformFilter,
  dateFilter,
  setDateFilter,
  onClearFilters 
}) => {
  const statusOptions = [
    { value: 'all', label: 'Todos os Status' },
    { value: 'live', label: 'Ativo' },
    { value: 'processing', label: 'Processando' },
    { value: 'pending', label: 'Pendente' },
    { value: 'failed', label: 'Falhou' }
  ];

  const platformOptions = [
    { value: 'all', label: 'Todas as Plataformas' },
    { value: 'spotify', label: 'Spotify' },
    { value: 'apple-music', label: 'Apple Music' },
    { value: 'youtube-music', label: 'YouTube Music' },
    { value: 'deezer', label: 'Deezer' },
    { value: 'tiktok', label: 'TikTok' },
    { value: 'amazon-music', label: 'Amazon Music' }
  ];

  const dateOptions = [
    { value: 'all', label: 'Todas as Datas' },
    { value: 'today', label: 'Hoje' },
    { value: 'week', label: 'Esta Semana' },
    { value: 'month', label: 'Este Mês' },
    { value: 'quarter', label: 'Este Trimestre' },
    { value: 'year', label: 'Este Ano' }
  ];

  const hasActiveFilters = searchTerm || statusFilter !== 'all' || platformFilter !== 'all' || dateFilter !== 'all';

  return (
    <div className="bg-card rounded-lg border border-border p-4 mb-6">
      <div className="flex flex-col lg:flex-row gap-4">
        {/* Search Input */}
        <div className="flex-1 lg:max-w-sm">
          <Input
            type="search"
            placeholder="Buscar por título, artista ou álbum..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e?.target?.value)}
            className="w-full"
          />
        </div>

        {/* Filter Selects */}
        <div className="flex flex-col sm:flex-row gap-4 lg:flex-1">
          <div className="flex-1 min-w-0">
            <Select
              options={statusOptions}
              value={statusFilter}
              onChange={setStatusFilter}
              placeholder="Status"
            />
          </div>
          
          <div className="flex-1 min-w-0">
            <Select
              options={platformOptions}
              value={platformFilter}
              onChange={setPlatformFilter}
              placeholder="Plataforma"
            />
          </div>
          
          <div className="flex-1 min-w-0">
            <Select
              options={dateOptions}
              value={dateFilter}
              onChange={setDateFilter}
              placeholder="Período"
            />
          </div>
        </div>

        {/* Clear Filters Button */}
        {hasActiveFilters && (
          <div className="flex-shrink-0">
            <Button
              variant="outline"
              onClick={onClearFilters}
              iconName="X"
              iconPosition="left"
              iconSize={16}
            >
              Limpar Filtros
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default FilterBar;