import { ServiceItem, CaseStudyItem, BlogPost } from '@/types';
import { BUSINESS, BUSINESS_FORMATTED } from '@/lib/data/business';

// Site-wide WebSite schema. Helps search engines and AI engines understand
// pixdyne.com as a discrete entity, separately from the underlying Organization.
// `inLanguage: en-AU` reinforces the AU locale and supports Australian SERP
// targeting alongside the OG `en_AU`.
export function generateWebSiteSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': 'https://pixdyne.com/#website',
    url: 'https://pixdyne.com',
    name: 'Pixdyne',
    description:
      'Melbourne-based long-term technology partner. Web development, custom systems, and ongoing operations since 2018.',
    publisher: { '@id': 'https://pixdyne.com/#organization' },
    inLanguage: 'en-AU'
  };
}

export function generateOrganizationSchema() {
  // ProfessionalService is a subtype of LocalBusiness, so it covers local-SEO
  // signals while remaining accurate to what Pixdyne actually is.
  // sameAs and priceRange are intentionally omitted until the owner has
  // verified the underlying social handles and pricing positioning.
  return {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    '@id': 'https://pixdyne.com/#organization',
    name: BUSINESS.name,
    url: 'https://pixdyne.com',
    // Schema-facing logo: solid-background variant so the mark stays
    // visible on Google's white search-result panel. The transparent
    // inverted-white logo used on the dark site itself would disappear
    // there.
    logo: 'https://pixdyne.com/logo-mark.png',
    image: 'https://pixdyne.com/og-image.png',
    description:
      'Melbourne-based long-term technology partner. Since 2018, Pixdyne has built and operated websites, custom systems, and ongoing operations for Australian businesses, and brings real AI capability into client products.',
    foundingDate: '2018',
    // Australian Business Number (ABN). Schema.org `taxID` is the
    // closest standard property; consumers tolerant of free-text values
    // surface it correctly.
    taxID: BUSINESS_FORMATTED.abnLabel,
    address: {
      '@type': 'PostalAddress',
      streetAddress: BUSINESS.address.street,
      addressLocality: BUSINESS.address.locality,
      addressRegion: BUSINESS.address.region,
      postalCode: BUSINESS.address.postalCode,
      addressCountry: BUSINESS.address.countryCode
    },
    // telephone is also surfaced at the top level for LocalBusiness
    // consumers that read it there instead of from contactPoint.
    telephone: BUSINESS.phone.schema,
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: BUSINESS.phone.schema,
      contactType: 'customer service',
      email: BUSINESS.email,
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
  // OnlyPixAI is the only tier='product' entry. It is a Pixdyne product
  // (not a service we sell), and the schema must reflect that or it
  // confuses LLM crawlers when they cite the page.
  if (service.tier === 'product') {
    return {
      '@context': 'https://schema.org',
      '@type': 'Product',
      name: service.title,
      description: service.fullDescription,
      brand: {
        '@type': 'Organization',
        '@id': 'https://pixdyne.com/#organization',
        name: 'Pixdyne'
      },
      manufacturer: {
        '@type': 'Organization',
        '@id': 'https://pixdyne.com/#organization',
        name: 'Pixdyne'
      },
      ...(service.externalUrl ? { url: service.externalUrl } : {}),
      category: 'AI Product'
      // TBD: image, offers, aggregateRating — pending owner confirmation.
    };
  }

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

// FAQPage schema slot — emit only when a service detail page has a real
// FAQ block. Inventing Q/A pairs is a truth-auditor violation. Returns
// null if no FAQ exists, so callers can short-circuit the <Script>.
export function generateFAQSchema(
  faqs: { question: string; answer: string }[]
): object | null {
  if (!faqs?.length) return null;
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((f) => ({
      '@type': 'Question',
      name: f.question,
      acceptedAnswer: { '@type': 'Answer', text: f.answer }
    }))
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
        url: 'https://pixdyne.com/logo-mark.png'
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

// CollectionPage + ItemList for index pages (e.g. /work, /blog). Helps
// search and AI engines recognise the page as an aggregation of items
// rather than a single piece of content. itemListElement uses ListItem
// with `url` pointers — Google reads this to surface site links.
export function generateCollectionPageSchema(opts: {
  url: string;
  name: string;
  description: string;
  items: { name: string; url: string }[];
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    '@id': `${opts.url}#collection`,
    url: opts.url,
    name: opts.name,
    description: opts.description,
    isPartOf: { '@id': 'https://pixdyne.com/#website' },
    mainEntity: {
      '@type': 'ItemList',
      numberOfItems: opts.items.length,
      itemListElement: opts.items.map((item, i) => ({
        '@type': 'ListItem',
        position: i + 1,
        name: item.name,
        url: item.url
      }))
    }
  };
}
