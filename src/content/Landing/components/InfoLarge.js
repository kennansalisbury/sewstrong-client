// dependencies
import React from 'react';

export const InfoLarge = props => (
    <div className={`info-large ${props.type}`}>
        <p className='heading-two'>
            {props.text}
        </p>
    </div>
)