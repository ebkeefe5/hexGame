import React from 'react';

export default class SelectNumberButton extends React.Component
{
    render() {
        const { onClick, label, selected} = this.props;

        var backgroundColor = '#F0F0F0';
        if (selected)
          backgroundColor = 'green';
        
        return (   
            <button style={{ marginRight: '1%',  padding: '5px 12px', backgroundColor:backgroundColor }} type="submit" className="sideBarButton" onClick={onClick}>{label}</button>
        );
    }
}