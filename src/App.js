// src/App.js
import React, { useState } from 'react';
import HomePage from './components/HomePage';
import OnePlayerPage from './components/OnePlayerPage';

function App() {
  const [currentPage, setCurrentPage] = useState('home'); // Initial state is 'home'

  const handleGoToOnePlayer = () => {
    setCurrentPage('onePlayer');
  };

  const handleGoToHome = () => {
    setCurrentPage('home');
  };

  let contentToDisplay;

  if (currentPage === 'home') {
    contentToDisplay = <HomePage />;
  } else if (currentPage === 'onePlayer') {
    contentToDisplay = <OnePlayerPage />;
  } else {
    contentToDisplay = <HomePage />; // Default fallback
  }

  return (
    <div>
      <h1>Hex</h1>
      <button onClick={handleGoToHome}>Home</button>
      <button onClick={handleGoToOnePlayer}>One player</button> 
      <button onClick={handleGoToOnePlayer}>Two player</button>
      <button onClick={handleGoToOnePlayer}>Puzzle</button>
      <hr />

      {contentToDisplay}
    </div>
  );
}

export default App;