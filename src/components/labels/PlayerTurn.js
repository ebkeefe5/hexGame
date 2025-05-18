import React from 'react';

export default class RestartButton extends React.Component
{
    render() {
        const { text } = this.props;

        return (   
             <h3 id = "playerTurn">{text}</h3>
        );
    }
}