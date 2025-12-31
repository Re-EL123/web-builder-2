import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import { Checkbox } from '../../../components/ui/Checkbox';

const PublishingChecklist = ({ onChecklistComplete }) => {
  const [checklist, setChecklist] = useState([
    {
      id: 'seo',
      title: 'SEO Optimization',
      description: 'Meta tags, descriptions, and keywords configured',
      completed: false,
      required: true
    },
    {
      id: 'responsive',
      title: 'Responsive Testing',
      description: 'Website tested across mobile, tablet, and desktop',
      completed: false,
      required: true
    },
    {
      id: 'content',
      title: 'Content Review',
      description: 'All text, images, and links verified',
      completed: false,
      required: true
    },
    {
      id: 'performance',
      title: 'Performance Check',
      description: 'Images optimized and load times acceptable',
      completed: false,
      required: false
    },
    {
      id: 'accessibility',
      title: 'Accessibility Standards',
      description: 'Alt texts, ARIA labels, and keyboard navigation',
      completed: false,
      required: false
    },
    {
      id: 'browser',
      title: 'Browser Compatibility',
      description: 'Tested in Chrome, Firefox, Safari, and Edge',
      completed: false,
      required: false
    }
  ]);

  const handleCheckboxChange = (id, checked) => {
    const updatedChecklist = checklist?.map(item =>
      item?.id === id ? { ...item, completed: checked } : item
    );
    setChecklist(updatedChecklist);

    const requiredItems = updatedChecklist?.filter(item => item?.required);
    const allRequiredComplete = requiredItems?.every(item => item?.completed);
    onChecklistComplete(allRequiredComplete);
  };

  const completedCount = checklist?.filter(item => item?.completed)?.length;
  const totalCount = checklist?.length;
  const progressPercentage = (completedCount / totalCount) * 100;

  return (
    <div className="bg-card rounded-xl shadow-sm border border-border p-4 md:p-6 lg:p-8">
      <div className="flex items-start justify-between mb-4 md:mb-6">
        <div>
          <h2 className="text-xl md:text-2xl lg:text-3xl font-heading font-semibold text-foreground mb-2">
            Pre-Launch Checklist
          </h2>
          <p className="text-sm md:text-base text-muted-foreground">
            Complete all required items before publishing
          </p>
        </div>
        <div className="text-right">
          <div className="text-2xl md:text-3xl font-heading font-bold text-primary">
            {completedCount}/{totalCount}
          </div>
          <div className="text-xs md:text-sm text-muted-foreground">
            Completed
          </div>
        </div>
      </div>
      <div className="mb-6">
        <div className="h-2 bg-muted rounded-full overflow-hidden">
          <div
            className="h-full bg-primary transition-smooth"
            style={{ width: `${progressPercentage}%` }}
          />
        </div>
      </div>
      <div className="space-y-3 md:space-y-4">
        {checklist?.map((item) => (
          <div
            key={item?.id}
            className={`p-4 rounded-lg border transition-smooth ${
              item?.completed
                ? 'bg-success/5 border-success/20' :'bg-background border-border hover:border-primary/30'
            }`}
          >
            <div className="flex items-start gap-3 md:gap-4">
              <Checkbox
                checked={item?.completed}
                onChange={(e) => handleCheckboxChange(item?.id, e?.target?.checked)}
                className="mt-1"
              />
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="text-sm md:text-base font-caption font-medium text-foreground">
                    {item?.title}
                  </h3>
                  {item?.required && (
                    <span className="px-2 py-0.5 bg-error/10 text-error text-xs rounded-md">
                      Required
                    </span>
                  )}
                  {item?.completed && (
                    <Icon name="CheckCircle2" size={16} color="var(--color-success)" />
                  )}
                </div>
                <p className="text-xs md:text-sm text-muted-foreground">
                  {item?.description}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PublishingChecklist;
