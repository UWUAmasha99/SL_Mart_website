// feedbackRoutes.js
import express from "express";
import Feedback from "../models/feedbackModel.js";

const router = express.Router();

// Create a new feedback entry
router.post('/add', (req, res) => {
  const { name, email, feedback } = req.body;

  const newFeedback = new Feedback({
    name,
    email,
    feedback,
  });

  newFeedback.save((err) => {
    if (err) {
      res.status(500).json({ error: 'Error submitting feedback' });
    } else {
      res.status(201).json({ message: 'Feedback submitted successfully' });
    }
  });
});

// Get all feedback entries
router.get('/all', (req, res) => {
  Feedback.find({}, (err, feedback) => {
    if (err) {
      res.status(500).json({ error: 'Error fetching feedback' });
    } else {
      res.status(200).json(feedback);
    }
  });
});

export default router;
