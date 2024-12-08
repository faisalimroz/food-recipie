import React, { useState } from 'react';
import { FaStar } from 'react-icons/fa';

const ReviewCard = ({ reviews }) => {
  const [showAll, setShowAll] = useState(false);

  if (reviews.length === 0) {
    return (
      <div className="mt-8 text-center">
        <h5 className="text-2xl font-semibold mb-4">Reviews</h5>
        <p className="text-gray-600">No reviews available for this service yet. Be the first to leave a review!</p>
      </div>
    );
  }

  const reviewsToShow = showAll ? reviews : reviews.slice(0, 3);

  return (
    <div className="mt-8">
      <h5 className="text-2xl font-semibold mb-4">Reviews</h5>
      <ul className="space-y-6">
        {reviewsToShow.map((review) => (
          <li key={review._id} className="border p-4 rounded-lg shadow-sm">
            <div className="review-profile flex items-start mb-4">
              <div className="review-img flex-shrink-0">
                <img
                  src={review.userId.photoURL || 'https://via.placeholder.com/150'}
                  className="img-fluid rounded-full w-12 h-12"
                  alt="User Avatar"
                />
              </div>
              <div className="review-name ml-4">
                <h6 className="text-lg font-semibold">{review.userId.displayName}</h6>
                <p className="text-sm text-gray-600">
                  {new Date(review.createdAt).toLocaleString('en-US', {
                    weekday: 'long',
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit',
                  })}
                </p>
              </div>
              <div className="ml-auto flex items-center mt-3">
                <div className="rating flex">
                  {[...Array(review.rating)].map((_, i) => (
                    <FaStar key={i} className="text-yellow-500" />
                  ))}
                </div>
              </div>
            </div>
            <p className="mb-4 text-gray-700">{review.comment}</p>
          </li>
        ))}
      </ul>
      {reviews.length > 3 && (
        <div className="text-center mt-6">
          <button
            onClick={() => setShowAll(!showAll)}
            className="text-white bg-[#22c55e] inline-flex items-center justify-center px-4 py-2 rounded text-sm border border-[#22c55e]"
          >
            {showAll ? 'Show Less' : 'View All Reviews'}
          </button>
        </div>
      )}
    </div>
  );
};

export default ReviewCard;
