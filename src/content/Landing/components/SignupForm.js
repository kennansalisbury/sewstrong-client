// dependencies
import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';

export const SignupForm = props => {
    let [firstName, setFirstName] = useState('')
    let [lastName, setLastName] = useState('')
    let [email, setEmail] = useState('')
    let [password, setPassword] = useState('')
    let [verifyPassword, setVerifyPassword] = useState('')
    let [verifyPasswordMessage, setVerifyPasswordMessage] = useState('')
    let [username, setUsername] = useState('')
    let [address, setAddress] = useState('')
    let [city, setCity] = useState('')
    let [state, setState] = useState('')
    let [zipcode, setZipcode] = useState('')
    let [region, setRegion] = useState('south')
    let [isProducer, setIsProducer] = useState(false)
    let [willSewMasks, setWillSewMasks] = useState([])
    let [willSewGowns, setWillSewGowns] = useState([])
    let [willCreateShields, setWillCreateShields] = useState([])
    // let [isClinic, setIsClinic] = useState(false)
    let [isDriver, setIsDriver] = useState(false)
    let [message, setMessage] = useState('')
    let [redirect, setRedirect] = useState(false)

    //NEED FRONT END FORM VERIFICATION ELEMENTS
    //need to update so that product options to volunteer for populate from the backend

    const checkPasswords = () => {
        if(verifyPassword !== password){
            setVerifyPasswordMessage('Password does not match')
        }
        else if(verifyPassword === password) {
            setVerifyPasswordMessage('')
        }
    }

    const handleSubmit = e => {
        
        e.preventDefault()

        //TO DO: run address through api to verify address and convert zip to full zipcode
            //research smartystreets and usps apis

        //TO DO: confirm how we want to assign user to prod lead - confirm region name and what zipcodes to include

        //create inventory field w/ product reference based on what they have checked off they will be making
        let inventory = [...willSewMasks, ...willSewGowns, ...willCreateShields]
        let isClinic = false
        
        props.signupType === 'CLINIC' ? isClinic = true : isClinic = false

        //data for posting to signup

        let data = {
            firstName,
            lastName,
            email,
            password,
            username,
            address: address ? address : 'na',
            city: city ? city : 'na',
            state: state ? state : 'na',
            zipcode: zipcode ? zipcode : 'na',
            region,
            isProducer,
            inventory,
            isClinic,
            isDriver
        }

        //post to signup
        fetch(`${process.env.REACT_APP_SERVER_URL}/auth/signup`, {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(response => {
            response.json()
            .then(result => {
                //if response.ok = true, updateUser(result.token)
                if(response.ok) {
                    props.updateUser(result.token)
                    setRedirect(true)
                } else {
                    //else show the error in a message on the page
                    setMessage(`${response.status} ${response.statusText}: ${result.message}`)
                }
            })
        })
        .catch(err => {
            console.log(err)
        })
    }

    if(redirect){
        if(props.user.isclinic) {
            props.closeModal()
            return <Redirect to="/clinic"/>
        }
        props.closeModal()
        return <Redirect to="/admin"/>
    }

    let volunteerOnlyInputs = ''
    let header = 'Sign up here to request supplies for your clinic'
    if(props.signupType === 'VOLUNTEER'){
        header = 'Sign up here to volunteer'
        volunteerOnlyInputs = (
            <div>
                {/* if volunteer only ------------------------------------------------------------*/}
                <div className="form-row">
                    <label>Street Address</label>
                    <input type="text" value={address} onChange={e => setAddress(e.currentTarget.value)} />
                </div>
                <div className="form-row">
                    <label className="form-element">City
                        <input type="text" value={city} onChange={e => setCity(e.currentTarget.value)} />
                    </label>
                    <label className="form-element">State
                        <input type="text" value={state} onChange={e => setState(e.currentTarget.value)} />
                    </label>
                </div>

                <div className="form-row">
                    <label>Zipcode</label>
                    <input type="text" value={zipcode} onChange={e => setZipcode(e.currentTarget.value)} />
                </div>
                
                <p>What would you like to volunteer for?</p>
                <div>
                    <input type='checkbox' name='isProducer' onChange={e => {setIsProducer(e.target.checked); e.target.checked ? setWillSewMasks([{product: "5e791f4a0474cea058c814b6", quantity: 0 }]) : setWillSewMasks([])}} />
                    <label>Sew Masks</label>
                </div>
              
                <div>
                    <input type="checkbox" name='isProducer' onChange={e => {setIsProducer(e.target.checked); e.target.checked ? setWillSewGowns([{product: "5e791f4a0474cea058c814b7", quantity: 0 }]) : setWillSewGowns([])}} />
                    <label>Sew Gowns</label>
                </div>
                
                <div>
                    <input type="checkbox" name='isProducer' onChange={e => {setIsProducer(e.target.checked); e.target.checked ? setWillCreateShields([{product: "5e791f4a0474cea058c814b8", quantity: 0 }]) : setWillCreateShields([])}} />
                    <label>Create Face Shields (no sewing or special tools required)</label>
                </div>
                
                <div>
                    <input type='checkbox' name='isDriver'  onChange={e => setIsDriver(e.target.checked)} />
                    <label>Pick up and Deliver Materials</label>
                </div>
                {/* if volunteer only ------------------------------------------------------------*/}
            </div>
        )
    }
    
    if(!props.signupType) {
        return null
    }



    return(
        <form className='modal-form-signup' onSubmit={handleSubmit}>
            <p>{header}</p>
            <div className="form-row">
                <label className="form-element">First Name
                    <input type="text" value={firstName} onChange={e => setFirstName(e.currentTarget.value)} />
                </label>
            
                <label className="form-element">Last Name
                    <input type="text" value={lastName} onChange={e => setLastName(e.currentTarget.value)} />
                </label>
            </div>

            <div className="form-row">
                <label className="form-element">Email
                        <input type="text" value={email} onChange={e => setEmail(e.currentTarget.value)} />
                </label> 
            </div>

            <div className="form-row">

                <label className="form-element">Password
                    <input type="password" value={password} onChange={e => setPassword(e.currentTarget.value)} />     
                </label>
            </div>

            <div className="form-row">
                <label className="form-element">Verify Password
                    <input type="password" value={verifyPassword} onChange={e => {setVerifyPassword(e.currentTarget.value); checkPasswords()}} />
                    <p>{verifyPasswordMessage}</p>
                </label>
            

            </div>

            <div className="form-row">
                <label>Display name
                    <input type="text" value={username} onChange={e => setUsername(e.currentTarget.value)}/>
                    <small>This will be the name displayed to others with access to the site.</small>
                </label>
            </div>

            {volunteerOnlyInputs}
            
            <input type="submit" value="Sign Up"/>


            {/* error messages show here */}
            {message}

        </form>
    )
}