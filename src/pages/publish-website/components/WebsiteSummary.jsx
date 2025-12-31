import React from 'react';
import Icon from '../../../components/AppIcon';

const WebsiteSummary = ({ projectData }) => {
  const summaryItems = [
    {
      icon: 'FileText',
      label: 'Project Name',
      value: projectData?.name,
      color: 'var(--color-primary)'
    },
    {
      icon: 'Layout',
      label: 'Total Pages',
      value: `${projectData?.pageCount} pages`,
      color: 'var(--color-secondary)'
    },
    {
      icon: 'HardDrive',
      label: 'Estimated Size',
      value: projectData?.estimatedSize,
      color: 'var(--color-accent)'
    },
    {
      icon: 'CheckCircle',
      label: 'Status',
      value: projectData?.status,
      color: projectData?.status === 'Ready to Deploy' ? 'var(--color-success)' : 'var(--color-warning)'
    }
  ];

  return (
    <div className="bg-card rounded-xl shadow-sm border border-border p-4 md:p-6 lg:p-8">
      <div className="flex items-center gap-3 mb-4 md:mb-6">
        <div className="w-10 h-10 md:w-12 md:h-12 bg-primary/10 rounded-lg flex items-center justify-center">
          <Icon name="Globe" size={24} color="var(--color-primary)" />
        </div>
        <div>
          <h2 className="text-xl md:text-2xl lg:text-3xl font-heading font-semibold text-foreground">
            Website Summary
          </h2>
          <p className="text-xs md:text-sm text-muted-foreground">
            Overview of your website project
          </p>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
        {summaryItems?.map((item, index) => (
          <div
            key={index}
            className="p-4 rounded-lg bg-background border border-border hover:border-primary/30 transition-smooth"
          >
            <div className="flex items-center gap-3 mb-2">
              <div className="w-8 h-8 rounded-md flex items-center justify-center" style={{ backgroundColor: `${item?.color}15` }}>
                <Icon name={item?.icon} size={18} color={item?.color} />
              </div>
              <span className="text-xs md:text-sm text-muted-foreground font-caption">
                {item?.label}
              </span>
            </div>
            <p className="text-base md:text-lg font-caption font-medium text-foreground ml-11">
              {item?.value}
            </p>
          </div>
        ))}
      </div>
      <div className="mt-6 p-4 bg-primary/5 rounded-lg border border-primary/20">
        <div className="flex items-start gap-3">
          <Icon name="Info" size={20} color="var(--color-primary)" className="flex-shrink-0 mt-0.5" />
          <div>
            <h3 className="text-sm md:text-base font-caption font-medium text-foreground mb-1">
              Deployment Information
            </h3>
            <p className="text-xs md:text-sm text-muted-foreground">
              Your website will be exported as a ZIP file containing all HTML, CSS, JavaScript, and assets. The file structure is optimized for deployment to any static hosting service.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WebsiteSummary;
