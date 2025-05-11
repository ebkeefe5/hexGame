import React from 'react';

export default function HomePage() {
  return (
    <div class ="instructions leftIndent">
      <h2>Play Hex Free</h2>
      <p>Hex is an alternating turn board game. Red has the first move, but may not move in the center on the first turn. Red wins by connecting the bottom and top of the board with an unbroken chain of red hexagons. Blue wins by connecting the left and right side of the board with an unbroken chain of blue hexagons.</p> 
      <p>Play against a friend, computer, or try a puzzle. The pictures below shows examples of red and blue winning, respectively.</p>
      <img src = "images/winningRedBoard.PNG" alt="An example winning red board" class = "image"></img>
      <img src = "images/winningBlueBoard.PNG" alt="An example winning red board" class = "image"></img>
    </div>
  );
}
