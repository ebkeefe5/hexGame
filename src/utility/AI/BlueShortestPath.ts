import React from 'react';
import PriorityQueue from './PriorityQueue';

type Board = number[][];
type Position = { x: number; y: number };

type Hexagon = {
  xPos: number;
  yPos: number;
  stepsFromStart: number;
  parent: Hexagon | null;
};

// ⛳ Pathfinding entry point for Blue player
export default function getBlueShortestPath({ board }: { board: Board }): Position[] | null {
  const trackBoard: Board = JSON.parse(JSON.stringify(board));
  const toVisit: PriorityQueue = new PriorityQueue();
  const size = trackBoard.length;

  for (let row = 0; row < size; row++) {
    insertHexagonBlueWithParent(0, row, trackBoard[row][0], 0, toVisit, trackBoard, null);
  }

  const directions: [number, number][] = [
    [0, -1], [1, -1],
    [-1, 0], [1, 0],
    [-1, 1], [0, 1]
  ];

  while (!toVisit.isEmpty()) {
    const hex = toVisit.pop();
    if (hex.xPos === size - 1) {
      return backTrack(hex);
    } else {
      for (const [di, dj] of directions) {
        const col = hex.xPos + di;
        const row = hex.yPos + dj;
        if (row >= 0 && row < size && col >= 0 && col < size) {
          insertHexagonBlueWithParent(col, row, trackBoard[row][col], hex.stepsFromStart, toVisit, trackBoard, hex);
        }
      }
    }
  }

  return null;
}

// 🔹 Helper for inserting into queue with step tracking & path history
function insertHexagonBlueWithParent(
  xPos: number,
  yPos: number,
  value: number,
  steps: number,
  toVisit: PriorityQueue,
  trackBoard: Board,
  parent: Hexagon | null
): void {
  if (value === -1 || value === 1) return;

  trackBoard[yPos][xPos] = -1;

  const stepsFromStart = value === 0 ? steps + 1 : steps;

  toVisit.push({
    xPos,
    yPos,
    stepsFromStart,
    parent
  });
}

// 🧭 Reconstruct path from goal to start via parent links
function backTrack(hex: Hexagon): Position[] {
  const path: Position[] = [{ x: hex.xPos, y: hex.yPos }];
  let current: Hexagon | null = hex;

  while (current.parent) {
    path.push({ x: current.parent.xPos, y: current.parent.yPos });
    current = current.parent;
  }

  return path; // optional if you want from start to goal
}
