// src/App.js
import React, { useState } from 'react';
import HomePage from './components/HomePage';
import AboutPage from './components/AboutPage';

function App() {
  const [currentPage, setCurrentPage] = useState('home'); // Initial state is 'home'

  const handleGoToAbout = () => {
    setCurrentPage('about');
  };

  const handleGoToHome = () => {
    setCurrentPage('home');
  };

  let contentToDisplay;

  if (currentPage === 'home') {
    contentToDisplay = <HomePage />;
  } else if (currentPage === 'about') {
    contentToDisplay = <AboutPage />;
  } else {
    contentToDisplay = <HomePage />; // Default fallback
  }

  return (
    <div>
      <h1>My Single-Page App (Simulated Navigation)</h1>
      <button onClick={handleGoToHome}>Go to Home</button>
      <button onClick={handleGoToAbout}>Go to About</button>

      <hr />

      {contentToDisplay}
    </div>
  );
}

export default App;