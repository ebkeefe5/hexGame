import React from 'react';
import { useState } from 'react';
import { io } from "socket.io-client";
import HexButton from './button/HexButton';
import SelectNumberButton from './button/SelectNumberButton';
import RestartButton from './button/RestartButton';
import PlayerTurn from './labels/PlayerTurn';
import  border from './border/borders';
import  checkWinBoardPlayer1  from '.././utility/RedGameOverCheck';
import  checkWinBoardPlayer2  from '.././utility/BlueGameOverCheck';
import { COLORS, NOT_ALLOWED_COLOR } from '../constants/colors';

const ioClient = io('http://localhost:3000');

export default function TwoPlayerPage() {
    const create2DArray = (dimension: number) => {
        const array2D: number[][] = [];
        for (let i = 0; i < dimension; i++) {
            array2D.push(Array(dimension).fill(0)); 
        }
        return array2D;
    };

    const twoPlayerBoardDimension = 11;
    const [gameInProgress, setGameInProgress] = useState(false);
    const [selectedBoardSize, setSeletedBoardSize] = useState([true, false, false, false])
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
        setHexagons(initialHexagons);
    }

    const handleBoardSizeClick = (boardDimension: number) => {
        if (gameInProgress)
        {
            alert("please restart the game to update board size");
            return;
        }
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

    const handleHexagonClick = (i: number, j: number) => {
        if (hexagons[i][j] != 0 || gameOver)
            return

        setGameInProgress(true);

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