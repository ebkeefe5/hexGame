import React from 'react';

export default class RestartButton extends React.Component
{
    render() {
        const { onClick} = this.props;

        return (   
            <button style={{ padding: '10px 22px'}} type="submit" className="sideBarButton" onClick={onClick}>Restart Game</button>
        );
    }
}