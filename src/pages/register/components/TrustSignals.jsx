import React from 'react';
import Icon from '../../../components/AppIcon';

const TrustSignals = () => {
  const securityFeatures = [
  {
    icon: 'Shield',
    title: 'Bank-Level Security',
    description: 'Your data is encrypted with 256-bit SSL protection'
  },
  {
    icon: 'Lock',
    title: 'Privacy Protected',
    description: 'We never share your information with third parties'
  },
  {
    icon: 'CheckCircle',
    title: 'GDPR Compliant',
    description: 'Full compliance with international data protection laws'
  }];


  const testimonials = [
  {
    name: 'Sarah Mitchell',
    role: 'Small Business Owner',
    avatar: "https://img.rocket.new/generatedImages/rocket_gen_img_186600153-1763296403185.png",
    avatarAlt: 'Professional headshot of Caucasian woman with blonde hair in business attire smiling warmly',
    quote: 'Built my entire business website in under an hour. No coding knowledge needed!',
    rating: 5
  },
  {
    name: 'James Rodriguez',
    role: 'Freelance Designer',
    avatar: "https://img.rocket.new/generatedImages/rocket_gen_img_1d0132445-1763294014923.png",
    avatarAlt: 'Professional headshot of Hispanic man with short black hair in casual shirt with confident expression',
    quote: 'The template marketplace saved me countless hours. Highly recommend!',
    rating: 5
  },
  {
    name: 'Emily Chen',
    role: 'Marketing Consultant',
    avatar: "https://img.rocket.new/generatedImages/rocket_gen_img_1e54aa7dd-1763296071216.png",
    avatarAlt: 'Professional headshot of Asian woman with long dark hair in professional blazer with friendly smile',
    quote: 'Perfect for creating landing pages quickly. The drag-and-drop is intuitive.',
    rating: 5
  }];


  return (
    <div className="space-y-6 md:space-y-8">
      <div className="bg-muted/50 rounded-lg p-4 md:p-6">
        <h3 className="text-base md:text-lg font-heading font-semibold text-foreground mb-4">
          Your Security Matters
        </h3>
        <div className="space-y-3 md:space-y-4">
          {securityFeatures?.map((feature, index) =>
          <div key={index} className="flex items-start gap-3">
              <div className="w-8 h-8 md:w-10 md:h-10 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                <Icon name={feature?.icon} size={18} color="var(--color-primary)" />
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="text-sm md:text-base font-caption font-medium text-foreground mb-1">
                  {feature?.title}
                </h4>
                <p className="text-xs md:text-sm text-muted-foreground">
                  {feature?.description}
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
      <div className="space-y-4">
        <h3 className="text-base md:text-lg font-heading font-semibold text-foreground">
          Trusted by Thousands
        </h3>
        <div className="space-y-3 md:space-y-4">
          {testimonials?.map((testimonial, index) =>
          <div key={index} className="bg-card border border-border rounded-lg p-4">
              <div className="flex items-start gap-3 mb-3">
                <img
                src={testimonial?.avatar}
                alt={testimonial?.avatarAlt}
                className="w-10 h-10 md:w-12 md:h-12 rounded-full object-cover flex-shrink-0" />

                <div className="flex-1 min-w-0">
                  <h4 className="text-sm md:text-base font-caption font-medium text-foreground">
                    {testimonial?.name}
                  </h4>
                  <p className="text-xs md:text-sm text-muted-foreground">
                    {testimonial?.role}
                  </p>
                </div>
                <div className="flex gap-0.5">
                  {[...Array(testimonial?.rating)]?.map((_, i) =>
                <Icon key={i} name="Star" size={14} color="var(--color-warning)" className="fill-current" />
                )}
                </div>
              </div>
              <p className="text-xs md:text-sm text-muted-foreground italic">
                "{testimonial?.quote}"
              </p>
            </div>
          )}
        </div>
      </div>
      <div className="bg-primary/5 border border-primary/20 rounded-lg p-4 md:p-5">
        <div className="flex items-start gap-3">
          <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
            <Icon name="Users" size={20} color="var(--color-primary)" />
          </div>
          <div className="flex-1 min-w-0">
            <h4 className="text-sm md:text-base font-caption font-semibold text-foreground mb-1">
              Join 50,000+ Users
            </h4>
            <p className="text-xs md:text-sm text-muted-foreground">
              Thousands of professionals trust Web Ready Builder to create their online presence
            </p>
          </div>
        </div>
      </div>
    </div>);

};

export default TrustSignals;
