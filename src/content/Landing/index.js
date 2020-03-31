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
            <div className='landing landing-banner'>
                <Header />
                <Signup />
                <Login />
            <div className='landing-banner-message'>
                <p className='heading-one'>
                    Medical professionals are in need of masks and other equipment
                </p>
                <p className='body-two'>
                    Help fight the COVID-19 and protect healthcare workers by making or delivering supplies for your community clinics
                </p>
            </div>
            </div>
            <div className='landing landing-main'>
                <br />
                <div className='landing-main-box'>
                    <InfoLarge text='Be a producer' />
                    <InfoLarge text='Help deliver' />
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
                <div className='landing-main-box'>
                    <InfoSmall text='Mask' />
                    <InfoSmall text='Face Shields' />
                    <InfoSmall text='Gowns' />
                </div>
                <br />
                <CallToAction 
                    backgroundcolor={'background-green'}
                    setShowLogin={setShowLogin}
                    setSignupType={setSignupType}
                    signupType={signupType}
                    text='REQUEST SUPPLIES'
                />
                <br />
            </div>
            <div className='landing landing-donate'>
                <div className='landing-donate landing-donate-message'>
                    <p className='heading-one'>Donate</p>
                    <p className='body-two'>
                        Your contributions help us provide our volunteers with the materials they need
                    </p>
                    <CallToAction text='DONATE MONEY' />
                    <CallToAction text='DONATE SUPPLIES' />
                </div>
            </div>
        </div>
    )
};