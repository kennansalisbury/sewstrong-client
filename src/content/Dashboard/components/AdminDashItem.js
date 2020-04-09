import React from 'react';

export const AdminDashItem = props => {

    return (
        <div className='body-two dashboard__admin__item' key={props.key}>
            {props.name}<br/>
            {props.zipcode}<br />
            {props.roles}
        </div>
    )
};