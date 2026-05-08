import { ServiceItem, CaseStudyItem, BlogPost } from '@/types';

export function generateOrganizationSchema() {
  // ProfessionalService is a subtype of LocalBusiness, so it covers local-SEO
  // signals while remaining accurate to what Pixdyne actually is.
  // sameAs and priceRange are intentionally omitted until the owner has
  // verified the underlying social handles and pricing positioning.
  return {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    '@id': 'https://pixdyne.com/#organization',
    name: 'Pixdyne',
    url: 'https://pixdyne.com',
    logo: 'https://pixdyne.com/logo.jpeg',
    image: 'https://pixdyne.com/logo_full.jpeg',
    description:
      'Melbourne-based long-term technology partner for SMBs. Since 2018, Pixdyne has built and operated websites, custom systems, and ongoing operations for Australian businesses, and brings real AI capability into client products.',
    foundingDate: '2018',
    address: {
      '@type': 'PostalAddress',
      streetAddress: '52 Monet Drive',
      addressLocality: 'Truganina',
      addressRegion: 'VIC',
      postalCode: '3029',
      addressCountry: 'AU'
    },
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: '+61-410-510-751',
      contactType: 'customer service',
      email: 'info@pixdyne.com',
      areaServed: 'AU',
      availableLanguage: ['English']
    },
    areaServed: [
      { '@type': 'City', name: 'Melbourne' },
      { '@type': 'AdministrativeArea', name: 'Victoria' },
      { '@type': 'Country', name: 'Australia' }
    ]
    // TBD: sameAs (verified social handles), priceRange, openingHoursSpecification,
    // aggregateRating — all pending owner confirmation. Do not invent.
  };
}

export function generateServiceSchema(service: ServiceItem) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: service.title,
    description: service.fullDescription,
    provider: {
      '@type': 'ProfessionalService',
      name: 'Pixdyne',
      url: 'https://pixdyne.com'
    },
    serviceType: service.title,
    offers: {
      '@type': 'Offer',
      price: service.price.replace(/[^0-9]/g, ''),
      priceCurrency: 'USD',
      availability: 'https://schema.org/InStock'
    }
  };
}

export function generateCaseStudySchema(work: CaseStudyItem) {
  return {
    '@context': 'https://schema.org',
    '@type': 'CreativeWork',
    name: work.name,
    description: work.challenge,
    creator: {
      '@type': 'Organization',
      name: 'Pixdyne'
    },
    dateCreated: work.year,
    about: {
      '@type': 'Thing',
      name: work.category
    }
  };
}

export function generateBlogPostSchema(post: BlogPost) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    description: post.excerpt,
    datePublished: post.date,
    author: {
      '@type': 'Organization',
      name: 'Pixdyne'
    },
    publisher: {
      '@type': 'Organization',
      name: 'Pixdyne',
      logo: {
        '@type': 'ImageObject',
        url: 'https://pixdyne.com/logo.jpeg'
      }
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `https://pixdyne.com/blog/${post.slug}`
    }
  };
}

export function generateBreadcrumbSchema(items: { name: string; url: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url
    }))
  };
}
