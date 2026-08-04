// Pixdyne's own mobile apps, and the legal / support surfaces each one
// needs published on the web.
//
// Why this file exists: Apple App Review and Google AdMob both require a
// reachable privacy-policy URL (and, for App Store listings, a support URL)
// before an app can ship. Those pages live under /<slug>/privacy and
// /<slug>/support; this array is what the /apps hub renders so adding a
// third app is a one-entry change.
//
// Deliberately NOT surfaced in the main navigation or the sitemap — these
// are store-compliance destinations, not marketing pages (see CLAUDE.md §13,
// 2026-08-04). The apps themselves are unreleased; do not add App Store or
// Play Store links here until the listings are actually live (§6 rule 8 —
// visible placeholders over fabricated content).

export interface PixdyneApp {
  readonly slug: string;
  readonly name: string;
  /** Localised name shown alongside the English one, when the app has one. */
  readonly altName?: string;
  /** One plain sentence — what the app does. Used verbatim on the hub page. */
  readonly summary: string;
  readonly platforms: string;
  readonly hasSupportPage: boolean;
}

export const PIXDYNE_APPS: readonly PixdyneApp[] = [
  {
    slug: 'pixcomic',
    name: 'PixComic',
    summary:
      'A comic reader that opens the archives already on your device — CBZ, ZIP, CBR, RAR, PDF and image folders — with Wi-Fi transfer from your computer and no account of any kind.',
    platforms: 'iPhone · iPad',
    hasSupportPage: true
  },
  {
    slug: 'haoroomie',
    name: 'Hao Roomie',
    altName: '好室友',
    summary:
      'A shared ledger for household costs: record an expense, pick who it covers, and let the app work out who owes whom.',
    platforms: 'iPhone · Android',
    hasSupportPage: true
  }
] as const;
