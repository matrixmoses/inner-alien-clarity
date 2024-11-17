import { Mail } from "lucide-react";
import { Logo } from "@/components/Logo";
import { Button } from "@/components/ui/button";
import { MobileNav } from "@/components/MobileNav";
import { Link } from "react-router-dom";

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#9C8ADE]/10 to-[#6EC4A8]/10">
      {/* Header */}
      <header className="container mx-auto flex items-center justify-between px-4 py-6">
        <Logo />
        <div className="flex items-center gap-4">
          <Link to="/">
            <Button variant="outline">Back to Home</Button>
          </Link>
          <MobileNav />
        </div>
      </header>

      {/* Content */}
      <main className="container mx-auto px-4 py-12">
        <article className="prose prose-gray mx-auto max-w-4xl">
          <h1 className="text-3xl font-bold mb-8">Privacy Policy</h1>
          <p className="text-sm text-gray-600 mb-8">
            Effective Date: November 16, 2024<br />
            Last Updated: November 16, 2024
          </p>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">1. Introduction</h2>
            <p>
              Welcome to TheInnerAlien.co. Your privacy is critically important to us. This Privacy Policy explains how we collect, use, and protect your personal information when you visit or interact with our website or services.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">2. Information We Collect</h2>
            <h3 className="text-xl font-medium mb-2">2.1 Information You Provide</h3>
            <ul className="list-disc pl-6 mb-4">
              <li>Name, email address, and other contact details when signing up for services like waitlists, newsletters, or accounts.</li>
              <li>Payment information if purchasing paid tiers (handled by secure third-party payment processors).</li>
            </ul>

            <h3 className="text-xl font-medium mb-2">2.2 Information Collected Automatically</h3>
            <ul className="list-disc pl-6 mb-4">
              <li>IP address, browser type, operating system, and referring URLs.</li>
              <li>Cookies and similar technologies to improve your experience.</li>
            </ul>

            <h3 className="text-xl font-medium mb-2">2.3 Third-Party Data</h3>
            <p>Information from analytics providers like Google Analytics.</p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">3. How We Use Your Information</h2>
            <ul className="list-disc pl-6">
              <li>To provide and improve our services.</li>
              <li>To personalize your experience.</li>
              <li>To send updates, newsletters, and marketing materials.</li>
              <li>To comply with legal obligations.</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">4. How We Share Your Information</h2>
            <p>We do not sell or rent your personal information. We may share your data with:</p>
            <ul className="list-disc pl-6">
              <li>Service Providers: Third-party tools for payment processing, analytics, or email campaigns.</li>
              <li>Legal Authorities: When required by law.</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">5. Your Rights</h2>
            <ul className="list-disc pl-6">
              <li>Access and Update: Review and update your personal information.</li>
              <li>Opt-Out: Unsubscribe from emails or marketing communications at any time.</li>
              <li>Delete: Request deletion of your personal data, subject to legal obligations.</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">6. Cookies and Tracking Technologies</h2>
            <p>We use cookies to:</p>
            <ul className="list-disc pl-6 mb-4">
              <li>Understand user preferences.</li>
              <li>Analyze website traffic.</li>
              <li>Provide targeted advertisements.</li>
            </ul>
            <p>You can manage or disable cookies via your browser settings.</p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">7. Security</h2>
            <p>We implement secure protocols to protect your data. However, no method of transmission over the Internet is 100% secure.</p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">8. Third-Party Links</h2>
            <p>Our site may include links to external sites. We are not responsible for the privacy practices of these third parties.</p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">9. Children's Privacy</h2>
            <p>Our services are not directed at individuals under 13. We do not knowingly collect personal information from children.</p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">10. Changes to This Privacy Policy</h2>
            <p>We reserve the right to update this policy. Changes will be notified on this page with the updated effective date.</p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">11. Contact Us</h2>
            <p>For questions or concerns about this Privacy Policy, please contact us at:</p>
            <div className="mt-4">
              <p className="font-semibold">The Inner Alien</p>
              <div className="flex items-center gap-2 mt-2">
                <Mail className="h-4 w-4" />
                <a href="mailto:YourInnerAlien@gmail.com" className="text-[#9C8ADE] hover:underline">
                  YourInnerAlien@gmail.com
                </a>
              </div>
              <p className="mt-2">
                Website:{" "}
                <a href="https://TheInnerAlien.co" className="text-[#9C8ADE] hover:underline">
                  https://TheInnerAlien.co
                </a>
              </p>
            </div>
          </section>
        </article>
      </main>

      {/* Footer */}
      <footer className="bg-[#9C8ADE]/10 py-8">
        <div className="container mx-auto px-4 text-center text-sm text-gray-600">
          © {new Date().getFullYear()} TheInnerAlien.co. All rights reserved.
        </div>
      </footer>
    </div>
  );
};

export default PrivacyPolicy;