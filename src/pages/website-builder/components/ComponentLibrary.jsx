import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Input from '../../../components/ui/Input';

const ComponentLibrary = ({ onDragStart, isCollapsed, onToggle }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');

  const componentCategories = [
    {
      id: 'all',
      name: 'All Components',
      icon: 'LayoutGrid'
    },
    {
      id: 'layout',
      name: 'Layout',
      icon: 'Layout'
    },
    {
      id: 'content',
      name: 'Content',
      icon: 'Type'
    },
    {
      id: 'media',
      name: 'Media',
      icon: 'Image'
    },
    {
      id: 'interactive',
      name: 'Interactive',
      icon: 'MousePointer'
    },
    {
      id: 'react',
      name: 'React CDN',
      icon: 'Zap'
    }
  ];

  const components = [
    {
      id: 'header',
      name: 'Header',
      category: 'layout',
      icon: 'AlignJustify',
      description: 'Navigation header with logo and menu'
    },
    {
      id: 'hero',
      name: 'Hero Section',
      category: 'layout',
      icon: 'Monitor',
      description: 'Large banner with headline and CTA'
    },
    {
      id: 'container',
      name: 'Container',
      category: 'layout',
      icon: 'Square',
      description: 'Responsive content wrapper'
    },
    {
      id: 'grid',
      name: 'Grid Layout',
      category: 'layout',
      icon: 'Grid3x3',
      description: 'Multi-column grid system'
    },
    {
      id: 'footer',
      name: 'Footer',
      category: 'layout',
      icon: 'AlignCenter',
      description: 'Bottom page footer with links'
    },
    {
      id: 'heading',
      name: 'Heading',
      category: 'content',
      icon: 'Heading',
      description: 'Text heading (H1-H6)'
    },
    {
      id: 'paragraph',
      name: 'Paragraph',
      category: 'content',
      icon: 'AlignLeft',
      description: 'Body text content'
    },
    {
      id: 'list',
      name: 'List',
      category: 'content',
      icon: 'List',
      description: 'Bulleted or numbered list'
    },
    {
      id: 'quote',
      name: 'Quote',
      category: 'content',
      icon: 'Quote',
      description: 'Blockquote with citation'
    },
    {
      id: 'image',
      name: 'Image',
      category: 'media',
      icon: 'Image',
      description: 'Single image with caption'
    },
    {
      id: 'gallery',
      name: 'Image Gallery',
      category: 'media',
      icon: 'Images',
      description: 'Multiple images in grid'
    },
    {
      id: 'video',
      name: 'Video',
      category: 'media',
      icon: 'Video',
      description: 'Embedded video player'
    },
    {
      id: 'button',
      name: 'Button',
      category: 'interactive',
      icon: 'RectangleHorizontal',
      description: 'Clickable action button'
    },
    {
      id: 'form',
      name: 'Form',
      category: 'interactive',
      icon: 'FileText',
      description: 'Input form with fields'
    },
    {
      id: 'card',
      name: 'Card',
      category: 'interactive',
      icon: 'CreditCard',
      description: 'Content card with hover effect'
    },
    {
      id: 'accordion',
      name: 'Accordion',
      category: 'interactive',
      icon: 'ChevronDown',
      description: 'Expandable content sections'
    },
    {
      id: 'tabs',
      name: 'Tabs',
      category: 'interactive',
      icon: 'Columns',
      description: 'Tabbed content switcher'
    },
    {
      id: 'carousel',
      name: 'Carousel',
      category: 'react',
      icon: 'ArrowLeftRight',
      description: 'React-powered image slider'
    },
    {
      id: 'counter',
      name: 'Counter',
      category: 'react',
      icon: 'Hash',
      description: 'Animated number counter'
    },
    {
      id: 'timeline',
      name: 'Timeline',
      category: 'react',
      icon: 'GitBranch',
      description: 'Vertical timeline component'
    },
    {
      id: 'pricing',
      name: 'Pricing Table',
      category: 'react',
      icon: 'DollarSign',
      description: 'Pricing comparison table'
    }
  ];

  const filteredComponents = components?.filter(component => {
    const matchesSearch = component?.name?.toLowerCase()?.includes(searchQuery?.toLowerCase()) ||
                         component?.description?.toLowerCase()?.includes(searchQuery?.toLowerCase());
    const matchesCategory = activeCategory === 'all' || component?.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  const handleDragStart = (e, component) => {
    e.dataTransfer.effectAllowed = 'copy';
    onDragStart(component);
  };

  if (isCollapsed) {
    return (
      <div className="fixed left-0 top-[var(--nav-height-minimal)] bottom-0 w-16 bg-card border-r border-border z-50 flex flex-col items-center py-4 gap-4">
        <button
          onClick={onToggle}
          className="p-2 rounded-md hover:bg-muted transition-smooth"
          aria-label="Expand component library"
        >
          <Icon name="ChevronRight" size={20} />
        </button>
        {componentCategories?.slice(0, 5)?.map(category => (
          <button
            key={category?.id}
            className="p-2 rounded-md hover:bg-muted transition-smooth"
            title={category?.name}
          >
            <Icon name={category?.icon} size={20} />
          </button>
        ))}
      </div>
    );
  }

  return (
    <div className="fixed left-0 top-[var(--nav-height-minimal)] bottom-0 w-80 bg-card border-r border-border z-50 flex flex-col">
      <div className="p-4 border-b border-border flex items-center justify-between">
        <h2 className="text-lg font-heading font-semibold text-foreground">Components</h2>
        <button
          onClick={onToggle}
          className="p-2 rounded-md hover:bg-muted transition-smooth"
          aria-label="Collapse component library"
        >
          <Icon name="ChevronLeft" size={20} />
        </button>
      </div>
      <div className="p-4 border-b border-border">
        <Input
          type="search"
          placeholder="Search components..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e?.target?.value)}
          className="w-full"
        />
      </div>
      <div className="flex overflow-x-auto border-b border-border px-4 gap-2 py-2">
        {componentCategories?.map(category => (
          <button
            key={category?.id}
            onClick={() => setActiveCategory(category?.id)}
            className={`flex items-center gap-2 px-3 py-2 rounded-md whitespace-nowrap transition-smooth font-caption text-sm ${
              activeCategory === category?.id
                ? 'bg-primary text-primary-foreground'
                : 'text-muted-foreground hover:bg-muted hover:text-foreground'
            }`}
          >
            <Icon name={category?.icon} size={16} />
            <span>{category?.name}</span>
          </button>
        ))}
      </div>
      <div className="flex-1 overflow-y-auto p-4">
        <div className="space-y-2">
          {filteredComponents?.map(component => (
            <div
              key={component?.id}
              draggable
              onDragStart={(e) => handleDragStart(e, component)}
              className="p-3 bg-muted/50 rounded-lg border border-border hover:border-primary hover:bg-muted cursor-move transition-smooth group"
            >
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 bg-primary/10 rounded-md flex items-center justify-center flex-shrink-0 group-hover:bg-primary/20 transition-smooth">
                  <Icon name={component?.icon} size={20} color="var(--color-primary)" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-sm font-caption font-medium text-foreground mb-1">
                    {component?.name}
                  </h3>
                  <p className="text-xs text-muted-foreground line-clamp-2">
                    {component?.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredComponents?.length === 0 && (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
              <Icon name="Search" size={24} color="var(--color-muted-foreground)" />
            </div>
            <p className="text-sm text-muted-foreground">No components found</p>
            <p className="text-xs text-muted-foreground mt-1">Try a different search term</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ComponentLibrary;
