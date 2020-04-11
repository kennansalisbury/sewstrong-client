import React, {useState} from 'react';
import {InventoryUpdate} from './index'

export const AdminDashVol = props => {

    const [message, setMessage] = useState('')

    let inventory = ''
    if(props.makerId && props.inventory) {
        inventory = props.inventory.map((product, i) => {
            return (
                <div className='dashboard__admin__item__column'>
                    <InventoryUpdate
                        productId={product.product._id}
                        name={product.product.name}
                        inventory={product.total_units}
                        total_inventory_to_date={product.total_inventory_to_date}
                        setUpdateMade={props.setUpdateMade}
                        makerId={props.makerId}
                        setMessage={setMessage}
                    />
                </div>
            )
        })
    }
    // console.log('for maker:', props.makerId && !props.inventory.length && props.products)
    // console.log(props)
    // if(props.makerId && !props.inventory.length && props.products) {
    //     inventory = props.products.map((product, i) => {
    //         return(
    //             <div className='dashboard__admin__item__column'>
    //                     <InventoryUpdate
    //                         productId={product._id}
    //                         name={product.name}
    //                         inventory={0}
    //                         total_inventory_to_date={0}
    //                         setUpdateMade={props.setUpdateMade}
    //                         makerId={props.makerId}
    //                         setMessage={setMessage}
    //                     />
    //             </div>
    //         )
    //     })   
    // }

    return (
        <>
        <div className='dashboard__admin__item body-two'>
            {props.name}<br />
            {props.zipcode}<br />
            {props.roles}
            {inventory}
        </div>
        <small>{message}</small>
        </>
    )
};