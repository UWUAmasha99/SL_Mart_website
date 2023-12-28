import React, { useState } from 'react';

const VoiceSearch = () => {
  const [transcript, setTranscript] = useState('');
  const [listening, setListening] = useState(false);

  const recognition = new window.SpeechRecognition();

  recognition.continuous = true;
  recognition.interimResults = true;
  recognition.lang = 'en-US';

  recognition.onresult = (event) => {
    const spokenText = event.results[0][0].transcript;
    setTranscript(spokenText);
  };

  const startListening = () => {
    recognition.start();
    setListening(true);
  };

  const stopListening = () => {
    recognition.stop();
    setListening(false);
  };

  return (
    <div>
      <button onClick={startListening} disabled={listening}>
        Start Voice Search
      </button>
      <button onClick={stopListening} disabled={!listening}>
        Stop Voice Search
      </button>
    </div>
  );
};

export default VoiceSearch;