import React, { JSX } from 'react';

interface ColorButtonProps {
  onClick: () => void;
  label: string;
  selected: boolean;
  red: boolean;
}

export default class ColorButton extends React.Component<ColorButtonProps> {
  render(): JSX.Element {
    const { onClick, label, selected, red } = this.props;

    let backgroundColor = '#D3D3D3';
    if (selected) {
      backgroundColor = red ? '#E42217' : '#7690ac';
    }

    return (
      <button
        style={{
          marginRight: '1%',
          padding: '5px 12px',
          backgroundColor: backgroundColor,
        }}
        type="submit"
        className="sideBarButton"
        onClick={onClick}
      >
        {label}
      </button>
    );
  }
}
