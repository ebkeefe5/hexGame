import React from 'react';
import getOpenCentralMoves from './MoveGenerator';
import checkWinBoardPlayer1  from '../../utility/RedGameOverCheck.js';
import checkWinBoardPlayer2  from '../../utility/BlueGameOverCheck.js';
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
    moveAIAtDepth(3, board, AIPlayerNumber);
}

function minMax(boardCopy, depth, maximizingPlayer, alpha, beta, AIPlayerNumber) {
  if (maximizingPlayer) {
    if ((AIPlayerNumber == 1 && checkWinBoardPlayer2({board: boardCopy}))
      || (AIPlayerNumber == 2 && checkWinBoardPlayer1({hexagons: boardCopy})))
      return -Infinity;
  }
  else
  {
    if ((AIPlayerNumber == 2 && checkWinBoardPlayer2({board: boardCopy}))
      || (AIPlayerNumber == 1 && checkWinBoardPlayer1({hexagons: boardCopy})))
      return Infinity;
  }
     
  if (depth === 0){
    return calculateHeuristic(boardCopy, AIPlayerNumber);
  }

  if (maximizingPlayer) {
    let bestValue = -Infinity;
    //TODO only check if game over if at least 11 moves
    let openMoves = getOpenCentralMoves({board: boardCopy});
    for (let openMove of openMoves){
      let row = openMove.y;
      let col = openMove.x;
      if (boardCopy[row][col] != 0)
        continue;
      const copy = JSON.parse(JSON.stringify(boardCopy));
      copy[row][col] = AIPlayerNumber;
      let value = minMax(copy, depth - 1, false, alpha, beta, AIPlayerNumber);
      bestValue = Math.max(bestValue, value);
      alpha = Math.max(alpha, value);
      if (beta <= alpha) {
        break;
      }
    }
    return bestValue;
  } else {
    let bestValue = Infinity;
    let openMoves = getOpenCentralMoves({board: boardCopy});
    for (let openMove of openMoves){
      let row = openMove.y;
      let col = openMove.x;
        if (boardCopy[row][col] != 0)
          continue;
        const copy = JSON.parse(JSON.stringify(boardCopy));
        var playerNumber = 1;
        if (AIPlayerNumber == 1)
          playerNumber = 2;
        copy[row][col] = playerNumber;
        let value = minMax(copy, depth - 1, true, alpha, beta, AIPlayerNumber);
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
  let bestValue = -Infinity;
  let alpha = -Infinity;
  let beta = Infinity;
  let depth = depthLevel; //in order to further increase this depth,
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
    let value = minMax(copy, depth - 1, false, alpha, beta, AIPlayerNumber);
    if (value > bestValue)
     {
      bestValue = value;
      bestMove = {y: row, x:col}};

  }
  board[bestMove.y][bestMove.x] = AIPlayerNumber;
}

function calculateHeuristic(board, AIPlayerNumber)
{
  if (AIPlayerNumber == 2)
    return - calculateBlueMovesToWin(board);
  else if (AIPlayerNumber == 1)
    return - calculateRedMovesToWin(board);
}