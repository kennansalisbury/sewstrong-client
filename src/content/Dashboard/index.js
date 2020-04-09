import React, { useEffect, useState } from 'react';

import { AdminDash, Aside } from './components';

import './style.scss';

export const Dashboard = props => {

    const [data, setData] = useState([]);

    useEffect(() => {

    })

    if (!props.user) {
        return null;
    } else if (props.user.is_admin && !data.length) {
        let token = localStorage.getItem('userToken')
        fetch(`${process.env.REACT_APP_SERVER_URL}/admin`, {
            headers: {
                Authorization: `Bearer ${token}` 
            }
        })
        .then(response => {
            response.json()
            .then(result => {
                setData(result)
            })
        })
        .catch(err => {
            console.log(`We're all fucked`)
        })
    }

    let content;
    // no user; 
    if (!props.user) {
        content = (
            <div className='dashboard'>
                Loading
            </div>
        )
    } else if (props.user.is_admin && data.length) {
        content = (
            <div className='dashboard'>
                <Aside
                    volunteerInfo={data[0].volunteers}
                    customerInfo={data[1].customers}
                    orderInfo={data[2].orders}
                />
                <AdminDash 
                    volunteers={data[0].volunteers}
                    customers={data[1].customers}
                    orders={data[2].orders}
                />
            </div>
        )
    }

    return (
        <div className='page'>
            {content}
        </div>
    )
};