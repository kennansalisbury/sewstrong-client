import React from 'react';

export const AdminDashCust = props => {
    return (
        <div className='dashboard__admin__item'>
            <div className='body-two'>
                {props.name}<br />
                {props.organization}
            </div>
            <div className='dashboard__admin__item__column'>
                <div className='body-two'>Active Orders</div> 
                <div className='body-two'>{props.activeOrders}</div>
            </div>
            <div className='dashboard__admin__item__column'>
                <div className='body-two'>Pending Orders</div> 
                <div className='body-two'>{props.pendingOrders}</div>
            </div>
        </div>
    )
}