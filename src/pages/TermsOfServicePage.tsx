import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, FileText, Scale, AlertTriangle, CheckCircle } from 'lucide-react';

const TermsOfServicePage: React.FC = () => {
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
              <FileText size={24} className="text-dark-gray" />
            </div>
            <div>
              <h1 className="font-lora text-3xl md:text-4xl font-bold text-dark-gray">
                Terms of Service
              </h1>
              <p className="text-dark-gray mt-2">
                Terms and conditions for using our services
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
                <Scale size={24} className="text-light-pink" />
                <span>Agreement to Terms</span>
              </h2>
              <p className="text-gray-700 leading-relaxed">
                Welcome to Blossom Wrap Studio. These Terms of Service ("Terms") govern your use of our website and services. 
                By accessing or using our services, you agree to be bound by these Terms. If you disagree with any part of these terms, 
                you may not access our services. These terms are governed by the laws of Pakistan.
              </p>
            </section>

            {/* About Our Services */}
            <section>
              <h2 className="font-lora text-2xl font-bold text-dark-gray mb-4">About Our Services</h2>
              <p className="text-gray-700 mb-4">
                Blossom Wrap Studio is a Pakistani e-commerce platform specializing in:
              </p>
              <ul className="list-disc list-inside text-gray-700 space-y-2">
                <li>Handmade flowers and decorative items</li>
                <li>Custom gift packaging and wrapping services</li>
                <li>Personalized calligraphy and artwork</li>
                <li>Birthday and special occasion gifts</li>
                <li>Couple gifts and romantic items</li>
                <li>Custom orders and bespoke creations</li>
              </ul>
            </section>

            {/* Account Registration */}
            <section>
              <h2 className="font-lora text-2xl font-bold text-dark-gray mb-4">Account Registration</h2>
              <div className="space-y-4">
                <p className="text-gray-700">
                  To access certain features of our service, you may be required to create an account. You agree to:
                </p>
                <ul className="list-disc list-inside text-gray-700 space-y-2">
                  <li>Provide accurate, current, and complete information</li>
                  <li>Maintain and update your account information</li>
                  <li>Keep your password secure and confidential</li>
                  <li>Accept responsibility for all activities under your account</li>
                  <li>Notify us immediately of any unauthorized use</li>
                </ul>
              </div>
            </section>

            {/* Orders and Payments */}
            <section>
              <h2 className="font-lora text-2xl font-bold text-dark-gray mb-4">Orders and Payments</h2>
              
              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold text-dark-gray mb-2">Order Process</h3>
                  <ul className="list-disc list-inside text-gray-700 space-y-1">
                    <li>All orders are subject to acceptance and availability</li>
                    <li>We reserve the right to refuse or cancel orders</li>
                    <li>Prices are in Pakistani Rupees (PKR) and include applicable taxes</li>
                    <li>Custom orders require advance payment or deposit</li>
                  </ul>
                </div>

                <div>
                  <h3 className="font-semibold text-dark-gray mb-2">Payment Methods</h3>
                  <ul className="list-disc list-inside text-gray-700 space-y-1">
                    <li>Cash on Delivery (COD) within Pakistan</li>
                    <li>Bank transfer to our designated accounts</li>
                    <li>Mobile payment services (JazzCash, Easypaisa)</li>
                    <li>Online payment gateways (where available)</li>
                  </ul>
                </div>

                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                  <div className="flex items-start space-x-2">
                    <AlertTriangle size={20} className="text-yellow-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-semibold text-yellow-800">Payment Security</h4>
                      <p className="text-yellow-700 text-sm">
                        We do not store credit card information. All online payments are processed through secure, 
                        PCI-compliant payment processors.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Shipping and Delivery */}
            <section>
              <h2 className="font-lora text-2xl font-bold text-dark-gray mb-4">Shipping and Delivery</h2>
              <ul className="list-disc list-inside text-gray-700 space-y-2">
                <li>We deliver nationwide across Pakistan</li>
                <li>Delivery times are estimates and may vary</li>
                <li>Risk of loss passes to you upon delivery</li>
                <li>You must inspect items upon delivery</li>
                <li>Additional charges may apply for remote areas</li>
                <li>We are not responsible for delays due to weather, customs, or courier issues</li>
              </ul>
            </section>

            {/* Returns and Refunds */}
            <section>
              <h2 className="font-lora text-2xl font-bold text-dark-gray mb-4">Returns and Refunds</h2>
              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold text-dark-gray mb-2">Return Eligibility</h3>
                  <ul className="list-disc list-inside text-gray-700 space-y-1">
                    <li>Items must be returned within 7 days of delivery</li>
                    <li>Items must be in original condition and packaging</li>
                    <li>Custom or personalized items cannot be returned</li>
                    <li>Perishable items are not eligible for return</li>
                  </ul>
                </div>

                <div>
                  <h3 className="font-semibold text-dark-gray mb-2">Refund Process</h3>
                  <ul className="list-disc list-inside text-gray-700 space-y-1">
                    <li>Refunds will be processed within 5-7 business days</li>
                    <li>Refunds will be made to the original payment method</li>
                    <li>Shipping costs are non-refundable unless item is defective</li>
                    <li>Return shipping costs are the customer's responsibility</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Intellectual Property */}
            <section>
              <h2 className="font-lora text-2xl font-bold text-dark-gray mb-4">Intellectual Property</h2>
              <p className="text-gray-700 mb-4">
                All content on our website, including but not limited to text, graphics, logos, images, and software, 
                is the property of Blossom Wrap Studio and is protected by Pakistani and international copyright laws.
              </p>
              <ul className="list-disc list-inside text-gray-700 space-y-2">
                <li>You may not reproduce, distribute, or create derivative works</li>
                <li>You may not use our trademarks without written permission</li>
                <li>Custom designs created for you remain your property after full payment</li>
                <li>We retain the right to showcase our work for promotional purposes</li>
              </ul>
            </section>

            {/* User Conduct */}
            <section>
              <h2 className="font-lora text-2xl font-bold text-dark-gray mb-4">User Conduct</h2>
              <p className="text-gray-700 mb-4">You agree not to:</p>
              <ul className="list-disc list-inside text-gray-700 space-y-2">
                <li>Use our services for any unlawful purpose</li>
                <li>Interfere with or disrupt our services</li>
                <li>Attempt to gain unauthorized access to our systems</li>
                <li>Upload malicious code or viruses</li>
                <li>Harass, abuse, or harm other users</li>
                <li>Violate any applicable laws or regulations</li>
                <li>Infringe on the rights of others</li>
              </ul>
            </section>

            {/* Limitation of Liability */}
            <section>
              <h2 className="font-lora text-2xl font-bold text-dark-gray mb-4">Limitation of Liability</h2>
              <div className="bg-gray-50 rounded-lg p-4">
                <p className="text-gray-700 mb-4">
                  To the maximum extent permitted by Pakistani law, Blossom Wrap Studio shall not be liable for:
                </p>
                <ul className="list-disc list-inside text-gray-700 space-y-2">
                  <li>Indirect, incidental, or consequential damages</li>
                  <li>Loss of profits, data, or business opportunities</li>
                  <li>Damages exceeding the amount paid for the specific product or service</li>
                  <li>Issues arising from third-party services or products</li>
                  <li>Delays or failures due to circumstances beyond our control</li>
                </ul>
              </div>
            </section>

            {/* Governing Law */}
            <section>
              <h2 className="font-lora text-2xl font-bold text-dark-gray mb-4">Governing Law and Jurisdiction</h2>
              <p className="text-gray-700">
                These Terms are governed by the laws of Pakistan. Any disputes arising from these Terms or your use of our services 
                will be subject to the exclusive jurisdiction of the courts of Lahore, Pakistan. We will attempt to resolve disputes 
                through good faith negotiations before pursuing legal action.
              </p>
            </section>

            {/* Termination */}
            <section>
              <h2 className="font-lora text-2xl font-bold text-dark-gray mb-4">Termination</h2>
              <p className="text-gray-700 mb-4">
                We may terminate or suspend your account and access to our services immediately, without prior notice, for any reason, 
                including breach of these Terms. Upon termination:
              </p>
              <ul className="list-disc list-inside text-gray-700 space-y-2">
                <li>Your right to use our services will cease immediately</li>
                <li>We may delete your account and data</li>
                <li>Outstanding orders will be handled according to our policies</li>
                <li>Provisions that should survive termination will remain in effect</li>
              </ul>
            </section>

            {/* Changes to Terms */}
            <section>
              <h2 className="font-lora text-2xl font-bold text-dark-gray mb-4">Changes to Terms</h2>
              <p className="text-gray-700">
                We reserve the right to modify these Terms at any time. We will notify users of material changes by posting 
                the updated Terms on our website and updating the "Last Updated" date. Your continued use of our services 
                after changes constitutes acceptance of the new Terms.
              </p>
            </section>

            {/* Contact Information */}
            <section className="bg-light-pink bg-opacity-20 rounded-lg p-6">
              <h2 className="font-lora text-2xl font-bold text-dark-gray mb-4 flex items-center space-x-2">
                <CheckCircle size={24} className="text-green-600" />
                <span>Contact Us</span>
              </h2>
              <p className="text-gray-700 mb-4">
                If you have any questions about these Terms of Service, please contact us:
              </p>
              <div className="space-y-2 text-gray-700">
                <p><strong>Email:</strong> legal@blossomwrap.com</p>
                <p><strong>Phone:</strong> +92 300 1234567</p>
                <p><strong>Address:</strong> Lahore, Pakistan</p>
                <p><strong>WhatsApp:</strong> +92 300 1234567</p>
                <p><strong>Business Hours:</strong> Monday - Saturday, 9 AM - 8 PM</p>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TermsOfServicePage;