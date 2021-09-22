import React, { Component } from 'react'
import axios from 'axios';
import { custLogin } from '../../redux/reduxActions/loginRedux';

class ResLogin extends Component {

    state = {
        resUsername: "",
        resPassword: ""
    }

    onChangeField = (event) => {
        this.setState({[event.target.name]: event.target.value});
    }

    login = (event) => {
        event.preventDefault();
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(this.state)
        };
    
        //console.log("State inside login: "+this.state);
        //custLogin(this.state);
        const url = "http://localhost:8000/res/login";
        axios
            .post(url, this.state)
            .then(response => {
                console.log(response);
                    //this.props.history.push("/login");
                    //history.push("/login");
            })
            .catch(err => {
                console.log(err);
        });

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
                            <div className="card-header"><h3 className="text-center font-weight-light my-4">Res Login</h3></div>
                            <div className="card-body">
                                <form onSubmit={this.login}>
                                    <div className="form-floating mb-3">
                                        <input className="form-control" id="resUsername" type="email" 
                                        name = "resUsername"
                                        placeholder="name@example.com" 
                                        value = {this.state.resUsername}
                                        onChange = {this.onChangeField}/>
                                        <label for="inputEmail">Email address</label>
                                    </div>
                                    <div className="form-floating mb-3">
                                        <input className="form-control" id="resPassword" type="password" 
                                        placeholder="Password" 
                                        name = "resPassword"
                                        value = {this.state.resPassword}
                                        onChange = {this.onChangeField}/>
                                        <label for="inputPassword">Password</label>
                                    </div>
                                    <div className="form-check mb-3">
                                        <input className="form-check-input" id="inputRememberPassword" type="checkbox" value="" />
                                        <label className="form-check-label" for="inputRememberPassword">Remember Password</label>
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

export default ResLogin;
