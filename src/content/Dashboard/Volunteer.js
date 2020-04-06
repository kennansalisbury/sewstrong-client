// dependencies
import React, { useState, useEffect } from 'react';
// components
import { ListItem, OrgNeed, MakeImpact } from './components';

export const Volunteer = props => {
    
    const [currentVolunteerType, setCurrentVolunteerType] = useState('')
    const [userInfo, setUserInfo] = useState(['Inventory','Info','Team Lead','Orders']);
    const [activeTab, setActiveTab] = useState(userInfo[0]);
    const [inventory, setInventory] = useState([])
    const [showModal, setShowModal] = useState(false)

    //on render, populate state needs
    //1) user type
    useEffect(() => {
        let userType
        if(props.user) {
            if(props.user.maker) {
                userType='maker'
            }
            else if(props.user.driver) {
                userType='driver'
            }

            setCurrentVolunteerType(userType)
        }
    }, [props.user])

    //2) product inventory from user
    useEffect(() => {
        if(props.user && props.products.length) {
         
            let productInventory = props.user.maker.makerProduction.map((product, i) => {
                let productName = getProductName(product.product)
                
                return(
                    {
                    product: productName,
                    currentInventory: product.currentInventory,
                    producedToDate: product.producedToDate
                }
                )
            })
            setInventory(productInventory)
        }
    }, [props.user, props.products])

    const getProductName = (prodId) => {
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

        let teamLead = (props.user.maker ? props.user.maker.teamLead : (props.user.driver ? props.user.driver.teamLead : ''))
        if(activeTab === 'Inventory') {

            listItems = inventory.map((product, i) => {
                return <ListItem  text={product.product} data={product} user={props.user} getProductName={getProductName} />
            })
        }
        else if(activeTab === 'Info') {
            listItems = <ListItem text={props.user.firstName + ' ' + props.user.lastName} data={props.user} user={props.user} getProductName={getProductName} />
        }
        else if(activeTab === 'Team Lead') {
            listItems = <ListItem text={teamLead ? teamLead.firstName + ' ' +  teamLead.lastName : 'You have not been assigned a team lead yet.'} data={teamLead} user={props.user} getProductName={getProductName}/>
        }
        else if(activeTab === 'Orders') {
            if(!props.user.orders) {
                listItems = <ListItem text={'You have not been assigned to any orders yet'} data={null} user={props.user} getProductName={getProductName} />
            }
            listItems = props.user.orders.map((order, i) => {
                return <ListItem text={`Order: ${order.orderNumber}`} data={order} user={props.user} getProductName={getProductName}/>
            }) 
        }

    }

    return (
        <div className='dashboard'>
            
            <OrgNeed />

            <MakeImpact products={props.products} user={props.user} showModal={showModal} setShowModal={setShowModal} />

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