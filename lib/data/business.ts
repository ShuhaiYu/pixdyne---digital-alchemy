// Canonical business identity. Every NAP literal on the site flows from
// here — Organization schema, legal pages, footer, contact page.
//
// CLAUDE.md §14.1: this file is the single source of truth for business
// name, address, email, phone, and ABN. To change any field, edit it
// here only — every consumer reads from these constants. Never hardcode
// the same literal anywhere else.

export const BUSINESS = {
  name: 'Pixdyne',
  // Registered legal entity name (confirmed 2026-06-18, GBP claimed).
  // Surfaced as schema.org `legalName` to disambiguate the trading name
  // ("Pixdyne") from the registered company for Knowledge Panel / AI entity
  // resolution. Keep aligned with the Google Business Profile listing.
  legalName: 'Pixdyne Pty Ltd',
  abn: '96 690 116 584',
  email: 'info@pixdyne.com',
  phone: {
    // UI display form (spaces). Used by SiteFooter, ContactSection.
    display: '+61 410 510 751',
    // E.164 with no separators. Used by tel: hrefs.
    tel: '+61410510751',
    // schema.org canonical form (dashes). Used by ContactPoint.telephone.
    schema: '+61-410-510-751'
  },
  address: {
    street: '294 Clayton Rd',
    locality: 'Clayton',
    region: 'VIC',
    postalCode: '3169',
    country: 'Australia',
    // ISO 3166-1 alpha-2. Used by PostalAddress.addressCountry.
    countryCode: 'AU',
    // GeoCoordinates of the GBP map pin (294 Clayton Rd). Sourced from the
    // owner-provided Google Maps place link, 2026-06-18. Used by
    // ProfessionalService.geo.
    lat: -37.9254886,
    lng: 145.119953
  },
  // Verified external profiles for schema.org `sameAs` (entity disambiguation).
  // Google Business Profile share URL, owner-provided 2026-06-18. Add verified
  // @pixdyne (X) / linkedin.com/company/pixdyne here once confirmed.
  sameAs: ['https://share.google/KUOToBcnB5z1nN1wE'],
  // Business hours matching the GBP listing (owner-confirmed 2026-06-18):
  // Monday–Friday, 09:00–17:00 AEST. Used by openingHoursSpecification.
  hours: {
    days: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
    opens: '09:00',
    closes: '17:00'
  }
} as const;

// Pre-composed presentation strings. Build by reading from BUSINESS so
// they stay in sync with any single-field change above.
export const BUSINESS_FORMATTED = {
  // "294 Clayton Rd, Clayton VIC 3169, Australia" — used inline in legal
  // prose and inside descriptions.
  addressLine: `${BUSINESS.address.street}, ${BUSINESS.address.locality} ${BUSINESS.address.region} ${BUSINESS.address.postalCode}, ${BUSINESS.address.country}`,
  // "Pixdyne, 294 Clayton Rd, Clayton VIC 3169, Australia" — used in
  // legal page Contact sections (postal mail label).
  mailLine: `${BUSINESS.name}, ${BUSINESS.address.street}, ${BUSINESS.address.locality} ${BUSINESS.address.region} ${BUSINESS.address.postalCode}, ${BUSINESS.address.country}`,
  // "ABN 96 690 116 584" — display form with the ABN prefix.
  abnLabel: `ABN ${BUSINESS.abn}`
} as const;
