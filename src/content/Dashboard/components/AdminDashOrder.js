import React from 'react';

export const AdminDashOrder = props => {

    let style = {backgroundColor: props.status}

    return (
        <div className='dashboard__admin__item dashboard__admin__order'>
            <div className='body-three'>
                {props.orderNo}<br />
                {props.item}<br />
                {props.total}<br />
            </div>
            <div className='body-three'>
                <div className={`dashboard__admin__order__status`} style={style}></div>
            </div>
        </div>
    )
};