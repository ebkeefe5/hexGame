import React from 'react';
import HexButton from './HexButton';

export default function TwoPlayerPage() { 

    const handleHexagonClick = () => {
        console.log("Hexagon clicked on the TwoPlayerPage!");
        // Add your click handling logic here
    };

    return (
    <div className = "leftIndent">
        <svg viewBox="0 0 200 200">
            <HexButton 
                row = {0}
                col = {0}
                onClick={() => this.handleHexagonClick()}
            />           
        </svg>
    </div>
    );
}