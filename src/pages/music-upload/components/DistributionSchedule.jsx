import React, { useState } from 'react';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';
import { Checkbox } from '../../../components/ui/Checkbox';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const DistributionSchedule = ({ scheduleData, onScheduleChange, onSubmit, onPrevious, isSubmitting }) => {
  const [showAdvancedOptions, setShowAdvancedOptions] = useState(false);

  const timezones = [
    { value: 'America/Sao_Paulo', label: 'Brasília (GMT-3)' },
    { value: 'America/New_York', label: 'Nova York (GMT-5)' },
    { value: 'Europe/London', label: 'Londres (GMT+0)' },
    { value: 'Europe/Paris', label: 'Paris (GMT+1)' },
    { value: 'Asia/Tokyo', label: 'Tóquio (GMT+9)' },
    { value: 'Australia/Sydney', label: 'Sydney (GMT+11)' }
  ];

  const releaseTypes = [
    { value: 'immediate', label: 'Lançamento Imediato' },
    { value: 'scheduled', label: 'Lançamento Agendado' },
    { value: 'pre-release', label: 'Pré-lançamento' }
  ];

  const distributionPriorities = [
    { value: 'standard', label: 'Padrão (Gratuito)' },
    { value: 'priority', label: 'Prioritário (+R$ 29,90)' },
    { value: 'express', label: 'Expresso (+R$ 59,90)' }
  ];

  const handleInputChange = (field, value) => {
    onScheduleChange({ ...scheduleData, [field]: value });
  };

  const getMinDate = () => {
    const today = new Date();
    today?.setDate(today?.getDate() + 1); // Minimum 1 day from now
    return today?.toISOString()?.split('T')?.[0];
  };

  const getEstimatedLiveDate = () => {
    if (!scheduleData?.releaseDate) return null;
    
    const releaseDate = new Date(scheduleData.releaseDate);
    const priority = scheduleData?.priority || 'standard';
    
    let daysToAdd = 7; // Standard processing
    if (priority === 'priority') daysToAdd = 3;
    if (priority === 'express') daysToAdd = 1;
    
    releaseDate?.setDate(releaseDate?.getDate() + daysToAdd);
    return releaseDate?.toLocaleDateString('pt-BR');
  };

  const isFormValid = () => {
    if (scheduleData?.releaseType === 'immediate') return true;
    return scheduleData?.releaseDate && scheduleData?.releaseTime && scheduleData?.timezone;
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <div className="mb-6">
        <h2 className="text-lg font-semibold text-foreground mb-2">Agendamento de Distribuição</h2>
        <p className="text-muted-foreground">
          Configure quando e como sua música será distribuída para as plataformas selecionadas.
        </p>
      </div>
      <div className="space-y-6">
        {/* Release Type */}
        <div>
          <Select
            label="Tipo de Lançamento"
            placeholder="Selecione o tipo de lançamento"
            options={releaseTypes}
            value={scheduleData?.releaseType || ''}
            onChange={(value) => handleInputChange('releaseType', value)}
            required
          />
        </div>

        {/* Scheduled Release Options */}
        {scheduleData?.releaseType !== 'immediate' && (
          <div className="space-y-4 p-4 bg-muted/20 rounded-lg">
            <h3 className="text-md font-medium text-foreground">Configurações de Agendamento</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                label="Data de Lançamento"
                type="date"
                min={getMinDate()}
                value={scheduleData?.releaseDate || ''}
                onChange={(e) => handleInputChange('releaseDate', e?.target?.value)}
                required
              />
              
              <Input
                label="Horário de Lançamento"
                type="time"
                value={scheduleData?.releaseTime || ''}
                onChange={(e) => handleInputChange('releaseTime', e?.target?.value)}
                required
              />
            </div>

            <Select
              label="Fuso Horário"
              placeholder="Selecione o fuso horário"
              options={timezones}
              value={scheduleData?.timezone || ''}
              onChange={(value) => handleInputChange('timezone', value)}
              required
            />

            {scheduleData?.releaseType === 'pre-release' && (
              <div className="p-3 bg-accent/5 border border-accent/20 rounded-lg">
                <div className="flex items-start space-x-2">
                  <Icon name="Info" size={16} className="text-accent mt-0.5" />
                  <div className="text-sm text-accent">
                    <strong>Pré-lançamento:</strong> Sua música ficará disponível para pré-save/pré-add antes da data oficial de lançamento.
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Distribution Priority */}
        <div>
          <Select
            label="Prioridade de Distribuição"
            description="Escolha a velocidade de processamento"
            placeholder="Selecione a prioridade"
            options={distributionPriorities}
            value={scheduleData?.priority || 'standard'}
            onChange={(value) => handleInputChange('priority', value)}
          />
        </div>

        {/* Estimated Processing Time */}
        <div className="p-4 bg-success/5 border border-success/20 rounded-lg">
          <div className="flex items-center space-x-3">
            <Icon name="Clock" size={20} className="text-success" />
            <div>
              <h4 className="text-sm font-medium text-foreground">Tempo Estimado de Processamento</h4>
              <p className="text-sm text-muted-foreground">
                {scheduleData?.priority === 'express' && 'Sua música estará disponível em até 24 horas'}
                {scheduleData?.priority === 'priority' && 'Sua música estará disponível em até 3 dias úteis'}
                {(!scheduleData?.priority || scheduleData?.priority === 'standard') && 'Sua música estará disponível em até 7 dias úteis'}
              </p>
              {scheduleData?.releaseDate && (
                <p className="text-sm text-success font-medium">
                  Data estimada de disponibilização: {getEstimatedLiveDate()}
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Advanced Options */}
        <div className="space-y-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setShowAdvancedOptions(!showAdvancedOptions)}
            iconName={showAdvancedOptions ? "ChevronUp" : "ChevronDown"}
            iconPosition="right"
          >
            {showAdvancedOptions ? 'Ocultar Opções Avançadas' : 'Mostrar Opções Avançadas'}
          </Button>

          {showAdvancedOptions && (
            <div className="space-y-4 p-4 bg-muted/20 rounded-lg">
              <h3 className="text-md font-medium text-foreground">Opções Avançadas</h3>
              
              <div className="space-y-3">
                <Checkbox
                  label="Notificar seguidores sobre o lançamento"
                  description="Enviar notificação automática para seus seguidores nas plataformas"
                  checked={scheduleData?.notifyFollowers || false}
                  onChange={(e) => handleInputChange('notifyFollowers', e?.target?.checked)}
                />
                
                <Checkbox
                  label="Ativar pré-save automático"
                  description="Permitir que usuários salvem a música antes do lançamento"
                  checked={scheduleData?.enablePresave || false}
                  onChange={(e) => handleInputChange('enablePresave', e?.target?.checked)}
                />
                
                <Checkbox
                  label="Distribuição escalonada"
                  description="Lançar primeiro nas principais plataformas, depois nas demais"
                  checked={scheduleData?.staggeredRelease || false}
                  onChange={(e) => handleInputChange('staggeredRelease', e?.target?.checked)}
                />
                
                <Checkbox
                  label="Análise de qualidade automática"
                  description="Verificar automaticamente a qualidade do áudio antes da distribuição"
                  checked={scheduleData?.qualityCheck || true}
                  onChange={(e) => handleInputChange('qualityCheck', e?.target?.checked)}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input
                  label="Tags de Marketing"
                  type="text"
                  placeholder="Ex: indie, rock, brasileiro"
                  description="Separar por vírgulas"
                  value={scheduleData?.marketingTags || ''}
                  onChange={(e) => handleInputChange('marketingTags', e?.target?.value)}
                />
                
                <Input
                  label="Região de Foco"
                  type="text"
                  placeholder="Ex: Brasil, América Latina"
                  description="Região principal para promoção"
                  value={scheduleData?.targetRegion || ''}
                  onChange={(e) => handleInputChange('targetRegion', e?.target?.value)}
                />
              </div>
            </div>
          )}
        </div>

        {/* Cost Summary */}
        <div className="p-4 bg-card border border-border rounded-lg">
          <h4 className="text-sm font-medium text-foreground mb-3">Resumo de Custos</h4>
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Distribuição básica</span>
              <span className="text-foreground">Gratuito</span>
            </div>
            {scheduleData?.priority === 'priority' && (
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Processamento prioritário</span>
                <span className="text-foreground">R$ 29,90</span>
              </div>
            )}
            {scheduleData?.priority === 'express' && (
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Processamento expresso</span>
                <span className="text-foreground">R$ 59,90</span>
              </div>
            )}
            <hr className="border-border" />
            <div className="flex justify-between text-sm font-medium">
              <span className="text-foreground">Total</span>
              <span className="text-foreground">
                {scheduleData?.priority === 'express' ? 'R$ 59,90' : 
                 scheduleData?.priority === 'priority' ? 'R$ 29,90' : 'Gratuito'}
              </span>
            </div>
          </div>
        </div>

        {/* Navigation Buttons */}
        <div className="flex justify-between pt-6 border-t border-border">
          <Button
            variant="outline"
            onClick={onPrevious}
            iconName="ChevronLeft"
            iconPosition="left"
            disabled={isSubmitting}
          >
            Voltar
          </Button>
          
          <Button
            onClick={onSubmit}
            disabled={!isFormValid() || isSubmitting}
            loading={isSubmitting}
            iconName="Upload"
            iconPosition="right"
          >
            {isSubmitting ? 'Enviando...' : 'Finalizar Upload'}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default DistributionSchedule;