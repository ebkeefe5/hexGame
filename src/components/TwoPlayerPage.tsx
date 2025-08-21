import React, {Component} from 'react';
import { io, Socket } from "socket.io-client";
import HexButton from './button/HexButton';
import PlayerTurn from './labels/PlayerTurn';
import ColorButton from './button/ColorButton';
import  border from './border/borders';
import { COLORS, NOT_ALLOWED_COLOR } from '../constants/colors';

type PageState = {
    showGameScreen: boolean;
    hexagons: number[][];
}

type GameState = {
    data: {
        gameBoard: number[][];
        turn: number;
    }
}

export default class TwoPlayerPage extends Component<{}, PageState>{
    private readonly twoPlayerBoardDimension = 11;
    private readonly CENTER_INDEX = Math.floor(this.twoPlayerBoardDimension/2);
    redIsNext = true;
    turn = 1;
    gameOver = false;
    gameCode = "";
    playerTurn = "Your Move!";
    playerNumber = 1;
    joinCode = "";
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
        this.reset();
    } 

    reset = () => {
        const initialHexagons = this.create2DArray(this.twoPlayerBoardDimension);
        initialHexagons[this.CENTER_INDEX][this.CENTER_INDEX] = -1;
        
        this.state = {
            showGameScreen: false,
            hexagons: initialHexagons,
        };
    }

    handleInit = (playerNumber: number) => {
        this.playerNumber = playerNumber;
        this.setState({showGameScreen: true});
    }

    updateGameState = (gameState: GameState) => {
        this.turn = gameState.data.turn;
        if (this.turn == this.playerNumber)
            this.playerTurn = "Your Move!";
        else
        {
            if (this.turn == 3)
                this.playerTurn = "Game Over: Red Wins!";
            else if (this.turn == 4)
                this.playerTurn = "Game Over: Blue Wins!";
            else 
                this.playerTurn = "Opponent's Move!";
        }
        this.setState({hexagons: gameState.data.gameBoard});
    }

    handleGameCode = (gameCode: string) => {
       this.joinCode = gameCode;
    }

    handleUnknownCode = () => {
        alert("unknown game code");
        this.reset();
    }

    handleDisconnected = () => {
        alert("opponent disconnected");
        this.reset();
    }

    handleTooManyPlayers = () => {
        alert("too many players");
        this.reset();
    }

    handleCreateNewGame = () => {
        if (this.ioClient == null)
            return;
        this.ioClient.emit('newGame');
    }

    setGameCode = (gameCode: string) => {
        this.gameCode = gameCode;
    }

    handleJoinGame = () => {
        if (this.ioClient == null)
            return;
        this.ioClient.emit('joinGame', this.gameCode);
    }
    
    create2DArray = (dimension: number) => {
        const array2D: number[][] = [];
        for (let i = 0; i < dimension; i++) {
            array2D.push(Array(dimension).fill(0)); 
        }
        return array2D;
    };

    
    handleHexagonClick = (row: number, col: number) => {
        if (this.ioClient == null)
            return;
        this.ioClient.emit('hexagonClicked', {row, col})
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

    getJoinCodeLabel = () => {
        return "Join Code: " + this.joinCode;
    }

     getColorLabel = () => {
        var playerColor = "Red";
        if (this.playerNumber == 2)
            playerColor = "Blue";
        return playerColor;
    }

    render()
    {
        
        if (this.state.showGameScreen)
        {
            return (
                <div className="parent-container">
                    
                    <div className="spacerColumn">   
                    <h4>{this.getJoinCodeLabel()}</h4>  
                    <ColorButton 
                        key={`redColorButton`}
                        label={this.getColorLabel()}
                        selected={true}
                        red = { this.playerNumber == 1 }
                        onClick={() => {}}
                    />  
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
                    <div className = "spacerRow"></div>
                    <button type="submit" onClick={this.handleCreateNewGame} style={{ backgroundColor: 'green', color:'white', padding: '10px 20px', border: 'none', borderRadius: '5px'}}>Create New Game</button>
                    <div><h3>OR</h3></div>
                    <div>
                        <input type="text" placeholder="Enter Game Code" onChange={(e) => this.setGameCode(e.target.value)}/>
                        </div>
                        <button type="submit" id="joinGameButton" onClick={this.handleJoinGame} style={{ padding: '10px 20px', border: 'none', borderRadius: '5px'}}>Join Game</button>
                </div>
            );
        }  
    }
}