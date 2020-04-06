import React, {useState} from 'react'

export const PledgeModal = props => {

    const [pledgeQty, setPledgeQty] = useState(0)
    const [pledgeGoal, setPledgeGoal] = useState('')
    const [currentInventory, setCurrentInventory] = useState(0)
    const [pledgeErrorMessage, setPledgeErrorMessage] = useState('')
    const [inventoryErrorMessage, setInventoryErrorMessage] = useState('')

    if(!props.showModal) {
        return null
    }

    const handlePledgeSubmit = e => {
        e.preventDefault()
        console.log('Pledge Qty:', pledgeQty, 'Pledge Goal:', pledgeGoal, typeof pledgeGoal)
        
        //first, verify that both fields have a value
        if(pledgeQty > 0 && !pledgeGoal) {
            setPledgeErrorMessage('All pledges must have a quantity and date associated. Please enter a pledge date')
            return
        }

        if(pledgeGoal && pledgeQty === 0) {
            setPledgeErrorMessage('All pledges must have a quantity and date associated. Please enter a pledge quantity')
            return
        }

        if(pledgeQty === 0 && !pledgeGoal) {
            setPledgeErrorMessage('All pledges must have a quantity and date associated.')
            return
        }

        //make pledge goal a date object

    
    }

    const handleCurrentInventorySubmit = e => {
        e.preventDefault()
        console.log('Current Inventory:', currentInventory)

        //first, verify a quantity has been set above 0
        if(currentInventory === 0 ) {
            setInventoryErrorMessage('Please include a quantity. If you have not made any masks yet, you do not need to indicate that anywhere. Try making a pledge instead!')
            return
        }
    }
    
    return (
        <div className='dashboard-modal'>
            <div className="close-x" onClick={() => props.setShowModal(false)}>X</div>
            <p className='body-two'>I'M PLEDGING...</p>
            <form onSubmit={handlePledgeSubmit}>
                <input type="number" min="0" step="10" value={pledgeQty} onChange={e => {setPledgeQty(e.currentTarget.value); setPledgeErrorMessage('')}} />
                <label className="body-three"> {props.product.name.toUpperCase()}S BY </label>
                <input type="date" value={pledgeGoal} onChange={e => {setPledgeGoal(e.currentTarget.value); setPledgeErrorMessage('')}}/>

                <input type="submit" value="NEXT"/>
                {pledgeErrorMessage}
            </form>

            <p className="body-two">OR</p>

            <p className="body-two">I'VE ALREADY MADE...</p>
            <form onSubmit={handleCurrentInventorySubmit}>
                <input type="number" min="0" step="10" value={currentInventory} onChange={e => {setCurrentInventory(e.currentTarget.value); setInventoryErrorMessage('')}} />
                <label className="body-three"> {props.product.name.toUpperCase()}S</label>

                <input type="submit" value="NEXT"/>
                {inventoryErrorMessage}

            </form>
          
            
            
        </div>
    )
}