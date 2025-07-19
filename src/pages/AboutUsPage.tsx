import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Users, Heart, Award, MapPin, Clock, Phone, Mail } from 'lucide-react';

const AboutUsPage: React.FC = () => {
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
              <Users size={24} className="text-dark-gray" />
            </div>
            <div>
              <h1 className="font-lora text-3xl md:text-4xl font-bold text-dark-gray">
                About Blossom Wrap Studio
              </h1>
              <p className="text-dark-gray mt-2">
                Creating beautiful moments that make you smile
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="py-16 px-4">
        <div className="container mx-auto max-w-4xl">
          <div className="bg-white rounded-lg shadow-lg p-8 space-y-8">

            {/* Our Story */}
            <section>
              <h2 className="font-lora text-2xl font-bold text-dark-gray mb-6 flex items-center space-x-2">
                <Heart size={24} className="text-light-pink" />
                <span>Our Story</span>
              </h2>
              <p className="text-gray-700 leading-relaxed mb-6">
                Founded in the heart of Lahore, Pakistan, Blossom Wrap Studio began as a passion project to bring 
                joy and beauty into people's lives through handcrafted gifts and decorations. What started as a small 
                home-based venture has grown into a beloved brand known for its attention to detail, quality craftsmanship, 
                and personalized service.
              </p>
              <p className="text-gray-700 leading-relaxed">
                Our journey is rooted in the belief that every special moment deserves to be celebrated with something 
                unique and meaningful. From handmade flowers that last forever to custom calligraphy that captures emotions, 
                we create products that tell stories and preserve memories.
              </p>
            </section>

            {/* Our Mission */}
            <section>
              <h2 className="font-lora text-2xl font-bold text-dark-gray mb-6">Our Mission</h2>
              <div className="bg-light-pink bg-opacity-20 rounded-lg p-6">
                <p className="text-gray-700 leading-relaxed text-lg italic">
                  "To create beautiful, handcrafted products that bring smiles to faces and warmth to hearts, 
                  while supporting local artisans and preserving traditional Pakistani craftsmanship."
                </p>
              </div>
            </section>

            {/* What We Do */}
            <section>
              <h2 className="font-lora text-2xl font-bold text-dark-gray mb-6">What We Do</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="border border-gray-200 rounded-lg p-6">
                  <h3 className="font-semibold text-dark-gray mb-3">🌸 Handmade Flowers</h3>
                  <p className="text-gray-700 text-sm">
                    Beautiful artificial flowers crafted with premium materials that maintain their beauty forever.
                  </p>
                </div>
                <div className="border border-gray-200 rounded-lg p-6">
                  <h3 className="font-semibold text-dark-gray mb-3">🎁 Gift Packaging</h3>
                  <p className="text-gray-700 text-sm">
                    Professional gift wrapping and custom packaging services for all occasions.
                  </p>
                </div>
                <div className="border border-gray-200 rounded-lg p-6">
                  <h3 className="font-semibold text-dark-gray mb-3">✍️ Custom Calligraphy</h3>
                  <p className="text-gray-700 text-sm">
                    Personalized calligraphy in English, Urdu, and Arabic for special occasions.
                  </p>
                </div>
                <div className="border border-gray-200 rounded-lg p-6">
                  <h3 className="font-semibold text-dark-gray mb-3">🎂 Special Occasions</h3>
                  <p className="text-gray-700 text-sm">
                    Custom decorations and gifts for birthdays, weddings, anniversaries, and more.
                  </p>
                </div>
              </div>
            </section>

            {/* Our Values */}
            <section>
              <h2 className="font-lora text-2xl font-bold text-dark-gray mb-6">Our Values</h2>
              <div className="space-y-4">
                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-light-pink rounded-full flex items-center justify-center flex-shrink-0">
                    <Award size={16} className="text-dark-gray" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-dark-gray mb-1">Quality Craftsmanship</h3>
                    <p className="text-gray-700 text-sm">
                      Every product is meticulously handcrafted with attention to detail and quality materials.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-light-blue rounded-full flex items-center justify-center flex-shrink-0">
                    <Heart size={16} className="text-dark-gray" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-dark-gray mb-1">Customer Satisfaction</h3>
                    <p className="text-gray-700 text-sm">
                      We go above and beyond to ensure every customer is delighted with their purchase.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <Users size={16} className="text-green-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-dark-gray mb-1">Community Support</h3>
                    <p className="text-gray-700 text-sm">
                      Supporting local artisans and contributing to the Pakistani handicraft community.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* Our Team */}
            <section>
              <h2 className="font-lora text-2xl font-bold text-dark-gray mb-6">Our Team</h2>
              <p className="text-gray-700 leading-relaxed mb-6">
                Our team consists of skilled artisans, creative designers, and dedicated customer service professionals 
                who share a passion for creating beautiful, meaningful products. Each team member brings unique skills 
                and cultural insights that contribute to our diverse and vibrant product offerings.
              </p>
              <div className="bg-gray-50 rounded-lg p-6">
                <h3 className="font-semibold text-dark-gray mb-3">Why Choose Us?</h3>
                <ul className="list-disc list-inside text-gray-700 space-y-2">
                  <li>100% handmade products with authentic Pakistani craftsmanship</li>
                  <li>Customization options to match your specific requirements</li>
                  <li>Fast and reliable delivery across Pakistan</li>
                  <li>Excellent customer service and after-sales support</li>
                  <li>Competitive pricing without compromising on quality</li>
                  <li>Eco-friendly materials and sustainable practices</li>
                </ul>
              </div>
            </section>

            {/* Contact Information */}
            <section className="bg-light-pink bg-opacity-20 rounded-lg p-6">
              <h2 className="font-lora text-2xl font-bold text-dark-gray mb-4 flex items-center space-x-2">
                <MapPin size={24} className="text-light-pink" />
                <span>Visit Us</span>
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-semibold text-dark-gray mb-3">Location</h3>
                  <div className="space-y-2 text-gray-700">
                    <p className="flex items-center space-x-2">
                      <MapPin size={16} className="text-light-pink" />
                      <span>Lahore, Punjab, Pakistan</span>
                    </p>
                    <p className="flex items-center space-x-2">
                      <Phone size={16} className="text-light-pink" />
                      <span>+92 300 1234567</span>
                    </p>
                    <p className="flex items-center space-x-2">
                      <Mail size={16} className="text-light-pink" />
                      <span>info@blossomwrap.com</span>
                    </p>
                  </div>
                </div>
                <div>
                  <h3 className="font-semibold text-dark-gray mb-3">Business Hours</h3>
                  <div className="space-y-1 text-gray-700 text-sm">
                    <div className="flex justify-between">
                      <span>Monday - Friday</span>
                      <span>9:00 AM - 8:00 PM</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Saturday</span>
                      <span>10:00 AM - 6:00 PM</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Sunday</span>
                      <span className="text-red-500">Closed</span>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUsPage;