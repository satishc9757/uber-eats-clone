import React, { Component } from 'react';
import { connect } from 'react-redux';
import { useHistory } from "react-router-dom";
import {custSignup} from '../../redux/reduxActions/customer/signupRedux';
import errorAction from '../../redux/reduxActions/errorRedux';
import { SERVER_ENDPOINT } from '../constants/serverConfigs';
import countryList from '../constants/countryList';
import axios from 'axios';
import CommonHeader from './CommonHeader';
import Sidebar from './Sidebar';
import cookie from 'react-cookies';


 class CustProfile extends Component {

    constructor(props){
        super(props);
        console.log("props"+ this.props);
    }

    state = {
        isSidebarOpen: false,
        custId:"",
        custFirstName: "",
        custLastName: "",
        custEmail: "",
        custStreet:"",
        custCity:"",
        custState:"",
        custCountry:"",
        custImage:"",
        custDob:"",
        custNickname:"",
        custPhone:"",
        custAbout:"",
        custAddId:""
    }

    handleViewSidebar = () => {
        this.setState({isSidebarOpen: !this.state.isSidebarOpen});
    }

    navigateToLoginPage = () => {
        this.props.history.push("/login");
    }

    redirectToSuccesPage(){
        this.props.history.push('/login');
    }

    onChangeField = (event) => {
        //console.log("On change "+event.target.name+", "+event.target.value)
        this.setState({[event.target.name]: event.target.value});
    }

    handleImageFile = (event) => {
        console.log("Files are "+event.target.files[0]);
        this.setState({custImage: event.target.files[0]});
    }


    async componentDidMount(){
        try {
            const custId = cookie.load('custId');
            const response = await axios.get(SERVER_ENDPOINT + "/customer/id/"+custId);
            const data = await response.data;
            console.log("Cust data : "+JSON.stringify(data))
            this.setState(data);
        } catch(err){
            console.log(err);
        }
    }

    onSignUpSubmit = async (event) => {
        event.preventDefault();
        console.log("props"+ JSON.stringify(this.props));
        console.log("Here in the on submit "+ event);
        const isValid = this.validateInputs();
        console.log("isValid : "+ isValid);
        if(isValid){


            event.preventDefault();
            let formData = new FormData();
            //formData.append("dishImage", this.state.dishImage);

            for (var key in this.state) {
                formData.append(key, this.state[key]);
            }

            console.log("props"+ JSON.stringify(this.props));
            console.log("Here in the on submit "+ event);
            const isValid = true;

            if(isValid){
                const url = SERVER_ENDPOINT+"/customer/update";
                axios.defaults.headers.common['authorization'] = localStorage.getItem('cust_token');
                axios
                    .put(url, formData)
                    .then(response => {
                        console.log(response);
                        this.props.history.push("./home");
                    })
                    .catch(err => {
                        console.log(err);
                    });
            }




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

        // if(this.state.custPassword === ""){
        //     isValid = false;
        //     this.setState({custPasswordError: "Password cannot be empty"});
        // } else {
        //     this.setState({custPasswordError: ""});
        // }

        // if(this.state.custPasswordConfirm === ""){
        //     isValid = false;
        //     this.setState({custPasswordConfirmError: "Confirm password cannot be empty"});
        // } else if(this.state.custPasswordConfirm !== this.state.custPassword){
        //     isValid = false;
        //     this.setState({custPasswordConfirmError: "Passwords don't match"});
        // } else {
        //     this.setState({custPasswordConfirmError: ""});
        // }

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
            <div>
            <CommonHeader toggleSidebar={this.handleViewSidebar} onResSearch={this.onResSearch}/>
                <p>{this.props.registered}</p>
                    {/* <Sidebar isOpen={this.state.isSidebarOpen}
                             navigateToLoginPage={this.navigateToLoginPage}/> */}
            <div className="container">


                <div className="row justify-content-center">
                    <div className="col-lg-7">
                        <div className="card shadow-lg border-0 rounded-lg mt-5">
                            <div className="card-header"><h3 className="text-center font-weight-light my-4">Update Account</h3></div>
                            <div className="card-body">
                                <form className="needs-validation" noValidate onSubmit={this.onSignUpSubmit}>
                                    <div className="row mb-3">
                                        <div className="col-md-6">
                                            <div className="form-floating mb-3 mb-md-0">
                                                <input className={"form-control" } id="custFirstName" type="text"
                                                    value = {this.state.custFirstName}
                                                    onChange = {this.onChangeField}
                                                    placeholder="Enter your first name"
                                                    required/>
                                                <label htmlFor="custFirstName">First name</label>

                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="form-floating">
                                                <input className="form-control" id="custLastName" type="text"
                                                    value = {this.state.custLastName}
                                                    onChange = {this.onChangeField}
                                                    placeholder="Enter your last name" />
                                                <label htmlFor="custLastName">Last name</label>

                                            </div>
                                        </div>
                                    </div>
                                    <div className="form-floating mb-3">
                                        <input className="form-control" id="custEmail" type="email"
                                            value = {this.state.custEmail}
                                            onChange = {this.onChangeField}
                                            placeholder="name@example.com" />
                                        <label htmlFor="custEmail">Email address</label>

                                    </div>
                                    <div className="row mb-3">
                                        <div className="col-md-6">
                                            <div className="form-floating mb-3 mb-md-0">
                                                <input className="form-control" id="custDob" type="date"
                                                    value = {this.state.custDob}
                                                    onChange = {this.onChangeField}
                                                    placeholder="Create a password" />
                                                <label htmlFor="custDob">Date of birth</label>

                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="form-floating mb-3 mb-md-0">
                                                <input className="form-control" id="custNickname" type="text"
                                                    name="custNickname"
                                                    value = {this.state.custNickname}
                                                    onChange = {this.onChangeField}
                                                    placeholder="Nickname" />
                                                <label htmlFor="custNickname">Nickname</label>

                                            </div>
                                        </div>

                                    </div>
                                    <div className="form-floating mb-3">
                                        <input className="form-control" id="custImage" type="file"
                                            name="custImage"
                                            onChange = {this.handleImageFile}
                                            />
                                        <label htmlFor="resImages">Profile picture</label>
                                        {/* <div className="invalid">{this.state.custEmailError}</div> */}
                                    </div>

                                    <div className="form-floating mb-3">
                                        <textarea class="form-control"
                                            name="custAbout"
                                            id="custAbout"
                                            value = {this.state.custAbout}
                                            onChange = {this.onChangeField}
                                            rows="4"></textarea>
                                            <label htmlFor="custAbout">About you</label>
                                            {/* <div className="invalid">{this.state.custEmailError}</div> */}
                                    </div>

                                    <div className="form-floating mb-3">
                                        <input type="tel" className="form-control" id="custPhone" type="text"
                                            name="custPhone"
                                            value = {this.state.custPhone}
                                            onChange = {this.onChangeField}
                                            />
                                        <label htmlFor="custPhone">Phone</label>
                                        {/* <div className="invalid">{this.state.custEmailError}</div> */}
                                    </div>
                                    <div className="mb-3">
                                        <div className="form-floating mb-3 mb-md-0">
                                                    <input className={"form-control" + (this.state.custFirstNameError ? " invalid-input": "")} id="custStreet" type="text"
                                                        name="custStreet"
                                                        value = {this.state.custStreet}
                                                        onChange = {this.onChangeField}
                                                        placeholder="Street address"
                                                        required/>
                                                    <label htmlFor="custStreet">Street address</label>
                                                    {/* <div className="invalid">{this.state.custFirstNameError}</div> */}
                                        </div>
                                    </div>
                                    <div className="row mb-3">
                                        <div className="col-md-6">
                                            <div className="form-floating mb-3 mb-md-0">
                                                <input className={"form-control" } id="custCity" type="text"
                                                    name="custCity"
                                                    value = {this.state.custCity}
                                                    onChange = {this.onChangeField}
                                                    placeholder="Enter City"
                                                    required/>
                                                <label htmlFor="custCity">City</label>
                                                {/* <div className="invalid">{this.state.custFirstNameError}</div> */}
                                            </div>
                                        </div>

                                        <div className="col-md-6">
                                            <div className="form-floating">
                                                <input className="form-control" id="custState" type="text"
                                                    name="custState"
                                                    value = {this.state.custState}
                                                    onChange = {this.onChangeField}
                                                    placeholder="Select State" />
                                                <label htmlFor="custState">State</label>
                                                {/* <div className="invalid">{this.state.custLastNameError}</div> */}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row mb-3">
                                        <div className="col-md-6">
                                            <div className="form-floating">
                                                <input className="form-control" id="custZipcode" type="text"
                                                    name="custZipcode"
                                                    value = {this.state.custZipcode}
                                                    onChange = {this.onChangeField}
                                                    placeholder="Enter Zipcode" />
                                                <label htmlFor="custZipcode">Zipcode</label>
                                                {/* <div className="invalid">{this.state.custLastNameError}</div> */}
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="form-floating">
                                            <select className="form-control form-select"
                                                name="custCountry"
                                                value = {this.state.custCountry}
                                                onChange = {this.onChangeField}>
                                                <option selected></option>
                                                {countryList.map((c) => {
                                                    return (<option value={c}>{c}</option>)})}
                                            </select>
                                                <label htmlFor="custCountry">Country</label>
                                                {/* <div className="invalid">{this.state.custLastNameError}</div> */}
                                            </div>
                                        </div>
                                     </div>
                                    <div className="mt-4 mb-0">
                                        {/* <div className="d-grid"><a className="btn btn-primary btn-block">Create Account</a></div> */}
                                        <button className="d-grid btn btn-uber" type="submit">Update</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
               </div>
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

// export default connect(mapStateToProps, {custSignup})(SignupCust)
export default CustProfile
