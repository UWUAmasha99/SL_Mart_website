const nodemailer = require('nodemailer');

// Configure Nodemailer transporter
const transporter = nodemailer.createTransport({
  // Configure your email service here
});

// Function to send gift card email
const sendGiftCardEmail = async (recipientEmail, selectedAmount, recipientName, senderName, senderMessage) => {
  try {
    const mailOptions = {
      from: 'your_email@example.com',
      to: recipientEmail,
      subject: 'Gift Card Details',
      text: `
        Gift Card Details:

        Amount: ${selectedAmount}
        Recipient Name: ${recipientName}
        Sender Name: ${senderName}
        Sender Message: ${senderMessage}
      `,
    };

    await transporter.sendMail(mailOptions);
    console.log('Gift card email sent successfully');
  } catch (error) {
    console.error('Error sending gift card email:', error);
  }
};

module.exports = {
  sendGiftCardEmail,
};
