import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Image from '../../../components/AppImage';

const PerformanceTable = ({ title = "Performance das Faixas" }) => {
  const [sortField, setSortField] = useState('streams');
  const [sortDirection, setSortDirection] = useState('desc');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const trackData = [
    {
      id: 1,
      title: 'Noite de Verão',
      artist: 'João Silva',
      cover: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=100&h=100&fit=crop',
      releaseDate: '2024-07-15',
      streams: 285600,
      revenue: 5420.80,
      platforms: 6,
      engagement: 8.5,
      growth: '+12.5%'
    },
    {
      id: 2,
      title: 'Coração Brasileiro',
      artist: 'Maria Santos',
      cover: 'https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?w=100&h=100&fit=crop',
      releaseDate: '2024-06-28',
      streams: 234800,
      revenue: 4680.60,
      platforms: 8,
      engagement: 9.2,
      growth: '+8.7%'
    },
    {
      id: 3,
      title: 'Samba do Futuro',
      artist: 'Carlos Mendes',
      cover: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=100&h=100&fit=crop',
      releaseDate: '2024-08-01',
      streams: 198400,
      revenue: 3890.40,
      platforms: 5,
      engagement: 7.8,
      growth: '+15.3%'
    },
    {
      id: 4,
      title: 'Melodia Urbana',
      artist: 'Ana Costa',
      cover: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=100&h=100&fit=crop',
      releaseDate: '2024-05-12',
      streams: 156200,
      revenue: 3120.40,
      platforms: 7,
      engagement: 6.9,
      growth: '+4.2%'
    },
    {
      id: 5,
      title: 'Ritmo da Cidade',
      artist: 'Pedro Lima',
      cover: 'https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?w=100&h=100&fit=crop',
      releaseDate: '2024-07-03',
      streams: 142800,
      revenue: 2856.00,
      platforms: 6,
      engagement: 8.1,
      growth: '+6.8%'
    },
    {
      id: 6,
      title: 'Bossa Nova 2024',
      artist: 'Lucia Ferreira',
      cover: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=100&h=100&fit=crop',
      releaseDate: '2024-06-15',
      streams: 128600,
      revenue: 2572.00,
      platforms: 5,
      engagement: 7.5,
      growth: '+9.1%'
    },
    {
      id: 7,
      title: 'Forró Eletrônico',
      artist: 'Roberto Alves',
      cover: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=100&h=100&fit=crop',
      releaseDate: '2024-08-08',
      streams: 98400,
      revenue: 1968.00,
      platforms: 4,
      engagement: 6.3,
      growth: '+11.4%'
    },
    {
      id: 8,
      title: 'MPB Contemporânea',
      artist: 'Fernanda Rocha',
      cover: 'https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?w=100&h=100&fit=crop',
      releaseDate: '2024-05-28',
      streams: 89600,
      revenue: 1792.00,
      platforms: 6,
      engagement: 7.2,
      growth: '+3.7%'
    },
    {
      id: 9,
      title: 'Funk Carioca',
      artist: 'MC Brasileiro',
      cover: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=100&h=100&fit=crop',
      releaseDate: '2024-07-20',
      streams: 76800,
      revenue: 1536.00,
      platforms: 5,
      engagement: 8.9,
      growth: '+18.2%'
    },
    {
      id: 10,
      title: 'Rock Nacional',
      artist: 'Banda Moderna',
      cover: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=100&h=100&fit=crop',
      releaseDate: '2024-06-05',
      streams: 67200,
      revenue: 1344.00,
      platforms: 7,
      engagement: 5.8,
      growth: '+2.1%'
    }
  ];

  const handleSort = (field) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('desc');
    }
  };

  const sortedData = [...trackData]?.sort((a, b) => {
    let aValue = a?.[sortField];
    let bValue = b?.[sortField];
    
    if (typeof aValue === 'string' && aValue?.includes('%')) {
      aValue = parseFloat(aValue?.replace('%', '')?.replace('+', ''));
      bValue = parseFloat(bValue?.replace('%', '')?.replace('+', ''));
    }
    
    if (sortDirection === 'asc') {
      return aValue > bValue ? 1 : -1;
    } else {
      return aValue < bValue ? 1 : -1;
    }
  });

  const totalPages = Math.ceil(sortedData?.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedData = sortedData?.slice(startIndex, startIndex + itemsPerPage);

  const SortIcon = ({ field }) => {
    if (sortField !== field) {
      return <Icon name="ArrowUpDown" size={14} className="text-muted-foreground" />;
    }
    return (
      <Icon 
        name={sortDirection === 'asc' ? 'ArrowUp' : 'ArrowDown'} 
        size={14} 
        className="text-primary" 
      />
    );
  };

  const getEngagementColor = (engagement) => {
    if (engagement >= 8) return 'text-success';
    if (engagement >= 6) return 'text-warning';
    return 'text-error';
  };

  const getGrowthColor = (growth) => {
    const value = parseFloat(growth?.replace('%', '')?.replace('+', ''));
    if (value > 10) return 'text-success';
    if (value > 5) return 'text-warning';
    return 'text-muted-foreground';
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-foreground">{title}</h3>
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="sm" iconName="Filter">
            Filtros
          </Button>
          <Button variant="outline" size="sm" iconName="Download">
            Exportar
          </Button>
        </div>
      </div>
      {/* Desktop Table */}
      <div className="hidden lg:block overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border">
              <th className="text-left py-3 px-4 font-medium text-muted-foreground">Faixa</th>
              <th 
                className="text-right py-3 px-4 font-medium text-muted-foreground cursor-pointer hover:text-foreground"
                onClick={() => handleSort('streams')}
              >
                <div className="flex items-center justify-end space-x-1">
                  <span>Streams</span>
                  <SortIcon field="streams" />
                </div>
              </th>
              <th 
                className="text-right py-3 px-4 font-medium text-muted-foreground cursor-pointer hover:text-foreground"
                onClick={() => handleSort('revenue')}
              >
                <div className="flex items-center justify-end space-x-1">
                  <span>Receita</span>
                  <SortIcon field="revenue" />
                </div>
              </th>
              <th 
                className="text-center py-3 px-4 font-medium text-muted-foreground cursor-pointer hover:text-foreground"
                onClick={() => handleSort('platforms')}
              >
                <div className="flex items-center justify-center space-x-1">
                  <span>Plataformas</span>
                  <SortIcon field="platforms" />
                </div>
              </th>
              <th 
                className="text-center py-3 px-4 font-medium text-muted-foreground cursor-pointer hover:text-foreground"
                onClick={() => handleSort('engagement')}
              >
                <div className="flex items-center justify-center space-x-1">
                  <span>Engajamento</span>
                  <SortIcon field="engagement" />
                </div>
              </th>
              <th 
                className="text-right py-3 px-4 font-medium text-muted-foreground cursor-pointer hover:text-foreground"
                onClick={() => handleSort('growth')}
              >
                <div className="flex items-center justify-end space-x-1">
                  <span>Crescimento</span>
                  <SortIcon field="growth" />
                </div>
              </th>
              <th className="text-center py-3 px-4 font-medium text-muted-foreground">Ações</th>
            </tr>
          </thead>
          <tbody>
            {paginatedData?.map((track) => (
              <tr key={track?.id} className="border-b border-border/50 hover:bg-muted/20">
                <td className="py-4 px-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 rounded-lg overflow-hidden bg-muted">
                      <Image 
                        src={track?.cover} 
                        alt={track?.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <div className="font-medium text-foreground">{track?.title}</div>
                      <div className="text-sm text-muted-foreground">{track?.artist}</div>
                      <div className="text-xs text-muted-foreground">
                        {new Date(track.releaseDate)?.toLocaleDateString('pt-BR')}
                      </div>
                    </div>
                  </div>
                </td>
                <td className="text-right py-4 px-4 text-foreground font-medium">
                  {track?.streams?.toLocaleString('pt-BR')}
                </td>
                <td className="text-right py-4 px-4 text-foreground font-medium">
                  R$ {track?.revenue?.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                </td>
                <td className="text-center py-4 px-4">
                  <span className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-primary/10 text-primary">
                    {track?.platforms} plataformas
                  </span>
                </td>
                <td className="text-center py-4 px-4">
                  <span className={`font-medium ${getEngagementColor(track?.engagement)}`}>
                    {track?.engagement}/10
                  </span>
                </td>
                <td className={`text-right py-4 px-4 font-medium ${getGrowthColor(track?.growth)}`}>
                  {track?.growth}
                </td>
                <td className="text-center py-4 px-4">
                  <div className="flex items-center justify-center space-x-1">
                    <Button variant="ghost" size="sm" iconName="Eye" />
                    <Button variant="ghost" size="sm" iconName="MoreHorizontal" />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* Mobile Cards */}
      <div className="lg:hidden space-y-4">
        {paginatedData?.map((track) => (
          <div key={track?.id} className="bg-muted/20 border border-border rounded-lg p-4">
            <div className="flex items-start space-x-3 mb-3">
              <div className="w-16 h-16 rounded-lg overflow-hidden bg-muted flex-shrink-0">
                <Image 
                  src={track?.cover} 
                  alt={track?.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="font-medium text-foreground truncate">{track?.title}</h4>
                <p className="text-sm text-muted-foreground">{track?.artist}</p>
                <p className="text-xs text-muted-foreground">
                  {new Date(track.releaseDate)?.toLocaleDateString('pt-BR')}
                </p>
              </div>
              <Button variant="ghost" size="sm" iconName="MoreHorizontal" />
            </div>
            
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-muted-foreground">Streams:</span>
                <div className="font-medium text-foreground">
                  {track?.streams?.toLocaleString('pt-BR')}
                </div>
              </div>
              <div>
                <span className="text-muted-foreground">Receita:</span>
                <div className="font-medium text-foreground">
                  R$ {track?.revenue?.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                </div>
              </div>
              <div>
                <span className="text-muted-foreground">Engajamento:</span>
                <div className={`font-medium ${getEngagementColor(track?.engagement)}`}>
                  {track?.engagement}/10
                </div>
              </div>
              <div>
                <span className="text-muted-foreground">Crescimento:</span>
                <div className={`font-medium ${getGrowthColor(track?.growth)}`}>
                  {track?.growth}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between mt-6 pt-4 border-t border-border">
          <div className="text-sm text-muted-foreground">
            Mostrando {startIndex + 1} a {Math.min(startIndex + itemsPerPage, trackData?.length)} de {trackData?.length} faixas
          </div>
          
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="sm"
              iconName="ChevronLeft"
              disabled={currentPage === 1}
              onClick={() => setCurrentPage(currentPage - 1)}
            >
              Anterior
            </Button>
            
            <div className="flex items-center space-x-1">
              {Array.from({ length: totalPages }, (_, i) => i + 1)?.map((page) => (
                <Button
                  key={page}
                  variant={currentPage === page ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => setCurrentPage(page)}
                  className="w-8 h-8"
                >
                  {page}
                </Button>
              ))}
            </div>
            
            <Button
              variant="outline"
              size="sm"
              iconName="ChevronRight"
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage(currentPage + 1)}
            >
              Próximo
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default PerformanceTable;