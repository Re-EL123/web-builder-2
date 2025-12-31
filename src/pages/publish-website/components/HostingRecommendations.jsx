import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const HostingRecommendations = () => {
  const hostingProviders = [
  {
    name: 'Netlify',
    logo: "https://img.rocket.new/generatedImages/rocket_gen_img_186d6c2d1-1765235362553.png",
    logoAlt: 'Netlify logo with teal and white branding on dark background showing modern cloud hosting platform',
    description: 'Free tier with automatic deployments and custom domains',
    features: ['Continuous deployment', 'Free SSL', 'CDN included'],
    difficulty: 'Beginner',
    pricing: 'Free tier available',
    recommended: true
  },
  {
    name: 'Vercel',
    logo: "https://img.rocket.new/generatedImages/rocket_gen_img_1cc175c33-1764807041079.png",
    logoAlt: 'Vercel logo featuring black triangle symbol on white background representing modern web deployment platform',
    description: 'Optimized for React applications with instant deployments',
    features: ['Zero configuration', 'Analytics', 'Edge network'],
    difficulty: 'Beginner',
    pricing: 'Free for personal projects',
    recommended: true
  },
  {
    name: 'GitHub Pages',
    logo: "https://img.rocket.new/generatedImages/rocket_gen_img_1beb7e3b6-1766995843323.png",
    logoAlt: 'GitHub logo showing iconic octocat mascot in black and white on gradient background',
    description: 'Host directly from your GitHub repository',
    features: ['Free hosting', 'Version control', 'Custom domains'],
    difficulty: 'Intermediate',
    pricing: 'Free',
    recommended: false
  },
  {
    name: 'AWS S3',
    logo: "https://img.rocket.new/generatedImages/rocket_gen_img_1815fd195-1764675850118.png",
    logoAlt: 'AWS logo with orange smile arrow on dark background representing Amazon Web Services cloud platform',
    description: 'Scalable cloud storage with global distribution',
    features: ['High availability', 'CloudFront CDN', 'Pay as you go'],
    difficulty: 'Advanced',
    pricing: 'Starting at $0.023/GB',
    recommended: false
  }];


  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case 'Beginner':
        return 'var(--color-success)';
      case 'Intermediate':
        return 'var(--color-warning)';
      case 'Advanced':
        return 'var(--color-error)';
      default:
        return 'var(--color-muted-foreground)';
    }
  };

  return (
    <div className="bg-card rounded-xl shadow-sm border border-border p-4 md:p-6 lg:p-8">
      <div className="flex items-center gap-3 mb-4 md:mb-6">
        <div className="w-10 h-10 md:w-12 md:h-12 bg-secondary/10 rounded-lg flex items-center justify-center">
          <Icon name="Server" size={24} color="var(--color-secondary)" />
        </div>
        <div>
          <h2 className="text-xl md:text-2xl lg:text-3xl font-heading font-semibold text-foreground">
            Hosting Recommendations
          </h2>
          <p className="text-xs md:text-sm text-muted-foreground">
            Choose a platform to deploy your website
          </p>
        </div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6">
        {hostingProviders?.map((provider, index) =>
        <div
          key={index}
          className={`p-4 md:p-6 rounded-lg border transition-smooth hover:shadow-md ${
          provider?.recommended ?
          'bg-primary/5 border-primary/30' : 'bg-background border-border hover:border-primary/20'}`
          }>

            {provider?.recommended &&
          <div className="flex items-center gap-2 mb-3">
                <Icon name="Star" size={16} color="var(--color-primary)" />
                <span className="text-xs font-caption font-medium text-primary">
                  Recommended
                </span>
              </div>
          }

            <div className="flex items-start gap-4 mb-4">
              <div className="w-12 h-12 md:w-16 md:h-16 rounded-lg overflow-hidden flex-shrink-0 bg-muted">
                <img
                src={provider?.logo}
                alt={provider?.logoAlt}
                className="w-full h-full object-cover" />

              </div>
              <div className="flex-1 min-w-0">
                <h3 className="text-base md:text-lg font-caption font-semibold text-foreground mb-1">
                  {provider?.name}
                </h3>
                <p className="text-xs md:text-sm text-muted-foreground line-clamp-2">
                  {provider?.description}
                </p>
              </div>
            </div>

            <div className="space-y-2 mb-4">
              {provider?.features?.map((feature, idx) =>
            <div key={idx} className="flex items-center gap-2">
                  <Icon name="Check" size={14} color="var(--color-success)" />
                  <span className="text-xs md:text-sm text-muted-foreground">
                    {feature}
                  </span>
                </div>
            )}
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-border">
              <div className="flex items-center gap-4">
                <div>
                  <div className="text-xs text-muted-foreground mb-1">
                    Difficulty
                  </div>
                  <div
                  className="text-sm font-caption font-medium"
                  style={{ color: getDifficultyColor(provider?.difficulty) }}>

                    {provider?.difficulty}
                  </div>
                </div>
                <div>
                  <div className="text-xs text-muted-foreground mb-1">
                    Pricing
                  </div>
                  <div className="text-sm font-caption font-medium text-foreground">
                    {provider?.pricing}
                  </div>
                </div>
              </div>
              <Button variant="outline" size="sm" iconName="ExternalLink">
                Learn More
              </Button>
            </div>
          </div>
        )}
      </div>
      <div className="mt-6 p-4 bg-accent/5 rounded-lg border border-accent/20">
        <div className="flex items-start gap-3">
          <Icon name="Lightbulb" size={20} color="var(--color-accent)" className="flex-shrink-0 mt-0.5" />
          <div>
            <h3 className="text-sm md:text-base font-caption font-medium text-foreground mb-1">
              Deployment Tip
            </h3>
            <p className="text-xs md:text-sm text-muted-foreground">
              For beginners, we recommend Netlify or Vercel. Simply drag and drop your ZIP file to their dashboard for instant deployment with automatic SSL and CDN.
            </p>
          </div>
        </div>
      </div>
    </div>);

};

export default HostingRecommendations;
