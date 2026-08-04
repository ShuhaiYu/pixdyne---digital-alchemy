import { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { BUSINESS, BUSINESS_FORMATTED } from '@/lib/data/business';

export const metadata: Metadata = {
  title: 'Hao Roomie — Support',
  description:
    'Help for Hao Roomie / 好室友, the shared-household expense splitter: accounts and sign-in, household sharing, subscriptions, data export, and account deletion.',
  alternates: {
    canonical: 'https://pixdyne.com/haoroomie/support'
  },
  openGraph: {
    title: 'Hao Roomie — Support | Pixdyne',
    description:
      'Help for Hao Roomie / 好室友: sign-in, household sharing, subscriptions, data export, and account deletion.',
    url: 'https://pixdyne.com/haoroomie/support',
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
    title: 'Hao Roomie — Support | Pixdyne',
    description: 'Help for Hao Roomie / 好室友: sign-in, sharing, subscriptions, and your data.'
  }
};

// Every answer below must be traceable to a statement already published in
// /haoroomie/privacy. Do not add UI-specific walkthroughs ("tap Settings →
// …") to this page unless the flow has been confirmed against the shipped
// build — an inaccurate support page is worse than a short one.
interface FaqItem {
  readonly q: string;
  readonly a: readonly string[];
}

const FAQ_EN: readonly FaqItem[] = [
  {
    q: 'How do I sign in?',
    a: [
      'You can sign in with an email address, a phone number, or an Apple or Google account. Whichever you choose becomes the identifier your household membership is attached to, so use the same one on every device.'
    ]
  },
  {
    q: 'What can the other people in my household see?',
    a: [
      'Members of a household you create or join can see the expenses and settlements recorded in it — amount, category, note, date, and who is included.',
      'They cannot see your account contact details. Your email address or phone number is never shown to other members.'
    ]
  },
  {
    q: 'I deleted an expense but it still affects the balance.',
    a: [
      'Deleted ledger records are soft-deleted — retained but hidden — rather than erased immediately. That is deliberate: it keeps a shared ledger reconcilable when two people edit the same period. If a balance still looks wrong after a delete, send us the household name and the date range and we will look at it.'
    ]
  },
  {
    q: 'How do I get my data out?',
    a: [
      'You can access and export your ledger from within the app. If you need an export in a format the app does not offer, email us and we will help.'
    ]
  },
  {
    q: 'I paid for Pro but the features are locked.',
    a: [
      'The subscription follows the store account you paid with — your Apple ID on iOS, your Google account on Android. Make sure you are signed in to the same one, then use the restore-purchases option in the app.',
      'We never receive or store your payment card details; the transaction is handled entirely by Apple or Google.'
    ]
  },
  {
    q: 'What is in Pro and what is free?',
    a: [
      'Receipt scanning — photographing a receipt and having the merchant, amount, date and category filled in automatically — is a Pro feature and is not in the free version. Everything else, including shared households and settlements, works without a subscription.'
    ]
  },
  {
    q: 'How do I delete my account and my data?',
    a: [
      `Email ${BUSINESS.email} from the address on your account and ask for deletion. We will action it within 30 days.`
    ]
  }
];

const FAQ_ZH: readonly FaqItem[] = [
  {
    q: '怎么登录？',
    a: [
      '可以用邮箱、手机号，或者 Apple / Google 账号登录。你选的那个就是账本成员身份绑定的标识，所以每台设备都用同一个。'
    ]
  },
  {
    q: '同一个账本里的其他人能看到什么？',
    a: [
      '你创建或加入的账本，其成员可以看到里面记录的开销与结算 —— 金额、分类、备注、日期、参与人。',
      '他们看不到你的账户联系方式。你的邮箱或手机号不会展示给其他成员。'
    ]
  },
  {
    q: '删了一笔开销，但余额还是受影响。',
    a: [
      '删除的账本记录采用软删除 —— 保留但隐藏，不会立即抹除。这是有意为之：两个人同时编辑同一时段时，共享账本仍然对得上账。如果删除后余额看起来仍然不对，把账本名称和日期区间发给我们，我们来查。'
    ]
  },
  {
    q: '怎么把数据导出来？',
    a: ['你可以在应用内访问并导出账本。如果需要 App 没提供的格式，发邮件给我们，我们来帮忙。']
  },
  {
    q: '买了 Pro，但功能还是锁着。',
    a: [
      '订阅跟着你付款用的商店账号走 —— iOS 上是 Apple ID，Android 上是 Google 账号。确认登录的是同一个，然后在 App 里用恢复购买。',
      '我们不接收也不存储你的银行卡信息；交易完全由 Apple 或 Google 处理。'
    ]
  },
  {
    q: 'Pro 和免费版分别有什么？',
    a: [
      '拍小票识别 —— 拍一张小票，自动填好商家、金额、日期和分类 —— 是 Pro 功能，免费版不含。其余功能，包括共享账本和结算，不订阅也能用。'
    ]
  },
  {
    q: '怎么删除账户和数据？',
    a: [`用你账户绑定的邮箱发信到 ${BUSINESS.email} 申请删除，我们会在 30 天内处理。`]
  }
];

function FaqList({ items }: { items: readonly FaqItem[] }) {
  return (
    <div className="mb-12">
      {items.map((item) => (
        <div key={item.q} className="mb-8 pb-8 border-b border-brand-black/10 last:border-b-0">
          <h2 className="font-bold text-base mb-3 text-brand-black">{item.q}</h2>
          {item.a.map((paragraph) => (
            <p key={paragraph} className="mb-3 text-brand-black/85">
              {paragraph}
            </p>
          ))}
        </div>
      ))}
    </div>
  );
}

export default function HaoRoomieSupportPage() {
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
        <p className="text-xs uppercase tracking-widest text-brand-muted mb-3">好室友 · Hao Roomie</p>
        <h1 className="text-4xl md:text-6xl font-serif italic mb-8">Support</h1>
        <p className="text-brand-black/85 mb-4">
          Hao Roomie splits shared household costs — a ledger you and your roommates keep together.
          The questions below cover most of what people write in about.
        </p>
        <p className="text-sm text-brand-black/85 mb-12">
          Privacy questions are answered on the{' '}
          <Link
            href="/haoroomie/privacy"
            className="underline underline-offset-2 hover:text-brand-black"
          >
            Hao Roomie privacy policy
          </Link>
          .
        </p>

        <FaqList items={FAQ_EN} />

        <section className="mb-12">
          <h2 className="font-bold uppercase tracking-widest text-sm mb-6 pb-3 border-b border-brand-black/15">
            Anything else
          </h2>
          <p className="mb-4 text-brand-black/85">
            Email{' '}
            <a
              href={`mailto:${BUSINESS.email}`}
              className="underline underline-offset-2 hover:text-brand-black"
            >
              {BUSINESS.email}
            </a>{' '}
            with your device model, your OS version, and what you were doing when it went wrong. You
            can also use the{' '}
            <Link href="/contact" className="underline underline-offset-2 hover:text-brand-black">
              contact form
            </Link>
            . We read every message.
          </p>
        </section>

        {/* ── 中文 ──────────────────────────────────────────────── */}
        <div className="mt-16 pt-8 border-t border-brand-black/10" />
        <p className="text-xs uppercase tracking-widest text-brand-muted mb-6">简体中文</p>
        <p className="text-brand-black/85 mb-12">
          好室友用来分摊合租开销 —— 一个你和室友一起记的账本。下面这些覆盖了大部分来信的问题。
        </p>

        <FaqList items={FAQ_ZH} />

        <section className="mb-12">
          <h2 className="font-bold uppercase tracking-widest text-sm mb-6 pb-3 border-b border-brand-black/15">
            其他问题
          </h2>
          <p className="mb-4 text-brand-black/85">
            发邮件到{' '}
            <a
              href={`mailto:${BUSINESS.email}`}
              className="underline underline-offset-2 hover:text-brand-black"
            >
              {BUSINESS.email}
            </a>
            ，附上设备型号、系统版本，以及出问题时你在做什么。也可以用
            <Link href="/contact" className="underline underline-offset-2 hover:text-brand-black">
              联系表单
            </Link>
            。每一封我们都会看。
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
