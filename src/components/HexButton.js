import React from 'react';
import { HEXAGON_EDGE_LENGTH, TOP_LEFT_HEXAGON_CENTER_X, TOP_LEFT_HEXAGON_CENTER_y } from '../constants.js';

export default class HexButton extends React.Component
{
    render() {
        const { row, col, onClick} = this.props;

        var cx = TOP_LEFT_HEXAGON_CENTER_X + col * Math.sqrt(3) * HEXAGON_EDGE_LENGTH + Math.sqrt(3)*HEXAGON_EDGE_LENGTH/2*row;
        var cy = TOP_LEFT_HEXAGON_CENTER_y + row * 3/2 * HEXAGON_EDGE_LENGTH;

        var x1 = cx - Math.sqrt(3)*HEXAGON_EDGE_LENGTH/2;
        var x2 = cx;
        var x3 = cx + Math.sqrt(3)*HEXAGON_EDGE_LENGTH/2;

        var y1 = cy - 1/2 * HEXAGON_EDGE_LENGTH;
        var y2 = cy - HEXAGON_EDGE_LENGTH;
        var y3 = cy + 1/2 * HEXAGON_EDGE_LENGTH;
        var y4 = cy + HEXAGON_EDGE_LENGTH;

        const points = [
        `${x1},${y1}`,
        `${x2},${y2}`,
        `${x3},${y1}`,
        `${x3},${y3}`,
        `${x2},${y4}`,
        `${x1},${y3}`,
    ].join(' ');

        const svgStyle = {
            cursor: 'pointer',
        };

        const polygonStyle = {
            fill: '#A9A9A9',
            stroke: 'black',
            strokeWidth: 0.5,
        };

        return (   
            <polygon points={points} style={polygonStyle} onClick={onClick}/>
        );
    }
}