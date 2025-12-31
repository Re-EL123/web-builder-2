import React from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const SuccessConfirmation = ({ isVisible, fileName, onClose }) => {
  const navigate = useNavigate();

  if (!isVisible) return null;

  const postDeploymentChecklist = [
    'Test all links and navigation',
    'Verify responsive design on multiple devices',
    'Check page load times and performance',
    'Validate forms and interactive elements',
    'Set up domain and SSL certificate',
    'Configure analytics and tracking',
    'Submit sitemap to search engines',
    'Monitor initial traffic and errors'
  ];

  const handleBackToDashboard = () => {
    onClose();
    navigate('/dashboard');
  };

  const handleDownloadAgain = () => {
    // Trigger download logic
    console.log('Downloading again:', fileName);
  };

  return (
    <div className="fixed inset-0 z-[1200] flex items-center justify-center p-4 bg-background/80 backdrop-blur-sm">
      <div className="bg-card rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto animate-fade-in">
        <div className="p-6 md:p-8">
          <div className="text-center mb-6">
            <div className="w-16 h-16 md:w-20 md:h-20 bg-success/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <Icon name="CheckCircle" size={40} color="var(--color-success)" />
            </div>
            <h2 className="text-2xl md:text-3xl font-heading font-semibold text-foreground mb-2">
              Export Successful!
            </h2>
            <p className="text-sm md:text-base text-muted-foreground">
              Your website has been exported and is ready for deployment
            </p>
          </div>

          <div className="bg-background rounded-lg border border-border p-4 mb-6">
            <div className="flex items-center gap-3">
              <Icon name="FileArchive" size={24} color="var(--color-primary)" />
              <div className="flex-1 min-w-0">
                <h3 className="text-sm font-caption font-medium text-foreground mb-1">
                  Downloaded File
                </h3>
                <p className="text-xs text-muted-foreground truncate">
                  {fileName}
                </p>
              </div>
              <Button
                variant="outline"
                size="sm"
                iconName="Download"
                onClick={handleDownloadAgain}
              >
                Download Again
              </Button>
            </div>
          </div>

          <div className="mb-6">
            <h3 className="text-lg font-heading font-semibold text-foreground mb-4">
              Next Steps
            </h3>
            <div className="space-y-3">
              <div className="flex items-start gap-3 p-3 bg-primary/5 rounded-lg border border-primary/20">
                <div className="w-8 h-8 bg-primary/20 rounded-md flex items-center justify-center flex-shrink-0">
                  <Icon name="Upload" size={16} color="var(--color-primary)" />
                </div>
                <div>
                  <h4 className="text-sm font-caption font-medium text-foreground mb-1">
                    1. Extract the ZIP file
                  </h4>
                  <p className="text-xs text-muted-foreground">
                    Unzip the downloaded file to access your website files
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3 bg-secondary/5 rounded-lg border border-secondary/20">
                <div className="w-8 h-8 bg-secondary/20 rounded-md flex items-center justify-center flex-shrink-0">
                  <Icon name="Server" size={16} color="var(--color-secondary)" />
                </div>
                <div>
                  <h4 className="text-sm font-caption font-medium text-foreground mb-1">
                    2. Choose a hosting provider
                  </h4>
                  <p className="text-xs text-muted-foreground">
                    Upload files to Netlify, Vercel, or any static hosting service
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3 bg-accent/5 rounded-lg border border-accent/20">
                <div className="w-8 h-8 bg-accent/20 rounded-md flex items-center justify-center flex-shrink-0">
                  <Icon name="Globe" size={16} color="var(--color-accent)" />
                </div>
                <div>
                  <h4 className="text-sm font-caption font-medium text-foreground mb-1">
                    3. Configure your domain
                  </h4>
                  <p className="text-xs text-muted-foreground">
                    Point your custom domain to your hosting provider
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="mb-6">
            <h3 className="text-lg font-heading font-semibold text-foreground mb-3">
              Post-Deployment Checklist
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              {postDeploymentChecklist?.map((item, index) => (
                <div key={index} className="flex items-start gap-2">
                  <Icon name="CheckSquare" size={16} color="var(--color-muted-foreground)" className="flex-shrink-0 mt-0.5" />
                  <span className="text-xs text-muted-foreground">
                    {item}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            <Button
              variant="outline"
              fullWidth
              iconName="ArrowLeft"
              iconPosition="left"
              onClick={handleBackToDashboard}
            >
              Back to Dashboard
            </Button>
            <Button
              variant="default"
              fullWidth
              iconName="ExternalLink"
              iconPosition="right"
              onClick={() => window.open('https://docs.netlify.com/site-deploys/create-deploys/', '_blank')}
            >
              View Deployment Guide
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SuccessConfirmation;
