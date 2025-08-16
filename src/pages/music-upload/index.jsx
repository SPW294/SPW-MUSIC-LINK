import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/ui/Header';
import UploadProgress from './components/UploadProgress';
import FileUploadZone from './components/FileUploadZone';
import MetadataForm from './components/MetadataForm';
import PlatformSelection from './components/PlatformSelection';
import PreviewPlayer from './components/PreviewPlayer';
import DistributionSchedule from './components/DistributionSchedule';
import UploadSidebar from './components/UploadSidebar';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';

const MusicUpload = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(0);
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    artist: '',
    album: '',
    genre: '',
    language: 'pt',
    releaseDate: '',
    duration: '',
    isrc: '',
    upc: '',
    publisher: '',
    composer: '',
    collaborators: [],
    copyrightHolder: '',
    copyrightYear: new Date()?.getFullYear()?.toString(),
    explicit: false,
    acceptTerms: false
  });
  const [selectedPlatforms, setSelectedPlatforms] = useState([]);
  const [scheduleData, setScheduleData] = useState({
    releaseType: 'scheduled',
    releaseDate: '',
    releaseTime: '00:00',
    timezone: 'America/Sao_Paulo',
    priority: 'standard',
    notifyFollowers: true,
    enablePresave: false,
    staggeredRelease: false,
    qualityCheck: true,
    marketingTags: '',
    targetRegion: 'Brasil'
  });

  const steps = [
    {
      id: 'upload',
      title: 'Upload',
      description: 'Selecionar arquivos'
    },
    {
      id: 'metadata',
      title: 'Metadados',
      description: 'Informações da música'
    },
    {
      id: 'platforms',
      title: 'Plataformas',
      description: 'Escolher destinos'
    },
    {
      id: 'schedule',
      title: 'Agendamento',
      description: 'Configurar lançamento'
    }
  ];

  // Auto-save functionality
  useEffect(() => {
    const savedData = localStorage.getItem('musicUploadData');
    if (savedData) {
      try {
        const parsed = JSON.parse(savedData);
        setFormData(prev => ({ ...prev, ...parsed?.formData }));
        setSelectedPlatforms(parsed?.selectedPlatforms || []);
        setScheduleData(prev => ({ ...prev, ...parsed?.scheduleData }));
      } catch (error) {
        console.error('Error loading saved data:', error);
      }
    }
  }, []);

  useEffect(() => {
    const dataToSave = {
      formData,
      selectedPlatforms,
      scheduleData,
      timestamp: Date.now()
    };
    localStorage.setItem('musicUploadData', JSON.stringify(dataToSave));
  }, [formData, selectedPlatforms, scheduleData]);

  const handleFileSelect = async (files) => {
    setIsUploading(true);
    setUploadProgress(0);

    // Simulate file upload progress
    const uploadFile = (file) => {
      return new Promise((resolve) => {
        let progress = 0;
        const interval = setInterval(() => {
          progress += Math.random() * 15;
          if (progress >= 100) {
            progress = 100;
            clearInterval(interval);
            resolve(file);
          }
          setUploadProgress(progress);
        }, 200);
      });
    };

    try {
      const uploadedFile = await uploadFile(files?.[0]);
      setUploadedFiles([uploadedFile]);
      
      // Auto-fill some metadata from file
      const fileName = uploadedFile?.name?.replace(/\.[^/.]+$/, "");
      setFormData(prev => ({
        ...prev,
        title: prev?.title || fileName,
        duration: '3:45' // This would be extracted from actual audio file
      }));

      setTimeout(() => {
        setIsUploading(false);
        setCurrentStep(1);
      }, 500);
    } catch (error) {
      console.error('Upload error:', error);
      setIsUploading(false);
    }
  };

  const handleNext = () => {
    if (currentStep < steps?.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);

    // Simulate submission process
    try {
      await new Promise(resolve => setTimeout(resolve, 3000));
      
      // Clear saved data
      localStorage.removeItem('musicUploadData');
      
      // Show success message and redirect
      alert('Música enviada com sucesso! Você receberá atualizações sobre o status da distribuição por email.');
      navigate('/release-management');
    } catch (error) {
      console.error('Submission error:', error);
      alert('Erro ao enviar música. Tente novamente.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 0:
        return (
          <FileUploadZone
            onFileSelect={handleFileSelect}
            uploadProgress={uploadProgress}
            isUploading={isUploading}
          />
        );
      case 1:
        return (
          <MetadataForm
            formData={formData}
            onFormChange={setFormData}
            onNext={handleNext}
            onPrevious={handlePrevious}
          />
        );
      case 2:
        return (
          <PlatformSelection
            selectedPlatforms={selectedPlatforms}
            onPlatformChange={setSelectedPlatforms}
            onNext={handleNext}
            onPrevious={handlePrevious}
          />
        );
      case 3:
        return (
          <DistributionSchedule
            scheduleData={scheduleData}
            onScheduleChange={setScheduleData}
            onSubmit={handleSubmit}
            onPrevious={handlePrevious}
            isSubmitting={isSubmitting}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="pt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Page Header */}
          <div className="mb-8">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
                <Icon name="Upload" size={24} className="text-primary-foreground" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-foreground">Upload de Música</h1>
                <p className="text-muted-foreground">
                  Distribua sua música para mais de 150 plataformas digitais
                </p>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="flex flex-wrap gap-3">
              <Button
                variant="outline"
                size="sm"
                onClick={() => navigate('/release-management')}
                iconName="Music"
                iconPosition="left"
              >
                Ver Lançamentos
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => navigate('/analytics-dashboard')}
                iconName="BarChart3"
                iconPosition="left"
              >
                Analytics
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  const savedData = localStorage.getItem('musicUploadData');
                  if (savedData) {
                    const confirmed = confirm('Deseja limpar todos os dados salvos?');
                    if (confirmed) {
                      localStorage.removeItem('musicUploadData');
                      window.location?.reload();
                    }
                  }
                }}
                iconName="RotateCcw"
                iconPosition="left"
              >
                Limpar Dados
              </Button>
            </div>
          </div>

          {/* Progress Indicator */}
          <UploadProgress currentStep={currentStep} steps={steps} />

          {/* Main Content */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Upload Area */}
            <div className="lg:col-span-2 space-y-6">
              {renderStepContent()}

              {/* Preview Player */}
              {uploadedFiles?.length > 0 && currentStep > 0 && (
                <PreviewPlayer
                  audioFile={uploadedFiles?.[0]}
                  metadata={formData}
                />
              )}
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <UploadSidebar />
            </div>
          </div>

          {/* Bottom Navigation for Mobile */}
          <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-card border-t border-border p-4">
            <div className="flex justify-between">
              <Button
                variant="outline"
                onClick={handlePrevious}
                disabled={currentStep === 0 || isUploading || isSubmitting}
                iconName="ChevronLeft"
                iconPosition="left"
              >
                Voltar
              </Button>
              
              {currentStep < steps?.length - 1 ? (
                <Button
                  onClick={handleNext}
                  disabled={
                    (currentStep === 0 && uploadedFiles?.length === 0) ||
                    (currentStep === 1 && (!formData?.title || !formData?.artist)) ||
                    (currentStep === 2 && selectedPlatforms?.length === 0) ||
                    isUploading || isSubmitting
                  }
                  iconName="ChevronRight"
                  iconPosition="right"
                >
                  Continuar
                </Button>
              ) : (
                <Button
                  onClick={handleSubmit}
                  disabled={isSubmitting}
                  loading={isSubmitting}
                  iconName="Upload"
                  iconPosition="right"
                >
                  {isSubmitting ? 'Enviando...' : 'Finalizar'}
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MusicUpload;