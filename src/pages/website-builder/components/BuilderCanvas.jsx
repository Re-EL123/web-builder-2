import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';

const BuilderCanvas = ({
  currentPage,
  elements,
  selectedElement,
  onElementSelect,
  onElementDrop,
  onElementUpdate,
  onElementDelete,
  viewportMode
}) => {
  const [dragOverZone, setDragOverZone] = useState(null);

  const handleDragOver = (e, zone) => {
    e?.preventDefault();
    e.dataTransfer.dropEffect = 'copy';
    setDragOverZone(zone);
  };

  const handleDragLeave = () => {
    setDragOverZone(null);
  };

  const handleDrop = (e, zone) => {
    e?.preventDefault();
    setDragOverZone(null);
    onElementDrop(zone);
  };

  const getViewportClass = () => {
    switch (viewportMode) {
      case 'mobile':
        return 'max-w-[375px]';
      case 'tablet':
        return 'max-w-[768px]';
      default:
        return 'w-full';
    }
  };

  const renderElement = (element, zone) => {
    const isSelected = selectedElement?.id === element?.id;

    return (
      <div
        key={element?.id}
        onClick={(e) => {
          e?.stopPropagation();
          onElementSelect(element);
        }}
        className={`relative group cursor-pointer transition-smooth ${
        isSelected ? 'ring-2 ring-primary ring-offset-2' : 'hover:ring-1 hover:ring-primary/50'}`
        }>

        {renderElementContent(element)}
        {isSelected &&
        <div className="absolute -top-8 left-0 right-0 flex items-center justify-between bg-primary text-primary-foreground px-2 py-1 rounded-t-md text-xs font-caption">
            <span>{element?.name}</span>
            <button
            onClick={(e) => {
              e?.stopPropagation();
              onElementDelete(element?.id);
            }}
            className="p-1 hover:bg-primary-foreground/20 rounded transition-smooth">

              <Icon name="Trash2" size={14} />
            </button>
          </div>
        }
      </div>);

  };

  const renderElementContent = (element) => {
    switch (element?.id) {
      case 'header':
        return (
          <header className="bg-card border-b border-border p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-primary/10 rounded-md flex items-center justify-center">
                  <Icon name="Zap" size={16} color="var(--color-primary)" />
                </div>
                <span className="font-heading font-semibold text-foreground">Logo</span>
              </div>
              <nav className="flex items-center gap-4">
                <a href="#" className="text-sm text-muted-foreground hover:text-foreground">Home</a>
                <a href="#" className="text-sm text-muted-foreground hover:text-foreground">About</a>
                <a href="#" className="text-sm text-muted-foreground hover:text-foreground">Contact</a>
              </nav>
            </div>
          </header>);


      case 'hero':
        return (
          <section className="bg-gradient-to-br from-primary/10 to-accent/10 p-12 text-center">
            <h1 className="text-4xl font-heading font-bold text-foreground mb-4">
              Welcome to Your Website
            </h1>
            <p className="text-lg text-muted-foreground mb-6 max-w-2xl mx-auto">
              Create something amazing with our drag-and-drop builder
            </p>
            <button className="px-6 py-3 bg-primary text-primary-foreground rounded-md font-caption font-medium">
              Get Started
            </button>
          </section>);


      case 'heading':
        return (
          <h2 className="text-2xl font-heading font-semibold text-foreground p-4">
            Heading Text
          </h2>);


      case 'paragraph':
        return (
          <p className="text-base text-foreground p-4 leading-relaxed">
            This is a paragraph of text. You can edit this content to say whatever you want. Add your own message here to make your website unique and engaging for your visitors.
          </p>);


      case 'image':
        return (
          <div className="p-4">
            <Image
              src="https://images.unsplash.com/photo-1716378791634-90023faf85f3"
              alt="Modern laptop computer on wooden desk with coffee cup and notebook in bright office workspace"
              className="w-full h-64 object-cover rounded-lg" />

          </div>);


      case 'button':
        return (
          <div className="p-4">
            <button className="px-6 py-3 bg-primary text-primary-foreground rounded-md font-caption font-medium hover:bg-primary/90 transition-smooth">
              Click Me
            </button>
          </div>);


      case 'card':
        return (
          <div className="p-4">
            <div className="bg-card border border-border rounded-lg p-6 hover:shadow-md transition-smooth">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                <Icon name="Star" size={24} color="var(--color-primary)" />
              </div>
              <h3 className="text-lg font-heading font-semibold text-foreground mb-2">
                Card Title
              </h3>
              <p className="text-sm text-muted-foreground">
                This is a card component with an icon, title, and description text.
              </p>
            </div>
          </div>);


      case 'footer':
        return (
          <footer className="bg-card border-t border-border p-8">
            <div className="text-center">
              <p className="text-sm text-muted-foreground mb-2">
                © {new Date()?.getFullYear()} Your Company. All rights reserved.
              </p>
              <div className="flex items-center justify-center gap-4">
                <a href="#" className="text-sm text-muted-foreground hover:text-foreground">Privacy</a>
                <a href="#" className="text-sm text-muted-foreground hover:text-foreground">Terms</a>
                <a href="#" className="text-sm text-muted-foreground hover:text-foreground">Contact</a>
              </div>
            </div>
          </footer>);


      default:
        return (
          <div className="p-4 bg-muted/50 border border-dashed border-border rounded-lg">
            <div className="flex items-center gap-3">
              <Icon name={element?.icon} size={24} color="var(--color-primary)" />
              <div>
                <p className="text-sm font-caption font-medium text-foreground">{element?.name}</p>
                <p className="text-xs text-muted-foreground">{element?.description}</p>
              </div>
            </div>
          </div>);

    }
  };

  const renderDropZone = (zone, label) => {
    const zoneElements = elements?.filter((el) => el?.zone === zone);
    const isDragOver = dragOverZone === zone;

    return (
      <div
        onDragOver={(e) => handleDragOver(e, zone)}
        onDragLeave={handleDragLeave}
        onDrop={(e) => handleDrop(e, zone)}
        className={`min-h-[120px] border-2 border-dashed rounded-lg transition-smooth ${
        isDragOver ?
        'border-primary bg-primary/5' : 'border-border bg-muted/20'}`
        }>

        {zoneElements?.length === 0 ?
        <div className="h-full flex flex-col items-center justify-center p-8 text-center">
            <Icon
            name="Plus"
            size={32}
            color={isDragOver ? 'var(--color-primary)' : 'var(--color-muted-foreground)'} />

            <p className="text-sm font-caption font-medium text-muted-foreground mt-2">
              {label}
            </p>
            <p className="text-xs text-muted-foreground mt-1">
              Drag components here
            </p>
          </div> :

        <div className="space-y-2 p-2">
            {zoneElements?.map((element) => renderElement(element, zone))}
          </div>
        }
      </div>);

  };

  return (
    <div className="flex-1 overflow-auto bg-background p-4 md:p-6 lg:p-8">
      <div className={`mx-auto bg-card shadow-lg rounded-lg overflow-hidden transition-smooth ${getViewportClass()}`}>
        <div className="space-y-4 p-4">
          {renderDropZone('header', 'Header Section')}
          {renderDropZone('main', 'Main Content')}
          {renderDropZone('footer', 'Footer Section')}
        </div>
      </div>
      {elements?.length === 0 &&
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="text-center max-w-md">
            <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <Icon name="MousePointer" size={32} color="var(--color-primary)" />
            </div>
            <h3 className="text-xl font-heading font-semibold text-foreground mb-2">
              Start Building
            </h3>
            <p className="text-sm text-muted-foreground">
              Drag components from the left panel to start creating your website
            </p>
          </div>
        </div>
      }
    </div>);

};

export default BuilderCanvas;
