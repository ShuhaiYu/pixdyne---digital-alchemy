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

// Bilingual by owner decision 2026-08-06 (CLAUDE.md §15.2 rule 6). Every
// string is a paired object rather than two parallel arrays so the type
// checker refuses a half-translated edit — the failure mode that made the
// first bilingual attempt a liability. Answers must stay traceable to
// shipped behaviour (§15.2 rule 5): do not write a UI walkthrough here that
// has not been confirmed against the actual build.
type Locale = 'en' | 'zh';

interface Localised {
  readonly en: string;
  readonly zh: string;
}

interface FaqItem {
  readonly q: Localised;
  readonly a: readonly Localised[];
}

interface FaqGroup {
  readonly heading: Localised;
  readonly items: readonly FaqItem[];
}

const FAQ_GROUPS: readonly FaqGroup[] = [
  {
    heading: { en: 'Wi-Fi transfer', zh: 'Wi-Fi 传书' },
    items: [
      {
        // First in the group on purpose: transfers are PIN-protected by
        // default, so this gate is the first thing most people hit.
        q: {
          en: 'The page on my computer asks for a pairing code.',
          zh: '电脑上的网页要我输配对码。'
        },
        a: [
          {
            en: 'That is expected — transfers are PIN-protected out of the box. Before it accepts anything, the browser shows a Pairing code required gate.',
            zh: '这是正常的，传书默认带 PIN 保护。网页在收文件之前会先弹一个「需要配对码」的闸门。'
          },
          {
            en: 'The four digits are on the Wi-Fi transfer screen in PixComic, under Web access PIN; tap Change there to issue a new one, and re-enter it in the browser afterwards.',
            zh: '那 4 位数字就显示在 PixComic 的「传书」页上，标题是「网页访问 PIN」；点旁边的「换一个」可以换一组，换完电脑上要重新输一遍。'
          },
          {
            en: 'On a network you trust you can drop the gate altogether with Settings → Wi-Fi transfer → Require a PIN.',
            zh: '在信得过的网络里，也可以直接关掉 设置 → Wi-Fi 传书 → 需要 PIN 码，不再拿这道闸门。'
          }
        ]
      },
      {
        q: {
          en: "The address on my phone won't open on my computer.",
          zh: '手机上显示的地址，电脑打不开。'
        },
        a: [
          {
            en: 'Both devices must be on the same Wi-Fi network. A phone on cellular and a computer on Wi-Fi cannot see each other. Using your phone’s hotspot for the computer also works.',
            zh: '两台设备必须连同一个 Wi-Fi。手机用蜂窝数据、电脑用 Wi-Fi 是彼此相见不了的。用手机开热点给电脑连也可以。'
          },
          {
            en: 'Many office, university, hotel and public networks have client isolation turned on, which blocks devices from talking to each other. There is nothing an app can do about this. Use a home network, or turn on your phone’s hotspot and connect the computer to it.',
            zh: '很多公司、学校、酒店和公共网络开了客户端隔离，设备之间无法互连。这个 App 层面无解：换家里的网络，或者手机开热点让电脑连上来。'
          },
          {
            en: 'Make sure you allowed the Local Network permission when iOS asked. If you declined, go to iOS Settings → PixComic → Local Network and switch it on.',
            zh: '确认 iOS 弹出的「本地网络」权限你点了允许。如果拒绝了，去 iOS 设置 → PixComic → 本地网络 打开。'
          },
          {
            en: 'Type the address exactly as shown, including http:// and the :8080 port. Some browsers try to search instead of navigating — press Enter after the full address.',
            zh: '地址要完整输入，包括 http:// 和 :8080 端口。有些浏览器会把它当成搜索词，输完整再按回车。'
          }
        ]
      },
      {
        q: {
          en: 'The transfer screen never shows an address.',
          zh: '传书页始终不显示地址。'
        },
        a: [
          {
            en: 'On cellular alone there is no address to show. PixComic lists only addresses a computer can actually reach — Wi-Fi, a wired adapter, or your iPhone’s Personal Hotspot — and a carrier address is none of those: it is not on your computer’s network, so no browser there could open it.',
            zh: '只有蜂窝数据时，本来就没有地址可显示。PixComic 只列电脑真正进得去的地址——Wi-Fi、有线网卡，或者 iPhone 开的个人热点——运营商给的地址都不算，它不在电脑所在的网络里，电脑上的浏览器打不开。'
          },
          {
            en: 'What you get instead is a banner saying the device isn’t on Wi-Fi, and an address slot stuck on “Getting the address…”. A .local name may still be listed, but without a shared network it won’t connect either.',
            zh: '你看到的会是一条「手机没有连上 Wi-Fi」的提示，地址那一栏一直卡在「正在获取地址…」。列表里可能还留着一个 .local 名字，但两台设备不在同一个网络，它同样连不上。'
          },
          {
            en: 'Join a Wi-Fi network, or turn on Personal Hotspot and connect the computer to it — the address appears as soon as the phone has a local one.',
            zh: '连上 Wi-Fi，或者打开个人热点让电脑连过来，手机一拿到局域网地址，页面上就会出现。'
          }
        ]
      },
      {
        q: {
          en: 'The transfer stops when I switch apps or lock the screen.',
          zh: '切到别的 App 或锁屏，传输就断了。'
        },
        a: [
          {
            en: 'That is iOS suspending the app, and it is expected. Transfers keep going for about 25 seconds after you leave, then pause. When you come back, PixComic starts the transfer service again by itself — you do not have to switch it back on.',
            zh: '这是 iOS 挂起了 App，属于正常。离开后传输还会继续约 25 秒，然后暂停。回到 App 后，PixComic 会自动把传书服务重新起起来，不用你手动再开一次。'
          },
          {
            en: 'The browser is less patient. It retries a dropped upload three times over roughly 7 seconds, and after that marks the file Failed. So if you were away longer than that, drag that file into the page once more. It continues from the byte it had already reached rather than starting over, so even a nearly finished large file only costs you the drag.',
            zh: '浏览器那头没这么有耐心：一次断线它只重试 3 次、共约 7 秒，之后就把这个文件标为「失败」。所以离开时间超过这个数，回来后把那个文件再拖进网页一次。它会从已经传到的字节继续，不会从头再来，就算是快传完的大文件，代价也只是重拖一下。'
          },
          {
            en: 'For a long transfer, leave the transfer screen open in the foreground and it never comes up.',
            zh: '传大文件时把传书页留在前台，这一步根本不会遇到。'
          }
        ]
      },
      {
        q: {
          en: 'A large file failed partway through.',
          zh: '大文件传到一半失败了。'
        },
        a: [
          {
            en: 'Just drag it in again. PixComic recognises the file and continues from the byte it reached rather than starting over.',
            zh: '再拖一次就行。PixComic 会认出这个文件，从上次传到的字节继续，不会从头再来。'
          }
        ]
      }
    ]
  },
  {
    heading: { en: 'Files and formats', zh: '文件与格式' },
    items: [
      {
        q: {
          en: "My .cbr file won't open.",
          zh: '.cbr 打不开。'
        },
        a: [
          {
            en: 'Multi-part archives are not supported. If your file is named something like book.part1.rar, it is one piece of a set. Join the parts back into a single .rar or .cbz on your computer first.',
            zh: '不支持分卷压缩包。如果文件名类似 book.part1.rar，那它只是一套里的一片。先在电脑上合并成单个 .rar 或 .cbz。'
          },
          {
            en: 'Password-protected archives are not supported. Remove the password first.',
            zh: '不支持加密压缩包。先去掉密码。'
          }
        ]
      },
      {
        q: {
          en: 'The filenames are garbled, or the pages are in the wrong order.',
          zh: '文件名乱码，或者页面顺序不对。'
        },
        a: [
          {
            en: 'PixComic detects Shift-JIS, GBK, EUC-KR and CP437 filenames automatically, and sorts pages naturally so page 2 comes before page 10. If a specific archive still comes out wrong, email it to us — that is a bug we want to see.',
            zh: 'PixComic 会自动识别 Shift-JIS、GBK、EUC-KR、CP437 文件名，并按自然顺序排页（第 2 页排在第 10 页前面）。如果某个压缩包仍然不对，把它发给我们——那是我们想看到的 bug。'
          }
        ]
      },
      {
        q: {
          en: 'Nothing shows up after I transfer a file.',
          zh: '传完之后书架上没有东西。'
        },
        a: [
          {
            en: 'Check the format. PixComic reads CBZ, ZIP, CBR, RAR, PDF and folders of images. It cannot read 7z, EPUB or MOBI.',
            zh: '检查格式。PixComic 支持 CBZ、ZIP、CBR、RAR、PDF 和图片文件夹，不支持 7z、EPUB、MOBI。'
          }
        ]
      }
    ]
  },
  {
    heading: { en: 'Reading', zh: '阅读' },
    items: [
      {
        q: {
          en: "I can't find the toolbar, or I can't get back to my library.",
          zh: '找不到工具栏，或者怎么退回书架？'
        },
        a: [
          {
            en: 'Tap the middle of the screen. The left and right sides turn pages; the middle strip brings up the toolbar with the back button, the page slider and the thumbnail grid. The toolbar also appears for a couple of seconds each time you open a book.',
            zh: '点屏幕正中间。左右两侧是翻页，中间那条会唤出工具栏，里面有返回按钮、进度滑块和缩略图总览。每次打开一本书时工具栏也会自动出现两秒。'
          },
          {
            en: 'You can change which parts of the screen do what in Settings → Reader → Tap zones for page turns.',
            zh: '想改哪块区域负责什么，去 设置 → 阅读界面 → 点击翻页分区。'
          }
        ]
      },
      {
        q: {
          en: 'The pages turn the wrong way.',
          zh: '翻页方向反了。'
        },
        a: [
          {
            en: 'That is the reading direction. Japanese manga reads right-to-left, Western comics left-to-right. Change it globally in Settings → Default reading direction, or for one book from the ⋯ menu inside the reader.',
            zh: '那是阅读方向。日漫从右往左，欧美漫画从左往右。全局改在 设置 → 默认阅读方向；只改某一本，在阅读器里点 ⋯ 菜单。'
          }
        ]
      },
      {
        q: {
          en: 'Two pages are squashed together, or a spread is split across two screens.',
          zh: '两页挤在一起了，或者跨页被切成两屏。'
        },
        a: [
          {
            en: 'Three switches in Settings → Reading decide this, and each one fixes a different symptom.',
            zh: '设置 → 阅读 里有三个开关管这件事，各治一种症状。'
          },
          {
            en: 'Landscape spread (on by default) is what puts two pages side by side when you rotate the phone. If you would rather always read one page at a time, turn it off — or turn it off for a single book from the ⋯ menu inside the reader.',
            zh: '「横屏跨页」（默认开）负责在横屏时把两页并排显示。想一直一页一页地看，把它关掉；只针对某一本，在阅读器里点 ⋯ 菜单关。'
          },
          {
            en: 'Cover as single page (on by default) keeps the cover on its own so every later pair lines up with the printed book. Toggle this when the pairing is off by one: the right half of one scene sitting next to the left half of the next.',
            zh: '「封面单独成页」（默认开）让封面单独占一页，之后的配对才和印刷版对得上。如果对齐差了一页——一屏里左边是上一张的右半、右边是下一张的左半——就切换这一项。'
          },
          {
            en: 'Split wide pages (off by default) cuts one wide scan into two screens, which is how you read a printed spread on a portrait phone. If a single image is being sliced in half and you did not want that, this is the one to switch off.',
            zh: '「拆分宽页」（默认关）把一张横向的大图切成两屏，这是竖屏手机上看印刷跨页的方式。如果一张完整的图被无缘无故切成两半，要关的是它。'
          }
        ]
      }
    ]
  },
  {
    heading: { en: 'Purchases', zh: '购买' },
    items: [
      {
        q: {
          en: 'I paid but the ads are still there.',
          zh: '付了钱但广告还在。'
        },
        a: [
          {
            en: 'Open Settings → the tip row → Restore purchases (top left of that screen). Make sure you are signed in with the same Apple ID you used to pay.',
            zh: '打开 设置 → 打赏那一行 → 恢复购买（在那个页面左上角）。确认你登录的是当初付款的那个 Apple ID。'
          }
        ]
      },
      {
        q: {
          en: 'I have a new phone.',
          zh: '换了新手机。'
        },
        a: [
          {
            en: 'The purchase follows your Apple ID. Install PixComic, open the tip screen and tap Restore purchases. Your comics themselves do not transfer automatically — move them over with the Wi-Fi transfer feature, or restore an iCloud/Finder backup.',
            zh: '购买跟着 Apple ID 走。装上 PixComic，进打赏页点「恢复购买」即可。漫画本身不会自动同步——用 Wi-Fi 传书传过去，或者恢复 iCloud / 访达备份。'
          }
        ]
      }
    ]
  }
];

const STILL_STUCK = {
  heading: { en: 'Still stuck?', zh: '还是不行？' },
  intro: { en: 'Email', zh: '发邮件到' },
  introTail: { en: 'with:', zh: '，请附上：' },
  bullets: [
    {
      en: 'your device model and iOS version',
      zh: '设备型号和 iOS 版本'
    },
    {
      en: 'what you were doing when it went wrong',
      zh: '出问题时你在做什么'
    },
    {
      en: 'if it is about a specific file, the file itself if you can share it',
      zh: '如果是某个文件的问题，方便的话把文件一起发来'
    }
  ],
  outro: { en: 'We read every message. You can also use the', zh: '每一封我们都会看。也可以用' },
  formLabel: { en: 'contact form', zh: '联系表单' }
} as const;

const linkClass = 'underline underline-offset-2 hover:text-brand-black';

function FaqSections({ locale }: { locale: Locale }) {
  return (
    <>
      {FAQ_GROUPS.map((group) => (
        <section key={group.heading.en} className="mb-12">
          <h2 className="font-bold uppercase tracking-widest text-sm mb-6 pb-3 border-b border-brand-black/15">
            {group.heading[locale]}
          </h2>
          {group.items.map((item) => (
            <div key={item.q.en} className="mb-8">
              <h3 className="font-bold text-base mb-3 text-brand-black">{item.q[locale]}</h3>
              {item.a.map((paragraph) => (
                <p key={paragraph.en} className="mb-3 text-brand-black/85">
                  {paragraph[locale]}
                </p>
              ))}
            </div>
          ))}
        </section>
      ))}

      <section className="mb-12">
        <h2 className="font-bold uppercase tracking-widest text-sm mb-6 pb-3 border-b border-brand-black/15">
          {STILL_STUCK.heading[locale]}
        </h2>
        <p className="mb-4 text-brand-black/85">
          {STILL_STUCK.intro[locale]}{' '}
          <a href={`mailto:${BUSINESS.email}`} className={linkClass}>
            {BUSINESS.email}
          </a>{' '}
          {STILL_STUCK.introTail[locale]}
        </p>
        <ul className="list-disc pl-6 mb-6 text-brand-black/85 space-y-2">
          {STILL_STUCK.bullets.map((bullet) => (
            <li key={bullet.en}>{bullet[locale]}</li>
          ))}
        </ul>
        <p className="mb-8 text-brand-black/85">
          {STILL_STUCK.outro[locale]}{' '}
          <Link href="/contact" className={linkClass}>
            {STILL_STUCK.formLabel[locale]}
          </Link>
          .
        </p>
      </section>
    </>
  );
}

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
        <p className="text-sm text-brand-black/85 mb-4">
          Privacy questions are answered on the{' '}
          <Link href="/pixcomic/privacy" className={linkClass}>
            PixComic privacy policy
          </Link>
          .
        </p>
        <p className="text-sm text-brand-muted mb-12">
          <a href="#zh" className={linkClass}>
            中文版见本页下半部分
          </a>
        </p>

        <FaqSections locale="en" />

        {/* Simplified Chinese. Same answers, same order — the paired Localised
            type above is what keeps the two halves from drifting. */}
        {/* scroll-mt clears the fixed navigation, which would otherwise cover
            the heading when the in-page anchor above jumps here. */}
        <div id="zh" lang="zh-Hans" className="mt-20 pt-12 border-t-2 border-brand-black/20 scroll-mt-28">
          <h2 className="text-3xl md:text-5xl font-serif italic mb-8">支持</h2>
          <p className="text-brand-black/85 mb-4">遇到问题？大部分都是下面这几种。</p>
          <p className="text-sm text-brand-black/85 mb-12">
            隐私相关的问题见{' '}
            <Link href="/pixcomic/privacy" className={linkClass}>
              PixComic 隐私政策
            </Link>
            。
          </p>

          <FaqSections locale="zh" />
        </div>

        <div className="mt-12 pt-8 border-t border-brand-black/10">
          <p className="text-xs text-brand-muted">
            {BUSINESS_FORMATTED.mailLine} · {BUSINESS_FORMATTED.abnLabel}
          </p>
        </div>
      </div>
    </div>
  );
}
