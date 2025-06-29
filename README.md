# 🌸 Blossom Wrap Studio

**Makes You Smile**

A beautiful e-commerce website for handmade gifts, flowers, and decorations based in Pakistan. Built with React, TypeScript, and Tailwind CSS.

## 🌐 Live Demo

**Website:** https://ornate-fenglisu-04b7f6.netlify.app

## 📋 Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
- [Project Structure](#project-structure)
- [Authentication](#authentication)
- [Admin Panel](#admin-panel)
- [Deployment](#deployment)
- [Contributing](#contributing)
- [License](#license)

## ✨ Features

### 🛍️ Customer Features
- **Product Catalog**: Browse products by categories (Handmade Flowers, Gift Packs, Calligraphy, etc.)
- **Product Details**: Detailed product pages with images, descriptions, and pricing
- **User Authentication**: Register and login system for members
- **Upcoming Products**: Members-only access to preview upcoming items
- **Contact Form**: Get in touch with the store owners
- **WhatsApp Integration**: Direct chat button for instant communication
- **Responsive Design**: Optimized for mobile and desktop devices
- **Social Media Links**: Connect with the brand on social platforms

### 🔧 Admin Features
- **Product Management**: Add, edit, and delete products
- **Image Upload**: Support for product images via URL or file upload
- **Category Management**: Organize products into different categories
- **User Management**: View registered users
- **Message Management**: View and manage contact form submissions
- **Upcoming Products**: Mark products as "coming soon"

## 🛠️ Tech Stack

- **Frontend**: React 18 + TypeScript
- **Styling**: Tailwind CSS
- **Routing**: React Router DOM
- **Icons**: Lucide React
- **Build Tool**: Vite
- **Deployment**: Netlify
- **Storage**: Local Storage (for demo purposes)

## 🚀 Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd blossom-wrap-studio
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:5173`

### Build for Production

```bash
npm run build
```

### Preview Production Build

```bash
npm run preview
```

## 📁 Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── Header.tsx      # Navigation header
│   ├── Sidebar.tsx     # Category sidebar
│   ├── Footer.tsx      # Site footer
│   ├── ProductCard.tsx # Product display card
│   └── WhatsAppButton.tsx # Floating WhatsApp button
├── contexts/           # React contexts
│   └── AuthContext.tsx # Authentication context
├── data/              # Data management
│   └── products.ts    # Product data and utilities
├── pages/             # Page components
│   ├── HomePage.tsx
│   ├── ProductsPage.tsx
│   ├── ProductDetailPage.tsx
│   ├── LoginPage.tsx
│   ├── RegisterPage.tsx
│   ├── ContactPage.tsx
│   ├── AdminPage.tsx
│   └── UpcomingProductsPage.tsx
├── App.tsx            # Main app component
├── main.tsx          # App entry point
└── index.css         # Global styles
```

## 🔐 Authentication

The application uses a simple authentication system with local storage for demo purposes.

### Demo Accounts

**Admin Account:**
- Email: `admin@blossomwrap.com`
- Password: `admin123`

**User Account:**
- Register a new account or use the demo login buttons

### Features by Role

**Authenticated Users:**
- Access to upcoming products
- Ability to save favorites (UI ready)
- Contact form submissions

**Admin Users:**
- Full product management
- User management
- Message management
- Admin dashboard with statistics

## 🎛️ Admin Panel

Access the admin panel at `/admin` (requires admin login).

### Admin Features:
- **Dashboard**: Overview statistics and metrics
- **Product Management**: 
  - Add new products with images
  - Edit existing products
  - Delete products
  - Mark products as upcoming
- **User Management**: View registered users
- **Message Management**: View contact form submissions

## 🎨 Design System

### Colors
- **Light Pink**: `#FADADD`
- **Light Blue**: `#ADD8E6`
- **Dark Gray**: `#333333`
- **White**: `#FFFFFF`

### Typography
- **Headings**: Lora (serif)
- **Body Text**: Poppins (sans-serif)

### Components
- Responsive grid layouts
- Hover animations and transitions
- Gradient backgrounds
- Shadow effects
- Rounded corners and modern styling

## 📱 Responsive Design

The application is fully responsive with breakpoints for:
- Mobile: `< 768px`
- Tablet: `768px - 1024px`
- Desktop: `> 1024px`

## 🌐 Deployment

### Netlify Deployment

The site is automatically deployed to Netlify. For manual deployment:

1. **Build the project**
   ```bash
   npm run build
   ```

2. **Deploy to Netlify**
   - Drag and drop the `dist` folder to Netlify
   - Or connect your GitHub repository for automatic deployments

### Environment Variables

For production deployment, you may want to set up:
- `VITE_WHATSAPP_NUMBER`: WhatsApp contact number
- `VITE_API_URL`: Backend API URL (if implementing a backend)

## 🔧 Customization

### Adding New Categories

1. Update the `categories` array in `src/data/products.ts`
2. Add appropriate icons and names
3. The routing will automatically work

### Modifying Colors

Update the color scheme in `tailwind.config.js`:

```javascript
colors: {
  'light-pink': '#FADADD',
  'light-blue': '#ADD8E6',
  'dark-gray': '#333333',
}
```

### Adding New Product Fields

1. Update the `Product` interface in `src/data/products.ts`
2. Modify the admin form in `AdminPage.tsx`
3. Update the product display components

## 📞 Contact Integration

### WhatsApp Integration
The WhatsApp button opens a chat with a pre-filled message. Update the phone number in:
- `src/components/WhatsAppButton.tsx`
- `src/pages/ContactPage.tsx`
- `src/pages/ProductDetailPage.tsx`

### Contact Form
Messages are stored in local storage. For production, integrate with:
- Email services (EmailJS, Formspree)
- Backend API
- Database storage

## 🚀 Future Enhancements

### Recommended Improvements:
- **Backend Integration**: Replace local storage with a proper database
- **Payment Gateway**: Add Stripe, PayPal, or local payment methods
- **Email Notifications**: Automated emails for orders and inquiries
- **Search Functionality**: Product search and filtering
- **Reviews System**: Customer reviews and ratings
- **Inventory Management**: Stock tracking and management
- **Order Management**: Order processing and tracking
- **SEO Optimization**: Meta tags, sitemap, and structured data

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Design Inspiration**: Modern e-commerce websites
- **Icons**: Lucide React icon library
- **Images**: Pexels for stock photography
- **Fonts**: Google Fonts (Lora & Poppins)

## 📧 Support

For support and inquiries:
- **Email**: info@blossomwrap.com
- **WhatsApp**: +92 300 1234567
- **Location**: Lahore, Pakistan

---

**Made with ❤️ by Blossom Wrap Studio**

*This project showcases a modern, responsive e-commerce website built with React and TypeScript, featuring a beautiful design system and comprehensive admin functionality.* 
[![Netlify Status](https://api.netlify.com/api/v1/badges/1b2cf818-a43c-4484-9468-de67d28a0560/deploy-status)](https://app.netlify.com/projects/ornate-fenglisu-04b7f6/deploys)
