import React, {Component} from 'react';
import { io, Socket } from "socket.io-client";
import HexButton from './button/HexButton';
import PlayerTurn from './labels/PlayerTurn';
import  border from './border/borders';
import  checkWinBoardPlayer1  from '.././utility/RedGameOverCheck';
import  checkWinBoardPlayer2  from '.././utility/BlueGameOverCheck';
import { COLORS, NOT_ALLOWED_COLOR } from '../constants/colors';

type GameState = {
    gameInProgress: boolean;
    hexagons: number[][];
}

export default class TwoPlayerPage extends Component<{}, GameState>{
    private readonly twoPlayerBoardDimension = 11;
    private readonly CENTER_INDEX = Math.floor(this.twoPlayerBoardDimension/2);
    redIsNext = true;
    gameOver = false;
    gameCode = "";
    playerTurn = "Red's Move";
    playerNumber = 1;
    private ioClient: Socket | null = null;
    

    componentDidMount(): void {
        this.ioClient = io('http://localhost:3000');

        this.ioClient.on("init", (playerNumber) => this.handleInit(playerNumber));
        this.ioClient.on("update", (gameState) => this.updateGameState(gameState));
        this.ioClient.on('gameCode', (gameCode) => this.handleGameCode(gameCode));
        this.ioClient.on('unknownCode', this.handleUnknownCode);
        this.ioClient.on('disconnected', this.handleDisconnected);
        this.ioClient.on('tooManyPlayers', this.handleTooManyPlayers);
    }

    componentWillUnmount() {
        if (this.ioClient) {
            this.ioClient.disconnect();
        }
    }
    
    constructor(props: {}) {
        super(props);
        
        const initialHexagons = this.create2DArray(this.twoPlayerBoardDimension);
        initialHexagons[this.CENTER_INDEX][this.CENTER_INDEX] = -1;
        
        this.state = {
            gameInProgress: false,
            hexagons: initialHexagons,
        };
    } 

    handleInit = (playerNumber: number) => {
        //start a new game with player number as number
    }

    updateGameState = (gameState: number[][]) => {
        //refactor to be object 
        this.setState({hexagons: gameState});
    }

    handleGameCode = (gameCode: number) => {
        //create a new game with the game code
    }

    handleUnknownCode = () => {
        //handle the unkown game code
    }

    handleDisconnected = () => {
        //handle being disconnected
    }

    handleTooManyPlayers = () => {
        //handle too many players
    }

    handleStartGame = () => {
        this.setState({ gameInProgress: true }); 
    }

    setGameCode = (gameCode: string) => {
        this.gameCode = gameCode;
        
    }

    handleJoinGame = () => {
        console.log(this.gameCode);
    }
    
    create2DArray = (dimension: number) => {
        const array2D: number[][] = [];
        for (let i = 0; i < dimension; i++) {
            array2D.push(Array(dimension).fill(0)); 
        }
        return array2D;
    };

    
    handleHexagonClick = (i: number, j: number) => {
        if (this.state.hexagons[i][j] != 0 || this.gameOver)
            return

        this.setState({ gameInProgress: true });

        const nextHexagons = JSON.parse(JSON.stringify(this.state.hexagons));

        if (nextHexagons[this.CENTER_INDEX][this.CENTER_INDEX] == -1)
            nextHexagons[this.CENTER_INDEX][this.CENTER_INDEX] = 0;
        
        if (this.redIsNext){
            nextHexagons[i][j] = 1;
            if (checkWinBoardPlayer1({hexagons:nextHexagons}))
            {
                this.gameOver = true;
                this.playerTurn = "Red wins!";
            }      
            else 
            {
                this.playerTurn = "Blue's move!";
            }      
        }         
        else 
        {            
            nextHexagons[i][j] = 2;  
            if (checkWinBoardPlayer2({board:nextHexagons}))
            {
                this.gameOver = true;
                this.playerTurn = "Blue wins!";  
            }
            else 
                this.playerTurn = "Red's move!";
        }      
        
        this.redIsNext = !this.redIsNext;
        this.setState({ hexagons: nextHexagons }); 
    };

    renderHexagons = () => {
        const hexagonComponents = [];
        for (let i = 0; i < this.twoPlayerBoardDimension; i++) {
            for (let j = 0; j < this.twoPlayerBoardDimension; j++) {
                var fill = COLORS[0];
                if (this.state.hexagons[i][j] == -1)
                    fill = NOT_ALLOWED_COLOR;
                else 
                    fill = COLORS[this.state.hexagons[i][j]];
                    
                hexagonComponents.push(<HexButton 
                    key={`hex-${i}-${j}`}
                    row = {i}
                    col = {j}
                    fill = {fill}
                    board_dimension = {this.twoPlayerBoardDimension}
                    onClick={() => this.handleHexagonClick(i, j)}
            />)
            }
        }
        return hexagonComponents;
    }

    render()
    {
        
        if (this.state.gameInProgress)
        {
            return (
                <div className="parent-container">
                    <div className="spacerColumn">           
                    <PlayerTurn 
                            key={`turnLabel`}
                            text={this.playerTurn}
                        /> 
                    </div>
                    <div >
                        <svg viewBox='0 0 1000 800'>
                            {border({borderNumber:0, boardDimension:this.twoPlayerBoardDimension}) }
                            {border({borderNumber:1, boardDimension:this.twoPlayerBoardDimension}) }
                            {border({borderNumber:2, boardDimension:this.twoPlayerBoardDimension}) }
                            {border({borderNumber:3, boardDimension:this.twoPlayerBoardDimension}) }
                            {this.renderHexagons()}       
                        </svg>
                    </div>
                </div>
            );
        }
        else
        {
            return (
                <div>
                    <button type="submit" id="newGameButton" onClick={this.handleStartGame}>Create New Game</button>
                    <div><h3>OR</h3></div>
                    <div>
                        <input type="text" placeholder="Enter Game Code" onChange={(e) => this.setGameCode(e.target.value)}/>
                        </div>
                        <button type="submit" id="joinGameButton" onClick={this.handleJoinGame}>Join Game</button>
                </div>
            );
        }  
    }
}