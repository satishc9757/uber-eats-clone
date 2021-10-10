import React, { Component } from 'react';
import resImage from "../../images/restaurants/res1.jpg"
import ResProfileCard from './Dashboard/ResProfileCard';
import axios from 'axios';
import { SERVER_ENDPOINT } from '../constants/serverConfigs';
import { Link } from 'react-router-dom';
import cookie from 'react-cookies';

class ResContent extends Component { 
    state = {
        resName: "",
        resDescription: "",
        resImage:"",
        resId:"",
        dishes: []
    }

    async componentDidMount(){
        try {
            //restaurant
            const resId = cookie.load("resId");
            const resResponse = await axios.get(SERVER_ENDPOINT + "/res/id/"+resId);
            const resData = await resResponse.data;
            console.log("Res data : "+JSON.stringify(resData))
            this.setState(resData);

            //dishes
            const response = await axios.get(SERVER_ENDPOINT + "/res/getDishByRes/"+resId);
            const data = await response.data;
            console.log("Dishes data : "+JSON.stringify(data))
            this.setState({dishes: data});
        } catch(err){
            console.log(err);
        }
    }

    render(){
        let dishesData = [];
        if(this.state.dishes.length > 0){
            for(var index in this.state.dishes){
                dishesData.push(<Link to={"/res/dish" + this.state.dishes[index].dishId}><li class="list-group-item">{this.state.dishes[index].dishName}</li></Link>);
            }
        } else {
            dishesData = <p>No Data</p>
        }

        return (
            <div className="res-content">
                {/* <nav className="navbar navbar-expand-lg navbar-light bg-light"> */}
                    <div className="container-fluid">
                        <div className="row">
                            <div class="card mb-3">
                                <img class="card-img-top res-dashboard-image" src={this.state.resImage} alt="Card image cap" />
                                <div class="card-body">
                                    <h5 class="card-title">{this.state.resName}</h5>
                                    <p class="card-text">{this.state.resDescription}</p>
                                    {/* <p class="card-text"><small class="text-muted">Last updated 3 mins ago</small></p> */}
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <ResProfileCard resId={this.state.resId}/>
                            <div className="col-md-6">
                                <div class="card">
                                    <div class="card-header">
                                        Dishes
                                    </div>
                                    <div class="card-body">
                                        <ul class="list-group list-group-flush">
                                        {/* <li class="list-group-item">Cras justo odio</li>
                                        <li class="list-group-item">Dapibus ac facilisis in</li>
                                        <li class="list-group-item">Vestibulum at eros</li> */}
                                        {dishesData}
                                    </ul>
                                    <a href="./dishes" className="btn btn-uber">Add Dish</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* <div class="row">
                            <div class="col-xl-3 col-md-6">
                                <div class="card bg-primary text-white mb-4">
                                    <div class="card-body">Primary Card</div>
                                    <div class="card-footer d-flex align-items-center justify-content-between">
                                        <a class="small text-white stretched-link" href="#">View Details</a>
                                        <div class="small text-white"><i class="fas fa-angle-right"></i></div>
                                    </div>
                                </div>
                            </div>
                            <div class="col-xl-3 col-md-6">
                                <div class="card bg-warning text-white mb-4">
                                    <div class="card-body">Warning Card</div>
                                    <div class="card-footer d-flex align-items-center justify-content-between">
                                        <a class="small text-white stretched-link" href="#">View Details</a>
                                        <div class="small text-white"><i class="fas fa-angle-right"></i></div>
                                    </div>
                                </div>
                            </div>
                            <div class="col-xl-3 col-md-6">
                                <div class="card bg-success text-white mb-4">
                                    <div class="card-body">Success Card</div>
                                    <div class="card-footer d-flex align-items-center justify-content-between">
                                        <a class="small text-white stretched-link" href="#">View Details</a>
                                        <div class="small text-white"><i class="fas fa-angle-right"></i></div>
                                    </div>
                                </div>
                            </div>
                            <div class="col-xl-3 col-md-6">
                                <div class="card bg-danger text-white mb-4">
                                    <div class="card-body">Danger Card</div>
                                    <div class="card-footer d-flex align-items-center justify-content-between">
                                        <a class="small text-white stretched-link" href="#">View Details</a>
                                        <div class="small text-white"><i class="fas fa-angle-right"></i></div>
                                    </div>
                                </div>
                            </div>
                        </div> */}



                    </div>
                {/* </nav>     */}
            </div>
        )
    }
}

export default ResContent
