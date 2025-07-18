import React from 'react';
import { JSX } from 'react/jsx-runtime';

interface SelectNumberButtonProps {
  onClick: () => void;
  label: string;
  selected: boolean;
}

export default class SelectNumberButton extends React.Component<SelectNumberButtonProps> {
  render(): JSX.Element {
    const { onClick, label, selected } = this.props;

    let backgroundColor = '#F0F0F0';
    if (selected) {
      backgroundColor = 'green';
    }

    return (
      <button
        type="submit"
        className="sideBarButton"
        onClick={onClick}
        style={{
          marginRight: '1%',
          padding: '5px 12px',
          backgroundColor: backgroundColor,
        }}
      >
        {label}
      </button>
    );
  }
}