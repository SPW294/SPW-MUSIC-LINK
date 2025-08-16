import React from 'react';
        import Icon from '../../../components/AppIcon';

        const FeatureShowcase = () => {
          const features = [
            {
              icon: 'Globe',
              title: '150+ Plataformas',
              description: 'Distribua para Spotify, Apple Music, YouTube Music, Deezer e muito mais'
            },
            {
              icon: 'BarChart3',
              title: 'Analytics Avançados',
              description: 'Acompanhe performance, demografia e tendências em tempo real'
            },
            {
              icon: 'DollarSign',
              title: 'Pagamentos Rápidos',
              description: 'Receba seus royalties de forma transparente e sem demora'
            },
            {
              icon: 'Users',
              title: 'Suporte Especializado',
              description: 'Equipe dedicada para ajudar no seu crescimento musical'
            }
          ];

          const platforms = [
            'Spotify', 'Apple Music', 'YouTube Music', 'Deezer', 'Amazon Music',
            'TikTok', 'Instagram', 'Facebook', 'Tidal', 'Pandora',
            'Shazam', 'SoundCloud', 'Napster', 'iHeartRadio', 'Claro Música'
          ];

          return (
            <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-primary/10 via-secondary/5 to-primary/5 p-12 items-center">
              <div className="w-full max-w-lg">
                {/* Hero Content */}
                <div className="mb-12">
                  <h2 className="text-4xl font-bold text-foreground mb-4">
                    Transforme sua música em <span className="text-primary">sucesso global</span>
                  </h2>
                  <p className="text-xl text-muted-foreground">
                    A plataforma completa para distribuir, monitorar e monetizar sua música
                  </p>
                </div>

                {/* Features */}
                <div className="space-y-6 mb-12">
                  {features?.map((feature, index) => (
                    <div key={index} className="flex items-start space-x-4">
                      <div className="flex items-center justify-center w-12 h-12 bg-primary/10 rounded-lg flex-shrink-0">
                        <Icon name={feature?.icon} size={24} className="text-primary" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-foreground mb-1">
                          {feature?.title}
                        </h3>
                        <p className="text-muted-foreground">
                          {feature?.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Platform Showcase */}
                <div className="bg-card/50 backdrop-blur-sm rounded-xl p-6 border border-border">
                  <h3 className="font-semibold text-foreground mb-4 text-center">
                    Suas músicas em todas as plataformas
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {platforms?.slice(0, 12)?.map((platform, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 bg-secondary/20 rounded-full text-sm text-muted-foreground"
                      >
                        {platform}
                      </span>
                    ))}
                    <span className="px-3 py-1 bg-primary/20 text-primary rounded-full text-sm font-medium">
                      +138 mais
                    </span>
                  </div>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-3 gap-6 mt-8 pt-8 border-t border-border">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-primary">50K+</div>
                    <div className="text-sm text-muted-foreground">Artistas</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-primary">1M+</div>
                    <div className="text-sm text-muted-foreground">Músicas</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-primary">150+</div>
                    <div className="text-sm text-muted-foreground">Países</div>
                  </div>
                </div>
              </div>
            </div>
          );
        };

        export default FeatureShowcase;