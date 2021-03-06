import axios from 'axios'
import React, { Component } from 'react'
import { GRAPHQL_SERVER_ENDPOINT, SERVER_ENDPOINT } from '../../constants/serverConfigs'
import Content from '../Dashboard/Content'
import Header from '../Header'
import Sidebar from '../Sidebar'
import Menu from './Menu'
import cookie from 'react-cookies'
import { GET_DISHES_BY_RESID, GET_RESTAURANT } from '../../../graphql/queries'

class ResturantView extends Component{

    state = {
        isSidebarOpen: false,
        showPopup:false,
        dataToBeAdded:"",
        resData: {},
        resId: "",
        resImage : "",
        resName: "",
        resDescription: "",
        resAddress: "",
        resDishes : [],
    }

    handleViewSidebar = () => {
        this.setState({isSidebarOpen: !this.state.isSidebarOpen});

    }

    navigateToLoginPage = () => {
        this.props.history.push("/login");
    }

    async componentDidMount(){
        this.setDishesData();
        this.setResData();
    }

    setDishesData = async() => {
        try{
            const resId = this.props.match.params.resId;
            // const url = SERVER_ENDPOINT + "/res/getDishByRes/"+resId;

            // const response = await axios.get(url);
            const response = await axios.post(GRAPHQL_SERVER_ENDPOINT + "/getDishByResId", {
                query: GET_DISHES_BY_RESID,
                variables: {
                    resId
                }
            });
            const data = await response.data.data.getDishByResId;
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

            // const response = await axios.post(resUrl, {custId: custId, resId: resId});
            const response = await axios.post(resUrl, {custId: custId, resData: this.state.resData});
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
            // const resUrl = SERVER_ENDPOINT + "/res/id/"+resId;

            // const response = await axios.get(resUrl);
            const query = GET_RESTAURANT;
            const resResponse = await axios.post(GRAPHQL_SERVER_ENDPOINT + "/getRestaurant", {
                query,
                variables: {
                    resId
                }
            });
            const data = await resResponse.data.data.getRestaurant;
            // const data = response.data;
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
                const newOrderData = {
                    cartResId: this.state.resData.resId,
                    cartResName: this.state.resData.resName,
                    cartItems: [dish],
                };
                this.setState({dataToBeAdded: newOrderData});
                this.setState({showPopup: true});
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
    onNewOrder = () =>{
        sessionStorage.setItem("custCart", JSON.stringify(this.state.dataToBeAdded));
        this.setState({showPopup: false});
    }

    onClosePopup = () => {
        this.setState({showPopup: false});
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
                        <Menu showPopup={this.state.showPopup} onAddToCart={this.onAddToCart} dishData={this.state.resDishes} onNewOrder={this.onNewOrder} onClosePopup={this.onClosePopup}/>
                    </div>


                </div>
            </div>
        )
    }

}

export default ResturantView
