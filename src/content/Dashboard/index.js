// dependencies
import React from 'react';
import { Redirect } from 'react-router-dom';
// pages
import { Admin } from './Admin';
import { Volunteer } from './Volunteer';
// partials
import { Header } from '../Partials';
// styles
import './style.scss';

export const Dashboard = props => {

    // if (!props.user) {
    //     return <Redirect to='/' />
    // }

    if(props.user.customer) {
        return (
        <>
            <Header user={props.user} updateUser={props.updateUser}/>
            <h1>Customer Dashboard Stub</h1>
        </>
        )
    
    }

    if(props.user.driver) {
        return (
        <>
            <Header user={props.user} updateUser={props.updateUser}/>
            <h1>Driver Dashboard Stub</h1>
        </>
        )
        
    }

    if(props.user.other) {
        return (
            <>
                <Header user={props.user} updateUser={props.updateUser}/>
                <h1>Other Stub</h1>
            </>
            )
    }

    return (
        <>
            <Header user={props.user} updateUser={props.updateUser}/>
        
            {/* <Volunteer user={props.user} updateUser={props.updateUser} products={props.products} /> */}

            <Admin />
        </>
    )
}
