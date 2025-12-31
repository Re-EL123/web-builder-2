import React from 'react';
import Icon from '../../../components/AppIcon';
import Input from '../../../components/ui/Input';
import Button from '../../../components/ui/Button';

const PropertiesPanel = ({ selectedElement, onUpdate, onClose }) => {
  if (!selectedElement) {
    return (
      <div className="fixed right-0 top-[var(--nav-height-minimal)] bottom-0 w-80 bg-card border-l border-border z-50 flex items-center justify-center p-8">
        <div className="text-center">
          <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
            <Icon name="Settings" size={24} color="var(--color-muted-foreground)" />
          </div>
          <p className="text-sm text-muted-foreground">
            Select an element to edit its properties
          </p>
        </div>
      </div>
    );
  }

  const handleChange = (property, value) => {
    onUpdate({
      ...selectedElement,
      properties: {
        ...selectedElement?.properties,
        [property]: value
      }
    });
  };

  const renderPropertyInputs = () => {
    switch (selectedElement?.id) {
      case 'heading':
        return (
          <>
            <Input
              label="Heading Text"
              type="text"
              value={selectedElement?.properties?.text || 'Heading Text'}
              onChange={(e) => handleChange('text', e?.target?.value)}
              className="mb-4"
            />
            <div className="mb-4">
              <label className="block text-sm font-caption font-medium text-foreground mb-2">
                Heading Level
              </label>
              <div className="grid grid-cols-3 gap-2">
                {['H1', 'H2', 'H3', 'H4', 'H5', 'H6']?.map(level => (
                  <button
                    key={level}
                    onClick={() => handleChange('level', level)}
                    className={`px-3 py-2 rounded-md text-sm font-caption transition-smooth ${
                      selectedElement?.properties?.level === level
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-muted text-muted-foreground hover:bg-muted/80'
                    }`}
                  >
                    {level}
                  </button>
                ))}
              </div>
            </div>
          </>
        );

      case 'paragraph':
        return (
          <div className="mb-4">
            <label className="block text-sm font-caption font-medium text-foreground mb-2">
              Paragraph Text
            </label>
            <textarea
              value={selectedElement?.properties?.text || 'This is a paragraph of text.'}
              onChange={(e) => handleChange('text', e?.target?.value)}
              rows={6}
              className="w-full px-3 py-2 bg-background border border-input rounded-md text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring resize-none"
            />
          </div>
        );

      case 'button':
        return (
          <>
            <Input
              label="Button Text"
              type="text"
              value={selectedElement?.properties?.text || 'Click Me'}
              onChange={(e) => handleChange('text', e?.target?.value)}
              className="mb-4"
            />
            <Input
              label="Link URL"
              type="url"
              placeholder="https://example.com"
              value={selectedElement?.properties?.url || ''}
              onChange={(e) => handleChange('url', e?.target?.value)}
              className="mb-4"
            />
            <div className="mb-4">
              <label className="block text-sm font-caption font-medium text-foreground mb-2">
                Button Style
              </label>
              <div className="grid grid-cols-2 gap-2">
                {['Primary', 'Secondary', 'Outline', 'Ghost']?.map(style => (
                  <button
                    key={style}
                    onClick={() => handleChange('style', style?.toLowerCase())}
                    className={`px-3 py-2 rounded-md text-sm font-caption transition-smooth ${
                      selectedElement?.properties?.style === style?.toLowerCase()
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-muted text-muted-foreground hover:bg-muted/80'
                    }`}
                  >
                    {style}
                  </button>
                ))}
              </div>
            </div>
          </>
        );

      case 'image':
        return (
          <>
            <Input
              label="Image URL"
              type="url"
              placeholder="https://example.com/image.jpg"
              value={selectedElement?.properties?.src || ''}
              onChange={(e) => handleChange('src', e?.target?.value)}
              className="mb-4"
            />
            <Input
              label="Alt Text"
              type="text"
              placeholder="Describe the image"
              value={selectedElement?.properties?.alt || ''}
              onChange={(e) => handleChange('alt', e?.target?.value)}
              description="Important for accessibility"
              className="mb-4"
            />
            <div className="mb-4">
              <label className="block text-sm font-caption font-medium text-foreground mb-2">
                Image Size
              </label>
              <div className="grid grid-cols-3 gap-2">
                {['Small', 'Medium', 'Large']?.map(size => (
                  <button
                    key={size}
                    onClick={() => handleChange('size', size?.toLowerCase())}
                    className={`px-3 py-2 rounded-md text-sm font-caption transition-smooth ${
                      selectedElement?.properties?.size === size?.toLowerCase()
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-muted text-muted-foreground hover:bg-muted/80'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>
          </>
        );

      default:
        return (
          <div className="text-center py-8">
            <Icon name="Settings" size={32} color="var(--color-muted-foreground)" />
            <p className="text-sm text-muted-foreground mt-4">
              No editable properties for this component
            </p>
          </div>
        );
    }
  };

  return (
    <div className="fixed right-0 top-[var(--nav-height-minimal)] bottom-0 w-80 bg-card border-l border-border z-50 flex flex-col">
      <div className="p-4 border-b border-border flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-primary/10 rounded-md flex items-center justify-center">
            <Icon name={selectedElement?.icon} size={20} color="var(--color-primary)" />
          </div>
          <div>
            <h2 className="text-sm font-heading font-semibold text-foreground">
              {selectedElement?.name}
            </h2>
            <p className="text-xs text-muted-foreground">Properties</p>
          </div>
        </div>
        <button
          onClick={onClose}
          className="p-2 rounded-md hover:bg-muted transition-smooth"
          aria-label="Close properties panel"
        >
          <Icon name="X" size={20} />
        </button>
      </div>
      <div className="flex-1 overflow-y-auto p-4">
        {renderPropertyInputs()}

        <div className="pt-4 border-t border-border">
          <h3 className="text-sm font-caption font-medium text-foreground mb-3">
            Spacing
          </h3>
          <div className="grid grid-cols-2 gap-3 mb-4">
            <Input
              label="Padding"
              type="number"
              placeholder="16"
              value={selectedElement?.properties?.padding || ''}
              onChange={(e) => handleChange('padding', e?.target?.value)}
            />
            <Input
              label="Margin"
              type="number"
              placeholder="0"
              value={selectedElement?.properties?.margin || ''}
              onChange={(e) => handleChange('margin', e?.target?.value)}
            />
          </div>
        </div>

        <div className="pt-4 border-t border-border">
          <h3 className="text-sm font-caption font-medium text-foreground mb-3">
            Alignment
          </h3>
          <div className="grid grid-cols-3 gap-2">
            {[
              { icon: 'AlignLeft', value: 'left' },
              { icon: 'AlignCenter', value: 'center' },
              { icon: 'AlignRight', value: 'right' }
            ]?.map(align => (
              <button
                key={align?.value}
                onClick={() => handleChange('align', align?.value)}
                className={`p-3 rounded-md transition-smooth ${
                  selectedElement?.properties?.align === align?.value
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-muted text-muted-foreground hover:bg-muted/80'
                }`}
              >
                <Icon name={align?.icon} size={20} />
              </button>
            ))}
          </div>
        </div>
      </div>
      <div className="p-4 border-t border-border">
        <Button
          variant="destructive"
          fullWidth
          iconName="Trash2"
          iconPosition="left"
          onClick={() => {}}
        >
          Delete Element
        </Button>
      </div>
    </div>
  );
};

export default PropertiesPanel;
