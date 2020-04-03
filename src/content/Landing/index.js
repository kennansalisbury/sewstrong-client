// dependencies
import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
// components
import { CallToAction, InfoSmall, InfoLarge } from './components';
// modals
import { Login, Signup } from './modals';
// partials
import { Header } from '../Partials';
// styles
import './style.scss';

export const Landing = props => {
    
    const [showSignup, setShowSignup] = useState(false);
    const [showLogin, setShowLogin] = useState(false);
    const [signupType, setSignupType] = useState('');
    const [products, setProducts] = useState('')

    useEffect(() => {
        fetch(`${process.env.REACT_APP_SERVER_URL}/products`)
        .then(response => {
            response.json()
            .then(results => {
                if (response.ok) {
                    console.log('products', results)
                    setProducts(results);
                } else {
                    console.log(results.message);
                }
            })
        })
        .catch(err => {
            console.log(err);
        })
    }, [])


    const closeModal = () => {
        if (showSignup) {
            setShowSignup(false);
            setSignupType('');
        }
        if (showLogin) {
            setShowLogin(false);
        }
    }

    return (
        <div className='landing'>
            <div className='landing__banner'>
                <Header 
                    setShowLogin={setShowLogin}
                    setShowSignup={setShowSignup}
                    user={props.user}
                    updateUser={props.updateUser}
                />
            <div className='landing__banner__message'>
                <p className='heading-one'>
                    Medical professionals are in need of masks and other equipment
                </p>
                <p className='body-two'>
                    Help fight the COVID-19 and protect healthcare workers by making or delivering supplies for your community clinics
                </p>
            </div>
            </div>
            <Signup 
                    closeModal={closeModal}
                    setShowSignup={setShowSignup}
                    setSignupType={setSignupType}
                    showSignup={showSignup}
                    signupType={signupType}
                    updateUser={props.updateUser}
                    products={products}
                />
            <Login 
                closeModal={closeModal}
                showLogin={showLogin}
                updateUser={props.updateUser}
            />
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
                    setShowSignup={setShowSignup}
                    setSignupType={setSignupType}
                    signupType={signupType}
                    text='REQUEST SUPPLIES'
                />
            </div>
        </div>
    )
};