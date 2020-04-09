// dependencies
import React, { useState, useEffect } from 'react';
// components
import { ListItem, OrgNeed, MakeImpact } from './components';

export const Volunteer = props => {
    
    const [currentVolunteerType, setCurrentVolunteerType] = useState('')
    const [userInfo, setUserInfo] = useState(['CURRENT', 'HISTORY']);
    const [activeTab, setActiveTab] = useState(userInfo[0]);
    const [currentPledges, setCurrentPledges] = useState([])
    const [history, setHistory] = useState([])
    const [showModal, setShowModal] = useState(false)

    //on render, populate state needs based on usertype
    //1) user type
    useEffect(() => {
        let userType
        let info
        if(props.user) {
            if(props.user.maker && !props.user.driver) {
                userType='maker'
                info=['CURRENT', 'HISTORY']
            }
            else if(props.user.driver && !props.user.maker) {
                userType='driver'
                info=['CURRENT ORDERS', 'HISTORY']
            }
            else if(props.user.driver && props.user.maker) {
                userType='maker+driver'
                info=['CURRENT PLEDGES', 'CURRENT ORDERS', 'HISTORY']
            }

            setCurrentVolunteerType(userType)
            setUserInfo(info)
        }
    }, [props.user])

    //2) set history
    useEffect(() => {
        if(props.user && props.products.length && props.user.maker) {
         

            let production = props.user.maker.makerProduction.map((product, i) => {
                let productName = getProductName(product.product)
                
                return(
                    {
                    product: productName,
                    inventory: product.inventory,
                    createdAt: product.createdAt,
                    updatedAt: product.updatedAt,
                    selfDelivery: product.selfDelivery,
                    pickUpDelivery: product.pickUpDelivery
                    }
                )
            })

            let pastPledges = props.user.maker.makerPledge.filter((pledge, i) => pledge.readyForDelivery)

            setHistory([...production, ...pastPledges])
        }
    }, [props.user, props.products])

    //3) set currentpledges
    useEffect(() => {
        if(props.user && props.products.length && props.user.maker) {
            let pledges = props.user.maker.makerPledge.filter((pledge, i) => !pledge.readyForDelivery)
            console.log('🌷PLEDGES🌷', pledges)
            setCurrentPledges(pledges)
        }
    }, [props.user])

    const getProductName = (prodId) => {
        console.log(prodId)
        let product = props.products.filter(product => product._id === prodId)
        return product[0].name
    }

    const handleTabSelect = e => {
        setActiveTab(e.target.getAttribute('name'));
    }

    let tabs = userInfo.map((info, i) => {
        let className = 'dashboard__tab'
        if (info === activeTab) {
            className += ' dashboard__tab__active'
        }
        return (
            <p className={`body-two ${className}`} key={info} name={info} onClick={handleTabSelect}>
                {info}
            </p>
        )
    })

    let listItems
    if(props.user) {

        if(props.user.maker) {
            let teamLead = (props.user.maker ? props.user.maker.teamLead : (props.user.driver ? props.user.driver.teamLead : ''))
            if(activeTab === 'CURRENT') {
                listItems = <ListItem data={currentPledges} user={props.user} getProductName={getProductName} />
            }
            else if(activeTab === 'HISTORY') {
                listItems = <ListItem data={history} user={props.user} getProductName={getProductName} />
                
            }

            // else if(activeTab === 'Info') {
            //     listItems = <ListItem text={props.user.firstName + ' ' + props.user.lastName} data={props.user} user={props.user} getProductName={getProductName} />
            // }
            // else if(activeTab === 'Team Lead') {
            //     listItems = <ListItem text={teamLead ? teamLead.firstName + ' ' +  teamLead.lastName : 'You have not been assigned a team lead yet.'} data={teamLead || 'no data'} user={props.user} getProductName={getProductName}/>
            // }
            // else if(activeTab === 'Orders') {
            //     if(!props.user.orders) {
            //         listItems = <ListItem text='You have not been assigned to any orders yet' data={'no data'} user={props.user} getProductName={getProductName} />
            //     }
            //     listItems = props.user.orders.map((order, i) => {
            //         return <ListItem text={`Order: ${order.orderNumber}`} data={order} user={props.user} getProductName={getProductName}/>
            //     }) 
            // }
        }

    }

    return (
        <div className='dashboard'>
            
            <OrgNeed />

            <MakeImpact products={props.products} user={props.user} updateUser={props.updateUser} showModal={showModal} setShowModal={setShowModal} />

            <div className='dashboard__tabs_content'>
                <div className='dashboard__tabs'>
                    {tabs}
                </div>
                <div className='dashboard__content'>

                        {listItems}

                </div>
            </div>

        </div>
    )
};