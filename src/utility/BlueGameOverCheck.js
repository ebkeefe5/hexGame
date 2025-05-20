import React from 'react';

export default function checkWinBoardPlayer2( { board } )
{
    const visited = JSON.parse(JSON.stringify(board)); 

    for (var row = 0; row < visited.length; row++)
    {
        //start new BFS for each hex at the top row
        const toVisit = []; const adj = new Map(); 

        if (board[row][0] == 2)
        {
            var lastHexagon = blueBFS(toVisit, adj, {x:row, y:0}, visited);
            if (lastHexagon != null)
            {
                markPathBlue(lastHexagon, adj, board);
                return true;
            }
        }
    }

    return false;
}

function blueBFS(toVisit, adj, root, visited)
{
    toVisit.push(root);
    visited[root.x][root.y] = 4;
    const size = visited.length;

    const directions = [[0, -1], [1, -1], 
                        [-1, 0], [1, 0], 
                        [-1, 1], [0, 1]];
    
    while(toVisit.length > 0)
    {
        var curr = toVisit[0];
        toVisit.shift();
        if (curr.y == size - 1)
            return curr;
        for (const [di, dj] of directions) 
        {
            var row = curr.x + di; var col = curr.y + dj;
            if (row >= 0 && row < size && col >= 0 && col < size && visited[row][col] == 2)
            {
                var next = {x:row, y:col};
                adj.set(next, curr); 
                toVisit.push(next);
                visited[row][col] = 4;
            }
        }
    }
    return null;	
}

function markPathBlue(lastHexagon, adj, board)
{
    var curr = lastHexagon;
    while(curr.y > 0)
    {
        board[curr.x][curr.y] = 4;
        curr = adj.get(curr);
    }
    board[curr.x][curr.y] = 4;
}
