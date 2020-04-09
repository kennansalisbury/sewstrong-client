// dependencies
import React from 'react';

export const AdminItem = props => {

    let fields;
    if (props.type === 'TeamLead' || props.type === 'Customer') {
        fields = ['Name','Region'];
    } else if (props.type === 'Order') {
        fields = ['OrderNo','Date']
    }

    return (
        <div className='admin__item'>
            <p className='body-two'>
                {fields[0]}: {props.text}
            </p>
            <p className='body-two'>
                {fields[1]}: {props.text}
            </p>
        </div>
    )
};