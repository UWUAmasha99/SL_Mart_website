import React from "react";
import { Link } from "react-router-dom";
import {
  AiFillFacebook,
  AiFillInstagram,
  AiFillYoutube,
  AiOutlineTwitter,
} from "react-icons/ai";
import "../../styles/Footer.css";


const Footer = () => {
  return (
    <div className="footer">


        <div className="custom-container">
            <h1 className='custom-heading'>
                <span className='button'>
                    Subscribe
                    </span> us for get news,events & offers!!
            </h1>
            
            <div>
                <input type='text' 
                    required
                    placeholder="Enter your Email..."
                    className="custom-input"
                />
                <button className="custom-button custom-button:hover">
                    Submit
                </button>

                
            </div>
        </div>
        <div className="custom-container">
          <p>This store is for local products, produced by locals. <br/>SL Mart helps 
              local entrepreneurs to showcase their products and create market opportunities 
              worldwide..</p> 
        </div>
        
      

      <div className="custom-grid ">
            <ul className='custom-flex'>
            <img
            src=""
            alt=""
            style={{ filter: "brightness(0) invert(1)" }}
            />
            <br />
            {/* <p>This store is for local products, produced by locals. SL Mart helps 
              local entrepreneurs to showcase their products and create market opportunities 
              worldwide..</p> */}
              <div className="custom-flex-items">
            <AiFillFacebook size={25} className="cursor-pointer" />
            <AiOutlineTwitter
              size={25}
              style={{ marginLeft: "15px", cursor: "pointer" }}
            />
            <AiFillInstagram
              size={25}
              style={{ marginLeft: "15px", cursor: "pointer" }}
            />
            <AiFillYoutube
              size={25}
              style={{ marginLeft: "15px", cursor: "pointer" }}
            />
            </div>
            </ul>



        </div>
        

      <div className="">
          <h3 className="text-center">All Right Reserved &copy; SL Mart</h3>
                <p className="text-center mt-3">
                  <Link to="/about">About</Link>|<Link to="/contact">Contact</Link>|
                  <Link to="/">Home</Link>
                </p>

          <div className="sm:block flex items-center justify-center w-full">
            <img
                src="https://hamart-shop.vercel.app/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Ffooter-payment.a37c49ac.png&w=640&q=75"
                alt=""
            />
          </div>    
      </div>
        

    </div>
    
  );
};

export default Footer;
