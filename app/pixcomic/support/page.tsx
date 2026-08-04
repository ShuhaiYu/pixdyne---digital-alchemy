import { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { BUSINESS, BUSINESS_FORMATTED } from '@/lib/data/business';

export const metadata: Metadata = {
  title: 'PixComic — Support',
  description:
    'Help for PixComic, the comic reader for iPhone and iPad: Wi-Fi transfer troubleshooting, supported file formats, reading controls, and restoring purchases.',
  alternates: {
    canonical: 'https://pixdyne.com/pixcomic/support'
  },
  openGraph: {
    title: 'PixComic — Support | Pixdyne',
    description:
      'Help for PixComic: Wi-Fi transfer, supported formats, reading controls, and restoring purchases.',
    url: 'https://pixdyne.com/pixcomic/support',
    // Root file-based opengraph-image does not propagate to nested routes;
    // reference the 1200×630 brand OG route so summary_large_image is valid.
    images: [{
      url: 'https://pixdyne.com/opengraph-image',
      width: 1200,
      height: 630,
      alt: 'Pixdyne — Melbourne technology partner since 2018'
    }]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'PixComic — Support | Pixdyne',
    description: 'Help for PixComic: Wi-Fi transfer, formats, reading controls, and purchases.'
  }
};

interface FaqItem {
  readonly q: string;
  readonly a: readonly string[];
}

interface FaqGroup {
  readonly heading: string;
  readonly items: readonly FaqItem[];
}

const FAQ_GROUPS: readonly FaqGroup[] = [
  {
    heading: 'Wi-Fi transfer',
    items: [
      {
        q: "The address on my phone won't open on my computer.",
        a: [
          'Both devices must be on the same Wi-Fi network. A phone on cellular and a computer on Wi-Fi cannot see each other. Using your phone’s hotspot for the computer also works.',
          'Many office, university, hotel and public networks have client isolation turned on, which blocks devices from talking to each other. There is nothing an app can do about this. Use a home network, or turn on your phone’s hotspot and connect the computer to it.',
          'Make sure you allowed the Local Network permission when iOS asked. If you declined, go to iOS Settings → PixComic → Local Network and switch it on.',
          'Type the address exactly as shown, including http:// and the :8080 port. Some browsers try to search instead of navigating — press Enter after the full address.'
        ]
      },
      {
        q: 'The transfer stops when I switch apps or lock the screen.',
        a: [
          'That is iOS suspending the app, and it is expected. Transfers keep going for about 25 seconds after you leave, then pause. When you come back the upload resumes from where it stopped — you never have to start over. For a large file, leave the transfer screen open in the foreground.'
        ]
      },
      {
        q: 'A large file failed partway through.',
        a: [
          'Just drag it in again. PixComic recognises the file and continues from the byte it reached rather than starting over.'
        ]
      }
    ]
  },
  {
    heading: 'Files and formats',
    items: [
      {
        q: "My .cbr file won't open.",
        a: [
          'Multi-part archives are not supported. If your file is named something like book.part1.rar, it is one piece of a set. Join the parts back into a single .rar or .cbz on your computer first.',
          'Password-protected archives are not supported. Remove the password first.'
        ]
      },
      {
        q: 'The filenames are garbled, or the pages are in the wrong order.',
        a: [
          'PixComic detects Shift-JIS, GBK, EUC-KR and CP437 filenames automatically, and sorts pages naturally so page 2 comes before page 10. If a specific archive still comes out wrong, email it to us — that is a bug we want to see.'
        ]
      },
      {
        q: 'Nothing shows up after I transfer a file.',
        a: [
          'Check the format. PixComic reads CBZ, ZIP, CBR, RAR, PDF and folders of images. It cannot read 7z, EPUB or MOBI.'
        ]
      }
    ]
  },
  {
    heading: 'Reading',
    items: [
      {
        q: "I can't find the toolbar, or I can't get back to my library.",
        a: [
          'Tap the middle of the screen. The left and right sides turn pages; the middle strip brings up the toolbar with the back button, the page slider and the thumbnail grid. The toolbar also appears for a couple of seconds each time you open a book.',
          'You can change which parts of the screen do what in Settings → Reading interface → Tap zones.'
        ]
      },
      {
        q: 'The pages turn the wrong way.',
        a: [
          'That is the reading direction. Japanese manga reads right-to-left, Western comics left-to-right. Change it globally in Settings → Default reading direction, or for one book from the ⋯ menu inside the reader.'
        ]
      },
      {
        q: 'Two pages are squashed together, or a spread is split across two screens.',
        a: [
          'In landscape, PixComic joins pages into printed spreads. If the alignment is off by one, toggle Cover on its own page in Settings — that is what shifts the pairing.'
        ]
      }
    ]
  },
  {
    heading: 'Purchases',
    items: [
      {
        q: 'I paid but the ads are still there.',
        a: [
          'Open Settings → the tip row → Restore purchases (top left of that screen). Make sure you are signed in with the same Apple ID you used to pay.'
        ]
      },
      {
        q: 'I have a new phone.',
        a: [
          'The purchase follows your Apple ID. Install PixComic, open the tip screen and tap Restore purchases. Your comics themselves do not transfer automatically — move them over with the Wi-Fi transfer feature, or restore an iCloud/Finder backup.'
        ]
      }
    ]
  }
];

export default function PixComicSupportPage() {
  return (
    <div className="min-h-screen bg-brand-white text-brand-black p-8 md:p-24">
      <Link
        href="/"
        className="group flex items-center gap-2 text-sm text-brand-muted hover:text-brand-black mb-12 transition-colors"
      >
        <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
        RETURN
      </Link>

      <div className="max-w-3xl">
        <p className="text-xs uppercase tracking-widest text-brand-muted mb-3">PixComic · Comic Reader</p>
        <h1 className="text-4xl md:text-6xl font-serif italic mb-8">Support</h1>
        <p className="text-brand-black/85 mb-4">
          Something not working? Most problems fall into one of the sections below.
        </p>
        <p className="text-sm text-brand-black/85 mb-12">
          Privacy questions are answered on the{' '}
          <Link href="/pixcomic/privacy" className="underline underline-offset-2 hover:text-brand-black">
            PixComic privacy policy
          </Link>
          .
        </p>

        {FAQ_GROUPS.map((group) => (
          <section key={group.heading} className="mb-12">
            <h2 className="font-bold uppercase tracking-widest text-sm mb-6 pb-3 border-b border-brand-black/15">
              {group.heading}
            </h2>
            {group.items.map((item) => (
              <div key={item.q} className="mb-8">
                <h3 className="font-bold text-base mb-3 text-brand-black">{item.q}</h3>
                {item.a.map((paragraph) => (
                  <p key={paragraph} className="mb-3 text-brand-black/85">
                    {paragraph}
                  </p>
                ))}
              </div>
            ))}
          </section>
        ))}

        <section className="mb-12">
          <h2 className="font-bold uppercase tracking-widest text-sm mb-6 pb-3 border-b border-brand-black/15">
            Still stuck?
          </h2>
          <p className="mb-4 text-brand-black/85">
            Email{' '}
            <a
              href={`mailto:${BUSINESS.email}`}
              className="underline underline-offset-2 hover:text-brand-black"
            >
              {BUSINESS.email}
            </a>{' '}
            with:
          </p>
          <ul className="list-disc pl-6 mb-6 text-brand-black/85 space-y-2">
            <li>your device model and iOS version</li>
            <li>what you were doing when it went wrong</li>
            <li>if it is about a specific file, the file itself if you can share it</li>
          </ul>
          <p className="mb-8 text-brand-black/85">
            We read every message. You can also use the{' '}
            <Link href="/contact" className="underline underline-offset-2 hover:text-brand-black">
              contact form
            </Link>
            .
          </p>
        </section>

        <div className="mt-12 pt-8 border-t border-brand-black/10">
          <p className="text-xs text-brand-muted">
            {BUSINESS_FORMATTED.mailLine} · {BUSINESS_FORMATTED.abnLabel}
          </p>
        </div>
      </div>
    </div>
  );
}
