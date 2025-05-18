// src/App.js
import React, { useState } from 'react';
import MenuButton from './components/button/MenuButton';
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
  const [selectedMenuItem, setSelectedMenuItem] = useState([false, false, false])

  const handleGoToOnePlayer = () => {
    setCurrentPage('onePlayer');
    setSelectedMenuItem([true, false, false]);
  };

  const handleGoToTwoPlayer = () => {
    setCurrentPage('twoPlayer');
    setSelectedMenuItem([false, true, false]);
  };

  const handleGoToPuzzle = () => {
    setCurrentPage('puzzle');
     setSelectedMenuItem([false, false, true]);
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
    <div style={{ textAlign: 'center' }}>
      <RotatingHeadingSimple text="HEX" />
      <MenuButton 
          key={`onePlayer`}
          label={"One Player"}
          onClick={() => handleGoToOnePlayer()}
          selected = {selectedMenuItem[0]}
          pushRight={true}
      />
       <MenuButton 
          key={`twoPlayer`}
          label={"Two Player"}
          onClick={() => handleGoToTwoPlayer()}
          selected = {selectedMenuItem[1]}
          pushRight={true}
      />
       <MenuButton 
          key={`puzzle`}
          label={"Puzzle"}
          onClick={() => handleGoToPuzzle()}
          selected = {selectedMenuItem[2]}
      />
      <hr />
        {contentToDisplay}
    </div>
  );
}

export default App;