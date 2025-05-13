import React from 'react';
import { useState } from 'react';
import HexButton from './HexButton';
import { BOARD_DIMENSION } from '../constants.js';
import { COLORS } from '../constants.js';

export default function TwoPlayerPage() {
    const [hexagons, setHexagons] = useState(Array(BOARD_DIMENSION*BOARD_DIMENSION).fill(0)); 
    const [redIsNext, setRedIsNext] = useState(true);

    const handleHexagonClick = (i, j) => {
        if (hexagons[i * BOARD_DIMENSION + j] != 0)
            return;
        
        const nextHexagons = hexagons.slice();
        if (redIsNext)
            nextHexagons[i * BOARD_DIMENSION + j] = 1;
        else 
            nextHexagons[i * BOARD_DIMENSION + j] = 2;
        setRedIsNext(!redIsNext);
        setHexagons(nextHexagons); 
    };

    const renderHexagons = () => {
        const hexagonComponents = [];
        for (let i = 0; i < BOARD_DIMENSION; i++) {
            for (let j = 0; j < BOARD_DIMENSION; j++) {
                var fill = COLORS[0];
                if (hexagons[i * BOARD_DIMENSION + j] == 1)
                    fill = COLORS[1];
                else if (hexagons[i * BOARD_DIMENSION + j] == 2)
                    fill = COLORS[2];
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
        <div className = "leftIndent">
            <svg viewBox="0 0 200 200">
                 {renderHexagons()}       
            </svg>
        </div>
    );
}