import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';

const ExportProgress = ({ isExporting, onComplete }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [progress, setProgress] = useState(0);

  const exportSteps = [
    { label: 'Preparing files', icon: 'FileText', duration: 1000 },
    { label: 'Optimizing images', icon: 'Image', duration: 1500 },
    { label: 'Bundling assets', icon: 'Package', duration: 1200 },
    { label: 'Generating HTML', icon: 'Code', duration: 800 },
    { label: 'Creating ZIP archive', icon: 'Archive', duration: 1000 },
    { label: 'Finalizing export', icon: 'CheckCircle', duration: 500 }
  ];

  useEffect(() => {
    if (!isExporting) {
      setCurrentStep(0);
      setProgress(0);
      return;
    }

    let stepIndex = 0;
    let progressValue = 0;

    const progressInterval = setInterval(() => {
      progressValue += 2;
      setProgress(Math.min(progressValue, 100));

      if (progressValue >= 100) {
        clearInterval(progressInterval);
        setTimeout(() => {
          onComplete();
        }, 500);
      }
    }, 100);

    const stepInterval = setInterval(() => {
      if (stepIndex < exportSteps?.length - 1) {
        stepIndex++;
        setCurrentStep(stepIndex);
      } else {
        clearInterval(stepInterval);
      }
    }, 1000);

    return () => {
      clearInterval(progressInterval);
      clearInterval(stepInterval);
    };
  }, [isExporting, onComplete]);

  if (!isExporting) return null;

  return (
    <div className="fixed inset-0 z-[1200] flex items-center justify-center p-4 bg-background/80 backdrop-blur-sm">
      <div className="bg-card rounded-xl shadow-2xl max-w-md w-full p-6 md:p-8 animate-fade-in">
        <div className="text-center mb-6">
          <div className="w-16 h-16 md:w-20 md:h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
            <Icon name="Loader2" size={32} color="var(--color-primary)" className="animate-spin" />
          </div>
          <h2 className="text-xl md:text-2xl font-heading font-semibold text-foreground mb-2">
            Exporting Your Website
          </h2>
          <p className="text-sm text-muted-foreground">
            Please wait while we prepare your files
          </p>
        </div>

        <div className="mb-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-caption font-medium text-foreground">
              Progress
            </span>
            <span className="text-sm font-caption font-medium text-primary">
              {Math.round(progress)}%
            </span>
          </div>
          <div className="h-2 bg-muted rounded-full overflow-hidden">
            <div
              className="h-full bg-primary transition-smooth"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        <div className="space-y-3">
          {exportSteps?.map((step, index) => (
            <div
              key={index}
              className={`flex items-center gap-3 p-3 rounded-lg transition-smooth ${
                index === currentStep
                  ? 'bg-primary/10 border border-primary/30'
                  : index < currentStep
                  ? 'bg-success/5 border border-success/20' :'bg-background border border-border'
              }`}
            >
              <div
                className={`w-8 h-8 rounded-md flex items-center justify-center ${
                  index === currentStep
                    ? 'bg-primary/20'
                    : index < currentStep
                    ? 'bg-success/20' :'bg-muted'
                }`}
              >
                {index < currentStep ? (
                  <Icon name="Check" size={16} color="var(--color-success)" />
                ) : (
                  <Icon
                    name={step?.icon}
                    size={16}
                    color={
                      index === currentStep
                        ? 'var(--color-primary)'
                        : 'var(--color-muted-foreground)'
                    }
                  />
                )}
              </div>
              <span
                className={`text-sm font-caption ${
                  index === currentStep
                    ? 'text-foreground font-medium'
                    : index < currentStep
                    ? 'text-success' :'text-muted-foreground'
                }`}
              >
                {step?.label}
              </span>
              {index === currentStep && (
                <Icon
                  name="Loader2"
                  size={14}
                  color="var(--color-primary)"
                  className="animate-spin ml-auto"
                />
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ExportProgress;
