import React from 'react';
import { useState } from 'react';
import HexButton from './button/HexButton';
import RestartButton from './button/RestartButton';
import PlayerTurn from './labels/PlayerTurn';
import  border from './border/borders.js';
import  checkWinBoardPlayer1  from '.././utility/RedGameOverCheck.js';
import  checkWinBoardPlayer2  from '.././utility/BlueGameOverCheck.js';
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
    const [playerTurn, setPlayerTurn] = useState("Red's Move!");

    const handleRestartClick = () => {
        setGameOver(false);
        setRedIsNext(true);
        setPlayerTurn("Red's Move!")
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
            if (checkWinBoardPlayer1({hexagons:nextHexagons}))
            {
                setGameOver(true);
                setPlayerTurn("Red wins!")
            }      
            else 
                setPlayerTurn("Blue's Move!")         
        }         
        else 
        {            
            nextHexagons[i][j] = 2;  
            if (checkWinBoardPlayer2({board:nextHexagons}))
            {
                setGameOver(true);
                setPlayerTurn("Blue wins!")     
            }
            else 
                setPlayerTurn("Red's Move!")
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
        <div className="parent-container">
            <div className="spacerColumn">
               <div className = "spacerRow"></div>
               <div className = "spacerRow"></div>
               <RestartButton 
                    key={`restartButton`}
                    onClick={() => handleRestartClick()}
                />
               <div className = "spacerRow"></div>
               <PlayerTurn 
                    key={`turnLabel`}
                    text={playerTurn}
                />
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
}