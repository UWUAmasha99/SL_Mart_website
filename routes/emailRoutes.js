// emailRoutes.js

const express = require('express');
const router = express.Router();
const { sendGiftCardEmail } = require('./email'); // Import the email sending function

router.post('/send-gift-card', async (req, res) => {
  const {
    selectedAmount,
    recipientName,
    recipientEmail,
    senderName,
    senderMessage,
  } = req.body;

  try {
    // Call the email sending function with the required details
    await sendGiftCardEmail(
      recipientEmail,
      selectedAmount,
      recipientName,
      senderName,
      senderMessage
    );
    
    // Respond with success message
    res.status(200).json({ message: 'Gift card sent successfully' });
  } catch (error) {
    console.error('Error sending gift card:', error);
    res.status(500).json({ error: 'Error sending gift card' });
  }
});

module.exports = router;
