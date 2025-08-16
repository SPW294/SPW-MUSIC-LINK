import React from 'react';
        import Icon from '../../../components/AppIcon';

        const RegisterHeader = () => {
          return (
            <div className="text-center mb-8">
              <div className="flex items-center justify-center mb-6">
                <div className="flex items-center justify-center w-12 h-12 bg-primary rounded-xl">
                  <Icon name="Music" size={24} color="white" />
                </div>
              </div>
              
              <h1 className="text-3xl font-bold text-foreground mb-2">
                Crie sua conta
              </h1>
              
              <p className="text-muted-foreground">
                Junte-se à maior plataforma de distribuição musical do Brasil
              </p>
            </div>
          );
        };

        export default RegisterHeader;