import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, X, ZoomIn } from 'lucide-react';
import OptimizedImage from './OptimizedImage';

interface ImageGalleryProps {
  images: string[];
  productName: string;
}

const ImageGallery: React.FC<ImageGalleryProps> = ({ images, productName }) => {
  const [selectedImage, setSelectedImage] = useState(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);

  const nextImage = () => {
    setSelectedImage((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setSelectedImage((prev) => (prev - 1 + images.length) % images.length);
  };

  const openLightbox = () => {
    setIsLightboxOpen(true);
  };

  const closeLightbox = () => {
    setIsLightboxOpen(false);
  };

  // Generate placeholder for better loading experience
  const generatePlaceholder = (width: number, height: number) => {
    return `data:image/svg+xml;base64,${btoa(`
      <svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
        <rect width="100%" height="100%" fill="#f3f4f6"/>
        <text x="50%" y="50%" text-anchor="middle" dy=".3em" fill="#9ca3af" font-family="Arial, sans-serif" font-size="16">
          Loading...
        </text>
      </svg>
    `)}`;
  };

  return (
    <>
      <div className="space-y-4">
        {/* Main Image */}
        <div className="relative aspect-square bg-gray-100 rounded-lg overflow-hidden group">
          <OptimizedImage
            src={images[selectedImage]}
            alt={`${productName} ${selectedImage + 1}`}
            className="w-full h-full cursor-zoom-in"
            width={600}
            height={600}
            priority={true}
            placeholder={generatePlaceholder(600, 600)}
            onLoad={() => {
              // Preload next and previous images
              if (images.length > 1) {
                const nextIndex = (selectedImage + 1) % images.length;
                const prevIndex = (selectedImage - 1 + images.length) % images.length;
                
                const preloadNext = new Image();
                preloadNext.src = images[nextIndex];
                
                const preloadPrev = new Image();
                preloadPrev.src = images[prevIndex];
              }
            }}
          />
          
          <div 
            className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-10 transition-all duration-300 flex items-center justify-center cursor-zoom-in"
            onClick={openLightbox}
          >
            <button className="opacity-0 group-hover:opacity-100 bg-white bg-opacity-80 p-2 rounded-full transition-all duration-300">
              <ZoomIn size={20} />
            </button>
          </div>
          
          {/* Navigation Arrows */}
          {images.length > 1 && (
            <>
              <button
                onClick={prevImage}
                className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-80 p-2 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-opacity-100"
              >
                <ChevronLeft size={20} />
              </button>
              <button
                onClick={nextImage}
                className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-80 p-2 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-opacity-100"
              >
                <ChevronRight size={20} />
              </button>
            </>
          )}

          {/* Image Counter */}
          {images.length > 1 && (
            <div className="absolute bottom-4 right-4 bg-black bg-opacity-50 text-white px-2 py-1 rounded text-sm">
              {selectedImage + 1} / {images.length}
            </div>
          )}
        </div>

        {/* Thumbnail Images */}
        {images.length > 1 && (
          <div className="flex space-x-2 overflow-x-auto pb-2">
            {images.map((image, index) => (
              <button
                key={index}
                onClick={() => setSelectedImage(index)}
                className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-all duration-300 ${
                  selectedImage === index 
                    ? 'border-light-pink' 
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <OptimizedImage
                  src={image}
                  alt={`${productName} ${index + 1}`}
                  className="w-full h-full"
                  width={80}
                  height={80}
                  priority={index < 4} // Preload first 4 thumbnails
                  placeholder={generatePlaceholder(80, 80)}
                />
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Lightbox */}
      {isLightboxOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center p-4">
          <div className="relative max-w-4xl max-h-full">
            <OptimizedImage
              src={images[selectedImage]}
              alt={`${productName} ${selectedImage + 1}`}
              className="max-w-full max-h-full object-contain"
              priority={true}
            />
            
            {/* Close Button */}
            <button
              onClick={closeLightbox}
              className="absolute top-4 right-4 bg-white bg-opacity-20 text-white p-2 rounded-full hover:bg-opacity-30 transition-all duration-300"
            >
              <X size={24} />
            </button>

            {/* Navigation */}
            {images.length > 1 && (
              <>
                <button
                  onClick={prevImage}
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-20 text-white p-2 rounded-full hover:bg-opacity-30 transition-all duration-300"
                >
                  <ChevronLeft size={24} />
                </button>
                <button
                  onClick={nextImage}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-20 text-white p-2 rounded-full hover:bg-opacity-30 transition-all duration-300"
                >
                  <ChevronRight size={24} />
                </button>
              </>
            )}

            {/* Image Counter */}
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-white bg-opacity-20 text-white px-3 py-1 rounded-full text-sm">
              {selectedImage + 1} / {images.length}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ImageGallery;