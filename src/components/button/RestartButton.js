import React from 'react';

export default class RestartButton extends React.Component
{
    render() {
        const { onClick} = this.props;

        return (   
            <button type="submit" class="button"id="restartGame" onClick={onClick}>Restart Game</button>
        );
    }
}