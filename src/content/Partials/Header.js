// dependencies
import React from 'react';
// components
import { AuthLink, Menu } from './components';

export const Header = props => {
    const handleLogout = () => {
        localStorage.removeItem('userToken');
        props.updateUser(null);
    }

    if (props.user) {
        return (
            <div className='header'>
                <div className='header__title'>
                    <p className='heading-two'>SewStrong</p>
                </div>
                <div className='header__nav'>
                    <a className='header__nav__link body-two' href='#'>Home</a>
                    <a className='header__nav__link body-two' href='#'>Volunteer</a>
                    <a className='header__nav__link body-two' href='#'>Order</a>
                    <a className='header__nav__link body-two' href='#'>Resources</a>
                </div>
                <div className='header__auth'>
                    <AuthLink text='SIGN UP' type='background-orange' setShowSignup={props.setShowSignup} />
                    <AuthLink text='LOGIN' type='background-green' setShowLogin={props.setShowLogin} />
                </div>
            </div>
        )
    } else {
        return (
            <div className='header'>
                <div className='header__title'>
                    <p className='heading-two'>SewStrong</p>
                </div>
            </div>
        )
    }
};