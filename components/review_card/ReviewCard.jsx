import React from 'react';
import './review_card.css';

const ReviewCard = ({ title, movie, comment, date, likes }) => {
  return (
    <div className="review-card">
      <h2>{title}</h2>
      <p>{movie}</p>
      <p>{comment}</p>
      <p>{date}</p>
      <div className="like-review">
        <span>🔍 Like Review</span>
        <span>{likes} likes</span>
      </div>
    </div>
  );
};

export default ReviewCard;