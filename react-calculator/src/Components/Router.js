import React from 'react';
import {BrowserRouter, Route} from 'react-router-dom';
import Login from './Login';
import Signup from './Signup';
import Calculator from './Calculator';

function Router() {
    return(
        <BrowserRouter>
        <Route exact path="/" component={Login}/>
        <Route path="/signup" component={Signup}/>
        <Route path="/calculator" component={Calculator}/>
        </BrowserRouter>
    )
}

export default Router;