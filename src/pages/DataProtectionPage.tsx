import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Shield, Lock, Eye, Database } from 'lucide-react';

const DataProtectionPage: React.FC = () => {
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
                Data Protection Policy
              </h1>
              <p className="text-dark-gray mt-2">
                How we protect your personal information in compliance with Pakistani laws
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
                <Database size={24} className="text-light-pink" />
                <span>Data Protection Overview</span>
              </h2>
              <p className="text-gray-700 leading-relaxed mb-6">
                Blossom Wrap Studio is committed to protecting your personal data in accordance with Pakistani 
                data protection laws, including the Personal Data Protection Act and relevant regulations. 
                This policy explains how we collect, process, store, and protect your personal information.
              </p>
              
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
                <h3 className="font-semibold text-blue-800 mb-3">Our Data Protection Commitment</h3>
                <ul className="list-disc list-inside text-blue-700 space-y-2">
                  <li>Transparent data collection and processing practices</li>
                  <li>Secure storage and transmission of personal data</li>
                  <li>Compliance with Pakistani data protection regulations</li>
                  <li>Respect for individual privacy rights</li>
                  <li>Regular security audits and updates</li>
                </ul>
              </div>
            </section>

            {/* Data Collection */}
            <section>
              <h2 className="font-lora text-2xl font-bold text-dark-gray mb-6">What Data We Collect</h2>
              
              <div className="space-y-6">
                <div className="border border-gray-200 rounded-lg p-6">
                  <h3 className="font-semibold text-dark-gray mb-3">Personal Information</h3>
                  <ul className="list-disc list-inside text-gray-700 space-y-2">
                    <li>Name, email address, and phone number</li>
                    <li>Billing and shipping addresses</li>
                    <li>CNIC number (for verification purposes only)</li>
                    <li>Payment information (processed securely)</li>
                    <li>Order history and preferences</li>
                  </ul>
                </div>
                
                <div className="border border-gray-200 rounded-lg p-6">
                  <h3 className="font-semibold text-dark-gray mb-3">Technical Data</h3>
                  <ul className="list-disc list-inside text-gray-700 space-y-2">
                    <li>IP address and device information</li>
                    <li>Browser type and version</li>
                    <li>Website usage patterns</li>
                    <li>Cookies and tracking data</li>
                    <li>Location data (with consent)</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Legal Basis */}
            <section>
              <h2 className="font-lora text-2xl font-bold text-dark-gray mb-6">Legal Basis for Processing</h2>
              <p className="text-gray-700 mb-4">
                We process your personal data based on the following legal grounds under Pakistani law:
              </p>
              <ul className="list-disc list-inside text-gray-700 space-y-2">
                <li><strong>Contract Performance:</strong> To fulfill orders and provide services</li>
                <li><strong>Legitimate Interest:</strong> For business operations and customer service</li>
                <li><strong>Consent:</strong> For marketing communications and optional services</li>
                <li><strong>Legal Obligation:</strong> To comply with Pakistani tax and business laws</li>
                <li><strong>Vital Interest:</strong> To protect health and safety when necessary</li>
              </ul>
            </section>

            {/* Data Security */}
            <section>
              <h2 className="font-lora text-2xl font-bold text-dark-gray mb-6 flex items-center space-x-2">
                <Lock size={24} className="text-green-600" />
                <span>Data Security Measures</span>
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-green-50 border border-green-200 rounded-lg p-6">
                  <h3 className="font-semibold text-green-800 mb-3">Technical Safeguards</h3>
                  <ul className="list-disc list-inside text-green-700 space-y-2">
                    <li>SSL/TLS encryption for data transmission</li>
                    <li>Encrypted database storage</li>
                    <li>Regular security updates and patches</li>
                    <li>Firewall protection and intrusion detection</li>
                    <li>Secure backup and recovery systems</li>
                  </ul>
                </div>
                
                <div className="bg-purple-50 border border-purple-200 rounded-lg p-6">
                  <h3 className="font-semibold text-purple-800 mb-3">Administrative Controls</h3>
                  <ul className="list-disc list-inside text-purple-700 space-y-2">
                    <li>Limited access to personal data</li>
                    <li>Employee training on data protection</li>
                    <li>Regular security audits and assessments</li>
                    <li>Incident response procedures</li>
                    <li>Data retention and disposal policies</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Your Rights */}
            <section>
              <h2 className="font-lora text-2xl font-bold text-dark-gray mb-6 flex items-center space-x-2">
                <Eye size={24} className="text-blue-600" />
                <span>Your Data Protection Rights</span>
              </h2>
              <p className="text-gray-700 mb-4">
                Under Pakistani data protection laws, you have the following rights:
              </p>
              
              <div className="space-y-4">
                <div className="border border-gray-200 rounded-lg p-4">
                  <h3 className="font-semibold text-dark-gray mb-2">Right to Access</h3>
                  <p className="text-gray-700 text-sm">
                    Request a copy of all personal data we hold about you, including how it's being used.
                  </p>
                </div>
                
                <div className="border border-gray-200 rounded-lg p-4">
                  <h3 className="font-semibold text-dark-gray mb-2">Right to Rectification</h3>
                  <p className="text-gray-700 text-sm">
                    Request correction of inaccurate or incomplete personal information.
                  </p>
                </div>
                
                <div className="border border-gray-200 rounded-lg p-4">
                  <h3 className="font-semibold text-dark-gray mb-2">Right to Erasure</h3>
                  <p className="text-gray-700 text-sm">
                    Request deletion of your personal data when it's no longer necessary for the original purpose.
                  </p>
                </div>
                
                <div className="border border-gray-200 rounded-lg p-4">
                  <h3 className="font-semibold text-dark-gray mb-2">Right to Object</h3>
                  <p className="text-gray-700 text-sm">
                    Object to processing of your personal data for marketing or other specific purposes.
                  </p>
                </div>
              </div>
            </section>

            {/* Data Retention */}
            <section>
              <h2 className="font-lora text-2xl font-bold text-dark-gray mb-6">Data Retention Policy</h2>
              <p className="text-gray-700 mb-4">
                We retain personal data only as long as necessary for the purposes outlined in this policy:
              </p>
              <ul className="list-disc list-inside text-gray-700 space-y-2">
                <li><strong>Customer Data:</strong> 7 years after last transaction (tax compliance)</li>
                <li><strong>Marketing Data:</strong> Until consent is withdrawn</li>
                <li><strong>Website Analytics:</strong> 2 years for business insights</li>
                <li><strong>Support Records:</strong> 3 years for quality assurance</li>
                <li><strong>Legal Documents:</strong> As required by Pakistani law</li>
              </ul>
            </section>

            {/* Compliance */}
            <section>
              <h2 className="font-lora text-2xl font-bold text-dark-gray mb-6">Regulatory Compliance</h2>
              <p className="text-gray-700 mb-4">
                Our data protection practices comply with:
              </p>
              <ul className="list-disc list-inside text-gray-700 space-y-2">
                <li>Personal Data Protection Act (Pakistan)</li>
                <li>Electronic Transactions Ordinance 2002</li>
                <li>Prevention of Electronic Crimes Act 2016</li>
                <li>State Bank of Pakistan regulations for payment data</li>
                <li>Federal Board of Revenue requirements for business records</li>
              </ul>
            </section>

            {/* Contact Information */}
            <section className="bg-light-pink bg-opacity-20 rounded-lg p-6">
              <h2 className="font-lora text-2xl font-bold text-dark-gray mb-4">Data Protection Contact</h2>
              <p className="text-gray-700 mb-4">
                For any data protection concerns or to exercise your rights, contact our Data Protection Officer:
              </p>
              <div className="space-y-2 text-gray-700">
                <p><strong>Email:</strong> privacy@blossomwrap.com</p>
                <p><strong>Phone:</strong> +92 300 1234567</p>
                <p><strong>Address:</strong> Data Protection Officer, Blossom Wrap Studio, Lahore, Pakistan</p>
                <p><strong>Response Time:</strong> Within 30 days as required by Pakistani law</p>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DataProtectionPage;