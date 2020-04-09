// dependencies
import React, { useState, useEffect } from 'react';
import {StaticListItem} from './index'

export const ListItem = props => {
    
    const [toggle, setToggle] = useState(false)



    console.log('🌷🌷🌷 List Item Data', props.data)
    
    let accordianClassName = 'list__item__closed'
    const toggleData = e => { 
        accordianClassName === 'list__item__closed' ? setToggle(true) : setToggle(false)
    }

    if(!props.data) {
        return null
    }


    let content
    if(props.data) {
        content = (
            props.data.map((item, i) => {
                return(
                    <StaticListItem 
                        key={i} 
                        units={item.inventory || item.pledgeQty} 
                        pledgeGoal={item.pledgeGoal || ''} 
                        complete={(item.readyForDelivery || item.selfDelivery || item.pickUpDelivery) ? item.updatedAt : false}
                        type={item.product}
                        pledgeMade={item.createdAt}
                    />
                )
            })
        )
    }


    if(toggle){
        accordianClassName = 'list__item__open'
        }

        // listItems = currentPledges.map((pledge, i) => {
        //     return <ListItem key={i}  text={pledge.product} data={pledge} user={props.user} getProductName={getProductName} />
        // })
       
        // listItems = history.map((pledge, i) => {
        //     return <ListItem key={i}  text={pledge.product} data={pledge} user={props.user} getProductName={getProductName} />
        // })
    
    console.log('PROOOOOPS', props)

    return (
            
            <div className={accordianClassName} onClick={toggleData}>
                <div className="production">
                        <div className="production__list-items">
                            <h4 className="body-three"># Units</h4>
                            <h4 className="body-three">Type</h4>
                            <h4 className="body-three">Pledge Made</h4>
                            <h4 className="body-three">Pledge Goal</h4>
                            <h4 className="body-three">Complete</h4>
                        </div>
                        {content}
                    </div>
                    {/* <h4 className="order-header-6">Delivery</h4> */}
                    {/* <div className='order-row2-col5 auth-link background-orange body-two`'>Ready to Go!</div>      */}
                </div>
  
    )
};