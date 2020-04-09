// dependencies
import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';

export const Login = props => {
    
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [redirect, setRedirect] = useState(false);
    const [message, setMessage] = useState('');

    const handleSubmit = e => {
        e.preventDefault();
        let data = {
            email,
            password
        }
        fetch(`${process.env.REACT_APP_SERVER_URL}/auth/login`, {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(response => {
            response.json()
            .then(result => {
                if (response.ok) {
                    props.updateUser(result.token)
                    setRedirect(true)
                } else {
                    setMessage(`${result.message}`);
                }
            })
        })
        .catch(err => {
            setMessage(`Error connecting to server, please try again later.`)
        })
    };

    if(redirect) {
        props.closeModal()
        // input redirect code;
         // one page which conditionally renders?
    }


    if (!props.showLogin) {
        return null
    } else {
        return (
            <div className='modal'>
                <div className='close-x' onClick={() => props.closeModal()}>X</div>
                <div className='modal__content'>
                    <p className='body-one modal__header'>Login</p>
                    <form className='modal__login' onSubmit={handleSubmit}>
                        <label className="form-element">Email
                            <input type="text" value={email} onChange={e => setEmail(e.currentTarget.value)} />
                        </label>
                        <label className="form-element">Password
                            <input type="password" value={password} onChange={e => setPassword(e.currentTarget.value)} />
                        </label>

                        {/* <div className="form-bottom"> */}
                        <div className="form-element">
                            <input type="submit" value="Login"/>
                        </div>
                            {/* error messages show here */}
                        <small className="form-element">{message}</small>
                        {/* </div> */}

                    </form>
                </div>
            </div>
        )
    }
}