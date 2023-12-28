import React, { useState, useEffect } from "react";
import { useSearch } from "../../context/search";
import axios from "axios";
import { useNavigate } from "react-router-dom";



const SearchInput = () => {
  const [values, setValues] = useSearch();
  const navigate = useNavigate();

  const [recognition, setRecognition] = useState(null);
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');


  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.get(
        `/api/v1/product/search/${values.keyword}`
      );
      setValues({ ...values, results: data });
      navigate("/search");
    } catch (error) {
      console.log(error);
    }
  };


  useEffect(() => {
    if ('SpeechRecognition' in window || 'webkitSpeechRecognition' in window) {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      const recognitionInstance = new SpeechRecognition();
      recognitionInstance.interimResults = true;
      recognitionInstance.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        setTranscript(transcript);
      };
      setRecognition(recognitionInstance);
    } else {
      console.error('SpeechRecognition not supported in this browser');
    }
  }, []);

  const handleMouseDown = () => {
    if (recognition) {
      recognition.start();
      setIsListening(true);
    }
  };

  const handleMouseUp = async () => {
    if (recognition) {
      recognition.stop();
      setIsListening(false);

      setValues({ ...values, keyword: transcript });

    // Perform the search with the transcript as the keyword
    try {
      const { data } = await axios.get(
        `/api/v1/product/search/${transcript}`
      );
      setValues({ ...values, results: data, keyword: transcript });
      navigate("/search");
    } catch (error) {
      console.log(error);
    }

    }
  };

  

  return (
    <div>
      <form
        className="d-flex search-form"
        role="search"
        onSubmit={handleSubmit}
      >
        <input
          className="form-control me-2"
          type="search"
          placeholder="Search"
          aria-label="Search"
          value={values.keyword}
          onChange={(e) => setValues({ ...values, keyword: e.target.value })}
        />
        <button className="btn btn-outline-success" type="submit">
          Search
        </button>
        <button className="btn btn-outline-success"  onMouseDown={handleMouseDown} onMouseUp={handleMouseUp}>
        <img src="/images/microphone.png" alt="Voice Search" style={{ width: '20px', verticalAlign: 'middle' }} />
        </button>
      </form>
    </div>
  );
};

export default SearchInput;
