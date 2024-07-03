import React from "react";
import './StarRating.css'

const StarRating = ({ rating, onRatingChange }) => {
  const stars = [1, 2, 3, 4, 5];

  return (
    <div className="star-rating">
      {stars.map((star) => (
        <span
          key={star}
          className={star <= rating ? "star-filled" : "star-empty"}
          onClick={() => onRatingChange(star)}
        >
          &#9733; {/* Unicode star character */}
        </span>
      ))}
    </div>
  );
};

export default StarRating;
