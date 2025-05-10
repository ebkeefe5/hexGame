import React from 'react';

export default function HomePage() {
  return (
    <div>
      <p>Welcome to hex!</p> 
      <p>This is an alternating turn game. Red has the first move, but may not move in the center on the first turn. Red wins by connecting the bottom and top of the board with an unbroken chain of red hexagons. Blue wins by connecting the left and right side of the board with an unbroken chain of blue hexagons.</p> 
      <p>The pictures below show an example of a game where red and blue have each won, respectively.</p>
    </div>
  );
}
