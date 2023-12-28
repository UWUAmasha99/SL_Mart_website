import React, { useState, useEffect } from "react";
import axios from "axios";

const Rating = ({ productId }) => {
  const [averageRating, setAverageRating] = useState(0);

  useEffect(() => {
    // Fetch the average rating for the specific productId
    const fetchAverageRating = async () => {
      try {
        const { data } = await axios.get(`/api/v1/product/product-ratings/${productId}`);
        setAverageRating(data.averageRating);
      } catch (error) {
        console.error(error);
      }
    };

    fetchAverageRating();
  }, [productId]);

  const renderStars = (rating) => {
    const stars = [];
    const yellowStarStyle = {
      color: "#FFD700",
    };

    for (let i = 1; i <= 5; i++) {
      if (i <= rating) {
        stars.push(
          <i key={i} style={yellowStarStyle} className="fas fa-star"></i>
        );
      } else if (i - 0.5 <= rating) {
        stars.push(
          <i key={i} style={yellowStarStyle} className="fas fa-star-half-alt"></i>
        );
      } else {
        stars.push(<i key={i} className="far fa-star"></i>);
      }
    }
    return stars;
  };

  return (
    <div className="average-rating">
      <p><b>Ratings :</b></p> <p className="stars">{renderStars(averageRating)}</p>
    </div>
  );
};

export default Rating;
