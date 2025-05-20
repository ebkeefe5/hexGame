import React from 'react';

export default class RestartButton extends React.Component
{
    render() {
        const { text } = this.props;

        return (   
             <p id = "playerTurn">{text}</p>
        );
    }
}