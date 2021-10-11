import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import {faMapMarkerAlt} from "@fortawesome/free-solid-svg-icons";
import {faShoppingCart} from "@fortawesome/free-solid-svg-icons";
import CartModal from './Cart/CartModal';
import cookie from 'react-cookies';
import {Redirect} from 'react-router';

class CommonHeader extends Component{
    
    state = {
        dishType: "Veg",
        searchText:"",
        deliveryType: "Delivery"
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

    render(){
        
        let redirectVar = null;
        // console.log("cookie : "+cookie.load('cookie'));
        // console.log("load cookie "+!cookie.load('cookie'));
        // if(!cookie.load('cookie')){
        //     redirectVar = <Redirect to="/login"/>
        // }
        let custLocation = cookie.load("custLocation");
        return (
            
            <div>
                {redirectVar}
                

                 <nav className="sb-topnav navbar navbar-expand-lg">
                <div className="container-fluid">
                    <div className="navbar-header">
                        <button className="btn btn-light" onClick={this.props.toggleSidebar}> <FontAwesomeIcon icon={faBars} /></button>
                        <a className=" navbar-brand ps-3" href="/home"><img src="https://uber-eats-store-0144.s3.us-east-2.amazonaws.com/Uber_Eats_2020_logo.png" alt="Uber Eats logo"/></a>
                        
                    </div>
                    
                    

                    <div class="nav-location">
                        <button className="btn btn-grey rounded-pill"><FontAwesomeIcon icon={faMapMarkerAlt} />{custLocation}</button>
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

export default CommonHeader
