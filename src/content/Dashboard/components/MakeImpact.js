import React, {useState} from 'react'
import {PledgeModal} from '../modals/index'

export const MakeImpact = props => {
    
    const [modalProduct, setModalProduct] = useState({})
    const [modalProduction, setModalProduction] = useState({})

    const handleClick = (product, production) => {
        //set info for passing to modal based on what was clicked on
        setModalProduct(product)
        setModalProduction(production)

        //show modal
        props.setShowModal(true)
    }

    let buttons = ''
    if(props.products) {
        buttons = props.products.map(product => {
            let production = props.user.maker.makerProduction.filter(prod => prod.product === product._id )[0]

            return (
                <div>
                    <div className="button-wide background-green body-two" onClick={() => handleClick(product, production)}>
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
            <PledgeModal showModal={props.showModal} setShowModal={props.setShowModal} product={modalProduct} userId={props.user._id} production={modalProduction} />
            <p className='heading-two'>Make an Impact</p>
            {buttons}
        </div>
    )
}