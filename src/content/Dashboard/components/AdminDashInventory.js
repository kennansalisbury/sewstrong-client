import React, {useState, useEffect} from 'react';
import {InventoryUpdate} from './index'

export const AdminDashInventory = props => {

    const [message, setMessage] = useState('')
    const [inventory, setInventory] = useState([])

    useEffect(() => {
        fetchData()
    }, [])

    const fetchData = () => {
        let token = localStorage.getItem('userToken')
        fetch(`${process.env.REACT_APP_SERVER_URL}/volunteers/inventory/${props.makerId}`, {
            headers: {
                Authorization: `Bearer ${token}` 
            }
        })
        .then(response => {
            response.json()
            .then(result => {
                setInventory(result)
            })
        })
        .catch(err => {
            console.log(`Error fetching data: ${err}`)
        })
    }

    let showInventory = ''
    if(inventory) {
        showInventory = inventory.map((product, i) => {
            return (
                <div key={i} className='dashboard__admin__item__column'>
                    <InventoryUpdate
                        productId={product.product._id}
                        name={product.product.name}
                        inventory={product.total_units}
                        total_inventory_to_date={product.total_inventory_to_date}
                        setUpdateMade={props.setUpdateMade}
                        makerId={props.makerId}
                        setMessage={setMessage}
                        setInventory={setInventory}
                    />
                </div>
            )
        })
    }

    let roles = ''
    if(props) {
        roles = props.roles.map((role, i) => {
            return (
                <p key={i}>{role}</p>
            )
        })

    }

    

    return (
        <>
        <div className='dashboard__admin__item body-two'>
            <div className='dashboard__admin__item__column'>
                <h4>{props.name}</h4>
                {/* <br /> */}
                {/* {props.phone}<br /> */}
                {props.roles[0]}<br />
                {props.roles[1] ? props.roles[1] : ''}
            </div>
            {/* <div className='dashboard__admin__item__column'></div> */}
            {showInventory}
        </div>
        <small>{message}</small>
        </>
    )
};

