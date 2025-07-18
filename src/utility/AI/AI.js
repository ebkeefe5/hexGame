import React from 'react';
import getOpenCentralMoves from './MoveGenerator';
import checkWinBoardPlayer1  from '../RedGameOverCheck.js';
import checkWinBoardPlayer2  from '../BlueGameOverCheck.js';
import calculateRedMovesToWin from './Heuristic.js';
import calculateBlueMovesToWin from './BlueHeuristic.js';

export default function moveAI({ board, AIPlayerNumber, difficulty })
{
  if (difficulty[0])
  {
    let openMoves = Array.from(getOpenCentralMoves({board: board}));
    const randomIndex = Math.floor(Math.random() * openMoves.length);
    let bestMove = openMoves[randomIndex];
    board[bestMove.y][bestMove.x] = AIPlayerNumber;
  }
  else if (difficulty[1])
    moveAIAtDepth(1, board, AIPlayerNumber);
  else 
    moveAIAtDepth(4, board, AIPlayerNumber);
}

function minMax(boardCopy, depth, alpha, beta, player) {
  //check for end states
  if (checkWinBoardPlayer2({board: boardCopy}))
    return -Infinity;
  else if (checkWinBoardPlayer1({hexagons: boardCopy}))
    return Infinity;
  
  //terminal depth, calculate heuristic
  if (depth === 0){
    return calculateHeuristic(boardCopy, player);
  }

  if (player == 1) {
    let bestValue = -Infinity;
    let openMoves = getOpenCentralMoves({board: boardCopy});
    for (let openMove of openMoves){
      let row = openMove.y;
      let col = openMove.x;
      if (boardCopy[row][col] != 0)
        continue;
      const copy = JSON.parse(JSON.stringify(boardCopy));
      copy[row][col] = player;
      let value = minMax(copy, depth - 1, alpha, beta, 2);
      bestValue = Math.max(bestValue, value);
      alpha = Math.max(alpha, value);
      if (beta <= alpha) {
        break;
      }
    }
    return bestValue;
  } else if (player == 2){
    let bestValue = Infinity;
    let openMoves = getOpenCentralMoves({board: boardCopy});
    for (let openMove of openMoves){
      let row = openMove.y;
      let col = openMove.x;
        if (boardCopy[row][col] != 0)
          continue;
        const copy = JSON.parse(JSON.stringify(boardCopy));
        copy[row][col] = player;
        let value = minMax(copy, depth - 1, alpha, beta, 1);
        bestValue = Math.min(bestValue, value);
        beta = Math.min(beta, value);
        if (beta <= alpha) {
          break;
        }
    }
    return bestValue;
  }
}

function moveAIAtDepth(depthLevel, board, AIPlayerNumber)
{
  let minValue = Infinity;
  let maxValue = -Infinity;
  let alpha = -Infinity;
  let beta = Infinity;
  let openMoves = Array.from(getOpenCentralMoves({board: board}));
  const randomIndex = Math.floor(Math.random() * openMoves.length);
  let bestMove = openMoves[randomIndex];
  
  for (let openMove of openMoves){
    let row = openMove.y;
    let col = openMove.x;
    if (board[row][col] != 0)
      continue;
    const copy = JSON.parse(JSON.stringify(board));
    copy[row][col] = AIPlayerNumber;
    let nextPlayer = (AIPlayerNumber === 1) ? 2 : 1;
    let value = minMax(copy, depthLevel - 1, alpha, beta, nextPlayer);
    //let value = minMax(copy, depthLevel - 1, alpha, beta, AIPlayerNumber);
    if (AIPlayerNumber == 1 && value > maxValue) //player 1 is maximizing
    {
      maxValue = value;
      bestMove = {y: row, x:col};
    }
    else if (AIPlayerNumber == 2 && value < minValue) //player 2 is minimizing
    {
      minValue = value;
      bestMove = {y: row, x:col}; 
    }
  }
  board[bestMove.y][bestMove.x] = AIPlayerNumber;
}

function calculateHeuristic(board, AIPlayerNumber)
{
  if (AIPlayerNumber == 2) //player 2 is minimizing moves to wins
    return calculateBlueMovesToWin(board) - calculateRedMovesToWin(board); 
  else //player 1 is maximizing inverse of moves to win
    return calculateBlueMovesToWin(board) - calculateRedMovesToWin(board); 
}