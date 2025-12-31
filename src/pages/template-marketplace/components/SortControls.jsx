import React from 'react';
import Select from '../../../components/ui/Select';
import Button from '../../../components/ui/Button';

const SortControls = ({ sortBy, onSortChange, onToggleFilters }) => {
  const sortOptions = [
    { value: 'popular', label: 'Most Popular' },
    { value: 'newest', label: 'Newest First' },
    { value: 'rating', label: 'Highest Rated' },
    { value: 'name', label: 'Alphabetical' }
  ];

  return (
    <div className="flex items-center gap-3">
      <Button
        variant="outline"
        size="sm"
        iconName="SlidersHorizontal"
        onClick={onToggleFilters}
        className="lg:hidden"
      >
        Filters
      </Button>
      
      <div className="flex-1 md:flex-none md:w-48">
        <Select
          options={sortOptions}
          value={sortBy}
          onChange={onSortChange}
          placeholder="Sort by"
        />
      </div>
    </div>
  );
};

export default SortControls;
