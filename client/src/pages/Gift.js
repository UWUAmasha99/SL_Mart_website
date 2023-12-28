import React, { useState } from 'react';
import "../styles/GiftCardForm.css";
import Swal from 'sweetalert2';
import emailjs from 'emailjs-com';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import PaymentGateway from './PaymentGateway';
// import PayPalCheckout from './PayPalCheckout';

const richTextModules = {
    toolbar: [
      [{ header: [1, 2, 3, 4, 5, 6, false] }],
      ['bold', 'italic', 'underline', 'strike'],
      [{ list: 'ordered' }, { list: 'bullet' }],
      ['link', 'image'],
      ['clean'],
    ],
};
  
const richTextFormats = [
    'header',
    'bold',
    'italic',
    'underline',
    'strike',
    'list',
    'bullet',
    'link',
    'image',
];

const editorStyle = { height: '300px'  };

const GiftCardForm = ({ selectedAmount }) => {

  const [recipientName, setRecipientName] = useState('');
  const [recipientEmail, setRecipientEmail] = useState('');
  const [senderName, setSenderName] = useState('');
  const [senderMessage, setSenderMessage] = useState('');
  const [submissionStatus, setSubmissionStatus] = useState('');
  const [emailValid, setEmailValid] = useState(true);

  const [paymentFor, setpaymentFor] = useState('trip');
  const [userID, setUserID] = useState(0);
  const [bookingId, setBookingID] = useState(0);
  const [cost, setCost] = useState(0);
  const [card_id, setCardId] = useState(generateRandomCode());

  const handleRecipientEmailInput = (inputEmail) => {
    setRecipientEmail(inputEmail);

    // Basic email format validation using a regular expression
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const isValid = emailPattern.test(inputEmail);
    setEmailValid(isValid);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const formData = {
      amount : parseFloat(selectedAmount.replace(/[^\d.-]/g, '')),
      recipientName,
      recipientEmail,
      senderName,
      senderMessage,
      card_id
    };

    try {
      const response = await fetch('http://localhost:8080/giftVoucher/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        
        send_email(selectedAmount
          , recipientName
          , recipientEmail
          , senderName
          , senderMessage
          , card_id);
        setRecipientName('');
        setRecipientEmail('');
        setSenderName('');
        setSenderMessage('');
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: '',
        });
      }
    } catch (error) {
      // Handle fetch error
      console.error('Fetch error:', error); 
    }
    
  };

  function generateRandomCode() {
    const randomNumber = Math.floor(Math.random() * 90000) + 10000;
    return randomNumber.toString(); 
}

  function send_email(amount , recipientName , recipientEmail , senderName , senderMessage ,card_id){
    emailjs.send(
        'service_e11jbtj',
        'template_lh7wdsk',
        {
          senderName: senderName,
          amount: amount,
          recipientName: recipientName,
          senderMessage: senderMessage,
          recipientEmail: recipientEmail,
          random_code:card_id
        },
        '07euO5w1UeYLU44gq' 
      )
        .then((result) => {
          console.log('Email sent successfully!', result.text);
          Swal.fire({
            icon: 'success',
            title: 'Success!',
            text: 'Gift voucher is sent.',
          });
          window.location.reload();
          fun_pay();
        })
        .catch((error) => {
          console.error('Failed to send email:', error);
          Swal.fire({
                icon: 'error',
                title: 'Error!',
                text: 'Failed to save passenger data. Please try again later.',
          });
        });
  }

  function fun_pay(){

  }

  const handleEditorChange = (content) => {
    setSenderMessage(content);
  };
  
  

  return (

    

    <div className="gift-card-form-container">

      
      
      {submissionStatus === 'success' ? (
        <p>Gift card sent successfully!</p>
      ) : submissionStatus === 'error' ? (
        <p>Error sending gift card. Please try again.</p>
      ) : (
        <form onSubmit={handleSubmit} className="form-section">
          <h2 className="form-section-title" style={{fontSize:'22px'}}>Recipient Information</h2>
          
          <div style={{marginTop:'2%'}}>
            <label>Enter amount:</label>
            <input
              type="text"
              value={selectedAmount}
            
              readOnly
              className="form-input"
            />
          </div>
          <div style={{marginTop:'4%'}}>
            <label>Gift Sender Name:</label>
            <input
              type="text"
              value={senderName}
              onChange={(e) => setSenderName(e.target.value)}
              className="form-input"
            />
          </div>
          <PaymentGateway/>
          <div style={{marginTop:'2%'}}>
            <label>Recipient Name:</label>
            <input
              type="text"
              value={recipientName}
              onChange={(e) => setRecipientName(e.target.value)}
              className="form-input"
            />
          </div>
          <div style={{marginTop:'2%'}}>
              <label>Recipient Email:</label>
              <input
                type="email"
                value={recipientEmail}
                onInput={(e) => handleRecipientEmailInput(e.target.value)}
                className={`form-input ${emailValid ? '' : 'invalid'}`}
              />
              {emailValid === false && (
                <span style={{color:'red'}}>Invalid email address</span>
              )}
          </div>

          
          <div  style={{marginTop:'4%'}}>
            <label>Gift Sender Message:</label>
          
            <ReactQuill
                value={senderMessage}
                onChange={handleEditorChange}
                placeholder=""
                modules={richTextModules}
                formats={richTextFormats}
                style={editorStyle}
            />
          </div>
          <div  style={{marginTop:'10%'}}>
          {/* <PayPalCheckout  userId={userID} cost={cost} bookingId={bookingId} bookingType={paymentFor}/> */}

          
          <button type="submit" className="form-button">
            Send Gift Card
          </button>
          
          
          </div>
        </form>
      )}
    </div>
  );
};

export default GiftCardForm;
