import React, { useState } from 'react';
import { Mail, CheckCircle } from 'lucide-react';
import { useNotification } from '../contexts/NotificationContext';

const NewsletterSection: React.FC = () => {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubscribed, setIsSubscribed] = useState(false);
  const { addNotification } = useNotification();

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email.trim()) {
      addNotification({
        type: 'warning',
        title: 'Email Required',
        message: 'Please enter your email address to subscribe.'
      });
      return;
    }

    if (!validateEmail(email)) {
      addNotification({
        type: 'error',
        title: 'Invalid Email',
        message: 'Please enter a valid email address.'
      });
      return;
    }

    setIsSubmitting(true);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));

      // Save to localStorage (mock database)
      const subscribers = JSON.parse(localStorage.getItem('newsletter_subscribers') || '[]');
      
      // Check if already subscribed
      if (subscribers.some((sub: any) => sub.email === email)) {
        addNotification({
          type: 'info',
          title: 'Already Subscribed',
          message: 'This email is already subscribed to our newsletter.'
        });
        setIsSubmitting(false);
        return;
      }

      // Add new subscriber
      const newSubscriber = {
        id: Date.now().toString(),
        email: email.trim(),
        subscribedAt: new Date().toISOString(),
        status: 'active'
      };

      subscribers.push(newSubscriber);
      localStorage.setItem('newsletter_subscribers', JSON.stringify(subscribers));

      // Success state
      setIsSubscribed(true);
      setEmail('');
      
      addNotification({
        type: 'success',
        title: 'Successfully Subscribed!',
        message: 'Thank you for subscribing! You\'ll receive updates about new products and special offers.'
      });

      // Reset success state after 5 seconds
      setTimeout(() => {
        setIsSubscribed(false);
      }, 5000);

    } catch (error) {
      addNotification({
        type: 'error',
        title: 'Subscription Failed',
        message: 'Something went wrong. Please try again later.'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="py-12 px-4 bg-gradient-to-r from-light-pink to-light-blue relative overflow-hidden">
      {/* Background Decorations */}
      <div className="absolute top-10 left-10 text-4xl opacity-10 animate-float">📧</div>
      <div className="absolute top-20 right-20 text-3xl opacity-10 animate-float" style={{ animationDelay: '1s' }}>🌸</div>
      <div className="absolute bottom-20 left-20 text-3xl opacity-10 animate-float" style={{ animationDelay: '2s' }}>🎁</div>

      <div className="container mx-auto text-center relative z-10">
        <div className="max-w-2xl mx-auto">
          {/* Header */}
          <div className="mb-6">
            <div className="w-12 h-12 bg-white bg-opacity-20 rounded-full flex items-center justify-center mx-auto mb-3">
              <Mail size={24} className="text-dark-gray" />
            </div>
            <h2 className="font-lora text-2xl md:text-3xl font-bold text-dark-gray mb-3">
              Stay Updated
            </h2>
            <p className="text-dark-gray text-base mb-2">
              Get notified about new products, special offers, and upcoming collections.
            </p>
            <p className="text-dark-gray text-sm opacity-80">
              Join over 1,000+ happy subscribers who never miss our latest updates!
            </p>
          </div>

          {/* Newsletter Form */}
          <form onSubmit={handleSubmit} className="max-w-lg mx-auto">
            <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-3">
              <div className="flex-1 relative">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email address"
                  disabled={isSubmitting || isSubscribed}
                  className="w-full px-4 py-3 pl-10 rounded-full border-2 border-white border-opacity-30 bg-white bg-opacity-95 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-50 focus:border-white text-dark-gray placeholder-gray-600 font-medium shadow-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 hover:bg-opacity-100"
                  style={{
                    fontSize: '16px', // Prevents zoom on iOS
                    lineHeight: '1.2'
                  }}
                />
                <Mail size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
              </div>
              
              <button
                type="submit"
                disabled={isSubmitting || isSubscribed}
                className="bg-dark-gray text-white px-6 py-3 rounded-full hover:bg-opacity-90 hover:shadow-lg transition-all duration-300 font-medium flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed min-w-[140px] shadow-lg transform hover:scale-105"
              >
                {isSubmitting ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>Subscribing...</span>
                  </>
                ) : isSubscribed ? (
                  <>
                    <CheckCircle size={18} />
                    <span>Subscribed!</span>
                  </>
                ) : (
                  <>
                    <Mail size={18} />
                    <span>Subscribe</span>
                  </>
                )}
              </button>
            </div>

            {/* Success Message */}
            {isSubscribed && (
              <div className="mt-4 p-3 bg-white bg-opacity-90 rounded-lg flex items-center justify-center space-x-2 text-dark-gray animate-fade-in shadow-lg">
                <CheckCircle size={18} className="text-green-600" />
                <span className="font-medium text-sm">Welcome to our newsletter family! 🎉</span>
              </div>
            )}
          </form>

          {/* Benefits */}
          <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm">
            <div className="flex flex-col items-center space-y-1 text-dark-gray">
              <div className="w-6 h-6 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
                <span className="text-sm">🔔</span>
              </div>
              <span className="font-medium text-xs">New Product Alerts</span>
            </div>
            <div className="flex flex-col items-center space-y-1 text-dark-gray">
              <div className="w-6 h-6 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
                <span className="text-sm">💰</span>
              </div>
              <span className="font-medium text-xs">Exclusive Discounts</span>
            </div>
            <div className="flex flex-col items-center space-y-1 text-dark-gray">
              <div className="w-6 h-6 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
                <span className="text-sm">⭐</span>
              </div>
              <span className="font-medium text-xs">Early Access</span>
            </div>
          </div>

          {/* Privacy Note */}
          <div className="mt-4 p-3 bg-white bg-opacity-10 rounded-lg">
            <p className="text-xs text-dark-gray opacity-80 leading-relaxed">
              🔒 We respect your privacy. Unsubscribe at any time. No spam, ever.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default NewsletterSection;