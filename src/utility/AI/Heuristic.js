import React from 'react';
import PriorityQueue from './PriorityQueue';

export default function calculateRedMovesToWin(board)
{
	var trackBoard = JSON.parse(JSON.stringify(board)); //indexed as [row][col] or [yPos][xPos]
    var toVisit = new PriorityQueue(); //min heap of hexagons to explore
    const size = trackBoard.length;
	for (var col = 0; col < trackBoard.length; col++)
	{
		insertHexagonRed(col, 0, trackBoard[0][col], 0, toVisit, trackBoard);
	}

	const directions = [[0, -1], [1, -1],
						[-1, 0], [1, 0],
						[-1, 1], [0, 1]];

	while(!toVisit.isEmpty())
	{
		var hex = toVisit.pop();
		if (hex.yPos == size - 1)
			return hex.stepsFromStart;
		else
		{
			for (const [di, dj] of directions)
			{
				var col = hex.xPos + di; var row = hex.yPos + dj;
		    	if (row >= 0 && row < size && col >= 0 && col < size)
		    	{
		    		insertHexagonRed(col, row, trackBoard[row][col], hex.stepsFromStart, toVisit, trackBoard);
		    	}
	    	}
		}
	}
	console.log("error: trying to check min moves to win for red and the game is over");
	return 100000;
}

function insertHexagonRed(xPos, yPos, value, steps, toVisit, trackBoard)
{
	if (value == -1 || value == 2) //red cannot move where blue has moved or on an illegal move
		return;
	else if (value == 0)
	{
		trackBoard[yPos][xPos] = -1
		toVisit.push({xPos: xPos, yPos: yPos, stepsFromStart: steps + 1});
	}
	else if (value == 1)
	{
		trackBoard[yPos][xPos] = -1
		toVisit.push({xPos: xPos, yPos: yPos, stepsFromStart: steps});
	}
}