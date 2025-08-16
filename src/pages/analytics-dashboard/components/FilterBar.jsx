import React, { useState } from 'react';
import Button from '../../../components/ui/Button';
import Select from '../../../components/ui/Select';


const FilterBar = ({ onFiltersChange, onExport, onRefresh, lastUpdated }) => {
  const [selectedDateRange, setSelectedDateRange] = useState('30d');
  const [selectedPlatform, setSelectedPlatform] = useState('all');
  const [selectedTrack, setSelectedTrack] = useState('all');

  const dateRangeOptions = [
    { value: '7d', label: 'Últimos 7 dias' },
    { value: '30d', label: 'Últimos 30 dias' },
    { value: '90d', label: 'Últimos 90 dias' },
    { value: '1y', label: 'Último ano' },
    { value: 'custom', label: 'Período personalizado' }
  ];

  const platformOptions = [
    { value: 'all', label: 'Todas as plataformas' },
    { value: 'spotify', label: 'Spotify' },
    { value: 'apple', label: 'Apple Music' },
    { value: 'youtube', label: 'YouTube Music' },
    { value: 'deezer', label: 'Deezer' },
    { value: 'tiktok', label: 'TikTok' }
  ];

  const trackOptions = [
    { value: 'all', label: 'Todas as faixas' },
    { value: 'track1', label: 'Noite de Verão' },
    { value: 'track2', label: 'Coração Brasileiro' },
    { value: 'track3', label: 'Samba do Futuro' },
    { value: 'track4', label: 'Melodia Urbana' }
  ];

  const handleFilterChange = (type, value) => {
    const filters = { dateRange: selectedDateRange, platform: selectedPlatform, track: selectedTrack };
    filters[type] = value;
    
    if (type === 'dateRange') setSelectedDateRange(value);
    if (type === 'platform') setSelectedPlatform(value);
    if (type === 'track') setSelectedTrack(value);
    
    onFiltersChange(filters);
  };

  return (
    <div className="bg-card border border-border rounded-lg p-4 mb-6">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-4 flex-1">
          <div className="min-w-[180px]">
            <Select
              label="Período"
              options={dateRangeOptions}
              value={selectedDateRange}
              onChange={(value) => handleFilterChange('dateRange', value)}
              className="w-full"
            />
          </div>
          
          <div className="min-w-[200px]">
            <Select
              label="Plataforma"
              options={platformOptions}
              value={selectedPlatform}
              onChange={(value) => handleFilterChange('platform', value)}
              className="w-full"
            />
          </div>
          
          <div className="min-w-[180px]">
            <Select
              label="Faixa"
              options={trackOptions}
              value={selectedTrack}
              onChange={(value) => handleFilterChange('track', value)}
              className="w-full"
            />
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2">
          <div className="text-xs text-muted-foreground mr-4 hidden sm:block">
            Atualizado: {lastUpdated}
          </div>
          
          <Button
            variant="outline"
            size="sm"
            iconName="RefreshCw"
            iconPosition="left"
            onClick={onRefresh}
          >
            Atualizar
          </Button>
          
          <Button
            variant="outline"
            size="sm"
            iconName="Download"
            iconPosition="left"
            onClick={onExport}
          >
            Exportar
          </Button>
        </div>
      </div>
    </div>
  );
};

export default FilterBar;