import React, { useState, useMemo } from 'react';
import { Helmet } from 'react-helmet';
import Header from '../../components/ui/Header';
import Button from '../../components/ui/Button';
import Icon from '../../components/AppIcon';
import ReleaseTable from './components/ReleaseTable';
import FilterBar from './components/FilterBar';
import BulkActionsBar from './components/BulkActionsBar';
import ReleaseCalendar from './components/ReleaseCalendar';
import QuickStats from './components/QuickStats';
import ViewToggle from './components/ViewToggle';

const ReleaseManagement = () => {
  const [currentView, setCurrentView] = useState('table');
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [platformFilter, setPlatformFilter] = useState('all');
  const [dateFilter, setDateFilter] = useState('all');
  const [selectedReleases, setSelectedReleases] = useState([]);
  const [sortConfig, setSortConfig] = useState({ key: 'releaseDate', direction: 'desc' });

  // Mock data for releases
  const mockReleases = [
    {
      id: 1,
      title: "Noites de Verão",
      artist: "Marina Silva",
      artwork: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=400&fit=crop",
      releaseDate: "2025-01-15",
      status: "live",
      totalStreams: 125000,
      totalRevenue: 2500.75,
      platforms: [
        { name: "Spotify", status: "live" },
        { name: "Apple Music", status: "live" },
        { name: "YouTube Music", status: "live" },
        { name: "Deezer", status: "processing" },
        { name: "TikTok", status: "live" }
      ],
      optimizationTips: [
        "Considere criar um videoclipe para aumentar o engajamento",
        "Adicione tags de gênero mais específicas para melhor descoberta"
      ]
    },
    {
      id: 2,
      title: "Batidas Urbanas",
      artist: "DJ Carlos",
      artwork: "https://images.unsplash.com/photo-1571974599782-87624638275c?w=400&h=400&fit=crop",
      releaseDate: "2025-01-20",
      status: "processing",
      totalStreams: 89000,
      totalRevenue: 1780.50,
      platforms: [
        { name: "Spotify", status: "processing" },
        { name: "Apple Music", status: "pending" },
        { name: "YouTube Music", status: "live" },
        { name: "Deezer", status: "processing" },
        { name: "Amazon Music", status: "pending" }
      ],
      optimizationTips: [
        "Aguarde a aprovação em todas as plataformas antes de promover",
        "Prepare material promocional para redes sociais"
      ]
    },
    {
      id: 3,
      title: "Melodias do Coração",
      artist: "Ana Beatriz",
      artwork: "https://images.unsplash.com/photo-1516280440614-37939bbacd81?w=400&h=400&fit=crop",
      releaseDate: "2025-01-10",
      status: "live",
      totalStreams: 234000,
      totalRevenue: 4680.25,
      platforms: [
        { name: "Spotify", status: "live" },
        { name: "Apple Music", status: "live" },
        { name: "YouTube Music", status: "live" },
        { name: "Deezer", status: "live" },
        { name: "TikTok", status: "live" },
        { name: "Amazon Music", status: "live" }
      ],
      optimizationTips: [
        "Performance excelente! Considere lançar um remix",
        "Explore parcerias com influenciadores musicais"
      ]
    },
    {
      id: 4,
      title: "Ritmos Brasileiros",
      artist: "Grupo Samba Novo",
      artwork: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=400&h=400&fit=crop",
      releaseDate: "2025-01-25",
      status: "pending",
      totalStreams: 0,
      totalRevenue: 0,
      platforms: [
        { name: "Spotify", status: "pending" },
        { name: "Apple Music", status: "pending" },
        { name: "YouTube Music", status: "pending" },
        { name: "Deezer", status: "pending" }
      ],
      optimizationTips: [
        "Lançamento agendado para próxima semana",
        "Prepare campanha de marketing para o dia do lançamento"
      ]
    },
    {
      id: 5,
      title: "Eletrônica Experimental",
      artist: "Tech Sound",
      artwork: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=400&h=400&fit=crop",
      releaseDate: "2025-01-05",
      status: "failed",
      totalStreams: 15000,
      totalRevenue: 300.00,
      platforms: [
        { name: "Spotify", status: "failed" },
        { name: "Apple Music", status: "live" },
        { name: "YouTube Music", status: "live" },
        { name: "Deezer", status: "failed" }
      ],
      optimizationTips: [
        "Verifique os metadados e reenvie para Spotify",
        "Contate o suporte para resolver problemas de distribuição"
      ]
    },
    {
      id: 6,
      title: "Acústico Intimista",
      artist: "Pedro Violão",
      artwork: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=400&fit=crop",
      releaseDate: "2025-02-01",
      status: "pending",
      totalStreams: 0,
      totalRevenue: 0,
      platforms: [
        { name: "Spotify", status: "pending" },
        { name: "Apple Music", status: "pending" },
        { name: "YouTube Music", status: "pending" }
      ],
      optimizationTips: [
        "Lançamento programado para próximo mês",
        "Considere fazer pré-save nas plataformas"
      ]
    }
  ];

  // Filter and sort releases
  const filteredReleases = useMemo(() => {
    let filtered = mockReleases?.filter(release => {
      const matchesSearch = !searchTerm || 
        release?.title?.toLowerCase()?.includes(searchTerm?.toLowerCase()) ||
        release?.artist?.toLowerCase()?.includes(searchTerm?.toLowerCase());
      
      const matchesStatus = statusFilter === 'all' || release?.status === statusFilter;
      
      const matchesPlatform = platformFilter === 'all' || 
        release?.platforms?.some(p => p?.name?.toLowerCase()?.replace(/\s+/g, '-') === platformFilter);
      
      const matchesDate = dateFilter === 'all' || (() => {
        const releaseDate = new Date(release.releaseDate);
        const now = new Date();
        
        switch (dateFilter) {
          case 'today':
            return releaseDate?.toDateString() === now?.toDateString();
          case 'week':
            const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
            return releaseDate >= weekAgo && releaseDate <= now;
          case 'month':
            return releaseDate?.getMonth() === now?.getMonth() && 
                   releaseDate?.getFullYear() === now?.getFullYear();
          case 'quarter':
            const quarter = Math.floor(now?.getMonth() / 3);
            const releaseQuarter = Math.floor(releaseDate?.getMonth() / 3);
            return releaseQuarter === quarter && 
                   releaseDate?.getFullYear() === now?.getFullYear();
          case 'year':
            return releaseDate?.getFullYear() === now?.getFullYear();
          default:
            return true;
        }
      })();
      
      return matchesSearch && matchesStatus && matchesPlatform && matchesDate;
    });

    // Sort releases
    if (sortConfig?.key) {
      filtered?.sort((a, b) => {
        let aValue = a?.[sortConfig?.key];
        let bValue = b?.[sortConfig?.key];
        
        if (sortConfig?.key === 'releaseDate') {
          aValue = new Date(aValue);
          bValue = new Date(bValue);
        }
        
        if (aValue < bValue) {
          return sortConfig?.direction === 'asc' ? -1 : 1;
        }
        if (aValue > bValue) {
          return sortConfig?.direction === 'asc' ? 1 : -1;
        }
        return 0;
      });
    }

    return filtered;
  }, [mockReleases, searchTerm, statusFilter, platformFilter, dateFilter, sortConfig]);

  // Handle filter clearing
  const handleClearFilters = () => {
    setSearchTerm('');
    setStatusFilter('all');
    setPlatformFilter('all');
    setDateFilter('all');
  };

  // Handle bulk actions
  const handleSelectAll = () => {
    setSelectedReleases(filteredReleases?.map(r => r?.id));
  };

  const handleDeselectAll = () => {
    setSelectedReleases([]);
  };

  const handleBulkEdit = () => {
    console.log('Bulk edit releases:', selectedReleases);
    // Implement bulk edit logic
  };

  const handleBulkDelete = () => {
    console.log('Bulk delete releases:', selectedReleases);
    // Implement bulk delete logic
  };

  const handleBulkStatusUpdate = (status) => {
    console.log('Bulk status update:', selectedReleases, status);
    // Implement bulk status update logic
  };

  // Handle individual release actions
  const handleEditRelease = (release) => {
    console.log('Edit release:', release);
    // Navigate to edit page or open modal
  };

  const handleDuplicateRelease = (release) => {
    console.log('Duplicate release:', release);
    // Implement duplicate logic
  };

  const handleDeleteRelease = (release) => {
    console.log('Delete release:', release);
    // Implement delete logic
  };

  const handleViewReleaseDetails = (release) => {
    console.log('View release details:', release);
    // Navigate to details page or open modal
  };

  const handleRescheduleRelease = (release, newDate) => {
    console.log('Reschedule release:', release, newDate);
    // Implement reschedule logic
  };

  return (
    <>
      <Helmet>
        <title>Gerenciamento de Lançamentos - SPW Music Link</title>
        <meta name="description" content="Gerencie seus lançamentos musicais, acompanhe o status de distribuição e otimize sua presença nas plataformas de streaming." />
      </Helmet>
      <div className="min-h-screen bg-background">
        <Header />
        
        <main className="pt-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            {/* Page Header */}
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-8">
              <div className="mb-4 lg:mb-0">
                <h1 className="text-3xl font-bold text-foreground">Gerenciamento de Lançamentos</h1>
                <p className="text-muted-foreground mt-2">
                  Controle completo sobre seu catálogo musical e distribuição nas plataformas
                </p>
              </div>
              
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                <ViewToggle currentView={currentView} onViewChange={setCurrentView} />
                <Button
                  variant="default"
                  iconName="Plus"
                  iconPosition="left"
                  iconSize={16}
                  onClick={() => console.log('Navigate to upload')}
                >
                  Novo Lançamento
                </Button>
              </div>
            </div>

            {/* Quick Stats */}
            <QuickStats releases={mockReleases} />

            {/* Filter Bar */}
            <FilterBar
              searchTerm={searchTerm}
              setSearchTerm={setSearchTerm}
              statusFilter={statusFilter}
              setStatusFilter={setStatusFilter}
              platformFilter={platformFilter}
              setPlatformFilter={setPlatformFilter}
              dateFilter={dateFilter}
              setDateFilter={setDateFilter}
              onClearFilters={handleClearFilters}
            />

            {/* Bulk Actions Bar */}
            <BulkActionsBar
              selectedReleases={selectedReleases}
              onSelectAll={handleSelectAll}
              onDeselectAll={handleDeselectAll}
              onBulkEdit={handleBulkEdit}
              onBulkDelete={handleBulkDelete}
              onBulkStatusUpdate={handleBulkStatusUpdate}
              totalReleases={filteredReleases?.length}
            />

            {/* Main Content */}
            {currentView === 'table' ? (
              <ReleaseTable
                releases={filteredReleases}
                onEdit={handleEditRelease}
                onDuplicate={handleDuplicateRelease}
                onDelete={handleDeleteRelease}
                onViewDetails={handleViewReleaseDetails}
              />
            ) : (
              <ReleaseCalendar
                releases={filteredReleases}
                onReschedule={handleRescheduleRelease}
                onViewRelease={handleViewReleaseDetails}
              />
            )}

            {/* Empty State */}
            {filteredReleases?.length === 0 && (
              <div className="text-center py-12">
                <div className="bg-muted/30 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <Icon name="Music" size={32} className="text-muted-foreground" />
                </div>
                <h3 className="text-lg font-medium text-foreground mb-2">
                  Nenhum lançamento encontrado
                </h3>
                <p className="text-muted-foreground mb-6">
                  {searchTerm || statusFilter !== 'all' || platformFilter !== 'all' || dateFilter !== 'all'
                    ? 'Tente ajustar os filtros para encontrar seus lançamentos.' :'Comece fazendo o upload da sua primeira música.'}
                </p>
                <Button
                  variant="default"
                  iconName="Plus"
                  iconPosition="left"
                  iconSize={16}
                  onClick={() => console.log('Navigate to upload')}
                >
                  Fazer Upload
                </Button>
              </div>
            )}
          </div>
        </main>
      </div>
    </>
  );
};

export default ReleaseManagement;