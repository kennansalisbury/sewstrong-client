import React from 'react';

export const AdminDashItem = props => {

    let style = {backgroundColor: props.status}
    console.log(props.status)

    const handleStatusChange = e => {
        console.log()
    }

    return (
        <div className={`body-two dashboard__admin__item ${props.className}`} key={props.key}>
            <div className='body-three'>
                {props.orderNo}<br />
                {props.item}<br />
                {props.total}<br />
            </div>
            <div className='body-three'>
                <div className='dashboard__admin__item__status' style={style}></div>
            </div>
        </div>
    )
};