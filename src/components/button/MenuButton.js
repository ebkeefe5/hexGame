import React from 'react';

export default class MenuButton extends React.Component
{
    render() {
        const { onClick, label, pushRight, selected} = this.props;

        var backgroundColor = '#A9A9A9';
        if (selected)
          backgroundColor = 'green';
        
        var marginRightPercent = '0%';
        if (pushRight)
            marginRightPercent = '6%'       
        
        return (   
            <button type="submit" class = "menuButton" onClick={onClick} style={{ marginRight: marginRightPercent, 
                backgroundColor:backgroundColor }}>{label} </button>
        );
    }
}