import React, { JSX } from 'react';

interface RestartButtonProps {
  onClick: () => void;
}

export default class RestartButton extends React.Component<RestartButtonProps> {
  render(): JSX.Element {
    const { onClick } = this.props;

    return (
      <button
        style={{ padding: '10px 20px', borderRadius: '5px'}}
        type="submit"
        className="sideBarButton"
        onClick={onClick}
      >
        Restart Game
      </button>
    );
  }
}
