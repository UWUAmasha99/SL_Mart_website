import React from "react";
import Layout from "../components/Layout/Layout";
import "../styles/About.css";


const About = () => {
  return (
    <Layout title={"About us - Ecommer app"}>

      <div className="row">

        <div className="col-md-6  img-col">
          <img
            src="https://whoweare.lk/wp-content/uploads/2020/11/About-1.jpg"
            alt="contactus"
            style={{ width: "100%" }}
          />
        </div>

        <div className="col-md-4 our-col">
          <p className="text-justify mt-4">
          <h5>OUR STORY ?</h5>

            In March 2019, SL Mart entered into to the World. Based in Ratnapura (Sri Lanka), 
            it’s an international on-line store which started launching with 3 brands and 27 products.
            
          <h5>OUR COMMITMENT ?</h5>
          <p>Our commitment is to provide High quality products to customers with low price 
           ,while we promote our entrepreneurs to sell their products. 
            Selecting sellers is also a way to encourage women’s empowerment, achievers, younger generations, entrepreneurs. </p>
          </p>
        </div>

      </div>
      
      <div className="row contactus">
        <div className="col-md-5 vm-col">
          < h4>Vision</h4>
          <p>“Creating a dynamic and sustainable competitive Enterprise Sector, this will contribute to
           the economic, political and social aspirations of the nation”
          </p>
        </div>

        <div className="col-md-5 vm-col">
          <h4>Mission</h4>
          <p>"To facilitate and proactively support development, growth and competitiveness of 
            the national economy of Sri Lanka"
          </p>

        </div>

      </div>



    </Layout>
  );
};


export default About;
