import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, Send, MessageCircle, Clock, CheckCircle, AlertCircle, ArrowLeft } from 'lucide-react';
import { useNotification } from '../contexts/NotificationContext';
import { openWhatsAppChat, buildWhatsAppInquiryMessage } from '../utils/whatsapp';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/Card';

const ContactPage: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const { addNotification } = useNotification();

  const validateField = (name: string, value: string): string => {
    switch (name) {
      case 'name':
        return value.trim().length < 2 ? 'Name must be at least 2 characters' : '';
      case 'email':
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return !emailRegex.test(value) ? 'Please enter a valid email address' : '';
      case 'subject':
        return value.trim().length < 3 ? 'Subject must be at least 3 characters' : '';
      case 'message':
        return value.trim().length < 10 ? 'Message must be at least 10 characters' : '';
      default:
        return '';
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear field error when user starts typing
    if (fieldErrors[name]) {
      setFieldErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    const error = validateField(name, value);
    setFieldErrors(prev => ({ ...prev, [name]: error }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate all fields
    const errors: Record<string, string> = {};
    Object.entries(formData).forEach(([key, value]) => {
      const error = validateField(key, value);
      if (error) errors[key] = error;
    });

    if (Object.keys(errors).length > 0) {
      setFieldErrors(errors);
      addNotification({
        type: 'error',
        title: 'Validation Error',
        message: 'Please fix the errors in the form before submitting.'
      });
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus('idle');
    
    try {
      // Simulate form submission
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Save to localStorage (mock backend)
      const messages = JSON.parse(localStorage.getItem('contactMessages') || '[]');
      messages.push({
        id: Date.now().toString(),
        ...formData,
        timestamp: new Date().toISOString()
      });
      localStorage.setItem('contactMessages', JSON.stringify(messages));
      
      setSubmitStatus('success');
      setFormData({ name: '', email: '', subject: '', message: '' });
      setFieldErrors({});
      
      addNotification({
        type: 'success',
        title: 'Message Sent Successfully!',
        message: 'Thank you for contacting us. We\'ll get back to you within 24 hours.'
      });
      
      // Reset success message after 5 seconds
      setTimeout(() => setSubmitStatus('idle'), 5000);
    } catch (error) {
      setSubmitStatus('error');
      addNotification({
        type: 'error',
        title: 'Failed to Send Message',
        message: 'Something went wrong. Please try again or contact us directly.'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleWhatsAppClick = () => {
    const message = buildWhatsAppInquiryMessage();
    openWhatsAppChat(message);
  };

  const subjectOptions = [
    { value: '', label: 'Select a subject...' },
    { value: 'general-inquiry', label: 'General Inquiry' },
    { value: 'custom-order', label: 'Custom Order Request' },
    { value: 'product-question', label: 'Product Question' },
    { value: 'shipping-delivery', label: 'Shipping & Delivery' },
    { value: 'return-refund', label: 'Return & Refund' },
    { value: 'technical-support', label: 'Technical Support' },
    { value: 'partnership', label: 'Business Partnership' },
    { value: 'feedback', label: 'Feedback & Suggestions' }
  ];

  return (
    <div className="lg:ml-64 min-h-screen bg-gray-25">
      {/* Hero Section */}
      <section className="bg-white border-b border-gray-100">
        <div className="container mx-auto px-4 py-8">
          <Link
            to="/"
            className="inline-flex items-center space-x-2 text-gray-600 hover:text-brand-600 transition-colors duration-300 mb-6"
          >
            <ArrowLeft size={20} />
            <span>Back to Home</span>
          </Link>
        </div>
        
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-brand-500 to-accent-500 rounded-2xl mb-8 shadow-lg">
              <MessageCircle size={36} className="text-white" />
            </div>
            <h1 className="font-serif text-4xl md:text-6xl font-bold text-gray-900 mb-6 tracking-tight">
              Get in Touch
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
              We'd love to hear from you! Whether you have questions about our handmade products, 
              need a custom order, or just want to say hello, we're here to help.
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
              
              {/* Contact Form - Takes 2/3 width on desktop */}
              <div className="lg:col-span-2">
                <Card variant="elevated" padding="lg">
                  <div className="mb-8">
                    <h2 className="font-serif text-3xl font-bold text-gray-900 mb-4">
                      Send us a Message
                    </h2>
                    <p className="text-gray-600 text-lg">
                      Fill out the form below and we'll get back to you as soon as possible.
                    </p>
                  </div>
                  
                  {/* Success Message */}
                  {submitStatus === 'success' && (
                    <div className="mb-8 p-6 bg-success-50 border border-success-200 rounded-xl flex items-start space-x-4">
                      <CheckCircle size={24} className="text-success-600 flex-shrink-0 mt-1" />
                      <div>
                        <h3 className="font-semibold text-success-800 text-lg">Message Sent Successfully!</h3>
                        <p className="text-success-700 mt-1">
                          Thank you for contacting us. We'll respond within 24 hours.
                        </p>
                      </div>
                    </div>
                  )}

                  <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Name and Email Row */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <Input
                        label="Full Name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={fieldErrors.name}
                        placeholder="Enter your full name"
                        required
                      />

                      <Input
                        label="Email Address"
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={fieldErrors.email}
                        placeholder="your.email@example.com"
                        required
                      />
                    </div>

                    {/* Subject */}
                    <div>
                      <label htmlFor="subject" className="block text-sm font-semibold text-dark-gray mb-2">
                        Subject *
                      </label>
                      <select
                        id="subject"
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className={`w-full px-4 py-3 border-2 rounded-xl transition-all duration-300 focus:outline-none focus:ring-0 ${
                          fieldErrors.subject 
                            ? 'border-red-300 focus:border-red-500 bg-red-50' 
                            : 'border-gray-200 focus:border-light-pink bg-white hover:border-gray-300'
                        }`}
                        required
                      >
                        {subjectOptions.map((option) => (
                          <option key={option.value} value={option.value}>
                            {option.label}
                          </option>
                        ))}
                      </select>
                      {fieldErrors.subject && (
                        <p className="mt-2 text-sm text-red-600 flex items-center space-x-1">
                          <AlertCircle size={14} />
                          <span>{fieldErrors.subject}</span>
                        </p>
                      )}
                    </div>

                    {/* Message */}
                    <div>
                      <label htmlFor="message" className="block text-sm font-semibold text-dark-gray mb-2">
                        Message *
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        rows={6}
                        className={`w-full px-4 py-3 border-2 rounded-xl transition-all duration-300 focus:outline-none focus:ring-0 resize-none ${
                          fieldErrors.message 
                            ? 'border-red-300 focus:border-red-500 bg-red-50' 
                            : 'border-gray-200 focus:border-light-pink bg-white hover:border-gray-300'
                        }`}
                        placeholder="Tell us about your requirements, questions, or how we can help you..."
                        required
                      />
                      {fieldErrors.message && (
                        <p className="mt-2 text-sm text-red-600 flex items-center space-x-1">
                          <AlertCircle size={14} />
                          <span>{fieldErrors.message}</span>
                        </p>
                      )}
                      <p className="mt-2 text-sm text-gray-500">
                        Minimum 10 characters required
                      </p>
                    </div>

                    {/* Submit Button */}
                    <div className="pt-4">
                      <Button
                        type="submit"
                        size="lg"
                        loading={isSubmitting}
                        loadingText="Sending Message..."
                        disabled={isSubmitting}
                        className="w-full bg-gradient-to-r from-brand-600 to-accent-600 hover:from-brand-700 hover:to-accent-700 transform hover:scale-[1.02]"
                      >
                        <Send size={20} />
                        <span>Send Message</span>
                      </Button>
                    </div>
                  </form>
                </Card>
              </div>

              {/* Contact Information Sidebar */}
              <div className="space-y-8">
                {/* Contact Details */}
                <Card variant="elevated" padding="lg">
                  <CardHeader>
                    <CardTitle>Contact Information</CardTitle>
                  </CardHeader>
                  <CardContent className="pt-0">
                    Contact Information
                  <div className="space-y-6">
                    <div className="flex items-start space-x-4">
                      <div className="w-12 h-12 bg-gradient-to-r from-brand-500 to-accent-500 rounded-xl flex items-center justify-center flex-shrink-0 shadow-sm">
                        <Phone size={20} className="text-white" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-1">Phone</h4>
                        <p className="text-gray-600 mb-1">+92 300 1234567</p>
                        <p className="text-sm text-gray-500">Mon-Sat, 9 AM - 8 PM</p>
                      </div>
                    </div>

                    <div className="flex items-start space-x-4">
                      <div className="w-12 h-12 bg-gradient-to-r from-brand-500 to-accent-500 rounded-xl flex items-center justify-center flex-shrink-0 shadow-sm">
                        <Mail size={20} className="text-white" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-1">Email</h4>
                        <p className="text-gray-600 mb-1">info@blossomwrap.com</p>
                        <p className="text-sm text-gray-500">Response within 24 hours</p>
                      </div>
                    </div>

                    <div className="flex items-start space-x-4">
                      <div className="w-12 h-12 bg-gradient-to-r from-brand-500 to-accent-500 rounded-xl flex items-center justify-center flex-shrink-0 shadow-sm">
                        <MapPin size={20} className="text-white" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-1">Location</h4>
                        <p className="text-gray-600 mb-1">Lahore, Pakistan</p>
                        <p className="text-sm text-gray-500">Serving nationwide</p>
                      </div>
                    </div>
                  </div>
                  </CardContent>
                </Card>

                {/* WhatsApp CTA */}
                <Card className="bg-gradient-to-r from-success-50 to-success-100 border-success-200">
                  <CardContent className="text-center p-8">
                    <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                      <MessageCircle size={24} className="text-white" />
                    </div>
                    <h3 className="font-serif text-xl font-bold text-success-800 mb-3">
                      Need Quick Help?
                    </h3>
                    <p className="text-success-700 mb-6">
                      Get instant support through WhatsApp for urgent inquiries
                    </p>
                    <Button
                      onClick={handleWhatsAppClick}
                      variant="success"
                      size="lg"
                      className="w-full transform hover:scale-[1.02]"
                    >
                      <MessageCircle size={18} />
                      <span>Chat on WhatsApp</span>
                    </Button>
                  </CardContent>
                </Card>

                {/* Business Hours */}
                <Card variant="elevated" padding="lg">
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-3">
                      <Clock size={20} className="text-brand-600" />
                      <span>
                      Business Hours
                      </span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="pt-0">
                  
                  <div className="space-y-3">
                    <div className="flex justify-between items-center py-3 border-b border-gray-100">
                      <span className="text-gray-700 font-medium">Monday - Friday</span>
                      <span className="text-gray-900 font-semibold">9:00 AM - 8:00 PM</span>
                    </div>
                    <div className="flex justify-between items-center py-3 border-b border-gray-100">
                      <span className="text-gray-700 font-medium">Saturday</span>
                      <span className="text-gray-900 font-semibold">10:00 AM - 6:00 PM</span>
                    </div>
                    <div className="flex justify-between items-center py-3">
                      <span className="text-gray-700 font-medium">Sunday</span>
                      <span className="text-danger-500 font-semibold">Closed</span>
                    </div>
                  </div>
                  
                  <div className="mt-6 p-4 bg-brand-50 rounded-xl">
                    <p className="text-sm text-gray-700 text-center font-medium">
                      <strong>Average Response Time:</strong> Within 2 hours during business hours
                    </p>
                  </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-white border-t border-gray-100">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Frequently Asked Questions
            </h2>
            <p className="text-xl text-gray-600 mb-12">
              Find quick answers to common questions, or contact us for personalized assistance.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-left">
              <Card className="bg-gray-50 border-gray-200">
                <CardContent className="p-6">
                  <h3 className="font-semibold text-gray-900 mb-3">How long does delivery take?</h3>
                <p className="text-gray-600 text-sm">Standard delivery takes 3-5 business days across Pakistan. Express delivery is available for major cities.</p>
                </CardContent>
              </Card>
              <Card className="bg-gray-50 border-gray-200">
                <CardContent className="p-6">
                  <h3 className="font-semibold text-gray-900 mb-3">Do you offer custom orders?</h3>
                <p className="text-gray-600 text-sm">Yes! We specialize in custom handmade items. Contact us with your requirements for a personalized quote.</p>
                </CardContent>
              </Card>
              <Card className="bg-gray-50 border-gray-200">
                <CardContent className="p-6">
                  <h3 className="font-semibold text-gray-900 mb-3">What payment methods do you accept?</h3>
                <p className="text-gray-600 text-sm">We accept Cash on Delivery, bank transfers, JazzCash, Easypaisa, and online payment gateways.</p>
                </CardContent>
              </Card>
              <Card className="bg-gray-50 border-gray-200">
                <CardContent className="p-6">
                  <h3 className="font-semibold text-gray-900 mb-3">Can I return items?</h3>
                <p className="text-gray-600 text-sm">Yes, we offer a 7-day return policy for most items. Custom orders cannot be returned unless defective.</p>
                </CardContent>
              </Card>
            </div>
            
            <div className="mt-12">
              <Link
                to="/faq"
                className="inline-flex items-center space-x-2 text-brand-600 hover:text-brand-700 transition-colors duration-300 font-semibold text-lg"
              >
                <span>View All FAQs</span>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ContactPage;