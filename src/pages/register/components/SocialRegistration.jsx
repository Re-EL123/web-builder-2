import React from 'react';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const SocialRegistration = () => {
  const socialProviders = [
    {
      name: 'Google',
      icon: 'Mail',
      color: 'var(--color-error)',
      action: () => {}
    },
    {
      name: 'GitHub',
      icon: 'Github',
      color: 'var(--color-foreground)',
      action: () => {}
    }
  ];

  return (
    <div className="space-y-4">
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-border"></div>
        </div>
        <div className="relative flex justify-center text-xs md:text-sm">
          <span className="bg-card px-3 md:px-4 text-muted-foreground font-caption">
            Or continue with
          </span>
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {socialProviders?.map((provider) => (
          <Button
            key={provider?.name}
            variant="outline"
            fullWidth
            onClick={provider?.action}
            className="justify-center"
          >
            <Icon name={provider?.icon} size={18} color={provider?.color} />
            <span className="ml-2 text-sm md:text-base">{provider?.name}</span>
          </Button>
        ))}
      </div>
    </div>
  );
};

export default SocialRegistration;
