import React, { Component } from 'react'
import axios from 'axios';
//import { custLogin } from '../../redux/reduxActions/customer/loginRedux';
import { connect } from 'react-redux';
import {custLogin} from '../../redux/reduxActions/customer/loginRedux';
import errorAction from '../../redux/reduxActions/errorRedux';
import ShortHeader from '../ShortHeader';
import ShortFooter from '../ShortFooter';
import { SERVER_ENDPOINT } from '../constants/serverConfigs';
import jwt_decode from 'jwt-decode';

class CustLogin extends Component {

    state = {
        custUsername: "",
        custPassword: "",
        errorMessage: "",
        token: ""
    }

    onChangecustUsername = (event) => {
        this.setState({custUsername: event.target.value});
    }

    onChangeCustPassword = (event) => {
        this.setState({custPassword: event.target.value});
    }


    login = async (event) => {
        event.preventDefault();

        await this.props.custLogin(this.state);
        this.setState({token: this.props.token});
        // console.log("Props value: "+JSON.stringify(this.props))
        // console.log("Props token"+JSON.stringify(this.props.token));
        // console.log("State token "+JSON.stringify(this.state.token));
        this.props.history.push("./home");

        //set the with credentials to true
        // axios.defaults.withCredentials = true;
        // axios.defaults.headers.common['authorization'] = localStorage.getItem('cust_token');
        // try{


        //     const url = "http://localhost:8000/customer/login";
        //     const response = await axios.post(url, this.state);
        //     this.props.history.push("./home");

        //     //this.props.custLogin(response.data);
        // } catch(err){
        //     this.props.errorAction(err);
        //     console.log("Error : "+err)
        // }

        //custLogin(this.state);

        //working one
        // const url = SERVER_ENDPOINT+"/customer/login";

        // axios
        //     .post(url, this.state)
        //     .then(response => {
        //         console.log(response);
        //         this.setState({token: response.data});
        //         this.props.history.push("/home");

        //     })
        //     .catch(err => {
        //         if(err.response && err.response.status === 400){
        //             this.setState({
        //                errorMessage: "Invalid credentials"
        //             })
        //         }
        //         console.log(err);
        //     });
        //
    }

    render(){

        if(this.state.token.length > 0){
            localStorage.setItem("cust_token", this.state.token);

            let decoded = jwt_decode(this.state.token.split(' ')[1]);
            localStorage.setItem("cust_user_id", decoded._id);
            localStorage.setItem("cust_username", decoded.username);
        }


        let loginError = "";
        if(this.state.errorMessage !== ""){
            loginError = <div class="alert alert-danger text-center" role="alert">{this.state.errorMessage}</div>
        }
        return (
            <div>
            <ShortHeader/>
            <div className="container">

                <div className="row justify-content-center">
                    <div className="col-lg-5">
                        <div className="card shadow-lg border-0 rounded-lg mt-5">
                            <div className="card-header"><h3 className="text-center font-weight-light my-4">Login</h3></div>
                            <div className="card-body">
                                <form onSubmit={this.login}>
                                    {loginError}
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
                                        <button className="d-grid btn btn-uber" type="submit">Login</button>
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
            <ShortFooter/>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        loggedIn : state.login.loggedIn,
        user: state.login.user,
        token: state.login.token
    }
}

export default connect(mapStateToProps, {custLogin})(CustLogin)
