import React from 'react';

export default class RestartButton extends React.Component
{
    render() {
        const { text } = this.props;

        return (   
             <h4 id = "playerTurn">{text}</h4>
        );
    }
}