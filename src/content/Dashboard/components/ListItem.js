// dependencies
import React, { useState } from 'react';

export const ListItem = props => {

    const toggleData = e => {
        let content;
        if (e.target.className === 'list__item__closed') {
            e.target.className = 'list__item__open'
        } else {
            e.target.className = 'list__item__closed'
        }
    }

    return (
        <div className='list__item__closed' onClick={toggleData}>
            
        </div>
    )
};