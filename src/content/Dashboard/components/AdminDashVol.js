import React from 'react';

export const AdminDashVol = props => {
    let inventory = ''
    if(props.inventory) {
        inventory = props.inventory.map((product, i) => {
            return (
                <div className='dashboard__admin__item__column'>
                    <div className='body-two'>{product.product.name}s</div>
                    <div className='body-two'>{product.total_units}</div>
                </div>
            )
        })
    }

    return (
        <div className='dashboard__admin__item body-two'>
            {props.name}<br />
            {props.zipcode}<br />
            {props.roles}
            {inventory}
        </div>
    )
};