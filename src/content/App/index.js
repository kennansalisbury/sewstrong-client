// dependencies
import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import jwtDecode from 'jwt-decode';
// pages
import { About } from '../About';
import { Contact } from '../Contact';
import { Dashboard } from '../Dashboard';
import { Landing } from '../Landing';
// partials
import { Footer } from '../Partials';
// routes
import * as ROUTES from '../../constants/routes';
// styles
import './style.scss';

export const App = () => {

    const [user, setUser] = useState(null);
    const [products, setProducts] = useState('')

    useEffect(() => {
        decodeToken()
    }, []);

    useEffect(() => {
        fetch(`${process.env.REACT_APP_SERVER_URL}/products`)
        .then(response => {
            response.json()
            .then(results => {
                if (response.ok) {
                    setProducts(results);
                } else {
                    console.log(results.message);
                }
            })
        })
        .catch(err => {
            console.log(err);
        })
    }, [])

    const decodeToken = existingToken => {
        let token = existingToken || localStorage.getItem('userToken');
        let decoded;
        if (token) {
            decoded = jwtDecode(token)
            if (!decoded || (Date.now() > decoded.exp * 1000)) {
                setUser(null);
            } else {
                setUser(decoded);
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

    console.log('USER at app level', user)
    return (
        <Router>
            <div>
                <Route exact path={ROUTES.LANDING}
                    render={() => 
                    <Landing user={user} updateUser={updateUser} products={products}/>
                } />

                <Route path={ROUTES.DASHBOARD} 
                    render={() =>
                    <Dashboard user={user} updateUser={updateUser} products={products} />
                }/>

                <Route path={ROUTES.ABOUT} component={About} />

                <Route path={ROUTES.CONTACT} component={Contact} />

                <Footer />
            </div>
        </Router>
    )
};