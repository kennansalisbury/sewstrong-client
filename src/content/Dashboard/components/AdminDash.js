import React, { useState } from 'react';
import { AdminDashCust } from './AdminDashCust';
import { AdminDashOrder } from './AdminDashOrder';
import { AdminDashVol } from './AdminDashVol';

export const AdminDash = props => {

    const [activeTab, setActiveTab] = useState(props.updateMade || 'Volunteers')
    const [adminTabsList, setAdminTabsList] = useState(['Volunteers','Customers','Orders'])


    const handleTabToggle = e => {
        setActiveTab(e.target.getAttribute('name'));
        props.setUpdateMade('false')
    };

    let tabs = adminTabsList.map(tab => {
        let className='dashboard__admin__tab'
        if (tab === activeTab) {
            className += ' dashboard__admin__tab__active'
        }
        return (
            <p className={`body-two ${className}`} key={tab} name={tab} onClick={handleTabToggle}>
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
                return <AdminDashVol
                    key={vol._id}
                    name={vol.first_name + ' ' + vol.last_name}
                    zipcode={vol.zipcode}
                    roles={roles}
                    setUpdateMade={props.setUpdateMade}
                />
            })
        } else if (activeTab === 'Customers') {
            content = props.customers.map(cust => {
                return <AdminDashCust
                    key={cust._id}
                    name={cust.first_name + ' ' + cust.last_name}
                    zipcode={cust.zipcode}
                    setUpdateMade={props.setUpdateMade}
                />
            })
        } else if (activeTab === 'Orders') {
            content = props.orders.map(ord => {
                let item = ord.item.product.name
                let total = ord.item.total
                let status;
                let currentStatus;
                if (!ord.accepted) {
                    status = 'red';
                    currentStatus = 'Pending Accept'         
                }
                if (ord.accepted) {
                    status = 'yellow';
                    currentStatus = 'Accepted'
                    
                }
                if (ord.in_progress) {
                    status = 'yellow';
                    currentStatus = 'In Progress'
                    
                }
                if (ord.ready_for_delivery) {
                    currentStatus = 'Ready for Delivery'
                    
                }
                if (ord.in_delivery) {
                    currentStatus = 'In Delivery'
                    
                }
                if (ord.completed) {
                    status = 'green'
                    currentStatus='Completed'
      
                }
                if (ord.cust_cancelled || ord.admin_cancelled) {
                    status = 'red'
                    currentStatus='Cancelled'
                }
                return <AdminDashOrder
                    item={item}
                    key={ord._id}
                    orderNo={ord._id}
                    status={status}
                    currentStatus={currentStatus}
                    total={total}
                    setUpdateMade={props.setUpdateMade}
                    className='dashboard__admin__item__order'
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