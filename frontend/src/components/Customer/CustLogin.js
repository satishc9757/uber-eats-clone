import React, { Component } from 'react'
import axios from 'axios';
//import { custLogin } from '../../redux/reduxActions/customer/loginRedux';
import { connect } from 'react-redux';
import {custLoginAction} from '../../redux/reduxActions/customer/loginRedux';

class CustLogin extends Component {

    state = {
        custUsername: "",
        custPassword: ""
    }

    onChangecustUsername = (event) => {
        this.setState({custUsername: event.target.value});
    }

    onChangeCustPassword = (event) => {
        this.setState({custPassword: event.target.value});
    }


    login = async (event) => {
        event.preventDefault();
        
        try{
            const url = "http://localhost:8000/customer/login";
            const response = await axios.post(url, this.state);
            this.props.custLogin(response.data);
        } catch(err){
            console.log("Error : "+err)
        }
        
        this.props.history.push("./home");

       //custLogin(this.state);
        
        // axios
        //     .post(url, this.state)
        //     .then(response => {
        //         console.log(response);
        //             //this.props.history.push("/login");
        //             //history.push("/login");
        //     })
        //     .catch(err => {
        //         console.log(err);
        // });

        // return fetch(`${config.apiUrl}/users/authenticate`, requestOptions)
        //     .then(handleResponse)
        //     .then(user => {
        //         // store user details and jwt token in local storage to keep user logged in between page refreshes
        //         localStorage.setItem('user', JSON.stringify(user));
    
        //         return user;
        //     });
    }

    render(){
        return (
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-lg-5">
                        <div className="card shadow-lg border-0 rounded-lg mt-5">
                            <div className="card-header"><h3 className="text-center font-weight-light my-4">Login</h3></div>
                            <div className="card-body">
                                <form onSubmit={this.login}>
                                    <div className="form-floating mb-3">
                                        <input className="form-control" id="inputEmail" type="email" 
                                        placeholder="name@example.com" 
                                        value = {this.state.custUsername}
                                        onChange = {this.onChangecustUsername}/>
                                        <label for="inputEmail">Email address</label>
                                    </div>
                                    <div className="form-floating mb-3">
                                        <input className="form-control" id="inputPassword" type="password" 
                                        placeholder="Password" 
                                        value = {this.state.custPassword}
                                        onChange = {this.onChangeCustPassword}/>
                                        <label for="inputPassword">Password</label>
                                    </div>
                                    <div className="d-flex align-items-center justify-content-between mt-4 mb-0">
                                        <a className="small" href="password.html">Forgot Password?</a>
                                        <button className="d-grid btn btn-primary" type="submit">Login</button>
                                    </div>
                                </form>
                            </div>
                            <div className="card-footer text-center py-3">
                                <div className="small"><a href="./signup">Need an account? Sign up!</a></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }    
}

const mapStateToProps = state => {
    return {
        loggedIn : state.loggedIn,
        user: state.user
    }
}

// const mapDispatchToProps = dispatch => {
//     return {
//         custLogin : (data) => dispatch(custLogin(data))
//     }
// }

const custLoginActions = dispatch => {
    return {
        custLogin : (data) => dispatch(custLoginAction(data))
    } 
}


export default connect(mapStateToProps, custLoginActions)(CustLogin)
