import { ServiceItem, CaseStudyItem, BlogPost } from '@/types';

export function generateOrganizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    name: 'Pixdyne',
    url: 'https://pixdyne.com',
    logo: 'https://pixdyne.com/logo.png',
    description: 'Premium IT Services: Web Development, App Development, Technical SEO, and IT Support.',
    address: {
      '@type': 'PostalAddress',
      streetAddress: '1200 Technology Dr',
      addressLocality: 'San Jose',
      addressRegion: 'CA',
      postalCode: '94089',
      addressCountry: 'US'
    },
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: '+1-555-012-3456',
      contactType: 'customer service',
      email: 'hello@pixdyne.com'
    },
    sameAs: [
      'https://twitter.com/pixdyne',
      'https://linkedin.com/company/pixdyne'
    ],
    areaServed: {
      '@type': 'Country',
      name: 'United States'
    },
    priceRange: '$$$',
    foundingDate: '2024'
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
        url: 'https://pixdyne.com/logo.png'
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
