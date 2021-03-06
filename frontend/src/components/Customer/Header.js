import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import {faMapMarkerAlt} from "@fortawesome/free-solid-svg-icons";
import {faShoppingCart} from "@fortawesome/free-solid-svg-icons";
import CartModal from './Cart/CartModal';
import cookie from 'react-cookies';
import {Redirect} from 'react-router';
import { getCustToken } from '../utils/ControllerUtils';
import axios from 'axios';
import { SERVER_ENDPOINT } from '../constants/serverConfigs';

class Header extends Component{

    state = {
        dishType: "Veg",
        searchText:"",
        deliveryType: "Delivery",
        custLocation:""
    }

    onChangeField =  (event) => {
        //console.log("value "+event.target.value);
        this.setState({[event.target.name]: event.target.value});
    }

    onDishTypChange =  (event) => {
        //console.log("value "+event.target.value);
        this.setState({[event.target.name]: event.target.value});
        this.props.onDishTypeFilter(event.target.value);
    }

    onDeliveryTypeChange = (event) => {
        this.setState({deliveryType: this.state.deliveryType === "Delivery" ? "Pickup" : "Delivery"})
        console.log("delivery type on change : "+this.state.deliveryType);
        this.props.onDeliveryTypeFilter(this.state.deliveryType);
    }

    async componentDidMount(){
        try {
            axios.defaults.headers.common['authorization'] = getCustToken();
            const custId = cookie.load('custId');
            const response = await axios.get(SERVER_ENDPOINT + "/customer/id/"+custId);
            const customer = await response.data;
            if(customer){
                this.setState({custLocation: customer.custCity});
            }

        } catch(err){
            console.log(err);
        }
    }

    render(){

        let redirectVar = null;
        // console.log("cookie : "+cookie.load('cookie'));
        // console.log("load cookie "+!cookie.load('cookie'));
        // if(!cookie.load('cookie')){
        //     redirectVar = <Redirect to="/login"/>
        // }
        console.log("load cookie ");
        let custLocation = cookie.load("custLocation");


        return (

            <div>
                {redirectVar}
                {/* <nav class="navbar navbar-inverse">
                <div class="container-fluid">

                    <div class="navbar-header">
                    <button className="btn btn-light" onClick={this.props.toggleSidebar}> <FontAwesomeIcon icon={faBars} /></button>
                    <a className=" navbar-brand ps-3" href="./home"><img src={uberLogo} alt="Uber Eats logo"/></a>
                    </div>
                    <ul class="nav navbar-nav">
                    <li class="active"><a href="#">Home</a></li>
                    <li><a href="#">Page 1</a></li>
                    <li><a href="#">Page 2</a></li>
                    </ul>
                    <ul class="nav navbar-nav navbar-right">
                    <li><a href="#"><span class="glyphicon glyphicon-user"></span> Sign Up</a></li>
                    <li><a href="#"><span class="glyphicon glyphicon-log-in"></span> Login</a></li>
                    </ul>
                </div> */}


                 <nav className="sb-topnav navbar navbar-expand-lg">
                <div className="container-fluid">
                    <div className="navbar-header">
                        <button className="btn btn-light" onClick={this.props.toggleSidebar}> <FontAwesomeIcon icon={faBars} /></button>
                        <a className=" navbar-brand ps-3" href="/home"><img src="https://uber-eats-store-0144.s3.us-east-2.amazonaws.com/Uber_Eats_2020_logo.png" alt="Uber Eats logo"/></a>

                    </div>

                    <div class="switch-button">
                            <input class="switch-button-checkbox" type="checkbox" onChange={this.onDeliveryTypeChange}></input>
                            <label class="switch-button-label" for=""><span class="switch-button-label-span">Pickup</span></label>
                    </div>

                    <div class="nav-location">
                        <button className="btn btn-grey rounded-pill"><FontAwesomeIcon icon={faMapMarkerAlt} />{custLocation}</button>
                    </div>

                    {/* <div className="btn-group" data-toggle="buttons-radio">
                        <button className="btn btn-uber" value="1" type="button" >1</button>
                        <button className="btn btn-uber" value="2" type="button" >2</button>
                    </div> */}

                    <div class="btn-group">
                        <input type="radio" class="btn-check" name="distType" id="resVeg" autocomplete="off" value="Veg" onChange={this.onDishTypChange}/>
                        <label class="btn btn-outline-uber rounded-pill" for="resVeg">Veg</label>

                        <input type="radio" class="btn-check" name="distType" id="resNonVeg" autocomplete="off" value="Non-Veg" onChange={this.onDishTypChange} />
                        <label class="btn btn-outline-uber rounded-pill" for="resNonVeg">Non-Veg</label>

                        <input type="radio" class="btn-check" name="distType" id="resVegan" autocomplete="off" value="Vegan" onChange={this.onDishTypChange} />
                        <label class="btn btn-outline-uber rounded-pill" for="resVegan">Vegan</label>
                    </div>
                    {/* <ul class="nav navbar-nav navbar-right">
                        {/* <li><span className="left-pan"><FontAwesomeIcon icon={faSearch} /></span></li>
                        <li><button className="btn btn-grey rounded-pill"><FontAwesomeIcon icon={faSearch} />Veg</button></li>
                        <li><button className="btn btn-uber"><FontAwesomeIcon icon={faSearch} /></button></li>
                        <li><span></span></li>
                        <li><button className="btn btn-uber rounded-pill"><FontAwesomeIcon icon={faShoppingCart} /></button></li>
                    </ul> */}

                    <ul class="nav navbar-nav navbar-right">
                        {/* <li><span className="left-pan"><FontAwesomeIcon icon={faSearch} /></span></li> */}
                        <li><input type="text" name="searchText" className="form-control form-input"
                                    placeholder=" What are you craving?"
                                    onChange={this.onChangeField}/> </li>
                        <li><button className="btn btn-uber" onClick={(event) => {this.props.onResSearch(this.state.searchText)}}><FontAwesomeIcon icon={faSearch} /></button></li>

                    </ul>
                    <CartModal cartValue={this.props.cartValue}/>

                    {/* <div className="col-md-6">
                        <div className="form"> <span className="left-pan"><FontAwesomeIcon icon={faSearch} /></span> <input type="text" className="form-control form-input" placeholder="What are you craving?"/>  </div>
                    </div>   */}
                </div>

                {/* <ul className="navbar-nav ms-auto ms-md-0 me-3 me-lg-4">
                    <li className="nav-item dropdown">
                        <a className="nav-link dropdown-toggle" id="navbarDropdown" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false"><i className="fas fa-user fa-fw"></i></a>
                        <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="navbarDropdown">
                            <li><a className="dropdown-item" href="#!">Settings</a></li>
                            <li><a className="dropdown-item" href="#!">Activity Log</a></li>
                            <li><hr className="dropdown-divider" /></li>
                            <li><a className="dropdown-item" href="#!">Logout</a></li>
                        </ul>
                    </li>
                </ul> */}
            </nav>
            </div>
        )
    }
}

export default Header
