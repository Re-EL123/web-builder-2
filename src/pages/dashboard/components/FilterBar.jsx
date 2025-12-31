import React from 'react';
import Icon from '../../../components/AppIcon';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';

const FilterBar = ({ 
  searchQuery, 
  onSearchChange, 
  sortBy, 
  onSortChange,
  selectedCount,
  onClearSelection,
  onBulkDelete
}) => {
  const sortOptions = [
    { value: 'modified', label: 'Last Modified' },
    { value: 'created', label: 'Date Created' },
    { value: 'name', label: 'Name (A-Z)' },
    { value: 'pages', label: 'Page Count' }
  ];

  return (
    <div className="bg-card rounded-xl shadow-sm border border-border p-4 md:p-5 lg:p-6 mb-6">
      <div className="flex flex-col lg:flex-row gap-4">
        <div className="flex-1">
          <Input
            type="search"
            placeholder="Search projects..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e?.target?.value)}
            className="w-full"
          />
        </div>

        <div className="w-full lg:w-64">
          <Select
            options={sortOptions}
            value={sortBy}
            onChange={onSortChange}
            placeholder="Sort by..."
          />
        </div>
      </div>
      {selectedCount > 0 && (
        <div className="mt-4 pt-4 border-t border-border flex items-center justify-between">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Icon name="CheckSquare" size={18} />
            <span className="font-caption font-medium">
              {selectedCount} project{selectedCount > 1 ? 's' : ''} selected
            </span>
          </div>

          <div className="flex gap-2">
            <button
              onClick={onClearSelection}
              className="px-3 py-1.5 text-sm font-caption font-medium text-muted-foreground hover:text-foreground transition-smooth"
            >
              Clear
            </button>
            <button
              onClick={onBulkDelete}
              className="px-3 py-1.5 text-sm font-caption font-medium text-destructive hover:bg-destructive/10 rounded-md transition-smooth flex items-center gap-1.5"
            >
              <Icon name="Trash2" size={16} />
              Delete Selected
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default FilterBar;
