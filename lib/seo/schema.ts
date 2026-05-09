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
      'Melbourne-based long-term technology partner. Since 2018, Pixdyne has built and operated websites, custom systems, and ongoing operations for Australian businesses, and brings real AI capability into client products.',
    foundingDate: '2018',
    // Australian Business Number (ABN). Schema.org `taxID` is the
    // closest standard property; consumers tolerant of free-text values
    // surface it correctly.
    taxID: 'ABN 96 690 116 584',
    address: {
      '@type': 'PostalAddress',
      streetAddress: '294 Clayton Rd',
      addressLocality: 'Clayton',
      addressRegion: 'VIC',
      postalCode: '3169',
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
  const base = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: service.title,
    description: service.fullDescription,
    provider: {
      '@type': 'ProfessionalService',
      '@id': 'https://pixdyne.com/#organization',
      name: 'Pixdyne',
      url: 'https://pixdyne.com'
    },
    serviceType: service.title,
    areaServed: [
      { '@type': 'City', name: 'Melbourne' },
      { '@type': 'AdministrativeArea', name: 'Victoria' }
    ]
  };

  // Only emit Offer when a real price exists. Inventing "$0" or stripping
  // a "Get a quote" string into "" would mislead structured-data consumers.
  const numericPrice = service.price?.replace(/[^0-9]/g, '');
  if (numericPrice) {
    return {
      ...base,
      offers: {
        '@type': 'Offer',
        price: numericPrice,
        priceCurrency: 'AUD',
        availability: 'https://schema.org/InStock'
      }
    };
  }

  return base;
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
