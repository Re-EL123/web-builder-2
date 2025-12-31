import React, { useState } from 'react';
import Image from '../../../components/AppImage';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const TemplatePreviewModal = ({ template, onClose, onSelect }) => {
  const [currentPageIndex, setCurrentPageIndex] = useState(0);

  if (!template) return null;

  const pages = template?.previewPages || [];

  const handlePrevPage = () => {
    setCurrentPageIndex((prev) => (prev > 0 ? prev - 1 : pages?.length - 1));
  };

  const handleNextPage = () => {
    setCurrentPageIndex((prev) => (prev < pages?.length - 1 ? prev + 1 : 0));
  };

  return (
    <div 
      className="fixed inset-0 z-[1200] flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div className="absolute inset-0 bg-background/95" aria-hidden="true" />
      <div 
        className="relative bg-card rounded-xl shadow-2xl w-full max-w-6xl max-h-[90vh] overflow-hidden animate-fade-in"
        onClick={(e) => e?.stopPropagation()}
      >
        <div className="sticky top-0 bg-card border-b border-border p-4 md:p-6 flex items-center justify-between z-10">
          <div className="flex items-center gap-4 flex-1 min-w-0">
            <div className="flex-1 min-w-0">
              <h2 className="text-lg md:text-xl lg:text-2xl font-heading font-semibold text-foreground mb-1 line-clamp-1">
                {template?.name}
              </h2>
              <div className="flex items-center gap-3 flex-wrap">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-full overflow-hidden bg-muted">
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
            </div>
          </div>
          
          <button
            onClick={onClose}
            className="p-2 rounded-md hover:bg-muted transition-smooth flex-shrink-0"
            aria-label="Close preview"
          >
            <Icon name="X" size={20} />
          </button>
        </div>

        <div className="overflow-y-auto max-h-[calc(90vh-180px)]">
          <div className="relative bg-muted">
            {pages?.length > 0 && (
              <>
                <div className="relative aspect-[16/10] overflow-hidden">
                  <Image
                    src={pages?.[currentPageIndex]?.image}
                    alt={pages?.[currentPageIndex]?.imageAlt}
                    className="w-full h-full object-cover"
                  />
                </div>

                {pages?.length > 1 && (
                  <>
                    <button
                      onClick={handlePrevPage}
                      className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 md:w-12 md:h-12 bg-card/90 hover:bg-card rounded-full flex items-center justify-center transition-smooth shadow-lg"
                      aria-label="Previous page"
                    >
                      <Icon name="ChevronLeft" size={20} />
                    </button>
                    <button
                      onClick={handleNextPage}
                      className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 md:w-12 md:h-12 bg-card/90 hover:bg-card rounded-full flex items-center justify-center transition-smooth shadow-lg"
                      aria-label="Next page"
                    >
                      <Icon name="ChevronRight" size={20} />
                    </button>

                    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-card/90 px-3 py-2 rounded-full">
                      <span className="text-xs md:text-sm font-caption font-medium">
                        {currentPageIndex + 1} / {pages?.length}
                      </span>
                    </div>
                  </>
                )}
              </>
            )}
          </div>

          <div className="p-4 md:p-6 lg:p-8">
            <div className="mb-6">
              <h3 className="text-base md:text-lg font-heading font-semibold text-foreground mb-2">
                Description
              </h3>
              <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
                {template?.fullDescription}
              </p>
            </div>

            <div className="mb-6">
              <h3 className="text-base md:text-lg font-heading font-semibold text-foreground mb-3">
                Features
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {template?.features?.map((feature, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <div className="w-5 h-5 bg-success/10 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Icon name="Check" size={14} color="var(--color-success)" />
                    </div>
                    <span className="text-sm md:text-base text-foreground">{feature}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex flex-wrap gap-2">
              <span className="inline-flex items-center gap-1 px-3 py-1.5 bg-primary/10 text-primary rounded-md text-xs md:text-sm font-caption">
                <Icon name="Tag" size={14} />
                {template?.category}
              </span>
              {template?.industry && (
                <span className="inline-flex items-center gap-1 px-3 py-1.5 bg-secondary/10 text-secondary rounded-md text-xs md:text-sm font-caption">
                  <Icon name="Briefcase" size={14} />
                  {template?.industry}
                </span>
              )}
              {template?.isPremium && (
                <span className="inline-flex items-center gap-1 px-3 py-1.5 bg-accent/10 text-accent rounded-md text-xs md:text-sm font-caption">
                  <Icon name="Crown" size={14} />
                  Premium
                </span>
              )}
            </div>
          </div>
        </div>

        <div className="sticky bottom-0 bg-card border-t border-border p-4 md:p-6 flex items-center justify-between gap-4">
          <div className="hidden md:block">
            <p className="text-sm text-muted-foreground">
              Ready to start building with this template?
            </p>
          </div>
          <div className="flex items-center gap-3 w-full md:w-auto">
            <Button
              variant="outline"
              onClick={onClose}
              className="flex-1 md:flex-none"
            >
              Cancel
            </Button>
            <Button
              variant="default"
              iconName="Plus"
              onClick={() => onSelect(template)}
              className="flex-1 md:flex-none"
            >
              Use This Template
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TemplatePreviewModal;
