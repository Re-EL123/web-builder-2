import React, { createContext, useContext, useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const WorkflowContext = createContext(undefined);

export const useWorkflow = () => {
  const context = useContext(WorkflowContext);
  if (!context) {
    throw new Error('useWorkflow must be used within WorkflowProvider');
  }
  return context;
};

export const WorkflowProvider = ({ children }) => {
  const location = useLocation();
  const [workflowPhase, setWorkflowPhase] = useState('authentication');
  const [currentProject, setCurrentProject] = useState(null);
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  const [autoSaveStatus, setAutoSaveStatus] = useState('saved');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const path = location?.pathname;
    
    if (path === '/login' || path === '/register') {
      setWorkflowPhase('authentication');
    } else if (path === '/dashboard' || path === '/template-marketplace') {
      setWorkflowPhase('management');
    } else if (path === '/website-builder' || path === '/publish-website') {
      setWorkflowPhase('creation');
    }

    setIsMobileMenuOpen(false);
  }, [location?.pathname]);

  const updateProject = (project) => {
    setCurrentProject(project);
  };

  const markUnsaved = () => {
    setHasUnsavedChanges(true);
    setAutoSaveStatus('saving');
    
    setTimeout(() => {
      setAutoSaveStatus('saved');
      setHasUnsavedChanges(false);
    }, 2000);
  };

  const authenticate = (status) => {
    setIsAuthenticated(status);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(prev => !prev);
  };

  const value = {
    workflowPhase,
    currentProject,
    hasUnsavedChanges,
    autoSaveStatus,
    isAuthenticated,
    isMobileMenuOpen,
    updateProject,
    markUnsaved,
    authenticate,
    toggleMobileMenu,
    setIsMobileMenuOpen,
  };

  return (
    <WorkflowContext.Provider value={value}>
      {children}
    </WorkflowContext.Provider>
  );
};
