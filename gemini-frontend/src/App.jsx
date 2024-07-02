import React from 'react';
import Chat from './components/Chat';
import backgroundVideo from '../video/jarvis.mp4';
import './App.css'; // Assuming you are using CSS for styling

function App() {
  return (
    <div className='app-container'>
      <video autoPlay loop muted id='background-video'>
        <source src={backgroundVideo} type='video/mp4' />
      </video>
      <Chat />
    </div>
  );
}

export default App;

