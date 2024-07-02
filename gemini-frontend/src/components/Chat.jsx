import React, { useState, useEffect, useRef } from 'react';
import { sendChat } from '../hooks/chat';


const Chat = () => {
  const [prompt, setPrompt] = useState('');
  const [input, setInput] = useState('');
  const [text, setText] = useState('');
  const [speaking, setSpeaking] = useState(false);
  const [listening, setListening] = useState(false);
  const speechRef = useRef(null);

  const handleSubmit = async (inputText) => {
    const body = { prompt: inputText };
    setPrompt(inputText);
    setInput('');
    const response = await sendChat(body);
    setText(response.payload);
    speakText(response.payload);
  };

  const handleSubmitEvent = (e) => {
    e.preventDefault();
    handleSubmit(input);
  };

  const speakText = (text) => {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'en-US';
    utterance.rate = 1;
    utterance.pitch = 1;
    utterance.volume = 1;

    setSpeaking(true);
    window.speechSynthesis.speak(utterance);

    utterance.onend = () => {
      setSpeaking(false);
    };
  };

  useEffect(() => {
    if (!('webkitSpeechRecognition' in window)) {
      return;
    }

    const speech = new webkitSpeechRecognition();
    speech.continuous = true;
    speech.lang = 'en-US';

    speech.onresult = (event) => {
      const transcript = event.results[event.resultIndex][0].transcript;
      setInput(transcript);
      handleSubmit(transcript);  // Automatically send after speech input
    };

    speech.onerror = (event) => {
      console.log('Error occurred in speech recognition:', event);
    };

    speech.onstart = () => {
      setListening(true);
    };

    speech.onend = () => {
      setListening(false);
    };

    speechRef.current = speech;

    return () => {
      speech.stop();
    };
  }, []);

  const toggleListening = () => {
    if (listening) {
      speechRef.current.stop();
    } else {
      speechRef.current.start();
    }
  };

  return (
    <div className='relative flex flex-col items-center justify-between h-[100vh] w-[100vw]'>

      <div>
        <h1 className='font-bold text-3xl text-center my-5 text-white'>JARVIS AI</h1>
      </div>
      <div className='bg-transparent-200 rounded-xl min-w-[80%] min-h-[80%] max-w-[80%] overflow-y-auto'>
        {prompt && <p className='m-5 font-semibold text-xl bg-transparent-500 rounded-xl p-2 text-right text-white border border-white'>{prompt}</p>}
        {text ? (
          <p className='m-5 font-semibold text-xl bg-transparent-500 rounded-xl p-2 text-white border border-white'>{text}</p>
        ) : (
          <p className='m-5 font-semibold text-xl bg-transparent-500 rounded-xl p-2 text-white border border-white'>How can I help you?</p>

        )}
      </div>

      <form autoComplete='off' className='flex gap-3 mb-10 mt-5' onSubmit={handleSubmitEvent}>
        <input
          type="text"
          name="prompt"
          value={input}
          placeholder='Type your question '
          onChange={(e) => setInput(e.target.value)}
          className='p-2 rounded-xl font-semibold text-xl bg-transparent border-white border-[1px] w-[30rem] text-white placeholder-white'
        />


        <button type='button' onClick={toggleListening} className='bg-transparent-500 px-6 py-2 hover:bg-blue-400 rounded-xl text-white border-white border'>
          {listening ? 'Stop Listening' : 'Start Listening'}
        </button>
        <button type='submit' className='bg-transparent-500 px-6 py-2 hover:bg-green-400 rounded-xl text-white border-white border'>
          Send
        </button>

        {speaking && <p>Speaking...</p>}
        {listening && <p>Listening...</p>}
      </form>
    </div>
  );
};

export default Chat;
