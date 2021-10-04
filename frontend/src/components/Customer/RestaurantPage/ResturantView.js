import React, { Component } from 'react'
import Content from '../Dashboard/Content'
import Header from '../Header'
import Sidebar from '../Sidebar'
import Menu from './Menu'

class ResturantView extends Component{

    state = {
        isSidebarOpen: false,
        resImage : "http://localhost:8000/static/images/res1.jpeg",
        resName: "LA Vic",
        resDescription: "Of all the delivery spots in St. James Park, La Victoria Taqueria is among the 10 places with the most orders. If you're a fan of super burrito takeout like the rest of your city, you'll be happy to know it's offered at La Victoria",
        resAddress: "140 E San Carlos St, San Jose, CA 95112 ",
        resDishes : [{
            dishId: 2,
            dishImage: "http://localhost:8000/static/images/res1.jpeg",
            dishName: "Sandwich",
            dishMainIngredients: "Veggies, Sauces",
            dishPrice: "10",
            dishDesc: "Loaded with veggies",
            dishType: "Veg"
        },
        {
            dishId: 3,
            dishImage: "http://localhost:8000/static/images/res1.jpeg",
            dishName: "Sandwich",
            dishMainIngredients: "Veggies, Sauces",
            dishPrice: "10",
            dishDesc: "Loaded with veggies",
            dishType: "Veg"
        },
        {
            dishId: 4,
            dishImage: "http://localhost:8000/static/images/res1.jpeg",
            dishName: "Sandwich",
            dishMainIngredients: "Veggies, Sauces",
            dishPrice: "10",
            dishDesc: "Loaded with veggies",
            dishType: "Veg"
        }],
    }
    
    handleViewSidebar = () => {
        this.setState({isSidebarOpen: !this.state.isSidebarOpen});
       
    }

    componentDidMount(){

    }

    render(){
        return (
            <div className="res-view">
                <Header toggleSidebar={this.handleViewSidebar} onResSearch={this.onResSearch}/>
                <div className="wrapper">
                    <Sidebar isOpen={this.state.isSidebarOpen} 
                             logout={this.props.custLogout} 
                             navigateToLoginPage={this.navigateToLoginPage}/>
                    <div className="container-fluid">
                        <div className="row">
                            <div class="card mb-3">
                                <img class="card-img-top res-dashboard-image" src={this.state.resImage} alt="Card image cap" />
                                <div class="card-body">
                                    <h5 class="card-title">{this.state.resName}</h5>
                                    <p>{this.state.resDescription}</p>
                                    <p>{this.state.resAddress}</p>
                                    <p class="card-text"><small class="text-muted">Last updated 3 mins ago</small></p>
                                </div>
                            </div>
                        </div>
                        <Menu dishData={this.state.resDishes} />
                    </div> 

                    
                </div>
            </div>
        )
    }
    
}

export default ResturantView
