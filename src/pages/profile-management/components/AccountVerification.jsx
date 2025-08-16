import React, { useState } from 'react';
        import Button from '../../../components/ui/Button';
        
        import Icon from '../../../components/AppIcon';

        const AccountVerification = ({ profile, updateProfile }) => {
          const [uploadingDocument, setUploadingDocument] = useState(null);
          const [verificationData, setVerificationData] = useState({
            identityDocument: null,
            businessDocument: null,
            addressProof: null,
            bankStatement: null
          });

          const verificationTypes = [
            {
              key: 'email',
              title: 'Verificação de Email',
              description: 'Confirme seu endereço de email',
              icon: 'Mail',
              status: profile?.verification?.email ? 'verified' : 'pending',
              color: profile?.verification?.email ? 'text-success' : 'text-warning',
              bgColor: profile?.verification?.email ? 'bg-success/10' : 'bg-warning/10',
              required: true
            },
            {
              key: 'phone',
              title: 'Verificação de Telefone',
              description: 'Confirme seu número de telefone via SMS',
              icon: 'Phone',
              status: profile?.verification?.phone ? 'verified' : 'not_started',
              color: profile?.verification?.phone ? 'text-success' : 'text-muted-foreground',
              bgColor: profile?.verification?.phone ? 'bg-success/10' : 'bg-secondary/10',
              required: false
            },
            {
              key: 'identity',
              title: 'Verificação de Identidade',
              description: 'Envie documento de identidade (RG, CNH ou Passaporte)',
              icon: 'CreditCard',
              status: profile?.verification?.identity ? 'verified' : 'not_started',
              color: profile?.verification?.identity ? 'text-success' : 'text-muted-foreground',
              bgColor: profile?.verification?.identity ? 'bg-success/10' : 'bg-secondary/10',
              required: true,
              uploadKey: 'identityDocument'
            },
            {
              key: 'business',
              title: 'Verificação Empresarial',
              description: 'Envie documentos da empresa (CNPJ, Contrato Social)',
              icon: 'Building',
              status: profile?.verification?.business ? 'verified' : 'not_started',
              color: profile?.verification?.business ? 'text-success' : 'text-muted-foreground',
              bgColor: profile?.verification?.business ? 'bg-success/10' : 'bg-secondary/10',
              required: profile?.accountType === 'label',
              uploadKey: 'businessDocument',
              visible: profile?.accountType === 'label' || profile?.businessType === 'company'
            },
            {
              key: 'artist',
              title: 'Verificação de Artista',
              description: 'Comprove sua identidade como artista verificado',
              icon: 'Award',
              status: profile?.verification?.artist ? 'verified' : 'not_started',
              color: profile?.verification?.artist ? 'text-success' : 'text-muted-foreground',
              bgColor: profile?.verification?.artist ? 'bg-success/10' : 'bg-secondary/10',
              required: false,
              premium: true
            }
          ];

          const benefits = [
            {
              title: 'Pagamentos Mais Rápidos',
              description: 'Receba royalties sem atraso adicional',
              icon: 'Zap',
              requiredVerifications: ['email', 'identity']
            },
            {
              title: 'Limites Maiores',
              description: 'Faça upload de mais músicas por mês',
              icon: 'TrendingUp',
              requiredVerifications: ['email', 'phone', 'identity']
            },
            {
              title: 'Suporte Prioritário',
              description: 'Atendimento preferencial para dúvidas',
              icon: 'Headphones',
              requiredVerifications: ['email', 'identity']
            },
            {
              title: 'Perfil Destacado',
              description: 'Selo de verificação no seu perfil público',
              icon: 'CheckCircle',
              requiredVerifications: ['email', 'phone', 'identity', 'artist']
            }
          ];

          const handleFileUpload = async (verificationType, file) => {
            if (!file) return;

            setUploadingDocument(verificationType?.uploadKey);
            
            // Simulate file upload
            setTimeout(() => {
              const reader = new FileReader();
              reader.onload = (e) => {
                setVerificationData(prev => ({
                  ...prev,
                  [verificationType?.uploadKey]: {
                    name: file?.name,
                    size: file?.size,
                    type: file?.type,
                    data: e?.target?.result,
                    uploadDate: new Date()?.toISOString()
                  }
                }));
                
                // Update verification status
                updateProfile({
                  verification: {
                    ...profile?.verification,
                    [verificationType?.key]: 'pending'
                  }
                });
              };
              reader?.readAsDataURL(file);
              setUploadingDocument(null);
            }, 2000);
          };

          const handleEmailVerification = () => {
            if (profile?.verification?.email) {
              alert('Email já verificado!');
              return;
            }
            
            const confirmed = confirm('Enviar email de verificação?');
            if (confirmed) {
              // Simulate email sending
              alert('Email de verificação enviado! Verifique sua caixa de entrada.');
              setTimeout(() => {
                updateProfile({
                  verification: {
                    ...profile?.verification,
                    email: true
                  }
                });
              }, 3000);
            }
          };

          const handlePhoneVerification = () => {
            if (profile?.verification?.phone) {
              alert('Telefone já verificado!');
              return;
            }

            if (!profile?.phone) {
              alert('Primeiro adicione um número de telefone em Informações Básicas');
              return;
            }
            
            const confirmed = confirm(`Enviar código SMS para ${profile?.phone}?`);
            if (confirmed) {
              const code = prompt('Digite o código enviado por SMS:');
              if (code === '123456') {
                updateProfile({
                  verification: {
                    ...profile?.verification,
                    phone: true
                  }
                });
                alert('Telefone verificado com sucesso!');
              } else {
                alert('Código inválido. Tente novamente.');
              }
            }
          };

          const getVerificationProgress = () => {
            const totalVerifications = verificationTypes?.filter(v => v?.visible !== false)?.length;
            const completedVerifications = verificationTypes?.filter(v => 
              v?.visible !== false && profile?.verification?.[v?.key]
            )?.length;
            
            return Math.round((completedVerifications / totalVerifications) * 100);
          };

          const getEnabledBenefits = () => {
            return benefits?.filter(benefit => {
              return benefit?.requiredVerifications?.every(req => 
                profile?.verification?.[req]
              );
            });
          };

          return (
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-xl font-semibold text-foreground mb-1">
                    Verificação de Conta
                  </h2>
                  <p className="text-muted-foreground">
                    Complete as verificações para desbloquear recursos premium
                  </p>
                </div>

                {/* Verification Progress */}
                <div className="text-right">
                  <div className="text-sm text-muted-foreground mb-1">
                    Progresso da verificação
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-20 h-2 bg-secondary/20 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-primary transition-all duration-500"
                        style={{ width: `${getVerificationProgress()}%` }}
                      ></div>
                    </div>
                    <span className="text-sm font-medium text-primary">
                      {getVerificationProgress()}%
                    </span>
                  </div>
                </div>
              </div>
              {/* Verification Types */}
              <div className="space-y-6 mb-8">
                {verificationTypes?.filter(v => v?.visible !== false)?.map((verification) => (
                  <div key={verification?.key} className="bg-card border border-border rounded-lg overflow-hidden">
                    <div className="p-4">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-start space-x-3">
                          <div className={`p-2 rounded-lg ${verification?.bgColor}`}>
                            <Icon name={verification?.icon} size={20} className={verification?.color} />
                          </div>
                          <div>
                            <div className="flex items-center space-x-2 mb-1">
                              <h3 className="font-medium text-foreground">{verification?.title}</h3>
                              {verification?.required && (
                                <span className="px-2 py-0.5 bg-error/10 text-error text-xs rounded-full">
                                  Obrigatório
                                </span>
                              )}
                              {verification?.premium && (
                                <span className="px-2 py-0.5 bg-primary/10 text-primary text-xs rounded-full">
                                  Premium
                                </span>
                              )}
                            </div>
                            <p className="text-sm text-muted-foreground">{verification?.description}</p>
                          </div>
                        </div>

                        {/* Status */}
                        <div className={`px-3 py-1 rounded-full text-sm font-medium ${
                          verification?.status === 'verified' ? 'bg-success/10 text-success' :
                          verification?.status === 'pending' ? 'bg-warning/10 text-warning' :
                          verification?.status === 'rejected'? 'bg-error/10 text-error' : 'bg-secondary/10 text-muted-foreground'
                        }`}>
                          {verification?.status === 'verified' ? 'Verificado' :
                           verification?.status === 'pending' ? 'Pendente' :
                           verification?.status === 'rejected' ? 'Rejeitado' :
                           'Não iniciado'}
                        </div>
                      </div>

                      {/* Action Buttons */}
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          {verification?.key === 'email' && (
                            <Button
                              onClick={handleEmailVerification}
                              disabled={profile?.verification?.email}
                              size="sm"
                              iconName={profile?.verification?.email ? "CheckCircle" : "Mail"}
                            >
                              {profile?.verification?.email ? 'Verificado' : 'Verificar Email'}
                            </Button>
                          )}

                          {verification?.key === 'phone' && (
                            <Button
                              onClick={handlePhoneVerification}
                              disabled={profile?.verification?.phone || !profile?.phone}
                              size="sm"
                              iconName={profile?.verification?.phone ? "CheckCircle" : "MessageSquare"}
                            >
                              {profile?.verification?.phone ? 'Verificado' : 'Verificar por SMS'}
                            </Button>
                          )}

                          {verification?.uploadKey && (
                            <div className="space-y-3">
                              {verificationData?.[verification?.uploadKey] ? (
                                <div className="flex items-center space-x-3 p-3 bg-success/10 border border-success/20 rounded-lg">
                                  <Icon name="FileCheck" size={20} className="text-success" />
                                  <div className="flex-1">
                                    <p className="text-sm font-medium text-success">
                                      {verificationData?.[verification?.uploadKey]?.name}
                                    </p>
                                    <p className="text-xs text-muted-foreground">
                                      Enviado em {new Date(verificationData?.[verification?.uploadKey]?.uploadDate)?.toLocaleDateString()}
                                    </p>
                                  </div>
                                  <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() => {
                                      const input = document.createElement('input');
                                      input.type = 'file';
                                      input.accept = 'image/*,.pdf';
                                      input.onchange = (e) => {
                                        const file = e?.target?.files?.[0];
                                        if (file) {
                                          handleFileUpload(verification, file);
                                        }
                                      };
                                      input?.click();
                                    }}
                                  >
                                    Substituir
                                  </Button>
                                </div>
                              ) : (
                                <div className="space-y-2">
                                  <label className="block">
                                    <Button
                                      variant="outline"
                                      size="sm"
                                      loading={uploadingDocument === verification?.uploadKey}
                                      iconName="Upload"
                                      className="cursor-pointer"
                                      as="span"
                                    >
                                      {uploadingDocument === verification?.uploadKey ? 
                                        'Enviando...' : 'Enviar Documento'}
                                    </Button>
                                    <input
                                      type="file"
                                      accept="image/*,.pdf"
                                      onChange={(e) => {
                                        const file = e?.target?.files?.[0];
                                        if (file) {
                                          handleFileUpload(verification, file);
                                        }
                                      }}
                                      className="hidden"
                                    />
                                  </label>
                                  <p className="text-xs text-muted-foreground">
                                    Formatos aceitos: JPG, PNG, PDF (máx. 5MB)
                                  </p>
                                </div>
                              )}
                            </div>
                          )}

                          {verification?.key === 'artist' && (
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => {
                                alert('Funcionalidade de verificação de artista em desenvolvimento. Entre em contato com o suporte.');
                              }}
                              iconName="Award"
                            >
                              Solicitar Verificação
                            </Button>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              {/* Benefits Section */}
              <div className="bg-card border border-border rounded-lg p-6">
                <h3 className="text-lg font-medium text-foreground mb-4 flex items-center">
                  <Icon name="Gift" size={20} className="mr-2" />
                  Benefícios da Verificação
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {benefits?.map((benefit, index) => {
                    const isEnabled = benefit?.requiredVerifications?.every(req => 
                      profile?.verification?.[req]
                    );

                    return (
                      <div 
                        key={index}
                        className={`p-4 border rounded-lg transition-all ${
                          isEnabled 
                            ? 'border-success/50 bg-success/5' :'border-border hover:border-primary/30'
                        }`}
                      >
                        <div className="flex items-start space-x-3">
                          <div className={`p-2 rounded-lg ${
                            isEnabled ? 'bg-success/10 text-success' : 'bg-secondary/10 text-muted-foreground'
                          }`}>
                            <Icon name={benefit?.icon} size={18} />
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center space-x-2 mb-1">
                              <h4 className="font-medium text-foreground">{benefit?.title}</h4>
                              {isEnabled && (
                                <Icon name="CheckCircle" size={16} className="text-success" />
                              )}
                            </div>
                            <p className="text-sm text-muted-foreground mb-2">
                              {benefit?.description}
                            </p>
                            <div className="text-xs text-muted-foreground">
                              Requer: {benefit?.requiredVerifications?.map(req => 
                                verificationTypes?.find(v => v?.key === req)?.title
                              )?.join(', ')}
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Enabled Benefits Summary */}
                <div className="mt-6 p-4 bg-primary/5 border border-primary/20 rounded-lg">
                  <div className="flex items-center space-x-2 mb-2">
                    <Icon name="Sparkles" size={16} className="text-primary" />
                    <span className="font-medium text-primary">
                      Benefícios Desbloqueados: {getEnabledBenefits()?.length}/{benefits?.length}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Complete mais verificações para desbloquear todos os recursos premium
                  </p>
                </div>
              </div>
              {/* Help Section */}
              <div className="mt-8 bg-secondary/10 border border-secondary/20 rounded-lg p-4">
                <div className="flex items-start space-x-3">
                  <Icon name="HelpCircle" size={20} className="text-secondary mt-0.5" />
                  <div>
                    <h3 className="font-medium text-foreground mb-2">Precisa de ajuda?</h3>
                    <ul className="space-y-1 text-sm text-muted-foreground mb-3">
                      <li>• Documentos devem estar legíveis e em boa qualidade</li>
                      <li>• O processo de verificação pode levar até 3 dias úteis</li>
                      <li>• Em caso de rejeição, você receberá instruções por email</li>
                      <li>• Para dúvidas, entre em contato com nosso suporte</li>
                    </ul>
                    <Button variant="outline" size="sm" iconName="MessageCircle">
                      Falar com Suporte
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          );
        };

        export default AccountVerification;