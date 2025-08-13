import React, { JSX, useState } from 'react';
import MenuButton from './components/button/MenuButton';
import HomePage from './components/HomePage';
import OnePlayerPage from './components/OnePlayerPage';
import TwoPlayerPage from './components/TwoPlayerPage';
import PuzzlePage from './components/PuzzlePage';

type Page = 'home' | 'onePlayer' | 'twoPlayer' | 'puzzle';

interface RotatingHeadingProps {
  text: string;
}

function RotatingHeadingSimple({ text }: RotatingHeadingProps): JSX.Element {
  return (
    <h1 className="rotating-heading-simple">
      {text.split('').map((letter: string, index: number) => (
        <span key={index}>{letter}</span>
      ))}
    </h1>
  );
}

function App(): JSX.Element {
  const [currentPage, setCurrentPage] = useState<Page>('onePlayer');
  const [selectedMenuItem, setSelectedMenuItem] = useState<boolean[]>([true, false, false, false]);

  const handleGoToOnePlayer = () => {
    setCurrentPage('onePlayer');
    setSelectedMenuItem([true, false, false, false]);
  };

  const handleGoToTwoPlayer = () => {
    setCurrentPage('twoPlayer');
    setSelectedMenuItem([false, true, false, false]);
  };

  const handleGoToPuzzle = () => {
    setCurrentPage('puzzle');
    setSelectedMenuItem([false, false, true, false]);
  };

  const handleGoToRules = () => {
    setCurrentPage('home');
    setSelectedMenuItem([false, false, false, true]);
  };

  let contentToDisplay: JSX.Element;

  switch (currentPage) {
    case 'onePlayer':
      contentToDisplay = <OnePlayerPage />;
      break;
    case 'twoPlayer':
      contentToDisplay = <TwoPlayerPage />;
      break;
    case 'puzzle':
      contentToDisplay = <PuzzlePage />;
      break;
    case 'home':
    default:
      contentToDisplay = <HomePage />;
      break;
  }

  return (
    <div style={{ textAlign: 'center' }}>
      <RotatingHeadingSimple text="HEX" />
      <MenuButton 
        key="onePlayer"
        label="One Player"
        onClick={handleGoToOnePlayer}
        selected={selectedMenuItem[0]}
        pushRight={true}
      />
      <MenuButton 
        key="twoPlayer"
        label="Two Player"
        onClick={handleGoToTwoPlayer}
        selected={selectedMenuItem[1]}
        pushRight={true}
      />
      <MenuButton 
        key="puzzle"
        label="Puzzle"
        onClick={handleGoToPuzzle}
        selected={selectedMenuItem[2]}
        pushRight={true}
      />
      <MenuButton 
        key="rules"
        label="Rules"
        onClick={handleGoToRules}
        selected={selectedMenuItem[3]}
        pushRight={false}
      />
      <hr />
      {contentToDisplay}
    </div>
  );
}

export default App;
