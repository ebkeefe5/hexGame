import React from 'react';
import { useState } from 'react';
import HexButton from './button/HexButton';
import SelectNumberButton from './button/SelectNumberButton';
import ColorButton from './button/ColorButton';
import RestartButton from './button/RestartButton';
import PlayerTurn from './labels/PlayerTurn';
import  border from './border/borders';
import  checkWinBoardPlayer1  from '.././utility/RedGameOverCheck.js';
import  checkWinBoardPlayer2  from '.././utility/BlueGameOverCheck.js';
import moveAI from '../utility/AI/AI.js';
import { COLORS, NOT_ALLOWED_COLOR } from '../constants/colors.js';

export default function TwoPlayerPage() {
    const create2DArray = (dimension: number) => {
        const array2D: number[][] = [];
        for (let i = 0; i < dimension; i++) {
            array2D.push(Array(dimension).fill(0)); // Create a new row filled with 0s
        }
        return array2D;
    };
    
    const [difficulty, selectDifficulty] = useState([true, false, false]);
    const [gameInProgress, setGameInProgress] = useState(false);
    const [twoPlayerBoardDimension, setTwoPlayerBoardDimension] = useState(5);
    const [selectedBoardSize, setSeletedBoardSize] = useState([true, false, false, false])
    const [selectedColor, setSelectedColor] = useState([true, false]);
    const CENTER_INDEX = Math.floor(twoPlayerBoardDimension/2);
    const [hexagons, setHexagons] = useState(() => {
        const initialHexagons = create2DArray(twoPlayerBoardDimension);
        initialHexagons[CENTER_INDEX][CENTER_INDEX] = -1;
        return initialHexagons;
    });
    const [redIsNext, setRedIsNext] = useState(true);
    const [gameOver, setGameOver] = useState(false);
    const [playerTurn, setPlayerTurn] = useState("Red's Move!");

    const handleRestartClick = () => {
        setGameInProgress(false);
        setGameOver(false);
        setRedIsNext(true);
        setPlayerTurn("Red's Move!")
        const initialHexagons = create2DArray(twoPlayerBoardDimension);
        initialHexagons[CENTER_INDEX][CENTER_INDEX] = -1;
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

    const handleSelectBlueClick = () => {
      if (gameInProgress)
      {
        alert("please restart the game to update color");
        return;
      }
      setSelectedColor([false, true]);
      moveAI({board:hexagons, AIPlayerNumber:1, difficulty: difficulty})
      setGameInProgress(true);
      setRedIsNext(false);
      if (hexagons[CENTER_INDEX][CENTER_INDEX] == -1)
        hexagons[CENTER_INDEX][CENTER_INDEX] = 0;
    }

    const handleSelectRedClick = () => {
      if (gameInProgress)
      {
        alert("please restart the game to update color");
        return;
      }
      setSelectedColor([true, false]);
    }

    const handleBoardSizeClick = (boardDimension: number) => {
        if (gameInProgress)
        {
            alert("please restart the game to update board size");
            return;
        }
        setTwoPlayerBoardDimension(boardDimension)
        setGameOver(false);
        setRedIsNext(true);
        setPlayerTurn("Red's Move!")
        //use boardDimension variable for size since
        //twoPlayerBoardDimension takes another cycle to actually update
        const initialHexagons = create2DArray(boardDimension); 
        const CENTER_INDEX = Math.floor(boardDimension/2);
        initialHexagons[CENTER_INDEX][CENTER_INDEX] = -1;
        setHexagons(initialHexagons);

        if (boardDimension == 5)
            setSeletedBoardSize([true, false, false, false]);
        else if (boardDimension == 7)
            setSeletedBoardSize([false, true, false, false]);
        else if (boardDimension == 9)
            setSeletedBoardSize([false, false, true, false]);
        else 
            setSeletedBoardSize([false, false, false, true]);
    }

    const handleDifficultyClick = (difficulty: number) => {
        if (gameInProgress)
        {
            alert("please restart the game to update difficulty");
            return;
        }

        if (difficulty == 1)
            selectDifficulty([true, false, false]);
        else if (difficulty == 2)
            selectDifficulty([false, true, false]);
        else 
            selectDifficulty([false, false, true]);
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
               <h4> Select Board Size</h4>
               <SelectNumberButton 
                    key={`5-size`}
                    label={'5'}
                    selected={selectedBoardSize[0]}
                    onClick={() => handleBoardSizeClick(5)}
                />         
                <SelectNumberButton 
                    key={`7-size`}
                    label={'7'}
                    selected={selectedBoardSize[1]}
                    onClick={() => handleBoardSizeClick(7)}
                />   
                <SelectNumberButton 
                    key={`9-size`}
                    label={'9'}
                    selected={selectedBoardSize[2]}
                    onClick={() => handleBoardSizeClick(9)}
                />      
                <SelectNumberButton 
                    key={`11-size`}
                    label={'11'}
                    selected={selectedBoardSize[3]}
                    onClick={() => handleBoardSizeClick(11)}
                />         
               <h4> Select Color</h4>
               <ColorButton 
                    key={`redColorButton`}
                    label={'Red'}
                    selected={selectedColor[0]}
                    red = { true }
                    onClick={() => handleSelectRedClick()}
                />  
                <ColorButton 
                    key={`blueColorButton`}
                    label={'Blue'}
                    selected={selectedColor[1]}
                    red = { false }
                    onClick={() => handleSelectBlueClick()}
                />  
               <h4> Select Difficulty</h4>  
              <SelectNumberButton 
                    key={`1-difficulty`}
                    label={'1'}
                    selected={difficulty[0]}
                    onClick={() => handleDifficultyClick(1)}
              />      
              <SelectNumberButton 
                  key={`2-difficulty`}
                  label={'2'}
                  selected={difficulty[1]}
                  onClick={() => handleDifficultyClick(2)}
              />      
              <SelectNumberButton 
                  key={`3-difficulty`}
                  label={'3'}
                  selected={difficulty[2]}
                  onClick={() => handleDifficultyClick(3)}
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
            <div >
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