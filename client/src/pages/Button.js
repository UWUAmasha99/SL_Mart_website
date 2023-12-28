import React, { useState } from 'react';
import Gift from './Gift';
import "../styles/Button.css"
import image1000 from '../components/Assets/1000.jpg';
import image2000 from '../components/Assets/2000.jpg';
import image2500 from '../components/Assets/2500.jpg';
import image5000 from '../components/Assets/5000.jpg';

function Button() {
  const [selectedAmount, setSelectedAmount] = useState('');

  const handleAmountSelect = (amount) => {
    setSelectedAmount(amount);
  };

  return (
    <>
      <div className="gift-card-header">
        <h1>Gift Card</h1>
        <p className="gift-card-description">
          With one of our SL Mart gift cards, give your friends and family the choice to find the perfect handcrafted and ethically sourced gift. And the great thing is that your purchase also supports the maker and their family!
        </p>
      </div>
      <div className="container">
        <div className="row">
          <div className='col-12 text-center'>
            <div className="image-button" onClick={() => handleAmountSelect('$5')}>
              <img src={image1000} alt="RS.1000 Gift Card" />
            </div>
            <div className="image-button" onClick={() => handleAmountSelect('$10')}>
              <img src={image2000} alt="RS.2000 Gift Card" />
            </div>
            <div className="image-button" onClick={() => handleAmountSelect('$15')}>
              <img src={image2500} alt="RS.2500 Gift Card" />
            </div>
            <div className="image-button" onClick={() => handleAmountSelect('$20')}>
              <img src={image5000} alt="RS.5000 Gift Card" />
            </div>
          </div>
        </div>
      </div>

      <Gift selectedAmount={selectedAmount}></Gift>
    </>
  )
}

export default Button;
