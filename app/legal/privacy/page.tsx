import { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'Pixdyne privacy policy. Learn how we collect, use, and protect your personal information.',
  alternates: {
    canonical: 'https://pixdyne.com/legal/privacy'
  }
};

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-white text-black p-8 md:p-24">
      <Link
        href="/"
        className="group flex items-center gap-2 text-sm font-mono text-gray-500 hover:text-black mb-12 transition-colors"
      >
        <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
        RETURN
      </Link>

      <div className="max-w-3xl">
        <h1 className="text-4xl md:text-6xl font-serif mb-8">Privacy Policy</h1>
        <p className="text-sm font-mono text-gray-500 mb-12">LAST UPDATED: DECEMBER 2024</p>

        <div className="prose prose-lg">
          <h3 className="font-bold uppercase tracking-widest text-sm mb-4">1. Information We Collect</h3>
          <p className="mb-8 text-gray-700">
            Pixdyne collects minimal data required to provide our services. When you use our contact forms,
            we store your name, email, and project details solely for communication purposes. We do not sell,
            rent, or trade your personal information to third parties.
          </p>

          <h3 className="font-bold uppercase tracking-widest text-sm mb-4">2. How We Use Your Information</h3>
          <p className="mb-8 text-gray-700">
            We use the information you provide to respond to your inquiries, deliver our services, and improve
            your experience on our website. We may also use anonymized, aggregated data for analytics purposes
            to understand how visitors interact with our site.
          </p>

          <h3 className="font-bold uppercase tracking-widest text-sm mb-4">3. Cookies and Tracking</h3>
          <p className="mb-8 text-gray-700">
            Our website uses essential cookies to ensure proper functionality. We may use analytics cookies
            (such as Google Analytics) to understand traffic patterns. You can disable cookies in your browser
            settings, though this may affect site functionality.
          </p>

          <h3 className="font-bold uppercase tracking-widest text-sm mb-4">4. Data Security</h3>
          <p className="mb-8 text-gray-700">
            We implement industry-standard security measures to protect your personal information. All data
            transmissions are encrypted using SSL/TLS protocols. However, no method of transmission over the
            internet is 100% secure.
          </p>

          <h3 className="font-bold uppercase tracking-widest text-sm mb-4">5. Your Rights</h3>
          <p className="mb-8 text-gray-700">
            You have the right to access, correct, or delete your personal data at any time. To exercise
            these rights, please contact us at privacy@pixdyne.com. We will respond to your request within
            30 days.
          </p>

          <h3 className="font-bold uppercase tracking-widest text-sm mb-4">6. Contact Us</h3>
          <p className="mb-8 text-gray-700">
            If you have any questions about this Privacy Policy, please contact us at:
            <br /><br />
            <strong>Email:</strong> privacy@pixdyne.com<br />
            <strong>Address:</strong> 1200 Technology Dr, San Jose, CA 94089
          </p>
        </div>

        <div className="mt-12 pt-8 border-t border-black/10">
          <Link href="/legal/terms" className="text-sm font-mono text-yellow-600 hover:text-black transition-colors">
            View Terms of Service →
          </Link>
        </div>
      </div>
    </div>
  );
}
