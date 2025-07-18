import React from 'react';

type Board = number[][];
type Position = { x: number; y: number };

export default function checkWinBoardPlayer2({ board }: { board: Board }): boolean {
  const visited: Board = JSON.parse(JSON.stringify(board));

  for (let row = 0; row < visited.length; row++) {
    const toVisit: Position[] = [];
    const adj: Map<string, Position> = new Map();

    if (board[row][0] === 2) {
      const lastHexagon = blueBFS(toVisit, adj, { x: row, y: 0 }, visited);
      if (lastHexagon !== null) {
        markPathBlue(lastHexagon, adj, board);
        return true;
      }
    }
  }

  return false;
}

function blueBFS(
  toVisit: Position[],
  adj: Map<string, Position>,
  root: Position,
  visited: Board
): Position | null {
  toVisit.push(root);
  visited[root.x][root.y] = 4;
  const size = visited.length;

  const directions: [number, number][] = [
    [0, -1], [1, -1],
    [-1, 0], [1, 0],
    [-1, 1], [0, 1]
  ];

  while (toVisit.length > 0) {
    const curr = toVisit.shift()!;
    if (curr.y === size - 1) return curr;

    for (const [di, dj] of directions) {
      const row = curr.x + di;
      const col = curr.y + dj;

      if (
        row >= 0 &&
        row < size &&
        col >= 0 &&
        col < size &&
        visited[row][col] === 2
      ) {
        const next: Position = { x: row, y: col };
        adj.set(JSON.stringify(next), curr);
        toVisit.push(next);
        visited[row][col] = 4;
      }
    }
  }

  return null;
}

function markPathBlue(lastHexagon: Position, adj: Map<string, Position>, board: Board): void {
  let curr: Position = lastHexagon;

  while (curr.y > 0) {
    board[curr.x][curr.y] = 4;
    const key = JSON.stringify(curr);
    const parent = adj.get(key);
    if (!parent) break;
    curr = parent;
  }

  board[curr.x][curr.y] = 4;
}
