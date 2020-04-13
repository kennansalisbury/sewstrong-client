import React, {useState} from 'react'

export const InventoryUpdate = props => {

    const [showUpdateInventory, setShowUpdateInventory] = useState(false)
    const [showEditInventory, setShowEditInventory] = useState(false)
    const [inventory, setInventory] = useState(props.inventory)
    const [newInventory, setNewInventory] = useState(0)
    const [editedInventory, setEditedInventory] = useState(0)
    const [collectedInventory, setCollectedInventory] = useState(0)

    // console.log(props.makerId, props.productId)
    const handleUpdateSubmit = e => {
        e.preventDefault()

        let total_units = inventory + newInventory - collectedInventory
        let total_inventory_to_date = props.total_inventory_to_date + newInventory

        let data = {
            product: props.productId,
            maker: props.makerId,
            total_units,
            total_inventory_to_date
        }

        // console.log('update data', data)
        let token = localStorage.getItem('userToken')
        fetch(`${process.env.REACT_APP_SERVER_URL}/volunteers/inventory`, {
            method: 'PUT',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}` 
            }
        })
        .then(response => {
            response.json()
            .then(result => {
                if (response.ok) {
                    // console.log('updated inventory', result)
                    setInventory(total_units)
                    props.setUpdateMade('inventory updated, total inventory to date', total_inventory_to_date)
                    setNewInventory(0)
                    setCollectedInventory(0)
                } else {
                    props.setMessage(`${result.message}`);
                }
            })
        })
        .catch(err => {
            props.setMessage(`Error connecting to server, please try again later.`)
        })

        setShowEditInventory(false)
        setShowUpdateInventory(false)
    }

    const handleEditSubmit = e => {
        e.preventDefault()

        
        let diff = editedInventory - inventory
        // console.log('diff', diff, 'is equal to edited inventory', editedInventory, 'minus inventory', inventory)
        let total_inventory_to_date = props.total_inventory_to_date + diff
        // console.log('total inventory', total_inventory_to_date, 'is equal to total inventory', props.total_inventory_to_date, 'plus diff', diff)

        let data = {
            product: props.productId,
            maker: props.makerId,
            total_units: editedInventory,
            total_inventory_to_date
        }

        let token = localStorage.getItem('userToken')
        fetch(`${process.env.REACT_APP_SERVER_URL}/volunteers/inventory`, {
            method: 'PUT',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}` 
            }
        })
        .then(response => {
            response.json()
            .then(result => {
                if (response.ok) {
                    // console.log('edited inventory', result)
                    setInventory(editedInventory)
                } else {
                    props.setMessage(`${result.message}`);
                }
            })
        })
        .catch(err => {
            props.setMessage(`Error connecting to server, please try again later.`)
        })

        // console.log('edited data', data)
        setShowEditInventory(false)
        setShowUpdateInventory(false)
        props.setMessage('')
        props.setUpdateMade(`inventory edited to ${editedInventory}`)
    }
    

    let inventoryUpdate = <button className='small-text' onClick={() => setShowUpdateInventory(true)}>Update</button>
    if(showUpdateInventory) {
        inventoryUpdate = (
            <form className="dashboard__admin__item__column" onSubmit={handleUpdateSubmit}>
                <label className="small-text">New </label>
                <input type='number' step='10' min='0' value={newInventory} onChange={e => setNewInventory(parseInt(e.currentTarget.value)) } />
                <label className="small-text">Collected </label>
                <input type='number' step='10' min='0' value={collectedInventory} onChange={e => setCollectedInventory(parseInt(e.currentTarget.value)) } />
                <input type="submit" value="UPDATE"/>
            </form>
        )
    }

    let inventoryEdit = 
        <button className='small-text' onClick={() => {
            setShowEditInventory(true)
            props.setMessage('Please use this only if there was an error inputting your current inventory. If you are updating to account for new inventory created and/or inventory collected, please use the "update" function.')
        }}>Edit</button>
    if(showEditInventory) {
        inventoryEdit = (
            <form onSubmit={handleEditSubmit}>
                <input type='number' step='10' value={editedInventory} min='0' onChange={e => setEditedInventory(parseInt(e.currentTarget.value)) } />
                {/* <small className="small-text">Please use this only if there was an error inputting your current inventory. If you are updating to account for new inventory created and/or inventory collected, please use the "update" function.</small> */}
                <input type="submit" value="EDIT"/>
            </form>
        )
    }

    return (
        <>
            <div className='body-two'>{props.name}s</div>
            <div className='body-two'>{inventory}</div>
            <div className='body-two'>{inventoryUpdate}</div>
            <div className='body-two'>{inventoryEdit}</div>
        </>
    )
}