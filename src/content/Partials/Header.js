// dependencies
import React from 'react';
// components
import { AuthLink } from './components';

export const Header = props => {

    const handleLogout = e => {
        localStorage.removeItem('userToken');
        props.updateUser(null);
    }

    if (!props.user) {
        return (
            <div className='header'>
                {/* <h1 className='header-title'>SewStrong</h1> */}
                <div className='header-title'>
                    <p className='heading-two'>SewStrong</p>
                </div>
                <div className='header-nav'>
                    <a className='header-nav-link body-two' href='#'>Home</a>
                    <a className='header-nav-link body-two' href='#'>Volunteer</a>
                    <a className='header-nav-link body-two' href='#'>Order</a>
                    <a className='header-nav-link body-two' href='#'>Resources</a>
                </div>
                <div className='header-auth'>
                    <AuthLink text='SIGN UP' type='background-orange' setShowSignup={props.setShowSignup} />
                    <AuthLink text='LOGIN' type='background-green' setShowLogin={props.setShowLogin} />
                </div>
            </div>
        )
    } else {
        return (
            <div></div>
        )
    }
};