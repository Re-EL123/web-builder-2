import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Select from '../../../components/ui/Select';
import { Checkbox } from '../../../components/ui/Checkbox';

const FilterPanel = ({ 
  filters, 
  onFilterChange, 
  onClearFilters, 
  resultCount,
  isMobileFilterOpen,
  onCloseMobileFilter 
}) => {
  const categories = [
    { value: 'all', label: 'All Categories' },
    { value: 'business', label: 'Business' },
    { value: 'portfolio', label: 'Portfolio' },
    { value: 'ecommerce', label: 'E-Commerce' },
    { value: 'blog', label: 'Blog' },
    { value: 'landing', label: 'Landing Page' },
    { value: 'personal', label: 'Personal' }
  ];

  const industries = [
    { value: 'technology', label: 'Technology', checked: filters?.industries?.includes('technology') },
    { value: 'healthcare', label: 'Healthcare', checked: filters?.industries?.includes('healthcare') },
    { value: 'finance', label: 'Finance', checked: filters?.industries?.includes('finance') },
    { value: 'education', label: 'Education', checked: filters?.industries?.includes('education') },
    { value: 'retail', label: 'Retail', checked: filters?.industries?.includes('retail') },
    { value: 'creative', label: 'Creative', checked: filters?.industries?.includes('creative') }
  ];

  const colorSchemes = [
    { value: 'blue', label: 'Blue', color: '#2D5A87' },
    { value: 'green', label: 'Green', color: '#38A169' },
    { value: 'purple', label: 'Purple', color: '#805AD5' },
    { value: 'orange', label: 'Orange', color: '#E67E22' },
    { value: 'red', label: 'Red', color: '#E53E3E' },
    { value: 'neutral', label: 'Neutral', color: '#4A5568' }
  ];

  const layoutTypes = [
    { value: 'single-page', label: 'Single Page', checked: filters?.layoutTypes?.includes('single-page') },
    { value: 'multi-page', label: 'Multi Page', checked: filters?.layoutTypes?.includes('multi-page') },
    { value: 'sidebar', label: 'With Sidebar', checked: filters?.layoutTypes?.includes('sidebar') },
    { value: 'fullwidth', label: 'Full Width', checked: filters?.layoutTypes?.includes('fullwidth') }
  ];

  const handleIndustryChange = (value, checked) => {
    const newIndustries = checked
      ? [...filters?.industries, value]
      : filters?.industries?.filter(i => i !== value);
    onFilterChange({ ...filters, industries: newIndustries });
  };

  const handleLayoutChange = (value, checked) => {
    const newLayouts = checked
      ? [...filters?.layoutTypes, value]
      : filters?.layoutTypes?.filter(l => l !== value);
    onFilterChange({ ...filters, layoutTypes: newLayouts });
  };

  const handleColorSchemeToggle = (value) => {
    const newColors = filters?.colorSchemes?.includes(value)
      ? filters?.colorSchemes?.filter(c => c !== value)
      : [...filters?.colorSchemes, value];
    onFilterChange({ ...filters, colorSchemes: newColors });
  };

  const filterContent = (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-base md:text-lg font-heading font-semibold text-foreground">
            Filters
          </h3>
          <p className="text-xs md:text-sm text-muted-foreground mt-1">
            {resultCount} templates found
          </p>
        </div>
        <Button
          variant="ghost"
          size="sm"
          iconName="X"
          onClick={onClearFilters}
        >
          Clear
        </Button>
      </div>

      <div>
        <label className="block text-sm font-caption font-medium text-foreground mb-3">
          Category
        </label>
        <Select
          options={categories}
          value={filters?.category}
          onChange={(value) => onFilterChange({ ...filters, category: value })}
          placeholder="Select category"
        />
      </div>

      <div>
        <label className="block text-sm font-caption font-medium text-foreground mb-3">
          Industry
        </label>
        <div className="space-y-2">
          {industries?.map((industry) => (
            <Checkbox
              key={industry?.value}
              label={industry?.label}
              checked={industry?.checked}
              onChange={(e) => handleIndustryChange(industry?.value, e?.target?.checked)}
            />
          ))}
        </div>
      </div>

      <div>
        <label className="block text-sm font-caption font-medium text-foreground mb-3">
          Color Scheme
        </label>
        <div className="flex flex-wrap gap-2">
          {colorSchemes?.map((scheme) => (
            <button
              key={scheme?.value}
              onClick={() => handleColorSchemeToggle(scheme?.value)}
              className={`w-10 h-10 md:w-12 md:h-12 rounded-lg transition-smooth hover-lift ${
                filters?.colorSchemes?.includes(scheme?.value)
                  ? 'ring-2 ring-primary ring-offset-2' :'ring-1 ring-border'
              }`}
              style={{ backgroundColor: scheme?.color }}
              aria-label={`${scheme?.label} color scheme`}
            >
              {filters?.colorSchemes?.includes(scheme?.value) && (
                <Icon name="Check" size={16} color="#FFFFFF" className="mx-auto" />
              )}
            </button>
          ))}
        </div>
      </div>

      <div>
        <label className="block text-sm font-caption font-medium text-foreground mb-3">
          Layout Type
        </label>
        <div className="space-y-2">
          {layoutTypes?.map((layout) => (
            <Checkbox
              key={layout?.value}
              label={layout?.label}
              checked={layout?.checked}
              onChange={(e) => handleLayoutChange(layout?.value, e?.target?.checked)}
            />
          ))}
        </div>
      </div>

      <div className="pt-4 border-t border-border">
        <div className="flex items-center gap-2 mb-3">
          <Checkbox
            label="Show Premium Only"
            checked={filters?.premiumOnly}
            onChange={(e) => onFilterChange({ ...filters, premiumOnly: e?.target?.checked })}
          />
        </div>
        <div className="flex items-center gap-2">
          <Checkbox
            label="Show Featured Only"
            checked={filters?.featuredOnly}
            onChange={(e) => onFilterChange({ ...filters, featuredOnly: e?.target?.checked })}
          />
        </div>
      </div>
    </div>
  );

  return (
    <>
      <div className="hidden lg:block bg-card rounded-xl shadow-sm p-6">
        {filterContent}
      </div>
      {isMobileFilterOpen && (
        <div 
          className="fixed inset-0 z-[1100] lg:hidden"
          onClick={onCloseMobileFilter}
        >
          <div className="absolute inset-0 bg-background/80" aria-hidden="true" />
          
          <div 
            className="absolute top-0 right-0 bottom-0 w-full max-w-sm bg-card overflow-y-auto animate-slide-in"
            onClick={(e) => e?.stopPropagation()}
          >
            <div className="sticky top-0 bg-card border-b border-border p-4 flex items-center justify-between z-10">
              <h2 className="text-lg font-heading font-semibold text-foreground">
                Filters
              </h2>
              <button
                onClick={onCloseMobileFilter}
                className="p-2 rounded-md hover:bg-muted transition-smooth"
                aria-label="Close filters"
              >
                <Icon name="X" size={20} />
              </button>
            </div>
            <div className="p-6">
              {filterContent}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default FilterPanel;
