import React, { Component } from 'react';
import { connect } from 'react-redux';
import { useHistory } from "react-router-dom";
import {custSignup} from '../../redux/reduxActions/customer/signupRedux';
import errorAction from '../../redux/reduxActions/errorRedux';
import { SERVER_ENDPOINT } from '../constants/serverConfigs';
import ShortFooter from '../ShortFooter';
import ShortHeader from '../ShortHeader';
import axios from 'axios'


 class SignupCust extends Component {

    constructor(props){
        super(props);
        console.log("props"+ this.props);
    }

    state = {
        custFirstName: "",
        custLastName: "",
        custEmail: "",
        custPassword: "",
        custPasswordConfirm: "",
        custFirstNameError: "",
        custLastNameError: "",
        custEmailError: "",
        custPasswordError: "",
        custPasswordConfirmError: "",
        signupErrorMessage: ""
    }

    redirectToSuccesPage(){
        this.props.history.push('/login');
    }

    onChangeCustFirstName = (event) => {
        this.setState({custFirstName: event.target.value});
    }

    onChangeCustLastName = (event) => {
        console.log("handle custLastName : "+event);
        this.setState({custLastName: event.target.value});
    }

    onChangeCustEmail = (event) => {
        console.log("handle custEmail: "+event);
        this.setState({custEmail: event.target.value});
    }

    onChangeCustPassword = (event) => {
        console.log("handle custPassword: "+event);
        this.setState({custPassword: event.target.value});
    }

    onChangeCustConfirmPassword = (event) => {
        console.log("handle custPasswordConfirm: "+event);
        this.setState({custPasswordConfirm: event.target.value});
    }

    onSignUpSubmit = async (event) => {
        event.preventDefault();
        console.log("props"+ JSON.stringify(this.props));
        console.log("Here in the on submit "+ event);
        const isValid = this.validateInputs();
        console.log("isValid : "+ isValid);
        if(isValid){


            await this.props.custSignup(this.state);
            if(this.props.errorMessage){
                console.log("errorMessage : "+this.props.errorMessage);
                //this.setState({signupErrorMessage: this.props.errorMessage});
            } else {
                this.props.history.push("./login");
            }




            // try{
            //     const url = SERVER_ENDPOINT+"/customer/register";
            //     const response = await axios.post(url, this.state);
            //     this.props.history.push("./login");
            //    // this.props.custSignup(response.data);
            // } catch(err){
            //     if(err.response && err.response.status === 400){
            //         this.setState({
            //             signupErrorMessage: "Email id already exists!"
            //         })
            //     }
            //     console.log("Error : "+err)
            // }

            const url = SERVER_ENDPOINT+"/customer/register";
            //axios.defaults.headers.common['authorization'] = localStorage.getItem('cust_token');

            axios
            .post(url, this.state)
            .then(response => {
                console.log(response);
                this.props.history.push("/login");

            })
            .catch(err => {
                if(err.response && err.response.status === 400){
                    this.setState({
                        signupErrorMessage: "Email id already exists!"
                    })
                }
                console.log(err);
            });

            // const url = "http://localhost:8000/customer/register";
            // axios
            //     .post(url, this.state)
            //     .then(response => {
            //         console.log(response);
            //         this.props.history.push("/login");

            //     })
            //     .catch(err => {
            //         console.log(err);
            //     });

        }
    }


    validateInputs(){
        let isValid = true;
        if(this.state.custFirstName.match("^[a-zA-Z ]+$")){
            this.setState({custFirstNameError: ""});
        } else {
            isValid = false;
            this.setState({custFirstNameError: "Invalid first name."});
        }

        if(this.state.custLastName.match("^[a-zA-Z ]+$")){
            this.setState({custLastNameError: ""});
        } else {
            isValid = false;
            this.setState({custLastNameError: "Invalid last name."});
        }

        if(this.state.custEmail.match("^([\\w\\.\\-]+)@([\\w\\-]+)((\\.(\\w){2,3})+)$")){
            this.setState({custEmailError: ""});
        } else {
            isValid = false;
            this.setState({custEmailError: "Invalid email."});
        }

        if(this.state.custPassword === ""){
            isValid = false;
            this.setState({custPasswordError: "Password cannot be empty"});
        } else {
            this.setState({custPasswordError: ""});
        }

        if(this.state.custPasswordConfirm === ""){
            isValid = false;
            this.setState({custPasswordConfirmError: "Confirm password cannot be empty"});
        } else if(this.state.custPasswordConfirm !== this.state.custPassword){
            isValid = false;
            this.setState({custPasswordConfirmError: "Passwords don't match"});
        } else {
            this.setState({custPasswordConfirmError: ""});
        }

        console.log("error "+ isValid);
        // return this.state.custFirstNameError === ""
        //         && this.state.custLastNameError === ""
        //         && this.state.custEmailError === ""
        //         && this.state.custPasswordError === ""
        //         && this.state.custPasswordConfirmError === "";
        return isValid;

    }

    render() {
        let signupError = "";
        if(this.state.signupErrorMessage !== ""){
            signupError = <div class="alert alert-danger text-center" role="alert">{this.state.signupErrorMessage}</div>
        }
        return (
            <div>
            <ShortHeader/>
            <div className="container">

                <div className="row justify-content-center">
                    <div className="col-lg-7">
                        <div className="card shadow-lg border-0 rounded-lg mt-5">
                            <div className="card-header"><h3 className="text-center font-weight-light my-4">Create Account</h3></div>
                            <div className="card-body">
                                <form className="needs-validation" noValidate onSubmit={this.onSignUpSubmit}>
                                    {signupError}
                                    <div className="row mb-3">
                                        <div className="col-md-6">
                                            <div className="form-floating mb-3 mb-md-0">
                                                <input className={"form-control" + (this.state.custFirstNameError ? " invalid-input": "")} id="custFirstName" type="text"
                                                    value = {this.state.custFirstName}
                                                    onChange = {this.onChangeCustFirstName}
                                                    placeholder="Enter your first name"
                                                    required/>
                                                <label htmlFor="custFirstName">First name</label>
                                                <div className="invalid">{this.state.custFirstNameError}</div>
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="form-floating">
                                                <input className="form-control" id="custLastName" type="text"
                                                    value = {this.state.custLastName}
                                                    onChange = {this.onChangeCustLastName}
                                                    placeholder="Enter your last name" />
                                                <label htmlFor="custLastName">Last name</label>
                                                <div className="invalid">{this.state.custLastNameError}</div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="form-floating mb-3">
                                        <input className="form-control" id="custEmail" type="email"
                                            value = {this.state.custEmail}
                                            onChange = {this.onChangeCustEmail}
                                            placeholder="name@example.com" />
                                        <label htmlFor="custEmail">Email address</label>
                                        <div className="invalid">{this.state.custEmailError}</div>
                                    </div>
                                    <div className="row mb-3">
                                        <div className="col-md-6">
                                            <div className="form-floating mb-3 mb-md-0">
                                                <input className="form-control" id="custPassword" type="password"
                                                    value = {this.state.custPassword}
                                                    onChange = {this.onChangeCustPassword}
                                                    placeholder="Create a password" />
                                                <label htmlFor="custPassword">Password</label>
                                                <div className="invalid">{this.state.custPasswordError}</div>
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="form-floating mb-3 mb-md-0">
                                                <input className="form-control" id="custPasswordConfirm" type="password"
                                                    value = {this.state.custPasswordConfirm}
                                                    onChange = {this.onChangeCustConfirmPassword}
                                                    placeholder="Confirm password" />
                                                <label htmlFor="custPasswordConfirm">Confirm Password</label>
                                                <div className="invalid">{this.state.custPasswordConfirmError}</div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="mt-4 mb-0">
                                        {/* <div className="d-grid"><a className="btn btn-primary btn-block">Create Account</a></div> */}
                                        <button className="d-grid btn btn-uber" type="submit">Create Account</button>
                                    </div>
                                </form>
                            </div>
                            <div className="card-footer text-center py-3">
                                <div className="small"><a href="/login">Have an account? Go to login</a></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <ShortFooter/>
            </div>
        );
    }
}


const mapStateToProps = state => {
    return {
        registered : state.registered,
        user: state.user,
        errorMessage: state.error
    }
}

export default connect(mapStateToProps, {custSignup})(SignupCust)
