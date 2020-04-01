// dependencies
import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
// components
import { CallToAction, InfoSmall, InfoLarge, Login, Signup } from './components';
// partials
import { Header } from '../Partials';
// styles
import './style.scss';

export const Landing = props => {
    
    const [showSignup, setShowSignup] = useState(false);
    const [showLogin, setShowLogin] = useState(false);
    const [signupType, setSignupType] = useState('');

    return (
        <div className='landing'>
            <div className='landing__banner'>
                <Header />
                <Signup />
                <Login />
            <div className='landing__banner__message'>
                <p className='heading-one'>
                    Medical professionals are in need of masks and other equipment
                </p>
                <p className='body-two'>
                    Help fight the COVID-19 and protect healthcare workers by making or delivering supplies for your community clinics
                </p>
            </div>
            </div>
            <div className='landing__main'>
                <div className='landing__main__box'>
                    <InfoLarge 
                        text='Create' 
                        type='move-small'
                    />
                    <InfoLarge 
                        text='Deliver' 
                        type='move-big'
                    />
                </div>
                <br />
                <p className='body-two'>
                    We connect our volunteers with their local clinics
                </p>
                <CallToAction
                    backgroundcolor={'background-orange'}
                    setShowSignup={setShowSignup}
                    setSignupType={setSignupType}
                    signupType={signupType}
                    text='VOLUNTEER'
                />
                <p className='heading-two'>
                    Are you a health professional in need?
                </p>
                <div className='landing__main__box'>
                    <InfoSmall text='Mask' />
                    <InfoSmall text='Face Shields' />
                    <InfoSmall text='Gowns' />
                </div>
                <CallToAction 
                    backgroundcolor={'background-green'}
                    setShowLogin={setShowLogin}
                    setSignupType={setSignupType}
                    signupType={signupType}
                    text='REQUEST SUPPLIES'
                />
            </div>
        </div>
    )
};