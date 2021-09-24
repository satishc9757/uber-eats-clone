import React, { Component } from 'react';
import { useHistory } from "react-router-dom";
const axios = require('axios');


 class ResSignup extends Component {

    constructor(props){
        super(props);
        console.log("props"+ this.props);
    }

    state = {
        resName: "",
        resEmail: "",
        resPassword: "",
        resPasswordConfirm: "",
        resStreet: "",
        resCity: "",
        resState: "",
        resZipcode: "",
        resCountry: "",
    
    }

    redirectToSuccesPage(){
        this.props.history.push('/login');
    }

    onChangeField = (event) => {
        this.setState({[event.target.name]: event.target.value});
    }

    onSignUpSubmit = (event) => {
        event.preventDefault();
        console.log("props"+ JSON.stringify(this.props));
        console.log("Here in the on submit "+ event);
        //const isValid = this.validateInputs(); --validation disabled for now
        const isValid = true;
        console.log("isValid : "+ isValid);
        
        if(isValid){
            
            const url = "http://localhost:8000/res/register";
            axios
                .post(url, this.state)
                .then(response => {
                    console.log(response);
                    this.props.history.push("./login");
                    //this.props.history.push("/login");
                    //history.push("/login");
                })
                .catch(err => {
                    console.log(err);
                });
                
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
        return (
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-lg-7">
                        <div className="card shadow-lg border-0 rounded-lg mt-5">
                            <div className="card-header"><h3 className="text-center font-weight-light my-4">Create Account</h3></div>
                            <div className="card-body">
                                <form className="needs-validation" noValidate onSubmit={this.onSignUpSubmit}>
                                    <div className="mb-3">
                                        <div className="form-floating mb-3 mb-md-0">
                                                <input className={"form-control" + (this.state.custFirstNameError ? " invalid-input": "")} id="resName" type="text" 
                                                    name="resName"
                                                    value = {this.state.resName}
                                                    onChange = {this.onChangeField}
                                                    placeholder="Enter your restaurant name" 
                                                    required/>  
                                                <label htmlFor="resName">Restaurant Name</label>
                                                {/* <div className="invalid">{this.state.custFirstNameError}</div> */}
                                            </div>
                                    </div>    
                                   <div className="form-floating mb-3">
                                        <input className="form-control" id="resEmail" type="email" 
                                            name="resEmail"
                                            value = {this.state.resEmail}
                                            onChange = {this.onChangeField}
                                            placeholder="name@example.com" />
                                        <label htmlFor="resEmail">Email address</label>
                                        {/* <div className="invalid">{this.state.custEmailError}</div> */}
                                    </div>
                                    <div className="row mb-3">
                                        <div className="col-md-6">
                                            <div className="form-floating mb-3 mb-md-0">
                                                <input className="form-control" id="resPassword" type="password" 
                                                    name="resPassword"
                                                    value = {this.state.resPassword}
                                                    onChange = {this.onChangeField}
                                                    placeholder="Create a password" />
                                                <label htmlFor="resPassword">Password</label>
                                                {/* <div className="invalid">{this.state.custPasswordError}</div> */}
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="form-floating mb-3 mb-md-0">
                                                <input className="form-control" id="resPasswordConfirm" type="password" 
                                                    name="resPasswordConfirm"
                                                    value = {this.state.custPasswordConfirm}
                                                    onChange = {this.onChangeCustConfirmPassword}
                                                    placeholder="Confirm password" />
                                                <label htmlFor="resPasswordConfirm">Confirm Password</label>
                                                {/* <div className="invalid">{this.state.custPasswordConfirmError}</div> */}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="mb-3">
                                        <div className="form-floating mb-3 mb-md-0">
                                                    <input className={"form-control" + (this.state.custFirstNameError ? " invalid-input": "")} id="resStreet" type="text" 
                                                        name="resStreet"
                                                        value = {this.state.resStreet}
                                                        onChange = {this.onChangeField}
                                                        placeholder="Street address" 
                                                        required/>  
                                                    <label htmlFor="resStreet">Street address</label>
                                                    {/* <div className="invalid">{this.state.custFirstNameError}</div> */}
                                        </div>
                                    </div>
                                    <div className="row mb-3">
                                        <div className="col-md-6">
                                            <div className="form-floating mb-3 mb-md-0">
                                                <input className={"form-control" + (this.state.custFirstNameError ? " invalid-input": "")} id="resCity" type="text" 
                                                    name="resCity"
                                                    value = {this.state.resCity}
                                                    onChange = {this.onChangeField}
                                                    placeholder="Enter City" 
                                                    required/>  
                                                <label htmlFor="resCity">City</label>
                                                {/* <div className="invalid">{this.state.custFirstNameError}</div> */}
                                            </div>
                                        </div>
                                        
                                        <div className="col-md-6">
                                            <div className="form-floating">
                                                <input className="form-control" id="resState" type="text" 
                                                    name="resState"
                                                    value = {this.state.resState}
                                                    onChange = {this.onChangeField}
                                                    placeholder="Select State" />
                                                <label htmlFor="resState">State</label>
                                                {/* <div className="invalid">{this.state.custLastNameError}</div> */}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row mb-3">
                                        <div className="col-md-6">
                                            <div className="form-floating">
                                                <input className="form-control" id="resZipcode" type="text" 
                                                    name="resZipcode"
                                                    value = {this.state.resZipcode}
                                                    onChange = {this.onChangeField}
                                                    placeholder="Enter Zipcode" />
                                                <label htmlFor="resZipcode">Zipcode</label>
                                                {/* <div className="invalid">{this.state.custLastNameError}</div> */}
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="form-floating">
                                                <input className="form-control" id="resCountry" type="text" 
                                                    name="resCountry"
                                                    value = {this.state.resCountry}
                                                    onChange = {this.onChangeField}
                                                    placeholder="Select Country" />
                                                <label htmlFor="resCountry">State</label>
                                                {/* <div className="invalid">{this.state.custLastNameError}</div> */}
                                            </div>
                                        </div>
                                    </div>
                                    
                                    <div className="mt-4 mb-0">
                                        {/* <div className="d-grid"><a className="btn btn-primary btn-block">Create Account</a></div> */}
                                        <button className="d-grid btn btn-primary" type="submit">Create Account</button>
                                    </div>
                                </form>
                            </div>
                            <div className="card-footer text-center py-3">
                                <div className="small"><a href="login.html">Have an account? Go to login</a></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default ResSignup