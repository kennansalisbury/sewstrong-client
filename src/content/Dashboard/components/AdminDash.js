import React, { useState } from 'react';
import { AdminDashItem } from './AdminDashItem';

export const AdminDash = props => {

    const [activeTab, setActiveTab] = useState('Volunteers')
    const [adminTabsList, setAdminTabsList] = useState(['Volunteers','Customers','Orders']);

    const handleTabToggle = e => {
        setActiveTab(e.target.getAttribute('name'));
    };

    let tabs = adminTabsList.map(tab => {
        let className='dashboard__admin__tab'
        if (tab === activeTab) {
            className += ' dashboard__admin__tab__active'
        }
        return (
            <p className={className} key={tab} name={tab} onClick={handleTabToggle}>
                {tab}
            </p>
        )
    });

    let content;
    if (props) {
        if (activeTab === 'Volunteers') {
            content = props.volunteers.map(vol => {
                let roles = ''
                if (vol.maker) {
                    roles += 'Maker'
                }
                if (vol.driver) {
                    roles += ' Driver'
                }
                return <AdminDashItem
                    key={vol._id}
                    name={vol.first_name + ' ' + vol.last_name}
                    zipcode={vol.zipcode}
                    roles={roles}
                />
            })
        } else if (activeTab === 'Customers') {
            content = props.customers.map(cust => {
                return <AdminDashItem 
                    key={cust._id}
                    name={cust.first_name + ' ' + cust.last_name}
                    zipcode={cust.zipcode}
                />
            })
        } else if (activeTab === 'Orders') {
            content = props.orders.map(ord => {
                return <AdminDashItem 
                    key={ord._id}
                    orderNo={ord._id}
                />
            })
        }
    }

    return (
        <div className='dashboard__admin'>
            <div className='dashboard__admin__tabs'>
                {tabs}
            </div>
            <div className='dashboard__admin__content'>
                {content}
            </div>
        </div>
    )
};