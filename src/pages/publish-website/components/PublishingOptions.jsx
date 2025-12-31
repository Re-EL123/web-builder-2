import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';

const PublishingOptions = ({ onOptionsChange }) => {
  const [options, setOptions] = useState({
    siteName: 'My Website',
    metaDescription: '',
    favicon: null,
    analyticsId: '',
    reactCdn: 'production',
    imageOptimization: true,
    exportFormat: 'zip'
  });

  const reactCdnOptions = [
    { value: 'production', label: 'Production (Minified)' },
    { value: 'development', label: 'Development (Full)' }
  ];

  const exportFormatOptions = [
    { value: 'zip', label: 'ZIP Archive' },
    { value: 'folder', label: 'Folder Structure' }
  ];

  const handleInputChange = (field, value) => {
    const updatedOptions = { ...options, [field]: value };
    setOptions(updatedOptions);
    onOptionsChange(updatedOptions);
  };

  const handleFileUpload = (e) => {
    const file = e?.target?.files?.[0];
    if (file) {
      handleInputChange('favicon', file?.name);
    }
  };

  return (
    <div className="bg-card rounded-xl shadow-sm border border-border p-4 md:p-6 lg:p-8">
      <div className="flex items-center gap-3 mb-4 md:mb-6">
        <div className="w-10 h-10 md:w-12 md:h-12 bg-accent/10 rounded-lg flex items-center justify-center">
          <Icon name="Settings" size={24} color="var(--color-accent)" />
        </div>
        <div>
          <h2 className="text-xl md:text-2xl lg:text-3xl font-heading font-semibold text-foreground">
            Publishing Options
          </h2>
          <p className="text-xs md:text-sm text-muted-foreground">
            Configure final settings before export
          </p>
        </div>
      </div>
      <div className="space-y-4 md:space-y-6">
        <div>
          <Input
            label="Site Name"
            type="text"
            placeholder="Enter your website name"
            value={options?.siteName}
            onChange={(e) => handleInputChange('siteName', e?.target?.value)}
            description="This will appear in browser tabs and search results"
          />
        </div>

        <div>
          <Input
            label="Meta Description"
            type="text"
            placeholder="Brief description of your website"
            value={options?.metaDescription}
            onChange={(e) => handleInputChange('metaDescription', e?.target?.value)}
            description="Recommended length: 150-160 characters"
          />
        </div>

        <div>
          <label className="block text-sm font-caption font-medium text-foreground mb-2">
            Favicon Upload
          </label>
          <div className="flex items-center gap-3">
            <input
              type="file"
              accept="image/x-icon,image/png"
              onChange={handleFileUpload}
              className="hidden"
              id="favicon-upload"
            />
            <label
              htmlFor="favicon-upload"
              className="flex-1 px-4 py-2 border border-border rounded-md text-sm text-muted-foreground cursor-pointer hover:border-primary/30 transition-smooth"
            >
              {options?.favicon || 'Choose favicon file (.ico or .png)'}
            </label>
            <Button variant="outline" size="sm" iconName="Upload" onClick={() => document.getElementById('favicon-upload')?.click()}>
              Browse
            </Button>
          </div>
        </div>

        <div>
          <Input
            label="Analytics ID (Optional)"
            type="text"
            placeholder="G-XXXXXXXXXX"
            value={options?.analyticsId}
            onChange={(e) => handleInputChange('analyticsId', e?.target?.value)}
            description="Google Analytics tracking ID"
          />
        </div>

        <div>
          <Select
            label="React CDN Version"
            options={reactCdnOptions}
            value={options?.reactCdn}
            onChange={(value) => handleInputChange('reactCdn', value)}
            description="Choose production for smaller file size"
          />
        </div>

        <div>
          <Select
            label="Export Format"
            options={exportFormatOptions}
            value={options?.exportFormat}
            onChange={(value) => handleInputChange('exportFormat', value)}
          />
        </div>

        <div className="p-4 bg-background rounded-lg border border-border">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Icon name="Image" size={20} color="var(--color-primary)" />
              <div>
                <h3 className="text-sm font-caption font-medium text-foreground">
                  Image Optimization
                </h3>
                <p className="text-xs text-muted-foreground">
                  Compress images for faster loading
                </p>
              </div>
            </div>
            <button
              onClick={() => handleInputChange('imageOptimization', !options?.imageOptimization)}
              className={`w-12 h-6 rounded-full transition-smooth ${
                options?.imageOptimization ? 'bg-primary' : 'bg-muted'
              }`}
            >
              <div
                className={`w-5 h-5 bg-white rounded-full shadow-md transition-smooth ${
                  options?.imageOptimization ? 'translate-x-6' : 'translate-x-0.5'
                }`}
              />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PublishingOptions;
