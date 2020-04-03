// dependencies
import React, { useState } from 'react';
// components
import { ListItem } from './components';

export const Volunteer = props => {
    
    const [userInfo, setUserInfo] = useState(['Inventory','Info','Team Lead','Orders']);
    const [activeTab, setActiveTab] = useState(userInfo[0]);

    const handleTabSelect = e => {
        setActiveTab(e.target.getAttribute('name'));
    }

    let tabs = userInfo.map((info, i) => {
        let className = 'dashboard__tab'
        if (info === activeTab) {
            className += ' dashboard__tab__active'
        }
        return (
            <p className={`body-two ${className}`} key={info} name={info} onClick={handleTabSelect}>
                {info}
            </p>
        )
    })
    return (
        <div className='dashboard'>
            <div className='dashboard__tabs'>
                {tabs}
            </div>
            <div className='dashboard__content'>
                {/* LIST ITEMS HERE */}
            </div>
        </div>
    )
};