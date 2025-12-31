import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useWorkflow } from '../../contexts/WorkflowContext';
import Icon from '../AppIcon';
import Button from '../ui/Button';

const AdaptiveNavigationBar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { workflowPhase, isMobileMenuOpen, toggleMobileMenu, setIsMobileMenuOpen } = useWorkflow();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMobileMenuOpen]);

  if (workflowPhase === 'authentication') {
    return null;
  }

  const navigationItems = [
    { label: 'My Projects', path: '/dashboard', icon: 'LayoutDashboard' },
    { label: 'Browse Templates', path: '/template-marketplace', icon: 'Store' },
  ];

  const isActive = (path) => location?.pathname === path;

  const handleNavigation = (path) => {
    navigate(path);
    setIsMobileMenuOpen(false);
  };

  const handleLogout = () => {
    navigate('/login');
    setIsMobileMenuOpen(false);
  };

  if (workflowPhase === 'creation') {
    return null;
  }

  return (
    <>
      <nav 
        className={`fixed top-0 left-0 right-0 z-[1000] bg-card transition-smooth ${
          scrolled ? 'shadow-md' : 'shadow-sm'
        }`}
        style={{ height: 'var(--nav-height)' }}
      >
        <div className="max-w-7xl mx-auto px-4 h-full">
          <div className="flex items-center justify-between h-full">
            <div className="flex items-center gap-8">
              <Link 
                to="/dashboard" 
                className="flex items-center gap-3 transition-smooth hover-lift"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                  <Icon name="Zap" size={24} color="var(--color-primary)" />
                </div>
                <span className="text-xl font-heading font-semibold text-foreground">
                  Web Ready Builder
                </span>
              </Link>

              <div className="hidden md:flex items-center gap-2">
                {navigationItems?.map((item) => (
                  <button
                    key={item?.path}
                    onClick={() => handleNavigation(item?.path)}
                    className={`flex items-center gap-2 px-4 py-2 rounded-md transition-smooth font-caption ${
                      isActive(item?.path)
                        ? 'bg-primary text-primary-foreground'
                        : 'text-muted-foreground hover:bg-muted hover:text-foreground'
                    }`}
                  >
                    <Icon name={item?.icon} size={18} />
                    <span className="font-medium">{item?.label}</span>
                  </button>
                ))}
              </div>
            </div>

            <div className="hidden md:flex items-center gap-3">
              <Button
                variant="ghost"
                size="sm"
                iconName="HelpCircle"
                onClick={() => {}}
              >
                Help
              </Button>
              <Button
                variant="outline"
                size="sm"
                iconName="LogOut"
                onClick={handleLogout}
              >
                Logout
              </Button>
            </div>

            <button
              onClick={toggleMobileMenu}
              className="md:hidden p-2 rounded-md hover:bg-muted transition-smooth"
              aria-label="Toggle menu"
            >
              <Icon name={isMobileMenuOpen ? 'X' : 'Menu'} size={24} />
            </button>
          </div>
        </div>
      </nav>
      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 z-[1100] md:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        >
          <div 
            className="absolute inset-0 bg-background"
            aria-hidden="true"
          />
          
          <div 
            className="absolute top-nav right-0 bottom-0 left-0 bg-card overflow-y-auto animate-slide-in"
            onClick={(e) => e?.stopPropagation()}
          >
            <div className="p-6 space-y-6">
              <div className="space-y-2">
                {navigationItems?.map((item) => (
                  <button
                    key={item?.path}
                    onClick={() => handleNavigation(item?.path)}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-md transition-smooth font-caption ${
                      isActive(item?.path)
                        ? 'bg-primary text-primary-foreground'
                        : 'text-muted-foreground hover:bg-muted hover:text-foreground'
                    }`}
                  >
                    <Icon name={item?.icon} size={20} />
                    <span className="font-medium">{item?.label}</span>
                  </button>
                ))}
              </div>

              <div className="pt-6 border-t border-border space-y-2">
                <Button
                  variant="ghost"
                  fullWidth
                  iconName="HelpCircle"
                  iconPosition="left"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Help
                </Button>
                <Button
                  variant="outline"
                  fullWidth
                  iconName="LogOut"
                  iconPosition="left"
                  onClick={handleLogout}
                >
                  Logout
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
      <div style={{ height: 'var(--nav-height)' }} aria-hidden="true" />
    </>
  );
};

export default AdaptiveNavigationBar;
