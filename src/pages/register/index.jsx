import React, { useState } from 'react';
        import { useNavigate, Link } from 'react-router-dom';
        import RegisterForm from './components/RegisterForm';
        import RegisterHeader from './components/RegisterHeader';
        import RegistrationSteps from './components/RegistrationSteps';
        import FeatureShowcase from './components/FeatureShowcase';
        

        const RegisterPage = () => {
          const navigate = useNavigate();
          const [currentStep, setCurrentStep] = useState(1);
          const [formData, setFormData] = useState({
            fullName: '',
            email: '',
            password: '',
            confirmPassword: '',
            accountType: '',
            businessName: '',
            taxId: '',
            phone: '',
            website: '',
            socialLinks: {
              instagram: '',
              twitter: '',
              youtube: '',
              spotify: ''
            },
            genres: [],
            bio: '',
            agreeToTerms: false,
            agreeToMarketing: false
          });

          const steps = [
            { number: 1, title: 'Informações Básicas', description: 'Dados pessoais e conta' },
            { number: 2, title: 'Perfil Profissional', description: 'Informações do seu negócio' },
            { number: 3, title: 'Verificação', description: 'Confirme seu email' }
          ];

          const updateFormData = (newData) => {
            setFormData(prev => ({ ...prev, ...newData }));
          };

          const nextStep = () => {
            if (currentStep < steps?.length) {
              setCurrentStep(currentStep + 1);
            }
          };

          const prevStep = () => {
            if (currentStep > 1) {
              setCurrentStep(currentStep - 1);
            }
          };

          const handleRegistrationComplete = () => {
            // Store user session after successful registration
            localStorage.setItem('spw_user_session', JSON.stringify({
              email: formData?.email,
              fullName: formData?.fullName,
              accountType: formData?.accountType,
              registrationTime: new Date()?.toISOString(),
              isVerified: false
            }));
            
            // Navigate to dashboard with onboarding flow
            navigate('/dashboard?onboarding=true');
          };

          return (
            <div className="min-h-screen bg-background">
              {/* Background Pattern */}
              <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5"></div>
              
              <div className="relative z-10 min-h-screen flex">
                {/* Main Registration Section */}
                <div className="flex-1 lg:w-1/2 flex items-center justify-center p-6 lg:p-12">
                  <div className="w-full max-w-md">
                    <RegisterHeader />
                    
                    {/* Progress Steps */}
                    <RegistrationSteps 
                      steps={steps} 
                      currentStep={currentStep}
                    />
                    
                    {/* Registration Form */}
                    <RegisterForm
                      currentStep={currentStep}
                      formData={formData}
                      updateFormData={updateFormData}
                      nextStep={nextStep}
                      prevStep={prevStep}
                      onComplete={handleRegistrationComplete}
                    />
                    
                    {/* Login Link */}
                    <div className="mt-8 text-center">
                      <p className="text-sm text-muted-foreground">
                        Já tem uma conta?{' '}
                        <Link 
                          to="/login" 
                          className="text-primary hover:text-primary/80 transition-colors font-medium"
                        >
                          Entre aqui
                        </Link>
                      </p>
                    </div>
                  </div>
                </div>
                
                {/* Desktop Feature Showcase */}
                <FeatureShowcase />
              </div>
              
              {/* Footer */}
              <div className="relative z-10 border-t border-border bg-background/80 backdrop-blur-sm">
                <div className="max-w-7xl mx-auto px-6 py-4">
                  <div className="flex flex-col sm:flex-row justify-between items-center space-y-2 sm:space-y-0">
                    <p className="text-sm text-muted-foreground">
                      © {new Date()?.getFullYear()} SPW Music Link. Todos os direitos reservados.
                    </p>
                    <div className="flex items-center space-x-6 text-sm">
                      <button className="text-muted-foreground hover:text-foreground transition-colors">
                        Termos de Uso
                      </button>
                      <button className="text-muted-foreground hover:text-foreground transition-colors">
                        Política de Privacidade
                      </button>
                      <button className="text-muted-foreground hover:text-foreground transition-colors">
                        Suporte
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        };

        export default RegisterPage;