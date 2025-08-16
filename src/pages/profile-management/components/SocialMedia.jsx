import React, { useState } from 'react';
        import Button from '../../../components/ui/Button';
        import Input from '../../../components/ui/Input';
        import Icon from '../../../components/AppIcon';

        const SocialMedia = ({ profile, updateProfile }) => {
          const [localProfile, setLocalProfile] = useState(profile);
          const [verificationStatus, setVerificationStatus] = useState({});
          const [isVerifying, setIsVerifying] = useState({});

          const socialPlatforms = [
            {
              key: 'spotify',
              label: 'Spotify',
              icon: 'Music',
              placeholder: 'https://open.spotify.com/artist/...',
              description: 'Perfil de artista no Spotify',
              color: 'text-green-500',
              bgColor: 'bg-green-50'
            },
            {
              key: 'instagram',
              label: 'Instagram',
              icon: 'Instagram',
              placeholder: '@seuusuario ou https://instagram.com/...',
              description: 'Perfil no Instagram',
              color: 'text-pink-500',
              bgColor: 'bg-pink-50'
            },
            {
              key: 'twitter',
              label: 'Twitter/X',
              icon: 'Twitter',
              placeholder: '@seuusuario ou https://twitter.com/...',
              description: 'Perfil no Twitter/X',
              color: 'text-blue-500',
              bgColor: 'bg-blue-50'
            },
            {
              key: 'youtube',
              label: 'YouTube',
              icon: 'Youtube',
              placeholder: 'https://youtube.com/channel/...',
              description: 'Canal no YouTube',
              color: 'text-red-500',
              bgColor: 'bg-red-50'
            },
            {
              key: 'soundcloud',
              label: 'SoundCloud',
              icon: 'Music',
              placeholder: 'https://soundcloud.com/...',
              description: 'Perfil no SoundCloud',
              color: 'text-orange-500',
              bgColor: 'bg-orange-50'
            },
            {
              key: 'tiktok',
              label: 'TikTok',
              icon: 'Video',
              placeholder: '@seuusuario ou https://tiktok.com/@...',
              description: 'Perfil no TikTok',
              color: 'text-gray-800',
              bgColor: 'bg-gray-50'
            },
            {
              key: 'facebook',
              label: 'Facebook',
              icon: 'Facebook',
              placeholder: 'https://facebook.com/...',
              description: 'Página no Facebook',
              color: 'text-blue-600',
              bgColor: 'bg-blue-50'
            },
            {
              key: 'apple',
              label: 'Apple Music',
              icon: 'Music',
              placeholder: 'https://music.apple.com/artist/...',
              description: 'Perfil no Apple Music',
              color: 'text-gray-700',
              bgColor: 'bg-gray-50'
            },
            {
              key: 'deezer',
              label: 'Deezer',
              icon: 'Music',
              placeholder: 'https://deezer.com/artist/...',
              description: 'Perfil no Deezer',
              color: 'text-purple-500',
              bgColor: 'bg-purple-50'
            },
            {
              key: 'bandcamp',
              label: 'Bandcamp',
              icon: 'Music',
              placeholder: 'https://seuartista.bandcamp.com',
              description: 'Perfil no Bandcamp',
              color: 'text-cyan-600',
              bgColor: 'bg-cyan-50'
            }
          ];

          const handleInputChange = (platform, value) => {
            const updatedSocialLinks = {
              ...localProfile?.socialLinks,
              [platform]: value
            };
            const updatedProfile = {
              ...localProfile,
              socialLinks: updatedSocialLinks
            };
            setLocalProfile(updatedProfile);
            updateProfile(updatedProfile);
          };

          const validateUrl = (url, platform) => {
            if (!url) return true;
            
            // Basic URL validation
            try {
              new URL(url?.startsWith('http') ? url : `https://${url}`);
              return true;
            } catch {
              // Handle @ mentions for social platforms
              if ((platform === 'instagram' || platform === 'twitter' || platform === 'tiktok') && url?.startsWith('@')) {
                return url?.length > 1;
              }
              return false;
            }
          };

          const handleVerification = async (platform) => {
            setIsVerifying({ ...isVerifying, [platform]: true });
            
            // Simulate verification process
            setTimeout(() => {
              const isValid = validateUrl(localProfile?.socialLinks?.[platform], platform);
              setVerificationStatus({
                ...verificationStatus,
                [platform]: isValid ? 'verified' : 'error'
              });
              setIsVerifying({ ...isVerifying, [platform]: false });
            }, 2000);
          };

          const formatUrl = (url, platform) => {
            if (!url) return '';
            
            // Handle @ mentions
            if (url?.startsWith('@')) {
              switch (platform) {
                case 'instagram':
                  return `https://instagram.com/${url?.slice(1)}`;
                case 'twitter':
                  return `https://twitter.com/${url?.slice(1)}`;
                case 'tiktok':
                  return `https://tiktok.com/@${url?.slice(1)}`;
                default:
                  return url;
              }
            }
            
            // Add protocol if missing
            if (url && !url?.startsWith('http')) {
              return `https://${url}`;
            }
            
            return url;
          };

          const getConnectedCount = () => {
            return Object.values(localProfile?.socialLinks || {})?.filter(link => link?.trim())?.length;
          };

          return (
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-xl font-semibold text-foreground mb-1">
                    Redes Sociais
                  </h2>
                  <p className="text-muted-foreground">
                    Conecte suas redes sociais e plataformas de música
                  </p>
                </div>

                {/* Connection Status */}
                <div className="text-right">
                  <div className="text-sm text-muted-foreground mb-1">
                    Plataformas conectadas
                  </div>
                  <div className="text-lg font-semibold text-primary">
                    {getConnectedCount()}/{socialPlatforms?.length}
                  </div>
                </div>
              </div>

              {/* Quick Stats */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
                <div className="bg-primary/10 rounded-lg p-4 text-center">
                  <div className="text-2xl font-bold text-primary mb-1">
                    {getConnectedCount()}
                  </div>
                  <div className="text-sm text-muted-foreground">Conectadas</div>
                </div>
                <div className="bg-success/10 rounded-lg p-4 text-center">
                  <div className="text-2xl font-bold text-success mb-1">
                    {Object.values(verificationStatus)?.filter(status => status === 'verified')?.length}
                  </div>
                  <div className="text-sm text-muted-foreground">Verificadas</div>
                </div>
                <div className="bg-secondary/20 rounded-lg p-4 text-center">
                  <div className="text-2xl font-bold text-foreground mb-1">
                    {socialPlatforms?.length - getConnectedCount()}
                  </div>
                  <div className="text-sm text-muted-foreground">Disponíveis</div>
                </div>
              </div>

              <div className="space-y-6">
                {socialPlatforms?.map((platform) => {
                  const currentValue = localProfile?.socialLinks?.[platform?.key] || '';
                  const isConnected = currentValue?.trim();
                  const status = verificationStatus?.[platform?.key];
                  const isLoading = isVerifying?.[platform?.key];

                  return (
                    <div key={platform?.key} className="border border-border rounded-lg p-4 hover:border-primary/50 transition-colors">
                      <div className="flex items-start space-x-4">
                        {/* Platform Icon */}
                        <div className={`flex items-center justify-center w-12 h-12 rounded-lg ${platform?.bgColor}`}>
                          <Icon name={platform?.icon} size={24} className={platform?.color} />
                        </div>

                        {/* Platform Details */}
                        <div className="flex-1 space-y-3">
                          <div className="flex items-center justify-between">
                            <div>
                              <h3 className="font-medium text-foreground">{platform?.label}</h3>
                              <p className="text-sm text-muted-foreground">{platform?.description}</p>
                            </div>

                            {/* Status Indicator */}
                            <div className="flex items-center space-x-2">
                              {status === 'verified' && (
                                <div className="flex items-center space-x-1 px-2 py-1 bg-success/10 text-success rounded-full">
                                  <Icon name="CheckCircle" size={14} />
                                  <span className="text-xs font-medium">Verificado</span>
                                </div>
                              )}
                              {status === 'error' && (
                                <div className="flex items-center space-x-1 px-2 py-1 bg-error/10 text-error rounded-full">
                                  <Icon name="AlertCircle" size={14} />
                                  <span className="text-xs font-medium">Erro</span>
                                </div>
                              )}
                              {isConnected && (
                                <div className="flex items-center space-x-1 px-2 py-1 bg-primary/10 text-primary rounded-full">
                                  <Icon name="Link" size={14} />
                                  <span className="text-xs font-medium">Conectado</span>
                                </div>
                              )}
                            </div>
                          </div>

                          {/* Input Field */}
                          <div className="flex space-x-2">
                            <div className="flex-1">
                              <Input
                                placeholder={platform?.placeholder}
                                value={currentValue}
                                onChange={(e) => handleInputChange(platform?.key, e?.target?.value)}
                                className={`${
                                  status === 'verified' ? 'border-success focus:ring-success/50' :
                                  status === 'error'? 'border-error focus:ring-error/50' : 'border-border'
                                }`}
                                rightIcon={
                                  isConnected && !isLoading ? (
                                    <button
                                      onClick={() => window.open(formatUrl(currentValue, platform?.key), '_blank')}
                                      className="text-muted-foreground hover:text-foreground transition-colors"
                                    >
                                      <Icon name="ExternalLink" size={16} />
                                    </button>
                                  ) : null
                                }
                              />
                              
                              {/* Helper Text */}
                              <div className="mt-1 flex items-center justify-between">
                                <p className="text-xs text-muted-foreground">
                                  {platform?.key === 'instagram' || platform?.key === 'twitter' || platform?.key === 'tiktok' 
                                    ? 'Use @ para usuário ou URL completa' :'Cole o link completo do seu perfil'
                                  }
                                </p>
                                
                                {status === 'error' && (
                                  <span className="text-xs text-error">Link inválido</span>
                                )}
                              </div>
                            </div>

                            {/* Verification Button */}
                            {isConnected && (
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => handleVerification(platform?.key)}
                                loading={isLoading}
                                disabled={status === 'verified'}
                                className="flex-shrink-0"
                              >
                                {isLoading ? 'Verificando...' : 
                                 status === 'verified' ? 'Verificado' : 'Verificar'}
                              </Button>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Tips Section */}
              <div className="mt-8 bg-secondary/10 border border-secondary/20 rounded-lg p-4">
                <div className="flex items-start space-x-3">
                  <Icon name="Lightbulb" size={20} className="text-secondary mt-0.5" />
                  <div>
                    <h3 className="font-medium text-foreground mb-2">Dicas para otimizar seu perfil social</h3>
                    <ul className="space-y-1 text-sm text-muted-foreground">
                      <li>• Conecte suas principais plataformas de música (Spotify, Apple Music, etc.)</li>
                      <li>• Use o mesmo nome artístico em todas as redes para facilitar o reconhecimento</li>
                      <li>• Mantenha seus perfis atualizados com suas últimas releases</li>
                      <li>• Links verificados aparecem com destaque em seu perfil público</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Bulk Actions */}
              <div className="mt-6 flex flex-col sm:flex-row gap-3">
                <Button
                  variant="outline"
                  onClick={() => {
                    // Auto-discover social links from website
                    alert('Funcionalidade de descoberta automática em desenvolvimento');
                  }}
                  iconName="Search"
                  iconPosition="left"
                  className="flex-1"
                >
                  Descobrir Automaticamente
                </Button>
                
                <Button
                  variant="outline"
                  onClick={() => {
                    // Verify all connected platforms
                    Object.keys(localProfile?.socialLinks || {})?.forEach(platform => {
                      if (localProfile?.socialLinks?.[platform]) {
                        handleVerification(platform);
                      }
                    });
                  }}
                  iconName="CheckCircle"
                  iconPosition="left"
                  className="flex-1"
                >
                  Verificar Todas
                </Button>
              </div>
            </div>
          );
        };

        export default SocialMedia;