import React, { useEffect, useState } from 'react';
import { Redirect } from 'react-router-dom';
import { Header } from '../Partials';

import { AdminDash, Aside } from './components';

import './style.scss';
import { UserDash } from './components/UserDash';

export const Dashboard = props => {

    const [data, setData] = useState([]);
    const [updateMade, setUpdateMade] = useState('')
    
    useEffect(() => {
        if(props.user && props.user.is_admin) {
            fetchAdminData()
        }
        
    }, [updateMade])


    const fetchAdminData = () => {
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
            console.log(`Error fetching data`)
        })
    }

    if (!props.user) {
        return <Redirect to='/' />

    } else if (props.user.is_admin && !data.length) {

    }

    let content;
    // no user; 
    if (!props.user || !data.length) {
        content = (
            <div className='dashboard'>
                Loading
            </div>
        )
    } else if (props.user.is_admin && data.length && props.products) {
        content = (
            <div className='dashboard'>
                <Aside
                    volunteers={data[0].volunteers}
                    customers={data[1].customers}
                    orders={data[2].orders}
                    type='Admin'
                />
                <AdminDash 
                    volunteers={data[0].volunteers}
                    customers={data[1].customers}
                    orders={data[2].orders}
                    setUpdateMade={setUpdateMade}
                    products={props.products}
                />
            </div>
        )
    } else if (props.user.customer) {
        
    } else {
        let driverContent;
        let makerContent;
        if (props.user.maker) {
            makerContent=props.user.maker
        }
        if (props.user.driver) {
            driverContent=props.user.driver
        }
        content = (
            <div className='dashboard'>
                <Aside 
                    user={props.user}
                    driverContent={driverContent}
                    makerContent={makerContent}
                />
                <UserDash
                    driverContent={driverContent}
                    makerContent={makerContent}
                />
            </div>
        )
    }

    return (
        <div className='page'>
            <Header 
                user={props.user}
                updateUser={props.updateUser}
            />
            {content}
        </div>
    )
};