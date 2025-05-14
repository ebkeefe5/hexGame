import React from 'react';
import { useState } from 'react';
import HexButton from './button/HexButton';
import  border  from './border/borders.js';
import { BOARD_DIMENSION, BOARD_WIDTH, BOARD_HEIGHT } from '../constants/board.js';
import { COLORS, NOT_ALLOWED_COLOR } from '../constants/colors.js';

export default function TwoPlayerPage() {
    const CENTER_INDEX = Math.floor((BOARD_DIMENSION * BOARD_DIMENSION)/2);
    const [hexagons, setHexagons] = useState(() => {
        const initialHexagons = Array(BOARD_DIMENSION * BOARD_DIMENSION).fill(0);
        initialHexagons[CENTER_INDEX] = -1;
        return initialHexagons;
  });
    const [redIsNext, setRedIsNext] = useState(true);

    const handleHexagonClick = (i, j) => {
        if (hexagons[i * BOARD_DIMENSION + j] != 0)
            return
        
        const nextHexagons = hexagons.slice();
        if (redIsNext)
            nextHexagons[i * BOARD_DIMENSION + j] = 1;
        else 
            nextHexagons[i * BOARD_DIMENSION + j] = 2;
        if (nextHexagons[CENTER_INDEX] == -1)
            nextHexagons[CENTER_INDEX] = 0;
        
        setRedIsNext(!redIsNext);
        setHexagons(nextHexagons); 
    };

    const renderHexagons = () => {
        console.log(BOARD_WIDTH);
        const hexagonComponents = [];
        for (let i = 0; i < BOARD_DIMENSION; i++) {
            for (let j = 0; j < BOARD_DIMENSION; j++) {
                var fill = COLORS[0];
                if (hexagons[i * BOARD_DIMENSION + j] == 1)
                    fill = COLORS[1];
                else if (hexagons[i * BOARD_DIMENSION + j] == 2)
                    fill = COLORS[2];
                else if (hexagons[i * BOARD_DIMENSION + j] == -1)
                {
                    fill = NOT_ALLOWED_COLOR;
                }
                    
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
        <div style={{ display: 'block', margin: 'auto', width:'40%' }}>
            <svg viewBox='0 0 277 170'>
                {border({borderNumber:0}) }
                {border({borderNumber:1}) }
                {border({borderNumber:2}) }
                {border({borderNumber:3}) }
                {renderHexagons()}       
            </svg>
        </div>
    );
}