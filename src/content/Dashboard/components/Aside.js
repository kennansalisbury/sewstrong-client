import React, { useState } from 'react';
import { AsideItem } from './AsideItem';

export const Aside = props => {

    const [activeTab, setActiveTab] = useState('Current');
    const [asideTabs, setAsideTabs] = useState(['Current','All Time']);

    const handleTabToggle = e => {
        setActiveTab(e.target.getAttribute('name'));
    };

    let tabs = asideTabs.map(tab => {
        let className='aside__tab';
        if (tab === activeTab) {
            className += ' aside__tab__active'
        };
        return (
            <p className={`body-two ${className}`} key={tab} name={tab} onClick={handleTabToggle}>
                {tab}
            </p>
        )
    });
    
    return (
        <div className='aside'>
            <div className='aside__header'>
                <p className='body-two'>Snapshot</p>
                <div className='aside__header__tabs'>
                    {tabs}
                </div>
            </div>
            <div className='aside__content'>
                
            </div>
            <div className='aside__footer'></div>
        </div>
    )
}