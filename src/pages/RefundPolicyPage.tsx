import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, RefreshCw, DollarSign, Clock, CheckCircle } from 'lucide-react';

const RefundPolicyPage: React.FC = () => {
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
              <RefreshCw size={24} className="text-dark-gray" />
            </div>
            <div>
              <h1 className="font-lora text-3xl md:text-4xl font-bold text-dark-gray">
                Refund Policy
              </h1>
              <p className="text-dark-gray mt-2">
                Our commitment to customer satisfaction and refund procedures
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="py-16 px-4">
        <div className="container mx-auto max-w-4xl">
          <div className="bg-white rounded-lg shadow-lg p-8 space-y-8">

            {/* Policy Overview */}
            <section>
              <h2 className="font-lora text-2xl font-bold text-dark-gray mb-6 flex items-center space-x-2">
                <DollarSign size={24} className="text-green-600" />
                <span>Refund Policy Overview</span>
              </h2>
              <p className="text-gray-700 leading-relaxed mb-6">
                At Blossom Wrap Studio, we are committed to ensuring customer satisfaction. This refund policy 
                outlines the terms and conditions under which refunds are processed in accordance with Pakistani 
                consumer protection laws and regulations.
              </p>
              
              <div className="bg-green-50 border border-green-200 rounded-lg p-6">
                <h3 className="font-semibold text-green-800 mb-3">Our Refund Guarantee</h3>
                <ul className="list-disc list-inside text-green-700 space-y-2">
                  <li>Full refund for defective or damaged products</li>
                  <li>7-day refund window for eligible items</li>
                  <li>Quick processing within 5-7 business days</li>
                  <li>Multiple refund methods available</li>
                  <li>No hidden charges or deductions</li>
                </ul>
              </div>
            </section>

            {/* Refund Eligibility */}
            <section>
              <h2 className="font-lora text-2xl font-bold text-dark-gray mb-6">Refund Eligibility Criteria</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="border border-green-200 rounded-lg p-6">
                  <h3 className="font-semibold text-green-800 mb-3 flex items-center space-x-2">
                    <CheckCircle size={20} className="text-green-600" />
                    <span>Eligible for Full Refund</span>
                  </h3>
                  <ul className="list-disc list-inside text-green-700 space-y-2">
                    <li>Products received damaged or defective</li>
                    <li>Wrong items shipped by our error</li>
                    <li>Items not matching description</li>
                    <li>Quality issues with handmade products</li>
                    <li>Delivery delays beyond 10 business days</li>
                    <li>Cancelled orders before processing</li>
                  </ul>
                </div>
                
                <div className="border border-yellow-200 rounded-lg p-6">
                  <h3 className="font-semibold text-yellow-800 mb-3 flex items-center space-x-2">
                    <Clock size={20} className="text-yellow-600" />
                    <span>Partial Refund Conditions</span>
                  </h3>
                  <ul className="list-disc list-inside text-yellow-700 space-y-2">
                    <li>Items returned after 7 days (within 14 days)</li>
                    <li>Products with minor wear or damage</li>
                    <li>Custom orders cancelled after production start</li>
                    <li>Bulk orders with partial delivery issues</li>
                    <li>International shipping complications</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Refund Process */}
            <section>
              <h2 className="font-lora text-2xl font-bold text-dark-gray mb-6">Refund Process</h2>
              
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-light-pink rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-sm font-bold text-dark-gray">1</span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-dark-gray mb-2">Initiate Refund Request</h3>
                    <p className="text-gray-700 mb-2">Contact our customer service team through:</p>
                    <ul className="list-disc list-inside text-gray-700 space-y-1">
                      <li>Email: refunds@blossomwrap.com</li>
                      <li>Phone: +92 300 1234567</li>
                      <li>WhatsApp: +92 300 1234567</li>
                      <li>Contact form on our website</li>
                    </ul>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-light-pink rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-sm font-bold text-dark-gray">2</span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-dark-gray mb-2">Provide Required Information</h3>
                    <ul className="list-disc list-inside text-gray-700 space-y-1">
                      <li>Order number and purchase date</li>
                      <li>Reason for refund request</li>
                      <li>Photos of damaged/defective items (if applicable)</li>
                      <li>Bank account details for refund processing</li>
                    </ul>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-light-pink rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-sm font-bold text-dark-gray">3</span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-dark-gray mb-2">Review and Approval</h3>
                    <p className="text-gray-700">
                      Our team will review your request within 24-48 hours and provide approval status 
                      along with return instructions if required.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-light-pink rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-sm font-bold text-dark-gray">4</span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-dark-gray mb-2">Refund Processing</h3>
                    <p className="text-gray-700">
                      Once approved, refunds are processed within 5-7 business days to your original 
                      payment method or specified bank account.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* Refund Methods */}
            <section>
              <h2 className="font-lora text-2xl font-bold text-dark-gray mb-6">Refund Methods</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
                  <h3 className="font-semibold text-blue-800 mb-3">Bank Transfer</h3>
                  <ul className="list-disc list-inside text-blue-700 space-y-1">
                    <li>Direct transfer to your bank account</li>
                    <li>Processing time: 3-5 business days</li>
                    <li>Available for all Pakistani banks</li>
                    <li>Requires account verification</li>
                  </ul>
                </div>
                
                <div className="bg-purple-50 border border-purple-200 rounded-lg p-6">
                  <h3 className="font-semibold text-purple-800 mb-3">Mobile Wallet</h3>
                  <ul className="list-disc list-inside text-purple-700 space-y-1">
                    <li>JazzCash and Easypaisa supported</li>
                    <li>Processing time: 1-2 business days</li>
                    <li>Instant notification upon transfer</li>
                    <li>Convenient for quick refunds</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Pakistani Consumer Rights */}
            <section>
              <h2 className="font-lora text-2xl font-bold text-dark-gray mb-6">Consumer Rights (Pakistan)</h2>
              <p className="text-gray-700 mb-4">
                In accordance with Pakistani consumer protection laws and regulations:
              </p>
              <ul className="list-disc list-inside text-gray-700 space-y-2">
                <li>Right to receive products as described and advertised</li>
                <li>Right to refund for defective or substandard products</li>
                <li>Right to fair treatment and transparent pricing</li>
                <li>Right to privacy and data protection</li>
                <li>Right to seek redressal through consumer courts</li>
                <li>Protection against unfair trade practices</li>
              </ul>
            </section>

            {/* Contact for Refunds */}
            <section className="bg-light-pink bg-opacity-20 rounded-lg p-6">
              <h2 className="font-lora text-2xl font-bold text-dark-gray mb-4">Refund Support</h2>
              <p className="text-gray-700 mb-4">
                Need help with a refund? Our dedicated refund team is here to assist you!
              </p>
              <div className="space-y-2 text-gray-700">
                <p><strong>Refund Hotline:</strong> +92 300 1234567</p>
                <p><strong>Email:</strong> refunds@blossomwrap.com</p>
                <p><strong>WhatsApp:</strong> +92 300 1234567</p>
                <p><strong>Support Hours:</strong> Monday - Saturday, 9 AM - 8 PM</p>
                <p><strong>Average Response Time:</strong> Within 4 hours during business hours</p>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RefundPolicyPage;