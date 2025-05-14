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
    contentToDisplay = <div className="page-container">
      <div className="left-menu">
         <h5>board size: 5</h5>
      </div>
      <div className="game-page">
        <TwoPlayerPage /> 
      </div>
    </div>;
  }else if (currentPage === 'puzzle') {
    contentToDisplay = <PuzzlePage />;
  }else {
    contentToDisplay = <HomePage />; // Default fallback
  }

  return (
    <div>
      <RotatingHeadingSimple text="HEX" />
      <button onClick={handleGoToOnePlayer} style={{ marginRight: '2%', marginLeft:'1%'}}>One player</button> 
      <button onClick={handleGoToTwoPlayer} style={{ marginRight: '2%' }}>Two player</button>
      <button onClick={handleGoToPuzzle}>Puzzle</button>
      <hr />
        {contentToDisplay}
    </div>
  );
}

export default App;