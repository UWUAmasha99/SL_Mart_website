// Import necessary modules and models
import express from "express";
import Rating from "../models/rating.js";


// Create an Express router
const router = express.Router();

// Route for creating a new rating
router.post("/api/v1/submit-rating", async (req, res) => {
  try {
    // Extract data from the request body
    const { userId, productId, rating } = req.body;

    // Check if the user has already rated this product
    const existingRating = await Rating.findOne({ userId, productId });

    if (existingRating) {
      // User has already rated this product, reject the new rating
      res.status(400).json({ message: "You have already rated this product" });
    } else {
      // User hasn't rated this product, create a new rating document
      const newRating = new Rating({
        userId,
        productId,
        rating,
      });

      // Save the new rating to the database
      await newRating.save();

      // Respond with a success message
      res.status(201).json({ message: "Rating created successfully", rating: newRating });
    }
  } catch (error) {
    // Handle errors
    console.error("Error creating rating:", error);
    res.status(500).json({ message: "An error occurred while creating the rating" });
  }
});




// Route for fetching product ratings

// Route to get average product ratings by productId
router.get('/api/v1/product/product-ratings/:productId', async (req, res) => {
  try {
    const { productId } = req.params;

    // Find all ratings for the product by productId
    const ratings = await Rating.find({ productId });

    if (ratings.length === 0) {
      return res.status(404).json({ error: 'No ratings found for the product' });
    }

    // Calculate the average rating
    const totalRatings = ratings.reduce((acc, rating) => acc + rating.rating, 0);
    const averageRating = (totalRatings / ratings.length).toFixed(1);

    res.json({ averageRating, totalRatings: ratings.length });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});






export default router;
