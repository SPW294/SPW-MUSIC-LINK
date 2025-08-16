import React, { useState } from 'react';
        import Button from '../../../components/ui/Button';
        import Input from '../../../components/ui/Input';
        import Select from '../../../components/ui/Select';
        import { Checkbox } from '../../../components/ui/Checkbox';
        import Icon from '../../../components/AppIcon';

        const BusinessProfile = ({ profile, updateProfile }) => {
          const [localProfile, setLocalProfile] = useState(profile);
          const [showTaxInfo, setShowTaxInfo] = useState(false);

          const businessTypes = [
            { value: 'individual', label: 'Pessoa Física' },
            { value: 'mei', label: 'MEI - Microempreendedor Individual' },
            { value: 'company', label: 'Pessoa Jurídica' },
            { value: 'cooperative', label: 'Cooperativa' },
            { value: 'association', label: 'Associação' }
          ];

          const countries = [
            { value: 'BR', label: 'Brasil' },
            { value: 'US', label: 'Estados Unidos' },
            { value: 'UK', label: 'Reino Unido' },
            { value: 'CA', label: 'Canadá' },
            { value: 'AR', label: 'Argentina' },
            { value: 'MX', label: 'México' },
            { value: 'Other', label: 'Outro país' }
          ];

          const handleInputChange = (e) => {
            const { name, value, type, checked } = e?.target;
            const updatedProfile = { 
              ...localProfile, 
              [name]: type === 'checkbox' ? checked : value 
            };
            setLocalProfile(updatedProfile);
            updateProfile(updatedProfile);
          };

          const formatTaxId = (value) => {
            // Format CNPJ: 00.000.000/0000-00
            const numbers = value?.replace(/\D/g, '');
            if (numbers?.length <= 11) {
              // CPF format: 000.000.000-00
              return numbers?.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
            } else {
              // CNPJ format: 00.000.000/0000-00
              return numbers?.replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/, '$1.$2.$3/$4-$5');
            }
          };

          const handleTaxIdChange = (e) => {
            const formatted = formatTaxId(e?.target?.value);
            handleInputChange({ target: { name: 'taxId', value: formatted } });
          };

          const isBusinessAccount = localProfile?.accountType === 'label' || localProfile?.businessType === 'company';

          return (
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-xl font-semibold text-foreground mb-1">
                    Perfil Empresarial
                  </h2>
                  <p className="text-muted-foreground">
                    Informações fiscais e empresariais para pagamentos
                  </p>
                </div>

                {isBusinessAccount && (
                  <div className="flex items-center space-x-2 px-3 py-1 bg-primary/10 rounded-full">
                    <Icon name="Building" size={16} className="text-primary" />
                    <span className="text-sm font-medium text-primary">Conta Empresarial</span>
                  </div>
                )}
              </div>

              <div className="space-y-6">
                {/* Business Type Selection */}
                <div>
                  <label className="block text-sm font-medium text-foreground mb-3">
                    Tipo de Pessoa
                  </label>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {businessTypes?.map((type) => (
                      <label
                        key={type?.value}
                        className={`flex items-center p-4 border-2 rounded-lg cursor-pointer transition-all ${
                          localProfile?.businessType === type?.value
                            ? 'border-primary bg-primary/5' :'border-border hover:border-primary/50'
                        }`}
                      >
                        <input
                          type="radio"
                          name="businessType"
                          value={type?.value}
                          checked={localProfile?.businessType === type?.value}
                          onChange={handleInputChange}
                          className="sr-only"
                        />
                        <div className="flex-1">
                          <span className="font-medium text-foreground">{type?.label}</span>
                        </div>
                        {localProfile?.businessType === type?.value && (
                          <Icon name="CheckCircle" size={20} className="text-primary" />
                        )}
                      </label>
                    ))}
                  </div>
                </div>

                {/* Business Information */}
                {(localProfile?.businessType === 'company' || localProfile?.businessType === 'mei' || localProfile?.accountType === 'label') && (
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <Input
                        label="Nome da Empresa/Razão Social"
                        name="businessName"
                        placeholder="Nome oficial da empresa"
                        value={localProfile?.businessName || ''}
                        onChange={handleInputChange}
                        required
                      />
                      
                      <Input
                        label="Nome Fantasia"
                        name="tradeName"
                        placeholder="Nome comercial (se diferente)"
                        value={localProfile?.tradeName || ''}
                        onChange={handleInputChange}
                      />
                    </div>

                    <Input
                      label={localProfile?.businessType === 'mei' ? 'CNPJ MEI' : 'CNPJ'}
                      name="taxId"
                      placeholder={localProfile?.businessType === 'mei' ? '00.000.000/0000-00' : '00.000.000/0000-00'}
                      value={localProfile?.taxId || ''}
                      onChange={handleTaxIdChange}
                      required
                    />
                  </div>
                )}

                {/* Individual Information */}
                {localProfile?.businessType === 'individual' && (
                  <div className="space-y-4">
                    <Input
                      label="CPF"
                      name="taxId"
                      placeholder="000.000.000-00"
                      value={localProfile?.taxId || ''}
                      onChange={handleTaxIdChange}
                      required
                    />
                  </div>
                )}

                {/* Address Information */}
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-medium text-foreground">Endereço</h3>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        // Auto-fill from profile location
                        if (localProfile?.location) {
                          const [city, state] = localProfile?.location?.split(', ');
                          handleInputChange({ target: { name: 'businessCity', value: city || '' } });
                          handleInputChange({ target: { name: 'businessState', value: state || '' } });
                        }
                      }}
                      iconName="MapPin"
                    >
                      Usar Localização do Perfil
                    </Button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="md:col-span-2">
                      <Input
                        label="Endereço Completo"
                        name="businessAddress"
                        placeholder="Rua, número, complemento"
                        value={localProfile?.businessAddress || ''}
                        onChange={handleInputChange}
                      />
                    </div>

                    <Input
                      label="Cidade"
                      name="businessCity"
                      placeholder="Cidade"
                      value={localProfile?.businessCity || ''}
                      onChange={handleInputChange}
                    />

                    <Input
                      label="Estado/UF"
                      name="businessState"
                      placeholder="SP"
                      value={localProfile?.businessState || ''}
                      onChange={handleInputChange}
                    />

                    <Input
                      label="CEP"
                      name="businessZip"
                      placeholder="00000-000"
                      value={localProfile?.businessZip || ''}
                      onChange={handleInputChange}
                    />

                    <Select
                      label="País"
                      name="businessCountry"
                      value={localProfile?.businessCountry || 'BR'}
                      onChange={handleInputChange}
                      options={countries}
                    />
                  </div>
                </div>

                {/* Tax Information */}
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-medium text-foreground">Informações Fiscais</h3>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setShowTaxInfo(!showTaxInfo)}
                      iconName={showTaxInfo ? "ChevronUp" : "ChevronDown"}
                    >
                      {showTaxInfo ? 'Ocultar' : 'Mostrar Detalhes'}
                    </Button>
                  </div>

                  {showTaxInfo && (
                    <div className="space-y-4 p-4 bg-secondary/10 rounded-lg">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <Select
                          label="Regime Tributário"
                          name="taxRegime"
                          value={localProfile?.taxRegime || ''}
                          onChange={handleInputChange}
                          options={[
                            { value: 'simples', label: 'Simples Nacional' },
                            { value: 'presumido', label: 'Lucro Presumido' },
                            { value: 'real', label: 'Lucro Real' },
                            { value: 'mei', label: 'MEI' },
                            { value: 'individual', label: 'Pessoa Física' }
                          ]}
                        />

                        <Input
                          label="Inscrição Estadual"
                          name="stateRegistration"
                          placeholder="000.000.000.000"
                          value={localProfile?.stateRegistration || ''}
                          onChange={handleInputChange}
                        />
                      </div>

                      <Input
                        label="Inscrição Municipal"
                        name="municipalRegistration"
                        placeholder="Número da inscrição municipal"
                        value={localProfile?.municipalRegistration || ''}
                        onChange={handleInputChange}
                      />
                    </div>
                  )}
                </div>

                {/* Bank Information */}
                <div>
                  <h3 className="text-lg font-medium text-foreground mb-4">
                    Informações Bancárias
                  </h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Dados para recebimento de royalties e pagamentos
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Select
                      label="Banco"
                      name="bankCode"
                      value={localProfile?.bankCode || ''}
                      onChange={handleInputChange}
                      options={[
                        { value: '001', label: '001 - Banco do Brasil' },
                        { value: '033', label: '033 - Santander' },
                        { value: '104', label: '104 - Caixa Econômica' },
                        { value: '237', label: '237 - Bradesco' },
                        { value: '341', label: '341 - Itaú' },
                        { value: '260', label: '260 - Nu Pagamentos' },
                        { value: '323', label: '323 - Mercado Pago' },
                        { value: 'other', label: 'Outro banco' }
                      ]}
                      placeholder="Selecione seu banco"
                    />

                    <Input
                      label="Agência"
                      name="bankAgency"
                      placeholder="0000"
                      value={localProfile?.bankAgency || ''}
                      onChange={handleInputChange}
                    />

                    <Input
                      label="Conta"
                      name="bankAccount"
                      placeholder="00000-0"
                      value={localProfile?.bankAccount || ''}
                      onChange={handleInputChange}
                    />

                    <Select
                      label="Tipo de Conta"
                      name="bankAccountType"
                      value={localProfile?.bankAccountType || ''}
                      onChange={handleInputChange}
                      options={[
                        { value: 'checking', label: 'Conta Corrente' },
                        { value: 'savings', label: 'Conta Poupança' }
                      ]}
                    />
                  </div>
                </div>

                {/* Agreements */}
                <div className="space-y-4 p-4 bg-muted/20 rounded-lg">
                  <h3 className="font-medium text-foreground mb-3">Confirmações</h3>
                  
                  <Checkbox
                    name="confirmTaxInfo"
                    checked={localProfile?.confirmTaxInfo || false}
                    onChange={handleInputChange}
                    label="Confirmo que todas as informações fiscais estão corretas e atualizadas"
                  />

                  <Checkbox
                    name="confirmBankInfo"
                    checked={localProfile?.confirmBankInfo || false}
                    onChange={handleInputChange}
                    label="Confirmo que os dados bancários estão corretos para recebimento de pagamentos"
                  />

                  <Checkbox
                    name="agreeWithholdingTax"
                    checked={localProfile?.agreeWithholdingTax || false}
                    onChange={handleInputChange}
                    label="Concordo com os termos de retenção de impostos conforme legislação aplicável"
                  />
                </div>

                {/* Important Notice */}
                <div className="bg-warning/10 border border-warning/20 rounded-lg p-4">
                  <div className="flex items-start space-x-3">
                    <Icon name="AlertTriangle" size={20} className="text-warning mt-0.5" />
                    <div>
                      <h3 className="font-medium text-foreground mb-2">Importante</h3>
                      <ul className="space-y-1 text-sm text-muted-foreground">
                        <li>• Informações incorretas podem atrasar pagamentos</li>
                        <li>• Documentos podem ser solicitados para verificação</li>
                        <li>• Alterações em dados fiscais podem levar até 5 dias úteis para serem processadas</li>
                        <li>• Mantenha sempre suas informações atualizadas</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        };

        export default BusinessProfile;