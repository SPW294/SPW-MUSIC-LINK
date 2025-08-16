import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const RecentReleases = () => {
  const [sortBy, setSortBy] = useState('date');
  const [sortOrder, setSortOrder] = useState('desc');

  const releases = [
    {
      id: 1,
      title: "Noites de Verão",
      artist: "João Silva",
      coverArt: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=100&h=100&fit=crop",
      releaseDate: "15/08/2024",
      status: "live",
      platforms: ["Spotify", "Apple Music", "YouTube Music"],
      streams: 12450,
      revenue: 89.50
    },
    {
      id: 2,
      title: "Batida Urbana",
      artist: "MC Rhythm",
      coverArt: "https://images.unsplash.com/photo-1571974599782-87624638275b?w=100&h=100&fit=crop",
      releaseDate: "12/08/2024",
      status: "processing",
      platforms: ["Spotify", "Deezer"],
      streams: 8920,
      revenue: 64.20
    },
    {
      id: 3,
      title: "Melodia Sertaneja",
      artist: "Dupla Caipira",
      coverArt: "https://images.unsplash.com/photo-1516280440614-37939bbacd81?w=100&h=100&fit=crop",
      releaseDate: "10/08/2024",
      status: "live",
      platforms: ["Spotify", "Apple Music", "YouTube Music", "TikTok"],
      streams: 25680,
      revenue: 184.90
    },
    {
      id: 4,
      title: "Eletrônica Brasil",
      artist: "DJ Tropical",
      coverArt: "https://images.unsplash.com/photo-1571330735066-03aaa9429d89?w=100&h=100&fit=crop",
      releaseDate: "08/08/2024",
      status: "failed",
      platforms: ["Spotify"],
      streams: 0,
      revenue: 0
    }
  ];

  const getStatusBadge = (status) => {
    const statusConfig = {
      live: { color: 'bg-success text-success-foreground', icon: 'CheckCircle', label: 'Ativo' },
      processing: { color: 'bg-warning text-warning-foreground', icon: 'Clock', label: 'Processando' },
      failed: { color: 'bg-error text-error-foreground', icon: 'XCircle', label: 'Falhou' }
    };

    const config = statusConfig?.[status] || statusConfig?.processing;

    return (
      <span className={`inline-flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-medium ${config?.color}`}>
        <Icon name={config?.icon} size={12} />
        <span>{config?.label}</span>
      </span>
    );
  };

  const handleSort = (column) => {
    if (sortBy === column) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(column);
      setSortOrder('desc');
    }
  };

  const sortedReleases = [...releases]?.sort((a, b) => {
    let aValue, bValue;
    
    switch (sortBy) {
      case 'title':
        aValue = a?.title?.toLowerCase();
        bValue = b?.title?.toLowerCase();
        break;
      case 'streams':
        aValue = a?.streams;
        bValue = b?.streams;
        break;
      case 'revenue':
        aValue = a?.revenue;
        bValue = b?.revenue;
        break;
      case 'date':
      default:
        aValue = new Date(a.releaseDate.split('/').reverse().join('-'));
        bValue = new Date(b.releaseDate.split('/').reverse().join('-'));
        break;
    }

    if (sortOrder === 'asc') {
      return aValue > bValue ? 1 : -1;
    } else {
      return aValue < bValue ? 1 : -1;
    }
  });

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
        <div>
          <h2 className="text-xl font-semibold text-foreground mb-1">Lançamentos Recentes</h2>
          <p className="text-sm text-muted-foreground">Acompanhe o desempenho das suas músicas</p>
        </div>
        <Button variant="outline" size="sm" iconName="Filter" iconPosition="left">
          Filtrar
        </Button>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-border">
              <th className="text-left py-3 px-2">
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={() => handleSort('title')}
                  className="font-medium text-muted-foreground hover:text-foreground"
                >
                  Música
                  <Icon name="ArrowUpDown" size={14} className="ml-1" />
                </Button>
              </th>
              <th className="text-left py-3 px-2 hidden sm:table-cell">Status</th>
              <th className="text-left py-3 px-2 hidden md:table-cell">Plataformas</th>
              <th className="text-right py-3 px-2">
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={() => handleSort('streams')}
                  className="font-medium text-muted-foreground hover:text-foreground"
                >
                  Streams
                  <Icon name="ArrowUpDown" size={14} className="ml-1" />
                </Button>
              </th>
              <th className="text-right py-3 px-2">
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={() => handleSort('revenue')}
                  className="font-medium text-muted-foreground hover:text-foreground"
                >
                  Receita
                  <Icon name="ArrowUpDown" size={14} className="ml-1" />
                </Button>
              </th>
              <th className="text-center py-3 px-2">Ações</th>
            </tr>
          </thead>
          <tbody>
            {sortedReleases?.map((release) => (
              <tr key={release?.id} className="border-b border-border hover:bg-muted/30 transition-colors">
                <td className="py-4 px-2">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 rounded-lg overflow-hidden bg-muted flex-shrink-0">
                      <Image 
                        src={release?.coverArt} 
                        alt={`Capa de ${release?.title}`}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="font-medium text-foreground truncate">{release?.title}</p>
                      <p className="text-sm text-muted-foreground truncate">{release?.artist}</p>
                      <p className="text-xs text-muted-foreground sm:hidden">{release?.releaseDate}</p>
                    </div>
                  </div>
                </td>
                <td className="py-4 px-2 hidden sm:table-cell">
                  {getStatusBadge(release?.status)}
                </td>
                <td className="py-4 px-2 hidden md:table-cell">
                  <div className="flex flex-wrap gap-1">
                    {release?.platforms?.slice(0, 2)?.map((platform) => (
                      <span key={platform} className="inline-block px-2 py-1 bg-muted text-muted-foreground text-xs rounded">
                        {platform}
                      </span>
                    ))}
                    {release?.platforms?.length > 2 && (
                      <span className="inline-block px-2 py-1 bg-muted text-muted-foreground text-xs rounded">
                        +{release?.platforms?.length - 2}
                      </span>
                    )}
                  </div>
                </td>
                <td className="py-4 px-2 text-right">
                  <p className="font-medium text-foreground">{release?.streams?.toLocaleString('pt-BR')}</p>
                </td>
                <td className="py-4 px-2 text-right">
                  <p className="font-medium text-success">
                    R$ {release?.revenue?.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                  </p>
                </td>
                <td className="py-4 px-2 text-center">
                  <Button variant="ghost" size="sm" iconName="MoreHorizontal" />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RecentReleases;