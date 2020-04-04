// dependencies
import React from 'react';
import { Redirect } from 'react-router-dom';
// pages
import { Volunteer } from './Volunteer';
// partials
import { Header } from '../Partials';
// styles
import './style.scss';

export const Dashboard = props => {
    
    // if (!props.user) {
    //     return <Redirect to='/' />
    // }

    return (
        <>
            <Header user={props.user} updateUser={props.updateUser}/>
                
            />
            <Volunteer user={props.user} products={props.products} />
        </>
    )
}
