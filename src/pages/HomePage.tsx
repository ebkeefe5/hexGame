import React, { JSX } from 'react';

export default function HomePage(): JSX.Element {
  const publicUrl = process.env.PUBLIC_URL;

  return (
    <div style={{ margin: 'auto', width: '30%', minWidth: '300px' }}>
      <p style={{ marginLeft: '5%' }}>
        Hex is an alternating turn board game. Red has the first move, but may not move in the center on the first turn.
        Red wins by connecting the bottom and top of the board with an unbroken chain of red hexagons. Blue wins by
        connecting the left and right side of the board with an unbroken chain of blue hexagons.
      </p>
      <p style={{ marginLeft: '5%' }}>
        Play against a friend, computer, or try a puzzle. The pictures below show examples of red and blue winning,
        respectively.
      </p>
      <br />

      <svg viewBox="0 0 1000 800" aria-label="Winning Boards Display">
        {/* Red Board */}
        <image
          href={`${publicUrl}/images/winningRedBoard.PNG`}
          x="0"
          y="0"
          width="500"
          height="400"
        />
        {/* Blue Board */}
        <image
          href={`${publicUrl}/images/winningBlueBoard.PNG`}
          x="500"
          y="0"
          width="500"
          height="400"
        />
        <title>Winning Boards Display</title>
        <desc>Two example winning game boards: one red, one blue.</desc>
      </svg>
    </div>
  );
}
