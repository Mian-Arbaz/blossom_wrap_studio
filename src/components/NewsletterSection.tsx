import React, { useState } from 'react';
import { Mail, CheckCircle, AlertCircle } from 'lucide-react';
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
    <section className="py-16 px-4 bg-gradient-to-r from-light-pink to-light-blue relative overflow-hidden">
      {/* Background Decorations */}
      <div className="absolute top-10 left-10 text-4xl opacity-10 animate-float">📧</div>
      <div className="absolute top-20 right-20 text-3xl opacity-10 animate-float" style={{ animationDelay: '1s' }}>🌸</div>
      <div className="absolute bottom-20 left-20 text-3xl opacity-10 animate-float" style={{ animationDelay: '2s' }}>🎁</div>

      <div className="container mx-auto text-center relative z-10">
        <div className="max-w-2xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <div className="w-16 h-16 bg-white bg-opacity-20 rounded-full flex items-center justify-center mx-auto mb-4">
              <Mail size={32} className="text-dark-gray" />
            </div>
            <h2 className="font-lora text-3xl md:text-4xl font-bold text-dark-gray mb-4">
              Stay Updated
            </h2>
            <p className="text-dark-gray text-lg mb-2">
              Get notified about new products, special offers, and upcoming collections.
            </p>
            <p className="text-dark-gray text-sm opacity-80">
              Join over 1,000+ happy subscribers who never miss our latest updates!
            </p>
          </div>

          {/* Newsletter Form */}
          <form onSubmit={handleSubmit} className="max-w-lg mx-auto">
            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
              <div className="flex-1 relative">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email address"
                  disabled={isSubmitting || isSubscribed}
                  className="w-full px-4 py-4 pl-12 rounded-full border-2 border-white border-opacity-30 bg-white bg-opacity-95 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-50 focus:border-white text-dark-gray placeholder-gray-600 font-medium shadow-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 hover:bg-opacity-100"
                  style={{
                    fontSize: '16px', // Prevents zoom on iOS
                    lineHeight: '1.5'
                  }}
                />
                <Mail size={20} className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500" />
              </div>
              
              <button
                type="submit"
                disabled={isSubmitting || isSubscribed}
                className="bg-dark-gray text-white px-8 py-4 rounded-full hover:bg-opacity-90 hover:shadow-lg transition-all duration-300 font-medium flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed min-w-[160px] shadow-lg transform hover:scale-105"
              >
                {isSubmitting ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>Subscribing...</span>
                  </>
                ) : isSubscribed ? (
                  <>
                    <CheckCircle size={20} />
                    <span>Subscribed!</span>
                  </>
                ) : (
                  <>
                    <Mail size={20} />
                    <span>Subscribe</span>
                  </>
                )}
              </button>
            </div>

            {/* Success Message */}
            {isSubscribed && (
              <div className="mt-6 p-4 bg-white bg-opacity-90 rounded-lg flex items-center justify-center space-x-2 text-dark-gray animate-fade-in shadow-lg">
                <CheckCircle size={20} className="text-green-600" />
                <span className="font-medium">Welcome to our newsletter family! 🎉</span>
              </div>
            )}
          </form>

          {/* Benefits */}
          <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-6 text-sm">
            <div className="flex flex-col items-center space-y-2 text-dark-gray">
              <div className="w-8 h-8 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
                <span className="text-lg">🔔</span>
              </div>
              <span className="font-medium">New Product Alerts</span>
            </div>
            <div className="flex flex-col items-center space-y-2 text-dark-gray">
              <div className="w-8 h-8 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
                <span className="text-lg">💰</span>
              </div>
              <span className="font-medium">Exclusive Discounts</span>
            </div>
            <div className="flex flex-col items-center space-y-2 text-dark-gray">
              <div className="w-8 h-8 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
                <span className="text-lg">⭐</span>
              </div>
              <span className="font-medium">Early Access</span>
            </div>
          </div>

          {/* Privacy Note */}
          <div className="mt-8 p-4 bg-white bg-opacity-10 rounded-lg">
            <p className="text-sm text-dark-gray opacity-80 leading-relaxed">
              🔒 We respect your privacy. Unsubscribe at any time. No spam, ever.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default NewsletterSection;