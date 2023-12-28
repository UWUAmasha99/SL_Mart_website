
import React, { useState } from 'react';

const StarRating = ({ initialRating, onRatingChange }) => {
  const [ratingState, setRatingState] = useState(initialRating);

  const handleClick = (newRating) => {
    setRatingState(newRating);
    if (onRatingChange) {
      onRatingChange(newRating);
    }
  };

  return (
    <div className="star-rating">
      {[...Array(5)].map((_, index) => {
        const isFilled = index < ratingState;
        const starIcon = isFilled ? '★' : '☆';

        return (
          <span
            key={index}
            onClick={() => handleClick(index + 1)}
            className={`star ${isFilled ? 'filled' : 'empty'}`}
            style={{ fontSize: '20px', color: isFilled ? '#F7DF2D' : 'black' }}
          >
            {starIcon}
          </span>
        );
      })}
    </div>
  );
};

export default StarRating;

