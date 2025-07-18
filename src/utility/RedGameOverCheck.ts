import React from 'react';

type Board = number[][];
type Position = { x: number; y: number };

export default function checkWinBoardPlayer1({ hexagons }: { hexagons: Board }): boolean {
  const visitedRedHexagons: Board = JSON.parse(JSON.stringify(hexagons));

  for (let col = 0; col < visitedRedHexagons.length; col++) {
    const toVisit: Position[] = [];
    const adj: Map<string, Position> = new Map();

    if (hexagons[0][col] === 1) {
      const lastHexagon = redBFS(toVisit, adj, { x: 0, y: col }, visitedRedHexagons);
      if (lastHexagon !== null) {
        markPathRed(lastHexagon, adj, hexagons);
        return true;
      }
    }
  }

  return false;
}

function redBFS(
  toVisit: Position[],
  adj: Map<string, Position>,
  root: Position,
  visitedRedHexagons: Board
): Position | null {
  const size = visitedRedHexagons.length;
  toVisit.push(root);
  visitedRedHexagons[root.x][root.y] = 3;

  const directions: [number, number][] = [
    [0, -1], [1, -1],
    [-1, 0], [1, 0],
    [-1, 1], [0, 1]
  ];

  while (toVisit.length > 0) {
    const curr = toVisit.shift()!;
    if (curr.x === size - 1) return curr;

    for (const [di, dj] of directions) {
      const row = curr.x + di;
      const col = curr.y + dj;
      if (
        row >= 0 &&
        row < size &&
        col >= 0 &&
        col < size &&
        visitedRedHexagons[row][col] === 1
      ) {
        const next: Position = { x: row, y: col };
        adj.set(JSON.stringify(next), curr); // Keys must be stringified
        toVisit.push(next);
        visitedRedHexagons[row][col] = 3;
      }
    }
  }

  return null;
}

function markPathRed(lastHexagon: Position, adj: Map<string, Position>, hexagons: Board): void {
  let curr: Position = lastHexagon;

  while (curr.x > 0) {
    hexagons[curr.x][curr.y] = 3;
    const key = JSON.stringify(curr);
    const parent = adj.get(key);
    if (!parent) break;
    curr = parent;
  }

  hexagons[curr.x][curr.y] = 3;
}
