import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';

const EarningsBreakdownTable = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('date');
  const [filterPlatform, setFilterPlatform] = useState('all');

  const earningsData = [
    {
      id: 1,
      track: "Noites de Verão",
      platform: "Spotify",
      streams: 125420,
      revenue: "R$ 892,50",
      date: "15/08/2025",
      status: "paid"
    },
    {
      id: 2,
      track: "Coração Brasileiro",
      platform: "Apple Music",
      streams: 89340,
      revenue: "R$ 1.234,75",
      date: "14/08/2025",
      status: "pending"
    },
    {
      id: 3,
      track: "Samba da Madrugada",
      platform: "YouTube Music",
      streams: 67890,
      revenue: "R$ 456,80",
      date: "13/08/2025",
      status: "paid"
    },
    {
      id: 4,
      track: "Bossa Nova Dreams",
      platform: "Deezer",
      streams: 45670,
      revenue: "R$ 321,45",
      date: "12/08/2025",
      status: "processing"
    },
    {
      id: 5,
      track: "Forró do Interior",
      platform: "TikTok",
      streams: 234560,
      revenue: "R$ 678,90",
      date: "11/08/2025",
      status: "paid"
    }
  ];

  const platformOptions = [
    { value: 'all', label: 'Todas as Plataformas' },
    { value: 'spotify', label: 'Spotify' },
    { value: 'apple', label: 'Apple Music' },
    { value: 'youtube', label: 'YouTube Music' },
    { value: 'deezer', label: 'Deezer' },
    { value: 'tiktok', label: 'TikTok' }
  ];

  const sortOptions = [
    { value: 'date', label: 'Data' },
    { value: 'revenue', label: 'Receita' },
    { value: 'streams', label: 'Reproduções' },
    { value: 'track', label: 'Música' }
  ];

  const getStatusBadge = (status) => {
    const statusConfig = {
      paid: { color: 'bg-success/10 text-success', label: 'Pago' },
      pending: { color: 'bg-warning/10 text-warning', label: 'Pendente' },
      processing: { color: 'bg-accent/10 text-accent', label: 'Processando' }
    };

    const config = statusConfig?.[status] || statusConfig?.pending;
    return (
      <span className={`px-2 py-1 rounded-full text-xs font-medium ${config?.color}`}>
        {config?.label}
      </span>
    );
  };

  const getPlatformIcon = (platform) => {
    const icons = {
      'Spotify': 'Music',
      'Apple Music': 'Music2',
      'YouTube Music': 'Play',
      'Deezer': 'Radio',
      'TikTok': 'Video'
    };
    return icons?.[platform] || 'Music';
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6 mb-8">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-6">
        <h2 className="text-xl font-semibold text-foreground mb-4 lg:mb-0">
          Detalhamento de Ganhos
        </h2>
        
        <div className="flex flex-col sm:flex-row gap-4">
          <Input
            type="search"
            placeholder="Buscar música..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e?.target?.value)}
            className="w-full sm:w-64"
          />
          
          <Select
            options={platformOptions}
            value={filterPlatform}
            onChange={setFilterPlatform}
            placeholder="Filtrar plataforma"
            className="w-full sm:w-48"
          />
          
          <Select
            options={sortOptions}
            value={sortBy}
            onChange={setSortBy}
            placeholder="Ordenar por"
            className="w-full sm:w-40"
          />
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-border">
              <th className="text-left py-3 px-4 font-medium text-muted-foreground">Música</th>
              <th className="text-left py-3 px-4 font-medium text-muted-foreground">Plataforma</th>
              <th className="text-right py-3 px-4 font-medium text-muted-foreground">Reproduções</th>
              <th className="text-right py-3 px-4 font-medium text-muted-foreground">Receita</th>
              <th className="text-center py-3 px-4 font-medium text-muted-foreground">Data</th>
              <th className="text-center py-3 px-4 font-medium text-muted-foreground">Status</th>
            </tr>
          </thead>
          <tbody>
            {earningsData?.map((item) => (
              <tr key={item?.id} className="border-b border-border hover:bg-muted/20 transition-colors">
                <td className="py-4 px-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                      <Icon name="Music" size={20} color="var(--color-primary)" />
                    </div>
                    <span className="font-medium text-foreground">{item?.track}</span>
                  </div>
                </td>
                <td className="py-4 px-4">
                  <div className="flex items-center space-x-2">
                    <Icon name={getPlatformIcon(item?.platform)} size={16} color="var(--color-muted-foreground)" />
                    <span className="text-foreground">{item?.platform}</span>
                  </div>
                </td>
                <td className="py-4 px-4 text-right text-foreground font-medium">
                  {item?.streams?.toLocaleString('pt-BR')}
                </td>
                <td className="py-4 px-4 text-right text-foreground font-semibold">
                  {item?.revenue}
                </td>
                <td className="py-4 px-4 text-center text-muted-foreground">
                  {item?.date}
                </td>
                <td className="py-4 px-4 text-center">
                  {getStatusBadge(item?.status)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="flex flex-col sm:flex-row items-center justify-between mt-6 pt-4 border-t border-border">
        <p className="text-sm text-muted-foreground mb-4 sm:mb-0">
          Mostrando 5 de 127 registros
        </p>
        
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="sm">
            <Icon name="ChevronLeft" size={16} />
            Anterior
          </Button>
          <div className="flex items-center space-x-1">
            <Button variant="ghost" size="sm" className="bg-primary text-primary-foreground">1</Button>
            <Button variant="ghost" size="sm">2</Button>
            <Button variant="ghost" size="sm">3</Button>
            <span className="px-2 text-muted-foreground">...</span>
            <Button variant="ghost" size="sm">26</Button>
          </div>
          <Button variant="outline" size="sm">
            Próximo
            <Icon name="ChevronRight" size={16} />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default EarningsBreakdownTable;