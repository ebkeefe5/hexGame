import React from 'react';
type Board = number[][];
type Position = { x: number; y: number };

import getRedShortestPath from './RedShortestPath';
import getBlueShortestPath from './BlueShortestPath';

// 🧠 Finds all open positions along Red and Blue central paths next to claimed cells
export default function getOpenCentralMoves({ board }: { board: Board }): Set<Position> {
  const redShortestPath: Position[] | null = getRedShortestPath({ board });
  const redOpenSpot: Position[] = [];

  if (redShortestPath != null )
  {
    for (const entry of redShortestPath) {
      if (board[entry.y][entry.x] === 0) {
        redOpenSpot.push(entry);
      }
    }
    pushCentralSpotIfNeeded(board, redOpenSpot, redShortestPath);
  }

  const blueShortestPath: Position[] | null = getBlueShortestPath({ board });
  const blueOpenSpot: Position[] = [];

  if (blueShortestPath != null )
  {
    for (const entry of blueShortestPath) {
      if (board[entry.y][entry.x] === 0) {
        blueOpenSpot.push(entry);
      }
    }

    pushCentralSpotIfNeeded(board, blueOpenSpot, blueShortestPath);
  }

  return new Set<Position>([...redOpenSpot, ...blueOpenSpot]);
}

// 🪛 Ensures at least one central spot is returned if path is blocked
function pushCentralSpotIfNeeded(
  board: Board,
  openSpots: Position[],
  shortestPath: Position[]
): void {
  if (openSpots.length === 0) {
    let lowIndex = Math.floor(shortestPath.length / 2);
    let highIndex = Math.floor(shortestPath.length / 2 + 1);

    while (true) {
      if (
        lowIndex >= 0 &&
        board[shortestPath[lowIndex].y][shortestPath[lowIndex].x] === 0
      ) {
        openSpots.push(shortestPath[lowIndex]);
        break;
      }

      if (
        highIndex < shortestPath.length &&
        board[shortestPath[highIndex].y][shortestPath[highIndex].x] === 0
      ) {
        openSpots.push(shortestPath[highIndex]);
        break;
      }

      lowIndex--;
      highIndex++;
      if (lowIndex < 0 && highIndex >= shortestPath.length) break;
    }
  }
}
