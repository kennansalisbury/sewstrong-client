// dependencies
import React from 'react';
import {Redirect, Link} from 'react-router-dom'
// components
import { AuthLink } from './components';

export const Header = props => {
    const handleLogout = () => {
        localStorage.removeItem('userToken');
        props.updateUser(null);
    }

    if (!props.user) {
        if(props.headerType) {
            if(props.headerType === 'about_contact') {
                return (
                    <div className='header'>
                        <div className='header__title'>
                            <p className='heading-two'>SewStrong</p>
                        </div>
                        <div className='header__nav'>
                            <Link className='header__nav__link body-two' to='/'>Home</Link>
                            <Link className="header__nav__link body-two" to="/about">About</Link>
                            <Link className='header__nav__link body-two' to="/contact">Contact</Link>
                        </div>
                        <div className='header__auth'>
                            <AuthLink text='SIGN UP' type='background-orange' setShowSignup={props.setShowSignup} />
                            <AuthLink text='LOGIN' type='background-green' setShowLogin={props.setShowLogin} />
                        </div>
                    </div>
                )
            }
        }
        else {
        
            return (
                <div className='header'>
                    <div className='header__title'>
                        <p className='heading-two'>SewStrong</p>
                    </div>
                    <div className='header__nav'>
                        <Link className="header__nav__link body-two" to="/about">About</Link>
                        <a className='header__nav__link body-two' href='#volunteer'>Volunteer</a>
                        <a className='header__nav__link body-two' href='#order'>Order</a>
                        <a className='header__nav__link body-two' href='#resources'>Resources</a>
                        <Link className='header__nav__link body-two' to="/contact">Contact</Link>
                    </div>
                    <div className='header__auth'>
                        <AuthLink text='SIGN UP' type='background-orange' setShowSignup={props.setShowSignup} />
                        <AuthLink text='LOGIN' type='background-green' setShowLogin={props.setShowLogin} />
                    </div>
                </div>
            )
        }
    } else {
        return (
            <div className='header'>
                <div className='header__title'>
                    <p className='heading-two'>SewStrong</p>
                </div>
                <AuthLink text='LOGOUT' type='background-green' handleLogout={handleLogout} />
            </div>
        )
    }
};