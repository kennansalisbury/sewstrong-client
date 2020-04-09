import React from 'react';

export const AsideItem = props => {
    return (
        <div className='aside__item'>
            <p>{props.label}</p>
            <p>{props.content}</p>
        </div>
    )
};