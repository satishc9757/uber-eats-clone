import axios from 'axios'
import React, { Component } from 'react'
import { SERVER_ENDPOINT } from '../../constants/serverConfigs'
import Content from '../Dashboard/Content'
import Header from '../Header'
import Sidebar from '../Sidebar'
import Menu from './Menu'
import cookie from 'react-cookies'

class ResturantView extends Component{

    state = {
        isSidebarOpen: false,
        resData: {
            resId: "2",
            resImage : "http://localhost:8000/static/images/res1.jpeg",
            resName: "LA Vic",
            resDescription: "Of all the delivery spots in St. James Park, La Victoria Taqueria is among the 10 places with the most orders. If you're a fan of super burrito takeout like the rest of your city, you'll be happy to know it's offered at La Victoria",
            resAddress: "140 E San Carlos St, San Jose, CA 95112 ",
        },
        resId: "2",
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

    async componentDidMount(){
        this.setDishesData();
        this.setResData();
    }

    setDishesData = async() => {
        try{
            const resId = this.props.match.params.resId;
            const url = SERVER_ENDPOINT + "/res/getDishByRes/"+resId;

            const response = await axios.get(url);
            const data = response.data;
            this.setState({resDishes: data});
            console.log(" dishes data fetched : "+data);
     
        } catch(err) {
            console.log("Error while fecthing resturants "+err);
        }
    }

    onAddToFav = async (event) => {
        try{
            const custId = cookie.load("custId");
            const resId = this.props.match.params.resId;
            const resUrl = SERVER_ENDPOINT + "/customer/favorite/";

            const response = await axios.post(resUrl, {custId: custId, resId: resId});
            const data = response.data;
           // this.setState({resData: data});
            console.log("  response : "+data);
     
                
        }catch(err){
            console.log("Error while adding to favorites "+err);
        }
    }

    setResData = async() => {
        try{
            const resId = this.props.match.params.resId;
            const resUrl = SERVER_ENDPOINT + "/res/id/"+resId;

            const response = await axios.get(resUrl);
            const data = response.data;
            this.setState({resData: data});
            console.log(" res data fetched : "+data);
     
        } catch(err) {
            console.log("Error while fecthing resturants "+err);
        }
    }

    onAddToCart = (dish) => { 
        let currentCartState = sessionStorage.getItem("custCart");
        if(currentCartState){
            currentCartState = JSON.parse(currentCartState);
            console.log("from cookie "+ currentCartState.cartResId);
            console.log("from state "+ this.state.resData.resId);
            if(currentCartState.cartResId !== this.state.resData.resId){
                console.log("you cannot add from another cart")
            } else {
                currentCartState.cartItems.push(dish);
                sessionStorage.setItem("custCart", JSON.stringify(currentCartState));
            }
        } else {
            
            const cartData = {
                cartResId: this.state.resData.resId,
                cartResName: this.state.resData.resName,
                cartItems: [dish],
            }

            sessionStorage.setItem("custCart", JSON.stringify(cartData));

        }
        
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
                                <img class="card-img-top res-dashboard-image" src={this.state.resData.resImage} alt="Card image cap" />
                                <div class="card-body">
                                    <h5 class="card-title">{this.state.resData.resName}</h5>
                                    <p>{this.state.resData.resDescription}</p>
                                    <p>{this.state.resData.resAddress}</p>
                                    {/* <p class="card-text"><small class="text-muted">Last updated 3 mins ago</small></p> */}
                                <button className="btn btn-uber" onClick={this.onAddToFav}>Add to favorites</button>
                                </div>
                            </div>
                        </div>
                        <Menu onAddToCart={this.onAddToCart} dishData={this.state.resDishes} />
                    </div> 

                    
                </div>
            </div>
        )
    }
    
}

export default ResturantView
