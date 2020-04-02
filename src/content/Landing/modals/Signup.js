// dependencies
import React from 'react';
// components
import { CallToAction, SignupForm } from '../components';


export const Signup = props => {

    let callToActionButtons = '';
    if (!props.signupType) {
        callToActionButtons = (
            <div>
                <CallToAction 
                    setShowSignup={props.setShowSignup}
                    setSignupType={props.setSignupType}
                    text='VOLUNTEER'
                />
                <CallToAction
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
                <p className='close-x' onClick={() => props.closeModal()}>X</p>
                <div className='modal-content'>
                    <p className='body-one modal-header'>Sign Up</p>
                    {callToActionButtons}
                    <SignupForm signupType={props.signupType} updateUser={props.updateUser} closeModal={props.closeModal}/>
                </div>
                
            </div>
        )
    }
}