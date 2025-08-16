import React, { useState, useRef } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const FileUploadZone = ({ onFileSelect, uploadProgress, isUploading }) => {
  const [isDragOver, setIsDragOver] = useState(false);
  const fileInputRef = useRef(null);

  const supportedFormats = [
    { format: 'MP3', description: 'Mais comum, boa qualidade' },
    { format: 'WAV', description: 'Alta qualidade, sem compressão' },
    { format: 'FLAC', description: 'Lossless, melhor qualidade' },
    { format: 'M4A', description: 'Apple, boa compressão' }
  ];

  const handleDragOver = (e) => {
    e?.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (e) => {
    e?.preventDefault();
    setIsDragOver(false);
  };

  const handleDrop = (e) => {
    e?.preventDefault();
    setIsDragOver(false);
    const files = Array.from(e?.dataTransfer?.files);
    handleFiles(files);
  };

  const handleFileInput = (e) => {
    const files = Array.from(e?.target?.files);
    handleFiles(files);
  };

  const handleFiles = (files) => {
    const audioFiles = files?.filter(file => 
      file?.type?.startsWith('audio/') || 
      ['.mp3', '.wav', '.flac', '.m4a']?.some(ext => file?.name?.toLowerCase()?.endsWith(ext))
    );
    
    if (audioFiles?.length > 0) {
      onFileSelect(audioFiles);
    }
  };

  const openFileDialog = () => {
    fileInputRef?.current?.click();
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <div
        className={`relative border-2 border-dashed rounded-lg p-8 text-center transition-all duration-200 ${
          isDragOver 
            ? 'border-primary bg-primary/5' :'border-muted hover:border-primary/50 hover:bg-muted/20'
        } ${isUploading ? 'pointer-events-none opacity-50' : ''}`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <input
          ref={fileInputRef}
          type="file"
          multiple
          accept="audio/*,.mp3,.wav,.flac,.m4a"
          onChange={handleFileInput}
          className="hidden"
        />

        {isUploading ? (
          <div className="space-y-4">
            <div className="w-16 h-16 mx-auto bg-primary/10 rounded-full flex items-center justify-center">
              <Icon name="Upload" size={32} className="text-primary animate-pulse" />
            </div>
            <div className="space-y-2">
              <p className="text-lg font-medium text-foreground">Enviando arquivos...</p>
              <div className="w-full bg-muted rounded-full h-2">
                <div 
                  className="bg-primary h-2 rounded-full transition-all duration-300"
                  style={{ width: `${uploadProgress}%` }}
                />
              </div>
              <p className="text-sm text-muted-foreground">{uploadProgress}% concluído</p>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="w-16 h-16 mx-auto bg-primary/10 rounded-full flex items-center justify-center">
              <Icon name="Upload" size={32} className="text-primary" />
            </div>
            <div className="space-y-2">
              <h3 className="text-lg font-semibold text-foreground">
                Arraste seus arquivos de áudio aqui
              </h3>
              <p className="text-muted-foreground">
                ou clique para selecionar arquivos do seu computador
              </p>
            </div>
            <Button 
              variant="outline" 
              onClick={openFileDialog}
              iconName="FolderOpen"
              iconPosition="left"
            >
              Selecionar Arquivos
            </Button>
          </div>
        )}
      </div>
      {/* Supported Formats */}
      <div className="mt-6">
        <h4 className="text-sm font-medium text-foreground mb-3">Formatos Suportados</h4>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
          {supportedFormats?.map((format) => (
            <div key={format?.format} className="bg-muted/30 rounded-lg p-3 text-center">
              <div className="text-sm font-medium text-foreground">{format?.format}</div>
              <div className="text-xs text-muted-foreground mt-1">{format?.description}</div>
            </div>
          ))}
        </div>
      </div>
      {/* Upload Guidelines */}
      <div className="mt-6 p-4 bg-accent/5 border border-accent/20 rounded-lg">
        <div className="flex items-start space-x-3">
          <Icon name="Info" size={20} className="text-accent mt-0.5" />
          <div className="space-y-2">
            <h4 className="text-sm font-medium text-foreground">Diretrizes de Upload</h4>
            <ul className="text-xs text-muted-foreground space-y-1">
              <li>• Tamanho máximo: 500MB por arquivo</li>
              <li>• Qualidade mínima: 16-bit/44.1kHz</li>
              <li>• Duração mínima: 30 segundos</li>
              <li>• Múltiplos arquivos são aceitos</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FileUploadZone;