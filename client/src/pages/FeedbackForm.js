// FeedbackForm.js (Component for submitting feedback)

import React, { useState } from 'react';
import axios from 'axios';

const feedbackFormStyle = {
  maxWidth: '400px',
  margin: '0 auto',
  marginBottom: '20px',
  padding: '20px',
  border: '1px solid #ccc',
  borderRadius: '5px',
  backgroundColor: '#f5f5f5',
};

const titleStyle = {
  fontSize: '24px',
  marginBottom: '10px',
  textAlign: 'center',
};

const formContainerStyle = {
  display: 'flex',
  flexDirection: 'column',
};

const inputStyle = {
  marginBottom: '10px',
  padding: '10px',
  border: '1px solid #ccc',
  borderRadius: '3px',
};

const textareaStyle = {
  marginBottom: '10px',
  padding: '10px',
  border: '1px solid #ccc',
  borderRadius: '3px',
  resize: 'vertical',
  minHeight: '100px',
};

const buttonStyle = {
  padding: '10px 20px',
  backgroundColor: '#14B059',
  color: '#fff',
  border: 'none',
  borderRadius: '3px',
  cursor: 'pointer',
  transition: 'background-color 0.3s',
};

const messageStyle = {
  marginTop: '10px',
  fontWeight: 'bold',
  textAlign: 'center',
  color: 'green',
};

const FeedbackForm = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [feedback, setFeedback] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .post("/feedback/add", { name, email, feedback })
      .then((response) => {
        setMessage(response.data.message);
        setName('');
        setEmail('');
        setFeedback('');
      })
      .catch((error) => {
        console.error(error);
        setMessage('Error submitting feedback.');
      });
  };

  return (
    <div style={feedbackFormStyle}>
      <h2 style={titleStyle}>Submit Feedback</h2>
      <form onSubmit={handleSubmit}>
        <div style={formContainerStyle}>
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            style={inputStyle}
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={inputStyle}
          />
          <textarea
            placeholder="Feedback"
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)}
            style={textareaStyle}
          />
        </div>
        <button type="submit" style={buttonStyle}>
          Submit
        </button>
      </form>
      {message && <p style={messageStyle}>{message}</p>}
    </div>
  );
};

export default FeedbackForm;
