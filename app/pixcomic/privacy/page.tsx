import { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { BUSINESS, BUSINESS_FORMATTED } from '@/lib/data/business';

export const metadata: Metadata = {
  title: 'PixComic — Privacy Policy',
  description: `How ${BUSINESS.name} (${BUSINESS_FORMATTED.abnLabel}) handles data in the PixComic comic reader for iPhone and iPad. Files stay on your device; only advertising data reaches Google.`,
  alternates: {
    canonical: 'https://pixdyne.com/pixcomic/privacy'
  },
  openGraph: {
    title: 'PixComic — Privacy Policy | Pixdyne',
    description: `How ${BUSINESS.name} handles data in the PixComic comic reader for iPhone and iPad.`,
    url: 'https://pixdyne.com/pixcomic/privacy',
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
    title: 'PixComic — Privacy Policy | Pixdyne',
    description: `How ${BUSINESS.name} handles data in the PixComic comic reader.`
  }
};

// Must stay in lockstep with PrivacyInfo.xcprivacy in the PixComic Xcode
// project and with the App Store privacy nutrition labels. Apple cross-checks
// all three; changing one without the others is an App Review rejection.
const lastUpdatedISO = '2026-08-06';
const lastUpdatedHuman = 'August 2026';

// Google AdMob SDK collection disclosure. Transcribed category for category
// from the privacy manifest bundled inside the Google Mobile Ads SDK, which
// is the same source Apple reads when it builds the App Store privacy label
// (it merges the app's own manifest with every SDK's). Keep all three in
// lockstep — this table, PrivacyInfo.xcprivacy, and the store label.
//
// Only the advertising identifier is declared as tracking. The rows that
// exist purely to diagnose the ad SDK are not linked to a user identity and
// must not be marked as tracking, or the page overstates what Google does.
// Bilingual by owner decision 2026-08-06 (CLAUDE.md §15.2 rule 6). Each cell
// is a paired object rather than two parallel tables so the type checker
// refuses a half-translated edit — with a disclosure that Apple cross-checks
// against two other artefacts, a silently drifting translation is the real
// hazard.
type Locale = 'en' | 'zh';

interface Localised {
  readonly en: string;
  readonly zh: string;
}

interface AdDataRow {
  readonly data: Localised;
  readonly why: Localised;
  readonly tracking: Localised;
}

const AD_DATA_ROWS: readonly AdDataRow[] = [
  {
    data: {
      en: 'Device identifiers (including the advertising identifier)',
      zh: '设备标识符（含广告标识符）'
    },
    why: { en: 'Serve and measure ads', zh: '投放和衡量广告' },
    tracking: { en: 'Yes, if you allow it', zh: '你允许的话，是' }
  },
  {
    data: {
      en: 'Advertising data (which ads were shown, tapped)',
      zh: '广告数据（展示了哪些广告、是否被点击）'
    },
    why: { en: 'Serve and measure ads', zh: '投放和衡量广告' },
    tracking: { en: 'No', zh: '否' }
  },
  {
    data: {
      en: 'Product interaction (app opens, session length)',
      zh: '产品交互（App 打开次数、使用时长）'
    },
    why: { en: 'Ad delivery and analytics', zh: '广告投放与分析' },
    tracking: { en: 'No', zh: '否' }
  },
  {
    data: {
      en: 'Coarse location (derived from IP address, city-level)',
      zh: '粗略位置（由 IP 推断，城市级）'
    },
    why: { en: 'Regionally relevant ads', zh: '投放地区相关的广告' },
    tracking: { en: 'No', zh: '否' }
  },
  {
    data: { en: 'Crash data', zh: '崩溃数据' },
    why: { en: 'Diagnosing crashes in the ad SDK', zh: '诊断广告 SDK 的崩溃' },
    tracking: { en: 'No', zh: '否' }
  },
  {
    data: {
      en: 'Performance data (load times, ad rendering)',
      zh: '性能数据（加载耗时、广告渲染）'
    },
    why: { en: 'Diagnosing problems in the ad SDK', zh: '诊断广告 SDK 的问题' },
    tracking: { en: 'No', zh: '否' }
  },
  {
    data: { en: 'Other diagnostic data', zh: '其它诊断数据' },
    why: { en: 'Diagnosing problems in the ad SDK', zh: '诊断广告 SDK 的问题' },
    tracking: { en: 'No', zh: '否' }
  }
];

const TABLE_HEADERS: readonly Localised[] = [
  { en: 'Data', zh: '数据' },
  { en: 'Why', zh: '用途' },
  { en: 'Used to track you?', zh: '是否用于追踪' }
];

const headingClass = 'font-bold uppercase tracking-widest text-sm mb-4';
const paraClass = 'mb-8 text-brand-black/85';
const listClass = 'list-disc pl-6 mb-8 text-brand-black/85 space-y-2';
// External legal references must be clickable for App Review, but this site
// lives on organic search — nofollow keeps link equity from leaking out.
const linkClass = 'underline underline-offset-2 hover:text-brand-black';

function AdDataTable({ locale }: { locale: Locale }) {
  return (
    <div className="overflow-x-auto mb-8">
      <table className="w-full text-sm text-left border-collapse">
        <thead>
          <tr className="border-b border-brand-black/20">
            {TABLE_HEADERS.map((header) => (
              <th key={header.en} className="py-3 pr-4 font-bold uppercase tracking-wider text-xs">
                {header[locale]}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {AD_DATA_ROWS.map((row) => (
            <tr key={row.data.en} className="border-b border-brand-black/10 align-top">
              <td className="py-3 pr-4 text-brand-black/85">{row.data[locale]}</td>
              <td className="py-3 pr-4 text-brand-black/85">{row.why[locale]}</td>
              <td className="py-3 text-brand-black/85">{row.tracking[locale]}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default function PixComicPrivacyPage() {
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
        <h1 className="text-4xl md:text-6xl font-serif italic mb-8">Privacy Policy</h1>
        <p className="text-xs uppercase tracking-wider text-brand-muted mb-2">
          Last updated:{' '}
          <time dateTime={lastUpdatedISO}>{lastUpdatedHuman.toUpperCase()}</time>
        </p>
        <p className="text-sm text-brand-black/85 mb-6">
          Developer: <strong>{BUSINESS.legalName}</strong> ({BUSINESS_FORMATTED.abnLabel},
          Melbourne, Australia) · Contact: {BUSINESS.email}
        </p>
        <p className="text-sm text-brand-muted mb-6">
          <a href="#zh" className={linkClass}>
            中文版见本页下半部分
          </a>
        </p>
        <p className="text-sm text-brand-black/85 mb-12">
          Need help using the app? See the{' '}
          <Link href="/pixcomic/support" className={linkClass}>
            PixComic support page
          </Link>
          .
        </p>

        <div className="prose prose-lg">
          <h2 className={headingClass}>The short version</h2>
          <p className={paraClass}>
            PixComic reads comic files that are already on your device. It has no accounts, no cloud,
            and no servers of ours. <strong>We never receive your files, your reading history, or
            anything else about how you use the app.</strong> The only company that receives any data
            is Google, and only to show advertisements in the free version.
          </p>

          <h2 className={headingClass}>What stays on your device, always</h2>
          <p className={paraClass}>
            Everything you put into PixComic stays on your iPhone or iPad:
          </p>
          <ul className={listClass}>
            <li>The comic archives you import</li>
            <li>Reading progress, bookmarks, titles, tags and covers</li>
            <li>All settings, including the theme and reading direction</li>
          </ul>
          <p className={paraClass}>
            None of this is transmitted anywhere. It lives in the app&rsquo;s own storage and is
            removed when you delete the app. If you have iCloud Backup enabled, your comics may be
            included in your own Apple backup — that is between you and Apple, and we have no access
            to it.
          </p>

          <h2 className={headingClass}>The Wi-Fi transfer feature</h2>
          <p className={paraClass}>
            When you turn on &ldquo;Transfer&rdquo; in the app, PixComic starts a small web server{' '}
            <strong>on your device</strong>, reachable only by computers on the same local network.
            Your files travel directly from your computer to your device.
          </p>
          <ul className={listClass}>
            <li>Nothing passes through any server operated by us or by anyone else.</li>
            <li>The server is not reachable from the internet.</li>
            <li>It stops when you turn it off or when the app is suspended by iOS.</li>
            <li>You can require a 4-digit PIN before any transfer is accepted.</li>
          </ul>

          <h2 className={headingClass}>Advertising (free version only)</h2>
          <p className={paraClass}>
            The free version shows advertisements supplied by <strong>Google AdMob</strong>. To do
            that, the Google Mobile Ads SDK may collect:
          </p>
          <AdDataTable locale="en" />
          <p className={paraClass}>
            This data is collected by Google, not by us. We never see it in a form that identifies
            you. The list above is copied category for category from the privacy manifest inside the
            Google Mobile Ads SDK, which is also why these categories appear on PixComic&rsquo;s App
            Store privacy label — Apple builds that label from the app plus every SDK bundled with
            it. Google&rsquo;s handling of the data is governed by the{' '}
            <a
              href="https://policies.google.com/privacy"
              className={linkClass}
              rel="nofollow noopener noreferrer"
              target="_blank"
            >
              Google Privacy Policy
            </a>{' '}
            and the{' '}
            <a
              href="https://policies.google.com/technologies/ads"
              className={linkClass}
              rel="nofollow noopener noreferrer"
              target="_blank"
            >
              Google Advertising Policies
            </a>
            .
          </p>
          <p className="mb-4 text-brand-black/85"><strong>Your control over this:</strong></p>
          <ul className={listClass}>
            <li>
              iOS will ask whether PixComic may track you across apps and websites (App Tracking
              Transparency). <strong>Declining that prompt changes nothing about how the app
              works</strong> — you still get every feature, and you still see ads, they are just
              less targeted.
            </li>
            <li>
              If you are in the EEA, the UK or Switzerland, you will see a separate consent form
              before any ads load. <strong>If you decline in that form, we will not show you any ads
              at all</strong> — the advertising SDK is not started. You can reopen the form any time
              from <strong>Settings → About → Ad privacy options</strong>.
            </li>
            <li>
              <strong>Tipping once removes ads permanently.</strong> From that moment there are no
              further ad requests, and from the next launch onwards the advertising SDK is not
              initialised at all: no consent prompt, no data collection, no network requests.
            </li>
          </ul>

          <h2 className={headingClass}>Purchases</h2>
          <p className={paraClass}>
            The one-off &ldquo;supporter&rdquo; purchase that removes ads is processed entirely by
            Apple through the App Store. <strong>We never receive your name, payment details or
            Apple ID.</strong> Apple tells the app only whether the purchase exists, so the app knows
            to hide the ads. See{' '}
            <a
              href="https://www.apple.com/legal/privacy/"
              className={linkClass}
              rel="nofollow noopener noreferrer"
              target="_blank"
            >
              Apple&rsquo;s Privacy Policy
            </a>{' '}
            for how Apple handles that transaction.
          </p>

          <h2 className={headingClass}>Children</h2>
          <p className={paraClass}>
            PixComic is not directed at children. Because you can import any file you like, the app
            is rated 17+. We do not knowingly collect information from children.
          </p>

          <h2 className={headingClass}>Your rights</h2>
          <p className={paraClass}>
            Since we hold no personal data about you, there is nothing on our side to access, correct
            or delete. For the data Google collects for advertising, use{' '}
            <a
              href="https://myadcenter.google.com/"
              className={linkClass}
              rel="nofollow noopener noreferrer"
              target="_blank"
            >
              Google&rsquo;s My Ad Center
            </a>{' '}
            or contact Google directly.
          </p>
          <p className={paraClass}>
            If you are in the EEA/UK, Australia, California or another region with specific privacy
            rights, those rights apply to Google as the data controller for advertising data. As the
            app developer we can only confirm what is written on this page: {BUSINESS.name} collects
            no data of its own, and the data collected by Google in the free version is listed in
            the table above.
          </p>

          <h2 className={headingClass}>Changes</h2>
          <p className={paraClass}>
            If this policy changes we will update the date at the top and note the change in the
            app&rsquo;s release notes. Material changes will be highlighted in the app.
          </p>

          <h2 className={headingClass}>Contact</h2>
          <p className={paraClass}>
            <strong>{BUSINESS.legalName}</strong>
            <br />
            Email:{' '}
            <a href={`mailto:${BUSINESS.email}`} className={linkClass}>
              {BUSINESS.email}
            </a>
            <br />
            {BUSINESS_FORMATTED.addressLine}
          </p>
        </div>

        {/* Simplified Chinese. Must say exactly what the English above says —
            this disclosure is cross-checked against PrivacyInfo.xcprivacy and
            the App Store privacy labels (CLAUDE.md §15.2 rule 4), so a
            translation that drifts is a review risk, not a cosmetic issue. */}
        {/* scroll-mt clears the fixed navigation, which would otherwise cover
            the heading when the in-page anchor above jumps here. */}
        <div id="zh" lang="zh-Hans" className="mt-20 pt-12 border-t-2 border-brand-black/20 scroll-mt-28">
          <h2 className="text-3xl md:text-5xl font-serif italic mb-6">隐私政策</h2>
          <p className="text-xs uppercase tracking-wider text-brand-muted mb-2">
            最后更新：<time dateTime={lastUpdatedISO}>2026 年 8 月 6 日</time>
          </p>
          <p className="text-sm text-brand-black/85 mb-12">
            PixComic 由 <strong>{BUSINESS.legalName}</strong>（{BUSINESS_FORMATTED.abnLabel}，
            澳大利亚墨尔本）开发。
          </p>

          <div className="prose prose-lg">
            <h3 className={headingClass}>一句话的版本</h3>
            <p className={paraClass}>
              PixComic 只读取你设备上已有的漫画文件。没有账号、没有云端，我们没有任何服务器。
              <strong>我们收不到你的文件、阅读记录，也收不到任何关于你如何使用这个 App
              的信息。</strong>唯一会收到数据的公司是 Google，且仅用于在免费版里展示广告。
            </p>

            <h3 className={headingClass}>永远留在你设备上的东西</h3>
            <p className={paraClass}>你放进 PixComic 的一切都留在你的 iPhone 或 iPad 上：</p>
            <ul className={listClass}>
              <li>你导入的漫画压缩包</li>
              <li>阅读进度、书签、书名、标签、封面</li>
              <li>全部设置，包括主题和阅读方向</li>
            </ul>
            <p className={paraClass}>
              这些数据不会传输到任何地方。它们保存在 App 自己的存储空间里，删除 App
              即一并删除。如果你开了 iCloud 备份，漫画可能会被包含在你自己的 Apple
              备份里——那是你和 Apple 之间的事，我们无法访问。
            </p>

            <h3 className={headingClass}>关于 Wi-Fi 传书</h3>
            <p className={paraClass}>
              当你在 App 里开启「传书」时，PixComic 会<strong>在你的设备上</strong>
              启动一个小型网页服务器，只有同一局域网内的电脑能访问。文件从你的电脑直接传到你的设备。
            </p>
            <ul className={listClass}>
              <li>不经过我们或任何第三方的服务器</li>
              <li>该服务器无法从公网访问</li>
              <li>你关闭它、或 iOS 挂起 App 时，它就停止</li>
              <li>你可以要求输入 4 位 PIN 码后才允许传输</li>
            </ul>

            <h3 className={headingClass}>广告（仅免费版）</h3>
            <p className={paraClass}>
              免费版展示由 <strong>Google AdMob</strong> 提供的广告。为此，Google Mobile Ads
              SDK 可能收集：
            </p>
            <AdDataTable locale="zh" />
            <p className={paraClass}>
              这些数据由 Google 收集，不经过我们。我们看不到任何能识别你身份的形式。上表逐条摘自
              Google Mobile Ads SDK 内置的隐私清单——商店页的隐私标签上之所以也会列出这些类别，
              是因为 Apple 会把 App 本身和它内置的每个 SDK 的声明合并起来生成那个标签。Google
              对这些数据的处理适用{' '}
              <a
                href="https://policies.google.com/privacy?hl=zh-CN"
                className={linkClass}
                rel="nofollow noopener noreferrer"
                target="_blank"
              >
                Google 隐私权政策
              </a>{' '}
              和{' '}
              <a
                href="https://policies.google.com/technologies/ads?hl=zh-CN"
                className={linkClass}
                rel="nofollow noopener noreferrer"
                target="_blank"
              >
                Google 广告政策
              </a>
              。
            </p>
            <p className="mb-4 text-brand-black/85"><strong>你可以怎么控制：</strong></p>
            <ul className={listClass}>
              <li>
                iOS 会询问是否允许 PixComic 跨 App 和网站追踪你（App Tracking Transparency）。
                <strong>拒绝这个追踪询问不会影响 App 的任何功能</strong>
                ——所有功能照常，广告照常展示，只是相关性降低。
              </li>
              <li>
                如果你在欧洲经济区、英国或瑞士，加载广告前还会再出现一份单独的同意书。
                <strong>如果你在同意书里选择拒绝，我们将不再向你展示任何广告</strong>
                ——广告 SDK 不会启动。同意书之后可以随时从{' '}
                <strong>设置 → 关于 → 广告隐私选项</strong> 重新打开。
              </li>
              <li>
                <strong>打赏一次即永久去除广告。</strong>打赏之后不再发任何广告请求；
                从下次启动开始，广告 SDK 完全不再初始化：不弹同意书、不收集数据、不发任何网络请求。
              </li>
            </ul>

            <h3 className={headingClass}>关于购买</h3>
            <p className={paraClass}>
              去除广告的一次性「支持者」购买完全由 Apple 通过 App Store 处理。
              <strong>我们收不到你的姓名、支付信息或 Apple ID。</strong>Apple
              只告诉 App 这笔购买是否存在，App 据此隐藏广告。Apple 如何处理该交易见{' '}
              <a
                href="https://www.apple.com/legal/privacy/"
                className={linkClass}
                rel="nofollow noopener noreferrer"
                target="_blank"
              >
                Apple 隐私政策
              </a>
              。
            </p>

            <h3 className={headingClass}>关于儿童</h3>
            <p className={paraClass}>
              PixComic 并非面向儿童。由于你可以导入任意文件，本 App 分级为 17+。
              我们不会有意收集儿童的信息。
            </p>

            <h3 className={headingClass}>你的权利</h3>
            <p className={paraClass}>
              由于我们不持有你的任何个人数据，我们这边没有可供访问、更正或删除的内容。
              对于 Google 为广告收集的数据，请使用{' '}
              <a
                href="https://myadcenter.google.com/"
                className={linkClass}
                rel="nofollow noopener noreferrer"
                target="_blank"
              >
                Google 我的广告中心
              </a>{' '}
              或直接联系 Google。
            </p>
            <p className={paraClass}>
              如果你位于欧洲经济区/英国、澳大利亚、加利福尼亚或其它有特定隐私权利的地区，
              这些权利针对的是作为广告数据控制者的 Google。作为 App 开发者，我们能确认的
              只有这个页面上写的：{BUSINESS.name} 自己不收集任何数据，免费版中由 Google
              收集的数据见上表。
            </p>

            <h3 className={headingClass}>政策变更</h3>
            <p className={paraClass}>
              本政策如果变更，我们会更新顶部的日期，并在 App 的版本更新说明里注明。
              重大变更会在 App 内明确提示。
            </p>

            <h3 className={headingClass}>联系方式</h3>
            <p className={paraClass}>
              <strong>{BUSINESS.legalName}</strong>
              <br />
              {BUSINESS_FORMATTED.abnLabel}
              <br />
              {BUSINESS_FORMATTED.addressLine}
              <br />
              邮箱：{' '}
              <a href={`mailto:${BUSINESS.email}`} className={linkClass}>
                {BUSINESS.email}
              </a>
            </p>
          </div>
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
