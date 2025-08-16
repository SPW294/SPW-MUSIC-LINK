import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import LoginHeader from './components/LoginHeader';
import LoginForm from './components/LoginForm';
import LoginBackground from './components/LoginBackground';
import FeatureHighlights from './components/FeatureHighlights';

const LoginPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is already logged in
    const userSession = localStorage.getItem('spw_user_session');
    if (userSession) {
      navigate('/dashboard');
    }
  }, [navigate]);

  return (
    <div className="min-h-screen bg-background">
      <LoginBackground />
      <div className="relative z-10 min-h-screen flex">
        {/* Main Login Section */}
        <div className="flex-1 lg:w-1/2 flex items-center justify-center p-6 lg:p-12">
          <div className="w-full max-w-md">
            <LoginHeader />
            <LoginForm />
            
            {/* Mobile Feature Preview */}
            <div className="lg:hidden mt-12 p-6 bg-card/50 rounded-xl border border-border backdrop-blur-sm">
              <div className="text-center">
                <h4 className="font-semibold text-foreground mb-2">
                  Distribua para 150+ plataformas
                </h4>
                <p className="text-sm text-muted-foreground">
                  Spotify • Apple Music • YouTube Music • Deezer • TikTok
                </p>
              </div>
            </div>
          </div>
        </div>
        
        {/* Desktop Feature Highlights */}
        <FeatureHighlights />
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

export default LoginPage;