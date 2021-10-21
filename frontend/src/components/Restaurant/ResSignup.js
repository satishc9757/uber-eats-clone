import React, { Component } from 'react';
import { connect } from 'react-redux';
import { useHistory } from "react-router-dom";
import errorAction from '../../redux/reduxActions/errorRedux';
import {resSignup} from '../../redux/reduxActions/restaurant/signupRedux';
import countryList from '../constants/countryList';
import { SERVER_ENDPOINT } from '../constants/serverConfigs';
import ShortFooter from '../ShortFooter';
import ShortHeader from '../ShortHeader';
import axios from 'axios';


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
        resDeliveryType:"",
        resNameError: "",
        resEmailError: "",
        resPasswordError: "",
        resPasswordConfirmError: "",
        resStreetError: "",
        resCityError: "",
        resStateError: "",
        resZipcodeError: "",
        resCountryError: "",
        resDeliveryTypeError:"",
        signupErrorMessage: ""
    
    }

    redirectToSuccesPage(){
        this.props.history.push('/login');
    }

    onChangeField = (event) => {
        this.setState({[event.target.name]: event.target.value});
    }

    onSignUpSubmit = async (event) => {
        event.preventDefault();
        console.log("props"+ JSON.stringify(this.props));
        console.log("Here in the on submit "+ event);
        //const isValid = this.validateInputs(); --validation disabled for now
        const isValid = this.validateInputs();
        console.log("isValid : "+ isValid);
        
        if(isValid){
           
        
            const url = SERVER_ENDPOINT+"/res/register";
            axios
                .post(url, this.state)
                .then(response => {
                    console.log(response);
                    this.props.history.push("./login");
                })
                .catch(err => {
                    if(err.response && err.response.status === 400){
                        this.setState({
                            signupErrorMessage: "Email id already exists!"
                        })
                    }
                    console.log(err);
                });
                
        }
    }


    validateInputs() {
        let isValid = true;
        if(this.state.resName.match("^[a-zA-Z ]+$")){
            this.setState({resNameError: ""});
        } else {
            isValid = false;
            this.setState({resNameError: "Invalid restaurant name."});
        }

        if(this.state.resEmail.match("^([\\w\\.\\-]+)@([\\w\\-]+)((\\.(\\w){2,3})+)$")){
            this.setState({resEmailError: ""});
        } else {
            isValid = false;
            this.setState({resEmailError: "Invalid email."});
        }

        if(this.state.resPassword === ""){
            isValid = false;
            this.setState({resPasswordError: "Password cannot be empty"});
        } else {
            this.setState({resPasswordError: ""});
        }

        if(this.state.resPasswordConfirm === ""){
            isValid = false;
            this.setState({resPasswordConfirmError: "Confirm password cannot be empty"});
        } else if(this.state.resPasswordConfirm !== this.state.resPassword){
            isValid = false;
            this.setState({resPasswordConfirmError: "Passwords don't match"});
        } else {
            this.setState({resPasswordConfirmError: ""});
        }

        if(this.state.resStreet.match("^[a-zA-Z0-9 ]+$")){
            this.setState({resStreetError: ""});
        } else {
            isValid = false;
            this.setState({resStreetError: "Invalid street name."});
        }

        if(this.state.resCity.match("^[a-zA-Z0-9 ]+$")){
            this.setState({resCityError: ""});
        } else {
            isValid = false;
            this.setState({resCityError: "Invalid city name."});
        }

        if(this.state.resState.match("^[a-zA-Z0-9 ]+$")){
            this.setState({resStateError: ""});
        } else {
            isValid = false;
            this.setState({resStateError: "Invalid state name."});
        }

        if(this.state.resZipcode.match("^[a-zA-Z0-9 ]+$")){
            this.setState({resZipcodeError: ""});
        } else {
            isValid = false;
            this.setState({resZipcodeError: "Invalid zipcode name."});
        }

        if(this.state.resCountry.match("^[a-zA-Z0-9 ]+$")){
            this.setState({resCountryError: ""});
        } else {
            isValid = false;
            this.setState({resCountryError: "Invalid country name."});
        }

        if(this.state.resDeliveryType.match("^[a-zA-Z ]+$")){
            this.setState({resDeliveryTypeError: ""});
        } else {
            isValid = false;
            this.setState({resDeliveryTypeError: "Invalid delivery type."});
        }

        console.log("error "+ isValid);
        // console.log(this.state.resNameError)
        //         console.log( this.state.resEmailError)
        //         console.log( this.state.resPasswordError)
        //         console.log( this.state.resPasswordConfirmError)
        //         console.log( this.state.resStreetError )
        //         console.log( this.state.resCityError )
        //         console.log( this.state.resStateError )
        //         console.log( this.state.resZipcodeError )
        //         console.log( this.state.resCountryError )
        //         console.log( this.state.resDeliveryTypeError );
        
        // return this.state.resNameError == "" 
        //         && this.state.resEmailError === "" 
        //         && this.state.resPasswordError === "" 
        //         && this.state.resPasswordConfirmError === "" 
        //         && this.state.resStreetError === ""
        //         && this.state.resCityError === ""
        //         && this.state.resStateError === ""
        //         && this.state.resZipcodeError == ""
        //         && this.state.resCountryError === ""
        //         && this.state.resDeliveryTypeError === ""
        
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
                                    <div className="mb-3">
                                        <div className="form-floating mb-3 mb-md-0">
                                                <input className={"form-control" + (this.state.custFirstNameError ? " invalid-input": "")} id="resName" type="text" 
                                                    name="resName"
                                                    value = {this.state.resName}
                                                    onChange = {this.onChangeField}
                                                    placeholder="Enter your restaurant name" 
                                                    required/>  
                                                <label htmlFor="resName">Restaurant Name</label>
                                                <div className="invalid">{this.state.resNameError}</div>
                                            </div>
                                    </div>    
                                   <div className="form-floating mb-3">
                                        <input className="form-control" id="resEmail" type="email" 
                                            name="resEmail"
                                            value = {this.state.resEmail}
                                            onChange = {this.onChangeField}
                                            placeholder="name@example.com" />
                                        <label htmlFor="resEmail">Email address</label>
                                        <div className="invalid">{this.state.resEmailError}</div>
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
                                                <div className="invalid">{this.state.resPasswordError}</div>
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="form-floating mb-3 mb-md-0">
                                                <input className="form-control" id="resPasswordConfirm" type="password" 
                                                    name="resPasswordConfirm"
                                                    value = {this.state.resPasswordConfirm}
                                                    onChange = {this.onChangeField}
                                                    placeholder="Confirm password" />
                                                <label htmlFor="resPasswordConfirm">Confirm Password</label>
                                                <div className="invalid">{this.state.resPasswordConfirmError}</div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="mb-3">
                                        <div className="form-floating mb-3 mb-md-0">
                                                    <input className={"form-control" + (this.state.resStreetError ? " invalid-input": "")} id="resStreet" type="text" 
                                                        name="resStreet"
                                                        value = {this.state.resStreet}
                                                        onChange = {this.onChangeField}
                                                        placeholder="Street address" 
                                                        required/>  
                                                    <label htmlFor="resStreet">Street address</label>
                                                    <div className="invalid">{this.state.resStreetError}</div>
                                        </div>
                                    </div>
                                    <div className="row mb-3">
                                        <div className="col-md-6">
                                            <div className="form-floating mb-3 mb-md-0">
                                                <input className={"form-control" + (this.state.resCityError ? " invalid-input": "")} id="resCity" type="text" 
                                                    name="resCity"
                                                    value = {this.state.resCity}
                                                    onChange = {this.onChangeField}
                                                    placeholder="Enter City" 
                                                    required/>  
                                                <label htmlFor="resCity">City</label>
                                                <div className="invalid">{this.state.resCityError}</div>
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
                                                <div className="invalid">{this.state.resStateError}</div>
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
                                                <div className="invalid">{this.state.resZipcodeError}</div>
                                            </div>
                                        </div>

                                        <div className="col-md-6">
                                            <div className="form-floating">
                                            <select className="form-control form-select" 
                                                name="resCountry"
                                                value = {this.state.resCountry}
                                                onChange = {this.onChangeField}>
                                                <option selected></option>
                                                {countryList.map((c) => {
                                                    return (<option value={c}>{c}</option>)})}
                                            </select>
                                                <label htmlFor="resCountry">Country</label>
                                                <div className="invalid">{this.state.resCountryError}</div>
                                            </div>
                                        </div>

                                        
                                    </div>
                                    
                                    <div className="col-md-6">
                                            <div className="form-floating">
                                            <select className="form-control form-select" 
                                                name="resDeliveryType"
                                                value = {this.state.resDeliveryType}
                                                onChange = {this.onChangeField}>
                                                <option></option>    
                                                <option >Delivery and Pickup</option>
                                                <option>Delivery</option>
                                                <option>Pickup</option>
                                            </select>
                                                <label htmlFor="custCountry">Delivery Type</label>
                                                <div className="invalid">{this.state.resDeliveryTypeError}</div>
                                            </div>
                                        </div>

                                    <div className="mt-4 mb-0">
                                        {/* <div className="d-grid"><a className="btn btn-primary btn-block">Create Account</a></div> */}
                                        <button className="d-grid btn btn-uber" type="submit">Create Account</button>
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
            <ShortFooter/>
            </div>
        );
    }
}

// const mapStateToProps = state => {
//     return {
//         registered : state.registered,
//         user: state.user
//     }
// }


//export default connect(mapStateToProps, {resSignup})(ResSignup);
export default ResSignup;

