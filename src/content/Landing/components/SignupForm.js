// dependencies
import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';

export const SignupForm = props => {
    //component state
    const [errorMessage, setErrorMessage] = useState('')
    const [redirect, setRedirect] = useState(false)

    //user sign up state
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [phone, setPhone] = useState('')
    const [password, setPassword] = useState('')
    const [verifyPassword, setVerifyPassword] = useState('')

    const [address, setAddress] = useState('')
    const [city, setCity] = useState('')
    const [state, setState] = useState('')
    const [zipcode, setZipcode] = useState('')

    const [isMaker, setIsMaker] = useState(false)
    const [isDriver, setIsDriver] = useState(false)
    const [isOther, setIsOther] = useState(false)
    const [other, setOther] = useState('')

    //customer-specific state
    const [orgAffiliation, setOrgAffiliation] = useState('')
    
    //organization-specific state
    const [orgName, setOrgName] = useState('')
    const [numberOfEmployees, setNumberOfEmployees] = useState(0)
    const [laundryCapable, setLaundryCapable] = useState(false)

    //order-specific state
    const [maskRq, setMaskRq] = useState(0)
    const [gownRq, setGownRq] = useState(0)
    const [faceShieldRq, setFaceShieldRq] = useState(0)

    //verification
    const [passwordError, setPasswordError] = useState('')
    const [verifyPasswordError, setVerifyPasswordError] = useState('')
    const [phoneError, setPhoneError] = useState('')
    const [stateError, setStateError] = useState('')
    const [zipcodeError, setZipcodeError] = useState('')
    const [volunteerChecksError, setVolunteerChecksError] = useState('')
    const [numberOfEmployeesError, setNumberOfEmployeesError] = useState('')
    const [orderQtyError, setOrderQtyError] = useState('')


    //FRONT END FORM VERIFICATION ELEMENTS
    const verifyForm = () => {
        let verified = true

        //check password matches verify password and is at least 8 characters
        if(verifyPassword !== password){ setVerifyPasswordError('Password does not match      '); verified=false}

        if(password.length < 8) {setPasswordError('Password must be at least 8 characters'); verified=false}

        //check phone is 10 characters
        if(phone.length < 10){setPhoneError('Please enter a valid 10 digit phone number'); verified=false}

        //check zipcode is > 5 characters
        if((isMaker || isDriver || props.signupType === 'CUSTOMER') && zipcode.length < 5){setZipcodeError('Please enter a 5 or 9 digit zip code'); verified=false}

        //check state for outside of WA
        if((isMaker|| props.signupType === 'CUSTOMER') && state !== 'WA') {setStateError('Sorry, we are not able to service anyone outside of Washington at this time')}

        //if signup type is volunteer, make sure one of the inputs is checked
        if(props.signupType === 'VOLUNTEER' && !isMaker && !isDriver && !isOther) {setVolunteerChecksError("Please select what you would like to volunteer for."); verified=false }

        //if customer check number of employees
        if(props.signupType === 'CUSTOMER' && numberOfEmployees === 0) {setNumberOfEmployeesError('Please indicate an estimated number of employees at the organization'); verified=false  }
        
        //if customer check no quantities === 10
        if(maskRq == 10 || gownRq == 10 || faceShieldRq == 10) {setOrderQtyError('Please order a minimum of 20 product') }
    
        return verified
    }


    const handleSubmit = e => {
        e.preventDefault()

        //check for verification errors
        if(!verifyForm()) {
            setErrorMessage('Please see errors above and fix before submitting')
            return
        }

        //Set data based on user type
        let data
        let makerProduction = props.products.map(product => {
            return ({
                product: product._id,
                currentInventory: 0,
                producedToDate: 0
            })
        })

        //VOLUNTEER ------------------

        //maker
        if(isMaker && !isDriver) {
            data = {
                firstName,
                lastName,
                email,
                username,
                password,
                phone,
                maker : {
                    address,
                    city,
                    state,
                    zipcode,
                    makerProduction: makerProduction
                },
                other
            }
        }
        //driver
        if(isDriver && !isMaker) {
            data = {
                firstName,
                lastName,
                email,
                username,
                password,
                phone, 
                driver: { zipcode },
                other
            }
        }

        //driver & maker
        if(isDriver && isMaker) {
            data = {
                firstName,
                lastName,
                email,
                username,
                password,
                phone, 
                maker : {
                    address,
                    city,
                    state,
                    zipcode,
                    makerProduction: makerProduction
                },
                driver: { zipcode },
                other
            }
        }

        //other only
        if(isOther && !isDriver && !isMaker) {
            data = {
                firstName,
                lastName,
                email,
                username,
                password,
                phone, 
                other
            }
        }

        //IF CUSTOMER ------------------
        if(props.signupType === 'CUSTOMER') {

            //set productOrderDetails to only products with quantities over 0
            let maskOrderDetails = (maskRq > 0 ? [{product: "5e84d319e7424247d2926b36", orgRequestQty: maskRq}] : [])
            let gownOrderDetails = (gownRq > 0 ? [{product: "5e84d319e7424247d2926b37", orgRequestQty: gownRq}]: [])
            let faceShieldOrderDetails = ( faceShieldRq > 0 ? [{product: "5e84d319e7424247d2926b38", orgRequestQty: faceShieldRq}] : [])

            
            let productOrderDetails = [...maskOrderDetails, ...gownOrderDetails, ...faceShieldOrderDetails]
            console.log(productOrderDetails)


            data = {
                user: {            
                    firstName,
                    lastName,
                    email,
                    username,
                    password,
                    phone,
                    customer: {
                        orgAffiliation
                    }
                },

                organization: {
                    name: orgName,
                    address,
                    city,
                    state,
                    zipcode,
                    numberOfEmployees,
                    laundryCapable
                },
                productOrderDetails
            }

        }

        console.log('AND THE DATA ISSSSS', data)
     
        //set post url based on sign up type
        let postUrl
        props.signupType === 'VOLUNTEER' ? postUrl = '/auth/signup/volunteer' : postUrl = '/auth/signup/order'
        console.log(`${process.env.REACT_APP_SERVER_URL}${postUrl}`)


        //post to signup
        fetch(`${process.env.REACT_APP_SERVER_URL}${postUrl}`, {
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
                    setErrorMessage(`${response.status} ${response.statusText}: ${result.message}`)
                }
            })
        })
        .catch(err => {
            console.log(err)
        })
    }

    if(!props.signupType) {
        return null
    }

    if(redirect) {
        props.closeModal()
        // input redirect code;
        // one page which conditionally renders?
    }

    let allUserInputs = (
        <div className="inputs-1">
            {/* <div className="form-row"> */}
                <label className="form-element-1">First Name
                    <input type="text" required value={firstName} onChange={e => setFirstName(e.currentTarget.value)} />
                </label>
                <label className="form-element-2">Last Name
                    <input type="text" value={lastName} onChange={e => setLastName(e.currentTarget.value)} />
                </label>
            {/* </div> */}

            {/* <div className="form-row"> */}
                <label className="form-element-3">Email
                        <input type="email" required value={email} onChange={e => setEmail(e.currentTarget.value)} />
                </label> 
            {/* </div> */}

            {/* <div className="form-row"> */}
                <label className="form-element-4">Password
                    <input type="password" required value={password} onChange={e => setPassword(e.currentTarget.value)} />     
                </label>
            {/* </div> */}

            <label className="form-element-5">Verify Password
                    <input type="password" required value={verifyPassword} onChange={e => {setVerifyPassword(e.currentTarget.value)}} />
                </label>

            {/* <div className="form-row"> */}
                <div className="form-element-6">
                    <small>{verifyPasswordError}</small>
                    <small>{passwordError}</small>
                </div>
            {/* </div>

            <div className="form-row"> */}
                <label className="form-element-7">Display name
                    <input type="text" required value={username} onChange={e => setUsername(e.currentTarget.value)}/>
                </label>
                {/* <small>This will be the name displayed to others with access to the site.</small> */}
            {/* </div> */}

            {/* set so that phone number field has dashes? */}
            {/* <div className="form-row"> */}
                <label className="form-element-8">Phone
                    <input type="text" required value={phone} maxLength="10" onChange={e => setPhone(e.currentTarget.value)}/>
                </label>
                <small>{phoneError}</small>
            {/* </div> */}
        </div>
    )
 


    let header = 'Sign up here to request supplies for your clinic'
    let volunteerInputs = ''
    let volunteerDynamicInputs = ''
    let customerInputs = ''
    

    if(props.signupType === 'VOLUNTEER') {
        header = 'Sign up here to volunteer'
        if(isMaker || (isMaker && isDriver)) {
            volunteerDynamicInputs = (
                <div className="inputs-3-maker">
                    <p className="form-element-1">We will need your address for matching you with a volunteer lead in your area, and for confirming pick ups with our drivers. We will never share this information with anyone else.</p>
           
                        <label className="form-element-2">Street Address
                        <input type="text" required value={address} onChange={e => setAddress(e.currentTarget.value)} />
                        </label>
            
                  
                        <label className="form-element-3">City
                            <input type="text" required value={city} onChange={e => setCity(e.currentTarget.value)} />
                        </label>
                        <label className="form-element-4">State
                            <input type="text" required value={state} maxLength="2" onChange={e => {setState(e.currentTarget.value.toUpperCase())}} />
                        </label>
                        <small className="form-element-5">{stateError}</small>
       
                        <label className="form-element-6">Zipcode
                        <input type="text" required value={zipcode} maxLength="5" onChange={e => setZipcode(e.currentTarget.value)} />
                        </label>
                    <small className="form-element-7">{zipcodeError}</small>
                </div>
            )
        }
        if(isDriver && !isMaker) {
            volunteerDynamicInputs = (
                <div className="inputs-3-driver">
                    <p className="form-element-1">We will need your zipcode for matching you with a volunteer lead in your area.</p>

                    <label className="form-element-2">Zipcode
                        <input type="text" required value={zipcode} maxLength="5" onChange={e => {setZipcode(e.currentTarget.value)}} />
                    </label>
                    <small className="form-element-3">{zipcodeError}</small>
                </div>
            )
        }

        volunteerInputs = ( 
            <div className="inputs-2-volunteer">
                <p className='form-element-1'>What would you like to volunteer for?</p>
                <div className='form-element-2'>
                    <input type='checkbox' name='isMaker' onChange={e => setIsMaker(e.target.checked)} />
                    <label>Sew Masks, Make Face Shields, or Make Gowns </label>
                </div>
                <div className='form-element-3'>
                    <input type='checkbox' name='isDriver'  onChange={e => setIsDriver(e.target.checked)} />
                    <label>Pick up and Deliver Materials</label>
                </div>
                <div className='form-element-4'> 
                    <input type='checkbox' name='isOther' onChange={e => setIsOther(e.target.checked)} />   
                    <label>Other</label>
                </div>
                <div className='form-element-5'>
                    <label>If you checked 'Other' please let us know how you would like to help: </label>
                    <input type='text' onChange={e => setOther(e.currentTarget.value)} />
                </div>

                <small>{volunteerChecksError}</small>

            </div>
        )
    }
      

    else if(props.signupType === 'CUSTOMER') {
        
        customerInputs = (
            
            <div className="inputs-2-customer">
                <label className="form-element-1">Organization Name
                    <input type="text" required value={orgName} onChange={e=>setOrgName(e.currentTarget.value)}/>
                </label>
                
                <label className="form-element-2">Street Address
                    <input type="text" required value={address} onChange={e => setAddress(e.currentTarget.value)} />
                </label>
                
                <label className="form-element-3">City 
                    <input type="text" required value={city} onChange={e => setCity(e.currentTarget.value)} />
                </label>
                
                <label className="form-element-4">State 
                    <input type="text" required value={state} maxLength="2" onChange={e => setState(e.currentTarget.value.toUpperCase())} />
                </label>
                
                <small className="form-element-5">{stateError}</small>
                
                <label className="form-element-6">Zipcode
                    <input type="text" required value={zipcode} maxLength="5" onChange={e => setZipcode(e.currentTarget.value)} />
                </label>
                
                <small>{zipcodeError}</small>
                
                <label className="form-element-7">What is your affiliation to this organization?
                    <input type="text" required value={orgAffiliation} onChange={e => setOrgAffiliation(e.currentTarget.value)} />
                </label>
                
                <label className="form-element-8">How many employees does your organization have?
                    <input type="number" value={numberOfEmployees} onChange={e => setNumberOfEmployees(e.currentTarget.value)}></input>
                </label>
                
                <small className="form-element-9">{numberOfEmployeesError}</small>

                <p className="form-element-10">Does your organization have laundry capabilities?</p>
                <div className="form-element-11">
                    <label>
                        <input  type="radio" checked={laundryCapable === true} onChange={() => setLaundryCapable(true)} />
                    Yes</label>
                    <label>
                        <input type="radio" checked={laundryCapable === false} onChange={() => setLaundryCapable(false)} />
                    No</label>
                </div>

         
                <p className="form-element-12">Please indicate which products you would like to order with the quantity you are requesting. We are only accepting orders in increments of 10 and minimum orders of 20 right now. </p>
                <label className="form-element-13">Masks
                    <input type="number" value={maskRq} step={10} onChange={e => setMaskRq(e.currentTarget.value) } />
                </label>
                <label className="form-element-14">Gowns
                    <input type="number" value={gownRq} step={10} onChange={e => setGownRq(e.currentTarget.value) } />
                </label>
                <label className="form-element-15">Face Shields
                    <input type="number" value={faceShieldRq} step={10} onChange={e => setFaceShieldRq(e.currentTarget.value)} />
                </label>
                <small className="form-element-16">{orderQtyError}</small>
    
                <div className="form-col">
                    
                </div>


            </div>
        )
    }

    return(
        <form className='modal__form' onSubmit={handleSubmit}>
            <p>{header}</p>
            {allUserInputs}
            {volunteerInputs}
            {volunteerDynamicInputs}
            {customerInputs}
            
            <input type="submit" value="Sign Up"/>
            <small>{errorMessage}</small>

        </form>
    )
}