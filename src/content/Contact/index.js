// dependencies
import React, { useState } from 'react';
import {Header} from '../Partials'

export const Contact = () => {
    return (
        <>
        <Header headerType={'about_contact'} />
        <div className='landing-secondary'>
            <div className="heading-one">Contact Us</div>
            
            <div className="landing-secondary__contact">
                <p className="body-one">Email us</p>
                <p className="body-two">Regarding Volunteering: <a href="mailto: volunteer@sewstrong.com">volunteer@sewstrong.org</a> </p>
                <p className="body-two">Regarding Product Orders: <a href="mailto: orders@sewstrong.com">orders@sewstrong.org</a> </p>
                <p className="body-two">All other inquiries: <a href="mailto: info@sewstrong.com">info@sewstrong.org</a> </p>

                <p className="body-one">Find us on social media</p>
                <p>Placeholder for Social Media icons/links</p>
            </div>

            
        </div>
        </>
    )
};