// dependencies
import React from 'react';
import {Header} from '../Partials'
import {Link} from 'react-router-dom'

export const About = () => {
    return (
        <>
            <Header headerType={'about_contact'} />
            <div className='landing-secondary'>
                <div className="heading-one">About Us</div>
                <p className="body-one">Our Mission: Connect To Protect</p>
                <div className="landing-secondary__intro">
         
                    <p className="body-one">WHO WE ARE</p>
                    <p className="body-two">We are a grassroots organization of people who sew and craft, formed to address the current crisis surrounding 
                    protection from COVID-19 in Healthcare or community settings. </p>
                    <p className="body-one">WHAT WE DO</p>
                    <p className="body-two">
                    We gather requests for homemade PPE from healthcare facilities and community organizations and provide select equipment produced at home by seamstresses and crafters. 
                    We have a medical advisory team  that includes 2 physicians and a PICU nurse, who keep up with the current situation 
                    and information coming out of the CDC, L&I, The Health Department, and the Healthcare Workers Unions. We provide patterns that adhere to the requirements 
                    from these organization and revise and prototype different materials as requirements and recommendations change.  
                    </p>
                </div>

                <div className="landing-secondary__products">
                    <p className="body-one">OUR PRODUCTS</p>
                    <p className="body-one">Face Masks</p>
                    <div className = "img-left">
                        <img src="https://i.imgur.com/UBidHka.png"/>
                        <div className="body-three text">We produce Facemasks that are not OSHA standard or N95 compliant, but they do provide 
                        a “better than nothing” solution. Our masks are designed with a pocket to accommodate a filter. 
                        The masks are washable and reusable, they can be ironed or steamed upon receipt to sanitize them. 
                        These masks are only meant to be used when there is no other proven effective alternative such as disposable surgical masks 
                        or N-95 masks.</div>
                    </div>
                    <p className="body-one">Face Shields</p>
                    <div className = "img-right">
                        <img src="https://i.imgur.com/UBidHka.png"/>  
                       <p className="body-three text">We are also producing Face Shields of 20 gauge clear plastic.
                        The Face Shields are simple to put together, requiring only a stapler and a pair of scissors.
                       
                        </p>
                    </div>
                    <p className="body-one">Gowns</p>
                    <div className = "img-left">
                        <img src="https://i.imgur.com/UBidHka.png"/>
                        <p className="body-three text">We will soon be producing plastic gowns. They are made of .7 mil plastic, 
                        the material used in plastic drop cloths.  The material is available from Home Depot in large rolls.  
                        The only tools necessary are scissors and a heat gun or hair dryer.  The production of these gowns takes a 
                        bit of practice to get the heat just right to “weld” or melt the seams together without melting 
                        through the plastic.  No other special skills are required.</p>
                    </div>
                </div>
                <small>Considerations for use of DIY Personal Protective Equipment:  Home manufactured products do not have rigorous quality control and
                     materials used have not been studied for their effectiveness against the Covid-19 virus 4/3/2020.</small>
            
            <div className="landing-secondary__cta">
                <p className="heading-three">Volunteer with Us</p>
                <div className='call-to-action body-two background-orange'>VOLUNTEER</div>
                <p className="heading-three">Make a Request for Your Organization</p>
                <div className='call-to-action body-two background-green'>MAKE A REQUEST</div>
           
            </div>
            
            </div>
        </>
    )
};