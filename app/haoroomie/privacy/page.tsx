import { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { BUSINESS, BUSINESS_FORMATTED } from '@/lib/data/business';

export const metadata: Metadata = {
  title: 'Hao Roomie — Privacy Policy',
  description: `How ${BUSINESS.name} (${BUSINESS_FORMATTED.abnLabel}) collects, uses, and protects personal information in the Hao Roomie / 好室友 expense-splitting app.`,
  alternates: {
    canonical: 'https://pixdyne.com/haoroomie/privacy'
  }
};

const lastUpdatedISO = '2026-06-07';
const lastUpdatedHuman = 'June 2026';

export default function HaoRoomiePrivacyPage() {
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
        <h1 className="text-4xl md:text-6xl font-serif italic mb-8">Privacy Policy</h1>
        <p className="text-xs uppercase tracking-wider text-brand-muted mb-2">
          Effective date:{' '}
          <time dateTime={lastUpdatedISO}>{lastUpdatedHuman.toUpperCase()}</time>
        </p>
        <p className="text-sm text-brand-black/85 mb-12">
          Provider: <strong>{BUSINESS.name}</strong> ({BUSINESS_FORMATTED.abnLabel}, Australia) ·
          Contact: {BUSINESS.email}
        </p>

        <div className="prose prose-lg">
          {/* ── English ───────────────────────────────────────────── */}
          <h2 className="font-bold uppercase tracking-widest text-sm mb-4">1. What we collect</h2>
          <ul className="list-disc pl-6 mb-8 text-brand-black/85 space-y-2">
            <li>
              <strong>Account:</strong> the identifier you sign in with — email or phone number, or an
              Apple / Google account identifier — plus a display name and avatar colour you choose.
            </li>
            <li>
              <strong>Ledger data:</strong> expenses you record (amount, category, note, date, who is
              included), household membership, invites, and settlements.
            </li>
            <li>
              <strong>Receipt images</strong> <em>(optional — Pro feature, not in the free version):</em>{' '}
              when you use receipt scanning, the photo you capture or select.
            </li>
            <li>
              <strong>Subscription status</strong> <em>(Pro):</em> whether you have an active
              &ldquo;Pixdyne Pro&rdquo; subscription (we do not receive or store your payment card details).
            </li>
          </ul>

          <h2 className="font-bold uppercase tracking-widest text-sm mb-4">2. How we use it</h2>
          <ul className="list-disc pl-6 mb-8 text-brand-black/85 space-y-2">
            <li>
              To provide the app: store your ledger, sync it across your devices and to the roommates you
              invite to a household, and compute balances and settlements.
            </li>
            <li>
              <strong>Receipt scanning</strong> <em>(Pro feature, not in the free version):</em> the receipt
              image is sent to our AI processor to extract fields (merchant, amount, date, category). We do
              not use your data to train AI models.
            </li>
            <li>To manage your subscription and provide customer support.</li>
          </ul>

          <h2 className="font-bold uppercase tracking-widest text-sm mb-4">3. Who processes your data (sub-processors)</h2>
          <ul className="list-disc pl-6 mb-8 text-brand-black/85 space-y-2">
            <li><strong>Supabase</strong> — database, authentication, file storage, hosted in Singapore (ap-southeast-1).</li>
            <li><strong>Google (Gemini API)</strong> <em>(Pro feature, not in the free version)</em> — receipt OCR processing of images you submit.</li>
            <li><strong>RevenueCat</strong> <em>(Pro)</em> — subscription management.</li>
            <li><strong>Apple / Google</strong> — sign-in (if you choose those methods) and in-app purchases.</li>
          </ul>
          <p className="mb-8 text-brand-black/85">
            We do <strong>not</strong> sell your personal data or share it for advertising.
          </p>

          <h2 className="font-bold uppercase tracking-widest text-sm mb-4">4. Sharing within the app</h2>
          <p className="mb-8 text-brand-black/85">
            Expense and settlement data is visible to the other members of a household you join or create.
            Your personal account contact (email / phone) is not shown to other members.
          </p>

          <h2 className="font-bold uppercase tracking-widest text-sm mb-4">5. Retention &amp; deletion</h2>
          <p className="mb-8 text-brand-black/85">
            We keep your data while your account is active. For financial integrity, deleted ledger records
            are soft-deleted (retained but hidden) rather than erased immediately. To delete your account and
            associated data, contact us at {BUSINESS.email}; we will action it within 30 days.
          </p>

          <h2 className="font-bold uppercase tracking-widest text-sm mb-4">6. Your rights</h2>
          <p className="mb-8 text-brand-black/85">
            You can access and export your ledger from within the app. Depending on your region (e.g. GDPR /
            PIPL / CCPA / the Australian Privacy Act) you may have rights to access, correct, or delete your
            data — contact us to exercise them.
          </p>

          <h2 className="font-bold uppercase tracking-widest text-sm mb-4">7. Children</h2>
          <p className="mb-8 text-brand-black/85">
            The app is not directed at children under 16. We do not knowingly collect their data.
          </p>

          <h2 className="font-bold uppercase tracking-widest text-sm mb-4">8. Changes</h2>
          <p className="mb-8 text-brand-black/85">
            We may update this policy; material changes will be noted in-app or on this page with a new
            effective date.
          </p>

          {/* ── 中文 ──────────────────────────────────────────────── */}
          <div className="mt-16 pt-8 border-t border-brand-black/10" />
          <h2 className="font-bold uppercase tracking-widest text-sm mb-4">1. 我们收集什么</h2>
          <ul className="list-disc pl-6 mb-8 text-brand-black/85 space-y-2">
            <li><strong>账户:</strong> 你用于登录的标识——邮箱或手机号,或 Apple / Google 账号标识——以及你设置的昵称和头像颜色。</li>
            <li><strong>账本数据:</strong> 你记录的开销(金额、分类、备注、日期、参与人)、账本成员关系、邀请、结算记录。</li>
            <li><strong>小票图片</strong> <em>(可选 —— Pro 功能,免费版不含):</em> 使用拍小票识别时,你拍摄或选择的照片。</li>
            <li><strong>订阅状态</strong> <em>(Pro):</em> 你是否拥有有效的「Pixdyne Pro」订阅(我们不接收也不存储你的银行卡信息)。</li>
          </ul>

          <h2 className="font-bold uppercase tracking-widest text-sm mb-4">2. 我们如何使用</h2>
          <ul className="list-disc pl-6 mb-8 text-brand-black/85 space-y-2">
            <li>提供应用功能:存储账本,在你的多设备间及你邀请进账本的室友间同步,计算余额与结算。</li>
            <li><strong>拍小票识别</strong> <em>(Pro 功能,免费版不含):</em> 小票图片会发送给我们的 AI 处理方以提取字段(商家、金额、日期、分类)。我们不会用你的数据训练 AI 模型。</li>
            <li>管理订阅与提供客户支持。</li>
          </ul>

          <h2 className="font-bold uppercase tracking-widest text-sm mb-4">3. 谁会处理你的数据(子处理方)</h2>
          <ul className="list-disc pl-6 mb-8 text-brand-black/85 space-y-2">
            <li><strong>Supabase</strong> —— 数据库、认证、文件存储,部署于新加坡(ap-southeast-1)。</li>
            <li><strong>Google(Gemini API)</strong> <em>(Pro 功能,免费版不含)</em> —— 对你提交的小票图片做 OCR 识别。</li>
            <li><strong>RevenueCat</strong> <em>(Pro)</em> —— 订阅管理。</li>
            <li><strong>Apple / Google</strong> —— 登录(若你选择)与应用内购买。</li>
          </ul>
          <p className="mb-8 text-brand-black/85">我们<strong>不</strong>出售你的个人数据,也不用于广告。</p>

          <h2 className="font-bold uppercase tracking-widest text-sm mb-4">4. 应用内的可见范围</h2>
          <p className="mb-8 text-brand-black/85">
            开销与结算数据对你加入或创建的账本的其他成员可见。你的账户联系方式(邮箱/手机号)不会展示给其他成员。
          </p>

          <h2 className="font-bold uppercase tracking-widest text-sm mb-4">5. 保留与删除</h2>
          <p className="mb-8 text-brand-black/85">
            账户存续期间我们会保留你的数据。出于财务完整性,删除的账本记录采用软删除(保留但隐藏),不会立即抹除。如需删除账户及相关数据,请联系 {BUSINESS.email},我们将在 30 天内处理。
          </p>

          <h2 className="font-bold uppercase tracking-widest text-sm mb-4">6. 你的权利</h2>
          <p className="mb-8 text-brand-black/85">
            你可以在应用内访问并导出账本。视所在地区(如 GDPR / 中国《个人信息保护法》/ CCPA / 澳大利亚隐私法),你可能享有访问、更正、删除数据的权利——联系我们行使。
          </p>

          <h2 className="font-bold uppercase tracking-widest text-sm mb-4">7. 未成年人</h2>
          <p className="mb-8 text-brand-black/85">本应用不面向 16 岁以下的未成年人,我们不会有意收集其数据。</p>

          <h2 className="font-bold uppercase tracking-widest text-sm mb-4">8. 变更</h2>
          <p className="mb-8 text-brand-black/85">我们可能更新本政策;重大变更会在应用内或本页以新的生效日期标注。</p>
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
