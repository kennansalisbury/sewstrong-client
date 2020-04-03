// dependencies
import React from 'react';

export const AuthLink = props => {
    
    const handleClick = () => {
        if (props.text === 'SIGN UP') {
            props.setShowSignup(true);
        } else if (props.text === 'LOGIN') {
            props.setShowLogin(true)
        } else if (props.text === 'LOGOUT') {
            props.handleLogout()
        } else {
            return;
            // needs updated
        }
    };
    return (
        <div className={`auth-link ${props.type} body-two`} onClick={handleClick}>
            <p className=''>
                {props.text}
            </p>
        </div>
    )
}