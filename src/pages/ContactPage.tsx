import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, MessageCircle } from 'lucide-react';

const ContactPage: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      // Save to localStorage (mock backend)
      const messages = JSON.parse(localStorage.getItem('contactMessages') || '[]');
      messages.push({
        id: Date.now().toString(),
        ...formData,
        timestamp: new Date().toISOString()
      });
      localStorage.setItem('contactMessages', JSON.stringify(messages));
      
      setSubmitStatus('success');
      setFormData({ name: '', email: '', message: '' });
      setIsSubmitting(false);
      
      // Reset success message after 3 seconds
      setTimeout(() => setSubmitStatus('idle'), 3000);
    }, 1000);
  };

  const handleWhatsAppClick = () => {
    const message = 'Hi! I would like to know more about your products and services.';
    const whatsappUrl = `https://wa.me/+923001234567?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <div className="lg:ml-64 min-h-screen">
      {/* Header */}
      <div className="bg-gradient-to-r from-light-pink to-light-blue py-16 px-4">
        <div className="container mx-auto text-center">
          <h1 className="font-lora text-4xl md:text-5xl font-bold text-dark-gray mb-4">
            Contact Us
          </h1>
          <p className="text-dark-gray text-lg max-w-2xl mx-auto">
            We'd love to hear from you! Get in touch with us for custom orders, inquiries, or just to say hello.
          </p>
        </div>
      </div>

      <div className="py-16 px-4">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div className="bg-white rounded-lg shadow-lg p-8">
              <h2 className="font-lora text-2xl font-bold text-dark-gray mb-6">Send us a Message</h2>
              
              {submitStatus === 'success' && (
                <div className="mb-6 p-4 bg-green-100 border border-green-400 text-green-700 rounded-lg">
                  Thank you for your message! We'll get back to you soon.
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-dark-gray mb-2">
                    Full Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-light-pink focus:border-transparent"
                    placeholder="Enter your full name"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-dark-gray mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-light-pink focus:border-transparent"
                    placeholder="Enter your email address"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-dark-gray mb-2">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={5}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-light-pink focus:border-transparent resize-none"
                    placeholder="Tell us about your requirements or questions..."
                    required
                  ></textarea>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-light-pink text-dark-gray py-3 rounded-lg hover:bg-opacity-80 transition-all duration-300 flex items-center justify-center space-x-2 font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <div className="w-5 h-5 border-2 border-dark-gray border-t-transparent rounded-full animate-spin"></div>
                  ) : (
                    <>
                      <Send size={20} />
                      <span>Send Message</span>
                    </>
                  )}
                </button>
              </form>
            </div>

            {/* Contact Information */}
            <div className="space-y-8">
              <div>
                <h2 className="font-lora text-2xl font-bold text-dark-gray mb-6">Get in Touch</h2>
                <p className="text-gray-600 mb-8">
                  Have questions about our products or need a custom order? We're here to help! 
                  Reach out to us through any of the following methods.
                </p>
              </div>

              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-light-pink rounded-lg flex items-center justify-center flex-shrink-0">
                    <Phone size={20} className="text-dark-gray" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-dark-gray mb-1">Phone</h3>
                    <p className="text-gray-600">+92 300 1234567</p>
                    <p className="text-sm text-gray-500">Monday - Saturday, 9 AM - 8 PM</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-light-blue rounded-lg flex items-center justify-center flex-shrink-0">
                    <Mail size={20} className="text-dark-gray" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-dark-gray mb-1">Email</h3>
                    <p className="text-gray-600">info@blossomwrap.com</p>
                    <p className="text-sm text-gray-500">We'll respond within 24 hours</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-light-pink to-light-blue rounded-lg flex items-center justify-center flex-shrink-0">
                    <MapPin size={20} className="text-dark-gray" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-dark-gray mb-1">Location</h3>
                    <p className="text-gray-600">Lahore, Pakistan</p>
                    <p className="text-sm text-gray-500">Serving nationwide</p>
                  </div>
                </div>
              </div>

              {/* WhatsApp CTA */}
              <div className="bg-green-50 border border-green-200 rounded-lg p-6">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center">
                    <MessageCircle size={20} className="text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-dark-gray">Need Quick Help?</h3>
                    <p className="text-sm text-gray-600">Chat with us on WhatsApp</p>
                  </div>
                </div>
                <button
                  onClick={handleWhatsAppClick}
                  className="w-full bg-green-500 text-white py-3 rounded-lg hover:bg-green-600 transition-all duration-300 flex items-center justify-center space-x-2 font-medium"
                >
                  <MessageCircle size={20} />
                  <span>Start WhatsApp Chat</span>
                </button>
              </div>

              {/* Business Hours */}
              <div className="bg-gray-50 rounded-lg p-6">
                <h3 className="font-lora text-lg font-semibold text-dark-gray mb-4">Business Hours</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Monday - Friday</span>
                    <span className="text-dark-gray font-medium">9:00 AM - 8:00 PM</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Saturday</span>
                    <span className="text-dark-gray font-medium">10:00 AM - 6:00 PM</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Sunday</span>
                    <span className="text-red-500 font-medium">Closed</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;