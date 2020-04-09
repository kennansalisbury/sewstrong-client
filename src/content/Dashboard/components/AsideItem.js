import React from 'react';

export const AsideItem = props => {
    return (
        <div className='body-three aside__item'>
            <p className='aside__item__content'>{props.label}</p>
            <p className='aside__item__content'>{props.content}</p>
        </div>
    )
};