import React, { useState } from 'react';
        import Button from '../../../components/ui/Button';
        import Input from '../../../components/ui/Input';
        
        import { Checkbox } from '../../../components/ui/Checkbox';
        import Icon from '../../../components/AppIcon';

        const RegisterForm = ({ currentStep, formData, updateFormData, nextStep, prevStep, onComplete }) => {
          const [errors, setErrors] = useState({});
          const [isLoading, setIsLoading] = useState(false);
          const [showPassword, setShowPassword] = useState(false);
          const [showConfirmPassword, setShowConfirmPassword] = useState(false);

          const accountTypes = [
            { value: 'artist', label: 'Artista Solo', description: 'Para músicos individuais' },
            { value: 'producer', label: 'Produtor', description: 'Para produtores musicais' },
            { value: 'label', label: 'Gravadora/Label', description: 'Para empresas e selos' }
          ];

          const musicGenres = [
            'Pop', 'Rock', 'Hip Hop', 'Eletrônica', 'Sertanejo', 'Funk', 'MPB', 
            'Samba', 'Bossa Nova', 'Forró', 'Pagode', 'Gospel', 'Jazz', 'Blues',
            'Reggae', 'Indie', 'Alternative', 'Classical', 'Folk', 'R&B'
          ];

          const handleInputChange = (e) => {
            const { name, value, type, checked } = e?.target;
            
            if (name?.includes('.')) {
              const [parent, child] = name?.split('.');
              updateFormData({
                [parent]: {
                  ...formData?.[parent],
                  [child]: value
                }
              });
            } else {
              updateFormData({
                [name]: type === 'checkbox' ? checked : value
              });
            }
            
            // Clear error when user starts typing
            if (errors?.[name]) {
              setErrors(prev => ({
                ...prev,
                [name]: ''
              }));
            }
          };

          const handleGenreToggle = (genre) => {
            const currentGenres = formData?.genres || [];
            const updatedGenres = currentGenres?.includes(genre)
              ? currentGenres?.filter(g => g !== genre)
              : [...currentGenres, genre];
            
            updateFormData({ genres: updatedGenres });
          };

          const validateStep1 = () => {
            const newErrors = {};
            
            if (!formData?.fullName) newErrors.fullName = 'Nome completo é obrigatório';
            if (!formData?.email) {
              newErrors.email = 'Email é obrigatório';
            } else if (!/\S+@\S+\.\S+/?.test(formData?.email)) {
              newErrors.email = 'Email inválido';
            }
            if (!formData?.password) {
              newErrors.password = 'Senha é obrigatória';
            } else if (formData?.password?.length < 8) {
              newErrors.password = 'Senha deve ter pelo menos 8 caracteres';
            }
            if (!formData?.confirmPassword) {
              newErrors.confirmPassword = 'Confirmação de senha é obrigatória';
            } else if (formData?.password !== formData?.confirmPassword) {
              newErrors.confirmPassword = 'Senhas não coincidem';
            }
            if (!formData?.accountType) newErrors.accountType = 'Tipo de conta é obrigatório';
            if (!formData?.agreeToTerms) newErrors.agreeToTerms = 'Você deve aceitar os termos';
            
            return newErrors;
          };

          const validateStep2 = () => {
            const newErrors = {};
            
            if (formData?.accountType === 'label' && !formData?.businessName) {
              newErrors.businessName = 'Nome da empresa é obrigatório';
            }
            if (!formData?.genres?.length) {
              newErrors.genres = 'Selecione pelo menos um gênero musical';
            }
            
            return newErrors;
          };

          const handleNext = () => {
            let stepErrors = {};
            
            if (currentStep === 1) {
              stepErrors = validateStep1();
            } else if (currentStep === 2) {
              stepErrors = validateStep2();
            }
            
            if (Object.keys(stepErrors)?.length > 0) {
              setErrors(stepErrors);
              return;
            }
            
            setErrors({});
            
            if (currentStep === 2) {
              // Simulate email verification
              setIsLoading(true);
              setTimeout(() => {
                setIsLoading(false);
                nextStep();
              }, 2000);
            } else {
              nextStep();
            }
          };

          const handleComplete = () => {
            setIsLoading(true);
            setTimeout(() => {
              setIsLoading(false);
              onComplete();
            }, 1500);
          };

          const handleSocialRegister = (provider) => {
            setIsLoading(true);
            setTimeout(() => {
              setIsLoading(false);
              onComplete();
            }, 1000);
          };

          // Step 1: Basic Information
          if (currentStep === 1) {
            return (
              <div className="space-y-6">
                <div className="space-y-4">
                  <Input
                    label="Nome Completo"
                    name="fullName"
                    placeholder="Digite seu nome completo"
                    value={formData?.fullName}
                    onChange={handleInputChange}
                    error={errors?.fullName}
                    required
                  />

                  <Input
                    label="Email"
                    type="email"
                    name="email"
                    placeholder="Digite seu email"
                    value={formData?.email}
                    onChange={handleInputChange}
                    error={errors?.email}
                    required
                  />

                  <div className="relative">
                    <Input
                      label="Senha"
                      type={showPassword ? 'text' : 'password'}
                      name="password"
                      placeholder="Crie uma senha segura"
                      value={formData?.password}
                      onChange={handleInputChange}
                      error={errors?.password}
                      required
                      className="pr-12"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-9 text-muted-foreground hover:text-foreground transition-colors"
                    >
                      <Icon name={showPassword ? 'EyeOff' : 'Eye'} size={20} />
                    </button>
                  </div>

                  <div className="relative">
                    <Input
                      label="Confirmar Senha"
                      type={showConfirmPassword ? 'text' : 'password'}
                      name="confirmPassword"
                      placeholder="Confirme sua senha"
                      value={formData?.confirmPassword}
                      onChange={handleInputChange}
                      error={errors?.confirmPassword}
                      required
                      className="pr-12"
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute right-3 top-9 text-muted-foreground hover:text-foreground transition-colors"
                    >
                      <Icon name={showConfirmPassword ? 'EyeOff' : 'Eye'} size={20} />
                    </button>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-foreground mb-3">
                      Tipo de Conta *
                    </label>
                    <div className="grid gap-3">
                      {accountTypes?.map((type) => (
                        <label
                          key={type?.value}
                          className={`flex items-start p-4 border-2 rounded-lg cursor-pointer transition-all ${
                            formData?.accountType === type?.value
                              ? 'border-primary bg-primary/5' :'border-border hover:border-primary/50'
                          }`}
                        >
                          <input
                            type="radio"
                            name="accountType"
                            value={type?.value}
                            checked={formData?.accountType === type?.value}
                            onChange={handleInputChange}
                            className="sr-only"
                          />
                          <div className="flex-1">
                            <h4 className="font-medium text-foreground">{type?.label}</h4>
                            <p className="text-sm text-muted-foreground">{type?.description}</p>
                          </div>
                          {formData?.accountType === type?.value && (
                            <Icon name="CheckCircle" size={20} className="text-primary mt-0.5" />
                          )}
                        </label>
                      ))}
                    </div>
                    {errors?.accountType && (
                      <p className="text-sm text-error mt-1">{errors?.accountType}</p>
                    )}
                  </div>
                </div>

                <div className="space-y-4">
                  <Checkbox
                    name="agreeToTerms"
                    checked={formData?.agreeToTerms}
                    onChange={handleInputChange}
                    label={
                      <span className="text-sm text-muted-foreground">
                        Concordo com os{' '}
                        <button className="text-primary hover:underline">Termos de Uso</button>
                        {' '}e{' '}
                        <button className="text-primary hover:underline">Política de Privacidade</button>
                      </span>
                    }
                    error={errors?.agreeToTerms}
                    required
                  />

                  <Checkbox
                    name="agreeToMarketing"
                    checked={formData?.agreeToMarketing}
                    onChange={handleInputChange}
                    label="Quero receber novidades e promoções por email"
                  />
                </div>

                <div className="space-y-4">
                  <Button onClick={handleNext} fullWidth className="h-12">
                    Continuar
                  </Button>

                  <div className="relative">
                    <div className="absolute inset-0 flex items-center">
                      <div className="w-full border-t border-border"></div>
                    </div>
                    <div className="relative flex justify-center text-sm">
                      <span className="px-2 bg-background text-muted-foreground">ou registre-se com</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => handleSocialRegister('google')}
                      disabled={isLoading}
                      className="h-12"
                    >
                      <Icon name="Chrome" size={20} className="mr-2" />
                      Google
                    </Button>
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => handleSocialRegister('facebook')}
                      disabled={isLoading}
                      className="h-12"
                    >
                      <Icon name="Facebook" size={20} className="mr-2" />
                      Facebook
                    </Button>
                  </div>
                </div>
              </div>
            );
          }

          // Step 2: Professional Profile
          if (currentStep === 2) {
            return (
              <div className="space-y-6">
                <div className="space-y-4">
                  {formData?.accountType === 'label' && (
                    <>
                      <Input
                        label="Nome da Empresa/Label"
                        name="businessName"
                        placeholder="Digite o nome da sua empresa"
                        value={formData?.businessName}
                        onChange={handleInputChange}
                        error={errors?.businessName}
                        required
                      />
                      
                      <Input
                        label="CNPJ"
                        name="taxId"
                        placeholder="00.000.000/0000-00"
                        value={formData?.taxId}
                        onChange={handleInputChange}
                      />
                    </>
                  )}

                  <Input
                    label="Telefone"
                    name="phone"
                    placeholder="(11) 99999-9999"
                    value={formData?.phone}
                    onChange={handleInputChange}
                  />

                  <Input
                    label="Website"
                    name="website"
                    placeholder="https://seusite.com"
                    value={formData?.website}
                    onChange={handleInputChange}
                  />

                  <div>
                    <label className="block text-sm font-medium text-foreground mb-3">
                      Redes Sociais
                    </label>
                    <div className="grid grid-cols-2 gap-3">
                      <Input
                        placeholder="Instagram"
                        name="socialLinks.instagram"
                        value={formData?.socialLinks?.instagram}
                        onChange={handleInputChange}
                        leftIcon="Instagram"
                      />
                      <Input
                        placeholder="Twitter"
                        name="socialLinks.twitter"
                        value={formData?.socialLinks?.twitter}
                        onChange={handleInputChange}
                        leftIcon="Twitter"
                      />
                      <Input
                        placeholder="YouTube"
                        name="socialLinks.youtube"
                        value={formData?.socialLinks?.youtube}
                        onChange={handleInputChange}
                        leftIcon="Youtube"
                      />
                      <Input
                        placeholder="Spotify"
                        name="socialLinks.spotify"
                        value={formData?.socialLinks?.spotify}
                        onChange={handleInputChange}
                        leftIcon="Music"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-foreground mb-3">
                      Gêneros Musicais *
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {musicGenres?.map((genre) => (
                        <button
                          key={genre}
                          type="button"
                          onClick={() => handleGenreToggle(genre)}
                          className={`px-3 py-2 rounded-full text-sm font-medium transition-all ${
                            formData?.genres?.includes(genre)
                              ? 'bg-primary text-primary-foreground'
                              : 'bg-secondary/20 text-muted-foreground hover:bg-secondary/40'
                          }`}
                        >
                          {genre}
                        </button>
                      ))}
                    </div>
                    {errors?.genres && (
                      <p className="text-sm text-error mt-1">{errors?.genres}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Bio/Descrição
                    </label>
                    <textarea
                      name="bio"
                      rows="4"
                      placeholder="Conte um pouco sobre você ou sua empresa..."
                      value={formData?.bio}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary resize-none"
                    />
                  </div>
                </div>

                <div className="flex space-x-3">
                  <Button 
                    variant="outline" 
                    onClick={prevStep}
                    className="flex-1 h-12"
                  >
                    Voltar
                  </Button>
                  <Button 
                    onClick={handleNext}
                    loading={isLoading}
                    className="flex-1 h-12"
                  >
                    {isLoading ? 'Enviando...' : 'Finalizar'}
                  </Button>
                </div>
              </div>
            );
          }

          // Step 3: Email Verification
          if (currentStep === 3) {
            return (
              <div className="text-center space-y-6">
                <div className="flex items-center justify-center w-20 h-20 bg-success/10 rounded-full mx-auto mb-6">
                  <Icon name="Mail" size={32} className="text-success" />
                </div>
                
                <div>
                  <h3 className="text-xl font-semibold text-foreground mb-2">
                    Verifique seu email
                  </h3>
                  <p className="text-muted-foreground mb-4">
                    Enviamos um link de verificação para<br />
                    <strong>{formData?.email}</strong>
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Clique no link para ativar sua conta e começar a distribuir sua música.
                  </p>
                </div>

                <div className="space-y-3">
                  <Button
                    onClick={handleComplete}
                    loading={isLoading}
                    fullWidth
                    className="h-12"
                  >
                    {isLoading ? 'Verificando...' : 'Ir para Dashboard'}
                  </Button>
                  
                  <Button
                    variant="outline"
                    onClick={() => {
                      // Resend verification email
                      alert('Email de verificação reenviado!');
                    }}
                    fullWidth
                    className="h-12"
                  >
                    Reenviar Email
                  </Button>
                </div>

                <div className="text-xs text-muted-foreground">
                  <p>Não recebeu o email? Verifique sua caixa de spam</p>
                </div>
              </div>
            );
          }

          return null;
        };

        export default RegisterForm;