import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { WorkflowProvider } from '../../contexts/WorkflowContext';
import AdaptiveNavigationBar from '../../components/navigation/AdaptiveNavigationBar';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import ProjectCard from './components/ProjectCard';
import StatsCard from './components/StatsCard';
import EmptyState from './components/EmptyState';
import FilterBar from './components/FilterBar';

const Dashboard = () => {
  const navigate = useNavigate();

  const [projects, setProjects] = useState([
  {
    id: 1,
    name: "Portfolio Website",
    thumbnail: "https://img.rocket.new/generatedImages/rocket_gen_img_1bd315aa1-1764652054746.png",
    thumbnailAlt: "Modern portfolio website design with clean layout showcasing creative work on desktop screen with blue and white color scheme",
    pageCount: 5,
    lastModified: new Date(2025, 11, 28),
    createdAt: new Date(2025, 11, 15),
    isNew: false
  },
  {
    id: 2,
    name: "Business Landing Page",
    thumbnail: "https://img.rocket.new/generatedImages/rocket_gen_img_161b24a29-1764759413438.png",
    thumbnailAlt: "Professional business landing page with corporate branding featuring hero section with call-to-action buttons and service highlights",
    pageCount: 3,
    lastModified: new Date(2025, 11, 29),
    createdAt: new Date(2025, 11, 20),
    isNew: true
  },
  {
    id: 3,
    name: "Restaurant Menu Site",
    thumbnail: "https://img.rocket.new/generatedImages/rocket_gen_img_17b2ee700-1764672904853.png",
    thumbnailAlt: "Elegant restaurant menu website design displaying food items with appetizing photography and modern layout on tablet device",
    pageCount: 4,
    lastModified: new Date(2025, 11, 25),
    createdAt: new Date(2025, 11, 10),
    isNew: false
  },
  {
    id: 4,
    name: "E-commerce Store",
    thumbnail: "https://img.rocket.new/generatedImages/rocket_gen_img_1eb7c1cb3-1764655134961.png",
    thumbnailAlt: "Modern e-commerce website interface showing product grid with shopping cart functionality and clean minimalist design on laptop screen",
    pageCount: 8,
    lastModified: new Date(2025, 11, 27),
    createdAt: new Date(2025, 11, 5),
    isNew: false
  }]
  );

  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('modified');
  const [selectedProjects, setSelectedProjects] = useState([]);

  const stats = useMemo(() => ({
    totalProjects: projects.length,
    storageUsed: '2.4 GB',
    storageLimit: '10 GB',
    activeProjects: projects.filter((p) => p.isNew).length
  }), [projects]);

  const filteredAndSortedProjects = useMemo(() => {
    let filtered = projects.filter((project) =>
    project.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'modified':
          return b.lastModified - a.lastModified;
        case 'created':
          return b.createdAt - a.createdAt;
        case 'name':
          return a.name.localeCompare(b.name);
        case 'pages':
          return b.pageCount - a.pageCount;
        default:
          return 0;
      }
    });

    return filtered;
  }, [projects, searchQuery, sortBy]);

  const handleCreateNew = () => {
    navigate('/website-builder');
  };

  const handleBrowseTemplates = () => {
    navigate('/template-marketplace');
  };

  const handleEdit = (projectId) => {
    navigate('/website-builder', { state: { projectId } });
  };

  const handlePreview = (projectId) => {
    window.open(`/preview/${projectId}`, '_blank');
  };

  const handleDelete = (projectId) => {
    setProjects((prev) => prev.filter((p) => p.id !== projectId));
    setSelectedProjects((prev) => prev.filter((id) => id !== projectId));
  };

  const handleBulkDelete = () => {
    if (selectedProjects.length === 0) return;

    const confirmed = window.confirm(
      `Are you sure you want to delete ${selectedProjects.length} project${selectedProjects.length > 1 ? 's' : ''}?`
    );

    if (confirmed) {
      setProjects((prev) => prev.filter((p) => !selectedProjects.includes(p.id)));
      setSelectedProjects([]);
    }
  };

  const handleClearSelection = () => {
    setSelectedProjects([]);
  };

  return (
    <WorkflowProvider>
      <div className="min-h-screen bg-background">
        <AdaptiveNavigationBar />

        <main className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 py-6 md:py-8 lg:py-12">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-6 md:mb-8 lg:mb-12">
            <div>
              <h1 className="text-2xl md:text-3xl lg:text-4xl font-heading font-semibold text-foreground mb-2">
                My Projects
              </h1>
              <p className="text-sm md:text-base text-muted-foreground">
                Manage and organize your website projects
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <Button
                variant="outline"
                size="default"
                iconName="Store"
                iconPosition="left"
                onClick={handleBrowseTemplates}
                className="w-full sm:w-auto">

                Browse Templates
              </Button>
              <Button
                variant="default"
                size="default"
                iconName="Plus"
                iconPosition="left"
                onClick={handleCreateNew}
                className="w-full sm:w-auto">

                Create New Website
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-6 md:mb-8 lg:mb-12">
            <StatsCard
              icon="FolderOpen"
              label="Total Projects"
              value={stats.totalProjects}
              trend="up"
              trendValue="+2" />

            <StatsCard
              icon="Zap"
              label="Active Projects"
              value={stats.activeProjects}
              trend="neutral"
              trendValue="0" />

            <StatsCard
              icon="HardDrive"
              label="Storage Used"
              value={stats.storageUsed}
              trend="neutral"
              trendValue="0" />

            <StatsCard
              icon="Database"
              label="Storage Limit"
              value={stats.storageLimit}
              trend="neutral"
              trendValue="0" />

          </div>

          <FilterBar
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            sortBy={sortBy}
            onSortChange={setSortBy}
            selectedCount={selectedProjects.length}
            onClearSelection={handleClearSelection}
            onBulkDelete={handleBulkDelete} />


          {filteredAndSortedProjects.length === 0 ?
          searchQuery ?
          <div className="text-center py-12 md:py-16 lg:py-20">
                <div className="w-16 h-16 md:w-20 md:h-20 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
                  <Icon name="Search" size={32} color="var(--color-muted-foreground)" />
                </div>
                <h3 className="text-lg md:text-xl font-heading font-semibold text-foreground mb-2">
                  No projects found
                </h3>
                <p className="text-sm md:text-base text-muted-foreground">
                  Try adjusting your search query
                </p>
              </div> :

          <EmptyState
            onCreateNew={handleCreateNew}
            onBrowseTemplates={handleBrowseTemplates} /> :



          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
              {filteredAndSortedProjects.map((project) =>
            <ProjectCard
              key={project.id}
              project={project}
              onEdit={handleEdit}
              onPreview={handlePreview}
              onDelete={handleDelete} />

            )}
            </div>
          }
        </main>
      </div>
    </WorkflowProvider>);

};

export default Dashboard;
