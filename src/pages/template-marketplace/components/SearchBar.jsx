import React from 'react';
import Input from '../../../components/ui/Input';
import Icon from '../../../components/AppIcon';

const SearchBar = ({ searchQuery, onSearchChange }) => {
  return (
    <div className="relative">
      <div className="absolute left-3 md:left-4 top-1/2 -translate-y-1/2 pointer-events-none">
        <Icon name="Search" size={18} color="var(--color-muted-foreground)" />
      </div>
      <Input
        type="search"
        placeholder="Search templates by name, category, or creator..."
        value={searchQuery}
        onChange={(e) => onSearchChange(e?.target?.value)}
        className="pl-10 md:pl-12"
      />
    </div>
  );
};

export default SearchBar;
