import React, { useState } from 'react';
import { AdminDashCust } from './AdminDashCust';
import { AdminDashOrder } from './AdminDashOrder';
import { AdminDashInventory } from './AdminDashInventory';

export const AdminDash = props => {

    const [activeTab, setActiveTab] = useState(props.updateMade || 'Volunteers')
    const [adminTabsList, setAdminTabsList] = useState(['Volunteers', 'Inventory', 'Customers','Orders'])


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
        if (activeTab === 'Inventory') {
            if(props.volunteers.length) {

            let makersFiltered = props.volunteers.filter(vol => vol.maker)
            content = makersFiltered.map(vol => {
                let roles = []
                // let inventory = ''
                let makerId=''
                if (vol.maker) {
                    roles = [...roles, 'Maker']
                    // inventory = vol.maker.inventory
                    makerId = vol.maker._id
                }
                if (vol.driver) {
                    roles = [...roles, 'Driver']
                }
                if (vol.is_admin) {
                    roles = [...roles, 'Admin']
                }
                if (vol.other) {
                    roles = [...roles, vol.other]
                }
                return <AdminDashInventory
                    key={vol._id}
                    name={vol.first_name + ' ' + vol.last_name}
                    phone={vol.phone}
                    roles={roles}
                    setUpdateMade={props.setUpdateMade}
                    // inventory = {inventory}
                    makerId={makerId}
                />
            })
            }
            else {
                content = <div>No volunteers yet.</div>
            }
        } else if (activeTab === 'Customers') {
            console.log(props.customers)
            if(props.customers.length) {
                content = props.customers.map(cust => {
                    let activeOrders = cust.customer.orders.filter(order => order.accepted && !order.completed && !order.admin_cancelled && !order.cust_cancelled)
                    let pendingOrders = cust.customer.orders.filter(order => !order.accepted)
                    return <AdminDashCust
                        key={cust._id}
                        organization = {cust.customer.organization}
                        activeOrders = {activeOrders.length}
                        pendingOrders = {pendingOrders.length}
                        name={cust.first_name + ' ' + cust.last_name}
                        zipcode={cust.zipcode}
                        setUpdateMade={props.setUpdateMade}
                    />
                })
            }
            else {
                content = <div>No customers yet.</div>
            }
            
        } else if (activeTab === 'Orders') {
            if(props.orders.length) {
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
                    organization={ord.customer.customer.organization}
                    orderNo={ord._id}
                    status={status}
                    currentStatus={currentStatus}
                    total={total}
                    setUpdateMade={props.setUpdateMade}
                    className='dashboard__admin__item__order'
                />
            })
            }
            else {
                content = <div>No orders yet.</div>
            }
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