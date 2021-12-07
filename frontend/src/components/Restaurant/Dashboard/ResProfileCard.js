import React, {Component} from 'react'
import axios from 'axios';
import { GRAPHQL_SERVER_ENDPOINT, SERVER_ENDPOINT } from '../../constants/serverConfigs';
import { Link } from 'react-router-dom';
import cookie from 'react-cookies';
import { GET_RESTAURANT } from '../../../graphql/queries';

class ResProfileCard extends Component{

    state = {
        resName: "",
        resEmail: "",
        resDescription:"",
        resPhone: "",
        resImages: "",
        resStreet: "",
        resCity: "",
        resState: "",
        resZipcode: "",
        resCountry: "",
    }

    async componentDidMount(){
        try {
            const resId = cookie.load("resId");
            //const response = await axios.get(SERVER_ENDPOINT + "/res/id/"+resId);
            const query = GET_RESTAURANT;
            const resResponse = await axios.post(GRAPHQL_SERVER_ENDPOINT + "/getRestaurant", {
                query,
                variables: {
                    resId
                }
            });
            const data = await resResponse.data.data.getRestaurant;
            //const data = await response.data;
            console.log("Res1 data : "+JSON.stringify(data));
            this.setState(data);
        } catch(err){
            console.log(err);
        }
    }

    render(){
        return (
            <div className="col-md-6">
                <div class="card mb-3">
                <div class="card-body">
                  {/* <div class="row">
                    <div class="col-sm-4">
                      <h6 class="mb-0">Restaurant Name</h6>
                    </div>
                    <div class="col-sm-8 text-secondary">
                      {this.state.resName}
                    </div>
                  </div>
                  <hr/>*/}
                  <div class="row">
                    <div class="col-sm-3">
                      <h6 class="mb-0">Email</h6>
                    </div>
                    <div class="col-sm-9 text-secondary">
                      {this.state.resEmail}
                    </div>
                  </div>
                  <hr/>
                  <div class="row">
                    <div class="col-sm-3">
                      <h6 class="mb-0">Phone</h6>
                    </div>
                    <div class="col-sm-9 text-secondary">
                      {this.state.resPhone}
                    </div>
                  </div>
                  <hr/>
                  <div class="row">
                    <div class="col-sm-3">
                      <h6 class="mb-0">Address</h6>
                    </div>
                    <div class="col-sm-9 text-secondary">
                      {this.state.resStreet}, {this.state.resCity}, {this.state.resState}, {this.state.resCountry}
                    </div>
                  </div>
                  <hr/>
                  {/* <div class="row">
                    <div class="col-sm-4">
                      <h6 class="mb-0">Address</h6>
                    </div>
                    <div class="col-sm-9 text-secondary">
                      Bay Area, San Francisco, CA
                    </div>
                  </div>
                  <hr/>*/}
                  <div class="row">
                    <div class="col-sm-12">
                      <Link to={"/res/profile"}><button class="btn btn-uber">Edit</button></Link>
                    </div>
                  </div>
                  </div>
                  </div>
                </div>
                /* <div className="col-md-6">
                                <div class="card">
                                    <div class="card-header">
                                        Profile
                                    </div>
                                    <div class="card-body">
                                        <ul class="list-group list-group-flush">
                                        <li class="list-group-item">Cras justo odio</li>
                                        <li class="list-group-item">Dapibus ac facilisis in</li>
                                        <li class="list-group-item">Vestibulum at eros</li>
                                    </ul>
                                    <a href="#" class="btn btn-uber">Edit Profile</a>
                                    </div>
                                </div>
                </div> */

        )
    }
}

export default ResProfileCard
