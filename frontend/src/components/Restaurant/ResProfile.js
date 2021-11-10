import {Component} from 'react';
import axios from 'axios';
import { SERVER_ENDPOINT } from '../constants/serverConfigs';
import countryList from '../constants/countryList';
import cookie from 'react-cookies'
import ResHeader from './ResHeader';

class ResProfile extends Component {
    state = {
        resName: "",
        resEmail: "",
        resDescription:"",
        resPhone: "",
        resPassword: "",
        resPasswordConfirm: "",
        resImage: "",
        resStreet: "",
        resCity: "",
        resState: "",
        resZipcode: "",
        resCountry: "",
    }

    onChangeField = (event) => {
        this.setState({[event.target.name]: event.target.value});
    }

    handleImageFile = (event) => {
        console.log("Files are "+event.target.files[0]);
        this.setState({resImage: event.target.files[0]});
    }

    onFormSubmit = (event) => {
        event.preventDefault();
        let formData = new FormData();
        //formData.append("dishImage", this.state.dishImage);

        for (var key in this.state) {
            formData.append(key, this.state[key]);
        }

        // for (var key in this.state) {
        //     if(key === "resImages"){
        //         for (const key of Object.keys(this.state.resImages)) {
        //             formData.append('resImages', this.state.resImages[key])
        //         }
        //     } else {
        //         formData.append(key, this.state[key]);
        //     }

        // }

        console.log("props"+ JSON.stringify(this.props));
        console.log("Here in the on submit "+ event);
        const isValid = true;

        if(isValid){
            axios.defaults.headers.common['authorization'] = localStorage.getItem('res_token');
            const url = SERVER_ENDPOINT+"/res/update";
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

    async componentDidMount(){
        try {
            const resId = cookie.load('resId');
            const response = await axios.get(SERVER_ENDPOINT + "/res/id/"+resId);
            const data = await response.data;
            console.log("Res data : "+JSON.stringify(data))
            this.setState(data);
        } catch(err){
            console.log(err);
        }
    }

    render(){
        return (
            <div>
            <ResHeader toggleSidebar={this.handleViewSidebar}/>
            <div className="container">

                <div className="row justify-content-center">
                    <div className="col-lg-7">
                        <div className="card shadow-lg border-0 rounded-lg mt-5">
                            <div className="card-header"><h3 className="text-center font-weight-light my-4">Update Profile</h3></div>
                            <div className="card-body">
                                <form className="needs-validation" noValidate onSubmit={this.onFormSubmit}>
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

                                    <div className="form-floating mb-3">
                                        <input className="form-control" id="resImage" type="file"
                                            name="resImage"
                                            onChange = {this.handleImageFile}

                                            />
                                        <label htmlFor="resImage">Images</label>
                                        {/* <div className="invalid">{this.state.custEmailError}</div> */}
                                    </div>
                                    <div className="form-floating mb-3">
                                        <textarea class="form-control"
                                            name="resDescription"
                                            id="resDescription"
                                            value = {this.state.resDescription}
                                            onChange = {this.onChangeField}
                                            rows="4"></textarea>
                                            <label htmlFor="resDescription">Description</label>
                                            {/* <div className="invalid">{this.state.custEmailError}</div> */}
                                    </div>
                                    <div className="form-floating mb-3">
                                        <input type="tel" className="form-control" id="resPhone" type="text"
                                            name="resPhone"
                                            value = {this.state.resPhone}
                                            onChange = {this.onChangeField}
                                            />
                                        <label htmlFor="resPhone">Phone</label>
                                        {/* <div className="invalid">{this.state.custEmailError}</div> */}
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
                                            <select className="form-control form-select"
                                                name="resCountry"
                                                value = {this.state.resCountry}
                                                onChange = {this.onChangeField}>
                                                <option selected></option>
                                                {countryList.map((c) => {
                                                    return (<option value={c}>{c}</option>)})}
                                            </select>
                                                <label htmlFor="dishType">Country</label>
                                                {/* <div className="invalid">{this.state.custLastNameError}</div> */}
                                            </div>
                                        </div>
                                    </div>

                                    <div className="mt-4 mb-0">
                                        {/* <div className="d-grid"><a className="btn btn-primary btn-block">Create Account</a></div> */}
                                        <button className="d-grid btn btn-uber" type="submit">Update Account</button>
                                    </div>
                                </form>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
            </div>
        )
    }

}

export default ResProfile
