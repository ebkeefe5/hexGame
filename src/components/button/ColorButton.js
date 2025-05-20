import React from 'react';

export default class ColorButton extends React.Component
{
    render() {
        const { onClick, label, selected, red} = this.props;

        var backgroundColor = '#F0F0F0';
        if (selected)
        {
            if (red)
                backgroundColor = '#E42217';
            else 
                backgroundColor = '#7690ac';
        }
             
        return (   
            <button style={{ marginRight: '1%',  padding: '5px 12px', backgroundColor:backgroundColor }} type="submit" className="sideBarButton" onClick={onClick}>{label}</button>
        );
    }
}