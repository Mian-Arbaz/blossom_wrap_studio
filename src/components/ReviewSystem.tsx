import React, { useState, useEffect } from 'react';
import { Star, ThumbsUp, MessageCircle, User } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useNotification } from '../contexts/NotificationContext';

interface Review {
  id: string;
  userId: string;
  userName: string;
  rating: number;
  comment: string;
  timestamp: string;
  helpful: number;
  verified: boolean;
}

interface ReviewSystemProps {
  productId: string;
}

const ReviewSystem: React.FC<ReviewSystemProps> = ({ productId }) => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [newReview, setNewReview] = useState({ rating: 5, comment: '' });
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [sortBy, setSortBy] = useState<'newest' | 'oldest' | 'highest' | 'lowest'>('newest');
  const { user, isAuthenticated } = useAuth();
  const { addNotification } = useNotification();

  useEffect(() => {
    loadReviews();
  }, [productId]);

  const loadReviews = () => {
    const allReviews = JSON.parse(localStorage.getItem('reviews') || '{}');
    const productReviews = allReviews[productId] || [];
    setReviews(productReviews);
  };

  const submitReview = () => {
    if (!isAuthenticated || !user) {
      addNotification({
        type: 'warning',
        title: 'Login Required',
        message: 'Please login to submit a review.'
      });
      return;
    }

    if (!newReview.comment.trim()) {
      addNotification({
        type: 'error',
        title: 'Review Required',
        message: 'Please write a review comment.'
      });
      return;
    }

    const review: Review = {
      id: Date.now().toString(),
      userId: user.id,
      userName: user.name,
      rating: newReview.rating,
      comment: newReview.comment,
      timestamp: new Date().toISOString(),
      helpful: 0,
      verified: true
    };

    const allReviews = JSON.parse(localStorage.getItem('reviews') || '{}');
    if (!allReviews[productId]) {
      allReviews[productId] = [];
    }
    allReviews[productId].push(review);
    localStorage.setItem('reviews', JSON.stringify(allReviews));

    setReviews([...reviews, review]);
    setNewReview({ rating: 5, comment: '' });
    setShowReviewForm(false);

    addNotification({
      type: 'success',
      title: 'Review Submitted!',
      message: 'Thank you for your feedback.'
    });
  };

  const markHelpful = (reviewId: string) => {
    const allReviews = JSON.parse(localStorage.getItem('reviews') || '{}');
    const productReviews = allReviews[productId] || [];
    const updatedReviews = productReviews.map((review: Review) =>
      review.id === reviewId ? { ...review, helpful: review.helpful + 1 } : review
    );
    
    allReviews[productId] = updatedReviews;
    localStorage.setItem('reviews', JSON.stringify(allReviews));
    setReviews(updatedReviews);
  };

  const sortedReviews = [...reviews].sort((a, b) => {
    switch (sortBy) {
      case 'newest':
        return new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime();
      case 'oldest':
        return new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime();
      case 'highest':
        return b.rating - a.rating;
      case 'lowest':
        return a.rating - b.rating;
      default:
        return 0;
    }
  });

  const averageRating = reviews.length > 0 
    ? reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length 
    : 0;

  const ratingDistribution = [5, 4, 3, 2, 1].map(rating => ({
    rating,
    count: reviews.filter(review => review.rating === rating).length,
    percentage: reviews.length > 0 ? (reviews.filter(review => review.rating === rating).length / reviews.length) * 100 : 0
  }));

  return (
    <div className="space-y-6">
      {/* Review Summary */}
      <div className="bg-gray-50 rounded-lg p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="text-center">
            <div className="text-4xl font-bold text-dark-gray mb-2">
              {averageRating.toFixed(1)}
            </div>
            <div className="flex items-center justify-center mb-2">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  size={20}
                  className={`${
                    i < Math.round(averageRating) ? 'text-yellow-400 fill-current' : 'text-gray-300'
                  }`}
                />
              ))}
            </div>
            <p className="text-gray-600">{reviews.length} reviews</p>
          </div>
          
          <div className="space-y-2">
            {ratingDistribution.map(({ rating, count, percentage }) => (
              <div key={rating} className="flex items-center space-x-2">
                <span className="text-sm w-8">{rating}★</span>
                <div className="flex-1 bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-yellow-400 h-2 rounded-full"
                    style={{ width: `${percentage}%` }}
                  ></div>
                </div>
                <span className="text-sm text-gray-600 w-8">{count}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Write Review */}
      <div className="border-t border-gray-200 pt-6">
        {!showReviewForm ? (
          <button
            onClick={() => setShowReviewForm(true)}
            className="bg-light-pink text-dark-gray px-6 py-3 rounded-lg hover:bg-opacity-80 transition-all duration-300 flex items-center space-x-2"
          >
            <MessageCircle size={20} />
            <span>Write a Review</span>
          </button>
        ) : (
          <div className="bg-gray-50 rounded-lg p-6">
            <h3 className="font-semibold text-dark-gray mb-4">Write Your Review</h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-dark-gray mb-2">
                  Rating
                </label>
                <div className="flex items-center space-x-1">
                  {[1, 2, 3, 4, 5].map((rating) => (
                    <button
                      key={rating}
                      onClick={() => setNewReview({ ...newReview, rating })}
                      className="p-1"
                    >
                      <Star
                        size={24}
                        className={`${
                          rating <= newReview.rating
                            ? 'text-yellow-400 fill-current'
                            : 'text-gray-300'
                        } hover:text-yellow-400 transition-colors duration-200`}
                      />
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-dark-gray mb-2">
                  Your Review
                </label>
                <textarea
                  value={newReview.comment}
                  onChange={(e) => setNewReview({ ...newReview, comment: e.target.value })}
                  rows={4}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-light-pink focus:border-transparent resize-none"
                  placeholder="Share your experience with this product..."
                />
              </div>

              <div className="flex items-center space-x-4">
                <button
                  onClick={submitReview}
                  className="bg-light-pink text-dark-gray px-6 py-2 rounded-lg hover:bg-opacity-80 transition-all duration-300"
                >
                  Submit Review
                </button>
                <button
                  onClick={() => setShowReviewForm(false)}
                  className="text-gray-600 hover:text-dark-gray transition-colors duration-300"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Reviews List */}
      {reviews.length > 0 && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold text-dark-gray">Customer Reviews</h3>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="border border-gray-300 rounded px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-light-pink"
            >
              <option value="newest">Newest First</option>
              <option value="oldest">Oldest First</option>
              <option value="highest">Highest Rating</option>
              <option value="lowest">Lowest Rating</option>
            </select>
          </div>

          <div className="space-y-4">
            {sortedReviews.map((review) => (
              <div key={review.id} className="border border-gray-200 rounded-lg p-4">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-light-pink rounded-full flex items-center justify-center">
                      <User size={16} className="text-dark-gray" />
                    </div>
                    <div>
                      <div className="flex items-center space-x-2">
                        <span className="font-medium text-dark-gray">{review.userName}</span>
                        {review.verified && (
                          <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs">
                            Verified
                          </span>
                        )}
                      </div>
                      <div className="flex items-center space-x-2">
                        <div className="flex items-center">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              size={14}
                              className={`${
                                i < review.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
                              }`}
                            />
                          ))}
                        </div>
                        <span className="text-sm text-gray-600">
                          {new Date(review.timestamp).toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
                
                <p className="text-gray-700 mb-3">{review.comment}</p>
                
                <button
                  onClick={() => markHelpful(review.id)}
                  className="flex items-center space-x-2 text-sm text-gray-600 hover:text-dark-gray transition-colors duration-300"
                >
                  <ThumbsUp size={14} />
                  <span>Helpful ({review.helpful})</span>
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ReviewSystem;