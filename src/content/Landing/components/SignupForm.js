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
    const [email, setEmail] = useState('')
    const [phone, setPhone] = useState('')
    const [password, setPassword] = useState('')
    const [verifyPassword, setVerifyPassword] = useState('')
    const [zipcode, setZipcode] = useState('')

    const [address1, setAddress1] = useState('')
    const [address2, setAddress2] = useState('')
    const [city, setCity] = useState('')
    const [state, setState] = useState('')

    const [isMaker, setIsMaker] = useState(false)
    const [isDriver, setIsDriver] = useState(false)
    const [isOther, setIsOther] = useState(false)
    const [other, setOther] = useState('')

    //customer-specific state
    const [orgAffiliation, setOrgAffiliation] = useState('')
    
    //organization-specific state
    const [orgName, setOrgName] = useState('')
    const [numberOfEmployees, setNumberOfEmployees] = useState(0)

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
        if(zipcode.length < 5){setZipcodeError('Please enter a 5 or 9 digit zip code'); verified=false}

        //if signup type is volunteer, make sure one of the inputs is checked
        if(props.signupType === 'VOLUNTEER' && !isMaker && !isDriver && !isOther) {setVolunteerChecksError("Please select what you would like to volunteer for."); verified=false }

        //if customer check number of employees
        if(props.signupType === 'CUSTOMER' && numberOfEmployees === 0) {setNumberOfEmployeesError('Please indicate an estimated number of employees at the organization'); verified=false  }
        
        //if customer check no quantities === 10
        if(maskRq == 10 || gownRq == 10 || faceShieldRq == 10) {setOrderQtyError('Please order a minimum of 20 product'); verified=false }
    
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
        let userType

        //VOLUNTEER ------------------
        let makerInventory = props.products.map((product) => {
            return ({
                product: product._id,
                total_units: 0,
                total_inventory_to_date: 0
            })
        })

        //maker
        if(isMaker && !isDriver) {
            userType = 'maker'
            data = {
                first_name: firstName,
                last_name: lastName,
                email,
                password,
                phone,
                zipcode,
                region: 'unassigned',
                other,
                maker: {
                    address_one: address1,
                    address_two: address2,
                    city,
                    state
                },
                inventory: makerInventory
            }
        }
        //driver
        if(isDriver && !isMaker) {
            userType = 'driver'
            data = {
                first_name: firstName,
                last_name: lastName,
                email,
                password,
                phone,
                zipcode,
                region: 'unassigned',
                other
            }
        }

        //driver & maker
        if(isDriver && isMaker) {
            userType = 'maker+driver'
            data = {
                first_name: firstName,
                last_name: lastName,
                email,
                password,
                phone,
                zipcode,
                region: 'unassigned',
                other,
                maker: {
                    address_one: address1,
                    address_two: address2,
                    city,
                    state
                },
                inventory: makerInventory
            }
        }

        //other only
        if(isOther && !isDriver && !isMaker) {
            userType = 'other'
            data = {
                first_name: firstName,
                last_name: lastName,
                email,
                password,
                phone,
                zipcode,
                region: 'unassigned',
                other
            }
        }

        //IF CUSTOMER ------------------
        if(props.signupType === 'CUSTOMER') {

            //set productOrderDetails to only products with quantities over 0
            let mask = props.products.filter(product => product.name.toLowerCase() == 'mask')
            let gown = props.products.filter(product => product.name.toLowerCase() == 'gown')
            let faceShield = props.products.filter(product => product.name.toLowerCase() == 'face shield')

            let maskOrderDetails = (maskRq > 0 ? [{product: mask[0]._id, total: maskRq}] : [])
            let gownOrderDetails = (gownRq > 0 ? [{product: gown[0]._id, total: gownRq}]: [])
            let faceShieldOrderDetails = ( faceShieldRq > 0 ? [{product: faceShield[0]._id, total: faceShieldRq}] : [])
            
            let productOrderDetails = [...maskOrderDetails, ...gownOrderDetails, ...faceShieldOrderDetails]
            
            data = { 
                    first_name: firstName,
                    last_name: lastName,
                    email,
                    password,
                    phone,
                    zipcode,
                    region: 'unassigned',
                    other,
                    customer: {
                        organization: orgName,
                        address_one: address1,
                        address_two: address2,
                        city,
                        state,
                        num_of_employees: numberOfEmployees,
                        org_affiliation: orgAffiliation,
                        orders: []
                    },
                    productOrderDetails
            }

        }
        //set post url based on sign up type
        let postUrl
        props.signupType === 'VOLUNTEER' ? postUrl = '/auth/signup/volunteer' : postUrl = '/auth/signup/order'



        //post to signup
        fetch(`${process.env.REACT_APP_SERVER_URL}${postUrl}`, {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json',
                //header for determining what type of user account to create
                'User-Type': `${userType}`
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

    let allUserInputs = (
        <div className="all-user-inputs">
                {/* <p className="body-three">&larr; BACK</p> */}

                <label className="body-two form-element">FIRST NAME* 
                    <input className='body-two' type="text" required value={firstName} onChange={e => setFirstName(e.currentTarget.value)} />
                </label>
                <label className="body-two form-element">LAST NAME 
                    <input className='body-two' type="text" value={lastName} onChange={e => setLastName(e.currentTarget.value)} />
                </label>



                <label className="body-two form-element">EMAIL* 
                        <input className='body-two' type="email" required value={email} onChange={e => setEmail(e.currentTarget.value)} />
                </label> 



                <label className="body-two form-element">PASSWORD* 
                    <input className='body-two' type="password" required value={password} onChange={e => setPassword(e.currentTarget.value)} />     
                </label>


                <label className="body-two form-element">VERIFY PASSWORD* 
                    <input className='body-two' type="password" required value={verifyPassword} onChange={e => {setVerifyPassword(e.currentTarget.value)}} />
                </label>


                <small className="form-element">{verifyPasswordError}</small>
                <small className="form-element">{passwordError}</small>

            {/* set so that phone number field has dashes? */}
        
                <label className="body-two form-element">CELL*
                <input className='body-two' type="text" required value={phone} maxLength="10" onChange={e => setPhone(e.currentTarget.value)}/>
                </label>

                <small className="form-element">{phoneError}</small>

                <label className="body-two form-element">ZIPCODE*
                        <input className='body-two' type="text" required value={zipcode} maxLength="5" onChange={e => setZipcode(e.currentTarget.value)} />
                </label>
                <small className="form-element">{zipcodeError}</small>
                <p className="form-element small-text">We will need your zipcode for matching you with volunteers or organizations in your area.</p>
        </div>
    )
 


    let header = 'MAKE A REQUEST FOR YOUR ORGANIZATION'
    let volunteerInputs = ''
    let volunteerDynamicInputs = <div className="volunteer-inputs__2-maker"></div>
    let customerInputs = ''
    

    if(props.signupType === 'VOLUNTEER') {
        header = 'VOLUNTEER'
        if(isMaker || (isMaker && isDriver)) {
            volunteerDynamicInputs = (
                <div className="volunteer-inputs__2-maker">
                    <p className="form-element small-text">Please provide your address so we have on file for pick ups. </p>

                    <label className="body-two form-element" >ADDRESS LINE 1
                        <input required className='body-two' type="text" value={address1} onChange={e => setAddress1(e.currentTarget.value)} /> 
                    </label>  

            
                    <label className="body-two form-element">ADDRESS LINE 2
                        <input className='body-two' type="text" value={address2} onChange={e => setAddress2(e.currentTarget.value)} />
                    </label>

                    <label className="body-two form-element">CITY
                        <input required className='body-two' type="text" value={city} onChange={e => setCity(e.currentTarget.value)} />
                    </label>
                    
                    <label className="body-two form-element">STATE
                        <input required className='body-two' type="text" value={state} maxLength="2" onChange={e => {setState(e.currentTarget.value.toUpperCase())}} />
                    </label>

                    <small className="form-element">{stateError}</small>

                </div>
            
            )
        }

        volunteerInputs = ( 
          
            <div className="volunteer-inputs">
                <div className="volunteer-inputs__1-all">
                {/* <br/> */}
                <div className='body-two form-element'>I WOULD LIKE TO*: <p className="small-text">(choose all that apply)</p></div>
                

                <div className='form-element input-checkbox'>
                    <label className="body-three">  
                        <input type='checkbox' name='isMaker' onChange={e => {setIsMaker(e.target.checked)}} />
                        Sew Masks/Make Face Shields/Make Gowns </label>
                </div>
                <div className='form-element input-checkbox'>
                    <label className="body-three">
                        <input type='checkbox' name='isDriver'  onChange={e => setIsDriver(e.target.checked)} />
                        Pick up and Deliver Materials</label>
                </div>
                <div className='form-element input-checkbox'> 
                    <label className="body-three">
                        <input type='checkbox' name='isOther' onChange={e => setIsOther(e.target.checked)} />   
                        Other <input type='text' onChange={e => setOther(e.currentTarget.value)} /></label>
                        {isOther ? <p className='small-text'>Please let us know how you would like to help. </p> : ''}
                </div>

                <small className="form-element" >{volunteerChecksError}</small>
                </div>
                {volunteerDynamicInputs}
            </div>
                
           
        )
    }
      

    else if(props.signupType === 'CUSTOMER') {
        
        customerInputs = (
            <>
            <div className="customer-inputs__1">
            
                
                <label className="body-two form-element">ORGANIZATION NAME*
                    <input type="text" required value={orgName} onChange={e=>setOrgName(e.currentTarget.value)}/>
                </label>
                
                <label className="body-two form-element">ADDRESS LINE 1*
                    <input type="text" required value={address1} onChange={e => setAddress1(e.currentTarget.value)} />
                </label>

                <label className="body-two form-element">ADDRESS LINE 2
                    <input type="text" value={address2} onChange={e => setAddress2(e.currentTarget.value)} />
                </label>
                
                <label className="body-two form-element">CITY*
                    <input type="text" required value={city} onChange={e => setCity(e.currentTarget.value)} />
                </label>
                
                <label className="body-two form-element">STATE* 
                    <input type="text" required value={state} maxLength="2" onChange={e => setState(e.currentTarget.value.toUpperCase())} />
                </label>
                
                <small className="form-element">{stateError}</small>

                <label className="body-two form-element">What is your affiliation to this organization?*
                    <input type="text" required value={orgAffiliation} onChange={e => setOrgAffiliation(e.currentTarget.value)} />
                </label>

                <label className="body-two form-element">How many employees does this organization have?*
                    <input type="number" required value={numberOfEmployees} onChange={e => setNumberOfEmployees(e.currentTarget.value)}></input>
                </label>
                <small className="form-element">{numberOfEmployeesError}</small>
            </div>

            <div className="customer-inputs__2">
                <div className="order-header">
                    <p className="body-one">Order Details</p>
                    <p className="body-two form-element">Please indicate which products you would like to order with the quantity you are requesting. </p>
                    <p className="small-text">We are only accepting orders in increments of 10 and minimum orders of 20 right now.</p>
                </div>
                <label className="body-two form-element">Masks
                    <input type="number" value={maskRq} step={10} onChange={e => setMaskRq(e.currentTarget.value) } />
                </label>
                <label className="body-two form-element">Gowns
                    <input type="number" value={gownRq} step={10} onChange={e => setGownRq(e.currentTarget.value) } />
                </label>
                <label className="body-two form-element">Face Shields
                    <input type="number" value={faceShieldRq} step={10} onChange={e => setFaceShieldRq(e.currentTarget.value)} />
                </label>
                <small className="form-element">{orderQtyError}</small>


            </div>
           </>
        )
    }

    return(
        <>
            <p className='body-two'>{header}</p>
            <form className='modal__form' onSubmit={handleSubmit}>
            
                {allUserInputs}
                {volunteerInputs}
                {customerInputs}
                <div className='form-bottom'>
                    <input className="call-to-action background-orange body-two"  type="submit" value="SIGN UP"/>
                    <small>{errorMessage}</small>
                    <p className="small-text">*Indicates required fields</p>
                </div>
            </form>

        </>
    )
}