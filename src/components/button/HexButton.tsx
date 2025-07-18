// src/components/HexButton.tsx
import React, { JSX } from 'react';

interface HexButtonProps {
  row: number;
  col: number;
  fill: string;
  board_dimension: number;
  onClick: () => void;
}

export default class HexButton extends React.Component<HexButtonProps> {
  render(): JSX.Element {
    const { row, col, fill, board_dimension, onClick } = this.props;

    const HEXAGON_EDGE_LENGTH = 350 / (board_dimension + 1);
    const TOP_LEFT_HEXAGON_CENTER_X = 357 - (board_dimension - 2) * HEXAGON_EDGE_LENGTH;
    const TOP_LEFT_HEXAGON_CENTER_Y = HEXAGON_EDGE_LENGTH * 1.5 + 25;

    const cx =
      TOP_LEFT_HEXAGON_CENTER_X +
      col * Math.sqrt(3) * HEXAGON_EDGE_LENGTH +
      (Math.sqrt(3) * HEXAGON_EDGE_LENGTH * row) / 2;
    const cy = TOP_LEFT_HEXAGON_CENTER_Y + (row * 3 * HEXAGON_EDGE_LENGTH) / 2;

    const x1 = cx - (Math.sqrt(3) * HEXAGON_EDGE_LENGTH) / 2;
    const x2 = cx;
    const x3 = cx + (Math.sqrt(3) * HEXAGON_EDGE_LENGTH) / 2;

    const y1 = cy - HEXAGON_EDGE_LENGTH / 2;
    const y2 = cy - HEXAGON_EDGE_LENGTH;
    const y3 = cy + HEXAGON_EDGE_LENGTH / 2;
    const y4 = cy + HEXAGON_EDGE_LENGTH;

    const points = [
      `${x1},${y1}`,
      `${x2},${y2}`,
      `${x3},${y1}`,
      `${x3},${y3}`,
      `${x2},${y4}`,
      `${x1},${y3}`,
    ].join(' ');

    const polygonStyle: React.CSSProperties = {
      fill: fill,
      stroke: 'black',
      strokeWidth: 0.5,
      cursor: 'pointer',
    };

    return <polygon points={points} style={polygonStyle} onClick={onClick} />;
  }
}
