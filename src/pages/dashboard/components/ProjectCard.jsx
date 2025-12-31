import React, { useState } from 'react';
import Image from '../../../components/AppImage';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ProjectCard = ({ project, onEdit, onPreview, onDelete }) => {
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const handleDelete = () => {
    onDelete(project?.id);
    setShowDeleteConfirm(false);
  };

  const formatDate = (date) => {
    const d = new Date(date);
    return d?.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric', 
      year: 'numeric' 
    });
  };

  return (
    <>
      <div 
        className="bg-card rounded-xl shadow-sm hover:shadow-md transition-smooth overflow-hidden border border-border"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="relative aspect-[16/10] overflow-hidden bg-muted">
          <Image
            src={project?.thumbnail}
            alt={project?.thumbnailAlt}
            className="w-full h-full object-cover transition-smooth hover:scale-105"
          />
          
          {isHovered && (
            <div className="absolute inset-0 bg-background/80 flex items-center justify-center gap-2 animate-fade-in">
              <Button
                variant="default"
                size="sm"
                iconName="Edit"
                onClick={() => onEdit(project?.id)}
              >
                Edit
              </Button>
              <Button
                variant="outline"
                size="sm"
                iconName="Eye"
                onClick={() => onPreview(project?.id)}
              >
                Preview
              </Button>
            </div>
          )}

          {project?.isNew && (
            <div className="absolute top-3 right-3 bg-accent text-accent-foreground px-3 py-1 rounded-full text-xs font-caption font-medium">
              New
            </div>
          )}
        </div>

        <div className="p-4 md:p-5 lg:p-6">
          <div className="flex items-start justify-between gap-3 mb-3">
            <div className="flex-1 min-w-0">
              <h3 className="text-base md:text-lg font-heading font-semibold text-foreground mb-1 truncate">
                {project?.name}
              </h3>
              <p className="text-xs md:text-sm text-muted-foreground">
                Modified {formatDate(project?.lastModified)}
              </p>
            </div>
            
            <button
              onClick={() => setShowDeleteConfirm(true)}
              className="p-2 rounded-md hover:bg-destructive/10 transition-smooth flex-shrink-0"
              aria-label="Delete project"
            >
              <Icon name="Trash2" size={18} color="var(--color-destructive)" />
            </button>
          </div>

          <div className="flex items-center gap-4 text-xs md:text-sm text-muted-foreground">
            <div className="flex items-center gap-1.5">
              <Icon name="FileText" size={16} />
              <span>{project?.pageCount} pages</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Icon name="Calendar" size={16} />
              <span>{formatDate(project?.createdAt)}</span>
            </div>
          </div>
        </div>
      </div>
      {showDeleteConfirm && (
        <div 
          className="fixed inset-0 z-[1200] flex items-center justify-center p-4"
          onClick={() => setShowDeleteConfirm(false)}
        >
          <div className="absolute inset-0 bg-background/80" aria-hidden="true" />
          
          <div 
            className="relative bg-card rounded-xl shadow-2xl max-w-md w-full p-6 space-y-4 animate-fade-in"
            onClick={(e) => e?.stopPropagation()}
          >
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-destructive/10 rounded-lg flex items-center justify-center flex-shrink-0">
                <Icon name="AlertTriangle" size={24} color="var(--color-destructive)" />
              </div>
              <div className="flex-1">
                <h2 className="text-lg font-heading font-semibold text-foreground mb-2">
                  Delete Project
                </h2>
                <p className="text-sm text-muted-foreground">
                  Are you sure you want to delete "{project?.name}"? This action cannot be undone.
                </p>
              </div>
            </div>

            <div className="flex gap-3 justify-end pt-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowDeleteConfirm(false)}
              >
                Cancel
              </Button>
              <Button
                variant="destructive"
                size="sm"
                onClick={handleDelete}
              >
                Delete Project
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ProjectCard;
