import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Icon from '../../../components/AppIcon';

const LoginForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Mock credentials for testing
  const mockCredentials = {
    artist: { email: 'artist@spwmusic.com', password: 'artist123' },
    producer: { email: 'producer@spwmusic.com', password: 'producer123' },
    label: { email: 'label@spwmusic.com', password: 'label123' }
  };

  const handleInputChange = (e) => {
    const { name, value } = e?.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user starts typing
    if (errors?.[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData?.email) {
      newErrors.email = 'Email é obrigatório';
    } else if (!/\S+@\S+\.\S+/?.test(formData?.email)) {
      newErrors.email = 'Email inválido';
    }
    
    if (!formData?.password) {
      newErrors.password = 'Senha é obrigatória';
    } else if (formData?.password?.length < 6) {
      newErrors.password = 'Senha deve ter pelo menos 6 caracteres';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors)?.length === 0;
  };

  const handleSubmit = async (e) => {
    e?.preventDefault();
    
    if (!validateForm()) return;
    
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      const isValidCredentials = Object.values(mockCredentials)?.some(
        cred => cred?.email === formData?.email && cred?.password === formData?.password
      );
      
      if (isValidCredentials) {
        // Store user session
        localStorage.setItem('spw_user_session', JSON.stringify({
          email: formData?.email,
          loginTime: new Date()?.toISOString()
        }));
        navigate('/dashboard');
      } else {
        setErrors({
          general: 'Email ou senha incorretos. Use: artist@spwmusic.com / artist123'
        });
      }
      
      setIsLoading(false);
    }, 1500);
  };

  const handleSocialLogin = (provider) => {
    setIsLoading(true);
    // Simulate social login
    setTimeout(() => {
      localStorage.setItem('spw_user_session', JSON.stringify({
        email: `user@${provider}.com`,
        loginTime: new Date()?.toISOString(),
        provider
      }));
      navigate('/dashboard');
    }, 1000);
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <form onSubmit={handleSubmit} className="space-y-6">
        {errors?.general && (
          <div className="p-4 bg-error/10 border border-error/20 rounded-lg">
            <p className="text-sm text-error">{errors?.general}</p>
          </div>
        )}

        <div className="space-y-4">
          <Input
            label="Email"
            type="email"
            name="email"
            placeholder="Digite seu email"
            value={formData?.email}
            onChange={handleInputChange}
            error={errors?.email}
            required
            className="w-full"
          />

          <div className="relative">
            <Input
              label="Senha"
              type={showPassword ? 'text' : 'password'}
              name="password"
              placeholder="Digite sua senha"
              value={formData?.password}
              onChange={handleInputChange}
              error={errors?.password}
              required
              className="w-full pr-12"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-9 text-muted-foreground hover:text-foreground transition-colors"
            >
              <Icon name={showPassword ? 'EyeOff' : 'Eye'} size={20} />
            </button>
          </div>
        </div>

        <Button
          type="submit"
          variant="default"
          loading={isLoading}
          fullWidth
          className="h-12"
        >
          {isLoading ? 'Entrando...' : 'Entrar'}
        </Button>

        <div className="text-center">
          <button
            type="button"
            className="text-sm text-primary hover:text-primary/80 transition-colors"
            onClick={() => {
              // Handle forgot password
              alert('Funcionalidade de recuperação de senha em desenvolvimento');
            }}
          >
            Esqueceu sua senha?
          </button>
        </div>

        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-border"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-background text-muted-foreground">ou continue com</span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <Button
            type="button"
            variant="outline"
            onClick={() => handleSocialLogin('google')}
            disabled={isLoading}
            className="h-12"
          >
            <Icon name="Chrome" size={20} className="mr-2" />
            Google
          </Button>
          <Button
            type="button"
            variant="outline"
            onClick={() => handleSocialLogin('facebook')}
            disabled={isLoading}
            className="h-12"
          >
            <Icon name="Facebook" size={20} className="mr-2" />
            Facebook
          </Button>
        </div>

        <div className="text-center">
          <p className="text-sm text-muted-foreground">
            Novo na plataforma?{' '}
            <button
              type="button"
              className="text-primary hover:text-primary/80 transition-colors font-medium"
              onClick={() => navigate('/register')}
            >
              Registre-se aqui
            </button>
          </p>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;