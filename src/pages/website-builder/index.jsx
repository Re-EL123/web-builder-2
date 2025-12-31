import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useWorkflow } from '../../contexts/WorkflowContext';
import ProjectContextHeader from '../../components/navigation/ProjectContextHeader';
import ComponentLibrary from './components/ComponentLibrary';
import BuilderCanvas from './components/BuilderCanvas';
import PropertiesPanel from './components/PropertiesPanel';
import PageManager from './components/PageManager';
import BuilderToolbar from './components/BuilderToolbar';

const WebsiteBuilder = () => {
  const navigate = useNavigate();
  const { updateProject, markUnsaved } = useWorkflow();
  const [isLibraryCollapsed, setIsLibraryCollapsed] = useState(false);
  const [viewportMode, setViewportMode] = useState('desktop');
  const [selectedElement, setSelectedElement] = useState(null);
  const [draggedComponent, setDraggedComponent] = useState(null);
  const [autoSaveStatus, setAutoSaveStatus] = useState('saved');

  const [pages, setPages] = useState([
    { id: 'page-1', name: 'Home', elements: [] }
  ]);
  const [currentPage, setCurrentPage] = useState(pages?.[0]);
  const [elements, setElements] = useState([]);

  const [history, setHistory] = useState([]);
  const [historyIndex, setHistoryIndex] = useState(-1);

  useEffect(() => {
    updateProject({
      name: 'My Website Project',
      lastModified: new Date()?.toISOString()
    });
  }, []);

  useEffect(() => {
    const pageElements = pages?.find(p => p?.id === currentPage?.id)?.elements || [];
    setElements(pageElements);
  }, [currentPage, pages]);

  const saveToHistory = (newElements) => {
    const newHistory = history?.slice(0, historyIndex + 1);
    newHistory?.push(newElements);
    setHistory(newHistory);
    setHistoryIndex(newHistory?.length - 1);
  };

  const handleUndo = () => {
    if (historyIndex > 0) {
      setHistoryIndex(historyIndex - 1);
      const previousState = history?.[historyIndex - 1];
      setElements(previousState);
      updatePageElements(previousState);
    }
  };

  const handleRedo = () => {
    if (historyIndex < history?.length - 1) {
      setHistoryIndex(historyIndex + 1);
      const nextState = history?.[historyIndex + 1];
      setElements(nextState);
      updatePageElements(nextState);
    }
  };

  const updatePageElements = (newElements) => {
    setPages(pages?.map(page =>
      page?.id === currentPage?.id
        ? { ...page, elements: newElements }
        : page
    ));
  };

  const handleElementDrop = (zone) => {
    if (!draggedComponent) return;

    const newElement = {
      id: draggedComponent?.id,
      name: draggedComponent?.name,
      icon: draggedComponent?.icon,
      description: draggedComponent?.description,
      zone: zone,
      properties: {},
      uniqueId: `${draggedComponent?.id}-${Date.now()}`
    };

    const newElements = [...elements, newElement];
    setElements(newElements);
    updatePageElements(newElements);
    saveToHistory(newElements);
    setDraggedComponent(null);
    markUnsaved();
    triggerAutoSave();
  };

  const handleElementUpdate = (updatedElement) => {
    const newElements = elements?.map(el =>
      el?.uniqueId === updatedElement?.uniqueId ? updatedElement : el
    );
    setElements(newElements);
    updatePageElements(newElements);
    saveToHistory(newElements);
    markUnsaved();
    triggerAutoSave();
  };

  const handleElementDelete = (elementId) => {
    const newElements = elements?.filter(el => el?.uniqueId !== elementId);
    setElements(newElements);
    updatePageElements(newElements);
    saveToHistory(newElements);
    setSelectedElement(null);
    markUnsaved();
    triggerAutoSave();
  };

  const handlePageAdd = (pageName) => {
    const newPage = {
      id: `page-${pages?.length + 1}`,
      name: pageName,
      elements: []
    };
    setPages([...pages, newPage]);
    setCurrentPage(newPage);
  };

  const handlePageDelete = (pageId) => {
    if (pages?.length === 1) return;
    
    const newPages = pages?.filter(p => p?.id !== pageId);
    setPages(newPages);
    
    if (currentPage?.id === pageId) {
      setCurrentPage(newPages?.[0]);
    }
  };

  const handlePageRename = (pageId, newName) => {
    setPages(pages?.map(page =>
      page?.id === pageId ? { ...page, name: newName } : page
    ));
  };

  const triggerAutoSave = () => {
    setAutoSaveStatus('saving');
    setTimeout(() => {
      setAutoSaveStatus('saved');
    }, 1500);
  };

  const handleSave = () => {
    setAutoSaveStatus('saving');
    setTimeout(() => {
      setAutoSaveStatus('saved');
    }, 1000);
  };

  const handlePreview = () => {
    window.open('/preview', '_blank');
  };

  return (
    <div className="min-h-screen bg-background">
      <ProjectContextHeader />
      <div className="flex h-[calc(100vh-var(--nav-height-minimal))]">
        <ComponentLibrary
          onDragStart={setDraggedComponent}
          isCollapsed={isLibraryCollapsed}
          onToggle={() => setIsLibraryCollapsed(!isLibraryCollapsed)}
        />

        <div 
          className="flex-1 flex flex-col overflow-hidden"
          style={{
            marginLeft: isLibraryCollapsed ? '64px' : '320px',
            marginRight: selectedElement ? '320px' : '0'
          }}
        >
          <BuilderToolbar
            viewportMode={viewportMode}
            onViewportChange={setViewportMode}
            canUndo={historyIndex > 0}
            canRedo={historyIndex < history?.length - 1}
            onUndo={handleUndo}
            onRedo={handleRedo}
            onPreview={handlePreview}
            onSave={handleSave}
            autoSaveStatus={autoSaveStatus}
          />

          <PageManager
            pages={pages}
            currentPage={currentPage}
            onPageChange={setCurrentPage}
            onPageAdd={handlePageAdd}
            onPageDelete={handlePageDelete}
            onPageRename={handlePageRename}
          />

          <BuilderCanvas
            currentPage={currentPage}
            elements={elements}
            selectedElement={selectedElement}
            onElementSelect={setSelectedElement}
            onElementDrop={handleElementDrop}
            onElementUpdate={handleElementUpdate}
            onElementDelete={handleElementDelete}
            viewportMode={viewportMode}
          />
        </div>

        {selectedElement && (
          <PropertiesPanel
            selectedElement={selectedElement}
            onUpdate={handleElementUpdate}
            onClose={() => setSelectedElement(null)}
          />
        )}
      </div>
    </div>
  );
};

export default WebsiteBuilder;
