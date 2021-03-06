import React, { Component } from 'react'
//import logo from '../../images/uber_eats_logo.png'
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { connect } from 'react-redux';
import { custLogout } from '../../../redux/reduxActions/customer/loginRedux';
import axios from 'axios';
import { SERVER_ENDPOINT } from '../../constants/serverConfigs';
import cookie from 'react-cookies';
import Header from '../Header';
import Sidebar from '../Sidebar';
import Content from '../Dashboard/Content';
import FavContent from './FavContent';

class Favorites extends Component {

    state = {
        isSidebarOpen: false,
        resMainData:[],
        resData: []
    }

    navigateToLoginPage = () => {
        this.props.history.push("/login");
    }
    
    handleViewSidebar = () => {
        console.log("I am here");
        this.setState({isSidebarOpen: !this.state.isSidebarOpen});
    }

    onResSearch = async (text) => {
        
        const searchText = text;
        const url = SERVER_ENDPOINT + "/res/query?searchText="+searchText;
        
        try{
            const response = await axios.get(url);
            const data = response.data;
            this.setState({resData: data});
            this.setState({resMainData: data});
            console.log(" res data fetched : "+data);
        } catch(err) {
            console.log("Error while fecthing resturants "+err);
        }    

    }

    onDishTypeFilter = (dishType) => {
        this.setState({
            resData: this.state.resMainData.filter(res => {
                return res.dishTypes.split(",").includes(dishType)
            })
        })
    }

    onDeliveryTypeFilter = (deliveryType) => {
        this.setState({
            resData: this.state.resMainData.filter(res => {

                return res.resDeliveryType !== null && res.resDeliveryType.includes(deliveryType);
            })
        })
    }

    async componentDidMount(){
        const custId = cookie.load("custId");
        
        if(custId){
            const url = SERVER_ENDPOINT + "/res/favorites?custId="+custId;
        
            try{
                const response = await axios.get(url);
                const data = response.data;
                this.setState({resData: data});
                this.setState({resMainData: data});
                console.log(" res data fetched : "+data);
            } catch(err) {
                console.log("Error while fecthing resturants "+err);
            }  
        }
        
    }

    render(){
        return (
            <div>
                <Header toggleSidebar={this.handleViewSidebar} 
                        onResSearch={this.onResSearch} 
                        onDishTypeFilter={this.onDishTypeFilter}
                        onDeliveryTypeFilter={this.onDeliveryTypeFilter} 
                        />
                <div className="wrapper">
                    <Sidebar isOpen={this.state.isSidebarOpen} 
                             logout={this.props.custLogout} 
                             navigateToLoginPage={this.navigateToLoginPage}/>
                    
                    <FavContent resData={this.state.resData}/>
                    
                </div>
            </div>
        )
    }

}



export default Favorites

