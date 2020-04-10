import React, { useState } from 'react';

export const UserDash = props => {

    const [inventoryValue, setInventoryValue] = useState(0);

    const handleChange = e => {
        setInventoryValue(e.target.value);
    }

    let masks = 0;
    let faceShields = 0;
    let gowns = 0;
    if (props) {
        if (props.makerContent.inventory.length) {
            props.makerContent.inventory.map(inv => {
                inv.forEach(i => {
                    if (inv.product.name === 'Mask') {
                        masks += inv.total_units  
                    } 
                    if (inv.product.name === 'Face Shield') {
                        faceShields += inv.total_units
                    }
                    if (inv.product.name === 'Gown') {
                        gowns += inv.total_units
                    }
                })
            })
        }
    };

    return (
        <div className='dashboard__user'>
            <p className='heading-two'>Inventory</p>
            <div className='dashboard__user__inventories'>
                <div className='dashboard__user__item'>
                    <p className='body-three'>Masks</p>
                    <p className='body-three'>{masks}</p>
                </div>
                <div className='dashboard__user__item'>
                    <p className='body-three'>Face Shields</p>
                    <p className='body-three'>{faceShields}</p>
                </div>
                <div className='dashboard__user__item'>
                    <p className='body-three'>Gowns</p>
                    <p className='body-three'>{gowns}</p>
                </div>
            </div>
            <div className='dashboard__user__inventories__add'>
                <p className='body-two'>Need to add inventory? Enter the amount below and</p>
                <div className='dashboard__user__inventories__submit'>
                    <input type='number' 
                            className='body-two dashboard__user__inventories__input' 
                            value={inventoryValue} 
                            onChange={handleChange}
                    />
                    <p className='body-two call-to-action__small background-green'>Click here</p>
                </div>
            </div>
        </div>
    )
};