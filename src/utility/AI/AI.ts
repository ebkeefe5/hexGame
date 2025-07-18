import React from 'react';
import getOpenCentralMoves from './MoveGenerator';
import checkWinBoardPlayer1  from '../RedGameOverCheck';
import checkWinBoardPlayer2  from '../BlueGameOverCheck';
import calculateRedMovesToWin from './Heuristic';
import calculateBlueMovesToWin from './BlueHeuristic';

type Board = number[][];
type Position = { x: number; y: number };

interface AIParams {
  board: Board;
  AIPlayerNumber: 1 | 2;
  difficulty: boolean[]; // [easy, medium], hard is fallback
}

export default function moveAI({ board, AIPlayerNumber, difficulty }: AIParams): void {
  if (difficulty[0]) {
    const openMoves = Array.from(getOpenCentralMoves({ board }));
    const randomIndex = Math.floor(Math.random() * openMoves.length);
    const bestMove = openMoves[randomIndex];
    board[bestMove.y][bestMove.x] = AIPlayerNumber;
  } else if (difficulty[1]) {
    moveAIAtDepth(1, board, AIPlayerNumber);
  } else {
    moveAIAtDepth(4, board, AIPlayerNumber);
  }
}

function minMax(
  boardCopy: Board,
  depth: number,
  alpha: number,
  beta: number,
  player: 1 | 2
): number {
  if (checkWinBoardPlayer2({ board: boardCopy })) return -Infinity;
  if (checkWinBoardPlayer1({ hexagons: boardCopy })) return Infinity;

  if (depth === 0) {
    return calculateHeuristic(boardCopy, player);
  }

  const openMoves = getOpenCentralMoves({ board: boardCopy });

  if (player === 1) {
    let bestValue = -Infinity;
    for (const { y: row, x: col } of openMoves) {
      if (boardCopy[row][col] !== 0) continue;

      const copy = JSON.parse(JSON.stringify(boardCopy)) as Board;
      copy[row][col] = player;
      const value = minMax(copy, depth - 1, alpha, beta, 2);
      bestValue = Math.max(bestValue, value);
      alpha = Math.max(alpha, value);
      if (beta <= alpha) break;
    }
    return bestValue;
  } else {
    let bestValue = Infinity;
    for (const { y: row, x: col } of openMoves) {
      if (boardCopy[row][col] !== 0) continue;

      const copy = JSON.parse(JSON.stringify(boardCopy)) as Board;
      copy[row][col] = player;
      const value = minMax(copy, depth - 1, alpha, beta, 1);
      bestValue = Math.min(bestValue, value);
      beta = Math.min(beta, value);
      if (beta <= alpha) break;
    }
    return bestValue;
  }
}

function moveAIAtDepth(
  depthLevel: number,
  board: Board,
  AIPlayerNumber: 1 | 2
): void {
  let minValue = Infinity;
  let maxValue = -Infinity;
  let alpha = -Infinity;
  let beta = Infinity;
  const openMoves = Array.from(getOpenCentralMoves({ board }));
  const randomIndex = Math.floor(Math.random() * openMoves.length);
  let bestMove = openMoves[randomIndex];

  for (const { y: row, x: col } of openMoves) {
    if (board[row][col] !== 0) continue;

    const copy = JSON.parse(JSON.stringify(board)) as Board;
    copy[row][col] = AIPlayerNumber;
    const nextPlayer: 1 | 2 = AIPlayerNumber === 1 ? 2 : 1;
    const value = minMax(copy, depthLevel - 1, alpha, beta, nextPlayer);

    if (AIPlayerNumber === 1 && value > maxValue) {
      maxValue = value;
      bestMove = { y: row, x: col };
    } else if (AIPlayerNumber === 2 && value < minValue) {
      minValue = value;
      bestMove = { y: row, x: col };
    }
  }

  board[bestMove.y][bestMove.x] = AIPlayerNumber;
}

function calculateHeuristic(board: Board, AIPlayerNumber: 1 | 2): number {
  return calculateBlueMovesToWin(board) - calculateRedMovesToWin(board);
}
