import React from 'react';

export default function checkWinBoardPlayer1({hexagons})
{
    const visitedRedHexagons = JSON.parse(JSON.stringify(hexagons));

    for (var col = 0; col < visitedRedHexagons.length; col++)
    {
        //start new BFS for each hex at the top row
        const toVisit = []; const adj = new Map(); 

        if (hexagons[0][col] == 1)
        {
            var lastHexagon = redBFS(toVisit, adj, {x:0, y:col}, visitedRedHexagons);
            if (lastHexagon != null)
            {
                markPathRed(lastHexagon, adj, hexagons);
                return true;
            }
        }
    }

    return false;
}

function redBFS(toVisit, adj, root, visitedRedHexagons)
{
    const size = visitedRedHexagons.length;
    toVisit.push(root);
    visitedRedHexagons[root.x][root.y] = 3;

    const directions = [[0, -1], [1, -1], 
                        [-1, 0], [1, 0], 
                        [-1, 1], [0, 1]];
    
    while(toVisit.length > 0)
    {
        var curr = toVisit[0];
        toVisit.shift();
        if (curr.x == size - 1)
            return curr;
        for (const [di, dj] of directions) 
        {
            var row = curr.x + di; var col = curr.y + dj;
            if (row >= 0 && row < size && col >= 0 && col < size && visitedRedHexagons[row][col] == 1)
            {
                var next = {x:row, y:col};
                adj.set(next, curr); 
                toVisit.push(next);
                visitedRedHexagons[row][col] = 3;
            }
        }
    }
    return null;	
}

function markPathRed(lastHexagon, adj, hexagons)
{
    var curr = lastHexagon;
    while(curr.x > 0)
    {
        hexagons[curr.x][curr.y] = 3;
        curr = adj.get(curr);
    }
    hexagons[curr.x][curr.y] = 3;
}