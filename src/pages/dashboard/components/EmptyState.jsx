import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const EmptyState = ({ onCreateNew, onBrowseTemplates }) => {
  return (
    <div className="flex flex-col items-center justify-center py-12 md:py-16 lg:py-20 px-4">
      <div className="w-20 h-20 md:w-24 md:h-24 bg-primary/10 rounded-2xl flex items-center justify-center mb-6">
        <Icon name="Sparkles" size={40} color="var(--color-primary)" />
      </div>

      <h2 className="text-xl md:text-2xl lg:text-3xl font-heading font-semibold text-foreground mb-3 text-center">
        Start Building Your First Website
      </h2>
      
      <p className="text-sm md:text-base text-muted-foreground mb-8 text-center max-w-md">
        Create a professional website in minutes with our drag-and-drop builder or choose from our collection of stunning templates.
      </p>

      <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
        <Button
          variant="default"
          size="lg"
          iconName="Plus"
          iconPosition="left"
          onClick={onCreateNew}
          className="w-full sm:w-auto"
        >
          Create New Website
        </Button>
        <Button
          variant="outline"
          size="lg"
          iconName="Store"
          iconPosition="left"
          onClick={onBrowseTemplates}
          className="w-full sm:w-auto"
        >
          Browse Templates
        </Button>
      </div>

      <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-3xl">
        <div className="text-center">
          <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center mx-auto mb-3">
            <Icon name="Zap" size={24} color="var(--color-accent)" />
          </div>
          <h3 className="text-sm font-caption font-medium text-foreground mb-1">
            Quick Setup
          </h3>
          <p className="text-xs text-muted-foreground">
            Launch in minutes with intuitive tools
          </p>
        </div>

        <div className="text-center">
          <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center mx-auto mb-3">
            <Icon name="Palette" size={24} color="var(--color-accent)" />
          </div>
          <h3 className="text-sm font-caption font-medium text-foreground mb-1">
            Professional Design
          </h3>
          <p className="text-xs text-muted-foreground">
            Beautiful templates ready to customize
          </p>
        </div>

        <div className="text-center">
          <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center mx-auto mb-3">
            <Icon name="Rocket" size={24} color="var(--color-accent)" />
          </div>
          <h3 className="text-sm font-caption font-medium text-foreground mb-1">
            Easy Deployment
          </h3>
          <p className="text-xs text-muted-foreground">
            Publish with one click when ready
          </p>
        </div>
      </div>
    </div>
  );
};

export default EmptyState;
