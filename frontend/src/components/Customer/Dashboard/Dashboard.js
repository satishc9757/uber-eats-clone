import React, { Component } from 'react'
//import logo from '../../images/uber_eats_logo.png'
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Header from '../Header';
import Sidebar from '../Sidebar'; 

class Dashboard extends Component {

    state = {
        isSidebarOpen: false
    }

    
    handleViewSidebar = () => {
        console.log("I am here");
        this.setState({isSidebarOpen: !this.state.isSidebarOpen});
    }

    render(){
        return (
            <div>
                <Header toggleSidebar={this.handleViewSidebar}/>
                <div className="wrapper">
                    <Sidebar isOpen={this.state.isSidebarOpen}/>
                    
                </div>
            </div>
        )
    }

    // render(){
    //     return (
    //         <div>
    //             <nav className="sb-topnav navbar navbar-expand">
                
    //             <a className="navbar-brand ps-3" href="/home">
    //                 {/* <img alt="uber-eats-logo" src={logo} width="146" height="24"/> */}
    //                 UberEats
    //             </a>
                
    //             <button className="btn btn-link btn-sm order-1 order-lg-0 me-4 me-lg-0" id="sidebarToggle" href="#!"><i className="fas fa-bars"></i></button>
                
    //             <form className="d-none d-md-inline-block form-inline ms-auto me-0 me-md-3 my-2 my-md-0">
    //                 <div className="input-group">
    //                     <input className="form-control" type="text" placeholder="What are you craving for?" aria-label="Search for..." aria-describedby="btnNavbarSearch" />
    //                     <button className="btn btn-primary" id="btnNavbarSearch" type="button"><FontAwesomeIcon icon={faSearch} /></button>
    //                 </div>
    //             </form>
                
    //             <ul className="navbar-nav ms-auto ms-md-0 me-3 me-lg-4">
    //                 <li className="nav-item dropdown">
    //                     <a className="nav-link dropdown-toggle" id="navbarDropdown" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false"><i className="fas fa-user fa-fw"></i></a>
    //                     <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="navbarDropdown">
    //                         <li><a className="dropdown-item" href="#!">Settings</a></li>
    //                         <li><a className="dropdown-item" href="#!">Activity Log</a></li>
    //                         <li><hr className="dropdown-divider" /></li>
    //                         <li><a className="dropdown-item" href="#!">Logout</a></li>
    //                     </ul>
    //                 </li>
    //             </ul>
    //         </nav>
    //         </div>
    //     )
    // }
}

export default Dashboard
