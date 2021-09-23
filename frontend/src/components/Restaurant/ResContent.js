import React, { Component } from 'react';
import resImage from "../../images/restaurants/res1.jpg"

class ResContent extends Component { 
    state = {
        resTitle: "LA Vic",
        resDesc: "Of all the delivery spots in St. James Park, La Victoria Taqueria is among the 10 places with the most orders. If you're a fan of super burrito takeout like the rest of your city, you'll be happy to know it's offered at La Victoria"
    }

    render(){
        return (
            <div className="res-content">
                {/* <nav className="navbar navbar-expand-lg navbar-light bg-light"> */}
                    <div className="container-fluid">
                        <div className="row">
                            <div class="card mb-3">
                                <img class="card-img-top" src={resImage} alt="Card image cap" />
                                <div class="card-body">
                                    <h5 class="card-title">{this.state.resTitle}</h5>
                                    <p class="card-text">{this.state.resDesc}</p>
                                    <p class="card-text"><small class="text-muted">Last updated 3 mins ago</small></p>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-6">
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
                            </div>
                            <div className="col-md-6">
                                <div class="card">
                                    <div class="card-header">
                                        Dishes
                                    </div>
                                    <div class="card-body">
                                        <ul class="list-group list-group-flush">
                                        <li class="list-group-item">Cras justo odio</li>
                                        <li class="list-group-item">Dapibus ac facilisis in</li>
                                        <li class="list-group-item">Vestibulum at eros</li>
                                    </ul>
                                    <a href="#" className="btn btn-uber">Edit Dishes</a>
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
