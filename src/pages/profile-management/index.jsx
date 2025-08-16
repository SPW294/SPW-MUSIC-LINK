import React, { useState, useEffect } from 'react';
        import Header from '../../components/ui/Header';
        import ProfileHeader from './components/ProfileHeader';
        import ProfileTabs from './components/ProfileTabs';
        import BasicInformation from './components/BasicInformation';
        import BusinessProfile from './components/BusinessProfile';
        import SocialMedia from './components/SocialMedia';
        import NotificationSettings from './components/NotificationSettings';
        import SecuritySettings from './components/SecuritySettings';
        import AccountVerification from './components/AccountVerification';
        import PrivacySettings from './components/PrivacySettings';
        import PlatformSettings from './components/PlatformSettings';

        const ProfileManagement = () => {
          const [activeTab, setActiveTab] = useState('basic');
          const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
          const [isAutoSaving, setIsAutoSaving] = useState(false);
          const [userProfile, setUserProfile] = useState({
            // Basic Information
            fullName: 'João Silva',
            artistName: 'DJ João',
            email: 'joao@example.com',
            phone: '+55 11 99999-9999',
            bio: 'Produtor musical especializado em música eletrônica e house music.',
            location: 'São Paulo, SP',
            birthDate: '1990-05-15',
            website: 'https://djjoao.com',
            
            // Profile Settings
            avatar: null,
            coverImage: null,
            accountType: 'artist',
            genres: ['Eletrônica', 'House', 'Techno'],
            
            // Business Information
            businessName: '',
            taxId: '',
            businessType: '',
            businessAddress: '',
            
            // Social Media
            socialLinks: {
              spotify: 'https://spotify.com/djjoao',
              instagram: '@djjoao',
              twitter: '@djjoaomusic',
              youtube: 'DJ João',
              soundcloud: 'djjoao',
              tiktok: '@djjoao',
              facebook: 'DJ João Official'
            },
            
            // Privacy Settings
            profileVisibility: 'public',
            showEmail: false,
            showPhone: false,
            allowMessages: true,
            allowCollaborations: true,
            
            // Notification Settings
            notifications: {
              emailMarketing: true,
              emailUpdates: true,
              emailPayments: true,
              emailSecurity: true,
              pushMarketing: false,
              pushUpdates: true,
              pushPayments: true,
              pushSecurity: true
            },
            
            // Platform Settings
            platformSettings: {
              defaultReleaseType: 'single',
              defaultGenre: 'Eletrônica',
              autoDistribution: false,
              qualityCheck: true,
              metadataValidation: true,
              copyrightProtection: true
            },
            
            // Verification Status
            verification: {
              email: true,
              phone: false,
              identity: false,
              business: false,
              artist: false
            }
          });

          const tabs = [
            { id: 'basic', label: 'Informações Básicas', icon: 'User' },
            { id: 'business', label: 'Perfil Empresarial', icon: 'Building' },
            { id: 'social', label: 'Redes Sociais', icon: 'Globe' },
            { id: 'privacy', label: 'Privacidade', icon: 'Lock' },
            { id: 'notifications', label: 'Notificações', icon: 'Bell' },
            { id: 'security', label: 'Segurança', icon: 'Shield' },
            { id: 'verification', label: 'Verificação', icon: 'CheckCircle' },
            { id: 'platform', label: 'Configurações', icon: 'Settings' }
          ];

          // Auto-save functionality
          useEffect(() => {
            if (hasUnsavedChanges) {
              setIsAutoSaving(true);
              const timer = setTimeout(() => {
                // Simulate API save
                console.log('Auto-saving profile changes...', userProfile);
                setHasUnsavedChanges(false);
                setIsAutoSaving(false);
              }, 2000);
              
              return () => clearTimeout(timer);
            }
          }, [hasUnsavedChanges, userProfile]);

          const updateProfile = (updates) => {
            setUserProfile(prev => ({ ...prev, ...updates }));
            setHasUnsavedChanges(true);
          };

          const renderTabContent = () => {
            switch (activeTab) {
              case 'basic':
                return (
                  <BasicInformation 
                    profile={userProfile} 
                    updateProfile={updateProfile}
                  />
                );
              case 'business':
                return (
                  <BusinessProfile 
                    profile={userProfile} 
                    updateProfile={updateProfile}
                  />
                );
              case 'social':
                return (
                  <SocialMedia 
                    profile={userProfile} 
                    updateProfile={updateProfile}
                  />
                );
              case 'privacy':
                return (
                  <PrivacySettings 
                    profile={userProfile} 
                    updateProfile={updateProfile}
                  />
                );
              case 'notifications':
                return (
                  <NotificationSettings 
                    profile={userProfile} 
                    updateProfile={updateProfile}
                  />
                );
              case 'security':
                return (
                  <SecuritySettings 
                    profile={userProfile} 
                    updateProfile={updateProfile}
                  />
                );
              case 'verification':
                return (
                  <AccountVerification 
                    profile={userProfile} 
                    updateProfile={updateProfile}
                  />
                );
              case 'platform':
                return (
                  <PlatformSettings 
                    profile={userProfile} 
                    updateProfile={updateProfile}
                  />
                );
              default:
                return null;
            }
          };

          return (
            <div className="min-h-screen bg-background">
              <Header />
              <main className="pt-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                  {/* Profile Header */}
                  <ProfileHeader 
                    profile={userProfile}
                    updateProfile={updateProfile}
                    hasUnsavedChanges={hasUnsavedChanges}
                    isAutoSaving={isAutoSaving}
                  />

                  {/* Main Content */}
                  <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                    {/* Sidebar Navigation */}
                    <div className="lg:col-span-1">
                      <ProfileTabs 
                        tabs={tabs}
                        activeTab={activeTab}
                        onTabChange={setActiveTab}
                        hasUnsavedChanges={hasUnsavedChanges}
                      />
                    </div>

                    {/* Tab Content */}
                    <div className="lg:col-span-3">
                      <div className="bg-card border border-border rounded-lg">
                        {renderTabContent()}
                      </div>
                    </div>
                  </div>
                </div>
              </main>
            </div>
          );
        };

        export default ProfileManagement;