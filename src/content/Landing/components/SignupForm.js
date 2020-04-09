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
                    state,
                    total_inventory_to_date: 0,
                    inventory: []
                }
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
                    state,
                    total_inventory_to_date: 0,
                    inventory: []
                }
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
        console.log(`${process.env.REACT_APP_SERVER_URL}${postUrl}`)


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

                <label className="body-two form-element-1">FIRST NAME* 
                    <input type="text" required value={firstName} onChange={e => setFirstName(e.currentTarget.value)} />
                </label>
                <label className="body-two form-element-2">LAST NAME 
                    <input type="text" value={lastName} onChange={e => setLastName(e.currentTarget.value)} />
                </label>



                <label className="body-two form-element-3">EMAIL* 
                        <input type="email" required value={email} onChange={e => setEmail(e.currentTarget.value)} />
                </label> 



                <label className="body-two form-element-4">PASSWORD* 
                    <input type="password" required value={password} onChange={e => setPassword(e.currentTarget.value)} />     
                </label>


                <label className="body-two form-element-5">VERIFY PASSWORD* 
                    <input type="password" required value={verifyPassword} onChange={e => {setVerifyPassword(e.currentTarget.value)}} />
                </label>


                <small className="form-element-6">{verifyPasswordError}</small>
                <small className="form-element-7">{passwordError}</small>

            {/* set so that phone number field has dashes? */}
        
                <label className="body-two form-element-8">CELL*
                <input type="text" required value={phone} maxLength="10" onChange={e => setPhone(e.currentTarget.value)}/>
                </label>

                <small className="form-element-9">{phoneError}</small>

                <label className="body-two form-element-10">ZIPCODE*
                        <input type="text" required value={zipcode} maxLength="5" onChange={e => setZipcode(e.currentTarget.value)} />
                </label>
                <small className="form-element-11">{zipcodeError}</small>
                <p className="form-element-12 small-text">We will need your zipcode for matching you with volunteers or organizations in your area.</p>
        </div>
    )
 


    let header = 'MAKE A REQUEST FOR YOUR ORGANIZATION'
    let volunteerInputs = ''
    let volunteerDynamicInputs = ''
    let customerInputs = ''
    

    if(props.signupType === 'VOLUNTEER') {
        header = 'VOLUNTEER'
        if(isMaker || (isMaker && isDriver)) {
            volunteerDynamicInputs = (
                <div className="volunteer-inputs__2-maker">
             
                    <label className="body-two form-element-1" >ADDRESS LINE 1
                        <input type="text" value={address1} onChange={e => setAddress1(e.currentTarget.value)} /> 
                    </label>  

            
                    <label className="body-two form-element-2">ADDRESS LINE 2
                        <input type="text" value={address2} onChange={e => setAddress2(e.currentTarget.value)} />
                    </label>

                    <label className="body-two form-element-3">CITY
                        <input type="text" value={city} onChange={e => setCity(e.currentTarget.value)} />
                    </label>
                    
                    <label className="body-two form-element-4">STATE
                        <input type="text" value={state} maxLength="2" onChange={e => {setState(e.currentTarget.value.toUpperCase())}} />
                    </label>

                    <small className="form-element-5">{stateError}</small>

                    <p className="form-element-6 small-text">While not required, we use your address to match you with local delivery drivers. If left blank, we won't be able to offer pick-up.</p>
                </div>
            )
        }

        volunteerInputs = ( 
            <div className="volunteer-inputs__all">
                <p className='body-two form-element-1'>I WOULD LIKE TO: <span className="small-text">(choose all that apply)</span></p>
                <div className='form-element-2 input-checkbox'>
                    <label className="body-three">  
                        <input type='checkbox' name='isMaker' onChange={e => {setIsMaker(e.target.checked)}} />
                        Sew Masks/Make Face Shields/Make Gowns </label>
                </div>
                <div className='form-element-3 input-checkbox'>
                    <label className="body-three">
                        <input type='checkbox' name='isDriver'  onChange={e => setIsDriver(e.target.checked)} />
                        Pick up and Deliver Materials</label>
                </div>
                <div className='form-element-4 input-checkbox'> 
                    <label className="body-three">
                        <input type='checkbox' name='isOther' onChange={e => setIsOther(e.target.checked)} />   
                        Other</label>
                </div>
                <div className='form-element-5 input-checkbox'>
                    {/* <label className='small-text'>If you checked 'Other', please let us know how you would like to help: </label> */}
                    <input type='text' onChange={e => setOther(e.currentTarget.value)} />
                </div>

                <small className="form-element-6" >{volunteerChecksError}</small>

                {volunteerDynamicInputs}

            </div>
        )
    }
      

    else if(props.signupType === 'CUSTOMER') {
        
        customerInputs = (
            
            <div className="inputs-2-customer">
                <label className="body-two form-element-1">ORGANIZATION NAME*
                    <input type="text" required value={orgName} onChange={e=>setOrgName(e.currentTarget.value)}/>
                </label>
                
                <label className="body-two form-element-2">ADDRESS LINE 1*
                    <input type="text" required value={address1} onChange={e => setAddress1(e.currentTarget.value)} />
                </label>

                <label className="body-two form-element-3">ADDRESS LINE 2
                    <input type="text" value={address2} onChange={e => setAddress2(e.currentTarget.value)} />
                </label>
                
                <label className="body-two form-element-4">CITY*
                    <input type="text" required value={city} onChange={e => setCity(e.currentTarget.value)} />
                </label>
                
                <label className="body-two form-element-5">STATE* 
                    <input type="text" required value={state} maxLength="2" onChange={e => setState(e.currentTarget.value.toUpperCase())} />
                </label>
                
                <small className="form-element-6">{stateError}</small>
                
                <label className="body-two form-element-7">ZIPCODE*
                    <input type="text" required value={zipcode} maxLength="5" onChange={e => setZipcode(e.currentTarget.value)} />
                </label>
                
                <small className="form-element-8">{zipcodeError}</small>
                
                <label className="body-two form-element-9">WHAT IS YOUR AFFILIATION TO THIS ORGANIZATION?*
                    <input type="text" required value={orgAffiliation} onChange={e => setOrgAffiliation(e.currentTarget.value)} />
                </label>
                
                <label className="body-two form-element-10">HOW MANY EMPLOYEES ARE IN NEED OF MASKS?*
                    <input type="number" required value={numberOfEmployees} onChange={e => setNumberOfEmployees(e.currentTarget.value)}></input>
                </label>
                
                <small className="form-element-11">{numberOfEmployeesError}</small>

                <p className="body-two form-element-12">Please indicate which products you would like to order with the quantity you are requesting. <span className="small-text">We are only accepting orders in increments of 10 and minimum orders of 20 right now.</span></p>
                <label className="body-two form-element-13">Masks
                    <input type="number" value={maskRq} step={10} onChange={e => setMaskRq(e.currentTarget.value) } />
                </label>
                <label className="body-two form-element-14">Gowns
                    <input type="number" value={gownRq} step={10} onChange={e => setGownRq(e.currentTarget.value) } />
                </label>
                <label className="body-two form-element-15">Face Shields
                    <input type="number" value={faceShieldRq} step={10} onChange={e => setFaceShieldRq(e.currentTarget.value)} />
                </label>
                <small className="form-element-16">{orderQtyError}</small>


            </div>
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
                    <input  type="submit" value="Sign Up"/>
                    <small>{errorMessage}</small>
                    <p className="small-text">Required*</p>
                </div>
            </form>

        </>
    )
}