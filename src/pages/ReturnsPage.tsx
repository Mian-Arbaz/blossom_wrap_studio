import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, RotateCcw, CheckCircle, XCircle, AlertTriangle, Clock } from 'lucide-react';

const ReturnsPage: React.FC = () => {
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
              <RotateCcw size={24} className="text-dark-gray" />
            </div>
            <div>
              <h1 className="font-lora text-3xl md:text-4xl font-bold text-dark-gray">
                Returns & Refunds
              </h1>
              <p className="text-dark-gray mt-2">
                Our return policy and refund process
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="py-16 px-4">
        <div className="container mx-auto max-w-4xl">
          <div className="bg-white rounded-lg shadow-lg p-8 space-y-8">

            {/* Return Policy Overview */}
            <section>
              <h2 className="font-lora text-2xl font-bold text-dark-gray mb-6 flex items-center space-x-2">
                <CheckCircle size={24} className="text-green-600" />
                <span>Return Policy Overview</span>
              </h2>
              <p className="text-gray-700 leading-relaxed mb-6">
                At Blossom Wrap Studio, we want you to be completely satisfied with your purchase. If you're not happy 
                with your order, we offer a comprehensive return and refund policy to ensure your peace of mind.
              </p>
              
              <div className="bg-green-50 border border-green-200 rounded-lg p-6">
                <h3 className="font-semibold text-green-800 mb-3">Our Promise</h3>
                <ul className="list-disc list-inside text-green-700 space-y-1">
                  <li>7-day return window for most items</li>
                  <li>Full refund for defective or damaged items</li>
                  <li>Free return shipping for our mistakes</li>
                  <li>Quick and hassle-free process</li>
                  <li>Dedicated customer support</li>
                </ul>
              </div>
            </section>

            {/* Return Eligibility */}
            <section>
              <h2 className="font-lora text-2xl font-bold text-dark-gray mb-6">Return Eligibility</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="border border-green-200 rounded-lg p-6">
                  <h3 className="font-semibold text-green-800 mb-3 flex items-center space-x-2">
                    <CheckCircle size={20} className="text-green-600" />
                    <span>Returnable Items</span>
                  </h3>
                  <ul className="list-disc list-inside text-green-700 space-y-2">
                    <li>Standard handmade flowers and decorations</li>
                    <li>Gift packaging materials</li>
                    <li>Non-personalized calligraphy items</li>
                    <li>Defective or damaged products</li>
                    <li>Items not as described</li>
                    <li>Wrong items shipped</li>
                  </ul>
                </div>
                
                <div className="border border-red-200 rounded-lg p-6">
                  <h3 className="font-semibold text-red-800 mb-3 flex items-center space-x-2">
                    <XCircle size={20} className="text-red-600" />
                    <span>Non-Returnable Items</span>
                  </h3>
                  <ul className="list-disc list-inside text-red-700 space-y-2">
                    <li>Custom or personalized items</li>
                    <li>Items with personal engravings</li>
                    <li>Perishable or consumable items</li>
                    <li>Items damaged by customer misuse</li>
                    <li>Items returned after 7 days</li>
                    <li>Items without original packaging</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Return Conditions */}
            <section>
              <h2 className="font-lora text-2xl font-bold text-dark-gray mb-6">Return Conditions</h2>
              
              <div className="space-y-4">
                <div className="flex items-start space-x-4">
                  <Clock size={24} className="text-blue-600 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-semibold text-dark-gray mb-2">Time Limit</h3>
                    <p className="text-gray-700">Items must be returned within 7 days of delivery. The return window starts from the date you receive your order.</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <CheckCircle size={24} className="text-green-600 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-semibold text-dark-gray mb-2">Original Condition</h3>
                    <p className="text-gray-700">Items must be in their original condition, unused, and in the original packaging with all tags and labels attached.</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <AlertTriangle size={24} className="text-yellow-600 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-semibold text-dark-gray mb-2">Inspection Required</h3>
                    <p className="text-gray-700">All returned items will be inspected upon receipt. Items that don't meet our return conditions may be sent back to you.</p>
                  </div>
                </div>
              </div>
            </section>

            {/* Return Process */}
            <section>
              <h2 className="font-lora text-2xl font-bold text-dark-gray mb-6">How to Return an Item</h2>
              
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-light-pink rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-sm font-bold text-dark-gray">1</span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-dark-gray mb-2">Contact Us</h3>
                    <p className="text-gray-700 mb-2">
                      Contact our customer service team within 7 days of delivery to initiate a return:
                    </p>
                    <ul className="list-disc list-inside text-gray-700 space-y-1">
                      <li>Email: returns@blossomwrap.com</li>
                      <li>Phone: +92 300 1234567</li>
                      <li>WhatsApp: +92 300 1234567</li>
                    </ul>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-light-pink rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-sm font-bold text-dark-gray">2</span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-dark-gray mb-2">Provide Information</h3>
                    <p className="text-gray-700 mb-2">Please have the following information ready:</p>
                    <ul className="list-disc list-inside text-gray-700 space-y-1">
                      <li>Order number</li>
                      <li>Item(s) you want to return</li>
                      <li>Reason for return</li>
                      <li>Photos (if item is damaged or defective)</li>
                    </ul>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-light-pink rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-sm font-bold text-dark-gray">3</span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-dark-gray mb-2">Get Return Authorization</h3>
                    <p className="text-gray-700">
                      We'll review your request and provide a Return Authorization (RA) number along with return instructions 
                      and shipping label (if applicable).
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-light-pink rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-sm font-bold text-dark-gray">4</span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-dark-gray mb-2">Package and Ship</h3>
                    <p className="text-gray-700">
                      Carefully package the item(s) in the original packaging, include the RA number, and ship using 
                      the provided instructions.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-light-pink rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-sm font-bold text-dark-gray">5</span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-dark-gray mb-2">Processing & Refund</h3>
                    <p className="text-gray-700">
                      Once we receive and inspect your return, we'll process your refund within 5-7 business days.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* Refund Information */}
            <section>
              <h2 className="font-lora text-2xl font-bold text-dark-gray mb-6">Refund Information</h2>
              
              <div className="space-y-6">
                <div className="border border-gray-200 rounded-lg p-6">
                  <h3 className="font-semibold text-dark-gray mb-3">Refund Methods</h3>
                  <ul className="list-disc list-inside text-gray-700 space-y-2">
                    <li><strong>Bank Transfer:</strong> Refunds to your original bank account (3-5 business days)</li>
                    <li><strong>Mobile Wallet:</strong> JazzCash, Easypaisa refunds (1-2 business days)</li>
                    <li><strong>Cash on Delivery:</strong> Bank transfer to your provided account details</li>
                    <li><strong>Store Credit:</strong> Instant credit for future purchases (optional)</li>
                  </ul>
                </div>
                
                <div className="border border-gray-200 rounded-lg p-6">
                  <h3 className="font-semibold text-dark-gray mb-3">Refund Timeline</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-700">Return received and inspected</span>
                      <span className="text-sm bg-blue-100 text-blue-800 px-2 py-1 rounded">1-2 days</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-700">Refund processed</span>
                      <span className="text-sm bg-green-100 text-green-800 px-2 py-1 rounded">3-5 days</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-700">Funds available in account</span>
                      <span className="text-sm bg-purple-100 text-purple-800 px-2 py-1 rounded">1-3 days</span>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Shipping Costs */}
            <section>
              <h2 className="font-lora text-2xl font-bold text-dark-gray mb-6">Return Shipping Costs</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-green-50 border border-green-200 rounded-lg p-6">
                  <h3 className="font-semibold text-green-800 mb-3">Free Return Shipping</h3>
                  <ul className="list-disc list-inside text-green-700 space-y-2">
                    <li>Defective or damaged items</li>
                    <li>Wrong item shipped</li>
                    <li>Item not as described</li>
                    <li>Our error in any form</li>
                  </ul>
                </div>
                
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
                  <h3 className="font-semibold text-yellow-800 mb-3">Customer Pays Shipping</h3>
                  <ul className="list-disc list-inside text-yellow-700 space-y-2">
                    <li>Change of mind returns</li>
                    <li>Size or color preference</li>
                    <li>No longer needed</li>
                    <li>Personal preference changes</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Exchanges */}
            <section>
              <h2 className="font-lora text-2xl font-bold text-dark-gray mb-6">Exchanges</h2>
              <p className="text-gray-700 mb-4">
                We currently don't offer direct exchanges. If you need a different item, please return the original item 
                for a refund and place a new order for the desired product.
              </p>
              
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
                <h3 className="font-semibold text-blue-800 mb-3">Why We Don't Offer Exchanges</h3>
                <ul className="list-disc list-inside text-blue-700 space-y-2">
                  <li>Ensures faster processing of your refund</li>
                  <li>Allows you to choose from current inventory</li>
                  <li>Prevents delays due to stock availability</li>
                  <li>Gives you flexibility to change your mind</li>
                </ul>
              </div>
            </section>

            {/* Damaged Items */}
            <section>
              <h2 className="font-lora text-2xl font-bold text-dark-gray mb-6">Damaged or Defective Items</h2>
              
              <div className="bg-red-50 border border-red-200 rounded-lg p-6">
                <h3 className="font-semibold text-red-800 mb-3">If Your Item Arrives Damaged</h3>
                <ol className="list-decimal list-inside text-red-700 space-y-2">
                  <li>Take photos of the damaged item and packaging</li>
                  <li>Contact us immediately (within 24 hours)</li>
                  <li>Keep all packaging materials</li>
                  <li>We'll arrange immediate replacement or full refund</li>
                  <li>No need to return the damaged item in most cases</li>
                </ol>
              </div>
            </section>

            {/* Frequently Asked Questions */}
            <section>
              <h2 className="font-lora text-2xl font-bold text-dark-gray mb-6">Frequently Asked Questions</h2>
              
              <div className="space-y-4">
                <div className="border border-gray-200 rounded-lg p-4">
                  <h3 className="font-semibold text-dark-gray mb-2">Can I return a custom-made item?</h3>
                  <p className="text-gray-700">Custom and personalized items cannot be returned unless they are defective or not made according to your specifications.</p>
                </div>
                
                <div className="border border-gray-200 rounded-lg p-4">
                  <h3 className="font-semibold text-dark-gray mb-2">What if I lost my receipt?</h3>
                  <p className="text-gray-700">No problem! We can look up your order using your email address or phone number.</p>
                </div>
                
                <div className="border border-gray-200 rounded-lg p-4">
                  <h3 className="font-semibold text-dark-gray mb-2">Can I return part of my order?</h3>
                  <p className="text-gray-700">Yes, you can return individual items from your order. You don't need to return everything.</p>
                </div>
                
                <div className="border border-gray-200 rounded-lg p-4">
                  <h3 className="font-semibold text-dark-gray mb-2">What if my return is lost in shipping?</h3>
                  <p className="text-gray-700">Always use a trackable shipping method. If your return is lost, contact us with the tracking information and we'll help resolve the issue.</p>
                </div>
              </div>
            </section>

            {/* Contact for Returns */}
            <section className="bg-light-pink bg-opacity-20 rounded-lg p-6">
              <h2 className="font-lora text-2xl font-bold text-dark-gray mb-4 flex items-center space-x-2">
                <RotateCcw size={24} className="text-light-pink" />
                <span>Returns Support</span>
              </h2>
              <p className="text-gray-700 mb-4">
                Need help with a return? Our dedicated returns team is here to assist you!
              </p>
              <div className="space-y-2 text-gray-700">
                <p><strong>Email:</strong> returns@blossomwrap.com</p>
                <p><strong>Phone:</strong> +92 300 1234567</p>
                <p><strong>WhatsApp:</strong> +92 300 1234567</p>
                <p><strong>Support Hours:</strong> Monday - Saturday, 9 AM - 8 PM</p>
                <p><strong>Average Response Time:</strong> Within 2 hours during business hours</p>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReturnsPage;