import React, { useState } from 'react';
import Image from '../../../components/AppImage';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const TemplateCard = ({ template, onPreview, onSelect }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="group relative bg-card rounded-xl shadow-sm hover:shadow-lg transition-smooth overflow-hidden"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative aspect-[4/3] overflow-hidden bg-muted">
        <Image
          src={template?.thumbnail}
          alt={template?.thumbnailAlt}
          className="w-full h-full object-cover transition-smooth group-hover:scale-105"
        />
        
        {template?.isPremium && (
          <div className="absolute top-3 right-3 bg-accent text-accent-foreground px-3 py-1 rounded-full text-xs font-caption font-medium flex items-center gap-1">
            <Icon name="Crown" size={14} />
            <span>Premium</span>
          </div>
        )}

        {template?.isFeatured && (
          <div className="absolute top-3 left-3 bg-primary text-primary-foreground px-3 py-1 rounded-full text-xs font-caption font-medium flex items-center gap-1">
            <Icon name="Star" size={14} />
            <span>Featured</span>
          </div>
        )}

        {isHovered && (
          <div className="absolute inset-0 bg-background/90 flex items-center justify-center gap-3 animate-fade-in">
            <Button
              variant="default"
              size="sm"
              iconName="Eye"
              onClick={() => onPreview(template)}
            >
              Preview
            </Button>
            <Button
              variant="outline"
              size="sm"
              iconName="Plus"
              onClick={() => onSelect(template)}
            >
              Use Template
            </Button>
          </div>
        )}
      </div>
      <div className="p-4 md:p-5 lg:p-6">
        <div className="flex items-start justify-between gap-3 mb-3">
          <div className="flex-1 min-w-0">
            <h3 className="text-base md:text-lg font-heading font-semibold text-foreground mb-1 line-clamp-1">
              {template?.name}
            </h3>
            <p className="text-xs md:text-sm text-muted-foreground line-clamp-2">
              {template?.description}
            </p>
          </div>
        </div>

        <div className="flex items-center justify-between gap-3 mb-3">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 md:w-8 md:h-8 rounded-full overflow-hidden bg-muted flex-shrink-0">
              <Image
                src={template?.creatorAvatar}
                alt={template?.creatorAvatarAlt}
                className="w-full h-full object-cover"
              />
            </div>
            <span className="text-xs md:text-sm text-muted-foreground font-caption">
              {template?.creatorName}
            </span>
          </div>

          <div className="flex items-center gap-1 text-warning">
            <Icon name="Star" size={14} className="fill-current" />
            <span className="text-xs md:text-sm font-medium">{template?.rating}</span>
          </div>
        </div>

        <div className="flex flex-wrap gap-2">
          <span className="inline-flex items-center gap-1 px-2 py-1 bg-primary/10 text-primary rounded-md text-xs font-caption">
            <Icon name="Tag" size={12} />
            {template?.category}
          </span>
          {template?.industry && (
            <span className="inline-flex items-center gap-1 px-2 py-1 bg-secondary/10 text-secondary rounded-md text-xs font-caption">
              <Icon name="Briefcase" size={12} />
              {template?.industry}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default TemplateCard;
