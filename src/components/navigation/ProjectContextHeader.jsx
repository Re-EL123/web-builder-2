import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useWorkflow } from '../../contexts/WorkflowContext';
import Icon from '../AppIcon';
import Button from '../ui/Button';

const ProjectContextHeader = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { workflowPhase, currentProject, hasUnsavedChanges, autoSaveStatus } = useWorkflow();
  const [showExitConfirm, setShowExitConfirm] = useState(false);

  useEffect(() => {
    const handleBeforeUnload = (e) => {
      if (hasUnsavedChanges) {
        e?.preventDefault();
        e.returnValue = '';
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => window.removeEventListener('beforeunload', handleBeforeUnload);
  }, [hasUnsavedChanges]);

  if (workflowPhase !== 'creation') {
    return null;
  }

  const isBuilder = location?.pathname === '/website-builder';
  const isPublish = location?.pathname === '/publish-website';

  const handleExit = () => {
    if (hasUnsavedChanges) {
      setShowExitConfirm(true);
    } else {
      navigate('/dashboard');
    }
  };

  const confirmExit = () => {
    setShowExitConfirm(false);
    navigate('/dashboard');
  };

  const handlePreview = () => {
    window.open('/preview', '_blank');
  };

  const handlePublish = () => {
    navigate('/publish-website');
  };

  const getStatusIcon = () => {
    switch (autoSaveStatus) {
      case 'saving':
        return <Icon name="Loader2" size={16} className="animate-spin" />;
      case 'saved':
        return <Icon name="Check" size={16} color="var(--color-success)" />;
      case 'error':
        return <Icon name="AlertCircle" size={16} color="var(--color-error)" />;
      default:
        return null;
    }
  };

  const getStatusText = () => {
    switch (autoSaveStatus) {
      case 'saving':
        return 'Saving...';
      case 'saved':
        return 'All changes saved';
      case 'error':
        return 'Save failed';
      default:
        return '';
    }
  };

  return (
    <>
      <header 
        className="fixed top-0 left-0 right-0 z-[1000] bg-card shadow-sm"
        style={{ height: 'var(--nav-height-minimal)' }}
      >
        <div className="h-full px-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              onClick={handleExit}
              className="p-2 rounded-md hover:bg-muted transition-smooth"
              aria-label="Exit builder"
            >
              <Icon name="ArrowLeft" size={20} />
            </button>

            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-primary/10 rounded-md flex items-center justify-center">
                <Icon name="Zap" size={18} color="var(--color-primary)" />
              </div>
              <div className="hidden sm:block">
                <h1 className="text-sm font-caption font-medium text-foreground">
                  {currentProject?.name || 'Untitled Project'}
                </h1>
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  {getStatusIcon()}
                  <span>{getStatusText()}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {isBuilder && (
              <>
                <Button
                  variant="ghost"
                  size="sm"
                  iconName="Eye"
                  onClick={handlePreview}
                  className="hidden sm:flex"
                >
                  Preview
                </Button>
                <Button
                  variant="default"
                  size="sm"
                  iconName="Rocket"
                  onClick={handlePublish}
                >
                  Publish
                </Button>
              </>
            )}

            {isPublish && (
              <Button
                variant="default"
                size="sm"
                iconName="Globe"
                onClick={() => {}}
              >
                Go Live
              </Button>
            )}
          </div>
        </div>
      </header>
      {showExitConfirm && (
        <div 
          className="fixed inset-0 z-[1200] flex items-center justify-center p-4"
          onClick={() => setShowExitConfirm(false)}
        >
          <div className="absolute inset-0 bg-background" aria-hidden="true" />
          
          <div 
            className="relative bg-card rounded-xl shadow-2xl max-w-md w-full p-6 space-y-4 animate-fade-in"
            onClick={(e) => e?.stopPropagation()}
          >
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-warning/10 rounded-lg flex items-center justify-center flex-shrink-0">
                <Icon name="AlertTriangle" size={24} color="var(--color-warning)" />
              </div>
              <div className="flex-1">
                <h2 className="text-lg font-heading font-semibold text-foreground mb-2">
                  Unsaved Changes
                </h2>
                <p className="text-sm text-muted-foreground">
                  You have unsaved changes. Are you sure you want to exit? Your changes will be lost.
                </p>
              </div>
            </div>

            <div className="flex gap-3 justify-end pt-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowExitConfirm(false)}
              >
                Cancel
              </Button>
              <Button
                variant="destructive"
                size="sm"
                onClick={confirmExit}
              >
                Exit Without Saving
              </Button>
            </div>
          </div>
        </div>
      )}
      <div style={{ height: 'var(--nav-height-minimal)' }} aria-hidden="true" />
    </>
  );
};

export default ProjectContextHeader;
