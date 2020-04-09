import React, {useState} from 'react'
import {PledgeModal} from '../modals/index'

export const MakeImpact = props => {
    
    const [modalProduct, setModalProduct] = useState({})


    const handleClick = (product) => {
        //set info for passing to modal based on what was clicked on
        setModalProduct(product)

        //show modal
        props.setShowModal(true)
    }

    let buttons = ''
    if(props.products) {
        buttons = props.products.map(product => {
        
            return (
                <div>
                    <div className="button-wide background-green body-two" onClick={() => handleClick(product)}>
                        Make {product.name}s
                    </div>
                </div>

            )
    
        } )
    }
    
    if(!props.user) {
        return null
    }
    
    return (
        <div className='dashboard__make-impact'>
            <PledgeModal updateUser={props.updateUser} showModal={props.showModal} setShowModal={props.setShowModal} product={modalProduct}/>
            <p className='heading-two'>Make an Impact</p>
            {buttons}
        </div>
    )
}