import React, { useState } from 'react';
        import Button from '../../../components/ui/Button';
        import Input from '../../../components/ui/Input';
        import Select from '../../../components/ui/Select';
        import Icon from '../../../components/AppIcon';

        const BasicInformation = ({ profile, updateProfile }) => {
          const [localProfile, setLocalProfile] = useState(profile);
          const [showGenreAdd, setShowGenreAdd] = useState(false);
          const [newGenre, setNewGenre] = useState('');

          const musicGenres = [
            'Pop', 'Rock', 'Hip Hop', 'Eletrônica', 'Sertanejo', 'Funk', 'MPB', 
            'Samba', 'Bossa Nova', 'Forró', 'Pagode', 'Gospel', 'Jazz', 'Blues',
            'Reggae', 'Indie', 'Alternative', 'Classical', 'Folk', 'R&B', 'Country',
            'Metal', 'Punk', 'Disco', 'House', 'Techno', 'Trap', 'Lo-Fi'
          ];

          const locations = [
            'São Paulo, SP', 'Rio de Janeiro, RJ', 'Belo Horizonte, MG', 'Salvador, BA',
            'Brasília, DF', 'Fortaleza, CE', 'Manaus, AM', 'Curitiba, PR',
            'Recife, PE', 'Porto Alegre, RS', 'Belém, PA', 'Goiânia, GO',
            'Outro'
          ];

          const handleInputChange = (e) => {
            const { name, value } = e?.target;
            const updatedProfile = { ...localProfile, [name]: value };
            setLocalProfile(updatedProfile);
            updateProfile(updatedProfile);
          };

          const handleGenreAdd = (genre) => {
            if (!localProfile?.genres?.includes(genre)) {
              const updatedGenres = [...(localProfile?.genres || []), genre];
              const updatedProfile = { ...localProfile, genres: updatedGenres };
              setLocalProfile(updatedProfile);
              updateProfile(updatedProfile);
            }
          };

          const handleGenreRemove = (genreToRemove) => {
            const updatedGenres = localProfile?.genres?.filter(genre => genre !== genreToRemove);
            const updatedProfile = { ...localProfile, genres: updatedGenres };
            setLocalProfile(updatedProfile);
            updateProfile(updatedProfile);
          };

          const handleCustomGenreAdd = () => {
            if (newGenre?.trim() && !localProfile?.genres?.includes(newGenre?.trim())) {
              handleGenreAdd(newGenre?.trim());
              setNewGenre('');
              setShowGenreAdd(false);
            }
          };

          const calculateProfileCompletion = () => {
            const fields = [
              localProfile?.fullName,
              localProfile?.artistName,
              localProfile?.email,
              localProfile?.bio,
              localProfile?.location,
              localProfile?.genres?.length > 0,
              localProfile?.avatar
            ];
            
            const filledFields = fields?.filter(field => field)?.length;
            return Math.round((filledFields / fields?.length) * 100);
          };

          return (
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-xl font-semibold text-foreground mb-1">
                    Informações Básicas
                  </h2>
                  <p className="text-muted-foreground">
                    Gerencie suas informações pessoais e de perfil
                  </p>
                </div>
                
                {/* Profile Completion */}
                <div className="text-right">
                  <div className="text-sm text-muted-foreground mb-1">
                    Perfil completo
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-24 h-2 bg-secondary/20 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-primary transition-all duration-500"
                        style={{ width: `${calculateProfileCompletion()}%` }}
                      ></div>
                    </div>
                    <span className="text-sm font-medium text-primary">
                      {calculateProfileCompletion()}%
                    </span>
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                {/* Personal Information */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Input
                    label="Nome Completo"
                    name="fullName"
                    placeholder="Digite seu nome completo"
                    value={localProfile?.fullName || ''}
                    onChange={handleInputChange}
                    required
                  />
                  
                  <Input
                    label="Nome Artístico"
                    name="artistName"
                    placeholder="Como você é conhecido artisticamente"
                    value={localProfile?.artistName || ''}
                    onChange={handleInputChange}
                    icon="Music"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Input
                    label="Email"
                    type="email"
                    name="email"
                    placeholder="seu@email.com"
                    value={localProfile?.email || ''}
                    onChange={handleInputChange}
                    required
                    disabled
                    rightIcon="Lock"
                    helperText="Para alterar o email, acesse Configurações de Segurança"
                  />
                  
                  <Input
                    label="Telefone"
                    name="phone"
                    placeholder="(11) 99999-9999"
                    value={localProfile?.phone || ''}
                    onChange={handleInputChange}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Select
                    label="Localização"
                    name="location"
                    value={localProfile?.location || ''}
                    onChange={handleInputChange}
                    options={locations?.map(loc => ({ value: loc, label: loc }))}
                    placeholder="Selecione sua cidade"
                  />
                  
                  <Input
                    label="Data de Nascimento"
                    type="date"
                    name="birthDate"
                    value={localProfile?.birthDate || ''}
                    onChange={handleInputChange}
                  />
                </div>

                <Input
                  label="Website"
                  name="website"
                  placeholder="https://seusite.com"
                  value={localProfile?.website || ''}
                  onChange={handleInputChange}
                  leftIcon="Globe"
                />

                {/* Bio */}
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Bio / Descrição
                  </label>
                  <textarea
                    name="bio"
                    rows="4"
                    placeholder="Conte um pouco sobre você, sua música e sua trajetória..."
                    value={localProfile?.bio || ''}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary resize-none"
                    maxLength="500"
                  />
                  <div className="flex justify-between items-center mt-1">
                    <p className="text-xs text-muted-foreground">
                      Descreva seu estilo musical, influências e experiências
                    </p>
                    <span className="text-xs text-muted-foreground">
                      {localProfile?.bio?.length || 0}/500
                    </span>
                  </div>
                </div>

                {/* Genres */}
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <label className="block text-sm font-medium text-foreground">
                      Gêneros Musicais
                    </label>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setShowGenreAdd(!showGenreAdd)}
                      iconName="Plus"
                      iconPosition="left"
                    >
                      Adicionar
                    </Button>
                  </div>

                  {/* Selected Genres */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {localProfile?.genres?.map((genre, index) => (
                      <div
                        key={index}
                        className="flex items-center space-x-2 px-3 py-1 bg-primary/10 text-primary rounded-full"
                      >
                        <span className="text-sm font-medium">{genre}</span>
                        <button
                          onClick={() => handleGenreRemove(genre)}
                          className="hover:bg-primary/20 rounded-full p-0.5 transition-colors"
                        >
                          <Icon name="X" size={12} />
                        </button>
                      </div>
                    ))}
                    
                    {(!localProfile?.genres || localProfile?.genres?.length === 0) && (
                      <p className="text-muted-foreground text-sm italic">
                        Nenhum gênero selecionado
                      </p>
                    )}
                  </div>

                  {/* Add Genre Section */}
                  {showGenreAdd && (
                    <div className="space-y-3">
                      {/* Popular Genres */}
                      <div>
                        <p className="text-sm font-medium text-foreground mb-2">
                          Gêneros Populares
                        </p>
                        <div className="flex flex-wrap gap-2">
                          {musicGenres?.filter(genre => !localProfile?.genres?.includes(genre))?.slice(0, 12)?.map((genre) => (
                            <button
                              key={genre}
                              onClick={() => handleGenreAdd(genre)}
                              className="px-3 py-1 text-sm bg-secondary/20 text-muted-foreground hover:bg-secondary/40 hover:text-foreground rounded-full transition-colors"
                            >
                              {genre}
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Custom Genre */}
                      <div>
                        <p className="text-sm font-medium text-foreground mb-2">
                          Adicionar Gênero Personalizado
                        </p>
                        <div className="flex space-x-2">
                          <Input
                            placeholder="Digite um gênero"
                            value={newGenre}
                            onChange={(e) => setNewGenre(e?.target?.value)}
                            onKeyPress={(e) => {
                              if (e?.key === 'Enter') {
                                handleCustomGenreAdd();
                              }
                            }}
                            className="flex-1"
                          />
                          <Button onClick={handleCustomGenreAdd} disabled={!newGenre?.trim()}>
                            Adicionar
                          </Button>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Profile Tips */}
                <div className="bg-secondary/10 border border-secondary/20 rounded-lg p-4">
                  <div className="flex items-start space-x-3">
                    <Icon name="Lightbulb" size={20} className="text-secondary mt-0.5" />
                    <div>
                      <h3 className="font-medium text-foreground mb-2">Dicas para um perfil completo</h3>
                      <ul className="space-y-1 text-sm text-muted-foreground">
                        <li>• Use uma foto de perfil profissional e de alta qualidade</li>
                        <li>• Escreva uma bio que destaque seu estilo musical único</li>
                        <li>• Selecione gêneros que realmente representem sua música</li>
                        <li>• Mantenha suas informações sempre atualizadas</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        };

        export default BasicInformation;