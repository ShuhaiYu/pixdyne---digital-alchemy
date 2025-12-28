import { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Terms of Service',
  description: 'Pixdyne terms of service. Read our terms and conditions for using our services.',
  alternates: {
    canonical: 'https://pixdyne.com/legal/terms'
  }
};

export default function TermsPage() {
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
        <h1 className="text-4xl md:text-6xl font-serif mb-8">Terms of Service</h1>
        <p className="text-sm font-mono text-gray-500 mb-12">LAST UPDATED: DECEMBER 2024</p>

        <div className="prose prose-lg">
          <h3 className="font-bold uppercase tracking-widest text-sm mb-4">1. Acceptance of Terms</h3>
          <p className="mb-8 text-gray-700">
            By accessing and using Pixdyne&apos;s website and services, you agree to be bound by these Terms
            of Service. If you do not agree to these terms, please do not use our services.
          </p>

          <h3 className="font-bold uppercase tracking-widest text-sm mb-4">2. Services</h3>
          <p className="mb-8 text-gray-700">
            Pixdyne provides web development, mobile application development, technical SEO, and IT support
            services. The specific scope of work, deliverables, and timelines will be outlined in a separate
            Master Services Agreement (MSA) or Statement of Work (SOW) for each project.
          </p>

          <h3 className="font-bold uppercase tracking-widest text-sm mb-4">3. Intellectual Property</h3>
          <p className="mb-8 text-gray-700">
            All code, designs, and strategies developed by Pixdyne remain our intellectual property until
            full payment is received. Upon completion of payment, rights are transferred to the client as
            per the Master Services Agreement (MSA). Pre-existing intellectual property, frameworks, and
            third-party licenses remain with their respective owners.
          </p>

          <h3 className="font-bold uppercase tracking-widest text-sm mb-4">4. Payment Terms</h3>
          <p className="mb-8 text-gray-700">
            Payment terms will be specified in the project agreement. Generally, we require a deposit before
            work begins, with remaining payments due upon milestone completion or project delivery. Late
            payments may incur interest charges as specified in the agreement.
          </p>

          <h3 className="font-bold uppercase tracking-widest text-sm mb-4">5. Limitation of Liability</h3>
          <p className="mb-8 text-gray-700">
            Pixdyne is not liable for indirect, incidental, special, consequential, or punitive damages,
            including but not limited to loss of profits, data, or business opportunities arising from
            the use of our services. Our total liability shall not exceed the amount paid by you for the
            specific service in question.
          </p>

          <h3 className="font-bold uppercase tracking-widest text-sm mb-4">6. Warranties and Disclaimers</h3>
          <p className="mb-8 text-gray-700">
            We provide rigorous testing and quality assurance, but services are provided &quot;as is&quot; without
            warranties of any kind, either express or implied. Final deployment responsibility and ongoing
            maintenance lie with the client&apos;s internal IT protocols unless otherwise specified.
          </p>

          <h3 className="font-bold uppercase tracking-widest text-sm mb-4">7. Termination</h3>
          <p className="mb-8 text-gray-700">
            Either party may terminate the service agreement with written notice as specified in the MSA.
            Upon termination, you are responsible for payment for all work completed up to the termination
            date.
          </p>

          <h3 className="font-bold uppercase tracking-widest text-sm mb-4">8. Governing Law</h3>
          <p className="mb-8 text-gray-700">
            These terms shall be governed by and construed in accordance with the laws of the State of
            California, without regard to its conflict of law provisions. Any disputes shall be resolved
            in the courts of Santa Clara County, California.
          </p>

          <h3 className="font-bold uppercase tracking-widest text-sm mb-4">9. Contact</h3>
          <p className="mb-8 text-gray-700">
            For questions about these Terms of Service, please contact us at:
            <br /><br />
            <strong>Email:</strong> legal@pixdyne.com<br />
            <strong>Address:</strong> 1200 Technology Dr, San Jose, CA 94089
          </p>
        </div>

        <div className="mt-12 pt-8 border-t border-black/10">
          <Link href="/legal/privacy" className="text-sm font-mono text-yellow-600 hover:text-black transition-colors">
            View Privacy Policy →
          </Link>
        </div>
      </div>
    </div>
  );
}
