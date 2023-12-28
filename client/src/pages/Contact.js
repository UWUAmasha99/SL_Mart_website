import React from "react";
import Layout from "./../components/Layout/Layout";
import { BiLocationPlus, BiMailSend, BiPhoneCall, BiPlanet} from "react-icons/bi";
import FeedbackForm from "./FeedbackForm";

const Contact = () => {
  return (
    <Layout title={"Contact us"}>
 <div className="row contactus ">

<div className="col-md-4">
          
          <h1 className="bg-success p-2 text-white text-center"style={{ marginTop: "20px"}}>CONTACT US</h1>
          <h5 className="text-justify mt-2">
          Call us at any time for questions and product information;
           we are available 24 hours a day.
          </h5>
          <p className="mt-3">
            <BiMailSend /> : shopmartnew@gmail.com
          </p>
          <p className="mt-3">
            <BiPhoneCall /> : 0701202009
          </p>
          <p className="mt-3">
            <BiPlanet/> : www.shopmart.lk
          </p>
          <p className="mt-3">
            <BiLocationPlus/> : Gayan S. Kumara, 
                                Thalawitiya, 
                                Parakaduwa
                                Sri Lanka
          </p>

       
          
        </div>




     
        <div className="col-md-6 ">
          <img
            src="/images/contact123.jpg"
            alt="contactus"
            style={{ width: "100%" }}
          />
        </div>
       
      </div>
      <FeedbackForm/>
    </Layout>
  );
};



export default Contact;
