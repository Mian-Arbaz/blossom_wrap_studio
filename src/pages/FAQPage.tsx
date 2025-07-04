import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, HelpCircle, ChevronDown, ChevronUp, Search, MessageCircle } from 'lucide-react';

const FAQPage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedItems, setExpandedItems] = useState<number[]>([]);

  const faqCategories = [
    {
      title: "Orders & Payments",
      icon: "💳",
      questions: [
        {
          question: "How do I place an order?",
          answer: "You can place an order by browsing our products, adding items to your cart, and proceeding to checkout. You can also contact us directly via WhatsApp for assistance with your order."
        },
        {
          question: "What payment methods do you accept?",
          answer: "We accept Cash on Delivery (COD), bank transfers, JazzCash, Easypaisa, and online payment gateways. For custom orders, we may require advance payment or deposit."
        },
        {
          question: "Can I modify or cancel my order?",
          answer: "You can modify or cancel your order within 2 hours of placing it. After that, please contact our customer service team. Once production has started, modifications may not be possible."
        },
        {
          question: "Do you offer installment payments?",
          answer: "Currently, we don't offer installment payments. However, for large custom orders, we can discuss payment plans. Please contact us to discuss your specific needs."
        },
        {
          question: "Is my payment information secure?",
          answer: "Yes, all payment information is processed through secure, encrypted channels. We don't store your payment details on our servers."
        }
      ]
    },
    {
      title: "Products & Customization",
      icon: "🎨",
      questions: [
        {
          question: "Are your products really handmade?",
          answer: "Yes! All our products are carefully handcrafted by skilled artisans. Each item is unique and made with attention to detail and quality."
        },
        {
          question: "Can I request custom designs?",
          answer: "Absolutely! We specialize in custom orders. Contact us with your requirements, and we'll work with you to create something special. Custom orders typically take 5-10 business days."
        },
        {
          question: "What materials do you use?",
          answer: "We use high-quality materials including premium silk for flowers, quality paper for calligraphy, and durable packaging materials. All materials are carefully selected for longevity and beauty."
        },
        {
          question: "How long do handmade flowers last?",
          answer: "Our handmade flowers are designed to last indefinitely with proper care. Unlike real flowers, they won't wilt or fade, making them perfect for long-lasting decorations."
        },
        {
          question: "Can you match specific colors?",
          answer: "Yes, we can work with specific color requirements for most products. Please provide color references or samples, and we'll do our best to match them."
        }
      ]
    },
    {
      title: "Shipping & Delivery",
      icon: "🚚",
      questions: [
        {
          question: "Do you deliver nationwide?",
          answer: "Yes, we deliver across Pakistan. Major cities receive delivery within 3-5 business days, while remote areas may take 5-7 days."
        },
        {
          question: "What are your shipping charges?",
          answer: "Shipping charges vary by location and delivery speed. Standard delivery ranges from PKR 200-400. We offer free shipping on orders over PKR 3,000."
        },
        {
          question: "Do you offer same-day delivery?",
          answer: "Yes, we offer same-day delivery in Lahore for orders placed before 2:00 PM. This service costs PKR 800-1,200 depending on the location."
        },
        {
          question: "How do I track my order?",
          answer: "Once shipped, you'll receive a tracking number via email and SMS. You can track your package on our website or the courier company's platform."
        },
        {
          question: "What if my package is damaged during shipping?",
          answer: "We pack all items carefully, but if damage occurs during shipping, contact us immediately with photos. We'll arrange a replacement or full refund at no cost to you."
        }
      ]
    },
    {
      title: "Returns & Refunds",
      icon: "↩️",
      questions: [
        {
          question: "What is your return policy?",
          answer: "We offer a 7-day return policy for most items. Items must be in original condition and packaging. Custom and personalized items cannot be returned unless defective."
        },
        {
          question: "How do I return an item?",
          answer: "Contact our customer service within 7 days of delivery. We'll provide a return authorization number and instructions. For our errors, we cover return shipping costs."
        },
        {
          question: "When will I receive my refund?",
          answer: "Refunds are processed within 5-7 business days after we receive and inspect the returned item. The time to appear in your account depends on your payment method."
        },
        {
          question: "Can I exchange an item?",
          answer: "We don't offer direct exchanges. Please return the item for a refund and place a new order for the desired product. This ensures faster processing."
        },
        {
          question: "What if I received the wrong item?",
          answer: "If you received the wrong item, contact us immediately. We'll arrange for the correct item to be sent and provide a prepaid return label for the incorrect item."
        }
      ]
    },
    {
      title: "Account & Website",
      icon: "👤",
      questions: [
        {
          question: "Do I need an account to place an order?",
          answer: "No, you can place orders as a guest. However, creating an account allows you to track orders, save favorites, and access exclusive upcoming products."
        },
        {
          question: "How do I reset my password?",
          answer: "Click 'Forgot Password' on the login page and enter your email. You'll receive instructions to reset your password. If you need help, contact our support team."
        },
        {
          question: "Can I change my delivery address?",
          answer: "You can change your delivery address in your account settings. For orders already placed, contact us within 2 hours to modify the address."
        },
        {
          question: "How do I unsubscribe from emails?",
          answer: "Click the 'Unsubscribe' link at the bottom of any email, or contact us directly. You can also manage your email preferences in your account settings."
        },
        {
          question: "Is my personal information safe?",
          answer: "Yes, we take privacy seriously. Your information is encrypted and stored securely. We never share your personal data with third parties without your consent."
        }
      ]
    },
    {
      title: "Business & Services",
      icon: "🏢",
      questions: [
        {
          question: "Do you offer bulk discounts?",
          answer: "Yes, we offer discounts for bulk orders and corporate clients. Contact us with your requirements for a custom quote."
        },
        {
          question: "Can you handle wedding decorations?",
          answer: "Absolutely! We specialize in wedding decorations including handmade flowers, centerpieces, and custom arrangements. We recommend booking at least 4-6 weeks in advance."
        },
        {
          question: "Do you provide gift wrapping services?",
          answer: "Yes, we offer professional gift wrapping services. You can add this option during checkout or request it when placing a custom order."
        },
        {
          question: "Are you available for consultations?",
          answer: "Yes, we offer free consultations for custom projects and large orders. Contact us to schedule a call or meeting to discuss your requirements."
        },
        {
          question: "Do you work with event planners?",
          answer: "Yes, we collaborate with event planners and wedding coordinators. We offer special rates and dedicated support for professional partners."
        }
      ]
    }
  ];

  const toggleExpanded = (index: number) => {
    setExpandedItems(prev => 
      prev.includes(index) 
        ? prev.filter(i => i !== index)
        : [...prev, index]
    );
  };

  const filteredFAQs = faqCategories.map(category => ({
    ...category,
    questions: category.questions.filter(
      q => 
        q.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
        q.answer.toLowerCase().includes(searchQuery.toLowerCase())
    )
  })).filter(category => category.questions.length > 0);

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
              <HelpCircle size={24} className="text-dark-gray" />
            </div>
            <div>
              <h1 className="font-lora text-3xl md:text-4xl font-bold text-dark-gray">
                Frequently Asked Questions
              </h1>
              <p className="text-dark-gray mt-2">
                Find answers to common questions about our products and services
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="py-16 px-4">
        <div className="container mx-auto max-w-4xl">
          
          {/* Search Bar */}
          <div className="mb-12">
            <div className="relative max-w-md mx-auto">
              <Search size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search FAQs..."
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-light-pink focus:border-transparent"
              />
            </div>
          </div>

          {/* FAQ Categories */}
          <div className="space-y-8">
            {filteredFAQs.map((category, categoryIndex) => (
              <div key={categoryIndex} className="bg-white rounded-lg shadow-lg overflow-hidden">
                <div className="bg-gradient-to-r from-light-pink to-light-blue p-6">
                  <h2 className="font-lora text-2xl font-bold text-dark-gray flex items-center space-x-3">
                    <span className="text-3xl">{category.icon}</span>
                    <span>{category.title}</span>
                  </h2>
                </div>
                
                <div className="p-6 space-y-4">
                  {category.questions.map((faq, questionIndex) => {
                    const globalIndex = categoryIndex * 100 + questionIndex;
                    const isExpanded = expandedItems.includes(globalIndex);
                    
                    return (
                      <div key={questionIndex} className="border border-gray-200 rounded-lg">
                        <button
                          onClick={() => toggleExpanded(globalIndex)}
                          className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-gray-50 transition-colors duration-200"
                        >
                          <span className="font-medium text-dark-gray pr-4">{faq.question}</span>
                          {isExpanded ? (
                            <ChevronUp size={20} className="text-gray-500 flex-shrink-0" />
                          ) : (
                            <ChevronDown size={20} className="text-gray-500 flex-shrink-0" />
                          )}
                        </button>
                        
                        {isExpanded && (
                          <div className="px-6 pb-4">
                            <div className="border-t border-gray-200 pt-4">
                              <p className="text-gray-700 leading-relaxed">{faq.answer}</p>
                            </div>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>

          {/* No Results */}
          {searchQuery && filteredFAQs.length === 0 && (
            <div className="text-center py-12">
              <HelpCircle size={48} className="text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-dark-gray mb-2">
                No results found
              </h3>
              <p className="text-gray-600 mb-6">
                We couldn't find any FAQs matching "{searchQuery}". Try different keywords or contact us directly.
              </p>
              <button
                onClick={() => setSearchQuery('')}
                className="bg-light-pink text-dark-gray px-6 py-3 rounded-lg hover:bg-opacity-80 transition-all duration-300 font-medium"
              >
                Clear Search
              </button>
            </div>
          )}

          {/* Contact Support */}
          <div className="mt-16 bg-light-pink bg-opacity-20 rounded-lg p-8 text-center">
            <MessageCircle size={48} className="text-light-pink mx-auto mb-4" />
            <h3 className="font-lora text-2xl font-bold text-dark-gray mb-4">
              Still Have Questions?
            </h3>
            <p className="text-gray-700 mb-6 max-w-2xl mx-auto">
              Can't find the answer you're looking for? Our friendly customer support team is here to help! 
              We typically respond within 2 hours during business hours.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4">
              <Link
                to="/contact"
                className="bg-light-pink text-dark-gray px-6 py-3 rounded-lg hover:bg-opacity-80 transition-all duration-300 font-medium"
              >
                Contact Us
              </Link>
              <button
                onClick={() => {
                  const message = 'Hi! I have a question that\'s not covered in your FAQ.';
                  const whatsappUrl = `https://wa.me/+923001234567?text=${encodeURIComponent(message)}`;
                  window.open(whatsappUrl, '_blank');
                }}
                className="bg-green-500 text-white px-6 py-3 rounded-lg hover:bg-green-600 transition-all duration-300 font-medium flex items-center space-x-2"
              >
                <MessageCircle size={20} />
                <span>WhatsApp Support</span>
              </button>
            </div>
            
            <div className="mt-6 text-sm text-gray-600">
              <p><strong>Support Hours:</strong> Monday - Saturday, 9 AM - 8 PM</p>
              <p><strong>Average Response Time:</strong> Within 2 hours</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FAQPage;