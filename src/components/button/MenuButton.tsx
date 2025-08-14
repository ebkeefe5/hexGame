import React from 'react';
import { JSX } from 'react/jsx-runtime';

interface MenuButtonProps {
  onClick: () => void;
  label: string;
  pushRight: boolean;
  selected: boolean;
}

export default class MenuButton extends React.Component<MenuButtonProps> {
  render(): JSX.Element {
    const { onClick, label, pushRight, selected } = this.props;

    let backgroundColor = '#A9A9A9';
    if (selected) {
      backgroundColor = 'gray';
    }

    let marginRightPercent = '0%';
    if (pushRight) {
      marginRightPercent = '5%';
    }

    return (
      <button
        type="submit"
        className="menuButton"
        onClick={onClick}
        style={{
          marginRight: marginRightPercent,
          backgroundColor: backgroundColor,
        }}
      >
        {label}
      </button>
    );
  }
}