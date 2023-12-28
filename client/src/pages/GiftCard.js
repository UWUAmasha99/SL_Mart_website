import React, { useState } from 'react';
import { FaUserPlus, FaGift, FaCreditCard } from 'react-icons/fa';
import image1000 from '../components/Assets/1000.jpg';
import image2000 from '../components/Assets/2000.jpg';
import image2500 from '../components/Assets/2500.jpg';
import image5000 from '../components/Assets/5000.jpg';

const GiftCard = () => {
  const containerStyle = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: '20px',
  };

  

  const headerStyle = {
    backgroundColor: '#f2f2f2', // Light grayish Ash color close to white
    color: 'black',
    padding: '10px',
    width: '100%',
    textAlign: 'center',
    marginBottom: '10px',
  };
  

  const imageStyle = {
    width: '300px',
    height: '250px',
    objectFit: 'cover',
    margin: '0 10px',
    cursor: 'pointer',
    transition: 'transform 0.3s',
  };

  const [clickedIndex, setClickedIndex] = useState(null);

  const handleClick = (index) => {
    setClickedIndex(index);
  };
  const cardContainerStyle = {
    display: 'flex',
    justifyContent: 'space-around', // or 'space-evenly'
    alignItems: 'center',
    marginTop: '20px', // Add some space above the cards
  };

  const welcomeTextStyle = {
    fontSize: '24px',
    fontFamily: 'Arial, sans-serif',
    textAlign: 'center',
    marginTop: '10px',
    fontWeight: 'bold',
    textDecoration: 'underline',
    textShadow: '2px 2px 4px rgba(0, 0, 0, 0.3)',
  };

  const paragraphStyle = {
    textAlign: 'center',
    marginBottom: '20px',
    color: 'gray',
  };

  const italicStyle = {
    fontStyle: 'italic',
    color: 'black',
  };

  const signUpContainerStyle = {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    width: '200px',
    height: '200px',
    backgroundColor: 'white',
    border: '2px solid black',
    borderRadius: '10px',
    cursor: 'pointer',
    transition: 'transform 0.3s',
  };

  const signUpTextStyle = {
    color: 'black',
    fontSize: '20px',
    textAlign: 'center',
    marginLeft: '10px',
  };

  
  const handleSignUpDoubleClick = (step) => {
    // Handle different actions based on the step
    if (step === 'sign-up') {
      // Navigate to the "Sign Up" page
      window.location.href = 'http://localhost:3000/register';
    }
 else if (step === 'select-voucher') {
    window.location.href = 'http://localhost:3000/login';
  }
   
   
  };
  return (
    <div>
      <div style={headerStyle}>
        <h1>Gift Card</h1>
      </div>
      <h3 style={welcomeTextStyle}>Welcome To The Gifting Portal</h3>
      <div style={paragraphStyle}>
      <div style={paragraphStyle}>
        <h5>
          Welcome to the Gifting Portal by <span style={italicStyle}>SL Mart</span> –
          your gateway to meaningful gifting.
        </h5>
        <h5>
          Discover a diverse range of traditional Sri Lankan items perfect for every occasion.
        
          Explore our elegant gift cards, </h5><h5>ideal for sharing the quality of Sri Lanka's traditional products.
        
          Sending these cards is made even easier with our email option,  </h5>
        <h5>allowing your loved ones to select unique traditional pieces using special voucher codes through our  web application.
        </h5>
        <h5>
          Celebrate special moments with the charm of tradition, courtesy of <span style={italicStyle}>SL Mart</span>.
        </h5>
      </div>
        {/* ... (paragraphs) */}
      </div>
      <h3 style={welcomeTextStyle}>Choose Your Voucher</h3>
      <div style={containerStyle}>
        {/* ... (images) */}
         
        <div style={containerStyle}>
     
     {[image1000, image2000, image2500, image5000].map((image, index) => (
       <img
         key={index}
         src={image}
         alt={`Gift Card ${index}`}
         style={{
           ...imageStyle,
           transform: `scale(${clickedIndex === index ? 1.1 : 1})`, // Apply scale on click
         }}
         onClick={() => handleClick(index)}
       />
     ))}
   </div>
      </div>
      <h3 style={welcomeTextStyle}>The Perfect Present Is Just A Click Away</h3>
      <div style={cardContainerStyle}>
  <div
    style={signUpContainerStyle}
    onDoubleClick={() => handleSignUpDoubleClick("sign-up")}
  >
    <FaUserPlus size={50} color="black" />
    <h3 style={signUpTextStyle}>Sign Up</h3>
    <p>Enter your name and email address. Don’t forget to note your password for future orders!</p>
  </div>
  <div
    style={signUpContainerStyle}
    onDoubleClick={() => handleSignUpDoubleClick("select-voucher")}
  >
    <FaGift size={50} color="black" />
    <h3 style={signUpTextStyle}>Select Gift Card with Login</h3>
    <p>Pick a card, set a value and type in a personalized message.</p>
  </div>
  <div
    style={signUpContainerStyle}
    onDoubleClick={() => handleSignUpDoubleClick("pay-online")}
  >
    <FaCreditCard size={50} color="black" />
    <h3 style={signUpTextStyle}>Pay Online</h3>
    <p>Choose your payment method and send it out</p>
  </div>
</div>
    </div>
  );
};

export default GiftCard;