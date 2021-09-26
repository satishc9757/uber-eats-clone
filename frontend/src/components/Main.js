import React, { Component } from 'react'
import {Route} from 'react-router-dom';
import CustLogin from './Customer/CustLogin';
import Dashboard from './Customer/Dashboard';
import SignupCust from './Customer/SignupCust';
import Home from './Home';
import ResDashboard from './Restaurant/ResDashboard';
import ResDishRegistration from './Restaurant/ResDishRegistration';
import ResLogin from './Restaurant/ResLogin';
import ResProfile from './Restaurant/ResProfile';
import ResSignup from './Restaurant/ResSignup';

class Main extends Component{
    render(){
        return (
            <div>
                <Route path ="/" exact component={Home}></Route>
                <Route path ="/signup" exact component={SignupCust}></Route>
                <Route path ="/login" exact component={CustLogin}></Route>
                <Route path ="/home" exact component={Dashboard}></Route>  
                <Route path ="/res/login" exact component={ResLogin}></Route>  
                <Route path ="/res/signup" exact component={ResSignup}></Route>  
                <Route path ="/res/home" exact component={ResDashboard}></Route>
                <Route path ="/res/dishes" exact component={ResDishRegistration}></Route>
                <Route path ="/res/profile" exact component={ResProfile}></Route>
            </div>
        )
    }
}

export default Main
