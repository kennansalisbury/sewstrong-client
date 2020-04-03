// dependencies
import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import jwtDecode from 'jwt-decode';
// pages
import { About } from '../About';
import { Contact } from '../Contact';
import { Landing } from '../Landing';
// partials
import { Footer } from '../Partials';
// routes
import * as ROUTES from '../../constants/routes';
// styles
import './style.scss';

export const App = () => {

    const [user, setUser] = useState(null);

    useEffect(() => {
        decodeToken()
    }, []);

    const decodeToken = existingToken => {
        let token = existingToken || localStorage.getItem('userToken');
        let decoded;
        if (token) {
            decoded = jwtDecode(token)
            if (!decoded || (Date.now() > decoded.exp * 1000)) {
                setUser(null);
            } else {
                setUser(decoded);
                console.log(decoded)
            }
        } else {
            setUser(null);
        }
    };
    const updateUser = newToken => {
        if (newToken) {
            localStorage.setItem('userToken', newToken);
            decodeToken(newToken);
        } else {
            setUser(null);
            return;
        }
    };

    return (
        <Router>
            <div>
                <Route exact path={ROUTES.LANDING}
                    render={() => 
                    <Landing user={user} updateUser={updateUser} />
                } />

                <Route path={ROUTES.ABOUT} component={About} />

                <Route path={ROUTES.CONTACT} component={Contact} />

                <Footer />
            </div>
        </Router>
    )
};