import React, { Component } from 'react'
import cookie from 'react-cookies';
import {Redirect} from 'react-router';

class Sidebar extends Component{
    
    onSignout = async (event) => {
        event.preventDefault();
        await this.props.logout();
        this.props.navigateToLoginPage(); 
    }

    
    handleLogout = () => {
        console.log("Logout clicked");
        console.log("cookie data "+ cookie.load('cookie'));
        cookie.remove('cookie', { path: '/' })
        this.props.navigateToLoginPage();
    }

    render(){
        let custFirstName = cookie.load('custFirstName');
        let custImageLink = cookie.load('custImageLink');
        return (
            <div className="res-sidebar">
            {/* <div className="wrapper"> */}
            <nav id="sidebar" className={this.props.isOpen? "" : "active"}>
                <div className="sidebar-header text-center">
                    <img src={custImageLink} 
                        width="120px"
                        className="rounded-circle float-right"/>
                    <br/>
                    <h3>{custFirstName}</h3>
                </div> 

                <ul className="list-unstyled components">
                    {/* <p>Dummy Heading</p> */}
                    <li className="active">
                        <a href="./home" data-toggle="collapse" aria-expanded="false">Dashboard</a>
                        {/* <ul className="collapse list-unstyled" id="homeSubmenu">
                            <li>
                                <a href="/res/home">Home</a>
                            </li>
                            <li>
                                <a href="/res/profile">Profile</a>
                            </li>
                            {/* <li>
                                <a href="/res/dish">Dishes</a>
                            </li>
                        </ul> */}
                    </li>
                    <li>
                        <a href="./profile">Profile</a>
                    </li>
                    <li>
                        <a href="./orders">Orders</a>
                    </li>
                    <li>
                        <a href="./checkout">Checkout</a>
                    </li>
                    <li>
                        <a href="./favorites">Favorites</a>
                    </li>
                    {/* <li>
                        <a href="#pageSubmenu" data-toggle="collapse" aria-expanded="false" className="dropdown-toggle">Pages</a>
                        <ul className="collapse list-unstyled" id="pageSubmenu">
                            <li>
                                <a href="#">Page 1</a>
                            </li>
                            <li>
                                <a href="#">Page 2</a>
                            </li>
                            <li>
                                <a href="#">Page 3</a>
                            </li>
                        </ul>
                    </li>
                    <li>
                        <a href="#">Portfolio</a>
                    </li>
                    <li>
                        <a href="#">Contact</a>
                    </li> */}
                </ul>

                <ul className="list-unstyled CTAs">
                    {/* <li>
                        <a href="https://bootstrapious.com/tutorial/files/sidebar.zip" className="download">Download source</a>
                    </li> */}
                    <li>
                        {/* <button onClick={this.handleLogout} className="btn btn-uber">Signout</button>  */}
                        <a href="" onClick={this.handleLogout} className="article">Signout</a>
                    </li>
                </ul>
            </nav>

            {/* <div id="content">

                <nav className="navbar navbar-expand-lg navbar-light bg-light">
                    <div className="container-fluid">

                        <button type="button" id="sidebarCollapse" className="btn btn-info">
                            <i className="fas fa-align-left"></i>
                            <span>Toggle Sidebar</span>
                        </button>
                        <button className="btn btn-dark d-inline-block d-lg-none ml-auto" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                            <i className="fas fa-align-justify"></i>
                        </button>

                        <div className="collapse navbar-collapse" id="navbarSupportedContent">
                            <ul className="nav navbar-nav ml-auto">
                                <li className="nav-item active">
                                    <a className="nav-link" href="#">Page</a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link" href="#">Page</a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link" href="#">Page</a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link" href="#">Page</a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </nav>

                <h2>Collapsible Sidebar Using Bootstrap 4</h2>
                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>

                <div className="line"></div>

                <h2>Lorem Ipsum Dolor</h2>
                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>

                <div className="line"></div>

                <h2>Lorem Ipsum Dolor</h2>
                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>

                <div className="line"></div>

                <h3>Lorem Ipsum Dolor</h3>
                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
            </div> */}
        {/* </div> */}
            </div>
        )
    }
}

export default Sidebar
