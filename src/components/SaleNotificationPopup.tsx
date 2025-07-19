import React, { useState, useEffect } from 'react';
import { X, ShoppingBag } from 'lucide-react';

interface SaleNotification {
  id: string;
  customerName: string;
  location: string;
  productName: string;
  timeAgo: string;
}

const SaleNotificationPopup: React.FC = () => {
  const [currentNotification, setCurrentNotification] = useState<SaleNotification | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  // Sample data for notifications
  const sampleNotifications: Omit<SaleNotification, 'id'>[] = [
    { customerName: 'Areeba', location: 'Lahore', productName: 'Elegant Rose Bouquet', timeAgo: '2 hours ago' },
    { customerName: 'Muhammad Ali', location: 'Karachi', productName: 'Premium Gift Box Set', timeAgo: '3 minutes ago' },
    { customerName: 'Fatima', location: 'Islamabad', productName: 'Custom Calligraphy Art', timeAgo: '1 hour ago' },
    { customerName: 'Hassan', location: 'Faisalabad', productName: 'Birthday Surprise Package', timeAgo: '45 minutes ago' },
    { customerName: 'Ayesha', location: 'Multan', productName: 'Couple Memory Book', timeAgo: '30 minutes ago' },
    { customerName: 'Omar', location: 'Peshawar', productName: 'Luxury Gift Wrapping', timeAgo: '1 day ago' },
    { customerName: 'Zainab', location: 'Quetta', productName: 'Sakura Blossom Collection', timeAgo: '4 hours ago' },
    { customerName: 'Ahmed', location: 'Sialkot', productName: 'Anniversary Special Box', timeAgo: '6 hours ago' },
    { customerName: 'Mariam', location: 'Gujranwala', productName: 'Wedding Invitation Calligraphy', timeAgo: '2 days ago' },
    { customerName: 'Bilal', location: 'Hyderabad', productName: 'Inspirational Quote Art', timeAgo: '5 minutes ago' },
    { customerName: 'Sana', location: 'Rawalpindi', productName: 'Arabic Calligraphy Art', timeAgo: '1 hour ago' },
    { customerName: 'Usman', location: 'Bahawalpur', productName: 'Sunflower Arrangement', timeAgo: '3 hours ago' }
  ];

  const getRandomNotification = (): SaleNotification => {
    const randomIndex = Math.floor(Math.random() * sampleNotifications.length);
    const notification = sampleNotifications[randomIndex];
    return {
      ...notification,
      id: Date.now().toString() + Math.random().toString(36).substr(2, 9)
    };
  };

  const showNotification = () => {
    const notification = getRandomNotification();
    setCurrentNotification(notification);
    setIsVisible(true);

    // Auto-hide after 5 seconds
    setTimeout(() => {
      hideNotification();
    }, 5000);
  };

  const hideNotification = () => {
    setIsVisible(false);
    setTimeout(() => {
      setCurrentNotification(null);
    }, 300); // Wait for fade-out animation
  };

  useEffect(() => {
    // Show first notification after 10 seconds
    const initialTimer = setTimeout(() => {
      showNotification();
    }, 10000);

    // Then show notifications every 20-30 seconds
    const intervalTimer = setInterval(() => {
      if (!isVisible) {
        showNotification();
      }
    }, Math.random() * 10000 + 20000); // Random between 20-30 seconds

    return () => {
      clearTimeout(initialTimer);
      clearInterval(intervalTimer);
    };
  }, [isVisible]);

  if (!currentNotification) return null;

  return (
    <div
      className={`fixed bottom-6 left-6 z-50 max-w-sm w-full transition-all duration-300 ease-in-out transform ${
        isVisible 
          ? 'translate-y-0 opacity-100 scale-100' 
          : 'translate-y-4 opacity-0 scale-95'
      }`}
    >
      <div className="bg-white dark:bg-dark-surface-secondary border border-gray-200 dark:border-dark-surface-tertiary rounded-lg shadow-lg p-4 relative overflow-hidden">
        {/* Background gradient accent */}
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-light-pink to-light-blue"></div>
        
        {/* Close button */}
        <button
          onClick={hideNotification}
          className="absolute top-2 right-2 p-1 text-gray-400 hover:text-gray-600 dark:text-dark-text-tertiary dark:hover:text-dark-text-secondary transition-colors duration-200"
          aria-label="Close notification"
        >
          <X size={16} />
        </button>

        {/* Notification content */}
        <div className="flex items-start space-x-3 pr-6">
          <div className="w-8 h-8 bg-gradient-to-r from-light-pink to-light-blue dark:from-dark-accent-pink dark:to-dark-accent-blue rounded-full flex items-center justify-center flex-shrink-0">
            <ShoppingBag size={16} className="text-dark-gray dark:text-dark-surface-primary" />
          </div>
          
          <div className="flex-1 min-w-0">
            <div className="flex items-center space-x-1 mb-1">
              <span className="text-sm font-medium text-dark-gray dark:text-dark-text-primary">
                {currentNotification.customerName}
              </span>
              <span className="text-xs text-gray-500 dark:text-dark-text-tertiary">
                from {currentNotification.location}
              </span>
            </div>
            
            <p className="text-sm text-gray-700 dark:text-dark-text-secondary mb-1">
              just purchased{' '}
              <span className="font-medium text-light-pink dark:text-dark-accent-pink">
                "{currentNotification.productName}"
              </span>
            </p>
            
            <p className="text-xs text-gray-500 dark:text-dark-text-tertiary">
              {currentNotification.timeAgo}
            </p>
          </div>
        </div>

        {/* Pulse animation indicator */}
        <div className="absolute -top-1 -left-1 w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
      </div>
    </div>
  );
};

export default SaleNotificationPopup;