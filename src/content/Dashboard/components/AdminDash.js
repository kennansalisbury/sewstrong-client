import React, { useState } from 'react';

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

    return (
        <div className='dashboard__admin'>
            <div className='dashboard__admin__tabs'>
                {tabs}
            </div>
            <div className='dashboard__admin__content'>
            </div>
        </div>
    )
};