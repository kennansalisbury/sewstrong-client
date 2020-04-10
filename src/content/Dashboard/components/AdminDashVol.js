import React from 'react';

export const AdminDashVol = props => {
    
    return (
        <div className='dashboard__admin__item'>
            {props.name}<br />
            {props.zipcode}<br />
            {props.roles}
        </div>
    )
};