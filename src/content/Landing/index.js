// dependencies
import React, { useState, useEffect } from 'react';
import { Redirect} from 'react-router-dom';
// components
import { CallToAction, InfoSmall, InfoLarge } from './components';
// modals
import { Login, Signup } from './modals';
// partials
import { Header, Footer } from '../Partials';
// styles
import './style.scss';

export const Landing = props => {
    
    const [showSignup, setShowSignup] = useState(false);
    const [showLogin, setShowLogin] = useState(false);
    const [signupType, setSignupType] = useState('');

    const closeModal = () => {
        if (showSignup) {
            setShowSignup(false);
            setSignupType('');
        }
        if (showLogin) {
            setShowLogin(false);
        }
    }

    if(props.user) {
        return <Redirect to="/dashboard"/>
    }

    let overlayClass = ''
    if(showLogin || showSignup) {
        overlayClass='overlay'
    }

    return (
        
        <div className='landing'>
            {/* <div className={`${overlayClass}`} > */}
            <Signup 
                    closeModal={closeModal}
                    setShowSignup={setShowSignup}
                    setSignupType={setSignupType}
                    showSignup={showSignup}
                    signupType={signupType}
                    updateUser={props.updateUser}
                    products={props.products}
                />
                <Login 
                    closeModal={closeModal}
                    showLogin={showLogin}
                    updateUser={props.updateUser}
                />
            <div className='landing__banner'>
                <Header 
                    setShowLogin={setShowLogin}
                    setShowSignup={setShowSignup}
                    user={props.user}
                    updateUser={props.updateUser}
                />
                <div className='landing__banner__message'>
                    <p className='heading-one'>
                        Coronavirus health care workers are without masks and protective equipment
                    </p>
                    <p className='body-two'>
                        Help fight the spread and protect our front lines by making or delivering free access supplies
                    </p>
                </div>
            </div>
            <div className='landing__main'>
                <p id="volunteer" className='heading-two'>
                    Connect to protect
                </p>
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
       
                <p id="order" className='heading-two'>
                    Are you a health professional in need?
                </p>
                <div className='landing__main__box'>
                    <InfoSmall text='Mask' />
                    <InfoSmall text='Face Shields' />
                    <InfoSmall text='Gowns' />
                </div>
                <CallToAction 
                    backgroundcolor={'background-green'}
                    setShowSignup={setShowSignup}
                    setSignupType={setSignupType}
                    signupType={signupType}
                    text='REQUEST SUPPLIES'
                />

                <p id="resources" className='heading-two'>
                    Resources
                </p>
                
                <CallToAction 
                    backgroundcolor={'background-orange'}
                    setShowSignup={setShowSignup}
                    setSignupType={setSignupType}
                    signupType={signupType}
                    text='DOWNLOAD'
                />
            </div>
            {/* </div> */}
            <Footer />
        </div>
    )
};