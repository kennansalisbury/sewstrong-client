// dependencies
import React, { useState, useEffect } from 'react';

export const ListItem = props => {
    
    const [toggle, setToggle] = useState(false)
    const [orderStatus, setOrderStatus] = useState('')

    useEffect(() => {
        if(props.data.orderNumber) {
            props.data.readyForDelivery ? setOrderStatus('Ready for Delivery') :
            props.data.collected ? setOrderStatus('Delivery in progress') :
            props.data.delivered ? setOrderStatus('Delivered') :
            props.data.orgReceived ? setOrderStatus('Complete') :
            props.data.cancelled ? setOrderStatus('Cancelled') :
            setOrderStatus('Awaiting inventory')
        }
    },[props.data.readyForDelivery, props.data.collected, props.data.delivered, props.data.orgReceived, props.data.cancelled])
    
    let accordianClassName = 'list__item__closed'
    const toggleData = e => { 
        accordianClassName === 'list__item__closed' ? setToggle(true) : setToggle(false)
    }

    let content
    if(props.data.product) {
        content = <p>Current Inventory: {props.data.currentInventory}</p>
    }
    if(props.data.orderNumber) {
        content = (
            <p>{orderStatus}</p>
        )
    }

    let hiddenContent
    if(toggle){
        accordianClassName = 'list__item__open'
        if(props.data.maker) {
            let phone = `(${props.data.phone[0] + props.data.phone[1] + props.data.phone[2]}) ${props.data.phone[3] + props.data.phone[4] + props.data.phone[5]} - ${props.data.phone[6] + props.data.phone[7] + props.data.phone[8] + props.data.phone[9]} `
            hiddenContent= (
                <div>
                    <p>Email: {props.data.email}</p>
                    <p>Display Name: {props.data.username}</p>
                    <p>Phone: {phone}</p>
                    <p>Address:</p>
                    <p>{props.data.maker.address}</p>
                    <p>{props.data.maker.city}, {props.data.maker.state} {props.data.maker.zipcode}</p>
                    <div className='auth-link background-orange body-two`'>Update Info</div>
                </div>
            )
        }
        if(props.data.product) {
            hiddenContent = (
                <div>
                    <p>Produced to Date: {props.data.producedToDate}</p>
                    <div className='auth-link background-orange body-two`'>Ready for delivery?</div>
                    <div className='auth-link background-orange body-two`'>Update Inventory</div>
                </div>
            )
        }
      
        if(props.data.teamLead) {
            let phone = `(${props.data.phone[0] + props.data.phone[1] + props.data.phone[2]}) ${props.data.phone[3] + props.data.phone[4] + props.data.phone[5]} - ${props.data.phone[6] + props.data.phone[7] + props.data.phone[8] + props.data.phone[9]} `

            hiddenContent = (
                <div>
                    <p>Email: <a href={`mailto:${props.data.email}`}>{props.data.email}</a></p>
                    <p>Phone: {phone}</p>
                </div>
            )
        }

        if(props.data.orderNumber){
            if(props.user.maker) {
                let currentMakerProductionDetails = props.data.productionDetails.filter((item, i) => item.maker === props.user._id)
                content = ''
                hiddenContent = (
                    <div className="order">
                        <h4 className="order-header-1">Order #</h4>
                        <p className="order-row2-col1">{props.data.orderNumber}</p>
                        <h4 className="order-header-2"># Needed</h4>
                        <p className="order-row2-col2">{currentMakerProductionDetails[0].toBeFulfilledQty}</p>
                        <h4 className="order-header-3">Status</h4>
                        <p className="order-row2-col3">{orderStatus}</p>
                        <h4 className="order-header-4">Product</h4>
                        <p className="order-row2-col4">{props.getProductName(props.data.productOrderDetails.product)}</p>
                        <h4 className="order-header-5">Ready for Delivery?</h4>
                        <div className='order-row2-col5 auth-link background-orange body-two`'>Ready to Go!</div>
                        
                    </div>
                )
            }
           
        }
       
    }
   
    console.log(props.data)
    return (
        <div>
            
            <div className={accordianClassName} onClick={toggleData}>
            <p>{props.text}</p>
            {content}
            {hiddenContent}
            {/* <p className="hide-content">Test Content</p> */}
            </div>
            
            
        </div>
    )
};