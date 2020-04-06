import React from 'react'

export const PledgeModal = props => {
    if(!props.showModal) {
        return null
    }
    
    return (
        <div className='dashboard-modal'>{props.product.name}</div>
    )
}