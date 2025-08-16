import React, { useState } from 'react';
import { Checkbox } from '../../../components/ui/Checkbox';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';

const PlatformSelection = ({ selectedPlatforms, onPlatformChange, onNext, onPrevious }) => {
  const [selectAll, setSelectAll] = useState(false);

  const platforms = [
    {
      id: 'spotify',
      name: 'Spotify',
      logo: 'https://images.unsplash.com/photo-1611339555312-e607c8352fd7?w=100&h=100&fit=crop&crop=center',
      description: 'Maior plataforma de streaming mundial',
      category: 'streaming',
      processingTime: '1-3 dias',
      featured: true
    },
    {
      id: 'apple-music',
      name: 'Apple Music',
      logo: 'https://images.unsplash.com/photo-1621768216002-5ac171876625?w=100&h=100&fit=crop&crop=center',
      description: 'Plataforma da Apple para iOS e macOS',
      category: 'streaming',
      processingTime: '1-2 dias',
      featured: true
    },
    {
      id: 'youtube-music',
      name: 'YouTube Music',
      logo: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=100&h=100&fit=crop&crop=center',
      description: 'Serviço de música do YouTube',
      category: 'streaming',
      processingTime: '2-4 dias',
      featured: true
    },
    {
      id: 'amazon-music',
      name: 'Amazon Music',
      logo: 'https://images.unsplash.com/photo-1523474253046-8cd2748b5fd2?w=100&h=100&fit=crop&crop=center',
      description: 'Plataforma de streaming da Amazon',
      category: 'streaming',
      processingTime: '3-5 dias',
      featured: false
    },
    {
      id: 'deezer',
      name: 'Deezer',
      logo: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=100&h=100&fit=crop&crop=center',
      description: 'Plataforma francesa de streaming',
      category: 'streaming',
      processingTime: '2-3 dias',
      featured: false
    },
    {
      id: 'tidal',
      name: 'Tidal',
      logo: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=100&h=100&fit=crop&crop=center',
      description: 'Streaming de alta qualidade',
      category: 'streaming',
      processingTime: '3-7 dias',
      featured: false
    },
    {
      id: 'tiktok',
      name: 'TikTok',
      logo: 'https://images.unsplash.com/photo-1611262588024-d12430b98920?w=100&h=100&fit=crop&crop=center',
      description: 'Rede social de vídeos curtos',
      category: 'social',
      processingTime: '1-2 dias',
      featured: true
    },
    {
      id: 'instagram',
      name: 'Instagram',
      logo: 'https://images.unsplash.com/photo-1611262588019-db6cc2032da3?w=100&h=100&fit=crop&crop=center',
      description: 'Stories e Reels do Instagram',
      category: 'social',
      processingTime: '2-3 dias',
      featured: false
    },
    {
      id: 'soundcloud',
      name: 'SoundCloud',
      logo: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=100&h=100&fit=crop&crop=center',
      description: 'Plataforma para artistas independentes',
      category: 'streaming',
      processingTime: '1-2 dias',
      featured: false
    },
    {
      id: 'pandora',
      name: 'Pandora',
      logo: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=100&h=100&fit=crop&crop=center',
      description: 'Rádio personalizada',
      category: 'radio',
      processingTime: '5-7 dias',
      featured: false
    },
    {
      id: 'shazam',
      name: 'Shazam',
      logo: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=100&h=100&fit=crop&crop=center',
      description: 'Identificação de músicas',
      category: 'discovery',
      processingTime: '3-5 dias',
      featured: false
    },
    {
      id: 'beatport',
      name: 'Beatport',
      logo: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=100&h=100&fit=crop&crop=center',
      description: 'Especializada em música eletrônica',
      category: 'streaming',
      processingTime: '7-10 dias',
      featured: false
    }
  ];

  const categories = [
    { id: 'streaming', name: 'Streaming', icon: 'Music' },
    { id: 'social', name: 'Redes Sociais', icon: 'Share2' },
    { id: 'radio', name: 'Rádio', icon: 'Radio' },
    { id: 'discovery', name: 'Descoberta', icon: 'Search' }
  ];

  const featuredPlatforms = platforms?.filter(p => p?.featured);
  const otherPlatforms = platforms?.filter(p => !p?.featured);

  const handleSelectAll = (checked) => {
    setSelectAll(checked);
    if (checked) {
      onPlatformChange(platforms?.map(p => p?.id));
    } else {
      onPlatformChange([]);
    }
  };

  const handlePlatformToggle = (platformId, checked) => {
    if (checked) {
      onPlatformChange([...selectedPlatforms, platformId]);
    } else {
      onPlatformChange(selectedPlatforms?.filter(id => id !== platformId));
      setSelectAll(false);
    }
  };

  const getPlatformsByCategory = (categoryId) => {
    return platforms?.filter(p => p?.category === categoryId);
  };

  const selectedCount = selectedPlatforms?.length;
  const totalPlatforms = platforms?.length;

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <div className="mb-6">
        <h2 className="text-lg font-semibold text-foreground mb-2">Selecionar Plataformas</h2>
        <p className="text-muted-foreground">
          Escolha onde você deseja distribuir sua música. Você pode selecionar múltiplas plataformas.
        </p>
      </div>
      {/* Selection Summary */}
      <div className="bg-accent/5 border border-accent/20 rounded-lg p-4 mb-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Icon name="Target" size={20} className="text-accent" />
            <div>
              <div className="text-sm font-medium text-foreground">
                {selectedCount} de {totalPlatforms} plataformas selecionadas
              </div>
              <div className="text-xs text-muted-foreground">
                Alcance estimado: {selectedCount > 0 ? `${(selectedCount * 15)?.toLocaleString('pt-BR')}M+ usuários` : '0 usuários'}
              </div>
            </div>
          </div>
          <Checkbox
            label="Selecionar todas"
            checked={selectAll}
            onChange={(e) => handleSelectAll(e?.target?.checked)}
          />
        </div>
      </div>
      {/* Featured Platforms */}
      <div className="mb-8">
        <h3 className="text-md font-medium text-foreground mb-4 flex items-center">
          <Icon name="Star" size={18} className="text-warning mr-2" />
          Plataformas Recomendadas
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {featuredPlatforms?.map((platform) => (
            <div
              key={platform?.id}
              className={`relative border rounded-lg p-4 transition-all duration-200 cursor-pointer hover:shadow-md ${
                selectedPlatforms?.includes(platform?.id)
                  ? 'border-primary bg-primary/5' :'border-border hover:border-primary/50'
              }`}
              onClick={() => handlePlatformToggle(platform?.id, !selectedPlatforms?.includes(platform?.id))}
            >
              <div className="flex items-start space-x-3">
                <div className="w-12 h-12 rounded-lg overflow-hidden bg-muted flex-shrink-0">
                  <Image
                    src={platform?.logo}
                    alt={platform?.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <h4 className="text-sm font-medium text-foreground truncate">
                      {platform?.name}
                    </h4>
                    <Checkbox
                      checked={selectedPlatforms?.includes(platform?.id)}
                      onChange={(e) => handlePlatformToggle(platform?.id, e?.target?.checked)}
                    />
                  </div>
                  <p className="text-xs text-muted-foreground mt-1 line-clamp-2">
                    {platform?.description}
                  </p>
                  <div className="flex items-center mt-2 text-xs text-muted-foreground">
                    <Icon name="Clock" size={12} className="mr-1" />
                    {platform?.processingTime}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* Other Platforms by Category */}
      <div className="space-y-6">
        <h3 className="text-md font-medium text-foreground">Outras Plataformas</h3>
        
        {categories?.map((category) => {
          const categoryPlatforms = getPlatformsByCategory(category?.id)?.filter(p => !p?.featured);
          if (categoryPlatforms?.length === 0) return null;

          return (
            <div key={category?.id} className="space-y-3">
              <h4 className="text-sm font-medium text-foreground flex items-center">
                <Icon name={category?.icon} size={16} className="mr-2" />
                {category?.name}
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                {categoryPlatforms?.map((platform) => (
                  <div
                    key={platform?.id}
                    className={`border rounded-lg p-3 transition-all duration-200 cursor-pointer hover:shadow-sm ${
                      selectedPlatforms?.includes(platform?.id)
                        ? 'border-primary bg-primary/5' :'border-border hover:border-primary/50'
                    }`}
                    onClick={() => handlePlatformToggle(platform?.id, !selectedPlatforms?.includes(platform?.id))}
                  >
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 rounded-lg overflow-hidden bg-muted flex-shrink-0">
                        <Image
                          src={platform?.logo}
                          alt={platform?.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <h5 className="text-sm font-medium text-foreground truncate">
                            {platform?.name}
                          </h5>
                          <Checkbox
                            checked={selectedPlatforms?.includes(platform?.id)}
                            onChange={(e) => handlePlatformToggle(platform?.id, e?.target?.checked)}
                          />
                        </div>
                        <div className="flex items-center mt-1 text-xs text-muted-foreground">
                          <Icon name="Clock" size={12} className="mr-1" />
                          {platform?.processingTime}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
      {/* Navigation Buttons */}
      <div className="flex justify-between pt-6 border-t border-border mt-8">
        <Button
          variant="outline"
          onClick={onPrevious}
          iconName="ChevronLeft"
          iconPosition="left"
        >
          Voltar
        </Button>
        
        <Button
          onClick={onNext}
          disabled={selectedCount === 0}
          iconName="ChevronRight"
          iconPosition="right"
        >
          Continuar ({selectedCount} selecionadas)
        </Button>
      </div>
    </div>
  );
};

export default PlatformSelection;