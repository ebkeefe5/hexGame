import React from 'react';

export default function HomePage() {
  const publicUrl = process.env.PUBLIC_URL;
  return (
    <div style={{ margin: 'auto', width:'30%', minWidth:'300px' }}>
      <h2 style = {{marginLeft:'5%'}}>Play Hex Free</h2>
      <p style = {{marginLeft:'5%'}}>Hex is an alternating turn board game. Red has the first move, but may not move in the center on the first turn. Red wins by connecting the bottom and top of the board with an unbroken chain of red hexagons. Blue wins by connecting the left and right side of the board with an unbroken chain of blue hexagons.</p> 
      <p style = {{marginLeft:'5%'}}>Play against a friend, computer, or try a puzzle. The pictures below shows examples of red and blue winning, respectively.</p>
      <br></br>
      <svg viewBox='0 0 1000 800'>    
        {/* Red Board */}
        <image
          href={`${publicUrl}/images/winningRedBoard.PNG`} // Use href for SVG image
          x="0"          // X-coordinate within the SVG viewBox
          y="0"          // Y-coordinate within the SVG viewBox
          width="500"    // Width of the image within the SVG viewBox
          height="400"   // Height of the image within the SVG viewBox
          alt="An example winning red board" // alt text is not directly supported by SVG image, consider ARIA or a wrapping title
        />

        {/* Blue Board */}
        <image
          href={`${publicUrl}/images/winningBlueBoard.PNG`}
          x="500"        // X-coordinate to place it next to the first image
          y="0"
          width="500"
          height="400"
          alt="An example winning blue board"
        />
      <title>Winning Boards Display</title>
      <desc>Two example winning game boards: one red, one blue.</desc>
       
      </svg>
    </div>
  );
}
