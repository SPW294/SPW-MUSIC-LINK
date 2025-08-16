import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Icon from '../AppIcon';
import Button from './Button';

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const location = useLocation();

  const navigationItems = [
    { label: 'Dashboard', path: '/dashboard', icon: 'LayoutDashboard' },
    { label: 'Upload', path: '/music-upload', icon: 'Upload' },
    { label: 'Releases', path: '/release-management', icon: 'Music' },
    { label: 'Analytics', path: '/analytics-dashboard', icon: 'BarChart3' },
    { label: 'Revenue', path: '/revenue-management', icon: 'DollarSign' },
  ];

  const isActivePath = (path) => location?.pathname === path;

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const toggleUserMenu = () => {
    setIsUserMenuOpen(!isUserMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  const handleLogout = () => {
    localStorage.removeItem('spw_user_session');
    window.location.href = '/login';
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background border-b border-border">
      <div className="flex items-center justify-between h-16 px-4 lg:px-6">
        {/* Logo */}
        <Link to="/dashboard" className="flex items-center space-x-2">
          <div className="flex items-center justify-center w-8 h-8 bg-primary rounded-lg">
            <Icon name="Music" size={20} color="white" />
          </div>
          <span className="text-xl font-semibold text-foreground">SPW Music Link</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-1">
          {navigationItems?.map((item) => (
            <Link
              key={item?.path}
              to={item?.path}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                isActivePath(item?.path)
                  ? 'bg-primary text-primary-foreground shadow-soft-sm'
                  : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
              }`}
            >
              <Icon name={item?.icon} size={16} />
              <span>{item?.label}</span>
            </Link>
          ))}
        </nav>

        {/* User Menu */}
        <div className="flex items-center space-x-4">
          {/* Desktop User Menu */}
          <div className="hidden md:block relative">
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleUserMenu}
              className="flex items-center space-x-2"
            >
              <div className="w-8 h-8 bg-secondary rounded-full flex items-center justify-center">
                <Icon name="User" size={16} color="white" />
              </div>
              <Icon name="ChevronDown" size={16} />
            </Button>

            {isUserMenuOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-popover border border-border rounded-lg shadow-soft-lg z-50">
                <div className="py-1">
                  <Link
                    to="/profile-management"
                    className="flex items-center space-x-2 px-4 py-2 text-sm text-popover-foreground hover:bg-muted/50"
                    onClick={() => setIsUserMenuOpen(false)}
                  >
                    <Icon name="User" size={16} />
                    <span>Perfil</span>
                  </Link>
                  <Link
                    to="/profile-management?tab=platform"
                    className="flex items-center space-x-2 px-4 py-2 text-sm text-popover-foreground hover:bg-muted/50"
                    onClick={() => setIsUserMenuOpen(false)}
                  >
                    <Icon name="Settings" size={16} />
                    <span>Configurações</span>
                  </Link>
                  <hr className="my-1 border-border" />
                  <button
                    className="flex items-center space-x-2 w-full px-4 py-2 text-sm text-popover-foreground hover:bg-muted/50"
                    onClick={() => {
                      setIsUserMenuOpen(false);
                      handleLogout();
                    }}
                  >
                    <Icon name="LogOut" size={16} />
                    <span>Sair</span>
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="sm"
            onClick={toggleMobileMenu}
            className="md:hidden"
          >
            <Icon name={isMobileMenuOpen ? "X" : "Menu"} size={20} />
          </Button>
        </div>
      </div>
      {/* Mobile Navigation Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-background border-t border-border">
          <nav className="px-4 py-4 space-y-2">
            {navigationItems?.map((item) => (
              <Link
                key={item?.path}
                to={item?.path}
                onClick={closeMobileMenu}
                className={`flex items-center space-x-3 px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200 ${
                  isActivePath(item?.path)
                    ? 'bg-primary text-primary-foreground shadow-soft-sm'
                    : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
                }`}
              >
                <Icon name={item?.icon} size={18} />
                <span>{item?.label}</span>
              </Link>
            ))}
            
            {/* Mobile User Menu Items */}
            <hr className="my-2 border-border" />
            <Link
              to="/profile-management"
              onClick={closeMobileMenu}
              className="flex items-center space-x-3 px-4 py-3 rounded-lg text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted/50"
            >
              <Icon name="User" size={18} />
              <span>Perfil</span>
            </Link>
            <Link
              to="/profile-management?tab=platform"
              onClick={closeMobileMenu}
              className="flex items-center space-x-3 px-4 py-3 rounded-lg text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted/50"
            >
              <Icon name="Settings" size={18} />
              <span>Configurações</span>
            </Link>
            <button
              onClick={() => {
                closeMobileMenu();
                handleLogout();
              }}
              className="flex items-center space-x-3 w-full px-4 py-3 rounded-lg text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted/50"
            >
              <Icon name="LogOut" size={18} />
              <span>Sair</span>
            </button>
          </nav>
        </div>
      )}
      {/* Overlay for mobile menu */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black/20 z-40 md:hidden"
          onClick={closeMobileMenu}
        />
      )}
      {/* Overlay for user menu */}
      {isUserMenuOpen && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => setIsUserMenuOpen(false)}
        />
      )}
    </header>
  );
};

export default Header;