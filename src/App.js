// src/App.js
import React, { useState } from 'react';
import HomePage from './components/HomePage';
import OnePlayerPage from './components/OnePlayerPage';
import TwoPlayerPage from './components/TwoPlayerPage';
import PuzzlePage from './components/PuzzlePage';

function RotatingHeadingSimple({ text }) {
  return (
    <h1 className="rotating-heading-simple">
      {text.split('').map((letter, index) => (
        <span key={index}>{letter}</span>
      ))}
    </h1>
  );
}

function App() {
  const [currentPage, setCurrentPage] = useState('home'); // Initial state is 'home'

  const handleGoToOnePlayer = () => {
    setCurrentPage('onePlayer');
  };

  const handleGoToTwoPlayer = () => {
    setCurrentPage('twoPlayer');
  };

  const handleGoToPuzzle = () => {
    setCurrentPage('puzzle');
  };

  let contentToDisplay;

  if (currentPage === 'home') {
    contentToDisplay = <HomePage />;
  } else if (currentPage === 'onePlayer') {
    contentToDisplay = <OnePlayerPage />;
  } else if (currentPage === 'twoPlayer') {
    contentToDisplay = <TwoPlayerPage />;
  }else if (currentPage === 'puzzle') {
    contentToDisplay = <PuzzlePage />;
  }else {
    contentToDisplay = <HomePage />; // Default fallback
  }

  return (
    <div>
      <RotatingHeadingSimple text="HEX" />
      <button onClick={handleGoToOnePlayer} style={{ marginRight: '15px' }}>One player</button> 
      <button onClick={handleGoToTwoPlayer} style={{ marginRight: '15px' }}>Two player</button>
      <button onClick={handleGoToPuzzle}>Puzzle</button>
      <hr />
        {contentToDisplay}
    </div>
  );
}

export default App;