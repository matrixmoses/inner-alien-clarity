import { Mail } from "lucide-react";
import { Logo } from "@/components/Logo";
import { Button } from "@/components/ui/button";
import { MobileNav } from "@/components/MobileNav";
import { Link } from "react-router-dom";

const TermsOfService = () => {
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
          <h1 className="text-3xl font-bold mb-8">Terms of Service</h1>
          <p className="text-sm text-gray-600 mb-8">
            Effective Date: November 16, 2024<br />
            Last Updated: November 16, 2024
          </p>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">1. Acceptance of Terms</h2>
            <p>
              By accessing or using TheInnerAlien.co ("the Website"), you agree to comply with and be bound by these Terms of Service ("Terms"). If you do not agree, please do not use our services.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">2. Services Provided</h2>
            <p>The Inner Alien provides tools, resources, and community features to help individuals manage anxiety, procrastination, and related issues. These services may include but are not limited to:</p>
            <ul className="list-disc pl-6">
              <li>Access to resources, tools, and platforms.</li>
              <li>Subscription-based tiers (Free, Pro, and Elite plans).</li>
              <li>Community interactions via Discord or other forums.</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">3. User Responsibilities</h2>
            <p>When using our Website or services, you agree to:</p>
            <ul className="list-disc pl-6">
              <li>Provide accurate and truthful information during signup.</li>
              <li>Use the services for lawful purposes only.</li>
              <li>Respect other users and refrain from harassment, hate speech, or any form of misconduct.</li>
              <li>Protect your account credentials and notify us immediately of unauthorized access.</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">4. Accounts and Subscriptions</h2>
            <h3 className="text-xl font-medium mb-2">4.1 Account Registration</h3>
            <p>You may need to register an account to access some features. You agree to provide accurate, complete, and updated information.</p>

            <h3 className="text-xl font-medium mb-2 mt-4">4.2 Subscription Plans</h3>
            <p>We offer different tiers, including Free, Pro, and Elite plans. Paid subscriptions are billed according to the plan selected and are non-refundable except as required by law.</p>

            <h3 className="text-xl font-medium mb-2 mt-4">4.3 Cancellation</h3>
            <p>You can cancel your subscription at any time. Cancellation will apply at the end of the current billing cycle.</p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">5. Payments and Refunds</h2>
            <h3 className="text-xl font-medium mb-2">5.1 Payment Processing</h3>
            <p>All payments are processed securely by third-party payment providers. TheInnerAlien.co does not store credit card information.</p>

            <h3 className="text-xl font-medium mb-2 mt-4">5.2 Refund Policy</h3>
            <p>Refunds are only provided under specific circumstances outlined during the purchase process and as required by applicable law.</p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">6. Intellectual Property</h2>
            <p>All content on TheInnerAlien.co, including but not limited to text, graphics, logos, and software, is the property of The Inner Alien or its licensors. You may not copy, reproduce, or distribute content without prior written consent.</p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">7. Prohibited Activities</h2>
            <p>You agree not to:</p>
            <ul className="list-disc pl-6">
              <li>Use the Website for unlawful purposes.</li>
              <li>Disrupt or interfere with the Website or servers.</li>
              <li>Reverse-engineer or attempt to access the source code of any part of our services.</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">8. Disclaimer of Warranties</h2>
            <p>The Inner Alien provides services on an "as-is" and "as-available" basis. We make no warranties, either express or implied, about the functionality or suitability of our services.</p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">9. Limitation of Liability</h2>
            <p>To the fullest extent permitted by law:</p>
            <ul className="list-disc pl-6">
              <li>The Inner Alien shall not be liable for any indirect, incidental, or consequential damages arising from your use of the Website or services.</li>
              <li>Our liability is limited to the amount you paid for services in the past 12 months.</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">10. Third-Party Links</h2>
            <p>Our Website may contain links to third-party sites. We are not responsible for the content, privacy practices, or terms of these external sites.</p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">11. Termination</h2>
            <p>We reserve the right to suspend or terminate your account at our sole discretion if you violate these Terms or engage in any prohibited activity.</p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">12. Governing Law</h2>
            <p>These Terms shall be governed by and construed in accordance with the laws of California.</p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">13. Changes to These Terms</h2>
            <p>We reserve the right to update these Terms at any time. Changes will be notified by posting the updated Terms on this page with the updated effective date.</p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">14. Contact Us</h2>
            <p>For questions or concerns about these Terms, please contact us at:</p>
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

export default TermsOfService;