import React from 'react';

export const AdminDashItem = props => {

    return (
        <div className='dashboard__admin__item' key={props.key}>
            {props.name}<br/>
            {props.zipcode}<br />
            {props.roles}
        </div>
    )
};