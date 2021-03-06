import React, { Component } from 'react'
import {Route} from 'react-router-dom';
import CustLogin from './Customer/CustLogin';
import SignupCust from './Customer/SignupCust';
import Home from './Home';
import ResDashboard from './Restaurant/ResDashboard';
import ResDishRegistration from './Restaurant/ResDishRegistration';
import ResLogin from './Restaurant/ResLogin';
import ResProfile from './Restaurant/ResProfile';
import ResSignup from './Restaurant/ResSignup';
import ResDishUpdate from './Restaurant/ResDishUpdate';
import Dashboard from './Customer/Dashboard/Dashboard';
import ResturantView from './Customer/RestaurantPage/ResturantView';
import CheckoutPage from './Customer/Order/CheckoutPage';
import OrdersList from './Customer/Order/OrdersList';
import ResOrdersList from './Restaurant/Orders/OrdersList';
import CustProfile from './Customer/CustProfile';
import Favorites from './Customer/Favorites/Favorites';

class Main extends Component{
    render(){
        return (
            <div>
                <Route path ="/" exact component={Home}></Route>
                <Route path ="/signup" exact component={SignupCust}></Route>
                <Route path ="/login" exact component={CustLogin}></Route>
                <Route path ="/home" exact component={Dashboard}></Route>
                <Route path ="/checkout" component={CheckoutPage}></Route>  
                <Route path ="/profile" component={CustProfile}></Route>  
                <Route path ="/favorites" component={Favorites}></Route>  
                <Route path ="/res/login" exact component={ResLogin}></Route>  
                <Route path ="/res/signup" exact component={ResSignup}></Route>  
                <Route path ="/res/home" exact component={ResDashboard}></Route>
                <Route path ="/res/dishes" exact component={ResDishRegistration}></Route>
                <Route path ="/res/profile" exact component={ResProfile}></Route>
                <Route path ="/res/dish/:dishId" component={ResDishUpdate}></Route>
                <Route path ="/res/store/:resId" component={ResturantView}></Route>
                <Route path ="/orders" component={OrdersList}></Route>
                <Route path ="/res/orders" component={ResOrdersList}></Route>

            </div>
        )
    }
}

export default Main
