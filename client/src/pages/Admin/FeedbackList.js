import React, { useState, useEffect } from "react";
import Layout from "./../../components/Layout/Layout";
import AdminMenu from "./../../components/Layout/AdminMenu";
import toast from "react-hot-toast";
import axios from "axios";

function FeedbackList() {
  const [feedbackData, setFeedbackData] = useState([]);

  useEffect(() => {
    // Make a GET request to fetch all feedback
    axios
      .get("/feedback/all") 
      .then((response) => {
        setFeedbackData(response.data); // Store the feedback data in state
      })
      .catch((error) => {
        console.error("Error fetching feedback data:", error);
      });
  }, []); // Empty dependency array ensures the effect runs once on component mount

  



return (
    <Layout>
      <div className="row dashboard">
        <div className="col-md-3">
          <AdminMenu />
        </div>
        <div className="col-md-9 ">
        <div>
      <h1>Feedback List</h1>
      <ul>
        {feedbackData.map((feedback) => (
          <li key={feedback._id}>
            <strong>Name:</strong> {feedback.name}
            <br />
            <strong>Email:</strong> {feedback.email}
            <br />
            <strong>Feedback:</strong> {feedback.feedback}
            <hr />
          </li>
        ))}
      </ul>
    </div>
        </div>
      </div>
    </Layout>
  );
};

export default FeedbackList;
