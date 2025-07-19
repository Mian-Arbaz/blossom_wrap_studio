import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Scale, Shield, AlertTriangle, Phone } from 'lucide-react';

const ConsumerRightsPage: React.FC = () => {
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
              <Scale size={24} className="text-dark-gray" />
            </div>
            <div>
              <h1 className="font-lora text-3xl md:text-4xl font-bold text-dark-gray">
                Consumer Rights
              </h1>
              <p className="text-dark-gray mt-2">
                Your rights as a consumer under Pakistani law
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="py-16 px-4">
        <div className="container mx-auto max-w-4xl">
          <div className="bg-white rounded-lg shadow-lg p-8 space-y-8">

            {/* Introduction */}
            <section>
              <h2 className="font-lora text-2xl font-bold text-dark-gray mb-6 flex items-center space-x-2">
                <Shield size={24} className="text-light-pink" />
                <span>Your Consumer Rights</span>
              </h2>
              <p className="text-gray-700 leading-relaxed mb-6">
                As a consumer in Pakistan, you are protected by various laws and regulations that ensure fair 
                treatment, quality products, and proper business practices. Blossom Wrap Studio is committed 
                to upholding these rights and providing transparent, ethical service.
              </p>
              
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
                <h3 className="font-semibold text-blue-800 mb-3">Legal Framework</h3>
                <p className="text-blue-700 text-sm">
                  Your rights are protected under the Consumer Protection Act, Competition Act 2010, 
                  Sale of Goods Act 1930, and other relevant Pakistani legislation.
                </p>
              </div>
            </section>

            {/* Fundamental Rights */}
            <section>
              <h2 className="font-lora text-2xl font-bold text-dark-gray mb-6">Fundamental Consumer Rights</h2>
              
              <div className="space-y-6">
                <div className="border border-gray-200 rounded-lg p-6">
                  <h3 className="font-semibold text-dark-gray mb-3">1. Right to Safety</h3>
                  <p className="text-gray-700 mb-2">
                    You have the right to protection against products that are hazardous to health and safety.
                  </p>
                  <ul className="list-disc list-inside text-gray-700 space-y-1 text-sm">
                    <li>All our products are made with safe, non-toxic materials</li>
                    <li>Proper safety warnings and usage instructions provided</li>
                    <li>Quality control measures ensure product safety</li>
                  </ul>
                </div>
                
                <div className="border border-gray-200 rounded-lg p-6">
                  <h3 className="font-semibold text-dark-gray mb-3">2. Right to Information</h3>
                  <p className="text-gray-700 mb-2">
                    You have the right to accurate information about products and services.
                  </p>
                  <ul className="list-disc list-inside text-gray-700 space-y-1 text-sm">
                    <li>Complete product descriptions and specifications</li>
                    <li>Clear pricing without hidden charges</li>
                    <li>Honest advertising and marketing materials</li>
                    <li>Transparent terms and conditions</li>
                  </ul>
                </div>
                
                <div className="border border-gray-200 rounded-lg p-6">
                  <h3 className="font-semibold text-dark-gray mb-3">3. Right to Choose</h3>
                  <p className="text-gray-700 mb-2">
                    You have the right to choose from a variety of products at competitive prices.
                  </p>
                  <ul className="list-disc list-inside text-gray-700 space-y-1 text-sm">
                    <li>Wide range of handmade products and services</li>
                    <li>Competitive and fair pricing</li>
                    <li>No forced bundling or unwanted services</li>
                    <li>Freedom to compare and select alternatives</li>
                  </ul>
                </div>
                
                <div className="border border-gray-200 rounded-lg p-6">
                  <h3 className="font-semibold text-dark-gray mb-3">4. Right to Redressal</h3>
                  <p className="text-gray-700 mb-2">
                    You have the right to seek remedy for unfair trade practices or defective products.
                  </p>
                  <ul className="list-disc list-inside text-gray-700 space-y-1 text-sm">
                    <li>Easy complaint and resolution process</li>
                    <li>Timely response to customer concerns</li>
                    <li>Fair compensation for damages or losses</li>
                    <li>Access to consumer courts and tribunals</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* E-commerce Rights */}
            <section>
              <h2 className="font-lora text-2xl font-bold text-dark-gray mb-6">E-commerce Consumer Rights</h2>
              <p className="text-gray-700 mb-4">
                Additional rights for online purchases under Pakistani e-commerce regulations:
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-green-50 border border-green-200 rounded-lg p-6">
                  <h3 className="font-semibold text-green-800 mb-3">Online Purchase Rights</h3>
                  <ul className="list-disc list-inside text-green-700 space-y-2">
                    <li>7-day cooling-off period for returns</li>
                    <li>Right to cancel orders before dispatch</li>
                    <li>Protection against online fraud</li>
                    <li>Secure payment processing</li>
                    <li>Clear delivery terms and timelines</li>
                  </ul>
                </div>
                
                <div className="bg-purple-50 border border-purple-200 rounded-lg p-6">
                  <h3 className="font-semibold text-purple-800 mb-3">Digital Rights</h3>
                  <ul className="list-disc list-inside text-purple-700 space-y-2">
                    <li>Privacy protection for personal data</li>
                    <li>Right to data portability</li>
                    <li>Protection against spam and unwanted communications</li>
                    <li>Secure handling of payment information</li>
                    <li>Transparent cookie and tracking policies</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Complaint Process */}
            <section>
              <h2 className="font-lora text-2xl font-bold text-dark-gray mb-6">How to File a Complaint</h2>
              
              <div className="space-y-6">
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
                  <h3 className="font-semibold text-yellow-800 mb-3 flex items-center space-x-2">
                    <AlertTriangle size={20} className="text-yellow-600" />
                    <span>Step 1: Contact Us Directly</span>
                  </h3>
                  <p className="text-yellow-700 mb-2">
                    First, try to resolve the issue directly with our customer service team:
                  </p>
                  <ul className="list-disc list-inside text-yellow-700 space-y-1">
                    <li>Email: complaints@blossomwrap.com</li>
                    <li>Phone: +92 300 1234567</li>
                    <li>WhatsApp: +92 300 1234567</li>
                    <li>Response time: Within 24 hours</li>
                  </ul>
                </div>
                
                <div className="bg-red-50 border border-red-200 rounded-lg p-6">
                  <h3 className="font-semibold text-red-800 mb-3">Step 2: External Authorities</h3>
                  <p className="text-red-700 mb-2">
                    If the issue is not resolved, you can contact:
                  </p>
                  <ul className="list-disc list-inside text-red-700 space-y-1">
                    <li>Consumer Protection Tribunals in your district</li>
                    <li>Competition Commission of Pakistan (CCP)</li>
                    <li>Federal Ombudsman for Protection against Harassment</li>
                    <li>Provincial Consumer Protection Departments</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Warranty and Guarantees */}
            <section>
              <h2 className="font-lora text-2xl font-bold text-dark-gray mb-6">Warranty and Guarantees</h2>
              <p className="text-gray-700 mb-4">
                Under Pakistani law, you are entitled to:
              </p>
              <ul className="list-disc list-inside text-gray-700 space-y-2">
                <li>Products that match their description and are fit for purpose</li>
                <li>Reasonable quality and durability for handmade items</li>
                <li>Free repair or replacement for manufacturing defects</li>
                <li>Refund if products fail to meet quality standards</li>
                <li>Clear warranty terms and conditions</li>
              </ul>
            </section>

            {/* Contact Information */}
            <section className="bg-light-pink bg-opacity-20 rounded-lg p-6">
              <h2 className="font-lora text-2xl font-bold text-dark-gray mb-4 flex items-center space-x-2">
                <Phone size={24} className="text-light-pink" />
                <span>Consumer Rights Support</span>
              </h2>
              <p className="text-gray-700 mb-4">
                Need help understanding your rights or filing a complaint? Contact our consumer rights team:
              </p>
              <div className="space-y-2 text-gray-700">
                <p><strong>Consumer Rights Officer:</strong> +92 300 1234567</p>
                <p><strong>Email:</strong> rights@blossomwrap.com</p>
                <p><strong>Legal Compliance:</strong> legal@blossomwrap.com</p>
                <p><strong>Support Hours:</strong> Monday - Saturday, 9 AM - 8 PM</p>
              </div>
              
              <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded">
                <p className="text-sm text-blue-700">
                  <strong>Know Your Rights:</strong> We provide free consultation on consumer rights and 
                  will guide you through the complaint process if needed.
                </p>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConsumerRightsPage;