import React from 'react';
import { Link } from 'react-router-dom';
import AuthenticationFlowContainer from '../../components/navigation/AuthenticationFlowContainer';
import RegistrationForm from './components/RegistrationForm';
import TrustSignals from './components/TrustSignals';
import SocialRegistration from './components/SocialRegistration';
import Icon from '../../components/AppIcon';

const Register = () => {
  return (
    <AuthenticationFlowContainer>
      <div className="min-h-screen bg-background">
        <div className="max-w-7xl mx-auto px-4 py-8 md:py-12 lg:py-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
            <div className="order-2 lg:order-1">
              <div className="lg:sticky lg:top-8">
                <div className="mb-6 md:mb-8">
                  <h2 className="text-2xl md:text-3xl lg:text-4xl font-heading font-semibold text-foreground mb-3 md:mb-4">
                    Start Building Today
                  </h2>
                  <p className="text-sm md:text-base lg:text-lg text-muted-foreground">
                    Create professional websites without any coding knowledge. Join thousands of users who trust Web Ready Builder.
                  </p>
                </div>

                <div className="hidden lg:block">
                  <TrustSignals />
                </div>

                <div className="mt-6 md:mt-8 p-4 md:p-6 bg-accent/5 border border-accent/20 rounded-lg">
                  <div className="flex items-start gap-3 md:gap-4">
                    <div className="w-10 h-10 md:w-12 md:h-12 bg-accent/10 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Icon name="Sparkles" size={20} color="var(--color-accent)" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-base md:text-lg font-caption font-semibold text-foreground mb-2">
                        What You'll Get
                      </h3>
                      <ul className="space-y-2">
                        {[
                          'Drag-and-drop website builder',
                          'Professional templates library',
                          'Up to 10 pages per project',
                          'Mobile-responsive designs',
                          'One-click deployment',
                          'Template marketplace access'
                        ]?.map((feature, index) => (
                          <li key={index} className="flex items-center gap-2 text-xs md:text-sm text-muted-foreground">
                            <Icon name="Check" size={16} color="var(--color-success)" />
                            <span>{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="order-1 lg:order-2">
              <div className="bg-card rounded-xl shadow-lg p-6 md:p-8">
                <div className="mb-6 md:mb-8">
                  <h1 className="text-xl md:text-2xl lg:text-3xl font-heading font-semibold text-foreground mb-2">
                    Create Your Account
                  </h1>
                  <p className="text-sm md:text-base text-muted-foreground">
                    Get started with your free account in minutes
                  </p>
                </div>

                <RegistrationForm />

                <div className="mt-6">
                  <SocialRegistration />
                </div>

                <div className="mt-6 pt-6 border-t border-border text-center">
                  <p className="text-sm md:text-base text-muted-foreground">
                    Already have an account?{' '}
                    <Link 
                      to="/login" 
                      className="text-primary hover:underline font-caption font-medium transition-smooth"
                    >
                      Sign in here
                    </Link>
                  </p>
                </div>

                <div className="mt-6 flex items-center justify-center gap-4 text-xs text-muted-foreground">
                  <div className="flex items-center gap-1.5">
                    <Icon name="Shield" size={14} color="var(--color-success)" />
                    <span>SSL Secured</span>
                  </div>
                  <div className="w-1 h-1 bg-muted-foreground rounded-full"></div>
                  <div className="flex items-center gap-1.5">
                    <Icon name="Lock" size={14} color="var(--color-success)" />
                    <span>GDPR Compliant</span>
                  </div>
                </div>
              </div>

              <div className="lg:hidden mt-6 md:mt-8">
                <TrustSignals />
              </div>
            </div>
          </div>
        </div>
      </div>
    </AuthenticationFlowContainer>
  );
};

export default Register;
