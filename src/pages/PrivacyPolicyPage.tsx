import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Shield, Eye, Lock, UserCheck } from 'lucide-react';

const PrivacyPolicyPage: React.FC = () => {
  return (
    <div className="lg:ml-64 min-h-screen">
      {/* Header */}
      <div className="bg-gradient-to-r from-light-pink to-light-blue py-12 px-4">
        <div className="container mx-auto">
          <Link
            to="/"
            className="inline-flex items-center space-x-2 text-dark-gray hover:text-white transition-colors duration-300 mb-4"
          >
            <ArrowLeft size={20} />
            <span>Back to Home</span>
          </Link>
          
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
              <Shield size={24} className="text-dark-gray" />
            </div>
            <div>
              <h1 className="font-lora text-3xl md:text-4xl font-bold text-dark-gray">
                Privacy Policy
              </h1>
              <p className="text-dark-gray mt-2">
                How we protect and handle your personal information
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="py-16 px-4">
        <div className="container mx-auto max-w-4xl">
          <div className="bg-white rounded-lg shadow-lg p-8 space-y-8">
            
            {/* Last Updated */}
            <div className="bg-light-pink bg-opacity-20 rounded-lg p-4">
              <p className="text-sm text-dark-gray">
                <strong>Last Updated:</strong> January 2024
              </p>
            </div>

            {/* Introduction */}
            <section>
              <h2 className="font-lora text-2xl font-bold text-dark-gray mb-4 flex items-center space-x-2">
                <Eye size={24} className="text-light-pink" />
                <span>Introduction</span>
              </h2>
              <p className="text-gray-700 leading-relaxed">
                At Blossom Wrap Studio, we are committed to protecting your privacy and ensuring the security of your personal information. 
                This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website 
                or make purchases from us. This policy complies with Pakistani data protection laws and international best practices.
              </p>
            </section>

            {/* Information We Collect */}
            <section>
              <h2 className="font-lora text-2xl font-bold text-dark-gray mb-4">Information We Collect</h2>
              
              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold text-dark-gray mb-2">Personal Information</h3>
                  <ul className="list-disc list-inside text-gray-700 space-y-1">
                    <li>Name and contact information (email, phone number, address)</li>
                    <li>Billing and shipping addresses</li>
                    <li>Payment information (processed securely through our payment partners)</li>
                    <li>Order history and preferences</li>
                    <li>Account credentials (username, password)</li>
                  </ul>
                </div>

                <div>
                  <h3 className="font-semibold text-dark-gray mb-2">Automatically Collected Information</h3>
                  <ul className="list-disc list-inside text-gray-700 space-y-1">
                    <li>IP address and device information</li>
                    <li>Browser type and version</li>
                    <li>Pages visited and time spent on our website</li>
                    <li>Referring website information</li>
                    <li>Cookies and similar tracking technologies</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* How We Use Information */}
            <section>
              <h2 className="font-lora text-2xl font-bold text-dark-gray mb-4">How We Use Your Information</h2>
              <ul className="list-disc list-inside text-gray-700 space-y-2">
                <li>Process and fulfill your orders</li>
                <li>Communicate with you about your orders and account</li>
                <li>Provide customer support and respond to inquiries</li>
                <li>Send promotional emails and newsletters (with your consent)</li>
                <li>Improve our website and services</li>
                <li>Prevent fraud and ensure security</li>
                <li>Comply with legal obligations</li>
              </ul>
            </section>

            {/* Information Sharing */}
            <section>
              <h2 className="font-lora text-2xl font-bold text-dark-gray mb-4 flex items-center space-x-2">
                <Lock size={24} className="text-light-pink" />
                <span>Information Sharing and Disclosure</span>
              </h2>
              <p className="text-gray-700 mb-4">
                We do not sell, trade, or rent your personal information to third parties. We may share your information only in the following circumstances:
              </p>
              <ul className="list-disc list-inside text-gray-700 space-y-2">
                <li><strong>Service Providers:</strong> Trusted partners who help us operate our business (payment processors, shipping companies, email services)</li>
                <li><strong>Legal Requirements:</strong> When required by Pakistani law or to protect our rights and safety</li>
                <li><strong>Business Transfers:</strong> In the event of a merger, acquisition, or sale of assets</li>
                <li><strong>With Your Consent:</strong> When you explicitly agree to share information</li>
              </ul>
            </section>

            {/* Data Security */}
            <section>
              <h2 className="font-lora text-2xl font-bold text-dark-gray mb-4">Data Security</h2>
              <p className="text-gray-700 mb-4">
                We implement appropriate technical and organizational measures to protect your personal information:
              </p>
              <ul className="list-disc list-inside text-gray-700 space-y-2">
                <li>SSL encryption for data transmission</li>
                <li>Secure servers and databases</li>
                <li>Regular security audits and updates</li>
                <li>Limited access to personal information</li>
                <li>Employee training on data protection</li>
              </ul>
            </section>

            {/* Your Rights */}
            <section>
              <h2 className="font-lora text-2xl font-bold text-dark-gray mb-4 flex items-center space-x-2">
                <UserCheck size={24} className="text-light-pink" />
                <span>Your Rights</span>
              </h2>
              <p className="text-gray-700 mb-4">You have the following rights regarding your personal information:</p>
              <ul className="list-disc list-inside text-gray-700 space-y-2">
                <li><strong>Access:</strong> Request a copy of your personal information</li>
                <li><strong>Correction:</strong> Update or correct inaccurate information</li>
                <li><strong>Deletion:</strong> Request deletion of your personal information</li>
                <li><strong>Portability:</strong> Receive your data in a portable format</li>
                <li><strong>Opt-out:</strong> Unsubscribe from marketing communications</li>
                <li><strong>Complaint:</strong> File a complaint with relevant authorities</li>
              </ul>
            </section>

            {/* Cookies */}
            <section>
              <h2 className="font-lora text-2xl font-bold text-dark-gray mb-4">Cookies and Tracking</h2>
              <p className="text-gray-700 mb-4">
                We use cookies and similar technologies to enhance your browsing experience. You can control cookie settings through your browser preferences.
              </p>
              <div className="bg-gray-50 rounded-lg p-4">
                <h3 className="font-semibold text-dark-gray mb-2">Types of Cookies We Use:</h3>
                <ul className="list-disc list-inside text-gray-700 space-y-1">
                  <li><strong>Essential Cookies:</strong> Required for website functionality</li>
                  <li><strong>Analytics Cookies:</strong> Help us understand website usage</li>
                  <li><strong>Marketing Cookies:</strong> Used for personalized advertising</li>
                  <li><strong>Preference Cookies:</strong> Remember your settings and preferences</li>
                </ul>
              </div>
            </section>

            {/* International Transfers */}
            <section>
              <h2 className="font-lora text-2xl font-bold text-dark-gray mb-4">International Data Transfers</h2>
              <p className="text-gray-700">
                Your information may be transferred to and processed in countries outside Pakistan. We ensure appropriate safeguards 
                are in place to protect your information in accordance with this Privacy Policy and applicable laws.
              </p>
            </section>

            {/* Children's Privacy */}
            <section>
              <h2 className="font-lora text-2xl font-bold text-dark-gray mb-4">Children's Privacy</h2>
              <p className="text-gray-700">
                Our services are not intended for children under 13 years of age. We do not knowingly collect personal information 
                from children under 13. If you believe we have collected information from a child under 13, please contact us immediately.
              </p>
            </section>

            {/* Changes to Policy */}
            <section>
              <h2 className="font-lora text-2xl font-bold text-dark-gray mb-4">Changes to This Policy</h2>
              <p className="text-gray-700">
                We may update this Privacy Policy from time to time. We will notify you of any material changes by posting the 
                new Privacy Policy on this page and updating the "Last Updated" date. Your continued use of our services after 
                any changes constitutes acceptance of the updated policy.
              </p>
            </section>

            {/* Contact Information */}
            <section className="bg-light-pink bg-opacity-20 rounded-lg p-6">
              <h2 className="font-lora text-2xl font-bold text-dark-gray mb-4">Contact Us</h2>
              <p className="text-gray-700 mb-4">
                If you have any questions about this Privacy Policy or our data practices, please contact us:
              </p>
              <div className="space-y-2 text-gray-700">
                <p><strong>Email:</strong> privacy@blossomwrap.com</p>
                <p><strong>Phone:</strong> +92 300 1234567</p>
                <p><strong>Address:</strong> Lahore, Pakistan</p>
                <p><strong>WhatsApp:</strong> +92 300 1234567</p>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicyPage;