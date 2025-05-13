import React from 'react';
import { BOARD_DIMENSION, HEXAGON_EDGE_LENGTH, TOP_LEFT_HEXAGON_CENTER_X, TOP_LEFT_HEXAGON_CENTER_y, HEXAGON_WIDTH, BOARD_WIDTH, BOARD_HEIGHT } from '../constants.js';

//task 1 - display a hexagon button 
//task 2 - hexagon button changes colors when clicked
//task 3 - display a board with a bunch of hexagon buttons, the middle button starts out gray
//task 4 - hexagons in board change colors when clicked, rotating by player
//task 5 - add a menu on the left
    //choose the color to play as
    //select a difficulty
    //restart the game
    //display the current turn

export default function TwoPlayerPage() { 

    const handleHexagonClick = () => {
        console.log("Hexagon clicked on the TwoPlayerPage!");
        // Add your click handling logic here
    };

    return (
    <div className = "leftIndent">
        <svg viewBox="0 0 200 200">
            {createHexButton(0, 0, handleHexagonClick)}
            {createHexButton(0, 1, handleHexagonClick)}
            {createHexButton(0, 2, handleHexagonClick)}
            {createHexButton(0, 3, handleHexagonClick)}
            {createHexButton(0, 4, handleHexagonClick)}
            {createHexButton(1, 0, handleHexagonClick)}
            {createHexButton(1, 1, handleHexagonClick)}
            {createHexButton(1, 2, handleHexagonClick)}
            {createHexButton(1, 3, handleHexagonClick)}
            {createHexButton(1, 4, handleHexagonClick)}
            {createHexButton(2, 0, handleHexagonClick)}
            {createHexButton(2, 1, handleHexagonClick)}
            {createHexButton(2, 2, handleHexagonClick)}
            {createHexButton(2, 3, handleHexagonClick)}
            {createHexButton(2, 4, handleHexagonClick)}
            {createHexButton(3, 0, handleHexagonClick)}
            {createHexButton(3, 1, handleHexagonClick)}
            {createHexButton(3, 2, handleHexagonClick)}
            {createHexButton(3, 3, handleHexagonClick)}
            {createHexButton(3, 4, handleHexagonClick)}
            {createHexButton(4, 0, handleHexagonClick)}
            {createHexButton(4, 1, handleHexagonClick)}
            {createHexButton(4, 2, handleHexagonClick)}
            {createHexButton(4, 3, handleHexagonClick)}
            {createHexButton(4, 4, handleHexagonClick)}
        </svg>
    </div>
    );
}

function createHexButton(row, col, onClick)
{
    var cx = TOP_LEFT_HEXAGON_CENTER_X + col * Math.sqrt(3) * HEXAGON_EDGE_LENGTH + Math.sqrt(3)*HEXAGON_EDGE_LENGTH/2*row;
	var cy = TOP_LEFT_HEXAGON_CENTER_y + row * 3/2 * HEXAGON_EDGE_LENGTH;

	var x1 = cx - Math.sqrt(3)*HEXAGON_EDGE_LENGTH/2;
	var x2 = cx;
	var x3 = cx + Math.sqrt(3)*HEXAGON_EDGE_LENGTH/2;

	var y1 = cy - 1/2 * HEXAGON_EDGE_LENGTH;
	var y2 = cy - HEXAGON_EDGE_LENGTH;
	var y3 = cy + 1/2 * HEXAGON_EDGE_LENGTH;
	var y4 = cy + HEXAGON_EDGE_LENGTH;

    const points = [
    `${x1},${y1}`,
    `${x2},${y2}`,
    `${x3},${y1}`,
    `${x3},${y3}`,
    `${x2},${y4}`,
    `${x1},${y3}`,
  ].join(' ');

    const svgStyle = {
        cursor: 'pointer',
    };

    const polygonStyle = {
        fill: '#A9A9A9',
        stroke: 'black',
        strokeWidth: 0.5,
    };

    return (   
        <polygon points={points} style={polygonStyle} onClick={onClick}/>
    );
}