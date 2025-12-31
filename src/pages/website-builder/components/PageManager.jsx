import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';


const PageManager = ({ pages, currentPage, onPageChange, onPageAdd, onPageDelete, onPageRename }) => {
  const [isAddingPage, setIsAddingPage] = useState(false);
  const [newPageName, setNewPageName] = useState('');
  const [editingPageId, setEditingPageId] = useState(null);
  const [editPageName, setEditPageName] = useState('');

  const handleAddPage = () => {
    if (newPageName?.trim() && pages?.length < 10) {
      onPageAdd(newPageName?.trim());
      setNewPageName('');
      setIsAddingPage(false);
    }
  };

  const handleStartEdit = (page) => {
    setEditingPageId(page?.id);
    setEditPageName(page?.name);
  };

  const handleSaveEdit = () => {
    if (editPageName?.trim()) {
      onPageRename(editingPageId, editPageName?.trim());
      setEditingPageId(null);
      setEditPageName('');
    }
  };

  const handleCancelEdit = () => {
    setEditingPageId(null);
    setEditPageName('');
  };

  return (
    <div className="bg-card border-b border-border">
      <div className="max-w-7xl mx-auto px-4 py-3">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-sm font-caption font-medium text-foreground">
            Pages ({pages?.length}/10)
          </h3>
          {pages?.length < 10 && !isAddingPage && (
            <Button
              variant="ghost"
              size="sm"
              iconName="Plus"
              iconPosition="left"
              onClick={() => setIsAddingPage(true)}
            >
              Add Page
            </Button>
          )}
        </div>

        <div className="flex items-center gap-2 overflow-x-auto pb-2">
          {pages?.map(page => (
            <div
              key={page?.id}
              className={`flex items-center gap-2 px-3 py-2 rounded-md border transition-smooth flex-shrink-0 ${
                currentPage?.id === page?.id
                  ? 'bg-primary text-primary-foreground border-primary'
                  : 'bg-background text-foreground border-border hover:border-primary/50'
              }`}
            >
              {editingPageId === page?.id ? (
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    value={editPageName}
                    onChange={(e) => setEditPageName(e?.target?.value)}
                    onKeyDown={(e) => {
                      if (e?.key === 'Enter') handleSaveEdit();
                      if (e?.key === 'Escape') handleCancelEdit();
                    }}
                    className="w-32 px-2 py-1 bg-background border border-input rounded text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                    autoFocus
                  />
                  <button
                    onClick={handleSaveEdit}
                    className="p-1 hover:bg-primary-foreground/20 rounded transition-smooth"
                  >
                    <Icon name="Check" size={16} />
                  </button>
                  <button
                    onClick={handleCancelEdit}
                    className="p-1 hover:bg-primary-foreground/20 rounded transition-smooth"
                  >
                    <Icon name="X" size={16} />
                  </button>
                </div>
              ) : (
                <>
                  <button
                    onClick={() => onPageChange(page)}
                    className="flex items-center gap-2 text-sm font-caption font-medium"
                  >
                    <Icon name="FileText" size={16} />
                    <span>{page?.name}</span>
                  </button>
                  <div className="flex items-center gap-1 ml-2">
                    <button
                      onClick={() => handleStartEdit(page)}
                      className="p-1 hover:bg-primary-foreground/20 rounded transition-smooth"
                      title="Rename page"
                    >
                      <Icon name="Edit2" size={14} />
                    </button>
                    {pages?.length > 1 && (
                      <button
                        onClick={() => onPageDelete(page?.id)}
                        className="p-1 hover:bg-destructive/20 rounded transition-smooth"
                        title="Delete page"
                      >
                        <Icon name="Trash2" size={14} />
                      </button>
                    )}
                  </div>
                </>
              )}
            </div>
          ))}

          {isAddingPage && (
            <div className="flex items-center gap-2 px-3 py-2 rounded-md border border-primary bg-background flex-shrink-0">
              <input
                type="text"
                value={newPageName}
                onChange={(e) => setNewPageName(e?.target?.value)}
                onKeyDown={(e) => {
                  if (e?.key === 'Enter') handleAddPage();
                  if (e?.key === 'Escape') {
                    setIsAddingPage(false);
                    setNewPageName('');
                  }
                }}
                placeholder="Page name"
                className="w-32 px-2 py-1 bg-background border border-input rounded text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                autoFocus
              />
              <button
                onClick={handleAddPage}
                className="p-1 hover:bg-muted rounded transition-smooth"
              >
                <Icon name="Check" size={16} color="var(--color-success)" />
              </button>
              <button
                onClick={() => {
                  setIsAddingPage(false);
                  setNewPageName('');
                }}
                className="p-1 hover:bg-muted rounded transition-smooth"
              >
                <Icon name="X" size={16} color="var(--color-error)" />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PageManager;
