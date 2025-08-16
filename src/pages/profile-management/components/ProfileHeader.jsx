import React, { useState } from 'react';
        import Button from '../../../components/ui/Button';
        import Icon from '../../../components/AppIcon';

        const ProfileHeader = ({ profile, updateProfile, hasUnsavedChanges, isAutoSaving }) => {
          const [showPreview, setShowPreview] = useState(false);
          
          const handleAvatarUpload = (event) => {
            const file = event?.target?.files?.[0];
            if (file) {
              const reader = new FileReader();
              reader.onload = (e) => {
                updateProfile({ avatar: e?.target?.result });
              };
              reader?.readAsDataURL(file);
            }
          };

          const handleCoverUpload = (event) => {
            const file = event?.target?.files?.[0];
            if (file) {
              const reader = new FileReader();
              reader.onload = (e) => {
                updateProfile({ coverImage: e?.target?.result });
              };
              reader?.readAsDataURL(file);
            }
          };

          return (
            <div className="bg-card border border-border rounded-lg mb-8 overflow-hidden">
              {/* Cover Image */}
              <div className="relative h-48 bg-gradient-to-r from-primary/20 to-secondary/20">
                {profile?.coverImage && (
                  <img 
                    src={profile?.coverImage} 
                    alt="Cover" 
                    className="w-full h-full object-cover"
                  />
                )}
                <div className="absolute inset-0 bg-black/20"></div>
                
                {/* Cover Upload Button */}
                <label className="absolute top-4 right-4 cursor-pointer">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="bg-white/90 hover:bg-white text-black border-white/20"
                    iconName="Camera"
                    iconPosition="left"
                  >
                    Alterar Capa
                  </Button>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleCoverUpload}
                    className="hidden"
                  />
                </label>

                {/* Auto-save indicator */}
                {(hasUnsavedChanges || isAutoSaving) && (
                  <div className="absolute top-4 left-4">
                    <div className={`flex items-center space-x-2 px-3 py-1 rounded-full text-sm ${
                      isAutoSaving 
                        ? 'bg-warning/90 text-warning-foreground' 
                        : 'bg-primary/90 text-primary-foreground'
                    }`}>
                      {isAutoSaving ? (
                        <>
                          <div className="animate-spin w-4 h-4 border-2 border-current border-t-transparent rounded-full"></div>
                          <span>Salvando...</span>
                        </>
                      ) : (
                        <>
                          <Icon name="Clock" size={16} />
                          <span>Não salvo</span>
                        </>
                      )}
                    </div>
                  </div>
                )}
              </div>

              {/* Profile Info */}
              <div className="relative px-6 pb-6">
                {/* Avatar */}
                <div className="relative -mt-16 mb-6">
                  <div className="relative w-32 h-32">
                    <div className="w-32 h-32 rounded-full bg-secondary border-4 border-white overflow-hidden">
                      {profile?.avatar ? (
                        <img 
                          src={profile?.avatar} 
                          alt="Avatar" 
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center bg-secondary">
                          <Icon name="User" size={48} className="text-secondary-foreground" />
                        </div>
                      )}
                    </div>
                    
                    {/* Avatar Upload Button */}
                    <label className="absolute bottom-2 right-2 cursor-pointer">
                      <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center hover:bg-primary/90 transition-colors">
                        <Icon name="Camera" size={16} className="text-primary-foreground" />
                      </div>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleAvatarUpload}
                        className="hidden"
                      />
                    </label>
                  </div>
                </div>

                {/* Profile Details */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                  <div className="mb-4 sm:mb-0">
                    <h1 className="text-2xl font-bold text-foreground mb-1">
                      {profile?.artistName || profile?.fullName}
                    </h1>
                    <p className="text-muted-foreground mb-2">
                      {profile?.location} • {profile?.accountType === 'artist' ? 'Artista' : 
                                           profile?.accountType === 'producer' ? 'Produtor' : 'Gravadora'}
                    </p>
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center space-x-1">
                        <Icon name="Music" size={16} className="text-muted-foreground" />
                        <span className="text-sm text-muted-foreground">
                          {profile?.genres?.join(', ')}
                        </span>
                      </div>
                      {profile?.verification?.email && (
                        <div className="flex items-center space-x-1">
                          <Icon name="CheckCircle" size={16} className="text-success" />
                          <span className="text-sm text-success">Verificado</span>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center space-x-3">
                    <Button
                      variant="outline"
                      onClick={() => setShowPreview(!showPreview)}
                      iconName="Eye"
                      iconPosition="left"
                    >
                      {showPreview ? 'Ocultar' : 'Preview Público'}
                    </Button>
                    
                    {profile?.website && (
                      <Button
                        variant="outline"
                        onClick={() => window.open(profile?.website, '_blank')}
                        iconName="ExternalLink"
                        iconPosition="left"
                      >
                        Website
                      </Button>
                    )}
                  </div>
                </div>

                {/* Bio */}
                {profile?.bio && (
                  <div className="mt-4 pt-4 border-t border-border">
                    <p className="text-muted-foreground">{profile?.bio}</p>
                  </div>
                )}

                {/* Quick Stats */}
                <div className="mt-6 grid grid-cols-1 sm:grid-cols-4 gap-4">
                  <div className="text-center p-4 bg-secondary/20 rounded-lg">
                    <div className="text-xl font-bold text-foreground">24</div>
                    <div className="text-sm text-muted-foreground">Lançamentos</div>
                  </div>
                  <div className="text-center p-4 bg-secondary/20 rounded-lg">
                    <div className="text-xl font-bold text-foreground">1.2M</div>
                    <div className="text-sm text-muted-foreground">Streams</div>
                  </div>
                  <div className="text-center p-4 bg-secondary/20 rounded-lg">
                    <div className="text-xl font-bold text-foreground">12</div>
                    <div className="text-sm text-muted-foreground">Plataformas</div>
                  </div>
                  <div className="text-center p-4 bg-secondary/20 rounded-lg">
                    <div className="text-xl font-bold text-foreground">85%</div>
                    <div className="text-sm text-muted-foreground">Perfil Completo</div>
                  </div>
                </div>
              </div>

              {/* Preview Mode */}
              {showPreview && (
                <div className="border-t border-border bg-muted/30 p-4">
                  <div className="flex items-center space-x-2 mb-3">
                    <Icon name="Eye" size={16} className="text-muted-foreground" />
                    <span className="text-sm font-medium text-muted-foreground">
                      Visualização Pública - Como outros usuários veem seu perfil
                    </span>
                  </div>
                  <div className="bg-background rounded-lg p-4 border border-border">
                    <div className="flex items-center space-x-3 mb-3">
                      <div className="w-12 h-12 rounded-full bg-secondary overflow-hidden">
                        {profile?.avatar ? (
                          <img src={profile?.avatar} alt="Avatar" className="w-full h-full object-cover" />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center">
                            <Icon name="User" size={20} />
                          </div>
                        )}
                      </div>
                      <div>
                        <h3 className="font-medium text-foreground">
                          {profile?.artistName || profile?.fullName}
                        </h3>
                        <p className="text-sm text-muted-foreground">
                          {profile?.genres?.slice(0, 2)?.join(', ')}
                        </p>
                      </div>
                    </div>
                    {profile?.bio && (
                      <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                        {profile?.bio}
                      </p>
                    )}
                    <div className="flex items-center space-x-2">
                      {Object.entries(profile?.socialLinks || {})?.slice(0, 3)?.map(([platform, link]) => 
                        link && (
                          <div key={platform} className="w-6 h-6 bg-secondary/50 rounded flex items-center justify-center">
                            <Icon name={platform === 'spotify' ? 'Music' : 'Globe'} size={12} />
                          </div>
                        )
                      )}
                    </div>
                  </div>
                </div>
              )}
            </div>
          );
        };

        export default ProfileHeader;