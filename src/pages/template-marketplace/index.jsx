import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import AdaptiveNavigationBar from '../../components/navigation/AdaptiveNavigationBar';
import TemplateCard from './components/TemplateCard';
import FilterPanel from './components/FilterPanel';
import TemplatePreviewModal from './components/TemplatePreviewModal';
import SearchBar from './components/SearchBar';
import SortControls from './components/SortControls';
import Icon from '../../components/AppIcon';

const TemplateMarketplace = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('popular');
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);
  const [filters, setFilters] = useState({
    category: 'all',
    industries: [],
    colorSchemes: [],
    layoutTypes: [],
    premiumOnly: false,
    featuredOnly: false
  });

  const mockTemplates = [
  {
    id: 1,
    name: "Modern Business Pro",
    description: "Professional business template with clean design and powerful features for corporate websites",
    fullDescription: "A comprehensive business template designed for modern enterprises. Features include responsive layouts, integrated contact forms, service showcases, team profiles, and client testimonials. Perfect for consulting firms, agencies, and professional services.",
    thumbnail: "https://img.rocket.new/generatedImages/rocket_gen_img_189e5dd8a-1766874081588.png",
    thumbnailAlt: "Modern business website homepage with clean white background, professional blue accents, hero section with corporate imagery",
    category: "business",
    industry: "technology",
    creatorName: "Sarah Johnson",
    creatorAvatar: "https://img.rocket.new/generatedImages/rocket_gen_img_14da91c34-1763294780479.png",
    creatorAvatarAlt: "Professional headshot of woman with shoulder-length brown hair wearing navy blazer",
    rating: 4.8,
    isPremium: true,
    isFeatured: true,
    features: [
    "Responsive design for all devices",
    "Contact form integration",
    "Service showcase sections",
    "Team member profiles",
    "Client testimonials",
    "SEO optimized structure"],

    previewPages: [
    {
      image: "https://img.rocket.new/generatedImages/rocket_gen_img_1183134e0-1767088355879.png",
      imageAlt: "Homepage with hero banner showing modern office space with glass windows and professional team collaboration"
    },
    {
      image: "https://img.rocket.new/generatedImages/rocket_gen_img_14b39f937-1765281563408.png",
      imageAlt: "Services page displaying grid layout of business offerings with icons and descriptions on white background"
    },
    {
      image: "https://img.rocket.new/generatedImages/rocket_gen_img_18c198fa9-1766767347583.png",
      imageAlt: "About page featuring team photos in professional attire with company mission statement and values"
    }]

  },
  {
    id: 2,
    name: "Creative Portfolio",
    description: "Stunning portfolio template for designers, photographers, and creative professionals",
    fullDescription: "Showcase your creative work with this visually striking portfolio template. Features masonry galleries, project case studies, client work sections, and integrated contact capabilities. Ideal for freelancers and creative agencies.",
    thumbnail: "https://img.rocket.new/generatedImages/rocket_gen_img_1bd315aa1-1764652054746.png",
    thumbnailAlt: "Creative portfolio website with artistic layout showing colorful design work and photography in grid format",
    category: "portfolio",
    industry: "creative",
    creatorName: "Michael Chen",
    creatorAvatar: "https://img.rocket.new/generatedImages/rocket_gen_img_10cadd384-1763292115349.png",
    creatorAvatarAlt: "Professional headshot of Asian man with short black hair wearing casual gray shirt",
    rating: 4.9,
    isPremium: false,
    isFeatured: true,
    features: [
    "Masonry gallery layouts",
    "Project case studies",
    "Lightbox image viewer",
    "Smooth scroll animations",
    "Mobile-optimized galleries",
    "Social media integration"],

    previewPages: [
    {
      image: "https://img.rocket.new/generatedImages/rocket_gen_img_12bbf6f73-1763296347251.png",
      imageAlt: "Portfolio homepage with large hero image of creative workspace with design tools and colorful artwork"
    },
    {
      image: "https://img.rocket.new/generatedImages/rocket_gen_img_1d682778c-1767008426773.png",
      imageAlt: "Gallery page showing masonry layout of photography and design projects with hover effects"
    }]

  },
  {
    id: 3,
    name: "E-Commerce Starter",
    description: "Complete e-commerce solution with product catalogs, shopping cart, and checkout",
    fullDescription: "Launch your online store with this comprehensive e-commerce template. Includes product listings, filtering, shopping cart, checkout flow, and order management. Built for scalability and conversion optimization.",
    thumbnail: "https://img.rocket.new/generatedImages/rocket_gen_img_1eb7c1cb3-1764655134961.png",
    thumbnailAlt: "E-commerce website homepage displaying product grid with shopping cart icon and featured items on clean white background",
    category: "ecommerce",
    industry: "retail",
    creatorName: "Emily Rodriguez",
    creatorAvatar: "https://img.rocket.new/generatedImages/rocket_gen_img_162a57531-1763296100992.png",
    creatorAvatarAlt: "Professional headshot of Hispanic woman with long dark hair wearing professional white blouse",
    rating: 4.7,
    isPremium: true,
    isFeatured: false,
    features: [
    "Product catalog with filtering",
    "Shopping cart functionality",
    "Checkout process flow",
    "Product detail pages",
    "Customer reviews section",
    "Payment gateway ready"],

    previewPages: [
    {
      image: "https://img.rocket.new/generatedImages/rocket_gen_img_105fdbea4-1766490773967.png",
      imageAlt: "E-commerce homepage with featured products, promotional banners, and category navigation"
    },
    {
      image: "https://img.rocket.new/generatedImages/rocket_gen_img_1e4452cb7-1766983501065.png",
      imageAlt: "Product listing page showing grid of items with prices, ratings, and add to cart buttons"
    },
    {
      image: "https://img.rocket.new/generatedImages/rocket_gen_img_126db2a5e-1764661445871.png",
      imageAlt: "Shopping cart page displaying selected items with quantity controls and checkout button"
    }]

  },
  {
    id: 4,
    name: "Tech Blog Hub",
    description: "Modern blog template with article listings, categories, and author profiles",
    fullDescription: "Perfect for tech bloggers and content creators. Features article listings, category organization, author profiles, comment sections, and newsletter signup. Optimized for readability and engagement.",
    thumbnail: "https://img.rocket.new/generatedImages/rocket_gen_img_1ac9f52e3-1764758855402.png",
    thumbnailAlt: "Blog website homepage with featured article images, headlines, and sidebar navigation on light background",
    category: "blog",
    industry: "technology",
    creatorName: "David Kim",
    creatorAvatar: "https://img.rocket.new/generatedImages/rocket_gen_img_11a2a08ae-1763295050712.png",
    creatorAvatarAlt: "Professional headshot of Asian man with glasses wearing casual blue shirt",
    rating: 4.6,
    isPremium: false,
    isFeatured: false,
    features: [
    "Article listing layouts",
    "Category organization",
    "Author profile pages",
    "Comment system ready",
    "Newsletter signup",
    "Social sharing buttons"],

    previewPages: [
    {
      image: "https://img.rocket.new/generatedImages/rocket_gen_img_1ac9f52e3-1764758855402.png",
      imageAlt: "Blog homepage with featured articles, thumbnail images, and category tags in modern layout"
    },
    {
      image: "https://img.rocket.new/generatedImages/rocket_gen_img_1897fadee-1765651100973.png",
      imageAlt: "Article page with large header image, formatted text content, and sidebar with related posts"
    }]

  },
  {
    id: 5,
    name: "Landing Page Pro",
    description: "High-converting landing page template for product launches and campaigns",
    fullDescription: "Maximize conversions with this professionally designed landing page template. Features hero sections, feature highlights, pricing tables, testimonials, and strong call-to-action elements. Perfect for product launches and marketing campaigns.",
    thumbnail: "https://img.rocket.new/generatedImages/rocket_gen_img_12cdbf778-1765004606847.png",
    thumbnailAlt: "Landing page with bold hero section, product features, and prominent call-to-action button on gradient background",
    category: "landing",
    industry: "technology",
    creatorName: "Jessica Martinez",
    creatorAvatar: "https://img.rocket.new/generatedImages/rocket_gen_img_1f8b5643a-1763295667091.png",
    creatorAvatarAlt: "Professional headshot of woman with curly brown hair wearing professional burgundy blazer",
    rating: 4.9,
    isPremium: true,
    isFeatured: true,
    features: [
    "Hero section with CTA",
    "Feature highlights",
    "Pricing comparison tables",
    "Customer testimonials",
    "FAQ accordion",
    "Lead capture forms"],

    previewPages: [
    {
      image: "https://img.rocket.new/generatedImages/rocket_gen_img_112127b74-1765392059924.png",
      imageAlt: "Landing page hero section with product mockup, headline, and prominent sign-up button"
    },
    {
      image: "https://img.rocket.new/generatedImages/rocket_gen_img_12cdbf778-1765004606847.png",
      imageAlt: "Features section with icons, descriptions, and benefits displayed in three-column layout"
    }]

  },
  {
    id: 6,
    name: "Personal Brand",
    description: "Elegant personal website template for professionals and influencers",
    fullDescription: "Build your personal brand with this elegant template. Includes bio sections, portfolio showcase, blog integration, and contact forms. Ideal for consultants, coaches, and personal brands.",
    thumbnail: "https://img.rocket.new/generatedImages/rocket_gen_img_1581d6a4f-1766573363319.png",
    thumbnailAlt: "Personal website with professional headshot, bio section, and portfolio grid on minimalist white background",
    category: "personal",
    industry: "creative",
    creatorName: "Alex Thompson",
    creatorAvatar: "https://img.rocket.new/generatedImages/rocket_gen_img_17fc21307-1763293959943.png",
    creatorAvatarAlt: "Professional headshot of man with short blonde hair wearing casual gray sweater",
    rating: 4.5,
    isPremium: false,
    isFeatured: false,
    features: [
    "Professional bio section",
    "Portfolio showcase",
    "Blog integration",
    "Contact form",
    "Social media links",
    "Resume download"],

    previewPages: [
    {
      image: "https://img.rocket.new/generatedImages/rocket_gen_img_1a03d5550-1767112137024.png",
      imageAlt: "Personal homepage with large profile photo, introduction text, and skills showcase"
    }]

  },
  {
    id: 7,
    name: "Healthcare Clinic",
    description: "Professional healthcare template with appointment booking and services",
    fullDescription: "Designed specifically for healthcare providers. Features service listings, doctor profiles, appointment booking, patient resources, and contact information. HIPAA-compliant design considerations.",
    thumbnail: "https://img.rocket.new/generatedImages/rocket_gen_img_1d7db78fb-1764668283328.png",
    thumbnailAlt: "Healthcare website with medical imagery, service listings, and appointment booking section on calming blue background",
    category: "business",
    industry: "healthcare",
    creatorName: "Dr. Rachel Green",
    creatorAvatar: "https://img.rocket.new/generatedImages/rocket_gen_img_12fd3a90c-1763295402479.png",
    creatorAvatarAlt: "Professional headshot of woman with short brown hair wearing medical white coat",
    rating: 4.8,
    isPremium: true,
    isFeatured: false,
    features: [
    "Service listings",
    "Doctor profiles",
    "Appointment booking",
    "Patient resources",
    "Insurance information",
    "Contact and location"],

    previewPages: [
    {
      image: "https://img.rocket.new/generatedImages/rocket_gen_img_1dc1562d4-1767112140728.png",
      imageAlt: "Healthcare homepage with welcoming medical facility images and service overview sections"
    },
    {
      image: "https://img.rocket.new/generatedImages/rocket_gen_img_111282eeb-1767112137814.png",
      imageAlt: "Services page displaying medical specialties with icons and detailed descriptions"
    }]

  },
  {
    id: 8,
    name: "Finance Dashboard",
    description: "Professional finance template with data visualization and reports",
    fullDescription: "Comprehensive finance template for financial services. Includes data dashboards, service offerings, team profiles, and client portals. Perfect for financial advisors and investment firms.",
    thumbnail: "https://img.rocket.new/generatedImages/rocket_gen_img_1ccd712fd-1766948375555.png",
    thumbnailAlt: "Finance website with professional charts, graphs, and financial data visualization on dark blue background",
    category: "business",
    industry: "finance",
    creatorName: "Robert Wilson",
    creatorAvatar: "https://img.rocket.new/generatedImages/rocket_gen_img_179ebd6f2-1763294255544.png",
    creatorAvatarAlt: "Professional headshot of man with gray hair wearing formal navy suit and tie",
    rating: 4.7,
    isPremium: true,
    isFeatured: false,
    features: [
    "Data visualization",
    "Service offerings",
    "Team profiles",
    "Client testimonials",
    "Resource library",
    "Contact forms"],

    previewPages: [
    {
      image: "https://img.rocket.new/generatedImages/rocket_gen_img_1a674ebb6-1767112138698.png",
      imageAlt: "Finance homepage with professional imagery, service highlights, and trust indicators"
    }]

  },
  {
    id: 9,
    name: "Education Platform",
    description: "Complete education template with course listings and student resources",
    fullDescription: "Built for educational institutions and online learning platforms. Features course catalogs, instructor profiles, student resources, and enrollment systems. Optimized for learning management.",
    thumbnail: "https://img.rocket.new/generatedImages/rocket_gen_img_1137dc0fa-1767112137785.png",
    thumbnailAlt: "Education website with course listings, student testimonials, and learning resources on bright orange background",
    category: "business",
    industry: "education",
    creatorName: "Prof. Linda Davis",
    creatorAvatar: "https://img.rocket.new/generatedImages/rocket_gen_img_197353d20-1763297996808.png",
    creatorAvatarAlt: "Professional headshot of woman with glasses and gray hair wearing academic attire",
    rating: 4.6,
    isPremium: false,
    isFeatured: false,
    features: [
    "Course catalog",
    "Instructor profiles",
    "Student resources",
    "Enrollment forms",
    "Event calendar",
    "News and updates"],

    previewPages: [
    {
      image: "https://img.rocket.new/generatedImages/rocket_gen_img_13004e041-1767112136841.png",
      imageAlt: "Education homepage with campus images, course highlights, and student success stories"
    }]

  },
  {
    id: 10,
    name: "Restaurant Menu",
    description: "Appetizing restaurant template with menu, reservations, and gallery",
    fullDescription: "Perfect for restaurants and food businesses. Features menu displays, online reservations, photo galleries, and location information. Designed to showcase culinary offerings beautifully.",
    thumbnail: "https://img.rocket.new/generatedImages/rocket_gen_img_167b794f4-1767008427057.png",
    thumbnailAlt: "Restaurant website with food photography, menu sections, and reservation button on warm brown background",
    category: "business",
    industry: "retail",
    creatorName: "Chef Marco Rossi",
    creatorAvatar: "https://img.rocket.new/generatedImages/rocket_gen_img_1de0dd801-1763296700206.png",
    creatorAvatarAlt: "Professional headshot of man with dark hair wearing chef's white uniform",
    rating: 4.8,
    isPremium: false,
    isFeatured: true,
    features: [
    "Menu display",
    "Online reservations",
    "Photo gallery",
    "Location and hours",
    "Special events",
    "Contact information"],

    previewPages: [
    {
      image: "https://img.rocket.new/generatedImages/rocket_gen_img_167b794f4-1767008427057.png",
      imageAlt: "Restaurant homepage with appetizing food photography and welcoming ambiance shots"
    },
    {
      image: "https://img.rocket.new/generatedImages/rocket_gen_img_1dcd2cf63-1766490803901.png",
      imageAlt: "Menu page displaying food items with descriptions, prices, and high-quality dish photography"
    }]

  }];


  const filteredAndSortedTemplates = useMemo(() => {
    let result = [...mockTemplates];

    if (searchQuery) {
      const query = searchQuery?.toLowerCase();
      result = result?.filter(
        (template) =>
        template?.name?.toLowerCase()?.includes(query) ||
        template?.description?.toLowerCase()?.includes(query) ||
        template?.creatorName?.toLowerCase()?.includes(query) ||
        template?.category?.toLowerCase()?.includes(query)
      );
    }

    if (filters?.category !== 'all') {
      result = result?.filter((template) => template?.category === filters?.category);
    }

    if (filters?.industries?.length > 0) {
      result = result?.filter((template) =>
      filters?.industries?.includes(template?.industry)
      );
    }

    if (filters?.colorSchemes?.length > 0) {

      // Mock color scheme filtering - in real app would check template colors
    }
    if (filters?.layoutTypes?.length > 0) {

      // Mock layout type filtering - in real app would check template layout
    }
    if (filters?.premiumOnly) {
      result = result?.filter((template) => template?.isPremium);
    }

    if (filters?.featuredOnly) {
      result = result?.filter((template) => template?.isFeatured);
    }

    switch (sortBy) {
      case 'popular':
        result?.sort((a, b) => b?.rating - a?.rating);
        break;
      case 'newest':
        result?.sort((a, b) => b?.id - a?.id);
        break;
      case 'rating':
        result?.sort((a, b) => b?.rating - a?.rating);
        break;
      case 'name':
        result?.sort((a, b) => a?.name?.localeCompare(b?.name));
        break;
      default:
        break;
    }

    return result;
  }, [mockTemplates, searchQuery, filters, sortBy]);

  const handlePreview = (template) => {
    setSelectedTemplate(template);
  };

  const handleSelect = (template) => {
    navigate('/website-builder', { state: { template } });
  };

  const handleClearFilters = () => {
    setFilters({
      category: 'all',
      industries: [],
      colorSchemes: [],
      layoutTypes: [],
      premiumOnly: false,
      featuredOnly: false
    });
    setSearchQuery('');
  };

  return (
    <div className="min-h-screen bg-background">
      <AdaptiveNavigationBar />
      <main className="max-w-7xl mx-auto px-4 py-6 md:py-8 lg:py-12">
        <div className="mb-6 md:mb-8">
          <h1 className="text-2xl md:text-3xl lg:text-4xl font-heading font-semibold text-foreground mb-2">
            Template Marketplace
          </h1>
          <p className="text-sm md:text-base text-muted-foreground">
            Discover professional website templates to kickstart your project
          </p>
        </div>

        <div className="mb-6 md:mb-8 space-y-4">
          <SearchBar searchQuery={searchQuery} onSearchChange={setSearchQuery} />
          
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Icon name="Layers" size={18} />
              <span className="hidden sm:inline">
                {filteredAndSortedTemplates?.length} templates available
              </span>
              <span className="sm:hidden">
                {filteredAndSortedTemplates?.length} results
              </span>
            </div>
            <SortControls
              sortBy={sortBy}
              onSortChange={setSortBy}
              onToggleFilters={() => setIsMobileFilterOpen(true)} />

          </div>
        </div>

        <div className="lg:grid lg:grid-cols-[280px_1fr] lg:gap-8">
          <FilterPanel
            filters={filters}
            onFilterChange={setFilters}
            onClearFilters={handleClearFilters}
            resultCount={filteredAndSortedTemplates?.length}
            isMobileFilterOpen={isMobileFilterOpen}
            onCloseMobileFilter={() => setIsMobileFilterOpen(false)} />


          <div>
            {filteredAndSortedTemplates?.length > 0 ?
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 md:gap-6">
                {filteredAndSortedTemplates?.map((template) =>
              <TemplateCard
                key={template?.id}
                template={template}
                onPreview={handlePreview}
                onSelect={handleSelect} />

              )}
              </div> :

            <div className="text-center py-12 md:py-16 lg:py-20">
                <div className="w-16 h-16 md:w-20 md:h-20 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
                  <Icon name="Search" size={32} color="var(--color-muted-foreground)" />
                </div>
                <h3 className="text-lg md:text-xl font-heading font-semibold text-foreground mb-2">
                  No templates found
                </h3>
                <p className="text-sm md:text-base text-muted-foreground mb-6">
                  Try adjusting your filters or search query
                </p>
                <button
                onClick={handleClearFilters}
                className="text-sm md:text-base text-primary hover:underline font-caption font-medium">

                  Clear all filters
                </button>
              </div>
            }
          </div>
        </div>
      </main>
      {selectedTemplate &&
      <TemplatePreviewModal
        template={selectedTemplate}
        onClose={() => setSelectedTemplate(null)}
        onSelect={handleSelect} />

      }
    </div>);

};

export default TemplateMarketplace;
