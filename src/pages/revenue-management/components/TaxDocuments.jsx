import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Select from '../../../components/ui/Select';

const TaxDocuments = () => {
  const [selectedYear, setSelectedYear] = useState('2025');
  const [selectedDocument, setSelectedDocument] = useState('all');

  const documents = [
    {
      id: 1,
      type: 'Informe de Rendimentos',
      year: '2025',
      period: 'Janeiro - Agosto',
      amount: 'R$ 34.567,89',
      status: 'available',
      downloadUrl: '#',
      generatedDate: '01/09/2025'
    },
    {
      id: 2,
      type: 'Comprovante de Retenção',
      year: '2025',
      period: 'Agosto',
      amount: 'R$ 892,34',
      status: 'available',
      downloadUrl: '#',
      generatedDate: '31/08/2025'
    },
    {
      id: 3,
      type: 'Relatório Anual',
      year: '2024',
      period: 'Janeiro - Dezembro',
      amount: 'R$ 89.234,56',
      status: 'available',
      downloadUrl: '#',
      generatedDate: '15/01/2025'
    },
    {
      id: 4,
      type: 'Informe de Rendimentos',
      year: '2024',
      period: 'Janeiro - Dezembro',
      amount: 'R$ 89.234,56',
      status: 'available',
      downloadUrl: '#',
      generatedDate: '15/01/2025'
    },
    {
      id: 5,
      type: 'Comprovante de Retenção',
      year: '2025',
      period: 'Setembro',
      amount: 'R$ 1.234,67',
      status: 'processing',
      downloadUrl: '#',
      generatedDate: 'Em processamento'
    }
  ];

  const taxSummary = {
    totalIncome: 45892.50,
    withheldTax: 4589.25,
    netIncome: 41303.25,
    taxRate: 10
  };

  const yearOptions = [
    { value: '2025', label: '2025' },
    { value: '2024', label: '2024' },
    { value: '2023', label: '2023' }
  ];

  const documentOptions = [
    { value: 'all', label: 'Todos os documentos' },
    { value: 'income', label: 'Informe de Rendimentos' },
    { value: 'retention', label: 'Comprovante de Retenção' },
    { value: 'annual', label: 'Relatório Anual' }
  ];

  const getStatusBadge = (status) => {
    const statusConfig = {
      available: { color: 'bg-success/10 text-success', label: 'Disponível', icon: 'CheckCircle' },
      processing: { color: 'bg-warning/10 text-warning', label: 'Processando', icon: 'Clock' },
      error: { color: 'bg-error/10 text-error', label: 'Erro', icon: 'XCircle' }
    };

    const config = statusConfig?.[status] || statusConfig?.processing;
    return (
      <div className={`flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-medium ${config?.color}`}>
        <Icon name={config?.icon} size={12} />
        <span>{config?.label}</span>
      </div>
    );
  };

  const getDocumentIcon = (type) => {
    const icons = {
      'Informe de Rendimentos': 'FileText',
      'Comprovante de Retenção': 'Receipt',
      'Relatório Anual': 'BarChart3'
    };
    return icons?.[type] || 'FileText';
  };

  const handleDownload = (document) => {
    // Simulate download
    console.log(`Downloading ${document?.type} for ${document?.period}`);
  };

  const handleGenerateDocument = () => {
    // Simulate document generation
    console.log('Generating new tax document...');
  };

  return (
    <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
      {/* Tax Summary */}
      <div className="bg-card border border-border rounded-lg p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-foreground">Resumo Fiscal</h2>
          <div className="p-2 bg-primary/10 rounded-lg">
            <Icon name="Calculator" size={20} color="var(--color-primary)" />
          </div>
        </div>

        <div className="space-y-6">
          <div className="p-4 bg-muted/10 rounded-lg">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-muted-foreground">Receita Total</span>
              <Icon name="TrendingUp" size={16} color="var(--color-success)" />
            </div>
            <p className="text-2xl font-bold text-foreground">
              R$ {taxSummary?.totalIncome?.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
            </p>
          </div>

          <div className="p-4 bg-muted/10 rounded-lg">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-muted-foreground">Imposto Retido</span>
              <Icon name="Minus" size={16} color="var(--color-warning)" />
            </div>
            <p className="text-2xl font-bold text-warning">
              R$ {taxSummary?.withheldTax?.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
            </p>
            <p className="text-xs text-muted-foreground mt-1">
              Taxa: {taxSummary?.taxRate}%
            </p>
          </div>

          <div className="p-4 bg-success/10 rounded-lg border border-success/20">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-success">Receita Líquida</span>
              <Icon name="DollarSign" size={16} color="var(--color-success)" />
            </div>
            <p className="text-2xl font-bold text-success">
              R$ {taxSummary?.netIncome?.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
            </p>
          </div>

          <Button 
            variant="outline" 
            fullWidth
            iconName="Download"
            iconPosition="left"
            onClick={handleGenerateDocument}
          >
            Gerar Documento
          </Button>
        </div>
      </div>
      {/* Tax Documents */}
      <div className="xl:col-span-2 bg-card border border-border rounded-lg p-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
          <div>
            <h2 className="text-xl font-semibold text-foreground">Documentos Fiscais</h2>
            <p className="text-sm text-muted-foreground mt-1">
              Relatórios e comprovantes para declaração
            </p>
          </div>
          
          <div className="flex items-center space-x-3 mt-4 sm:mt-0">
            <Select
              options={yearOptions}
              value={selectedYear}
              onChange={setSelectedYear}
              className="w-24"
            />
            <Select
              options={documentOptions}
              value={selectedDocument}
              onChange={setSelectedDocument}
              className="w-48"
            />
          </div>
        </div>

        <div className="space-y-4">
          {documents?.map((document) => (
            <div key={document?.id} className="flex items-center justify-between p-4 bg-muted/10 rounded-lg border border-border hover:bg-muted/20 transition-colors">
              <div className="flex items-center space-x-4">
                <div className="p-3 bg-primary/10 rounded-lg">
                  <Icon 
                    name={getDocumentIcon(document?.type)} 
                    size={20} 
                    color="var(--color-primary)" 
                  />
                </div>
                <div>
                  <h3 className="font-medium text-foreground">{document?.type}</h3>
                  <p className="text-sm text-muted-foreground">{document?.period} • {document?.year}</p>
                  <div className="flex items-center space-x-4 mt-1">
                    <span className="text-sm font-semibold text-foreground">{document?.amount}</span>
                    {getStatusBadge(document?.status)}
                  </div>
                </div>
              </div>
              
              <div className="flex items-center space-x-3">
                <div className="text-right">
                  <p className="text-xs text-muted-foreground">Gerado em</p>
                  <p className="text-sm font-medium text-foreground">{document?.generatedDate}</p>
                </div>
                
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleDownload(document)}
                  disabled={document?.status !== 'available'}
                  iconName="Download"
                  iconPosition="left"
                >
                  Download
                </Button>
              </div>
            </div>
          ))}
        </div>

        <div className="flex items-center justify-between mt-6 pt-4 border-t border-border">
          <p className="text-sm text-muted-foreground">
            {documents?.length} documento(s) encontrado(s)
          </p>
          
          <div className="flex items-center space-x-2">
            <Button variant="outline" size="sm">
              <Icon name="ChevronLeft" size={16} />
              Anterior
            </Button>
            <Button variant="outline" size="sm">
              Próximo
              <Icon name="ChevronRight" size={16} />
            </Button>
          </div>
        </div>

        {/* Tax Information */}
        <div className="mt-6 p-4 bg-accent/10 rounded-lg border border-accent/20">
          <div className="flex items-start space-x-3">
            <Icon name="Info" size={20} color="var(--color-accent)" className="mt-0.5" />
            <div>
              <h4 className="font-medium text-accent mb-2">Informações Importantes</h4>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Os documentos são gerados automaticamente no final de cada mês</li>
                <li>• Mantenha todos os comprovantes para sua declaração de imposto de renda</li>
                <li>• Em caso de dúvidas, consulte um contador especializado</li>
                <li>• Os valores já incluem as retenções obrigatórias por lei</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaxDocuments;