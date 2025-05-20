import React from 'react';
import PriorityQueue from './PriorityQueue';

export default function getRedShortestPath( { board } )
{
  var trackBoard = JSON.parse(JSON.stringify(board)); //indexed as [row][col] or [yPos][xPos]
  const toVisit = new PriorityQueue(); //min heap of hexagons to explore
  const size = trackBoard.length;
  for (var col = 0; col < trackBoard.length; col++)
  {
    insertHexagonRedWithParent(col, 0, trackBoard[0][col], 0, toVisit, trackBoard, null);
  }
  
  const directions = [[0, -1], [1, -1], 
            [-1, 0], [1, 0], 
            [-1, 1], [0, 1]];

  while(!toVisit.isEmpty())
  {
    var hex = toVisit.pop();
    if (hex.yPos == size - 1)
      return backTrack(hex);
    else
    {
      for (const [di, dj] of directions) 
      {
        var col = hex.xPos + di; var row = hex.yPos + dj;
          if (row >= 0 && row < size && col >= 0 && col < size)
          {
            insertHexagonRedWithParent(col, row, trackBoard[row][col], hex.stepsFromStart, toVisit, trackBoard, hex);
          }
        }
    }
  }
  return null;
}

function backTrack(hex)
{
  var path = [{x:hex.xPos, y:hex.yPos}];
  var current = hex;
  while (current.parent) {
    path.push({x:current.parent.xPos, y:current.parent.yPos});
    current = current.parent;
  }
  return path;   
}

function insertHexagonRedWithParent(xPos, yPos, value, steps, toVisit, trackBoard, parent)
{
  if (value == -1 || value == 2) //red cannot move where blue has moved or on an illegal move
    return;
  else if (value == 0)
  {
    trackBoard[yPos][xPos] = -1
    toVisit.push({xPos: xPos, yPos: yPos, stepsFromStart: steps + 1, parent:parent});
  }
  else if (value == 1)
  {
    trackBoard[yPos][xPos] = -1
    toVisit.push({xPos: xPos, yPos: yPos, stepsFromStart: steps, parent:parent});
  }
} 