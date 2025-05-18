import React from 'react';
import { useState } from 'react';
import HexButton from './button/HexButton';
import RestartButton from './button/RestartButton';
import  border  from './border/borders.js';
import { BOARD_DIMENSION } from '../constants/board.js';
import { COLORS, NOT_ALLOWED_COLOR } from '../constants/colors.js';

export default function TwoPlayerPage() {
    const CENTER_INDEX = Math.floor(BOARD_DIMENSION/2);

    const create2DArray = (dimension) => {
        const array2D = [];
        for (let i = 0; i < dimension; i++) {
            array2D.push(Array(dimension).fill(0)); // Create a new row filled with 0s
        }
        return array2D;
    };

    const [hexagons, setHexagons] = useState(() => {
        const initialHexagons = create2DArray(BOARD_DIMENSION);
        initialHexagons[CENTER_INDEX][CENTER_INDEX] = -1;
        return initialHexagons;
    });
    const [redIsNext, setRedIsNext] = useState(true);
    const [gameOver, setGameOver] = useState(false);

    const handleRestartClick = () => {
        setGameOver(false);
        setRedIsNext(true);
        const initialHexagons = create2DArray(BOARD_DIMENSION);
        initialHexagons[CENTER_INDEX][CENTER_INDEX] = -1;
        setHexagons(initialHexagons);
    }

    const handleHexagonClick = (i, j) => {
        if (hexagons[i][j] != 0 || gameOver)
            return

        const nextHexagons = JSON.parse(JSON.stringify(hexagons));

        if (nextHexagons[CENTER_INDEX][CENTER_INDEX] == -1)
            nextHexagons[CENTER_INDEX][CENTER_INDEX] = 0;
        
        if (redIsNext){
            nextHexagons[i][j] = 1;
            if (checkWinBoardPlayer1(nextHexagons))
                setGameOver(true);
        }         
        else 
        {
            nextHexagons[i][j] = 2;  
            if (checkWinBoardPlayer2(nextHexagons))
                setGameOver(true);     
        }      
        
        setRedIsNext(!redIsNext);
        setHexagons(nextHexagons); 
    };

    const renderHexagons = () => {
        const hexagonComponents = [];
        for (let i = 0; i < BOARD_DIMENSION; i++) {
            for (let j = 0; j < BOARD_DIMENSION; j++) {
                var fill = COLORS[0];
                if (hexagons[i][j] == -1)
                    fill = NOT_ALLOWED_COLOR;
                else 
                    fill = COLORS[hexagons[i][j]];
                    
                hexagonComponents.push(<HexButton 
                    key={`hex-${i}-${j}`}
                    row = {i}
                    col = {j}
                    fill = {fill}
                    onClick={() => handleHexagonClick(i, j)}
            />)
            }
        }
        return hexagonComponents;
    }

    return (
        <div class="parent-container">
            <div class="spacerColumn">
               <div class = "spacerRow"></div>
               <div class = "spacerRow"></div>
               <RestartButton 
                    key={`restartButton`}
                    onClick={() => handleRestartClick()}
                />
               <div class = "spacerRow"></div>
               <h3 id = "playerTurn">Red's Move!</h3>
            </div>
            <div display ="inline-block" >
                <svg viewBox='0 0 1000 800'>
                    {border({borderNumber:0}) }
                    {border({borderNumber:1}) }
                    {border({borderNumber:2}) }
                    {border({borderNumber:3}) }
                    {renderHexagons()}       
                </svg>
            </div>
        </div>
    );

    function checkWinBoardPlayer1(hexagons)
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

    function checkWinBoardPlayer2(board)
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
}