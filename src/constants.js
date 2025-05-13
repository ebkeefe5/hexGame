export const BOARD_DIMENSION = 3; //must be an odd number
export const HEXAGON_EDGE_LENGTH = Math.floor(window.screen.height/(BOARD_DIMENSION*20.0));
export const TOP_LEFT_HEXAGON_CENTER_X = HEXAGON_EDGE_LENGTH * 1.5;
export const TOP_LEFT_HEXAGON_CENTER_y = HEXAGON_EDGE_LENGTH * 1.5;
export const HEXAGON_WIDTH = Math.sqrt(3)*HEXAGON_EDGE_LENGTH;
export const BOARD_WIDTH = HEXAGON_WIDTH * (BOARD_DIMENSION + 1.5) * 1.5;
export const BOARD_HEIGHT = HEXAGON_EDGE_LENGTH * (BOARD_DIMENSION + 1.5) * Math.sqrt(3);

                    //unclaimedPiece, player1Piece, player2Piece, player1PieceWon, player2PieceWon
export const COLORS = ['#A9A9A9', '#E42217', '#7690ac', '#800000', '#000080'];
