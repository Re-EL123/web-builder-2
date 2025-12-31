import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const BuilderToolbar = ({ 
  viewportMode, 
  onViewportChange, 
  canUndo, 
  canRedo, 
  onUndo, 
  onRedo,
  onPreview,
  onSave,
  autoSaveStatus 
}) => {
  const viewportModes = [
    { id: 'desktop', icon: 'Monitor', label: 'Desktop' },
    { id: 'tablet', icon: 'Tablet', label: 'Tablet' },
    { id: 'mobile', icon: 'Smartphone', label: 'Mobile' }
  ];

  const getAutoSaveIcon = () => {
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

  const getAutoSaveText = () => {
    switch (autoSaveStatus) {
      case 'saving':
        return 'Saving...';
      case 'saved':
        return 'Saved';
      case 'error':
        return 'Error';
      default:
        return '';
    }
  };

  return (
    <div className="bg-card border-b border-border">
      <div className="max-w-7xl mx-auto px-4 py-3">
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="sm"
              iconName="Undo"
              onClick={onUndo}
              disabled={!canUndo}
              title="Undo"
            />
            <Button
              variant="ghost"
              size="sm"
              iconName="Redo"
              onClick={onRedo}
              disabled={!canRedo}
              title="Redo"
            />
            <div className="w-px h-6 bg-border mx-2" />
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              {getAutoSaveIcon()}
              <span className="hidden sm:inline">{getAutoSaveText()}</span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <div className="hidden md:flex items-center gap-1 bg-muted rounded-md p-1">
              {viewportModes?.map(mode => (
                <button
                  key={mode?.id}
                  onClick={() => onViewportChange(mode?.id)}
                  className={`flex items-center gap-2 px-3 py-1.5 rounded transition-smooth ${
                    viewportMode === mode?.id
                      ? 'bg-background text-foreground shadow-sm'
                      : 'text-muted-foreground hover:text-foreground'
                  }`}
                  title={mode?.label}
                >
                  <Icon name={mode?.icon} size={16} />
                  <span className="text-xs font-caption font-medium hidden lg:inline">
                    {mode?.label}
                  </span>
                </button>
              ))}
            </div>

            <div className="w-px h-6 bg-border mx-2 hidden md:block" />

            <Button
              variant="ghost"
              size="sm"
              iconName="Eye"
              onClick={onPreview}
              className="hidden sm:flex"
            >
              Preview
            </Button>

            <Button
              variant="default"
              size="sm"
              iconName="Save"
              iconPosition="left"
              onClick={onSave}
            >
              Save
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BuilderToolbar;
