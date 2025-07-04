import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Truck, Package, Clock, MapPin, Phone } from 'lucide-react';

const ShippingInfoPage: React.FC = () => {
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
              <Truck size={24} className="text-dark-gray" />
            </div>
            <div>
              <h1 className="font-lora text-3xl md:text-4xl font-bold text-dark-gray">
                Shipping Information
              </h1>
              <p className="text-dark-gray mt-2">
                Delivery options and shipping policies across Pakistan
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="py-16 px-4">
        <div className="container mx-auto max-w-4xl">
          <div className="bg-white rounded-lg shadow-lg p-8 space-y-8">

            {/* Shipping Overview */}
            <section>
              <h2 className="font-lora text-2xl font-bold text-dark-gray mb-6 flex items-center space-x-2">
                <Package size={24} className="text-light-pink" />
                <span>Shipping Overview</span>
              </h2>
              <p className="text-gray-700 leading-relaxed mb-6">
                We deliver our handmade products nationwide across Pakistan with care and attention to ensure your items 
                arrive safely. Our shipping partners are carefully selected to provide reliable and timely delivery services.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-light-pink bg-opacity-20 rounded-lg p-6 text-center">
                  <Truck size={32} className="text-light-pink mx-auto mb-3" />
                  <h3 className="font-semibold text-dark-gray mb-2">Nationwide Delivery</h3>
                  <p className="text-sm text-gray-600">We deliver to all major cities and towns across Pakistan</p>
                </div>
                <div className="bg-light-blue bg-opacity-20 rounded-lg p-6 text-center">
                  <Clock size={32} className="text-blue-600 mx-auto mb-3" />
                  <h3 className="font-semibold text-dark-gray mb-2">Fast Processing</h3>
                  <p className="text-sm text-gray-600">Orders processed within 1-2 business days</p>
                </div>
                <div className="bg-green-100 rounded-lg p-6 text-center">
                  <Package size={32} className="text-green-600 mx-auto mb-3" />
                  <h3 className="font-semibold text-dark-gray mb-2">Secure Packaging</h3>
                  <p className="text-sm text-gray-600">Items carefully packed to prevent damage</p>
                </div>
              </div>
            </section>

            {/* Delivery Options */}
            <section>
              <h2 className="font-lora text-2xl font-bold text-dark-gray mb-6">Delivery Options</h2>
              
              <div className="space-y-6">
                <div className="border border-gray-200 rounded-lg p-6">
                  <h3 className="font-semibold text-dark-gray mb-3 flex items-center space-x-2">
                    <Truck size={20} className="text-blue-600" />
                    <span>Standard Delivery</span>
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <p className="text-gray-700 mb-2"><strong>Delivery Time:</strong> 3-5 business days</p>
                      <p className="text-gray-700 mb-2"><strong>Cost:</strong> PKR 200-400 (varies by location)</p>
                      <p className="text-gray-700"><strong>Coverage:</strong> All major cities and towns</p>
                    </div>
                    <div>
                      <p className="text-gray-700 mb-2"><strong>Tracking:</strong> Available</p>
                      <p className="text-gray-700 mb-2"><strong>Insurance:</strong> Up to PKR 5,000</p>
                      <p className="text-gray-700"><strong>Signature:</strong> Required for delivery</p>
                    </div>
                  </div>
                </div>

                <div className="border border-gray-200 rounded-lg p-6">
                  <h3 className="font-semibold text-dark-gray mb-3 flex items-center space-x-2">
                    <Clock size={20} className="text-green-600" />
                    <span>Express Delivery</span>
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <p className="text-gray-700 mb-2"><strong>Delivery Time:</strong> 1-2 business days</p>
                      <p className="text-gray-700 mb-2"><strong>Cost:</strong> PKR 500-800 (varies by location)</p>
                      <p className="text-gray-700"><strong>Coverage:</strong> Major cities only</p>
                    </div>
                    <div>
                      <p className="text-gray-700 mb-2"><strong>Tracking:</strong> Real-time tracking</p>
                      <p className="text-gray-700 mb-2"><strong>Insurance:</strong> Up to PKR 10,000</p>
                      <p className="text-gray-700"><strong>Signature:</strong> Required for delivery</p>
                    </div>
                  </div>
                </div>

                <div className="border border-gray-200 rounded-lg p-6">
                  <h3 className="font-semibold text-dark-gray mb-3 flex items-center space-x-2">
                    <MapPin size={20} className="text-purple-600" />
                    <span>Same-Day Delivery (Lahore Only)</span>
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <p className="text-gray-700 mb-2"><strong>Delivery Time:</strong> 4-8 hours</p>
                      <p className="text-gray-700 mb-2"><strong>Cost:</strong> PKR 800-1,200</p>
                      <p className="text-gray-700"><strong>Coverage:</strong> Lahore city limits</p>
                    </div>
                    <div>
                      <p className="text-gray-700 mb-2"><strong>Order Cutoff:</strong> 2:00 PM</p>
                      <p className="text-gray-700 mb-2"><strong>Availability:</strong> Monday - Saturday</p>
                      <p className="text-gray-700"><strong>Special:</strong> Perfect for urgent gifts</p>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Free Shipping */}
            <section className="bg-green-50 border border-green-200 rounded-lg p-6">
              <h2 className="font-lora text-2xl font-bold text-green-800 mb-4">Free Shipping Offer</h2>
              <div className="flex items-start space-x-4">
                <Package size={32} className="text-green-600 flex-shrink-0" />
                <div>
                  <p className="text-green-700 mb-2">
                    <strong>Enjoy FREE standard shipping on orders over PKR 3,000!</strong>
                  </p>
                  <ul className="list-disc list-inside text-green-700 space-y-1">
                    <li>Applies to standard delivery only</li>
                    <li>Valid for orders within Pakistan</li>
                    <li>Cannot be combined with other shipping discounts</li>
                    <li>Minimum order value calculated before taxes</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Delivery Areas */}
            <section>
              <h2 className="font-lora text-2xl font-bold text-dark-gray mb-6">Delivery Coverage</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-semibold text-dark-gray mb-3">Major Cities (1-3 Days)</h3>
                  <ul className="list-disc list-inside text-gray-700 space-y-1">
                    <li>Lahore</li>
                    <li>Karachi</li>
                    <li>Islamabad/Rawalpindi</li>
                    <li>Faisalabad</li>
                    <li>Multan</li>
                    <li>Peshawar</li>
                    <li>Quetta</li>
                    <li>Sialkot</li>
                    <li>Gujranwala</li>
                    <li>Hyderabad</li>
                  </ul>
                </div>
                
                <div>
                  <h3 className="font-semibold text-dark-gray mb-3">Other Areas (3-7 Days)</h3>
                  <ul className="list-disc list-inside text-gray-700 space-y-1">
                    <li>All district headquarters</li>
                    <li>Tehsil headquarters</li>
                    <li>Major towns and cities</li>
                    <li>Remote areas (additional charges may apply)</li>
                  </ul>
                  <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded">
                    <p className="text-sm text-yellow-700">
                      <strong>Note:</strong> Delivery to remote areas may take longer and incur additional charges. 
                      Please contact us for specific delivery information.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* Order Processing */}
            <section>
              <h2 className="font-lora text-2xl font-bold text-dark-gray mb-6">Order Processing</h2>
              
              <div className="space-y-4">
                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-light-pink rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-sm font-bold text-dark-gray">1</span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-dark-gray">Order Confirmation</h3>
                    <p className="text-gray-700">You'll receive an email confirmation within 30 minutes of placing your order.</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-light-pink rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-sm font-bold text-dark-gray">2</span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-dark-gray">Processing</h3>
                    <p className="text-gray-700">Orders are processed within 1-2 business days. Custom items may take longer.</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-light-pink rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-sm font-bold text-dark-gray">3</span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-dark-gray">Shipping</h3>
                    <p className="text-gray-700">You'll receive tracking information once your order is shipped.</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-light-pink rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-sm font-bold text-dark-gray">4</span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-dark-gray">Delivery</h3>
                    <p className="text-gray-700">Your order will be delivered to the specified address during business hours.</p>
                  </div>
                </div>
              </div>
            </section>

            {/* Special Items */}
            <section>
              <h2 className="font-lora text-2xl font-bold text-dark-gray mb-6">Special Item Shipping</h2>
              
              <div className="space-y-4">
                <div className="border border-gray-200 rounded-lg p-4">
                  <h3 className="font-semibold text-dark-gray mb-2">Custom Orders</h3>
                  <p className="text-gray-700">Custom and personalized items require additional processing time (5-10 business days) before shipping.</p>
                </div>
                
                <div className="border border-gray-200 rounded-lg p-4">
                  <h3 className="font-semibold text-dark-gray mb-2">Fragile Items</h3>
                  <p className="text-gray-700">Delicate items like handmade flowers are packed with extra care and may require special handling.</p>
                </div>
                
                <div className="border border-gray-200 rounded-lg p-4">
                  <h3 className="font-semibold text-dark-gray mb-2">Large Orders</h3>
                  <p className="text-gray-700">Bulk orders may be shipped in multiple packages and could have extended processing times.</p>
                </div>
              </div>
            </section>

            {/* Tracking */}
            <section>
              <h2 className="font-lora text-2xl font-bold text-dark-gray mb-6">Order Tracking</h2>
              <p className="text-gray-700 mb-4">
                Once your order is shipped, you'll receive a tracking number via email and SMS. You can track your package using:
              </p>
              <ul className="list-disc list-inside text-gray-700 space-y-2">
                <li>Our website's order tracking page</li>
                <li>Courier company's website or app</li>
                <li>WhatsApp updates (if opted in)</li>
                <li>SMS notifications</li>
              </ul>
            </section>

            {/* Delivery Issues */}
            <section>
              <h2 className="font-lora text-2xl font-bold text-dark-gray mb-6">Delivery Issues</h2>
              
              <div className="bg-red-50 border border-red-200 rounded-lg p-6">
                <h3 className="font-semibold text-red-800 mb-3">What to do if your order doesn't arrive:</h3>
                <ul className="list-disc list-inside text-red-700 space-y-2">
                  <li>Check the tracking information for updates</li>
                  <li>Contact the courier company directly</li>
                  <li>Reach out to our customer service team</li>
                  <li>We'll investigate and resolve the issue promptly</li>
                </ul>
              </div>
            </section>

            {/* Contact for Shipping */}
            <section className="bg-light-pink bg-opacity-20 rounded-lg p-6">
              <h2 className="font-lora text-2xl font-bold text-dark-gray mb-4 flex items-center space-x-2">
                <Phone size={24} className="text-light-pink" />
                <span>Shipping Support</span>
              </h2>
              <p className="text-gray-700 mb-4">
                Have questions about shipping? Our team is here to help!
              </p>
              <div className="space-y-2 text-gray-700">
                <p><strong>Email:</strong> shipping@blossomwrap.com</p>
                <p><strong>Phone:</strong> +92 300 1234567</p>
                <p><strong>WhatsApp:</strong> +92 300 1234567</p>
                <p><strong>Support Hours:</strong> Monday - Saturday, 9 AM - 8 PM</p>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShippingInfoPage;