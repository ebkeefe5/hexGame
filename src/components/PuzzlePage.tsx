import React from 'react';
import { useState } from 'react';
import HexButton from './button/HexButton';
import ColorButton from './button/ColorButton';
import RestartButton from './button/RestartButton';
import PlayerTurn from './labels/PlayerTurn';
import  border from './border/borders';
import  checkWinBoardPlayer1  from '.././utility/RedGameOverCheck';
import  checkWinBoardPlayer2  from '.././utility/BlueGameOverCheck';
import moveAI from '../utility/AI/AI.js';
import { COLORS, NOT_ALLOWED_COLOR } from '../constants/colors';

export default function PuzzlePage() {
    const create2DArray = (dimension: number): number[][] => {
        const array2D: number[][] = [];
        for (let i = 0; i < dimension; i++) {
            array2D.push(Array(dimension).fill(0));
        }
        return array2D;
    };

    
    const difficulty = [false, false, true];
    const [gameInProgress, setGameInProgress] = useState(false);
    const [twoPlayerBoardDimension] = useState(5);
    const [selectedColor, setSelectedColor] = useState([true, false]);
    const CENTER_INDEX = Math.floor(twoPlayerBoardDimension/2);
    const [hexagons, setHexagons] = useState(() => {
        const initialHexagons = create2DArray(twoPlayerBoardDimension);
        initialHexagons[2][1] = 1;
        initialHexagons[3][1] = 1;
        initialHexagons[4][1] = 1;
        initialHexagons[0][2] = 2;
        initialHexagons[1][3] = 2;
        initialHexagons[1][4] = 2;
        return initialHexagons;
    });
    const [redIsNext, setRedIsNext] = useState(true);
    const [gameOver, setGameOver] = useState(false);
    const [playerTurn, setPlayerTurn] = useState("Red's Move!");

    const handleRestartClick = () => {
        setGameInProgress(false);
        setGameOver(false);
        setRedIsNext(true);
        setPlayerTurn("Red's Move!");
        const initialHexagons = create2DArray(twoPlayerBoardDimension);
        initialHexagons[2][1] = 1;
        initialHexagons[3][1] = 1;
        initialHexagons[4][1] = 1;
        initialHexagons[0][2] = 2;
        initialHexagons[1][3] = 2;
        initialHexagons[1][4] = 2;
        if (selectedColor[1]) //selected blue
        {
          //move red AI, AIPlayerNumber index is different
          moveAI({board:initialHexagons, AIPlayerNumber:1, difficulty: difficulty})
          setRedIsNext(false);
          if (initialHexagons[CENTER_INDEX][CENTER_INDEX] == -1)
            initialHexagons[CENTER_INDEX][CENTER_INDEX] = 0;
        }
        setHexagons(initialHexagons);          
    }

    const handleSelectRedClick = () => {
      if (gameInProgress)
      {
        alert("please restart the game to update color");
        return;
      }
      setSelectedColor([true, false]);
    }

    const handleHexagonClick = (i: number, j: number) => {
        if (hexagons[i][j] != 0 
          || selectedColor[0] == true && !redIsNext
          || selectedColor[1] == true && redIsNext
          || gameOver)
          {
            return;
          }
            
        setGameInProgress(true);
        const nextHexagons = JSON.parse(JSON.stringify(hexagons));

        if (nextHexagons[CENTER_INDEX][CENTER_INDEX] == -1)
            nextHexagons[CENTER_INDEX][CENTER_INDEX] = 0;
        
        if (redIsNext){
            nextHexagons[i][j] = 1;
            if (checkWinBoardPlayer1({hexagons:nextHexagons}))
            {
                setGameOver(true);
                setPlayerTurn("Red wins!");
            }      
            else 
            {             
              moveAI({board:nextHexagons, AIPlayerNumber:2, difficulty: difficulty})
              setRedIsNext(true);   
              if (checkWinBoardPlayer2({board:nextHexagons}))
              {
                  setGameOver(true);
                  setPlayerTurn("Blue wins!");  
              }    
            }
        }         
        else 
        {            
            nextHexagons[i][j] = 2;  
            if (checkWinBoardPlayer2({board:nextHexagons}))
            {
                setGameOver(true);
                setPlayerTurn("Blue wins!");
            }
            else 
            {
              moveAI({board:nextHexagons, AIPlayerNumber:1, difficulty:difficulty})
              setRedIsNext(false);
              if (checkWinBoardPlayer1({hexagons:nextHexagons}))
              {
                setGameOver(true);
                setPlayerTurn("Red wins!");
              }      
            }            
        }      
        setHexagons(nextHexagons); 
    };

    const renderHexagons = () => {
        const hexagonComponents = [];
        for (let i = 0; i < twoPlayerBoardDimension; i++) {
            for (let j = 0; j < twoPlayerBoardDimension; j++) {
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
                    board_dimension = {twoPlayerBoardDimension}
                    onClick={() => handleHexagonClick(i, j)}
            />)
            }
        }
        return hexagonComponents;
    }

    return (
        <div className="parent-container">
            <div className="spacerColumn">
               <h4> Select Color</h4>
               <ColorButton 
                    key={`redColorButton`}
                    label={'Red'}
                    selected={selectedColor[0]}
                    red = { true }
                    onClick={() => handleSelectRedClick()}
                />  
               <PlayerTurn 
                    key={`turnLabel`}
                    text={playerTurn}
                />
               <RestartButton 
                    key={`restartButton`}
                    onClick={() => handleRestartClick()}
                />
               
            </div>
            <div>
                <svg viewBox='0 0 1000 800'>
                    {border({borderNumber:0, boardDimension:twoPlayerBoardDimension}) }
                    {border({borderNumber:1, boardDimension:twoPlayerBoardDimension}) }
                    {border({borderNumber:2, boardDimension:twoPlayerBoardDimension}) }
                    {border({borderNumber:3, boardDimension:twoPlayerBoardDimension}) }
                    {renderHexagons()}       
                </svg>
            </div>
        </div>
    );
}