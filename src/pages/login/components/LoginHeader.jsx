import React from 'react';
import { Link } from 'react-router-dom';
import Icon from '../../../components/AppIcon';

const LoginHeader = () => {
  return (
    <div className="text-center mb-8">
      {/* Logo */}
      <Link to="/dashboard" className="inline-flex items-center justify-center mb-6">
        <div className="flex items-center space-x-3">
          <div className="flex items-center justify-center w-12 h-12 bg-primary rounded-xl shadow-lg">
            <Icon name="Music" size={28} color="white" />
          </div>
          <div className="text-left">
            <h1 className="text-2xl font-bold text-foreground">SPW Music Link</h1>
            <p className="text-sm text-muted-foreground">Distribua sua música globalmente</p>
          </div>
        </div>
      </Link>

      {/* Welcome Message */}
      <div className="space-y-2">
        <h2 className="text-3xl font-bold text-foreground">Bem-vindo de volta</h2>
        <p className="text-muted-foreground max-w-sm mx-auto">
          Acesse sua conta para gerenciar suas músicas e acompanhar seu sucesso em mais de 150 plataformas
        </p>
      </div>
    </div>
  );
};

export default LoginHeader;