import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useWorkflow } from '../../contexts/WorkflowContext';
import ProjectContextHeader from '../../components/navigation/ProjectContextHeader';
import PublishingChecklist from './components/PublishingChecklist';
import WebsiteSummary from './components/WebsiteSummary';
import PublishingOptions from './components/PublishingOptions';
import HostingRecommendations from './components/HostingRecommendations';
import ExportProgress from './components/ExportProgress';
import SuccessConfirmation from './components/SuccessConfirmation';
import Button from '../../components/ui/Button';
import Icon from '../../components/AppIcon';

const PublishWebsite = () => {
  const navigate = useNavigate();
  const { currentProject, updateProject } = useWorkflow();
  const [checklistComplete, setChecklistComplete] = useState(false);
  const [publishingOptions, setPublishingOptions] = useState(null);
  const [isExporting, setIsExporting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [exportedFileName, setExportedFileName] = useState('');

  const mockProjectData = {
    name: currentProject?.name || 'My Professional Website',
    pageCount: 7,
    estimatedSize: '2.4 MB',
    status: 'Ready to Deploy',
    lastModified: new Date(2025, 11, 30, 14, 30)
  };

  useEffect(() => {
    if (!currentProject) {
      updateProject(mockProjectData);
    }
  }, [currentProject, updateProject]);

  const handleChecklistComplete = (isComplete) => {
    setChecklistComplete(isComplete);
  };

  const handleOptionsChange = (options) => {
    setPublishingOptions(options);
  };

  const handleExport = () => {
    setIsExporting(true);
  };

  const handleExportComplete = () => {
    setIsExporting(false);
    const fileName = `${publishingOptions?.siteName || 'website'}-${Date.now()}.zip`;
    setExportedFileName(fileName);
    setShowSuccess(true);
  };

  const handlePreview = () => {
    window.open('/preview', '_blank');
  };

  const handleBackToBuilder = () => {
    navigate('/website-builder');
  };

  return (
    <>
      <ProjectContextHeader />
      
      <div className="min-h-screen bg-background">
        <div className="max-w-7xl mx-auto px-4 py-6 md:py-8 lg:py-12">
          <div className="mb-6 md:mb-8">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-4">
              <div>
                <h1 className="text-2xl md:text-3xl lg:text-4xl font-heading font-bold text-foreground mb-2">
                  Publish Your Website
                </h1>
                <p className="text-sm md:text-base text-muted-foreground">
                  Complete the checklist and configure settings to export your website
                </p>
              </div>
              <div className="flex items-center gap-3">
                <Button
                  variant="outline"
                  size="sm"
                  iconName="Eye"
                  onClick={handlePreview}
                >
                  Preview
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  iconName="ArrowLeft"
                  onClick={handleBackToBuilder}
                >
                  Back to Editor
                </Button>
              </div>
            </div>

            <div className="flex items-center gap-2 p-3 bg-primary/5 rounded-lg border border-primary/20">
              <Icon name="Info" size={18} color="var(--color-primary)" />
              <p className="text-xs md:text-sm text-muted-foreground">
                Your website will be exported as a ZIP file containing all necessary files for deployment to any static hosting service.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8 mb-6 md:mb-8">
            <div className="lg:col-span-2 space-y-6 md:space-y-8">
              <PublishingChecklist onChecklistComplete={handleChecklistComplete} />
              <PublishingOptions onOptionsChange={handleOptionsChange} />
              <HostingRecommendations />
            </div>

            <div className="space-y-6 md:space-y-8">
              <WebsiteSummary projectData={mockProjectData} />

              <div className="bg-card rounded-xl shadow-sm border border-border p-4 md:p-6 sticky top-20">
                <h3 className="text-lg font-heading font-semibold text-foreground mb-4">
                  Ready to Export?
                </h3>
                
                <div className="space-y-3 mb-4">
                  <div className="flex items-center justify-between p-3 bg-background rounded-lg">
                    <span className="text-sm text-muted-foreground">
                      Checklist Status
                    </span>
                    <div className="flex items-center gap-2">
                      {checklistComplete ? (
                        <>
                          <Icon name="CheckCircle" size={16} color="var(--color-success)" />
                          <span className="text-sm font-caption font-medium text-success">
                            Complete
                          </span>
                        </>
                      ) : (
                        <>
                          <Icon name="AlertCircle" size={16} color="var(--color-warning)" />
                          <span className="text-sm font-caption font-medium text-warning">
                            Incomplete
                          </span>
                        </>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center justify-between p-3 bg-background rounded-lg">
                    <span className="text-sm text-muted-foreground">
                      Export Format
                    </span>
                    <span className="text-sm font-caption font-medium text-foreground">
                      {publishingOptions?.exportFormat?.toUpperCase() || 'ZIP'}
                    </span>
                  </div>
                </div>

                <Button
                  variant="default"
                  fullWidth
                  iconName="Download"
                  iconPosition="left"
                  disabled={!checklistComplete}
                  onClick={handleExport}
                  className="mb-3"
                >
                  Export Website
                </Button>

                {!checklistComplete && (
                  <p className="text-xs text-center text-muted-foreground">
                    Complete all required checklist items to enable export
                  </p>
                )}
              </div>
            </div>
          </div>

          <div className="bg-card rounded-xl shadow-sm border border-border p-4 md:p-6 lg:p-8">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 md:w-12 md:h-12 bg-accent/10 rounded-lg flex items-center justify-center flex-shrink-0">
                <Icon name="Rocket" size={24} color="var(--color-accent)" />
              </div>
              <div className="flex-1">
                <h3 className="text-lg md:text-xl font-heading font-semibold text-foreground mb-2">
                  Deployment Instructions
                </h3>
                <div className="space-y-3 text-sm md:text-base text-muted-foreground">
                  <p>
                    <strong className="text-foreground">Step 1:</strong> Extract the downloaded ZIP file to access your website files.
                  </p>
                  <p>
                    <strong className="text-foreground">Step 2:</strong> Choose a hosting provider from our recommendations above.
                  </p>
                  <p>
                    <strong className="text-foreground">Step 3:</strong> Upload the extracted files to your hosting provider's dashboard or use their CLI tools.
                  </p>
                  <p>
                    <strong className="text-foreground">Step 4:</strong> Configure your custom domain and SSL certificate through your hosting provider.
                  </p>
                  <p>
                    <strong className="text-foreground">Step 5:</strong> Test your live website and monitor performance using analytics tools.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <ExportProgress
        isExporting={isExporting}
        onComplete={handleExportComplete}
      />

      <SuccessConfirmation
        isVisible={showSuccess}
        fileName={exportedFileName}
        onClose={() => setShowSuccess(false)}
      />
    </>
  );
};

export default PublishWebsite;
