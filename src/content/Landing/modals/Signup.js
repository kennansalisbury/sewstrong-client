// dependencies
import React from 'react';
// components
import { CallToAction, SignupForm } from '../components';


export const Signup = props => {

    let callToActionButtons = '';
    if (!props.signupType) {
        callToActionButtons = (
            <div className='modal__prompt'>
                <CallToAction 
                    backgroundcolor='background-orange'
                    setShowSignup={props.setShowSignup}
                    setSignupType={props.setSignupType}
                    text='VOLUNTEER'
                />
                <CallToAction
                    backgroundcolor='background-green'
                    setShowSignup={props.setShowSignup}
                    setSignupType={props.setSignupType}
                    text='REQUEST SUPPLIES'
                />
            </div>
        )
    }
    if (!props.showSignup || (!props.showSignup && !props.signupType)) {
        return null
    } else if (props.showSignup) {
        return (
            <div className='modal'>
                <div className='close-x' onClick={() => props.closeModal()}>X</div>
                <div className='modal__content'>
                    <p className='body-one modal__header'>SIGN UP</p>
                    {callToActionButtons}
                    <SignupForm 
                        closeModal={props.closeModal}
                        signupType={props.signupType} 
                        setSignupType={props.setSignupType}
                        updateUser={props.updateUser}
                        products={props.products}
                    />
                </div>
                
            </div>
        )
    }
}