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
            <p className={`body-three ${className}`} key={tab} name={tab} onClick={handleTabToggle}>
                {tab}
            </p>
        )
    });
    
    let currentCustomers = 0;
    let currentDrivers = 0;
    let currentFaceShields = 0;
    let currentGowns = 0;
    let currentMakers = 0;
    let currentMasks = 0;
    let currentOrders = 0;

    let content;
    if (props) {
        if (props.type === 'Admin') {
            props.volunteers.forEach(vol => {
                if (vol.maker) {
                    currentMakers++
                    vol.maker.inventory.forEach(item => {
                        if (item.product.name === 'Mask') {
                            currentMasks += item.total_units
                        }
                        if (item.product.name === 'Face Shield') {
                            currentFaceShields += item.total_units
                        }
                        if (item.product.name === 'Gown') {
                            currentGowns += item.total_units
                        }
                    })
                }
                if (vol.driver) {
                    currentDrivers++
                }
            });
            props.customers.forEach(cust => {
                currentCustomers++
            });
            props.orders.forEach(ord => {
                currentOrders++
            })
            content = (
                <div className='aside__content'>
                    <AsideItem label='Masks' content={currentMasks} />
                    <AsideItem label='Face Shields' content={currentFaceShields} />
                    <AsideItem label='Gowns' content={currentGowns} />
                    <AsideItem label='Makers' content={currentMakers} />
                    <AsideItem label='Drivers' content={currentDrivers} />
                    <AsideItem label='Customers' content={currentCustomers} />
                    <AsideItem label='Orders' content={currentOrders} />
                </div>
            )
        } 
        else {
            content = (
                <div className='aside__content'>
                    <AsideItem label='Masks' content='0' />
                    <AsideItem label='Face Shields' content='0' />
                    <AsideItem label='Gowns' content='0' />
                </div>
            )
        }
    };


    return (
        <div className='aside'>
            <div className='aside__header'>
                <p className='body-two'>Snapshot</p>
                <div className='aside__header__tabs'>
                    {tabs}
                </div>
            </div>
            {content}
            <div className='aside__footer'></div>
        </div>
    )
}