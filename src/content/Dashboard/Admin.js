// dependencies
import React, { useState } from 'react';
// components
import { Listitem } from './components';

export const Admin = props => {

    const [info, setInfo] = useState(['Volunteers','Customers','Orders'])
    const [activeTab, setActiveTab] = useState(info[0]);

    const handleTabSelect = e => {
        setActiveTab(e.target.getAttribute('name'))
    }

    let tabs = info.map((info, i) => {
        let className = 'dashboard__tab'
        if (info === activeTab) {
            className += ' dashboard__tab__active'
        }
        return (
            <p className={`body-two ${className}`} key={info} name={info} onClick={handleTabSelect}>
                {info}
            </p>
        )
    });

    return (
        <div className='admin'>
            <div className='admin__tabs'>
                {tabs}
            </div>
            <div className='admin__dashboard'>
                <div className='admin__dashboard__aside'>

                </div>
                <div className='admin__dashboard__display'>

                </div>
                <div className='admin__dashboard__display'>

                </div>
            </div>
        </div>
    )
};