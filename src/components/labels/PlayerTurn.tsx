import React from 'react';
import { JSX } from 'react/jsx-runtime';

interface RestartButtonProps {
  text: string;
}

export default class RestartButton extends React.Component<RestartButtonProps> {
  render(): JSX.Element {
    const { text } = this.props;

    return <p id="playerTurn">{text}</p>;
  }
}
