import React, { useState } from 'react';
        import Button from '../../../components/ui/Button';
        import Input from '../../../components/ui/Input';
        import { Checkbox } from '../../../components/ui/Checkbox';
        import Icon from '../../../components/AppIcon';

        const SecuritySettings = ({ profile, updateProfile }) => {
          const [showCurrentPassword, setShowCurrentPassword] = useState(false);
          const [showNewPassword, setShowNewPassword] = useState(false);
          const [showConfirmPassword, setShowConfirmPassword] = useState(false);
          const [passwordData, setPasswordData] = useState({
            currentPassword: '',
            newPassword: '',
            confirmPassword: ''
          });
          const [isChangingPassword, setIsChangingPassword] = useState(false);
          const [twoFactorEnabled, setTwoFactorEnabled] = useState(profile?.twoFactorEnabled || false);
          const [sessions] = useState([
            {
              id: 1,
              device: 'Chrome on Windows',
              location: 'São Paulo, SP',
              lastActive: '2025-01-16 10:30',
              current: true,
              ip: '192.168.1.1'
            },
            {
              id: 2,
              device: 'Safari on iPhone',
              location: 'São Paulo, SP',
              lastActive: '2025-01-15 22:45',
              current: false,
              ip: '192.168.1.2'
            },
            {
              id: 3,
              device: 'Chrome on Android',
              location: 'Rio de Janeiro, RJ',
              lastActive: '2025-01-14 16:20',
              current: false,
              ip: '192.168.1.3'
            }
          ]);

          const [loginHistory] = useState([
            {
              date: '2025-01-16 10:30',
              device: 'Chrome on Windows',
              location: 'São Paulo, SP',
              status: 'success',
              ip: '192.168.1.1'
            },
            {
              date: '2025-01-15 22:45',
              device: 'Safari on iPhone',
              location: 'São Paulo, SP',
              status: 'success',
              ip: '192.168.1.2'
            },
            {
              date: '2025-01-14 16:20',
              device: 'Chrome on Android',
              location: 'Rio de Janeiro, RJ',
              status: 'success',
              ip: '192.168.1.3'
            },
            {
              date: '2025-01-13 09:15',
              device: 'Firefox on Windows',
              location: 'Brasília, DF',
              status: 'blocked',
              ip: '192.168.1.4'
            }
          ]);

          const handlePasswordChange = (e) => {
            const { name, value } = e?.target;
            setPasswordData(prev => ({
              ...prev,
              [name]: value
            }));
          };

          const handlePasswordSubmit = async (e) => {
            e?.preventDefault();
            
            if (passwordData?.newPassword !== passwordData?.confirmPassword) {
              alert('Senhas não coincidem');
              return;
            }

            if (passwordData?.newPassword?.length < 8) {
              alert('Nova senha deve ter pelo menos 8 caracteres');
              return;
            }

            setIsChangingPassword(true);
            
            // Simulate API call
            setTimeout(() => {
              alert('Senha alterada com sucesso!');
              setPasswordData({
                currentPassword: '',
                newPassword: '',
                confirmPassword: ''
              });
              setIsChangingPassword(false);
            }, 2000);
          };

          const handleTwoFactorToggle = () => {
            if (!twoFactorEnabled) {
              // Enable 2FA
              const confirmed = window.confirm(
                'Ativar autenticação de dois fatores? Você precisará usar um aplicativo como Google Authenticator.'
              );
              if (confirmed) {
                setTwoFactorEnabled(true);
                updateProfile({ twoFactorEnabled: true });
                alert('Autenticação de dois fatores ativada! Escaneie o QR code no seu aplicativo.');
              }
            } else {
              // Disable 2FA
              const confirmed = window.confirm(
                'Tem certeza que deseja desativar a autenticação de dois fatores? Isso reduzirá a segurança da sua conta.'
              );
              if (confirmed) {
                setTwoFactorEnabled(false);
                updateProfile({ twoFactorEnabled: false });
                alert('Autenticação de dois fatores desativada.');
              }
            }
          };

          const handleTerminateSession = (sessionId) => {
            const confirmed = window.confirm('Tem certeza que deseja encerrar esta sessão?');
            if (confirmed) {
              // Simulate session termination
              alert('Sessão encerrada com sucesso!');
            }
          };

          const handleTerminateAllSessions = () => {
            const confirmed = window.confirm(
              'Tem certeza que deseja encerrar todas as outras sessões? Você precisará fazer login novamente em outros dispositivos.'
            );
            if (confirmed) {
              alert('Todas as outras sessões foram encerradas!');
            }
          };

          const getPasswordStrength = (password) => {
            let strength = 0;
            if (password?.length >= 8) strength++;
            if (/[a-z]/?.test(password)) strength++;
            if (/[A-Z]/?.test(password)) strength++;
            if (/[0-9]/?.test(password)) strength++;
            if (/[^A-Za-z0-9]/?.test(password)) strength++;
            return strength;
          };

          const getPasswordStrengthText = (strength) => {
            switch (strength) {
              case 0:
              case 1:
                return { text: 'Muito fraca', color: 'text-red-500' };
              case 2:
                return { text: 'Fraca', color: 'text-orange-500' };
              case 3:
                return { text: 'Média', color: 'text-yellow-500' };
              case 4:
                return { text: 'Forte', color: 'text-blue-500' };
              case 5:
                return { text: 'Muito forte', color: 'text-green-500' };
              default:
                return { text: '', color: '' };
            }
          };

          const passwordStrength = getPasswordStrength(passwordData?.newPassword);
          const strengthInfo = getPasswordStrengthText(passwordStrength);

          return (
            <div className="p-6 space-y-8">
              <div>
                <h2 className="text-xl font-semibold text-foreground mb-1">
                  Configurações de Segurança
                </h2>
                <p className="text-muted-foreground">
                  Gerencie a segurança da sua conta e controle o acesso
                </p>
              </div>

              {/* Password Change */}
              <div className="bg-card border border-border rounded-lg p-6">
                <h3 className="text-lg font-medium text-foreground mb-4 flex items-center">
                  <Icon name="Lock" size={20} className="mr-2" />
                  Alterar Senha
                </h3>

                <form onSubmit={handlePasswordSubmit} className="space-y-4">
                  <div className="relative">
                    <Input
                      label="Senha Atual"
                      type={showCurrentPassword ? 'text' : 'password'}
                      name="currentPassword"
                      placeholder="Digite sua senha atual"
                      value={passwordData?.currentPassword}
                      onChange={handlePasswordChange}
                      required
                      className="pr-12"
                    />
                    <button
                      type="button"
                      onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                      className="absolute right-3 top-9 text-muted-foreground hover:text-foreground transition-colors"
                    >
                      <Icon name={showCurrentPassword ? 'EyeOff' : 'Eye'} size={20} />
                    </button>
                  </div>

                  <div className="relative">
                    <Input
                      label="Nova Senha"
                      type={showNewPassword ? 'text' : 'password'}
                      name="newPassword"
                      placeholder="Digite sua nova senha"
                      value={passwordData?.newPassword}
                      onChange={handlePasswordChange}
                      required
                      className="pr-12"
                    />
                    <button
                      type="button"
                      onClick={() => setShowNewPassword(!showNewPassword)}
                      className="absolute right-3 top-9 text-muted-foreground hover:text-foreground transition-colors"
                    >
                      <Icon name={showNewPassword ? 'EyeOff' : 'Eye'} size={20} />
                    </button>
                    
                    {/* Password Strength Indicator */}
                    {passwordData?.newPassword && (
                      <div className="mt-2">
                        <div className="flex items-center space-x-2 mb-1">
                          <div className="flex-1 h-2 bg-secondary/20 rounded-full overflow-hidden">
                            <div 
                              className={`h-full transition-all duration-300 ${
                                passwordStrength <= 1 ? 'bg-red-500' :
                                passwordStrength === 2 ? 'bg-orange-500' :
                                passwordStrength === 3 ? 'bg-yellow-500' :
                                passwordStrength === 4 ? 'bg-blue-500' : 'bg-green-500'
                              }`}
                              style={{ width: `${(passwordStrength / 5) * 100}%` }}
                            ></div>
                          </div>
                          <span className={`text-sm font-medium ${strengthInfo?.color}`}>
                            {strengthInfo?.text}
                          </span>
                        </div>
                        <div className="text-xs text-muted-foreground">
                          Use pelo menos 8 caracteres com letras maiúsculas, minúsculas, números e símbolos
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="relative">
                    <Input
                      label="Confirmar Nova Senha"
                      type={showConfirmPassword ? 'text' : 'password'}
                      name="confirmPassword"
                      placeholder="Confirme sua nova senha"
                      value={passwordData?.confirmPassword}
                      onChange={handlePasswordChange}
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

                  <Button
                    type="submit"
                    loading={isChangingPassword}
                    disabled={!passwordData?.currentPassword || !passwordData?.newPassword || !passwordData?.confirmPassword}
                    iconName="Save"
                    iconPosition="left"
                  >
                    {isChangingPassword ? 'Alterando...' : 'Alterar Senha'}
                  </Button>
                </form>
              </div>

              {/* Two-Factor Authentication */}
              <div className="bg-card border border-border rounded-lg p-6">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="text-lg font-medium text-foreground flex items-center">
                      <Icon name="Shield" size={20} className="mr-2" />
                      Autenticação de Dois Fatores (2FA)
                    </h3>
                    <p className="text-muted-foreground">
                      Adicione uma camada extra de segurança à sua conta
                    </p>
                  </div>
                  
                  <div className={`px-3 py-1 rounded-full text-sm font-medium ${
                    twoFactorEnabled 
                      ? 'bg-success/10 text-success' :'bg-error/10 text-error'
                  }`}>
                    {twoFactorEnabled ? 'Ativado' : 'Desativado'}
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <Icon name="Smartphone" size={20} className="text-muted-foreground mt-1" />
                    <div>
                      <p className="text-sm text-foreground mb-1">
                        Use um aplicativo autenticador como Google Authenticator ou Authy
                      </p>
                      <p className="text-xs text-muted-foreground">
                        Gere códigos únicos a cada 30 segundos para fazer login
                      </p>
                    </div>
                  </div>

                  <Button
                    onClick={handleTwoFactorToggle}
                    variant={twoFactorEnabled ? "outline" : "default"}
                    iconName={twoFactorEnabled ? "ShieldOff" : "ShieldCheck"}
                    iconPosition="left"
                  >
                    {twoFactorEnabled ? 'Desativar 2FA' : 'Ativar 2FA'}
                  </Button>

                  {twoFactorEnabled && (
                    <div className="mt-4 p-4 bg-success/10 border border-success/20 rounded-lg">
                      <div className="flex items-center space-x-2 mb-2">
                        <Icon name="CheckCircle" size={16} className="text-success" />
                        <span className="text-sm font-medium text-success">2FA Ativo</span>
                      </div>
                      <p className="text-xs text-muted-foreground">
                        Sua conta está protegida por autenticação de dois fatores. 
                        Você precisará do código do aplicativo para fazer login.
                      </p>
                    </div>
                  )}
                </div>
              </div>

              {/* Active Sessions */}
              <div className="bg-card border border-border rounded-lg p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-medium text-foreground flex items-center">
                    <Icon name="Monitor" size={20} className="mr-2" />
                    Sessões Ativas
                  </h3>
                  
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleTerminateAllSessions}
                    iconName="LogOut"
                  >
                    Encerrar Todas
                  </Button>
                </div>

                <div className="space-y-3">
                  {sessions?.map((session) => (
                    <div 
                      key={session?.id}
                      className={`p-4 border rounded-lg ${
                        session?.current 
                          ? 'border-primary/50 bg-primary/5' :'border-border hover:border-primary/30'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="flex items-center space-x-2 mb-1">
                            <span className="font-medium text-foreground">{session?.device}</span>
                            {session?.current && (
                              <span className="px-2 py-0.5 bg-primary/20 text-primary text-xs rounded-full">
                                Sessão atual
                              </span>
                            )}
                          </div>
                          <div className="text-sm text-muted-foreground">
                            {session?.location} • {session?.lastActive} • IP: {session?.ip}
                          </div>
                        </div>
                        
                        {!session?.current && (
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleTerminateSession(session?.id)}
                            iconName="X"
                          >
                            Encerrar
                          </Button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Login History */}
              <div className="bg-card border border-border rounded-lg p-6">
                <h3 className="text-lg font-medium text-foreground mb-4 flex items-center">
                  <Icon name="History" size={20} className="mr-2" />
                  Histórico de Login
                </h3>

                <div className="space-y-3">
                  {loginHistory?.slice(0, 5)?.map((login, index) => (
                    <div key={index} className="flex items-center justify-between py-2 border-b border-border last:border-0">
                      <div className="flex items-center space-x-3">
                        <div className={`p-2 rounded-lg ${
                          login?.status === 'success' ?'bg-success/10 text-success' :'bg-error/10 text-error'
                        }`}>
                          <Icon 
                            name={login?.status === 'success' ? 'CheckCircle' : 'XCircle'} 
                            size={16} 
                          />
                        </div>
                        <div>
                          <div className="font-medium text-foreground text-sm">{login?.device}</div>
                          <div className="text-xs text-muted-foreground">
                            {login?.location} • {login?.date}
                          </div>
                        </div>
                      </div>
                      
                      <div className={`px-2 py-1 rounded-full text-xs font-medium ${
                        login?.status === 'success' ?'bg-success/10 text-success' :'bg-error/10 text-error'
                      }`}>
                        {login?.status === 'success' ? 'Sucesso' : 'Bloqueado'}
                      </div>
                    </div>
                  ))}
                </div>

                <Button
                  variant="outline"
                  size="sm"
                  className="w-full mt-4"
                  iconName="Eye"
                >
                  Ver Histórico Completo
                </Button>
              </div>

              {/* Security Tips */}
              <div className="bg-secondary/10 border border-secondary/20 rounded-lg p-4">
                <div className="flex items-start space-x-3">
                  <Icon name="Lightbulb" size={20} className="text-secondary mt-0.5" />
                  <div>
                    <h3 className="font-medium text-foreground mb-2">Dicas de Segurança</h3>
                    <ul className="space-y-1 text-sm text-muted-foreground">
                      <li>• Use senhas únicas e fortes para cada conta</li>
                      <li>• Ative a autenticação de dois fatores sempre que possível</li>
                      <li>• Faça logout em dispositivos compartilhados</li>
                      <li>• Monitore regularmente sua atividade de login</li>
                      <li>• Nunca compartilhe suas credenciais de acesso</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          );
        };

        export default SecuritySettings;