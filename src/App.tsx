import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { CartProvider } from './contexts/CartContext';
import { ComparisonProvider } from './contexts/ComparisonContext';
import { NotificationProvider } from './contexts/NotificationContext';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import WhatsAppButton from './components/WhatsAppButton';
import Footer from './components/Footer';
import NotificationToast from './components/NotificationToast';
import PerformanceOptimizer from './components/PerformanceOptimizer';
import HomePage from './pages/HomePage';
import ProductsPage from './pages/ProductsPage';
import AllProductsPage from './pages/AllProductsPage';
import ProductDetailPage from './pages/ProductDetailPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import ContactPage from './pages/ContactPage';
import AdminPage from './pages/AdminPage';
import UpcomingProductsPage from './pages/UpcomingProductsPage';
import WishlistPage from './pages/WishlistPage';
import PrivacyPolicyPage from './pages/PrivacyPolicyPage';
import TermsOfServicePage from './pages/TermsOfServicePage';
import ShippingInfoPage from './pages/ShippingInfoPage';
import ReturnsPage from './pages/ReturnsPage';
import FAQPage from './pages/FAQPage';
import LinkAuditPage from './pages/LinkAuditPage';

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <ComparisonProvider>
          <NotificationProvider>
            <Router>
              <div className="min-h-screen bg-white font-poppins">
                <PerformanceOptimizer />
                <Header />
                <Sidebar />
                <main className="transition-all duration-300">
                  <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/products" element={<AllProductsPage />} />
                    <Route path="/products/:category" element={<ProductsPage />} />
                    <Route path="/product/:id" element={<ProductDetailPage />} />
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/register" element={<RegisterPage />} />
                    <Route path="/contact" element={<ContactPage />} />
                    <Route path="/admin" element={<AdminPage />} />
                    <Route path="/upcoming" element={<UpcomingProductsPage />} />
                    <Route path="/wishlist" element={<WishlistPage />} />
                    <Route path="/privacy" element={<PrivacyPolicyPage />} />
                    <Route path="/terms" element={<TermsOfServicePage />} />
                    <Route path="/shipping" element={<ShippingInfoPage />} />
                    <Route path="/returns" element={<ReturnsPage />} />
                    <Route path="/faq" element={<FAQPage />} />
                    <Route path="/link-audit" element={<LinkAuditPage />} />
                  </Routes>
                </main>
                <Footer />
                <WhatsAppButton />
                <NotificationToast />
              </div>
            </Router>
          </NotificationProvider>
        </ComparisonProvider>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;