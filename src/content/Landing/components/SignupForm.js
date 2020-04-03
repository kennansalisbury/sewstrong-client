// dependencies
import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';

export const SignupForm = props => {
    //component state
    const [message, setMessage] = useState('')
    const [redirect, setRedirect] = useState(false)

    //user sign up state
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [phone, setPhone] = useState('')
    const [password, setPassword] = useState('')
    const [verifyPassword, setVerifyPassword] = useState('')
    const [verifyPasswordMessage, setVerifyPasswordMessage] = useState('')

    const [address, setAddress] = useState('')
    const [city, setCity] = useState('')
    const [state, setState] = useState('')
    const [zipcode, setZipcode] = useState('')

    const [isMaker, setIsMaker] = useState(false)
    const [isDriver, setIsDriver] = useState(false)

    //customer-specific state
    const [orgAffiliation, setOrgAffiliation] = useState('')
    
    //organization-specific state
    const [orgName, setOrgName] = useState('')
    const [numberOfEmployees, setNumberOfEmployees] = useState(0)
    const [laundryCapable, setLaundryCapable] = useState(false)

    //order-specific state
    const [orderNumber, setOrderNumber] = useState('')
    const [productOrderDetails, setProductOrderDetails] = useState([])


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

        //Set data based on signup type
        //IF CUSTOMER - set order number math.random

        //TO DO: run address through api to verify address and convert zip to full zipcode
        //research smartystreets and usps apis
     
        //set post url based on sign up type
        let postUrl
        props.signupType === 'VOLUNTEER' ? postUrl = '/auth/signup/volunteer' : postUrl = '/auth/signup/order'
        console.log(`${process.env.REACT_APP_SERVER_URL}${postUrl}`)


        // //post to signup
        // fetch(`${process.env.REACT_APP_SERVER_URL}${postUrl}`, {
        //     method: 'POST',
        //     body: JSON.stringify(data),
        //     headers: {
        //         'Content-Type': 'application/json'
        //     }
        // })
        // .then(response => {
        //     response.json()
        //     .then(result => {
        //         //if response.ok = true, updateUser(result.token)
        //         if(response.ok) {
        //             props.updateUser(result.token)
        //             setRedirect(true)
        //         } else {
        //             //else show the error in a message on the page
        //             setMessage(`${response.status} ${response.statusText}: ${result.message}`)
        //         }
        //     })
        // })
        // .catch(err => {
        //     console.log(err)
        // })
    }

    if(redirect) {
        props.closeModal()
        // input redirect code;
        // one page which conditionally renders?
    }

    let allUserInputs = (
        <div>
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

            {/* set so that phone number field has dashes? */}
            <div className="form-row">
                <label>Phone
                    <input type="text" value={phone} onChange={e => setPhone(e.currentTarget.value)}/>
                </label>
            </div>
        </div>
    )

    let header = 'Sign up here to request supplies for your clinic'
    let volunteerInputs = ''
    let volunteerDynamicInputs = ''
    let customerInputs = ''
    

    if(props.signupType === 'VOLUNTEER') {
        if(isMaker) {
            header = 'Sign up here to volunteer'
            volunteerDynamicInputs = (
                <div>
                    <p>We will need your address for matching you with a volunteer lead in your area, and for confirming pick ups with our drivers. We will never share this information with anyone else.</p>
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
                </div>
            )
        }
        if(isDriver) {
            volunteerDynamicInputs = (
                <div>
                    <p>We will need your zipcode for matching you with a volunteer lead in your area</p>
                    <div className="form-row">
                            <label>Zipcode</label>
                            <input type="text" value={zipcode} onChange={e => setZipcode(e.currentTarget.value)} />
                    </div>
                </div>
            )
        }

        volunteerInputs = ( 
            <div>
                <p>What would you like to volunteer for?</p>
                <div>
                    <input type='checkbox' name='isMaker' onChange={e => setIsMaker(e.target.checked)} />
                    <label>Sew Masks, Make Face Shields, or Make Gowns </label>
                </div>
                <div>
                    <input type='checkbox' name='isDriver'  onChange={e => setIsDriver(e.target.checked)} />
                    <label>Pick up and Deliver Materials</label>
                </div>

                {volunteerDynamicInputs}

            </div>
        )
    }
      

    else if(props.signupType === 'CUSTOMER') {
        // let productOrderDetails = []

        // const handleProductOrders = (product, qty) => {
        //     //put into productionorderdetails format and set production order details state
            
        //     [...productOrderDetails, [product]]
        // }
        
        // let productsList = ''
        // props.products ? props.products.map(product => {
        //     return (
        //         <label>product.name</label>
        //         <input type="number" onChange={() => handleProductOrders(product.name, e.currentTarget.value)}></input>
        //     )
        // } )


        
        customerInputs = (
            
            <div className="form-col">
                <label>Organization Name</label>
                <input type="text" value={orgName} onChange={e=>setOrgName(e.currentTarget.value)}/>
                <label>Street Address</label>
                <input type="text" value={address} onChange={e => setAddress(e.currentTarget.value)} />
                <label>City </label>
                <input type="text" value={city} onChange={e => setCity(e.currentTarget.value)} />
                
                <label>State </label>
                <input type="text" value={state} onChange={e => setState(e.currentTarget.value)} />
                
                <label>Zipcode</label>
                <input type="text" value={zipcode} onChange={e => setZipcode(e.currentTarget.value)} />
                
                <label>What is your affiliation to this organization?</label>
                <input type="text" value={orgAffiliation} onChange={e => setOrgAffiliation(e.currentTarget.value)} />

                <label>How many employees does your organization have?</label>
                <input type="number" value={numberOfEmployees} onChange={e => setNumberOfEmployees(e.currentTarget.value)}></input>

                <p>Does your organization have laundry capabilities? (optional)</p>
                <input type="radio" checked={laundryCapable === true} onChange={() => setLaundryCapable(true)} />
                <label>Yes</label>
                <input type="radio" checked={laundryCapable === false} onChange={() => setLaundryCapable(false)} />
                <label>No</label>



            </div>
        )
    }

    if(!props.signupType) {
        return null
    }



    return(
        <form className='modal-form-signup' onSubmit={handleSubmit}>
            <p>{header}</p>
            {allUserInputs}
            {volunteerInputs}
            {customerInputs}
            
            <input type="submit" value="Sign Up"/>
            {message}

        </form>
    )
}