import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

import uberLogo from "../../images/Uber_Eats_2020_logo.png";

class Header extends Component{
    

    render(){
        return (
            <div>

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
                        <a className=" navbar-brand ps-3" href="./home"><img src={uberLogo} alt="Uber Eats logo"/></a>
                    </div>
                    
                
                    <ul class="nav navbar-nav navbar-right">
                        <li><span className="left-pan"><FontAwesomeIcon icon={faSearch} /></span></li>
                        <li><input type="text" className="form-control form-input" placeholder="    What are you craving?"/> </li>
                        {/* <li><button className="btn btn-uber">Search</button></li> */}
                    </ul>
                    

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
