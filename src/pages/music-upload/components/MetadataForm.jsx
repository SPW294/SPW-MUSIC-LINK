import React, { useState } from 'react';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';
import { Checkbox } from '../../../components/ui/Checkbox';
import Button from '../../../components/ui/Button';


const MetadataForm = ({ formData, onFormChange, onNext, onPrevious }) => {
  const [showAdvanced, setShowAdvanced] = useState(false);

  const genres = [
    { value: 'pop', label: 'Pop' },
    { value: 'rock', label: 'Rock' },
    { value: 'hip-hop', label: 'Hip Hop' },
    { value: 'electronic', label: 'Eletrônica' },
    { value: 'jazz', label: 'Jazz' },
    { value: 'classical', label: 'Clássica' },
    { value: 'country', label: 'Country' },
    { value: 'reggae', label: 'Reggae' },
    { value: 'blues', label: 'Blues' },
    { value: 'folk', label: 'Folk' },
    { value: 'funk', label: 'Funk' },
    { value: 'samba', label: 'Samba' },
    { value: 'bossa-nova', label: 'Bossa Nova' },
    { value: 'mpb', label: 'MPB' },
    { value: 'sertanejo', label: 'Sertanejo' }
  ];

  const languages = [
    { value: 'pt', label: 'Português' },
    { value: 'en', label: 'Inglês' },
    { value: 'es', label: 'Espanhol' },
    { value: 'fr', label: 'Francês' },
    { value: 'it', label: 'Italiano' },
    { value: 'de', label: 'Alemão' }
  ];

  const handleInputChange = (field, value) => {
    onFormChange({ ...formData, [field]: value });
  };

  const handleCollaboratorAdd = () => {
    const newCollaborator = {
      id: Date.now(),
      name: '',
      role: '',
      percentage: 0
    };
    onFormChange({
      ...formData,
      collaborators: [...(formData?.collaborators || []), newCollaborator]
    });
  };

  const handleCollaboratorChange = (id, field, value) => {
    const updatedCollaborators = formData?.collaborators?.map(collab =>
      collab?.id === id ? { ...collab, [field]: value } : collab
    ) || [];
    onFormChange({ ...formData, collaborators: updatedCollaborators });
  };

  const handleCollaboratorRemove = (id) => {
    const updatedCollaborators = formData?.collaborators?.filter(collab => collab?.id !== id) || [];
    onFormChange({ ...formData, collaborators: updatedCollaborators });
  };

  const isFormValid = () => {
    return formData?.title && formData?.artist && formData?.genre && formData?.releaseDate;
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-semibold text-foreground">Informações da Música</h2>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setShowAdvanced(!showAdvanced)}
          iconName={showAdvanced ? "ChevronUp" : "ChevronDown"}
          iconPosition="right"
        >
          {showAdvanced ? 'Ocultar Avançado' : 'Mostrar Avançado'}
        </Button>
      </div>
      <div className="space-y-6">
        {/* Basic Information */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            label="Título da Música"
            type="text"
            placeholder="Digite o título da música"
            value={formData?.title || ''}
            onChange={(e) => handleInputChange('title', e?.target?.value)}
            required
          />
          
          <Input
            label="Nome do Artista"
            type="text"
            placeholder="Digite o nome do artista"
            value={formData?.artist || ''}
            onChange={(e) => handleInputChange('artist', e?.target?.value)}
            required
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            label="Nome do Álbum"
            type="text"
            placeholder="Digite o nome do álbum (opcional)"
            value={formData?.album || ''}
            onChange={(e) => handleInputChange('album', e?.target?.value)}
          />
          
          <Select
            label="Gênero Musical"
            placeholder="Selecione o gênero"
            options={genres}
            value={formData?.genre || ''}
            onChange={(value) => handleInputChange('genre', value)}
            required
            searchable
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Input
            label="Data de Lançamento"
            type="date"
            value={formData?.releaseDate || ''}
            onChange={(e) => handleInputChange('releaseDate', e?.target?.value)}
            required
          />
          
          <Select
            label="Idioma"
            placeholder="Selecione o idioma"
            options={languages}
            value={formData?.language || ''}
            onChange={(value) => handleInputChange('language', value)}
          />
          
          <Input
            label="Duração"
            type="text"
            placeholder="Ex: 3:45"
            value={formData?.duration || ''}
            onChange={(e) => handleInputChange('duration', e?.target?.value)}
          />
        </div>

        {/* Advanced Metadata */}
        {showAdvanced && (
          <div className="space-y-6 pt-6 border-t border-border">
            <h3 className="text-md font-medium text-foreground">Informações Avançadas</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                label="Código ISRC"
                type="text"
                placeholder="Ex: BRBMG1234567"
                description="Código internacional de gravação sonora"
                value={formData?.isrc || ''}
                onChange={(e) => handleInputChange('isrc', e?.target?.value)}
              />
              
              <Input
                label="UPC/EAN"
                type="text"
                placeholder="Código de barras do produto"
                value={formData?.upc || ''}
                onChange={(e) => handleInputChange('upc', e?.target?.value)}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                label="Editora"
                type="text"
                placeholder="Nome da editora"
                value={formData?.publisher || ''}
                onChange={(e) => handleInputChange('publisher', e?.target?.value)}
              />
              
              <Input
                label="Compositor"
                type="text"
                placeholder="Nome do compositor"
                value={formData?.composer || ''}
                onChange={(e) => handleInputChange('composer', e?.target?.value)}
              />
            </div>

            {/* Collaborators Section */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h4 className="text-sm font-medium text-foreground">Colaboradores</h4>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleCollaboratorAdd}
                  iconName="Plus"
                  iconPosition="left"
                >
                  Adicionar Colaborador
                </Button>
              </div>

              {formData?.collaborators?.map((collaborator) => (
                <div key={collaborator?.id} className="grid grid-cols-1 md:grid-cols-4 gap-3 p-4 bg-muted/20 rounded-lg">
                  <Input
                    label="Nome"
                    type="text"
                    placeholder="Nome do colaborador"
                    value={collaborator?.name}
                    onChange={(e) => handleCollaboratorChange(collaborator?.id, 'name', e?.target?.value)}
                  />
                  
                  <Input
                    label="Função"
                    type="text"
                    placeholder="Ex: Produtor, Vocal"
                    value={collaborator?.role}
                    onChange={(e) => handleCollaboratorChange(collaborator?.id, 'role', e?.target?.value)}
                  />
                  
                  <Input
                    label="Porcentagem (%)"
                    type="number"
                    placeholder="0"
                    min="0"
                    max="100"
                    value={collaborator?.percentage}
                    onChange={(e) => handleCollaboratorChange(collaborator?.id, 'percentage', parseFloat(e?.target?.value) || 0)}
                  />
                  
                  <div className="flex items-end">
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => handleCollaboratorRemove(collaborator?.id)}
                      iconName="Trash2"
                    />
                  </div>
                </div>
              ))}
            </div>

            {/* Copyright Information */}
            <div className="space-y-4">
              <h4 className="text-sm font-medium text-foreground">Informações de Copyright</h4>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input
                  label="Detentor dos Direitos"
                  type="text"
                  placeholder="Nome do detentor dos direitos"
                  value={formData?.copyrightHolder || ''}
                  onChange={(e) => handleInputChange('copyrightHolder', e?.target?.value)}
                />
                
                <Input
                  label="Ano do Copyright"
                  type="number"
                  placeholder="2024"
                  min="1900"
                  max="2030"
                  value={formData?.copyrightYear || ''}
                  onChange={(e) => handleInputChange('copyrightYear', e?.target?.value)}
                />
              </div>

              <div className="space-y-3">
                <Checkbox
                  label="Conteúdo explícito"
                  description="Marque se a música contém linguagem explícita"
                  checked={formData?.explicit || false}
                  onChange={(e) => handleInputChange('explicit', e?.target?.checked)}
                />
                
                <Checkbox
                  label="Aceito os termos de distribuição"
                  description="Confirmo que possuo todos os direitos necessários para distribuir esta música"
                  checked={formData?.acceptTerms || false}
                  onChange={(e) => handleInputChange('acceptTerms', e?.target?.checked)}
                />
              </div>
            </div>
          </div>
        )}

        {/* Navigation Buttons */}
        <div className="flex justify-between pt-6 border-t border-border">
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
            disabled={!isFormValid()}
            iconName="ChevronRight"
            iconPosition="right"
          >
            Continuar
          </Button>
        </div>
      </div>
    </div>
  );
};

export default MetadataForm;