import React from 'react';

export const AsideItem = props => {
    return (
        <div className='body-two aside__item'>
            <p>{props.label}</p>
            <p>{props.content}</p>
        </div>
    )
};