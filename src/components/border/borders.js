import React from 'react';
import { COLORS } from '../../constants/colors.js';

export default function border({ borderNumber, boardDimension })
{
    const HEXAGON_EDGE_LENGTH = 350/(boardDimension + 1);
    const TOP_LEFT_HEXAGON_CENTER_X = 357 - (boardDimension - 2) * HEXAGON_EDGE_LENGTH;
    const TOP_LEFT_HEXAGON_CENTER_Y = HEXAGON_EDGE_LENGTH * 1.5 + 25;

    const x1 = TOP_LEFT_HEXAGON_CENTER_X - Math.sqrt(3)*HEXAGON_EDGE_LENGTH/2;
    const x2 = TOP_LEFT_HEXAGON_CENTER_X - Math.sqrt(3)*HEXAGON_EDGE_LENGTH;
    const x3 = TOP_LEFT_HEXAGON_CENTER_X + Math.sqrt(3)* (boardDimension - 0.83) * HEXAGON_EDGE_LENGTH;
    const x4 = TOP_LEFT_HEXAGON_CENTER_X + Math.sqrt(3)* (boardDimension - 0.25) * HEXAGON_EDGE_LENGTH;

    const y1 = TOP_LEFT_HEXAGON_CENTER_Y - 1/2 * HEXAGON_EDGE_LENGTH;
    const y2 = TOP_LEFT_HEXAGON_CENTER_Y - HEXAGON_EDGE_LENGTH;
    const y3 = TOP_LEFT_HEXAGON_CENTER_Y - 3/2 * HEXAGON_EDGE_LENGTH;

    const x5 = TOP_LEFT_HEXAGON_CENTER_X + boardDimension * Math.sqrt(3) * HEXAGON_EDGE_LENGTH + Math.sqrt(3)*HEXAGON_EDGE_LENGTH/2 * (boardDimension - 2);
    const x6 = TOP_LEFT_HEXAGON_CENTER_X + boardDimension * Math.sqrt(3) * HEXAGON_EDGE_LENGTH + Math.sqrt(3)*HEXAGON_EDGE_LENGTH/2* (boardDimension - 1);
    const x7 = TOP_LEFT_HEXAGON_CENTER_X + boardDimension * Math.sqrt(3) * HEXAGON_EDGE_LENGTH + Math.sqrt(3)*HEXAGON_EDGE_LENGTH/2* (boardDimension);

    const y4 = TOP_LEFT_HEXAGON_CENTER_Y + (boardDimension * 3/2 - 1) * HEXAGON_EDGE_LENGTH;
    const y5 = TOP_LEFT_HEXAGON_CENTER_Y + (boardDimension * 3/2 - 0.5) * HEXAGON_EDGE_LENGTH;

    const x8 = TOP_LEFT_HEXAGON_CENTER_X + Math.sqrt(3)*HEXAGON_EDGE_LENGTH/2*boardDimension - 0.5 * Math.sqrt(3) * HEXAGON_EDGE_LENGTH;
    const x9 = TOP_LEFT_HEXAGON_CENTER_X + Math.sqrt(3)*HEXAGON_EDGE_LENGTH/2*boardDimension - 1.13 * Math.sqrt(3) * HEXAGON_EDGE_LENGTH;

    const y6 = TOP_LEFT_HEXAGON_CENTER_Y + (boardDimension * 3/2) * HEXAGON_EDGE_LENGTH;

    const x10 = TOP_LEFT_HEXAGON_CENTER_X - Math.sqrt(3)*HEXAGON_EDGE_LENGTH * 1.5
    const y7 = TOP_LEFT_HEXAGON_CENTER_Y - 0.5 * HEXAGON_EDGE_LENGTH;


    if (borderNumber == 0){
        const points = `${x1},${y1} ${x2},${y2} ${x1},${y3} ${x4},${y3} ${x3},${y1}`;
            return (
                <polygon 
                    points={points}
                    fill={COLORS[1]}
                />
            );
    }

    if (borderNumber == 1){
        const points = `${x3},${y1} ${x4},${y3} ${x7},${y4} ${x6},${y5} ${x5},${y4}`;
            return (
                <polygon 
                    points={points}
                    fill={COLORS[2]}
                />
            );
    }

    if (borderNumber == 2){
        const points = `${x5},${y4} ${x6},${y5} ${x5},${y6} ${x9},${y6} ${x8},${y4}`;
            return (
                <polygon 
                    points={points}
                    fill={COLORS[1]}
                />
            );
    }

    if (borderNumber == 3){
        const points = `${x1},${y1} ${x2},${y2} ${x10},${y7} ${x9},${y6} ${x8},${y4}`;
            return (
                <polygon 
                    points={points}
                    fill={COLORS[2]}
                />
            );
    } 
}